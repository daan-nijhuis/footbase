/**
 * Player AI Report Queries and View Tracking
 *
 * Public queries for fetching AI reports and mutations for tracking views.
 */

import { v } from "convex/values";
import { query, mutation, internalMutation, internalQuery } from "../_generated/server";
import { aiWindowValidator } from "./buildPlayerAiInput";
import type { Doc } from "../_generated/dataModel";

// ============================================================================
// Public Queries
// ============================================================================

/**
 * Get AI report for a player
 */
export const getReport = query({
  args: {
    playerId: v.id("players"),
    window: v.optional(aiWindowValidator),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const window = args.window ?? "365";
    const locale = args.locale ?? "nl";

    const report = await ctx.db
      .query("playerAiReports")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", window).eq("locale", locale)
      )
      .first();

    if (!report) return null;

    return {
      shortDescription: report.shortDescription,
      longDescription: report.longDescription,
      archetype: report.archetype,
      playstyleTags: report.playstyleTags,
      strengths: report.strengths,
      weaknesses: report.weaknesses,
      confidence: report.confidence,
      generatedAt: report.generatedAt,
      model: report.model,
      window: report.window,
    };
  },
});

/**
 * Check if a report exists and its freshness
 */
export const getReportStatus = query({
  args: {
    playerId: v.id("players"),
    window: v.optional(aiWindowValidator),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const window = args.window ?? "365";
    const locale = args.locale ?? "nl";

    // Check for existing report
    const report = await ctx.db
      .query("playerAiReports")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", window).eq("locale", locale)
      )
      .first();

    // Check for pending job
    const job = await ctx.db
      .query("playerAiJobs")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", window).eq("locale", locale)
      )
      .first();

    return {
      hasReport: !!report,
      generatedAt: report?.generatedAt,
      isStale: report ? Date.now() - report.generatedAt > 7 * 24 * 60 * 60 * 1000 : false, // > 7 days
      jobStatus: job?.status,
      jobError: job?.lastError,
    };
  },
});

// ============================================================================
// View Tracking
// ============================================================================

/**
 * Track a player profile view (public mutation)
 * Called from the player profile page to record views for AI prioritization
 */
export const trackView = mutation({
  args: {
    playerId: v.id("players"),
  },
  handler: async (ctx, args) => {
    // Verify player exists
    const player = await ctx.db.get(args.playerId);
    if (!player) return;

    const now = new Date();
    const dayKey = now.toISOString().split("T")[0]; // "YYYY-MM-DD"

    // Find existing view record for today
    const existing = await ctx.db
      .query("playerViewsDaily")
      .withIndex("by_day_player", (q) =>
        q.eq("dayKey", dayKey).eq("playerId", args.playerId)
      )
      .first();

    if (existing) {
      // Increment existing
      await ctx.db.patch(existing._id, {
        views: existing.views + 1,
      });
    } else {
      // Create new record
      await ctx.db.insert("playerViewsDaily", {
        dayKey,
        playerId: args.playerId,
        views: 1,
      });
    }
  },
});

/**
 * Request AI report generation (public mutation with rate limiting)
 * Used for lazy generation when a user views a player without a report
 */
export const requestReport = mutation({
  args: {
    playerId: v.id("players"),
    window: v.optional(aiWindowValidator),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const window = args.window ?? "365";
    const locale = args.locale ?? "nl";

    // Check if player exists and has enough minutes
    const player = await ctx.db.get(args.playerId);
    if (!player) {
      return { success: false, error: "Player not found" };
    }

    // Get rolling stats to check minutes
    const stats = await ctx.db
      .query("playerRollingStats")
      .withIndex("by_player_competition", (q) =>
        q.eq("playerId", args.playerId)
      )
      .first();

    if (!stats || stats.minutes < 90) {
      return { success: false, error: "Insufficient minutes played" };
    }

    // Check if report already exists
    const existingReport = await ctx.db
      .query("playerAiReports")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", window).eq("locale", locale)
      )
      .first();

    if (existingReport) {
      return { success: true, cached: true };
    }

    // Check if job already exists and is recent
    const existingJob = await ctx.db
      .query("playerAiJobs")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", window).eq("locale", locale)
      )
      .first();

    const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000;

    if (existingJob) {
      // If job is running or was recently updated, don't create another
      if (
        existingJob.status === "running" ||
        (existingJob.status === "queued" && existingJob.updatedAt > fiveMinutesAgo)
      ) {
        return { success: true, queued: true, jobId: existingJob._id };
      }

      // If too many attempts, don't retry
      if (existingJob.attempts >= 3) {
        return { success: false, error: "Too many failed attempts" };
      }
    }

    // Create/update job as queued
    if (existingJob) {
      await ctx.db.patch(existingJob._id, {
        status: "queued",
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("playerAiJobs", {
        playerId: args.playerId,
        window,
        locale,
        status: "queued",
        lockedUntil: 0,
        attempts: 0,
        updatedAt: now,
      });
    }

    return { success: true, queued: true };
  },
});

// ============================================================================
// Internal Queries for Cron Jobs
// ============================================================================

/**
 * Get top viewed players for a date range
 */
export const getTopViewedPlayers = internalQuery({
  args: {
    dayKey: v.string(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    // Get all views for the day, sorted by views descending
    const views = await ctx.db
      .query("playerViewsDaily")
      .withIndex("by_day_views", (q) => q.eq("dayKey", args.dayKey))
      .order("desc")
      .take(args.limit * 2); // Take extra in case some don't qualify

    // Filter to players with sufficient minutes
    const qualifiedPlayers: Array<{ playerId: Doc<"players">["_id"]; views: number }> = [];

    for (const view of views) {
      if (qualifiedPlayers.length >= args.limit) break;

      const stats = await ctx.db
        .query("playerRollingStats")
        .withIndex("by_player_competition", (q) =>
          q.eq("playerId", view.playerId)
        )
        .first();

      if (stats && stats.minutes >= 90) {
        qualifiedPlayers.push({
          playerId: view.playerId,
          views: view.views,
        });
      }
    }

    return qualifiedPlayers;
  },
});

/**
 * Get top rated players without AI reports
 */
export const getTopRatedWithoutReports = internalQuery({
  args: {
    locale: v.string(),
    window: aiWindowValidator,
    limit: v.number(),
    minMinutes: v.number(),
  },
  handler: async (ctx, args) => {
    // Get all player ratings sorted by rating
    const ratings = await ctx.db
      .query("playerRatings")
      .withIndex("by_positionGroup_rating")
      .order("desc")
      .take(args.limit * 3); // Take extra to filter

    const candidates: Array<{
      playerId: Doc<"players">["_id"];
      rating: number;
    }> = [];

    for (const rating of ratings) {
      if (candidates.length >= args.limit) break;

      // Check if report already exists
      const existingReport = await ctx.db
        .query("playerAiReports")
        .withIndex("by_player_window_locale", (q) =>
          q
            .eq("playerId", rating.playerId)
            .eq("window", args.window)
            .eq("locale", args.locale)
        )
        .first();

      if (existingReport) continue;

      // Check minutes
      const stats = await ctx.db
        .query("playerRollingStats")
        .withIndex("by_player_competition", (q) =>
          q.eq("playerId", rating.playerId)
        )
        .first();

      if (!stats || stats.minutes < args.minMinutes) continue;

      candidates.push({
        playerId: rating.playerId,
        rating: args.window === "365" ? rating.rating365 : rating.ratingLast5,
      });
    }

    return candidates;
  },
});

/**
 * Queued job type for batch processing
 */
interface QueuedJob {
  playerId: string;
  window: "365" | "last5";
  locale: string;
}

/**
 * Get queued jobs that need processing
 */
export const getQueuedJobs = internalQuery({
  args: {
    limit: v.number(),
  },
  handler: async (ctx, args): Promise<QueuedJob[]> => {
    const now = Date.now();

    // Get jobs that are queued or have expired locks
    const allJobs = await ctx.db.query("playerAiJobs").collect();

    const processable = allJobs
      .filter(
        (job) =>
          job.status === "queued" ||
          (job.status === "running" && job.lockedUntil < now)
      )
      .filter((job) => job.attempts < 3)
      .slice(0, args.limit);

    // Map to simplified type for batch processing
    return processable.map((job) => ({
      playerId: job.playerId,
      window: job.window,
      locale: job.locale,
    }));
  },
});
