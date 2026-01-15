/**
 * Admin Functions for Manual Triggers
 *
 * These internal functions can be called from the Convex dashboard
 * to manually trigger ingestion or update competition settings.
 *
 * Usage from Convex Dashboard:
 * 1. Go to Functions tab
 * 2. Find the function under "admin"
 * 3. Click "Run" and provide arguments
 */

import { v } from "convex/values";
import { internalAction, internalMutation, internalQuery, query } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { tierValidator } from "./schema";
import type { IngestionResult } from "./ingest/apiFootballIngest";
import type { DailyIngestionResult } from "./ingest/cronRunner";
import {
  fetchTeamsByLeague,
  fetchPlayersByLeague,
} from "./providers/apiFootball";

// ============================================================================
// Manual Ingestion Triggers
// ============================================================================

/**
 * Manually trigger a full ingestion run for NL + DE
 *
 * @param maxRequests - Maximum API requests to make (default: 50)
 *
 * Run from dashboard: internal.admin.adminRunIngestionNow
 * Args: { "maxRequests": 50 }
 */
export const adminRunIngestionNow = internalAction({
  args: {
    maxRequests: v.optional(v.number()),
    countries: v.optional(v.array(v.string())),
    season: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<IngestionResult> => {
    const countries = args.countries || ["Netherlands", "Germany"];
    const season = args.season || new Date().getFullYear().toString();
    const maxRequests = args.maxRequests || 50;

    console.log(
      `[Admin] Starting manual ingestion for ${countries.join(", ")}, season: ${season}, maxRequests: ${maxRequests}`
    );

    const result: IngestionResult = await ctx.runAction(
      internal.ingest.apiFootballIngest.ingestCountries,
      {
        countries,
        season,
        maxRequests,
      }
    );

    console.log("[Admin] Ingestion result:", result);
    return result;
  },
});

/**
 * Manually trigger fixture ingestion for recent matches
 *
 * @param dateFrom - Start date (YYYY-MM-DD), defaults to 2 days ago
 * @param dateTo - End date (YYYY-MM-DD), defaults to today
 * @param maxRequests - Maximum API requests (default: 30)
 *
 * Run from dashboard: internal.admin.adminRunFixturesNow
 * Args: { "dateFrom": "2024-01-01", "dateTo": "2024-01-02", "maxRequests": 30 }
 */
export const adminRunFixturesNow = internalAction({
  args: {
    dateFrom: v.optional(v.string()),
    dateTo: v.optional(v.string()),
    maxRequests: v.optional(v.number()),
    countries: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args): Promise<IngestionResult> => {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    const dateFrom = args.dateFrom || twoDaysAgo.toISOString().split("T")[0];
    const dateTo = args.dateTo || today.toISOString().split("T")[0];
    const countries = args.countries || ["Netherlands", "Germany"];
    const maxRequests = args.maxRequests || 30;

    console.log(
      `[Admin] Starting fixture ingestion from ${dateFrom} to ${dateTo}, maxRequests: ${maxRequests}`
    );

    const result: IngestionResult = await ctx.runAction(
      internal.ingest.apiFootballIngest.ingestRecentFixtures,
      {
        dateFrom,
        dateTo,
        maxRequests,
        countries,
      }
    );

    console.log("[Admin] Fixtures result:", result);
    return result;
  },
});

/**
 * Run a complete daily ingestion cycle (same as cron job)
 *
 * Run from dashboard: internal.admin.adminRunDailyNow
 * Args: {}
 */
export const adminRunDailyNow = internalAction({
  args: {},
  handler: async (ctx): Promise<DailyIngestionResult> => {
    console.log("[Admin] Running full daily ingestion cycle...");

    const result: DailyIngestionResult = await ctx.runAction(
      internal.ingest.cronRunner.runDailyIngestion,
      {}
    );

    console.log("[Admin] Daily ingestion result:", result);
    return result;
  },
});

// Internal helper query to get competition by ID
export const getCompetitionById = internalQuery({
  args: { competitionId: v.id("competitions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.competitionId);
  },
});

/**
 * Targeted ingestion for a specific competition
 * Fetches ALL teams and ALL players for one league until complete
 *
 * @param competitionId - The Convex ID of the competition to ingest
 * @param maxRequests - Maximum API requests (default: 30)
 *
 * Run from dashboard: internal.admin.ingestSingleCompetition
 */
export const ingestSingleCompetition = internalAction({
  args: {
    competitionId: v.id("competitions"),
    maxRequests: v.optional(v.number()),
    season: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    competitionName: string;
    requestsUsed: number;
    teamsAdded: number;
    playersAdded: number;
    playersComplete: boolean;
    error?: string;
  }> => {
    const maxRequests = args.maxRequests || 30;
    let requestsUsed = 0;
    let teamsAdded = 0;
    let playersAdded = 0;
    let playersComplete = false;

    // Get competition details
    const competition = await ctx.runQuery(internal.admin.getCompetitionById, {
      competitionId: args.competitionId,
    });

    if (!competition) {
      return {
        success: false,
        competitionName: "Unknown",
        requestsUsed: 0,
        teamsAdded: 0,
        playersAdded: 0,
        playersComplete: false,
        error: "Competition not found",
      };
    }

    const season = args.season || competition.season;
    console.log(`[Admin] Starting targeted ingestion for ${competition.name} (${season})`);

    try {
      // Get or create ingestion state
      const state = await ctx.runMutation(
        internal.ingest.apiFootballIngest.getIngestionState,
        { competitionId: args.competitionId, season }
      );

      // Step 1: Fetch teams if not complete
      if (!state?.teamsComplete && requestsUsed < maxRequests) {
        console.log(`[Admin] Fetching teams for ${competition.name}...`);
        const teamsResult = await fetchTeamsByLeague(
          competition.providerLeagueId,
          season
        );
        requestsUsed++;

        for (const team of teamsResult.items) {
          await ctx.runMutation(internal.ingest.apiFootballIngest.upsertTeam, {
            data: {
              providerTeamId: team.providerTeamId,
              name: team.name,
              logoUrl: team.logoUrl,
            },
            competitionId: args.competitionId,
          });
          teamsAdded++;
        }

        await ctx.runMutation(internal.ingest.apiFootballIngest.updateIngestionState, {
          stateId: state!._id,
          updates: { teamsComplete: true },
        });

        console.log(`[Admin] Added ${teamsAdded} teams for ${competition.name}`);
      }

      // Step 2: Fetch ALL players (paginated)
      // Note: Free plan limits to page 3 max (60 players)
      const MAX_PAGE_FREE_PLAN = 3;
      let currentPage = state?.playersNextPage || 1;
      let hasMorePages = !state?.playersComplete && currentPage <= MAX_PAGE_FREE_PLAN;

      while (hasMorePages && requestsUsed < maxRequests && currentPage <= MAX_PAGE_FREE_PLAN) {
        console.log(`[Admin] Fetching players page ${currentPage} for ${competition.name}...`);

        const playersResult = await fetchPlayersByLeague(
          competition.providerLeagueId,
          season,
          currentPage
        );
        requestsUsed++;

        for (const player of playersResult.items) {
          const result = await ctx.runMutation(internal.ingest.apiFootballIngest.upsertPlayer, {
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
            competitionId: args.competitionId,
          });
          if (result) playersAdded++;
        }

        // Check pagination (but cap at MAX_PAGE_FREE_PLAN)
        if (playersResult.paging) {
          const apiHasMore = playersResult.paging.current < playersResult.paging.total;
          currentPage = playersResult.paging.current + 1;
          hasMorePages = apiHasMore && currentPage <= MAX_PAGE_FREE_PLAN;
          console.log(`[Admin] Page ${playersResult.paging.current}/${Math.min(playersResult.paging.total, MAX_PAGE_FREE_PLAN)} - ${playersResult.items.length} players`);
        } else {
          hasMorePages = false;
        }

        // Update state
        await ctx.runMutation(internal.ingest.apiFootballIngest.updateIngestionState, {
          stateId: state!._id,
          updates: {
            playersNextPage: hasMorePages ? currentPage : undefined,
            playersComplete: !hasMorePages,
          },
        });
      }

      playersComplete = !hasMorePages;

      console.log(`[Admin] Completed: ${competition.name} - ${teamsAdded} teams, ${playersAdded} players, complete: ${playersComplete}`);

      return {
        success: true,
        competitionName: competition.name,
        requestsUsed,
        teamsAdded,
        playersAdded,
        playersComplete,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[Admin] Error ingesting ${competition.name}:`, errorMessage);
      return {
        success: false,
        competitionName: competition.name,
        requestsUsed,
        teamsAdded,
        playersAdded,
        playersComplete: false,
        error: errorMessage,
      };
    }
  },
});

// ============================================================================
// Competition Management
// ============================================================================

/**
 * Set the tier for a competition
 *
 * @param competitionId - The Convex ID of the competition
 * @param tier - One of: Platinum, Diamond, Elite, Gold, Silver, Bronze
 *
 * Run from dashboard: internal.admin.setCompetitionTier
 * Args: { "competitionId": "...", "tier": "Gold" }
 */
export const setCompetitionTier = internalMutation({
  args: {
    competitionId: v.id("competitions"),
    tier: tierValidator,
  },
  handler: async (ctx, args) => {
    const competition = await ctx.db.get(args.competitionId);
    if (!competition) {
      throw new Error(`Competition not found: ${args.competitionId}`);
    }

    await ctx.db.patch(args.competitionId, {
      tier: args.tier,
    });

    console.log(
      `[Admin] Set tier for ${competition.name} to ${args.tier}`
    );

    return { success: true, competition: competition.name, tier: args.tier };
  },
});

/**
 * Toggle competition active status
 *
 * @param competitionId - The Convex ID of the competition
 * @param isActive - Whether the competition should be active
 *
 * Run from dashboard: internal.admin.setCompetitionActive
 */
export const setCompetitionActive = internalMutation({
  args: {
    competitionId: v.id("competitions"),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const competition = await ctx.db.get(args.competitionId);
    if (!competition) {
      throw new Error(`Competition not found: ${args.competitionId}`);
    }

    await ctx.db.patch(args.competitionId, {
      isActive: args.isActive,
    });

    console.log(
      `[Admin] Set ${competition.name} isActive to ${args.isActive}`
    );

    return { success: true, competition: competition.name, isActive: args.isActive };
  },
});

/**
 * Batch set active status for competitions
 *
 * @param isActive - Whether to set competitions as active
 * @param country - Optional: filter by country
 * @param nameContains - Optional: filter by name pattern
 * @param excludeNames - Optional: names to exclude from update
 */
export const batchSetActive = internalMutation({
  args: {
    isActive: v.boolean(),
    country: v.optional(v.string()),
    nameContains: v.optional(v.string()),
    excludeNames: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    let competitions = await ctx.db.query("competitions").collect();

    if (args.country) {
      competitions = competitions.filter((c) => c.country === args.country);
    }

    if (args.nameContains) {
      competitions = competitions.filter((c) =>
        c.name.toLowerCase().includes(args.nameContains!.toLowerCase())
      );
    }

    if (args.excludeNames && args.excludeNames.length > 0) {
      const excludeLower = args.excludeNames.map((n) => n.toLowerCase());
      competitions = competitions.filter(
        (c) => !excludeLower.some((ex) => c.name.toLowerCase().includes(ex))
      );
    }

    let updated = 0;
    for (const competition of competitions) {
      await ctx.db.patch(competition._id, { isActive: args.isActive });
      updated++;
    }

    console.log(
      `[Admin] Set isActive=${args.isActive} for ${updated} competitions`
    );

    return { success: true, updated, isActive: args.isActive };
  },
});

/**
 * Batch set tiers for multiple competitions by name pattern
 *
 * @param country - Country to filter by
 * @param tier - Tier to set
 * @param nameContains - Optional name filter
 */
export const batchSetTier = internalMutation({
  args: {
    country: v.string(),
    tier: tierValidator,
    nameContains: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let competitions = await ctx.db
      .query("competitions")
      .withIndex("by_country", (q) => q.eq("country", args.country))
      .collect();

    if (args.nameContains) {
      competitions = competitions.filter((c) =>
        c.name.toLowerCase().includes(args.nameContains!.toLowerCase())
      );
    }

    let updated = 0;
    for (const competition of competitions) {
      await ctx.db.patch(competition._id, { tier: args.tier });
      updated++;
    }

    console.log(
      `[Admin] Set tier ${args.tier} for ${updated} competitions in ${args.country}`
    );

    return { success: true, updated, tier: args.tier };
  },
});

// ============================================================================
// Data Inspection Queries
// ============================================================================

/**
 * List all competitions with their current settings
 */
export const listCompetitions = query({
  args: {
    country: v.optional(v.string()),
    activeOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let competitions;

    if (args.country) {
      competitions = await ctx.db
        .query("competitions")
        .withIndex("by_country", (q) => q.eq("country", args.country!))
        .collect();
    } else if (args.activeOnly) {
      competitions = await ctx.db
        .query("competitions")
        .withIndex("by_active", (q) => q.eq("isActive", true))
        .collect();
    } else {
      competitions = await ctx.db.query("competitions").collect();
    }

    return competitions.map((c) => ({
      _id: c._id,
      name: c.name,
      country: c.country,
      season: c.season,
      tier: c.tier,
      isActive: c.isActive,
      type: c.type,
    }));
  },
});

/**
 * Get ingestion run history
 */
export const listIngestionRuns = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;

    const runs = await ctx.db
      .query("ingestionRuns")
      .withIndex("by_startedAt")
      .order("desc")
      .take(limit);

    return runs.map((r) => ({
      _id: r._id,
      status: r.status,
      startedAt: new Date(r.startedAt).toISOString(),
      finishedAt: r.finishedAt ? new Date(r.finishedAt).toISOString() : null,
      requestsUsed: r.requestsUsed,
      summary: r.summary,
      error: r.error,
    }));
  },
});

/**
 * Get ingestion stats summary
 */
export const getIngestionStats = query({
  args: {},
  handler: async (ctx) => {
    const [competitions, teams, players, appearances] = await Promise.all([
      ctx.db.query("competitions").collect(),
      ctx.db.query("teams").collect(),
      ctx.db.query("players").collect(),
      ctx.db.query("appearances").collect(),
    ]);

    const activeCompetitions = competitions.filter((c) => c.isActive);
    const competitionsByCountry = competitions.reduce(
      (acc, c) => {
        acc[c.country] = (acc[c.country] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      totalCompetitions: competitions.length,
      activeCompetitions: activeCompetitions.length,
      totalTeams: teams.length,
      totalPlayers: players.length,
      totalAppearances: appearances.length,
      competitionsByCountry,
    };
  },
});

/**
 * Debug: Test API connection and return config info
 */
export const debugTestApiConnection = internalAction({
  args: {
    country: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    config: {
      hasKey: boolean;
      host: string | undefined;
      mode: string | undefined;
    };
    result?: unknown;
    error?: string;
  }> => {
    const country = args.country || "Netherlands";

    console.log("[Debug] Testing API connection...");
    console.log("[Debug] API_FOOTBALL_KEY exists:", !!process.env.API_FOOTBALL_KEY);
    console.log("[Debug] API_FOOTBALL_HOST:", process.env.API_FOOTBALL_HOST);
    console.log("[Debug] API_FOOTBALL_MODE:", process.env.API_FOOTBALL_MODE);

    try {
      // Import dynamically to get the latest config
      const { fetchLeaguesByCountry } = await import("./providers/apiFootball");

      console.log(`[Debug] Fetching leagues for ${country}...`);
      const result = await fetchLeaguesByCountry(country);

      console.log(`[Debug] Success! Found ${result.items.length} leagues`);
      console.log("[Debug] First 3 leagues:", result.items.slice(0, 3).map(l => l.name));

      return {
        success: true,
        config: {
          hasKey: !!process.env.API_FOOTBALL_KEY,
          host: process.env.API_FOOTBALL_HOST,
          mode: process.env.API_FOOTBALL_MODE,
        },
        result: {
          leaguesFound: result.items.length,
          firstLeagues: result.items.slice(0, 5).map(l => ({
            id: l.providerLeagueId,
            name: l.name,
            type: l.type,
          })),
          rateLimit: result.rateLimit,
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[Debug] API Error:", errorMessage);

      return {
        success: false,
        config: {
          hasKey: !!process.env.API_FOOTBALL_KEY,
          host: process.env.API_FOOTBALL_HOST,
          mode: process.env.API_FOOTBALL_MODE,
        },
        error: errorMessage,
      };
    }
  },
});

/**
 * Update season for all competitions (useful for API version mismatches)
 *
 * @param fromSeason - Current season value to update
 * @param toSeason - New season value
 * @param country - Optional: only update for specific country
 *
 * Run from dashboard: internal.admin.updateCompetitionSeasons
 * Args: { "fromSeason": "2025", "toSeason": "2024" }
 */
export const updateCompetitionSeasons = internalMutation({
  args: {
    fromSeason: v.string(),
    toSeason: v.string(),
    country: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let competitions;

    if (args.country) {
      competitions = await ctx.db
        .query("competitions")
        .withIndex("by_country", (q) => q.eq("country", args.country!))
        .collect();
    } else {
      competitions = await ctx.db.query("competitions").collect();
    }

    // Filter by fromSeason
    competitions = competitions.filter((c) => c.season === args.fromSeason);

    let updated = 0;
    for (const competition of competitions) {
      await ctx.db.patch(competition._id, { season: args.toSeason });
      updated++;
    }

    console.log(
      `[Admin] Updated ${updated} competitions from season ${args.fromSeason} to ${args.toSeason}`
    );

    return { success: true, updated, fromSeason: args.fromSeason, toSeason: args.toSeason };
  },
});

/**
 * Reset ingestion state for a competition (to re-ingest from scratch)
 */
export const resetIngestionState = internalMutation({
  args: {
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, args) => {
    const state = await ctx.db
      .query("ingestionState")
      .withIndex("by_provider_competition", (q) =>
        q.eq("provider", "apiFootball").eq("competitionId", args.competitionId)
      )
      .first();

    if (state) {
      await ctx.db.delete(state._id);
      console.log(`[Admin] Deleted ingestion state for competition ${args.competitionId}`);
    }

    return { success: true, deleted: !!state };
  },
});

// ============================================================================
// Rating System Management
// ============================================================================

/**
 * Seed default rating profiles
 *
 * Run from dashboard: internal.admin.adminSeedRatingProfiles
 * Args: { "force": false }
 */
export const adminSeedRatingProfiles = internalAction({
  args: {
    force: v.optional(v.boolean()),
  },
  handler: async (ctx, args): Promise<{ seeded: boolean; count: number }> => {
    console.log("[Admin] Seeding rating profiles...");

    const result: { seeded: boolean; count: number } = await ctx.runMutation(
      internal.ratings.seed.seedRatingProfiles,
      { force: args.force ?? false }
    );

    console.log("[Admin] Seed result:", result);
    return result;
  },
});

/**
 * Manually trigger rating computation
 *
 * @param competitionId - Optional: compute for specific competition only
 * @param country - Optional: compute for specific country only
 * @param dryRun - If true, compute but don't persist
 *
 * Run from dashboard: internal.admin.adminComputeRatings
 * Args: { "country": "Netherlands", "dryRun": false }
 */
interface RatingComputationResult {
  success: boolean;
  playersProcessed: number;
  ratingsComputed: number;
  competitionsRated: number;
  dryRun?: boolean;
}

export const adminComputeRatings = internalAction({
  args: {
    competitionId: v.optional(v.id("competitions")),
    country: v.optional(v.string()),
    dryRun: v.optional(v.boolean()),
  },
  handler: async (ctx, args): Promise<RatingComputationResult> => {
    console.log("[Admin] Starting rating computation...");

    const result: RatingComputationResult = await ctx.runAction(
      internal.ratings.compute.recomputeRollingStatsAndRatings,
      {
        competitionId: args.competitionId,
        country: args.country,
        dryRun: args.dryRun ?? false,
      }
    );

    console.log("[Admin] Rating computation result:", result);
    return result;
  },
});

/**
 * Debug: Check appearances and player minutes
 */
export const debugAppearances = internalQuery({
  args: {},
  handler: async (ctx) => {
    const appearances = await ctx.db.query("appearances").collect();
    const players = await ctx.db.query("players").collect();

    // Group appearances by player
    const minutesByPlayer = new Map<string, number>();
    for (const app of appearances) {
      const current = minutesByPlayer.get(app.playerId.toString()) ?? 0;
      minutesByPlayer.set(app.playerId.toString(), current + app.minutes);
    }

    // Find players with most minutes
    const playerMinutesList = Array.from(minutesByPlayer.entries())
      .map(([id, mins]) => ({ playerId: id, minutes: mins }))
      .sort((a, b) => b.minutes - a.minutes);

    // Players with 300+ minutes
    const playersWithEnoughMinutes = playerMinutesList.filter(
      (p) => p.minutes >= 300
    );

    // Check if appearance players exist in players table
    const playerIds = new Set(players.map((p) => p._id.toString()));
    const appearancePlayerIds = new Set(appearances.map((a) => a.playerId.toString()));
    const matchingPlayers = [...appearancePlayerIds].filter((id) =>
      playerIds.has(id)
    );

    return {
      totalAppearances: appearances.length,
      totalPlayers: players.length,
      uniquePlayersWithAppearances: appearancePlayerIds.size,
      appearancePlayersInPlayersTable: matchingPlayers.length,
      playersWithEnoughMinutes: playersWithEnoughMinutes.length,
      topPlayersByMinutes: playerMinutesList.slice(0, 10),
      sampleAppearance: appearances[0] ?? null,
    };
  },
});

/**
 * Get rating stats summary
 */
export const getRatingStats = query({
  args: {},
  handler: async (ctx) => {
    const [playerRatings, playerRollingStats, competitionRatings, ratingProfiles] =
      await Promise.all([
        ctx.db.query("playerRatings").collect(),
        ctx.db.query("playerRollingStats").collect(),
        ctx.db.query("competitionRatings").collect(),
        ctx.db.query("ratingProfiles").collect(),
      ]);

    // Get top rated players
    const topRated = [...playerRatings]
      .sort((a, b) => b.rating365 - a.rating365)
      .slice(0, 10);

    // Get rating distribution
    const ratingBuckets = {
      "90-100": 0,
      "80-89": 0,
      "70-79": 0,
      "60-69": 0,
      "50-59": 0,
      "40-49": 0,
      "30-39": 0,
      "20-29": 0,
      "10-19": 0,
      "0-9": 0,
    };

    for (const r of playerRatings) {
      if (r.rating365 >= 90) ratingBuckets["90-100"]++;
      else if (r.rating365 >= 80) ratingBuckets["80-89"]++;
      else if (r.rating365 >= 70) ratingBuckets["70-79"]++;
      else if (r.rating365 >= 60) ratingBuckets["60-69"]++;
      else if (r.rating365 >= 50) ratingBuckets["50-59"]++;
      else if (r.rating365 >= 40) ratingBuckets["40-49"]++;
      else if (r.rating365 >= 30) ratingBuckets["30-39"]++;
      else if (r.rating365 >= 20) ratingBuckets["20-29"]++;
      else if (r.rating365 >= 10) ratingBuckets["10-19"]++;
      else ratingBuckets["0-9"]++;
    }

    return {
      totalPlayerRatings: playerRatings.length,
      totalRollingStats: playerRollingStats.length,
      totalCompetitionRatings: competitionRatings.length,
      ratingProfiles: ratingProfiles.length,
      topRated,
      ratingDistribution: ratingBuckets,
    };
  },
});

/**
 * List rating profiles
 */
export const listRatingProfiles = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("ratingProfiles").collect();
  },
});

/**
 * Update a rating profile's weights
 *
 * Run from dashboard: internal.admin.updateRatingProfile
 */
export const adminUpdateRatingProfile = internalMutation({
  args: {
    positionGroup: v.union(
      v.literal("GK"),
      v.literal("DEF"),
      v.literal("MID"),
      v.literal("ATT")
    ),
    weights: v.record(v.string(), v.number()),
    invertMetrics: v.array(v.string()),
  },
  handler: async (ctx, args): Promise<Id<"ratingProfiles">> => {
    const existing = await ctx.db
      .query("ratingProfiles")
      .withIndex("by_positionGroup", (q) =>
        q.eq("positionGroup", args.positionGroup)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        weights: args.weights,
        invertMetrics: args.invertMetrics,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("ratingProfiles", {
      positionGroup: args.positionGroup,
      weights: args.weights,
      invertMetrics: args.invertMetrics,
      updatedAt: Date.now(),
    });
  },
});
