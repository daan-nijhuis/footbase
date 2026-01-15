/**
 * Rating Computation Actions
 *
 * Main actions for computing and storing player and competition ratings.
 */

import { v } from "convex/values";
import { internalAction, internalMutation, internalQuery } from "../_generated/server";
import { internal } from "../_generated/api";
import type { Doc, Id } from "../_generated/dataModel";
import { computeRollingStats, computeLastNStats } from "./aggregate";
import {
  computeAllRatings,
  computeCompetitionStrength,
  type PlayerRatingInput,
} from "./scoring";
import type { PositionGroup, Tier, AggregatedTotals, Per90Stats } from "../lib/metrics";
import {
  MIN_MINUTES_FOR_RATING,
  ROLLING_WINDOW_DAYS,
  FORM_WINDOW_MATCHES,
  TOP_N_FOR_COMPETITION_STRENGTH,
} from "../lib/metrics";

// ============================================================================
// Internal Queries
// ============================================================================

/**
 * Get all appearances for a list of player IDs
 */
export const getAppearancesForPlayers = internalQuery({
  args: {
    playerIds: v.array(v.id("players")),
  },
  handler: async (ctx, args) => {
    const appearances: Doc<"appearances">[] = [];

    // Batch query appearances by player
    for (const playerId of args.playerIds) {
      const playerApps = await ctx.db
        .query("appearances")
        .withIndex("by_player_date", (q) => q.eq("playerId", playerId))
        .collect();
      appearances.push(...playerApps);
    }

    return appearances;
  },
});

/**
 * Get all players with optional filters
 */
export const getPlayersForRating = internalQuery({
  args: {
    competitionId: v.optional(v.id("competitions")),
    country: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let players: Doc<"players">[];

    if (args.competitionId) {
      players = await ctx.db
        .query("players")
        .withIndex("by_competition", (q) =>
          q.eq("competitionId", args.competitionId!)
        )
        .collect();
    } else {
      players = await ctx.db.query("players").collect();
    }

    // If country filter, need to join with competitions
    if (args.country) {
      const competitions = await ctx.db.query("competitions").collect();
      const competitionsByCountry = new Set(
        competitions.filter((c) => c.country === args.country).map((c) => c._id)
      );
      players = players.filter((p) =>
        competitionsByCountry.has(p.competitionId)
      );
    }

    return players;
  },
});

/**
 * Get all competitions with tier info
 */
export const getCompetitionsWithTiers = internalQuery({
  args: {},
  handler: async (ctx) => {
    const competitions = await ctx.db.query("competitions").collect();
    return competitions;
  },
});

/**
 * Get rating profiles from database
 */
export const getRatingProfiles = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("ratingProfiles").collect();
  },
});

// ============================================================================
// Internal Mutations
// ============================================================================

/**
 * Upsert player rolling stats
 */
export const upsertPlayerRollingStats = internalMutation({
  args: {
    playerId: v.id("players"),
    competitionId: v.id("competitions"),
    fromDate: v.string(),
    toDate: v.string(),
    minutes: v.number(),
    totals: v.object({
      appearances: v.number(),
      goals: v.optional(v.number()),
      assists: v.optional(v.number()),
      yellowCards: v.optional(v.number()),
      redCards: v.optional(v.number()),
      shots: v.optional(v.number()),
      shotsOnTarget: v.optional(v.number()),
      passes: v.optional(v.number()),
      keyPasses: v.optional(v.number()),
      tackles: v.optional(v.number()),
      interceptions: v.optional(v.number()),
      clearances: v.optional(v.number()),
      blocks: v.optional(v.number()),
      duelsWon: v.optional(v.number()),
      duelsTotal: v.optional(v.number()),
      aerialDuelsWon: v.optional(v.number()),
      aerialDuelsTotal: v.optional(v.number()),
      dribbles: v.optional(v.number()),
      dribblesSuccessful: v.optional(v.number()),
      foulsCommitted: v.optional(v.number()),
      foulsDrawn: v.optional(v.number()),
      saves: v.optional(v.number()),
      goalsConceded: v.optional(v.number()),
      cleanSheets: v.optional(v.number()),
      xG: v.optional(v.number()),
      xA: v.optional(v.number()),
    }),
    per90: v.object({
      goals: v.optional(v.number()),
      assists: v.optional(v.number()),
      shots: v.optional(v.number()),
      shotsOnTarget: v.optional(v.number()),
      passes: v.optional(v.number()),
      keyPasses: v.optional(v.number()),
      tackles: v.optional(v.number()),
      interceptions: v.optional(v.number()),
      clearances: v.optional(v.number()),
      blocks: v.optional(v.number()),
      duelsWon: v.optional(v.number()),
      aerialDuelsWon: v.optional(v.number()),
      dribbles: v.optional(v.number()),
      dribblesSuccessful: v.optional(v.number()),
      foulsCommitted: v.optional(v.number()),
      foulsDrawn: v.optional(v.number()),
      saves: v.optional(v.number()),
      goalsConceded: v.optional(v.number()),
      xG: v.optional(v.number()),
      xA: v.optional(v.number()),
    }),
    last5: v.object({
      appearances: v.number(),
      goals: v.optional(v.number()),
      assists: v.optional(v.number()),
      yellowCards: v.optional(v.number()),
      redCards: v.optional(v.number()),
      shots: v.optional(v.number()),
      shotsOnTarget: v.optional(v.number()),
      passes: v.optional(v.number()),
      keyPasses: v.optional(v.number()),
      tackles: v.optional(v.number()),
      interceptions: v.optional(v.number()),
      clearances: v.optional(v.number()),
      blocks: v.optional(v.number()),
      duelsWon: v.optional(v.number()),
      duelsTotal: v.optional(v.number()),
      aerialDuelsWon: v.optional(v.number()),
      aerialDuelsTotal: v.optional(v.number()),
      dribbles: v.optional(v.number()),
      dribblesSuccessful: v.optional(v.number()),
      foulsCommitted: v.optional(v.number()),
      foulsDrawn: v.optional(v.number()),
      saves: v.optional(v.number()),
      goalsConceded: v.optional(v.number()),
      cleanSheets: v.optional(v.number()),
      xG: v.optional(v.number()),
      xA: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("playerRollingStats")
      .withIndex("by_player_competition", (q) =>
        q.eq("playerId", args.playerId).eq("competitionId", args.competitionId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        fromDate: args.fromDate,
        toDate: args.toDate,
        minutes: args.minutes,
        totals: args.totals,
        per90: args.per90,
        last5: args.last5,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("playerRollingStats", {
      playerId: args.playerId,
      competitionId: args.competitionId,
      fromDate: args.fromDate,
      toDate: args.toDate,
      minutes: args.minutes,
      totals: args.totals,
      per90: args.per90,
      last5: args.last5,
      updatedAt: Date.now(),
    });
  },
});

/**
 * Upsert player rating
 */
export const upsertPlayerRating = internalMutation({
  args: {
    playerId: v.id("players"),
    competitionId: v.id("competitions"),
    positionGroup: v.union(
      v.literal("GK"),
      v.literal("DEF"),
      v.literal("MID"),
      v.literal("ATT")
    ),
    rating365: v.number(),
    ratingLast5: v.number(),
    tier: v.optional(
      v.union(
        v.literal("Platinum"),
        v.literal("Diamond"),
        v.literal("Elite"),
        v.literal("Gold"),
        v.literal("Silver"),
        v.literal("Bronze")
      )
    ),
    levelScore: v.number(),
  },
  handler: async (ctx, args) => {
    // Find existing rating for this player
    const existingRatings = await ctx.db.query("playerRatings").collect();
    const existing = existingRatings.find(
      (r) =>
        r.playerId === args.playerId && r.competitionId === args.competitionId
    );

    if (existing) {
      await ctx.db.patch(existing._id, {
        positionGroup: args.positionGroup,
        rating365: args.rating365,
        ratingLast5: args.ratingLast5,
        tier: args.tier,
        levelScore: args.levelScore,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("playerRatings", {
      playerId: args.playerId,
      competitionId: args.competitionId,
      positionGroup: args.positionGroup,
      rating365: args.rating365,
      ratingLast5: args.ratingLast5,
      tier: args.tier,
      levelScore: args.levelScore,
      updatedAt: Date.now(),
    });
  },
});

/**
 * Upsert competition rating
 */
export const upsertCompetitionRating = internalMutation({
  args: {
    competitionId: v.id("competitions"),
    tier: v.optional(
      v.union(
        v.literal("Platinum"),
        v.literal("Diamond"),
        v.literal("Elite"),
        v.literal("Gold"),
        v.literal("Silver"),
        v.literal("Bronze")
      )
    ),
    strengthScore: v.number(),
  },
  handler: async (ctx, args) => {
    const existingRatings = await ctx.db.query("competitionRatings").collect();
    const existing = existingRatings.find(
      (r) => r.competitionId === args.competitionId
    );

    if (existing) {
      await ctx.db.patch(existing._id, {
        tier: args.tier,
        strengthScore: args.strengthScore,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("competitionRatings", {
      competitionId: args.competitionId,
      tier: args.tier,
      strengthScore: args.strengthScore,
      updatedAt: Date.now(),
    });
  },
});

/**
 * Batch upsert player rolling stats
 */
export const batchUpsertPlayerRollingStats = internalMutation({
  args: {
    stats: v.array(
      v.object({
        playerId: v.id("players"),
        competitionId: v.id("competitions"),
        fromDate: v.string(),
        toDate: v.string(),
        minutes: v.number(),
        totals: v.any(),
        per90: v.any(),
        last5: v.any(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Get all existing stats
    const existingStats = await ctx.db.query("playerRollingStats").collect();
    const existingMap = new Map(
      existingStats.map((s) => [`${s.playerId}:${s.competitionId}`, s])
    );

    for (const stat of args.stats) {
      const key = `${stat.playerId}:${stat.competitionId}`;
      const existing = existingMap.get(key);

      if (existing) {
        await ctx.db.patch(existing._id, {
          fromDate: stat.fromDate,
          toDate: stat.toDate,
          minutes: stat.minutes,
          totals: stat.totals,
          per90: stat.per90,
          last5: stat.last5,
          updatedAt: Date.now(),
        });
      } else {
        await ctx.db.insert("playerRollingStats", {
          playerId: stat.playerId,
          competitionId: stat.competitionId,
          fromDate: stat.fromDate,
          toDate: stat.toDate,
          minutes: stat.minutes,
          totals: stat.totals,
          per90: stat.per90,
          last5: stat.last5,
          updatedAt: Date.now(),
        });
      }
    }
  },
});

/**
 * Batch upsert player ratings
 */
export const batchUpsertPlayerRatings = internalMutation({
  args: {
    ratings: v.array(
      v.object({
        playerId: v.id("players"),
        competitionId: v.id("competitions"),
        positionGroup: v.union(
          v.literal("GK"),
          v.literal("DEF"),
          v.literal("MID"),
          v.literal("ATT")
        ),
        rating365: v.number(),
        ratingLast5: v.number(),
        tier: v.optional(
          v.union(
            v.literal("Platinum"),
            v.literal("Diamond"),
            v.literal("Elite"),
            v.literal("Gold"),
            v.literal("Silver"),
            v.literal("Bronze")
          )
        ),
        levelScore: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Get all existing ratings
    const existingRatings = await ctx.db.query("playerRatings").collect();
    const existingMap = new Map(
      existingRatings.map((r) => [`${r.playerId}:${r.competitionId}`, r])
    );

    for (const rating of args.ratings) {
      const key = `${rating.playerId}:${rating.competitionId}`;
      const existing = existingMap.get(key);

      if (existing) {
        await ctx.db.patch(existing._id, {
          positionGroup: rating.positionGroup,
          rating365: rating.rating365,
          ratingLast5: rating.ratingLast5,
          tier: rating.tier,
          levelScore: rating.levelScore,
          updatedAt: Date.now(),
        });
      } else {
        await ctx.db.insert("playerRatings", {
          playerId: rating.playerId,
          competitionId: rating.competitionId,
          positionGroup: rating.positionGroup,
          rating365: rating.rating365,
          ratingLast5: rating.ratingLast5,
          tier: rating.tier,
          levelScore: rating.levelScore,
          updatedAt: Date.now(),
        });
      }
    }
  },
});

// ============================================================================
// Result Types
// ============================================================================

interface RatingComputationResult {
  success: boolean;
  playersProcessed: number;
  ratingsComputed: number;
  competitionsRated: number;
  dryRun?: boolean;
}

// ============================================================================
// Main Computation Action
// ============================================================================

export const recomputeRollingStatsAndRatings = internalAction({
  args: {
    competitionId: v.optional(v.id("competitions")),
    country: v.optional(v.string()),
    dryRun: v.optional(v.boolean()),
    // Custom date range (for testing with historical data)
    customFromDate: v.optional(v.string()),
    customToDate: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<RatingComputationResult> => {
    const dryRun = args.dryRun ?? false;

    console.log("[Ratings] Starting rating computation...");
    console.log(
      `[Ratings] Filters: competitionId=${args.competitionId ?? "all"}, country=${args.country ?? "all"}, dryRun=${dryRun}`
    );

    // Step 1: Get all players matching filters
    const players: Doc<"players">[] = await ctx.runQuery(
      internal.ratings.compute.getPlayersForRating,
      {
        competitionId: args.competitionId,
        country: args.country,
      }
    );

    console.log(`[Ratings] Found ${players.length} players`);

    if (players.length === 0) {
      return {
        success: true,
        playersProcessed: 0,
        ratingsComputed: 0,
        competitionsRated: 0,
      };
    }

    // Step 2: Get all competitions
    const competitions: Doc<"competitions">[] = await ctx.runQuery(
      internal.ratings.compute.getCompetitionsWithTiers,
      {}
    );
    const competitionMap = new Map(competitions.map((c) => [c._id, c]));

    // Step 3: Get all appearances for players
    const playerIds = players.map((p) => p._id);
    const allAppearances: Doc<"appearances">[] = await ctx.runQuery(
      internal.ratings.compute.getAppearancesForPlayers,
      { playerIds }
    );

    console.log(`[Ratings] Found ${allAppearances.length} total appearances`);

    // Group appearances by player
    const appearancesByPlayer = new Map<Id<"players">, Doc<"appearances">[]>();
    for (const app of allAppearances) {
      const existing = appearancesByPlayer.get(app.playerId) ?? [];
      existing.push(app);
      appearancesByPlayer.set(app.playerId, existing);
    }

    // Step 4: Compute rolling window dates
    let fromDateStr: string;
    let toDateStr: string;

    if (args.customFromDate && args.customToDate) {
      // Use custom date range
      fromDateStr = args.customFromDate;
      toDateStr = args.customToDate;
      console.log(`[Ratings] Using custom date range: ${fromDateStr} to ${toDateStr}`);
    } else {
      // Default: rolling window from today
      const today = new Date();
      const fromDate365 = new Date(today);
      fromDate365.setDate(fromDate365.getDate() - ROLLING_WINDOW_DAYS);
      fromDateStr = fromDate365.toISOString().split("T")[0];
      toDateStr = today.toISOString().split("T")[0];
    }

    console.log(`[Ratings] Rolling window: ${fromDateStr} to ${toDateStr}`);

    // Step 5: Compute rolling stats for each player
    const rollingStatsToUpsert: Array<{
      playerId: Id<"players">;
      competitionId: Id<"competitions">;
      fromDate: string;
      toDate: string;
      minutes: number;
      totals: AggregatedTotals;
      per90: Per90Stats;
      last5: AggregatedTotals;
    }> = [];

    const ratingInputs: PlayerRatingInput[] = [];

    for (const player of players) {
      const appearances = appearancesByPlayer.get(player._id) ?? [];

      // Compute rolling 365 stats
      const rolling365 = computeRollingStats(appearances, fromDateStr, toDateStr);

      // Compute last 5 stats
      const last5Stats = computeLastNStats(appearances, FORM_WINDOW_MATCHES);

      // Store rolling stats
      rollingStatsToUpsert.push({
        playerId: player._id,
        competitionId: player.competitionId,
        fromDate: fromDateStr,
        toDate: toDateStr,
        minutes: rolling365.minutes,
        totals: rolling365.totals,
        per90: rolling365.per90,
        last5: last5Stats.totals,
      });

      // Only include in rating if meets minimum minutes
      if (rolling365.minutes >= MIN_MINUTES_FOR_RATING) {
        const competition = competitionMap.get(player.competitionId);

        ratingInputs.push({
          playerId: player._id,
          competitionId: player.competitionId,
          positionGroup: player.positionGroup as PositionGroup,
          features365: rolling365.features,
          featuresLast5: last5Stats.features,
          tier: competition?.tier as Tier | undefined,
        });
      }
    }

    console.log(
      `[Ratings] ${ratingInputs.length} players meet minimum minutes (${MIN_MINUTES_FOR_RATING})`
    );

    // Step 6: Compute ratings
    const computedRatings = computeAllRatings(ratingInputs);

    console.log(`[Ratings] Computed ${computedRatings.length} ratings`);

    // Step 7: Persist data (unless dry run)
    if (!dryRun) {
      // Batch upsert rolling stats (in chunks to avoid transaction limits)
      const BATCH_SIZE = 100;
      for (let i = 0; i < rollingStatsToUpsert.length; i += BATCH_SIZE) {
        const batch = rollingStatsToUpsert.slice(i, i + BATCH_SIZE);
        await ctx.runMutation(
          internal.ratings.compute.batchUpsertPlayerRollingStats,
          { stats: batch }
        );
      }

      console.log(`[Ratings] Persisted ${rollingStatsToUpsert.length} rolling stats`);

      // Batch upsert ratings
      const ratingsToUpsert = computedRatings.map((r) => ({
        playerId: r.playerId as Id<"players">,
        competitionId: r.competitionId as Id<"competitions">,
        positionGroup: r.positionGroup,
        rating365: r.rating365,
        ratingLast5: r.ratingLast5,
        tier: r.tier,
        levelScore: r.levelScore,
      }));

      for (let i = 0; i < ratingsToUpsert.length; i += BATCH_SIZE) {
        const batch = ratingsToUpsert.slice(i, i + BATCH_SIZE);
        await ctx.runMutation(
          internal.ratings.compute.batchUpsertPlayerRatings,
          { ratings: batch }
        );
      }

      console.log(`[Ratings] Persisted ${ratingsToUpsert.length} player ratings`);

      // Step 8: Compute and persist competition strength scores
      const competitionsToRate = new Set(
        ratingInputs.map((r) => r.competitionId)
      );
      let competitionsRated = 0;

      for (const compId of competitionsToRate) {
        const compRatings = computedRatings.filter(
          (r) => r.competitionId === compId
        );
        const levelScores = compRatings.map((r) => r.levelScore);
        const strengthScore = computeCompetitionStrength(
          levelScores,
          TOP_N_FOR_COMPETITION_STRENGTH
        );

        const competition = competitionMap.get(compId as Id<"competitions">);

        await ctx.runMutation(
          internal.ratings.compute.upsertCompetitionRating,
          {
            competitionId: compId as Id<"competitions">,
            tier: competition?.tier as Tier | undefined,
            strengthScore,
          }
        );
        competitionsRated++;
      }

      console.log(`[Ratings] Persisted ${competitionsRated} competition ratings`);
    }

    const result = {
      success: true,
      playersProcessed: players.length,
      ratingsComputed: computedRatings.length,
      competitionsRated: new Set(ratingInputs.map((r) => r.competitionId)).size,
      dryRun,
    };

    console.log("[Ratings] Completed:", result);

    return result;
  },
});
