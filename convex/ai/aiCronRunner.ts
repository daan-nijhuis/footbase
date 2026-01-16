/**
 * AI Cron Runner
 *
 * Runs daily batch AI report generation for top viewed and top rated players.
 */

import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";
import type { Id } from "../_generated/dataModel";

interface BatchResult {
  success: boolean;
  totalProcessed: number;
  reportsGenerated: number;
  cacheHits: number;
  errors: number;
  errorDetails: string[];
}

/**
 * Daily batch AI report generation
 *
 * Strategy:
 * 1. Process top viewed players from yesterday (prioritize popular players)
 * 2. Fill remaining quota with top rated players without reports
 * 3. Stop at daily limit
 */
export const runDailyAiBatch = internalAction({
  args: {},
  handler: async (ctx): Promise<BatchResult> => {
    const dailyLimit = parseInt(process.env.AI_PLAYER_REPORT_DAILY_LIMIT ?? "200");
    const locale = process.env.AI_PLAYER_REPORT_LOCALE ?? "nl";
    const minMinutes = 90; // Minimum minutes for report generation

    const result: BatchResult = {
      success: true,
      totalProcessed: 0,
      reportsGenerated: 0,
      cacheHits: 0,
      errors: 0,
      errorDetails: [],
    };

    // Get yesterday's date for view tracking
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dayKey = yesterday.toISOString().split("T")[0];

    console.log(`[AI Batch] Starting daily batch for ${dayKey}, limit: ${dailyLimit}`);

    // 1. Process queued jobs first (from lazy generation requests)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getQueuedJobsRef = internal.ai.playerAiQueries.getQueuedJobs as any;
    const queuedJobs: Array<{ playerId: string; window: "365" | "last5"; locale: string }> =
      await ctx.runQuery(getQueuedJobsRef, {
        limit: Math.floor(dailyLimit * 0.3), // Reserve 30% for queued jobs
      });

    console.log(`[AI Batch] Found ${queuedJobs.length} queued jobs`);

    for (const job of queuedJobs) {
      if (result.totalProcessed >= dailyLimit) break;

      try {
        const genResult = await ctx.runAction(internal.ai.generatePlayerReport.generateReport, {
          playerId: job.playerId as Id<"players">,
          window: job.window,
          locale: job.locale,
        });

        result.totalProcessed++;
        if (genResult.success) {
          if (genResult.cached) {
            result.cacheHits++;
          } else {
            result.reportsGenerated++;
          }
        } else {
          result.errors++;
          result.errorDetails.push(`Player ${job.playerId}: ${genResult.error}`);
        }
      } catch (error) {
        result.errors++;
        result.errorDetails.push(`Player ${job.playerId}: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }

    // 2. Process top viewed players
    const remainingAfterQueued = dailyLimit - result.totalProcessed;
    if (remainingAfterQueued > 0) {
      const viewedLimit = Math.floor(remainingAfterQueued * 0.5); // 50% of remaining for viewed
      const topViewed = await ctx.runQuery(internal.ai.playerAiQueries.getTopViewedPlayers, {
        dayKey,
        limit: viewedLimit,
      });

      console.log(`[AI Batch] Processing ${topViewed.length} top viewed players`);

      for (const { playerId, views } of topViewed) {
        if (result.totalProcessed >= dailyLimit) break;

        try {
          // Generate for 365-day window
          const genResult = await ctx.runAction(internal.ai.generatePlayerReport.generateReport, {
            playerId,
            window: "365",
            locale,
          });

          result.totalProcessed++;
          if (genResult.success) {
            if (genResult.cached) {
              result.cacheHits++;
            } else {
              result.reportsGenerated++;
              console.log(`[AI Batch] Generated report for player ${playerId} (${views} views)`);
            }
          } else {
            result.errors++;
            result.errorDetails.push(`Player ${playerId}: ${genResult.error}`);
          }
        } catch (error) {
          result.errors++;
          result.errorDetails.push(`Player ${playerId}: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
    }

    // 3. Fill remaining quota with top rated players
    const remainingAfterViewed = dailyLimit - result.totalProcessed;
    if (remainingAfterViewed > 0) {
      const topRated = await ctx.runQuery(internal.ai.playerAiQueries.getTopRatedWithoutReports, {
        locale,
        window: "365",
        limit: remainingAfterViewed,
        minMinutes,
      });

      console.log(`[AI Batch] Processing ${topRated.length} top rated players without reports`);

      for (const { playerId, rating } of topRated) {
        if (result.totalProcessed >= dailyLimit) break;

        try {
          const genResult = await ctx.runAction(internal.ai.generatePlayerReport.generateReport, {
            playerId,
            window: "365",
            locale,
          });

          result.totalProcessed++;
          if (genResult.success) {
            if (genResult.cached) {
              result.cacheHits++;
            } else {
              result.reportsGenerated++;
              console.log(`[AI Batch] Generated report for player ${playerId} (rating: ${rating.toFixed(1)})`);
            }
          } else {
            result.errors++;
            result.errorDetails.push(`Player ${playerId}: ${genResult.error}`);
          }
        } catch (error) {
          result.errors++;
          result.errorDetails.push(`Player ${playerId}: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
    }

    console.log(`[AI Batch] Completed: ${result.reportsGenerated} generated, ${result.cacheHits} cached, ${result.errors} errors`);

    // Truncate error details if too many
    if (result.errorDetails.length > 10) {
      result.errorDetails = [
        ...result.errorDetails.slice(0, 10),
        `... and ${result.errorDetails.length - 10} more errors`,
      ];
    }

    return result;
  },
});

/**
 * Process a single queued job (for individual scheduling)
 */
interface ProcessJobResult {
  success: boolean;
  message?: string;
  playerId?: string;
  cached?: boolean;
  error?: string;
}

export const processQueuedJob = internalAction({
  args: {},
  handler: async (ctx): Promise<ProcessJobResult> => {
    // Get one queued job
    const queuedJobs: Array<{
      playerId: string;
      window: "365" | "last5";
      locale: string;
    }> = await ctx.runQuery(internal.ai.playerAiQueries.getQueuedJobs, {
      limit: 1,
    });

    if (queuedJobs.length === 0) {
      return { success: true, message: "No queued jobs" };
    }

    const job = queuedJobs[0];

    try {
      const result: {
        success: boolean;
        cached?: boolean;
        error?: string;
      } = await ctx.runAction(internal.ai.generatePlayerReport.generateReport, {
        playerId: job.playerId as Id<"players">,
        window: job.window,
        locale: job.locale,
      });

      return {
        success: result.success,
        playerId: job.playerId,
        cached: result.cached,
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        playerId: job.playerId,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});
