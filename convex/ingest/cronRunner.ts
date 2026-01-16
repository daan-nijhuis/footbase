/**
 * Cron Runner for Daily Ingestion
 *
 * This module contains the internal action that runs the daily ingestion.
 * It's called by the cron job defined in crons.ts.
 *
 * Pipeline steps:
 * 1. Ingest competitions, teams, players from API-Football
 * 2. Ingest recent fixtures for match stats
 * 3. Recompute rolling stats and ratings
 * 4. Enrich players from FotMob and SofaScore (new)
 */

import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";
import type { IngestionResult } from "./apiFootballIngest";
import type { EnrichmentResult } from "../enrichment/enrichActions";
import { getCurrentFootballSeason } from "../lib/metrics";

// Re-export for use in admin.ts
export type { IngestionResult };

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}


/**
 * Run the daily ingestion for NL + DE
 *
 * This action:
 * 1. Runs ingestCountries for Netherlands and Germany
 * 2. Runs ingestRecentFixtures for the last 2 days
 * 3. Recomputes player and competition ratings
 * 4. Enriches players from FotMob and SofaScore
 *
 * Budget: ~80 API-Football requests + ~35 enrichment requests
 */
export interface DailyIngestionResult {
  success: boolean;
  totalRequests: number;
  countriesResult: IngestionResult;
  fixturesResult: IngestionResult;
  ratingsResult?: {
    success: boolean;
    playersProcessed: number;
    ratingsComputed: number;
    competitionsRated: number;
  };
  enrichmentResult?: {
    fotmob: EnrichmentResult;
    sofascore: EnrichmentResult;
    totalPlayersEnriched: number;
  };
}

export const runDailyIngestion = internalAction({
  args: {},
  handler: async (ctx): Promise<DailyIngestionResult> => {
    console.log("[Cron] Starting daily ingestion...");

    const season = getCurrentFootballSeason();
    const countries = ["Netherlands", "Germany"];

    console.log(`[Cron] Using season: ${season}`);

    // Step 1: Ingest competitions, teams, and players
    // Budget: ~50 requests
    console.log("[Cron] Step 1: Ingesting competitions, teams, and players...");
    const countriesResult: IngestionResult = await ctx.runAction(
      internal.ingest.apiFootballIngest.ingestCountries,
      {
        countries,
        season,
        maxRequests: 50,
      }
    );

    console.log("[Cron] Countries ingestion result:", countriesResult);

    // Step 2: Ingest recent fixtures (last 2 days)
    // Budget: ~30 requests
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    console.log("[Cron] Step 2: Ingesting recent fixtures...");
    const fixturesResult: IngestionResult = await ctx.runAction(
      internal.ingest.apiFootballIngest.ingestRecentFixtures,
      {
        dateFrom: formatDate(twoDaysAgo),
        dateTo: formatDate(today),
        maxRequests: 30,
        countries,
      }
    );

    console.log("[Cron] Fixtures ingestion result:", fixturesResult);

    // Step 3: Recompute player and competition ratings
    console.log("[Cron] Step 3: Recomputing ratings...");
    let ratingsResult;
    try {
      ratingsResult = await ctx.runAction(
        internal.ratings.compute.recomputeRollingStatsAndRatings,
        {
          // Compute for all players in the countries we ingested
          // This is fast since it doesn't make external API calls
        }
      );
      console.log("[Cron] Ratings result:", ratingsResult);
    } catch (error) {
      console.error("[Cron] Ratings computation failed:", error);
      ratingsResult = {
        success: false,
        playersProcessed: 0,
        ratingsComputed: 0,
        competitionsRated: 0,
      };
    }

    // Step 4: Enrich players from FotMob and SofaScore
    // Budget: ~20 FotMob requests + ~15 SofaScore requests
    console.log("[Cron] Step 4: Enriching players from external providers...");
    let enrichmentResult;
    try {
      enrichmentResult = await ctx.runAction(
        internal.enrichment.enrichActions.enrichPlayersFromAllProviders,
        {
          fotMobRequests: 20,
          sofaScoreRequests: 15,
          batchSize: 10,
        }
      );
      console.log("[Cron] Enrichment result:", enrichmentResult);
    } catch (error) {
      console.error("[Cron] Enrichment failed:", error);
      enrichmentResult = undefined;
    }

    const totalRequests =
      (countriesResult.requestsUsed || 0) + (fixturesResult.requestsUsed || 0);

    console.log(`[Cron] Daily ingestion completed. Total requests: ${totalRequests}`);

    return {
      success: countriesResult.success && fixturesResult.success,
      totalRequests,
      countriesResult,
      fixturesResult,
      ratingsResult,
      enrichmentResult,
    };
  },
});
