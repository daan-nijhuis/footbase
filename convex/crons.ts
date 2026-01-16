/**
 * Cron Jobs for Data Ingestion and AI Report Generation
 *
 * Schedules:
 * - Daily ingestion runs for API-Football data
 * - Daily AI report batch generation
 */

import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

/**
 * Daily ingestion job
 *
 * Runs daily at 04:00 UTC (early morning to avoid peak times)
 * 1. Ingests competitions, teams, and players for NL + DE
 * 2. Ingests recent fixtures from the last 2 days
 *
 * Rate limit budget: ~80 requests (conservative for free plan)
 * - Competition ingestion: ~50 requests (leagues + teams + player pages)
 * - Fixtures ingestion: ~30 requests
 */
crons.daily(
  "daily-ingestion-nl-de",
  { hourUTC: 4, minuteUTC: 0 },
  internal.ingest.cronRunner.runDailyIngestion
);

/**
 * Daily AI report generation job
 *
 * Runs daily at 05:00 UTC (after ingestion completes)
 * 1. Processes queued lazy-generation requests
 * 2. Generates reports for top viewed players
 * 3. Fills remaining quota with top rated players
 *
 * Budget controlled by AI_PLAYER_REPORT_DAILY_LIMIT (default: 200)
 */
crons.daily(
  "daily-ai-reports",
  { hourUTC: 5, minuteUTC: 0 },
  internal.ai.aiCronRunner.runDailyAiBatch
);

export default crons;
