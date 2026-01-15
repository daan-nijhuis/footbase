/**
 * Cron Jobs for Data Ingestion
 *
 * Schedules daily ingestion runs for API-Football data.
 * Runs at 04:00 UTC to capture results from the previous day.
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

export default crons;
