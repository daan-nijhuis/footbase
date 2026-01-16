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
 * List all players with their ratings (if any)
 * This is a public query for frontend use
 */
export const listPlayersWithRatings = query({
  args: {
    limit: v.optional(v.number()),
    competitionId: v.optional(v.id("competitions")),
    hasRatingOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100;

    // Get all players
    let players;
    if (args.competitionId) {
      players = await ctx.db
        .query("players")
        .withIndex("by_competition", (q) => q.eq("competitionId", args.competitionId!))
        .collect();
    } else {
      players = await ctx.db.query("players").collect();
    }

    // Get all ratings
    const ratings = await ctx.db.query("playerRatings").collect();
    const ratingsByPlayer = new Map(ratings.map((r) => [r.playerId.toString(), r]));

    // Get all rolling stats for minutes
    const rollingStats = await ctx.db.query("playerRollingStats").collect();
    const statsByPlayer = new Map(rollingStats.map((s) => [s.playerId.toString(), s]));

    // Get teams and competitions for display
    const teams = await ctx.db.query("teams").collect();
    const teamsMap = new Map(teams.map((t) => [t._id.toString(), t]));
    const competitions = await ctx.db.query("competitions").collect();
    const competitionsMap = new Map(competitions.map((c) => [c._id.toString(), c]));

    // Build player list
    let result = players.map((p) => {
      const rating = ratingsByPlayer.get(p._id.toString());
      const stats = statsByPlayer.get(p._id.toString());
      const team = teamsMap.get(p.teamId.toString());
      const competition = competitionsMap.get(p.competitionId.toString());

      return {
        _id: p._id,
        name: p.name,
        position: p.position,
        positionGroup: p.positionGroup,
        team: team?.name ?? "Unknown",
        competition: competition?.name ?? "Unknown",
        photoUrl: p.photoUrl,
        minutes: stats?.minutes ?? 0,
        appearances: stats?.totals?.appearances ?? 0,
        rating365: rating?.rating365 ?? null,
        ratingLast5: rating?.ratingLast5 ?? null,
        levelScore: rating?.levelScore ?? null,
        hasRating: !!rating,
      };
    });

    // Filter by hasRatingOnly if specified
    if (args.hasRatingOnly) {
      result = result.filter((p) => p.hasRating);
    }

    // Sort by rating (if exists) or minutes
    result.sort((a, b) => {
      if (a.rating365 !== null && b.rating365 !== null) {
        return b.rating365 - a.rating365;
      }
      if (a.rating365 !== null) return -1;
      if (b.rating365 !== null) return 1;
      return b.minutes - a.minutes;
    });

    return result.slice(0, limit);
  },
});

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
    // Custom date range (for testing with historical data)
    customFromDate: v.optional(v.string()),
    customToDate: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<RatingComputationResult> => {
    console.log("[Admin] Starting rating computation...");

    const result: RatingComputationResult = await ctx.runAction(
      internal.ratings.compute.recomputeRollingStatsAndRatings,
      {
        competitionId: args.competitionId,
        country: args.country,
        dryRun: args.dryRun ?? false,
        customFromDate: args.customFromDate,
        customToDate: args.customToDate,
      }
    );

    console.log("[Admin] Rating computation result:", result);
    return result;
  },
});

/**
 * List players with ratings (internal version for CLI)
 */
export const internalListPlayersWithRatings = internalQuery({
  args: {
    limit: v.optional(v.number()),
    hasRatingOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    // Get all players
    const players = await ctx.db.query("players").collect();

    // Get all ratings
    const ratings = await ctx.db.query("playerRatings").collect();
    const ratingsByPlayer = new Map(ratings.map((r) => [r.playerId.toString(), r]));

    // Get all rolling stats for minutes
    const rollingStats = await ctx.db.query("playerRollingStats").collect();
    const statsByPlayer = new Map(rollingStats.map((s) => [s.playerId.toString(), s]));

    // Get teams for display
    const teams = await ctx.db.query("teams").collect();
    const teamsMap = new Map(teams.map((t) => [t._id.toString(), t]));

    // Build player list
    let result = players.map((p) => {
      const rating = ratingsByPlayer.get(p._id.toString());
      const stats = statsByPlayer.get(p._id.toString());
      const team = teamsMap.get(p.teamId.toString());

      return {
        name: p.name,
        position: p.positionGroup,
        team: team?.name ?? "Unknown",
        minutes: stats?.minutes ?? 0,
        appearances: stats?.totals?.appearances ?? 0,
        rating365: rating?.rating365 ?? null,
        levelScore: rating?.levelScore ?? null,
      };
    });

    // Filter by hasRatingOnly if specified
    if (args.hasRatingOnly) {
      result = result.filter((p) => p.rating365 !== null);
    }

    // Sort by rating (if exists) or minutes
    result.sort((a, b) => {
      if (a.rating365 !== null && b.rating365 !== null) {
        return b.rating365 - a.rating365;
      }
      if (a.rating365 !== null) return -1;
      if (b.rating365 !== null) return 1;
      return b.minutes - a.minutes;
    });

    return result.slice(0, limit);
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

    // Get date range of appearances
    const dates = appearances.map((a) => a.matchDate).sort();
    const minDate = dates[0] ?? null;
    const maxDate = dates[dates.length - 1] ?? null;

    return {
      totalAppearances: appearances.length,
      totalPlayers: players.length,
      uniquePlayersWithAppearances: appearancePlayerIds.size,
      appearancePlayersInPlayersTable: matchingPlayers.length,
      playersWithEnoughMinutes: playersWithEnoughMinutes.length,
      topPlayersByMinutes: playerMinutesList.slice(0, 10),
      sampleAppearance: appearances[0] ?? null,
      dateRange: { minDate, maxDate },
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

// ============================================================================
// Enrichment Management
// ============================================================================

import type { EnrichmentResult } from "./enrichment/enrichActions";

/**
 * Manually trigger FotMob enrichment
 *
 * @param maxRequests - Maximum API requests to make (default: 20)
 * @param batchSize - Number of players to process (default: 10)
 *
 * Run from dashboard: internal.admin.adminEnrichFromFotMob
 * Args: { "maxRequests": 20, "batchSize": 10 }
 */
export const adminEnrichFromFotMob = internalAction({
  args: {
    maxRequests: v.optional(v.number()),
    batchSize: v.optional(v.number()),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<EnrichmentResult> => {
    console.log(
      `[Admin] Starting FotMob enrichment, maxRequests: ${args.maxRequests ?? 20}, batchSize: ${args.batchSize ?? 10}`
    );

    const result: EnrichmentResult = await ctx.runAction(
      internal.enrichment.enrichActions.enrichPlayersFromFotMob,
      {
        maxRequests: args.maxRequests,
        batchSize: args.batchSize,
        competitionIds: args.competitionIds,
      }
    );

    console.log("[Admin] FotMob enrichment result:", result);
    return result;
  },
});

/**
 * Manually trigger SofaScore enrichment
 *
 * @param maxRequests - Maximum API requests to make (default: 15)
 * @param batchSize - Number of players to process (default: 5)
 *
 * Run from dashboard: internal.admin.adminEnrichFromSofaScore
 * Args: { "maxRequests": 15, "batchSize": 5 }
 */
export const adminEnrichFromSofaScore = internalAction({
  args: {
    maxRequests: v.optional(v.number()),
    batchSize: v.optional(v.number()),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<EnrichmentResult> => {
    console.log(
      `[Admin] Starting SofaScore enrichment, maxRequests: ${args.maxRequests ?? 15}, batchSize: ${args.batchSize ?? 5}`
    );

    const result: EnrichmentResult = await ctx.runAction(
      internal.enrichment.enrichActions.enrichPlayersFromSofaScore,
      {
        maxRequests: args.maxRequests,
        batchSize: args.batchSize,
        competitionIds: args.competitionIds,
      }
    );

    console.log("[Admin] SofaScore enrichment result:", result);
    return result;
  },
});

/**
 * Manually trigger enrichment from all providers
 *
 * Run from dashboard: internal.admin.adminEnrichFromAllProviders
 * Args: { "fotMobRequests": 20, "sofaScoreRequests": 15 }
 */
export const adminEnrichFromAllProviders = internalAction({
  args: {
    fotMobRequests: v.optional(v.number()),
    sofaScoreRequests: v.optional(v.number()),
    batchSize: v.optional(v.number()),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<{
    fotmob: EnrichmentResult;
    sofascore: EnrichmentResult;
    totalPlayersEnriched: number;
  }> => {
    console.log("[Admin] Starting combined enrichment from all providers");

    const result = await ctx.runAction(
      internal.enrichment.enrichActions.enrichPlayersFromAllProviders,
      {
        fotMobRequests: args.fotMobRequests,
        sofaScoreRequests: args.sofaScoreRequests,
        batchSize: args.batchSize,
        competitionIds: args.competitionIds,
      }
    );

    console.log("[Admin] Combined enrichment result:", result);
    return result;
  },
});

/**
 * Get enrichment statistics
 */
export const getEnrichmentStats = query({
  args: {},
  handler: async (ctx) => {
    const [
      externalIds,
      profiles,
      aggregates,
      unresolved,
      conflicts,
      enrichmentStates,
    ] = await Promise.all([
      ctx.db.query("playerExternalIds").collect(),
      ctx.db.query("providerPlayerProfiles").collect(),
      ctx.db.query("providerPlayerAggregates").collect(),
      ctx.db.query("unresolvedExternalPlayers").collect(),
      ctx.db.query("playerFieldConflicts").collect(),
      ctx.db.query("enrichmentState").collect(),
    ]);

    // Group by provider
    const externalIdsByProvider: Record<string, number> = {};
    for (const ext of externalIds) {
      externalIdsByProvider[ext.provider] = (externalIdsByProvider[ext.provider] || 0) + 1;
    }

    const profilesByProvider: Record<string, number> = {};
    for (const profile of profiles) {
      profilesByProvider[profile.provider] = (profilesByProvider[profile.provider] || 0) + 1;
    }

    const unresolvedByStatus: Record<string, number> = {};
    for (const u of unresolved) {
      unresolvedByStatus[u.status] = (unresolvedByStatus[u.status] || 0) + 1;
    }

    const unresolvedConflicts = conflicts.filter((c) => !c.resolved);

    return {
      totalExternalIds: externalIds.length,
      externalIdsByProvider,
      totalProfiles: profiles.length,
      profilesByProvider,
      totalAggregates: aggregates.length,
      totalUnresolved: unresolved.length,
      unresolvedByStatus,
      totalConflicts: conflicts.length,
      unresolvedConflicts: unresolvedConflicts.length,
      enrichmentStates: enrichmentStates.map((s) => ({
        provider: s.provider,
        totalProcessed: s.totalProcessed,
        updatedAt: s.updatedAt ? new Date(s.updatedAt).toISOString() : null,
      })),
    };
  },
});

/**
 * List unresolved external players (review queue)
 */
export const listUnresolvedPlayers = query({
  args: {
    limit: v.optional(v.number()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    let query = ctx.db.query("unresolvedExternalPlayers");

    if (args.status) {
      query = query.filter((q) => q.eq(q.field("status"), args.status));
    }

    const unresolved = await query.take(limit);

    return unresolved.map((u) => ({
      _id: u._id,
      provider: u.provider,
      providerPlayerId: u.providerPlayerId,
      reason: u.reason,
      status: u.status,
      candidateCount: u.candidatePlayerIds?.length ?? 0,
      createdAt: new Date(u.createdAt).toISOString(),
    }));
  },
});

/**
 * List field conflicts
 */
export const listFieldConflicts = query({
  args: {
    unresolvedOnly: v.optional(v.boolean()),
    playerId: v.optional(v.id("players")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    let conflicts = await ctx.db.query("playerFieldConflicts").collect();

    if (args.unresolvedOnly) {
      conflicts = conflicts.filter((c) => !c.resolved);
    }

    if (args.playerId) {
      conflicts = conflicts.filter((c) => c.playerId === args.playerId);
    }

    return conflicts.slice(0, limit).map((c) => ({
      _id: c._id,
      playerId: c.playerId,
      field: c.field,
      canonicalValue: c.canonicalValue,
      providerValue: c.providerValue,
      provider: c.provider,
      resolved: c.resolved,
      resolvedValue: c.resolvedValue,
    }));
  },
});

/**
 * Resolve an unresolved external player manually
 */
export const resolveExternalPlayer = internalMutation({
  args: {
    unresolvedId: v.id("unresolvedExternalPlayers"),
    playerId: v.id("players"),
  },
  handler: async (ctx, args) => {
    const unresolved = await ctx.db.get(args.unresolvedId);
    if (!unresolved) {
      throw new Error(`Unresolved player not found: ${args.unresolvedId}`);
    }

    const player = await ctx.db.get(args.playerId);
    if (!player) {
      throw new Error(`Player not found: ${args.playerId}`);
    }

    const now = Date.now();

    // Create external ID mapping
    await ctx.db.insert("playerExternalIds", {
      playerId: args.playerId,
      provider: unresolved.provider,
      providerPlayerId: unresolved.providerPlayerId,
      confidence: 1.0, // Manual resolution = 100% confidence
      createdAt: now,
      updatedAt: now,
    });

    // Mark as resolved
    await ctx.db.patch(args.unresolvedId, {
      status: "resolved",
      resolvedPlayerId: args.playerId,
      updatedAt: now,
    });

    console.log(
      `[Admin] Resolved external player ${unresolved.providerPlayerId} -> ${player.name}`
    );

    return { success: true };
  },
});

/**
 * Reject an unresolved external player (not a real match)
 */
export const rejectExternalPlayer = internalMutation({
  args: {
    unresolvedId: v.id("unresolvedExternalPlayers"),
  },
  handler: async (ctx, args) => {
    const unresolved = await ctx.db.get(args.unresolvedId);
    if (!unresolved) {
      throw new Error(`Unresolved player not found: ${args.unresolvedId}`);
    }

    await ctx.db.patch(args.unresolvedId, {
      status: "rejected",
      updatedAt: Date.now(),
    });

    console.log(`[Admin] Rejected external player ${unresolved.providerPlayerId}`);

    return { success: true };
  },
});

/**
 * Update normalized names for all players (one-time migration)
 */
export const updateNormalizedNames = internalMutation({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 500;

    // Import normalize function
    const { normalizeName } = await import("./resolve/resolvePlayer");

    const players = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("nameNormalized"), undefined))
      .take(limit);

    let updated = 0;
    for (const player of players) {
      const normalized = normalizeName(player.name);
      await ctx.db.patch(player._id, { nameNormalized: normalized });
      updated++;
    }

    console.log(`[Admin] Updated normalized names for ${updated} players`);

    return { updated, remaining: players.length === limit };
  },
});

// ============================================================================
// AI Report Management
// ============================================================================

/**
 * Manually generate an AI report for a specific player
 *
 * Run from dashboard: internal.admin.adminGenerateAiReport
 * Args: { "playerId": "...", "window": "365", "forceRegenerate": false }
 */
export const adminGenerateAiReport = internalAction({
  args: {
    playerId: v.id("players"),
    window: v.optional(v.union(v.literal("365"), v.literal("last5"))),
    locale: v.optional(v.string()),
    forceRegenerate: v.optional(v.boolean()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    report?: unknown;
    cached?: boolean;
    error?: string;
  }> => {
    const window = args.window ?? "365";
    const locale = args.locale ?? "nl";

    console.log(
      `[Admin] Generating AI report for player ${args.playerId}, window: ${window}, locale: ${locale}`
    );

    const result: {
      success: boolean;
      report?: unknown;
      cached?: boolean;
      error?: string;
    } = await ctx.runAction(
      internal.ai.generatePlayerReport.generateReport,
      {
        playerId: args.playerId,
        window,
        locale,
        forceRegenerate: args.forceRegenerate ?? false,
      }
    );

    console.log("[Admin] AI generation result:", {
      success: result.success,
      cached: result.cached,
      error: result.error,
    });

    return result;
  },
});

/**
 * Manually run the daily AI batch job
 *
 * Run from dashboard: internal.admin.adminRunAiBatchNow
 */
interface AiBatchResult {
  success: boolean;
  totalProcessed: number;
  reportsGenerated: number;
  cacheHits: number;
  errors: number;
  errorDetails: string[];
}

export const adminRunAiBatchNow = internalAction({
  args: {},
  handler: async (ctx): Promise<AiBatchResult> => {
    console.log("[Admin] Manually triggering AI batch job");

    const result: AiBatchResult = await ctx.runAction(
      internal.ai.aiCronRunner.runDailyAiBatch,
      {}
    );

    console.log("[Admin] AI batch result:", result);
    return result;
  },
});

/**
 * Get AI report statistics
 */
export const getAiReportStats = query({
  args: {},
  handler: async (ctx) => {
    const [reports, jobs, usageLogs, viewsDaily] = await Promise.all([
      ctx.db.query("playerAiReports").collect(),
      ctx.db.query("playerAiJobs").collect(),
      ctx.db.query("aiUsageLogs").collect(),
      ctx.db.query("playerViewsDaily").collect(),
    ]);

    // Reports by model
    const reportsByModel: Record<string, number> = {};
    for (const report of reports) {
      reportsByModel[report.model] = (reportsByModel[report.model] || 0) + 1;
    }

    // Reports by window
    const reportsByWindow: Record<string, number> = {};
    for (const report of reports) {
      reportsByWindow[report.window] = (reportsByWindow[report.window] || 0) + 1;
    }

    // Jobs by status
    const jobsByStatus: Record<string, number> = {};
    for (const job of jobs) {
      jobsByStatus[job.status] = (jobsByStatus[job.status] || 0) + 1;
    }

    // Usage logs in last 24h
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentLogs = usageLogs.filter((log) => log.createdAt > oneDayAgo);
    const successfulLogs = recentLogs.filter((log) => log.success);
    const failedLogs = recentLogs.filter((log) => !log.success);

    // Average confidence
    const avgConfidence = reports.length > 0
      ? reports.reduce((sum, r) => sum + r.confidence, 0) / reports.length
      : 0;

    // Top viewed players today
    const today = new Date().toISOString().split("T")[0];
    const todayViews = viewsDaily
      .filter((v) => v.dayKey === today)
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    return {
      totalReports: reports.length,
      reportsByModel,
      reportsByWindow,
      avgConfidence: avgConfidence.toFixed(2),
      totalJobs: jobs.length,
      jobsByStatus,
      usageLast24h: {
        total: recentLogs.length,
        successful: successfulLogs.length,
        failed: failedLogs.length,
      },
      topViewedToday: todayViews.map((v) => ({
        playerId: v.playerId,
        views: v.views,
      })),
    };
  },
});

/**
 * List AI reports with player info
 */
export const listAiReports = query({
  args: {
    limit: v.optional(v.number()),
    window: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    let reports = await ctx.db.query("playerAiReports").collect();

    if (args.window) {
      reports = reports.filter((r) => r.window === args.window);
    }

    // Sort by generatedAt descending
    reports.sort((a, b) => b.generatedAt - a.generatedAt);

    // Get player names
    const playerIds = [...new Set(reports.map((r) => r.playerId))];
    const players = await Promise.all(playerIds.map((id) => ctx.db.get(id)));
    const playerMap = new Map(players.filter(Boolean).map((p) => [p!._id, p!]));

    return reports.slice(0, limit).map((r) => ({
      _id: r._id,
      playerId: r.playerId,
      playerName: playerMap.get(r.playerId)?.name ?? "Unknown",
      window: r.window,
      locale: r.locale,
      archetype: r.archetype,
      confidence: r.confidence,
      model: r.model,
      generatedAt: new Date(r.generatedAt).toISOString(),
    }));
  },
});

/**
 * Delete an AI report (for testing/cleanup)
 */
export const deleteAiReport = internalMutation({
  args: {
    reportId: v.id("playerAiReports"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.reportId);
    console.log(`[Admin] Deleted AI report ${args.reportId}`);
    return { success: true };
  },
});

/**
 * Clear all AI reports for a player (for testing)
 */
export const clearPlayerAiReports = internalMutation({
  args: {
    playerId: v.id("players"),
  },
  handler: async (ctx, args) => {
    const reports = await ctx.db
      .query("playerAiReports")
      .filter((q) => q.eq(q.field("playerId"), args.playerId))
      .collect();

    for (const report of reports) {
      await ctx.db.delete(report._id);
    }

    // Also clear jobs
    const jobs = await ctx.db
      .query("playerAiJobs")
      .filter((q) => q.eq(q.field("playerId"), args.playerId))
      .collect();

    for (const job of jobs) {
      await ctx.db.delete(job._id);
    }

    console.log(`[Admin] Cleared ${reports.length} reports and ${jobs.length} jobs for player ${args.playerId}`);
    return { reportsDeleted: reports.length, jobsDeleted: jobs.length };
  },
});

// ============================================================================
// OpenAI Batch API Management
// ============================================================================

/**
 * Create an OpenAI Batch for AI report generation
 * This uses the OpenAI Batch API for 50% cost savings on bulk generation.
 *
 * Run from dashboard: internal.admin.adminCreateAiBatch
 * Args: { "window": "365", "locale": "nl", "minMinutes": 90, "limit": 100 }
 */
export const adminCreateAiBatch = internalAction({
  args: {
    window: v.optional(v.union(v.literal("365"), v.literal("last5"))),
    locale: v.optional(v.string()),
    minMinutes: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    batchId?: string;
    totalRequests?: number;
    skipped?: number;
    error?: string;
  }> => {
    const window = args.window ?? "365";
    const locale = args.locale ?? "nl";

    console.log(
      `[Admin] Creating AI batch for window: ${window}, locale: ${locale}, minMinutes: ${args.minMinutes ?? 90}, limit: ${args.limit ?? 1000}`
    );

    const result = await ctx.runAction(
      internal.ai.batchApi.createBatch,
      {
        window,
        locale,
        minMinutes: args.minMinutes,
        limit: args.limit,
      }
    );

    console.log("[Admin] Batch creation result:", result);
    return result;
  },
});

/**
 * Check the status of an OpenAI batch job
 *
 * Run from dashboard: internal.admin.adminCheckAiBatch
 * Args: { "batchId": "batch_..." }
 */
export const adminCheckAiBatch = internalAction({
  args: {
    batchId: v.string(),
  },
  handler: async (ctx, args): Promise<{
    status: string;
    completed: number;
    failed: number;
    total: number;
    outputFileId?: string;
  }> => {
    console.log(`[Admin] Checking batch status: ${args.batchId}`);

    const result = await ctx.runAction(
      internal.ai.batchApi.checkBatch,
      { batchId: args.batchId }
    );

    console.log("[Admin] Batch status:", result);
    return result;
  },
});

/**
 * Process completed batch results and upsert AI reports
 *
 * Run from dashboard: internal.admin.adminProcessBatchResults
 * Args: { "batchId": "batch_..." }
 */
export const adminProcessBatchResults = internalAction({
  args: {
    batchId: v.string(),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    processed: number;
    failed: number;
    error?: string;
  }> => {
    console.log(`[Admin] Processing batch results: ${args.batchId}`);

    const result = await ctx.runAction(
      internal.ai.batchApi.processBatchResults,
      { batchId: args.batchId }
    );

    console.log("[Admin] Batch processing result:", result);
    return result;
  },
});

/**
 * List all batch jobs
 */
export const listBatchJobs = query({
  args: {},
  handler: async (ctx) => {
    const jobs = await ctx.db
      .query("aiBatchJobs")
      .order("desc")
      .take(20);

    return jobs.map((j) => ({
      _id: j._id,
      batchId: j.batchId,
      status: j.status,
      window: j.window,
      locale: j.locale,
      totalRequests: j.totalRequests,
      completedRequests: j.completedRequests,
      failedRequests: j.failedRequests,
      createdAt: new Date(j.createdAt).toISOString(),
      completedAt: j.completedAt ? new Date(j.completedAt).toISOString() : null,
    }));
  },
});
