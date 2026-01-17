import { v } from "convex/values";
import { query } from "./_generated/server";
import { tierValidator } from "./schema";
import { requireAuth } from "./lib/auth";

/**
 * List competitions with optional filters
 */
export const list = query({
  args: {
    country: v.optional(v.string()),
    tier: v.optional(tierValidator),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    // Fetch all competitions and filter in memory for flexibility
    const competitions = await ctx.db.query("competitions").collect();

    // Apply filters
    let filtered = competitions;
    if (args.isActive !== undefined) {
      filtered = filtered.filter((c) => c.isActive === args.isActive);
    }
    if (args.country) {
      filtered = filtered.filter((c) => c.country === args.country);
    }
    if (args.tier) {
      filtered = filtered.filter((c) => c.tier === args.tier);
    }

    // Get competition ratings for strength scores
    const competitionRatings = await ctx.db.query("competitionRatings").collect();
    const ratingsMap = new Map(
      competitionRatings.map((r) => [r.competitionId, r])
    );

    // Get player counts per competition
    const players = await ctx.db.query("players").collect();
    const playerCountMap = new Map<string, number>();
    for (const player of players) {
      const key = player.competitionId;
      playerCountMap.set(key, (playerCountMap.get(key) || 0) + 1);
    }

    // Map to output format
    const result = filtered.map((competition) => {
      const rating = ratingsMap.get(competition._id);
      return {
        _id: competition._id,
        name: competition.name,
        country: competition.country,
        tier: competition.tier ?? rating?.tier,
        isActive: competition.isActive,
        logoUrl: competition.logoUrl,
        strengthScore: rating?.strengthScore,
        playerCount: playerCountMap.get(competition._id) || 0,
        season: competition.season,
      };
    });

    // Sort by strength score descending, then by name
    result.sort((a, b) => {
      if (a.strengthScore && b.strengthScore) {
        return b.strengthScore - a.strengthScore;
      }
      if (a.strengthScore) return -1;
      if (b.strengthScore) return 1;
      return a.name.localeCompare(b.name);
    });

    return result;
  },
});

/**
 * Get a single competition by ID
 */
export const get = query({
  args: {
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const competition = await ctx.db.get(args.competitionId);
    if (!competition) return null;

    // Get competition rating
    const ratings = await ctx.db.query("competitionRatings").collect();
    const rating = ratings.find((r) => r.competitionId === args.competitionId);

    // Get player count
    const players = await ctx.db
      .query("players")
      .withIndex("by_competition", (q) => q.eq("competitionId", args.competitionId))
      .collect();

    // Get team count
    const teams = await ctx.db
      .query("teams")
      .withIndex("by_competition", (q) => q.eq("competitionId", args.competitionId))
      .collect();

    return {
      ...competition,
      tier: competition.tier ?? rating?.tier,
      strengthScore: rating?.strengthScore,
      playerCount: players.length,
      teamCount: teams.length,
    };
  },
});

/**
 * Get list of unique countries from competitions
 */
export const countries = query({
  args: {},
  handler: async (ctx) => {
    await requireAuth(ctx);

    const competitions = await ctx.db.query("competitions").collect();
    const countriesSet = [...new Set(competitions.map((c) => c.country))];
    return countriesSet.sort();
  },
});
