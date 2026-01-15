/**
 * Seed Rating Profiles
 *
 * Seeds the default rating profiles into the database.
 */

import { v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";
import { DEFAULT_RATING_PROFILES } from "../lib/metrics";
import type { PositionGroup } from "../lib/metrics";

/**
 * Check if rating profiles exist
 */
export const hasRatingProfiles = internalQuery({
  args: {},
  handler: async (ctx) => {
    const profiles = await ctx.db.query("ratingProfiles").collect();
    return profiles.length > 0;
  },
});

/**
 * Seed default rating profiles
 */
export const seedRatingProfiles = internalMutation({
  args: {
    force: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Check if profiles already exist
    const existing = await ctx.db.query("ratingProfiles").collect();

    if (existing.length > 0 && !args.force) {
      console.log("[Seed] Rating profiles already exist, skipping");
      return { seeded: false, count: existing.length };
    }

    // Delete existing if force
    if (args.force) {
      for (const profile of existing) {
        await ctx.db.delete(profile._id);
      }
    }

    // Insert default profiles
    const positionGroups: PositionGroup[] = ["GK", "DEF", "MID", "ATT"];
    let count = 0;

    for (const pg of positionGroups) {
      const profile = DEFAULT_RATING_PROFILES[pg];

      await ctx.db.insert("ratingProfiles", {
        positionGroup: pg,
        weights: profile.weights,
        invertMetrics: profile.invertMetrics,
        updatedAt: Date.now(),
      });
      count++;
    }

    console.log(`[Seed] Seeded ${count} rating profiles`);

    return { seeded: true, count };
  },
});

/**
 * Update a specific rating profile's weights
 */
export const updateRatingProfile = internalMutation({
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
  handler: async (ctx, args) => {
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
