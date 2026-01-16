/**
 * AI Input Snapshot Builder
 *
 * Builds a compact JSON snapshot of player data for AI analysis.
 * Includes only the essential features needed for generating reports.
 */

import { v } from "convex/values";
import { internalQuery } from "../_generated/server";
import type { Doc, Id } from "../_generated/dataModel";

// Window type for stats selection
export const aiWindowValidator = v.union(v.literal("365"), v.literal("last5"));
export type AiWindow = "365" | "last5";

// The snapshot structure for AI input
export interface PlayerAiSnapshot {
  // Player identifiers
  playerId: string;
  name: string;
  positionGroup: "GK" | "DEF" | "MID" | "ATT";
  position: string;
  age?: number;
  nationality?: string;

  // Physical attributes (from enrichment)
  heightCm?: number;
  weightKg?: number;
  preferredFoot?: string;

  // Context
  teamName: string;
  competitionName: string;
  competitionTier?: string;
  competitionCountry: string;

  // Core stats
  minutes: number;
  appearances: number;
  window: AiWindow;

  // Ratings
  rating365?: number;
  ratingLast5?: number;
  levelScore?: number;

  // Key per90 features (max 15)
  per90: {
    goals?: number;
    assists?: number;
    shots?: number;
    shotsOnTarget?: number;
    keyPasses?: number;
    passes?: number;
    tackles?: number;
    interceptions?: number;
    clearances?: number;
    blocks?: number;
    duelsWon?: number;
    aerialDuelsWon?: number;
    dribblesSuccessful?: number;
    saves?: number;
    goalsConceded?: number;
  };

  // xG/xA if available
  advancedStats?: {
    xG?: number;
    xA?: number;
    xGPer90?: number;
    xAPer90?: number;
  };

  // Sources that contributed data
  sourcesUsed: string[];
}

/**
 * Build a compact snapshot of player data for AI analysis
 */
export const buildSnapshot = internalQuery({
  args: {
    playerId: v.id("players"),
    window: aiWindowValidator,
  },
  handler: async (ctx, args): Promise<PlayerAiSnapshot | null> => {
    const player = await ctx.db.get(args.playerId);
    if (!player) return null;

    const sourcesUsed: string[] = [player.provider];

    // Get team and competition
    const [team, competition] = await Promise.all([
      ctx.db.get(player.teamId),
      ctx.db.get(player.competitionId),
    ]);

    if (!team || !competition) return null;

    // Get competition rating for tier
    const competitionRatings = await ctx.db.query("competitionRatings").collect();
    const compRating = competitionRatings.find(
      (r) => r.competitionId === player.competitionId
    );

    // Get rolling stats
    const rollingStats = await ctx.db
      .query("playerRollingStats")
      .withIndex("by_player_competition", (q) =>
        q.eq("playerId", args.playerId)
      )
      .first();

    // Get player rating
    const playerRatings = await ctx.db.query("playerRatings").collect();
    const rating = playerRatings.find((r) => r.playerId === args.playerId);

    // Get provider aggregates for xG/xA
    const providerAggregates = await ctx.db
      .query("providerPlayerAggregates")
      .filter((q) => q.eq(q.field("playerId"), args.playerId))
      .collect();

    // Track which enrichment providers contributed
    for (const agg of providerAggregates) {
      if (!sourcesUsed.includes(agg.provider)) {
        sourcesUsed.push(agg.provider);
      }
    }

    // Extract xG/xA from provider aggregates (prefer FotMob for xG data)
    const fotmobAgg = providerAggregates.find(
      (a) => a.provider === "fotmob" && a.window === "365"
    );
    const sofascoreAgg = providerAggregates.find(
      (a) => a.provider === "sofascore"
    );
    const xGData = fotmobAgg?.additionalStats || sofascoreAgg?.additionalStats;

    // Build per90 stats based on window
    const per90Stats = rollingStats?.per90;
    const totals = args.window === "last5" ? rollingStats?.last5 : rollingStats?.totals;

    // Calculate minutes for the window
    // For "last5", we approximate based on last5 totals
    const minutes = args.window === "last5"
      ? Math.min(450, rollingStats?.minutes ?? 0) // Cap at ~5 games
      : rollingStats?.minutes ?? 0;

    const appearances = totals?.appearances ?? 0;

    // Build the snapshot
    const snapshot: PlayerAiSnapshot = {
      playerId: player._id,
      name: player.name,
      positionGroup: player.positionGroup,
      position: player.position,
      age: player.age,
      nationality: player.nationality,

      // Physical attributes
      heightCm: player.heightCm,
      weightKg: player.weightKg,
      preferredFoot: player.preferredFoot,

      // Context
      teamName: team.name,
      competitionName: competition.name,
      competitionTier: competition.tier ?? compRating?.tier,
      competitionCountry: competition.country,

      // Core stats
      minutes,
      appearances,
      window: args.window,

      // Ratings
      rating365: rating?.rating365,
      ratingLast5: rating?.ratingLast5,
      levelScore: rating?.levelScore,

      // Per90 features
      per90: {
        goals: per90Stats?.goals,
        assists: per90Stats?.assists,
        shots: per90Stats?.shots,
        shotsOnTarget: per90Stats?.shotsOnTarget,
        keyPasses: per90Stats?.keyPasses,
        passes: per90Stats?.passes,
        tackles: per90Stats?.tackles,
        interceptions: per90Stats?.interceptions,
        clearances: per90Stats?.clearances,
        blocks: per90Stats?.blocks,
        duelsWon: per90Stats?.duelsWon,
        aerialDuelsWon: per90Stats?.aerialDuelsWon,
        dribblesSuccessful: per90Stats?.dribblesSuccessful,
        saves: per90Stats?.saves,
        goalsConceded: per90Stats?.goalsConceded,
      },

      // Advanced stats if available
      advancedStats: xGData
        ? {
            xG: xGData.xG,
            xA: xGData.xA,
            xGPer90: xGData.xGPer90,
            xAPer90: xGData.xAPer90,
          }
        : undefined,

      sourcesUsed,
    };

    return snapshot;
  },
});

/**
 * Generate a stable hash for the snapshot to detect changes
 * Uses a simple approach that works in Node.js environment
 */
export function hashSnapshot(snapshot: PlayerAiSnapshot): string {
  // Create a stable JSON string (sorted keys)
  const stableJson = JSON.stringify(snapshot, Object.keys(snapshot).sort());

  // Simple hash function (djb2 algorithm)
  let hash = 5381;
  for (let i = 0; i < stableJson.length; i++) {
    const char = stableJson.charCodeAt(i);
    hash = ((hash << 5) + hash) ^ char;
  }

  // Convert to hex string and ensure it's always positive
  return (hash >>> 0).toString(16).padStart(8, "0");
}

/**
 * Check if a player has enough data for meaningful AI analysis
 */
export function hasEnoughData(snapshot: PlayerAiSnapshot): boolean {
  // Minimum 90 minutes played (roughly 1 full game)
  if (snapshot.minutes < 90) return false;

  // At least 1 appearance
  if (snapshot.appearances < 1) return false;

  // Must have at least some per90 stats
  const per90Values = Object.values(snapshot.per90).filter(
    (v) => v !== undefined && v !== null
  );
  if (per90Values.length < 3) return false;

  return true;
}
