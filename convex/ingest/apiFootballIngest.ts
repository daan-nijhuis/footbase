/**
 * API-Football Ingestion Actions
 *
 * Internal actions for ingesting data from API-Football:
 * - ingestCountries: Fetch competitions, teams, and players for specified countries
 * - ingestRecentFixtures: Fetch recent match results and player appearances
 *
 * These are Convex actions (not mutations) because they make external HTTP calls.
 */

import { v } from "convex/values";
import { internalAction, internalMutation } from "../_generated/server";
import { internal } from "../_generated/api";
import type { Doc, Id } from "../_generated/dataModel";
import {
  fetchLeaguesByCountry,
  fetchTeamsByLeague,
  fetchPlayersByLeague,
  fetchFixturesByLeague,
  fetchFixturePlayerStats,
  ApiFootballError,
  type CanonicalCompetition,
  type CanonicalTeam,
  type CanonicalPlayer,
  type CanonicalAppearance,
} from "../providers/apiFootball";

// ============================================================================
// Types
// ============================================================================

export interface IngestionSummary {
  competitionsProcessed: number;
  teamsProcessed: number;
  playersProcessed: number;
  appearancesProcessed: number;
  errorsCount: number;
}

export interface IngestionResult {
  success: boolean;
  requestsUsed: number;
  summary: IngestionSummary;
  error?: string;
}

interface IngestionContext {
  requestsUsed: number;
  maxRequests: number;
  summary: IngestionSummary;
  runId: Id<"ingestionRuns">;
}

// ============================================================================
// Helper: Check if we can make more requests
// ============================================================================

function canMakeRequest(ctx: IngestionContext): boolean {
  return ctx.requestsUsed < ctx.maxRequests;
}

function incrementRequests(ctx: IngestionContext, count: number = 1): void {
  ctx.requestsUsed += count;
}

// Rate limiting: 10 requests per minute = 6 seconds per request
const RATE_LIMIT_DELAY_MS = 6500; // 6.5 seconds to be safe

async function rateLimitedDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_DELAY_MS));
}

// ============================================================================
// Mutations for data persistence (called from actions)
// ============================================================================

// Start an ingestion run
export const startIngestionRun = internalMutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.insert("ingestionRuns", {
      provider: "apiFootball",
      startedAt: Date.now(),
      status: "running",
    });
  },
});

// Complete an ingestion run
export const completeIngestionRun = internalMutation({
  args: {
    runId: v.id("ingestionRuns"),
    summary: v.object({
      competitionsProcessed: v.number(),
      teamsProcessed: v.number(),
      playersProcessed: v.number(),
      appearancesProcessed: v.number(),
      errorsCount: v.number(),
    }),
    requestsUsed: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.runId, {
      status: "completed",
      finishedAt: Date.now(),
      summary: args.summary,
      requestsUsed: args.requestsUsed,
    });
  },
});

// Fail an ingestion run
export const failIngestionRun = internalMutation({
  args: {
    runId: v.id("ingestionRuns"),
    error: v.string(),
    requestsUsed: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.runId, {
      status: "failed",
      finishedAt: Date.now(),
      error: args.error,
      requestsUsed: args.requestsUsed,
    });
  },
});

// Upsert a competition
export const upsertCompetition = internalMutation({
  args: {
    data: v.object({
      providerLeagueId: v.string(),
      name: v.string(),
      country: v.string(),
      season: v.string(),
      type: v.optional(v.string()),
      logoUrl: v.optional(v.string()),
      isActive: v.boolean(),
    }),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("competitions")
      .withIndex("by_provider_league", (q) =>
        q.eq("provider", "apiFootball").eq("providerLeagueId", args.data.providerLeagueId)
      )
      .first();

    if (existing) {
      // Update existing (preserve tier if set)
      await ctx.db.patch(existing._id, {
        name: args.data.name,
        season: args.data.season,
        type: args.data.type,
        logoUrl: args.data.logoUrl,
        // Don't update isActive if already set to preserve manual overrides
      });
      return existing._id;
    }

    // Insert new
    return await ctx.db.insert("competitions", {
      provider: "apiFootball",
      providerLeagueId: args.data.providerLeagueId,
      name: args.data.name,
      country: args.data.country,
      season: args.data.season,
      type: args.data.type,
      logoUrl: args.data.logoUrl,
      isActive: args.data.isActive,
      createdAt: Date.now(),
    });
  },
});

// Upsert a team
export const upsertTeam = internalMutation({
  args: {
    data: v.object({
      providerTeamId: v.string(),
      name: v.string(),
      logoUrl: v.optional(v.string()),
    }),
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("teams")
      .withIndex("by_provider_team", (q) =>
        q.eq("provider", "apiFootball").eq("providerTeamId", args.data.providerTeamId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.data.name,
        logoUrl: args.data.logoUrl,
        competitionId: args.competitionId,
      });
      return existing._id;
    }

    return await ctx.db.insert("teams", {
      provider: "apiFootball",
      providerTeamId: args.data.providerTeamId,
      name: args.data.name,
      logoUrl: args.data.logoUrl,
      competitionId: args.competitionId,
      createdAt: Date.now(),
    });
  },
});

// Upsert a player
export const upsertPlayer = internalMutation({
  args: {
    data: v.object({
      providerPlayerId: v.string(),
      name: v.string(),
      position: v.string(),
      positionGroup: v.union(
        v.literal("GK"),
        v.literal("DEF"),
        v.literal("MID"),
        v.literal("ATT")
      ),
      birthDate: v.optional(v.string()),
      age: v.optional(v.number()),
      nationality: v.optional(v.string()),
      photoUrl: v.optional(v.string()),
      providerTeamId: v.string(),
    }),
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, args) => {
    // Find the team by provider ID
    const team = await ctx.db
      .query("teams")
      .withIndex("by_provider_team", (q) =>
        q.eq("provider", "apiFootball").eq("providerTeamId", args.data.providerTeamId)
      )
      .first();

    if (!team) {
      console.warn(
        `[Ingest] Team not found for player ${args.data.name} (team ID: ${args.data.providerTeamId})`
      );
      return null;
    }

    const existing = await ctx.db
      .query("players")
      .withIndex("by_provider_player", (q) =>
        q.eq("provider", "apiFootball").eq("providerPlayerId", args.data.providerPlayerId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.data.name,
        position: args.data.position,
        positionGroup: args.data.positionGroup,
        birthDate: args.data.birthDate,
        age: args.data.age,
        nationality: args.data.nationality,
        photoUrl: args.data.photoUrl,
        teamId: team._id,
        competitionId: args.competitionId,
      });
      return existing._id;
    }

    return await ctx.db.insert("players", {
      provider: "apiFootball",
      providerPlayerId: args.data.providerPlayerId,
      name: args.data.name,
      position: args.data.position,
      positionGroup: args.data.positionGroup,
      birthDate: args.data.birthDate,
      age: args.data.age,
      nationality: args.data.nationality,
      photoUrl: args.data.photoUrl,
      teamId: team._id,
      competitionId: args.competitionId,
      createdAt: Date.now(),
    });
  },
});

// Upsert an appearance
export const upsertAppearance = internalMutation({
  args: {
    data: v.object({
      providerPlayerId: v.string(),
      providerFixtureId: v.string(),
      providerTeamId: v.string(),
      matchDate: v.string(),
      minutes: v.number(),
      // Player info for auto-creating players from fixtures
      playerName: v.optional(v.string()),
      playerPhoto: v.optional(v.string()),
      playerPosition: v.optional(v.string()),
      stats: v.object({
        goals: v.optional(v.number()),
        assists: v.optional(v.number()),
        yellowCards: v.optional(v.number()),
        redCards: v.optional(v.number()),
        shots: v.optional(v.number()),
        shotsOnTarget: v.optional(v.number()),
        passes: v.optional(v.number()),
        passAccuracy: v.optional(v.number()),
        keyPasses: v.optional(v.number()),
        tackles: v.optional(v.number()),
        interceptions: v.optional(v.number()),
        blocks: v.optional(v.number()),
        duelsWon: v.optional(v.number()),
        duelsTotal: v.optional(v.number()),
        dribbles: v.optional(v.number()),
        dribblesSuccessful: v.optional(v.number()),
        foulsCommitted: v.optional(v.number()),
        foulsDrawn: v.optional(v.number()),
        saves: v.optional(v.number()),
        goalsConceded: v.optional(v.number()),
        penaltiesSaved: v.optional(v.number()),
        penaltiesMissed: v.optional(v.number()),
      }),
    }),
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, args) => {
    // Find team first (required)
    const team = await ctx.db
      .query("teams")
      .withIndex("by_provider_team", (q) =>
        q.eq("provider", "apiFootball").eq("providerTeamId", args.data.providerTeamId)
      )
      .first();

    if (!team) {
      console.warn(
        `[Ingest] Team not found for appearance (team: ${args.data.providerTeamId})`
      );
      return null;
    }

    // Find or auto-create player
    let player = await ctx.db
      .query("players")
      .withIndex("by_provider_player", (q) =>
        q.eq("provider", "apiFootball").eq("providerPlayerId", args.data.providerPlayerId)
      )
      .first();

    if (!player) {
      // Auto-create player from fixture data if we have the info
      if (args.data.playerName) {
        // Map position to position group
        const position = args.data.playerPosition || "Unknown";
        let positionGroup: "GK" | "DEF" | "MID" | "ATT" = "MID";
        const posNorm = position.toUpperCase();
        if (posNorm === "G" || posNorm.includes("GOALKEEPER")) {
          positionGroup = "GK";
        } else if (posNorm === "D" || posNorm.includes("DEFENDER") || posNorm.includes("BACK")) {
          positionGroup = "DEF";
        } else if (posNorm === "F" || posNorm.includes("FORWARD") || posNorm.includes("ATTACKER")) {
          positionGroup = "ATT";
        }

        const playerId = await ctx.db.insert("players", {
          provider: "apiFootball",
          providerPlayerId: args.data.providerPlayerId,
          name: args.data.playerName,
          position,
          positionGroup,
          photoUrl: args.data.playerPhoto,
          teamId: team._id,
          competitionId: args.competitionId,
          createdAt: Date.now(),
        });
        player = await ctx.db.get(playerId);
        console.log(`[Ingest] Auto-created player: ${args.data.playerName} (${positionGroup})`);
      } else {
        console.warn(
          `[Ingest] Player not found and no player info to auto-create (player: ${args.data.providerPlayerId})`
        );
        return null;
      }
    }

    if (!player) {
      return null;
    }

    // Check for existing appearance (idempotency)
    const existing = await ctx.db
      .query("appearances")
      .withIndex("by_provider_fixture_player", (q) =>
        q
          .eq("provider", "apiFootball")
          .eq("providerFixtureId", args.data.providerFixtureId)
          .eq("playerId", player._id)
      )
      .first();

    if (existing) {
      // Update existing appearance
      await ctx.db.patch(existing._id, {
        minutes: args.data.minutes,
        stats: args.data.stats,
        matchDate: args.data.matchDate,
      });
      return existing._id;
    }

    return await ctx.db.insert("appearances", {
      provider: "apiFootball",
      providerFixtureId: args.data.providerFixtureId,
      playerId: player._id,
      teamId: team._id,
      competitionId: args.competitionId,
      matchDate: args.data.matchDate,
      minutes: args.data.minutes,
      stats: args.data.stats,
      createdAt: Date.now(),
    });
  },
});

// Get or create ingestion state for a competition
export const getIngestionState = internalMutation({
  args: {
    competitionId: v.id("competitions"),
    season: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("ingestionState")
      .withIndex("by_provider_competition", (q) =>
        q.eq("provider", "apiFootball").eq("competitionId", args.competitionId)
      )
      .first();

    if (existing) {
      return existing;
    }

    const id = await ctx.db.insert("ingestionState", {
      provider: "apiFootball",
      competitionId: args.competitionId,
      season: args.season,
      playersNextPage: 1,
      playersComplete: false,
      teamsComplete: false,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(id);
  },
});

// Update ingestion state
export const updateIngestionState = internalMutation({
  args: {
    stateId: v.id("ingestionState"),
    updates: v.object({
      playersNextPage: v.optional(v.number()),
      playersComplete: v.optional(v.boolean()),
      teamsComplete: v.optional(v.boolean()),
      fixturesLastDate: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.stateId, {
      ...args.updates,
      updatedAt: Date.now(),
    });
  },
});

// Get active competitions
export const getActiveCompetitions = internalMutation({
  args: {
    countries: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    let competitions = await ctx.db
      .query("competitions")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();

    if (args.countries && args.countries.length > 0) {
      competitions = competitions.filter((c) =>
        args.countries!.includes(c.country)
      );
    }

    return competitions;
  },
});

// ============================================================================
// Main Ingestion Action: ingestCountries
// ============================================================================

export const ingestCountries = internalAction({
  args: {
    countries: v.array(v.string()),
    season: v.optional(v.string()),
    maxRequests: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const season = args.season || new Date().getFullYear().toString();
    const maxRequests = args.maxRequests || 50; // Conservative default for free plan

    // Start ingestion run
    const runId = await ctx.runMutation(internal.ingest.apiFootballIngest.startIngestionRun, {});

    const ingestionCtx: IngestionContext = {
      requestsUsed: 0,
      maxRequests,
      summary: {
        competitionsProcessed: 0,
        teamsProcessed: 0,
        playersProcessed: 0,
        appearancesProcessed: 0,
        errorsCount: 0,
      },
      runId,
    };

    try {
      console.log(
        `[Ingest] Starting ingestion for countries: ${args.countries.join(", ")}, season: ${season}, maxRequests: ${maxRequests}`
      );

      // Step 1: Fetch and upsert competitions for each country
      for (const country of args.countries) {
        if (!canMakeRequest(ingestionCtx)) {
          console.log("[Ingest] Max requests reached, stopping competition fetch");
          break;
        }

        console.log(`[Ingest] Fetching leagues for ${country}...`);
        try {
          const result = await fetchLeaguesByCountry(country);
          incrementRequests(ingestionCtx);

          for (const comp of result.items) {
            await ctx.runMutation(internal.ingest.apiFootballIngest.upsertCompetition, {
              data: {
                providerLeagueId: comp.providerLeagueId,
                name: comp.name,
                country: comp.country,
                season: comp.season,
                type: comp.type,
                logoUrl: comp.logoUrl,
                isActive: comp.isActive,
              },
            });
            ingestionCtx.summary.competitionsProcessed++;
          }

          console.log(`[Ingest] Processed ${result.items.length} leagues for ${country}`);
        } catch (error) {
          console.error(`[Ingest] Error fetching leagues for ${country}:`, error);
          ingestionCtx.summary.errorsCount++;
        }
      }

      // Step 2: Get active competitions and fetch teams/players
      const activeCompetitions = await ctx.runMutation(
        internal.ingest.apiFootballIngest.getActiveCompetitions,
        { countries: args.countries }
      );

      console.log(`[Ingest] Found ${activeCompetitions.length} active competitions`);

      for (const competition of activeCompetitions) {
        if (!canMakeRequest(ingestionCtx)) {
          console.log("[Ingest] Max requests reached, stopping");
          break;
        }

        // Get or create ingestion state
        const state = await ctx.runMutation(
          internal.ingest.apiFootballIngest.getIngestionState,
          { competitionId: competition._id, season }
        );

        if (!state) continue;

        // Fetch teams if not complete
        if (!state.teamsComplete) {
          if (!canMakeRequest(ingestionCtx)) break;

          console.log(`[Ingest] Fetching teams for ${competition.name}...`);
          try {
            const teamsResult = await fetchTeamsByLeague(
              competition.providerLeagueId,
              season
            );
            incrementRequests(ingestionCtx);

            for (const team of teamsResult.items) {
              await ctx.runMutation(internal.ingest.apiFootballIngest.upsertTeam, {
                data: {
                  providerTeamId: team.providerTeamId,
                  name: team.name,
                  logoUrl: team.logoUrl,
                },
                competitionId: competition._id,
              });
              ingestionCtx.summary.teamsProcessed++;
            }

            await ctx.runMutation(internal.ingest.apiFootballIngest.updateIngestionState, {
              stateId: state._id,
              updates: { teamsComplete: true },
            });

            console.log(`[Ingest] Processed ${teamsResult.items.length} teams for ${competition.name}`);
          } catch (error) {
            console.error(`[Ingest] Error fetching teams for ${competition.name}:`, error);
            ingestionCtx.summary.errorsCount++;
          }
        }

        // Fetch players (paginated, resumable)
        if (!state.playersComplete) {
          let currentPage = state.playersNextPage || 1;
          let hasMorePages = true;

          while (hasMorePages && canMakeRequest(ingestionCtx)) {
            console.log(`[Ingest] Fetching players for ${competition.name}, page ${currentPage}...`);
            try {
              const playersResult = await fetchPlayersByLeague(
                competition.providerLeagueId,
                season,
                currentPage
              );
              incrementRequests(ingestionCtx);

              for (const player of playersResult.items) {
                await ctx.runMutation(internal.ingest.apiFootballIngest.upsertPlayer, {
                  data: {
                    providerPlayerId: player.providerPlayerId,
                    name: player.name,
                    position: player.position,
                    positionGroup: player.positionGroup,
                    birthDate: player.birthDate,
                    age: player.age,
                    nationality: player.nationality,
                    photoUrl: player.photoUrl,
                    providerTeamId: player.providerTeamId,
                  },
                  competitionId: competition._id,
                });
                ingestionCtx.summary.playersProcessed++;
              }

              // Check pagination
              if (playersResult.paging) {
                hasMorePages = playersResult.paging.current < playersResult.paging.total;
                currentPage = playersResult.paging.current + 1;
              } else {
                hasMorePages = false;
              }

              // Update state with progress
              await ctx.runMutation(internal.ingest.apiFootballIngest.updateIngestionState, {
                stateId: state._id,
                updates: {
                  playersNextPage: hasMorePages ? currentPage : undefined,
                  playersComplete: !hasMorePages,
                },
              });

              console.log(
                `[Ingest] Processed ${playersResult.items.length} players from page ${currentPage - 1}` +
                  (hasMorePages ? `, next page: ${currentPage}` : " (complete)")
              );
            } catch (error) {
              console.error(
                `[Ingest] Error fetching players for ${competition.name}, page ${currentPage}:`,
                error
              );
              ingestionCtx.summary.errorsCount++;
              break; // Stop pagination on error, will resume next run
            }
          }
        }
      }

      // Complete the run
      await ctx.runMutation(internal.ingest.apiFootballIngest.completeIngestionRun, {
        runId,
        summary: ingestionCtx.summary,
        requestsUsed: ingestionCtx.requestsUsed,
      });

      console.log(`[Ingest] Completed. Requests used: ${ingestionCtx.requestsUsed}/${maxRequests}`);
      console.log("[Ingest] Summary:", ingestionCtx.summary);

      return {
        success: true,
        requestsUsed: ingestionCtx.requestsUsed,
        summary: ingestionCtx.summary,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[Ingest] Fatal error:", errorMessage);

      await ctx.runMutation(internal.ingest.apiFootballIngest.failIngestionRun, {
        runId,
        error: errorMessage,
        requestsUsed: ingestionCtx.requestsUsed,
      });

      return {
        success: false,
        error: errorMessage,
        requestsUsed: ingestionCtx.requestsUsed,
        summary: ingestionCtx.summary,
      };
    }
  },
});

// ============================================================================
// Incremental Fixtures Ingestion
// ============================================================================

export const ingestRecentFixtures = internalAction({
  args: {
    dateFrom: v.string(), // YYYY-MM-DD
    dateTo: v.string(), // YYYY-MM-DD
    maxRequests: v.optional(v.number()),
    countries: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const maxRequests = args.maxRequests || 30;

    const runId = await ctx.runMutation(internal.ingest.apiFootballIngest.startIngestionRun, {});

    const ingestionCtx: IngestionContext = {
      requestsUsed: 0,
      maxRequests,
      summary: {
        competitionsProcessed: 0,
        teamsProcessed: 0,
        playersProcessed: 0,
        appearancesProcessed: 0,
        errorsCount: 0,
      },
      runId,
    };

    try {
      console.log(
        `[Ingest:Fixtures] Starting for ${args.dateFrom} to ${args.dateTo}, maxRequests: ${maxRequests}`
      );

      // Get active competitions
      const activeCompetitions = await ctx.runMutation(
        internal.ingest.apiFootballIngest.getActiveCompetitions,
        { countries: args.countries }
      );

      console.log(`[Ingest:Fixtures] Processing ${activeCompetitions.length} competitions`);

      for (const competition of activeCompetitions) {
        if (!canMakeRequest(ingestionCtx)) {
          console.log("[Ingest:Fixtures] Max requests reached, stopping");
          break;
        }

        console.log(`[Ingest:Fixtures] Fetching fixtures for ${competition.name}...`);
        try {
          // Rate limit: wait before making request
          await rateLimitedDelay();

          const fixturesResult = await fetchFixturesByLeague(
            competition.providerLeagueId,
            competition.season,
            args.dateFrom,
            args.dateTo
          );
          incrementRequests(ingestionCtx);

          // Filter for finished fixtures (FT = Full Time, AET = After Extra Time, PEN = Penalties)
          const finishedFixtures = fixturesResult.items.filter(
            (f) => ["FT", "AET", "PEN"].includes(f.status)
          );

          console.log(
            `[Ingest:Fixtures] Found ${finishedFixtures.length} finished fixtures for ${competition.name}`
          );

          for (const fixture of finishedFixtures) {
            if (!canMakeRequest(ingestionCtx)) break;

            console.log(
              `[Ingest:Fixtures] Fetching player stats for fixture ${fixture.providerFixtureId}...`
            );
            try {
              // Rate limit: wait before making request
              await rateLimitedDelay();

              const playerStats = await fetchFixturePlayerStats(fixture.providerFixtureId);
              incrementRequests(ingestionCtx, 2); // This endpoint makes 2 requests internally

              for (const appearance of playerStats.items) {
                const result = await ctx.runMutation(internal.ingest.apiFootballIngest.upsertAppearance, {
                  data: {
                    providerPlayerId: appearance.providerPlayerId,
                    providerFixtureId: appearance.providerFixtureId,
                    providerTeamId: appearance.providerTeamId,
                    matchDate: appearance.matchDate,
                    minutes: appearance.minutes,
                    // Include player info for auto-creation
                    playerName: appearance.playerName,
                    playerPhoto: appearance.playerPhoto,
                    playerPosition: appearance.playerPosition,
                    stats: appearance.stats,
                  },
                  competitionId: competition._id,
                });
                if (result) {
                  ingestionCtx.summary.appearancesProcessed++;
                }
              }

              console.log(
                `[Ingest:Fixtures] Processed ${playerStats.items.length} appearances for fixture ${fixture.providerFixtureId}`
              );
            } catch (error) {
              console.error(
                `[Ingest:Fixtures] Error fetching player stats for fixture ${fixture.providerFixtureId}:`,
                error
              );
              ingestionCtx.summary.errorsCount++;
            }
          }

          ingestionCtx.summary.competitionsProcessed++;
        } catch (error) {
          console.error(
            `[Ingest:Fixtures] Error fetching fixtures for ${competition.name}:`,
            error
          );
          ingestionCtx.summary.errorsCount++;
        }
      }

      await ctx.runMutation(internal.ingest.apiFootballIngest.completeIngestionRun, {
        runId,
        summary: ingestionCtx.summary,
        requestsUsed: ingestionCtx.requestsUsed,
      });

      console.log(
        `[Ingest:Fixtures] Completed. Requests used: ${ingestionCtx.requestsUsed}/${maxRequests}`
      );
      console.log("[Ingest:Fixtures] Summary:", ingestionCtx.summary);

      return {
        success: true,
        requestsUsed: ingestionCtx.requestsUsed,
        summary: ingestionCtx.summary,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[Ingest:Fixtures] Fatal error:", errorMessage);

      await ctx.runMutation(internal.ingest.apiFootballIngest.failIngestionRun, {
        runId,
        error: errorMessage,
        requestsUsed: ingestionCtx.requestsUsed,
      });

      return {
        success: false,
        error: errorMessage,
        requestsUsed: ingestionCtx.requestsUsed,
        summary: ingestionCtx.summary,
      };
    }
  },
});
