/**
 * StatsBomb Data Ingestion Pipeline
 *
 * Handles fetching and storing data from StatsBomb Data API.
 * Follows patterns from apiFootballIngest.ts for consistency.
 *
 * Main flows:
 * 1. syncCompetitions - Sync licensed competition-seasons
 * 2. syncMatchesForSeason - Sync match list for a competition-season
 * 3. ingestMatchStats - Ingest lineups + player stats for a match
 * 4. ingestSeasonAggregates - Ingest season-level player aggregates
 */

import { v } from "convex/values";
import { action, internalAction, internalMutation, internalQuery } from "../_generated/server";
import { internal } from "../_generated/api";
import { Doc, Id } from "../_generated/dataModel";
import * as StatsBomb from "../providers/statsbomb";
import {
  LICENSED_COMPETITIONS,
  TARGET_SEASONS,
  INGESTION_BUDGET,
  AVAILABLE_MATCH_STATUSES,
  isLicensedCompetition,
  isTargetSeason,
} from "./statsbombConfig";
import {
  resolveStatsBombPlayer,
  linkStatsBombPlayer,
  addStatsBombToReviewQueue,
  normalizeName,
} from "../resolve/resolvePlayer";

// ============================================================================
// Internal Queries
// ============================================================================

/**
 * Get a competition-season by StatsBomb IDs
 */
export const getCompetitionSeasonByStatsBombIds = internalQuery({
  args: {
    statsbombCompetitionId: v.number(),
    statsbombSeasonId: v.number(),
  },
  handler: async (ctx, { statsbombCompetitionId, statsbombSeasonId }) => {
    return await ctx.db
      .query("statsbombCompetitionSeasons")
      .withIndex("by_statsbomb_ids", (q) =>
        q
          .eq("statsbombCompetitionId", statsbombCompetitionId)
          .eq("statsbombSeasonId", statsbombSeasonId)
      )
      .first();
  },
});

/**
 * Get a competition-season by ID
 */
export const getCompetitionSeason = internalQuery({
  args: { id: v.id("statsbombCompetitionSeasons") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

/**
 * Get all active competition-seasons for sync
 */
export const getActiveCompetitionSeasons = internalQuery({
  handler: async (ctx) => {
    // Return both pending and synced competition-seasons for processing
    // Pending: needs initial match sync
    // Synced: may need match updates
    const pending = await ctx.db
      .query("statsbombCompetitionSeasons")
      .withIndex("by_sync_status", (q) => q.eq("syncStatus", "pending"))
      .collect();
    const synced = await ctx.db
      .query("statsbombCompetitionSeasons")
      .withIndex("by_sync_status", (q) => q.eq("syncStatus", "synced"))
      .collect();
    return [...pending, ...synced];
  },
});

/**
 * Get a match by StatsBomb match ID
 */
export const getMatchByStatsBombId = internalQuery({
  args: { statsbombMatchId: v.number() },
  handler: async (ctx, { statsbombMatchId }) => {
    return await ctx.db
      .query("statsbombMatches")
      .withIndex("by_statsbomb_match", (q) =>
        q.eq("statsbombMatchId", statsbombMatchId)
      )
      .first();
  },
});

/**
 * Get matches needing player stats ingestion
 */
export const getMatchesNeedingStats = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 50 }) => {
    const matches = await ctx.db
      .query("statsbombMatches")
      .withIndex("by_pending_player_stats", (q) =>
        q.eq("playerStatsIngested", false).eq("status", "available")
      )
      .take(limit);
    return matches;
  },
});

/**
 * Count matches by ingestion status
 */
export const countMatchesByStatus = internalQuery({
  handler: async (ctx) => {
    const allMatches = await ctx.db.query("statsbombMatches").collect();

    const pending = allMatches.filter(
      (m) => !m.playerStatsIngested && m.status === "available"
    );
    const ingested = allMatches.filter((m) => m.playerStatsIngested);
    const unavailable = allMatches.filter((m) => m.status !== "available");

    return {
      total: allMatches.length,
      pending: pending.length,
      ingested: ingested.length,
      unavailable: unavailable.length,
    };
  },
});

/**
 * Get matches for a competition-season
 */
export const getMatchesForCompetitionSeason = internalQuery({
  args: { competitionSeasonId: v.id("statsbombCompetitionSeasons") },
  handler: async (ctx, { competitionSeasonId }) => {
    return await ctx.db
      .query("statsbombMatches")
      .withIndex("by_competition_season", (q) =>
        q.eq("competitionSeasonId", competitionSeasonId)
      )
      .collect();
  },
});

/**
 * Get external ID for a StatsBomb player
 */
export const getStatsBombExternalId = internalQuery({
  args: { statsbombPlayerId: v.number() },
  handler: async (ctx, { statsbombPlayerId }) => {
    return await ctx.db
      .query("playerExternalIds")
      .withIndex("by_provider_playerId", (q) =>
        q.eq("provider", "statsbomb").eq("providerPlayerId", String(statsbombPlayerId))
      )
      .first();
  },
});

/**
 * Get StatsBomb player mapping
 */
export const getStatsBombPlayerMapping = internalQuery({
  args: { statsbombPlayerId: v.number() },
  handler: async (ctx, { statsbombPlayerId }) => {
    return await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();
  },
});

/**
 * Find canonical competition by name and country
 */
export const findCanonicalCompetition = internalQuery({
  args: {
    name: v.string(),
    country: v.string(),
    season: v.string(),
  },
  handler: async (ctx, { name, country, season }) => {
    // First try exact match by name and country
    const competitions = await ctx.db
      .query("competitions")
      .withIndex("by_country", (q) => q.eq("country", country))
      .collect();

    // Find best match by name similarity
    const nameLower = name.toLowerCase();
    for (const comp of competitions) {
      const compNameLower = comp.name.toLowerCase();
      if (
        compNameLower.includes(nameLower) ||
        nameLower.includes(compNameLower)
      ) {
        // Check season matches
        if (comp.season === season || season.includes(comp.season)) {
          return comp;
        }
      }
    }

    return null;
  },
});

// ============================================================================
// Internal Mutations
// ============================================================================

/**
 * Upsert a competition-season
 */
export const upsertCompetitionSeason = internalMutation({
  args: {
    statsbombCompetitionId: v.number(),
    statsbombSeasonId: v.number(),
    name: v.string(),
    country: v.string(),
    season: v.string(),
    matchUpdated: v.optional(v.string()),
    matchAvailable: v.optional(v.string()),
    competitionId: v.optional(v.id("competitions")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("statsbombCompetitionSeasons")
      .withIndex("by_statsbomb_ids", (q) =>
        q
          .eq("statsbombCompetitionId", args.statsbombCompetitionId)
          .eq("statsbombSeasonId", args.statsbombSeasonId)
      )
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        country: args.country,
        season: args.season,
        matchUpdated: args.matchUpdated,
        matchAvailable: args.matchAvailable,
        competitionId: args.competitionId ?? existing.competitionId,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("statsbombCompetitionSeasons", {
      statsbombCompetitionId: args.statsbombCompetitionId,
      statsbombSeasonId: args.statsbombSeasonId,
      name: args.name,
      country: args.country,
      season: args.season,
      matchUpdated: args.matchUpdated,
      matchAvailable: args.matchAvailable,
      competitionId: args.competitionId,
      syncStatus: "pending",
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Update competition-season sync status
 */
export const updateCompetitionSeasonSyncStatus = internalMutation({
  args: {
    id: v.id("statsbombCompetitionSeasons"),
    syncStatus: v.union(
      v.literal("pending"),
      v.literal("syncing"),
      v.literal("synced"),
      v.literal("error")
    ),
    lastError: v.optional(v.string()),
    matchCount: v.optional(v.number()),
  },
  handler: async (ctx, { id, syncStatus, lastError, matchCount }) => {
    const updates: Record<string, unknown> = {
      syncStatus,
      updatedAt: Date.now(),
    };

    if (syncStatus === "synced") {
      updates.lastSyncedAt = Date.now();
    }

    if (lastError !== undefined) {
      updates.lastError = lastError;
    }

    if (matchCount !== undefined) {
      updates.matchCount = matchCount;
    }

    await ctx.db.patch(id, updates);
  },
});

/**
 * Upsert a match
 */
export const upsertMatch = internalMutation({
  args: {
    competitionSeasonId: v.id("statsbombCompetitionSeasons"),
    statsbombMatchId: v.number(),
    matchDate: v.string(),
    kickOff: v.optional(v.string()),
    homeTeamName: v.string(),
    awayTeamName: v.string(),
    homeTeamId: v.optional(v.number()),
    awayTeamId: v.optional(v.number()),
    homeScore: v.optional(v.number()),
    awayScore: v.optional(v.number()),
    status: v.string(),
    lastUpdated: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("statsbombMatches")
      .withIndex("by_statsbomb_match", (q) =>
        q.eq("statsbombMatchId", args.statsbombMatchId)
      )
      .first();

    const now = Date.now();

    if (existing) {
      // Check if match was updated
      const wasUpdated =
        existing.lastUpdated !== args.lastUpdated ||
        existing.status !== args.status;

      await ctx.db.patch(existing._id, {
        matchDate: args.matchDate,
        kickOff: args.kickOff,
        homeTeamName: args.homeTeamName,
        awayTeamName: args.awayTeamName,
        homeTeamId: args.homeTeamId,
        awayTeamId: args.awayTeamId,
        homeScore: args.homeScore,
        awayScore: args.awayScore,
        status: args.status,
        lastUpdated: args.lastUpdated,
        // Reset ingestion flags if match was updated
        playerStatsIngested: wasUpdated ? false : existing.playerStatsIngested,
        lineupsIngested: wasUpdated ? false : existing.lineupsIngested,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("statsbombMatches", {
      competitionSeasonId: args.competitionSeasonId,
      statsbombMatchId: args.statsbombMatchId,
      matchDate: args.matchDate,
      kickOff: args.kickOff,
      homeTeamName: args.homeTeamName,
      awayTeamName: args.awayTeamName,
      homeTeamId: args.homeTeamId,
      awayTeamId: args.awayTeamId,
      homeScore: args.homeScore,
      awayScore: args.awayScore,
      status: args.status,
      lastUpdated: args.lastUpdated,
      lineupsIngested: false,
      playerStatsIngested: false,
      teamStatsIngested: false,
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Mark match stats as ingested
 */
export const markMatchStatsIngested = internalMutation({
  args: {
    id: v.id("statsbombMatches"),
    playerStatsIngested: v.optional(v.boolean()),
    lineupsIngested: v.optional(v.boolean()),
    teamStatsIngested: v.optional(v.boolean()),
  },
  handler: async (
    ctx,
    { id, playerStatsIngested, lineupsIngested, teamStatsIngested }
  ) => {
    const updates: Record<string, unknown> = { updatedAt: Date.now() };

    if (playerStatsIngested !== undefined) {
      updates.playerStatsIngested = playerStatsIngested;
    }
    if (lineupsIngested !== undefined) {
      updates.lineupsIngested = lineupsIngested;
    }
    if (teamStatsIngested !== undefined) {
      updates.teamStatsIngested = teamStatsIngested;
    }

    await ctx.db.patch(id, updates);
  },
});

/**
 * Upsert player match stats
 */
export const upsertPlayerMatchStats = internalMutation({
  args: {
    playerId: v.id("players"),
    matchKey: v.string(),
    matchDate: v.string(),
    competitionId: v.optional(v.id("competitions")),
    teamId: v.optional(v.id("teams")),
    minutes: v.optional(v.number()),
    stats: v.object({
      goals: v.optional(v.number()),
      assists: v.optional(v.number()),
      xG: v.optional(v.number()),
      xA: v.optional(v.number()),
      shots: v.optional(v.number()),
      shotsOnTarget: v.optional(v.number()),
      keyPasses: v.optional(v.number()),
      tackles: v.optional(v.number()),
      interceptions: v.optional(v.number()),
    }),
    providerMatchId: v.string(),
    raw: v.any(),
    features: v.any(),
  },
  handler: async (ctx, args) => {
    // Check for existing record
    const existing = await ctx.db
      .query("providerPlayerMatchStats")
      .withIndex("by_provider_matchId_player", (q) =>
        q
          .eq("provider", "statsbomb")
          .eq("providerMatchId", args.providerMatchId)
          .eq("playerId", args.playerId)
      )
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        matchDate: args.matchDate,
        competitionId: args.competitionId,
        teamId: args.teamId,
        minutes: args.minutes,
        stats: args.stats,
        raw: args.raw,
        features: args.features,
        fetchedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("providerPlayerMatchStats", {
      playerId: args.playerId,
      provider: "statsbomb",
      matchKey: args.matchKey,
      matchDate: args.matchDate,
      competitionId: args.competitionId,
      teamId: args.teamId,
      minutes: args.minutes,
      stats: args.stats,
      providerMatchId: args.providerMatchId,
      raw: args.raw,
      features: args.features,
      fetchedAt: now,
    });
  },
});

/**
 * Upsert StatsBomb player mapping
 */
export const upsertStatsBombPlayerMapping = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    playerName: v.string(),
    playerId: v.optional(v.id("players")),
  },
  handler: async (ctx, { statsbombPlayerId, playerName, playerId }) => {
    const existing = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        playerName,
        playerId: playerId ?? existing.playerId,
        cachedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("statsbombPlayerMappings", {
      statsbombPlayerId,
      playerName,
      playerId,
      cachedAt: now,
    });
  },
});

// ============================================================================
// Actions
// ============================================================================

/**
 * Sync licensed competitions from StatsBomb catalog
 */
export const syncCompetitions = internalAction({
  handler: async (ctx) => {
    if (!StatsBomb.isConfigured()) {
      console.log("[StatsBomb] Credentials not configured, skipping sync");
      return { synced: 0, error: "Credentials not configured" };
    }

    console.log("[StatsBomb] Fetching competitions catalog...");
    const competitions = await StatsBomb.fetchCompetitions();
    console.log(`[StatsBomb] Found ${competitions.length} competition-seasons`);

    let syncedCount = 0;

    for (const comp of competitions) {
      // Check if this is a licensed competition for a target season
      if (
        !isLicensedCompetition(comp.competition_name, comp.country_name) ||
        !isTargetSeason(comp.season_name)
      ) {
        continue;
      }

      console.log(
        `[StatsBomb] Syncing: ${comp.competition_name} (${comp.country_name}) - ${comp.season_name}`
      );

      // Try to find matching canonical competition
      const canonicalComp = await ctx.runQuery(
        internal.ingest.statsbombIngest.findCanonicalCompetition,
        {
          name: comp.competition_name,
          country: comp.country_name,
          season: comp.season_name,
        }
      );

      // Upsert the competition-season
      await ctx.runMutation(
        internal.ingest.statsbombIngest.upsertCompetitionSeason,
        {
          statsbombCompetitionId: comp.competition_id,
          statsbombSeasonId: comp.season_id,
          name: comp.competition_name,
          country: comp.country_name,
          season: comp.season_name,
          matchUpdated: comp.match_updated,
          matchAvailable: comp.match_available,
          competitionId: canonicalComp?._id,
        }
      );

      syncedCount++;
    }

    console.log(`[StatsBomb] Synced ${syncedCount} competition-seasons`);
    return { synced: syncedCount };
  },
});

/**
 * Sync matches for a competition-season
 */
export const syncMatchesForSeason = internalAction({
  args: { competitionSeasonId: v.id("statsbombCompetitionSeasons") },
  handler: async (ctx, { competitionSeasonId }) => {
    const cs = await ctx.runQuery(
      internal.ingest.statsbombIngest.getCompetitionSeason,
      { id: competitionSeasonId }
    );

    if (!cs) {
      throw new Error(`Competition-season not found: ${competitionSeasonId}`);
    }

    console.log(
      `[StatsBomb] Syncing matches for: ${cs.name} (${cs.country}) - ${cs.season}`
    );

    // Mark as syncing
    await ctx.runMutation(
      internal.ingest.statsbombIngest.updateCompetitionSeasonSyncStatus,
      {
        id: competitionSeasonId,
        syncStatus: "syncing",
      }
    );

    try {
      const matches = await StatsBomb.fetchMatches(
        cs.statsbombCompetitionId,
        cs.statsbombSeasonId
      );

      console.log(`[StatsBomb] Found ${matches.length} matches`);

      let upsertedCount = 0;
      let availableCount = 0;

      for (const match of matches) {
        await ctx.runMutation(internal.ingest.statsbombIngest.upsertMatch, {
          competitionSeasonId,
          statsbombMatchId: match.match_id,
          matchDate: match.match_date,
          kickOff: match.kick_off,
          homeTeamName: match.home_team.home_team_name,
          awayTeamName: match.away_team.away_team_name,
          homeTeamId: match.home_team.home_team_id,
          awayTeamId: match.away_team.away_team_id,
          homeScore: match.home_score ?? undefined,
          awayScore: match.away_score ?? undefined,
          status: match.match_status,
          lastUpdated: match.last_updated,
        });

        upsertedCount++;
        if (AVAILABLE_MATCH_STATUSES.includes(match.match_status as "available" | "completed")) {
          availableCount++;
        }
      }

      // Mark as synced
      await ctx.runMutation(
        internal.ingest.statsbombIngest.updateCompetitionSeasonSyncStatus,
        {
          id: competitionSeasonId,
          syncStatus: "synced",
          matchCount: matches.length,
        }
      );

      console.log(
        `[StatsBomb] Synced ${upsertedCount} matches (${availableCount} available for stats)`
      );

      return {
        total: upsertedCount,
        available: availableCount,
      };
    } catch (error) {
      // Mark as error
      await ctx.runMutation(
        internal.ingest.statsbombIngest.updateCompetitionSeasonSyncStatus,
        {
          id: competitionSeasonId,
          syncStatus: "error",
          lastError: error instanceof Error ? error.message : String(error),
        }
      );
      throw error;
    }
  },
});

/**
 * Ingest player stats for a single match
 */
export const ingestMatchStats = internalAction({
  args: { statsbombMatchId: v.number() },
  handler: async (ctx, { statsbombMatchId }) => {
    const match = await ctx.runQuery(
      internal.ingest.statsbombIngest.getMatchByStatsBombId,
      { statsbombMatchId }
    );

    if (!match) {
      throw new Error(`Match not found: ${statsbombMatchId}`);
    }

    console.log(
      `[StatsBomb] Ingesting stats for: ${match.homeTeamName} vs ${match.awayTeamName} (${match.matchDate})`
    );

    // Fetch player stats
    const playerStats = await StatsBomb.fetchMatchPlayerStats(statsbombMatchId);
    console.log(`[StatsBomb] Found ${playerStats.length} player stat records`);

    let processedCount = 0;
    let skippedCount = 0;

    for (const stat of playerStats) {
      // Check if player is already linked
      const externalId = await ctx.runQuery(
        internal.ingest.statsbombIngest.getStatsBombExternalId,
        { statsbombPlayerId: stat.player_id }
      );

      if (!externalId) {
        // Player not linked - store in mapping for later resolution
        await ctx.runMutation(
          internal.ingest.statsbombIngest.upsertStatsBombPlayerMapping,
          {
            statsbombPlayerId: stat.player_id,
            playerName: stat.player_name,
          }
        );
        skippedCount++;
        continue;
      }

      // Get competition from the season
      const cs = await ctx.runQuery(
        internal.ingest.statsbombIngest.getCompetitionSeason,
        { id: match.competitionSeasonId }
      );

      // Extract basic stats for canonical stats object
      const basicStats = {
        goals: stat.player_match_goals as number | undefined,
        assists: stat.player_match_assists as number | undefined,
        xG: stat.player_match_xg as number | undefined,
        xA: stat.player_match_xa as number | undefined,
        shots: stat.player_match_shots_total as number | undefined,
        shotsOnTarget: stat.player_match_shots_on_target as number | undefined,
        keyPasses: stat.player_match_key_passes as number | undefined,
        tackles: stat.player_match_tackles as number | undefined,
        interceptions: stat.player_match_interceptions as number | undefined,
      };

      // Extract features for rating computation
      const features = extractRatingFeatures(stat);

      // Create match key
      const matchKey = StatsBomb.createMatchKey({
        match_date: match.matchDate,
        home_team: { home_team_id: match.homeTeamId!, home_team_name: match.homeTeamName } as StatsBomb.StatsBombMatch["home_team"],
        away_team: { away_team_id: match.awayTeamId!, away_team_name: match.awayTeamName } as StatsBomb.StatsBombMatch["away_team"],
      } as StatsBomb.StatsBombMatch);

      // Store player match stats
      await ctx.runMutation(
        internal.ingest.statsbombIngest.upsertPlayerMatchStats,
        {
          playerId: externalId.playerId,
          matchKey,
          matchDate: match.matchDate,
          competitionId: cs?.competitionId,
          minutes: stat.player_match_minutes,
          stats: basicStats,
          providerMatchId: String(statsbombMatchId),
          raw: stat, // Store full raw data
          features, // Store extracted features
        }
      );

      processedCount++;
    }

    // Mark match stats as ingested
    await ctx.runMutation(
      internal.ingest.statsbombIngest.markMatchStatsIngested,
      {
        id: match._id,
        playerStatsIngested: true,
      }
    );

    console.log(
      `[StatsBomb] Processed ${processedCount} player stats, skipped ${skippedCount} (unlinked players)`
    );

    return {
      processed: processedCount,
      skipped: skippedCount,
    };
  },
});

/**
 * Batch ingest player stats for multiple matches
 */
export const batchIngestMatchStats = internalAction({
  args: {
    limit: v.optional(v.number()),
    competitionSeasonId: v.optional(v.id("statsbombCompetitionSeasons")),
  },
  handler: async (ctx, { limit = 50, competitionSeasonId }) => {
    // Get matches needing stats
    let pendingMatches = await ctx.runQuery(
      internal.ingest.statsbombIngest.getMatchesNeedingStats,
      { limit }
    );

    // Filter by competition season if provided
    if (competitionSeasonId) {
      pendingMatches = pendingMatches.filter(
        (m) => m.competitionSeasonId === competitionSeasonId
      );
    }

    console.log(`[StatsBomb] Processing ${pendingMatches.length} matches for stats ingestion`);

    let matchesProcessed = 0;
    let totalPlayerStats = 0;
    let totalSkipped = 0;
    let errors = 0;

    for (const match of pendingMatches) {
      try {
        console.log(
          `[StatsBomb] Processing: ${match.homeTeamName} vs ${match.awayTeamName} (${match.matchDate})`
        );

        // Fetch player stats from API
        const playerStats = await StatsBomb.fetchMatchPlayerStats(match.statsbombMatchId);

        let processed = 0;
        let skipped = 0;

        // Get competition info once
        const cs = await ctx.runQuery(
          internal.ingest.statsbombIngest.getCompetitionSeason,
          { id: match.competitionSeasonId }
        );

        for (const stat of playerStats) {
          // Check if player is linked
          const externalId = await ctx.runQuery(
            internal.ingest.statsbombIngest.getStatsBombExternalId,
            { statsbombPlayerId: stat.player_id }
          );

          if (!externalId) {
            // Store mapping for later resolution
            await ctx.runMutation(
              internal.ingest.statsbombIngest.upsertStatsBombPlayerMapping,
              {
                statsbombPlayerId: stat.player_id,
                playerName: stat.player_name,
              }
            );
            skipped++;
            continue;
          }

          // Extract stats
          const basicStats = {
            goals: stat.player_match_goals as number | undefined,
            assists: stat.player_match_assists as number | undefined,
            xG: stat.player_match_xg as number | undefined,
            xA: stat.player_match_xa as number | undefined,
            shots: stat.player_match_shots_total as number | undefined,
            shotsOnTarget: stat.player_match_shots_on_target as number | undefined,
            keyPasses: stat.player_match_key_passes as number | undefined,
            tackles: stat.player_match_tackles as number | undefined,
            interceptions: stat.player_match_interceptions as number | undefined,
          };

          const features = extractRatingFeatures(stat);

          const matchKey = `${match.matchDate}_${match.homeTeamName.toLowerCase().replace(/\s+/g, "_")}_${match.awayTeamName.toLowerCase().replace(/\s+/g, "_")}`;

          // Store player match stats
          await ctx.runMutation(
            internal.ingest.statsbombIngest.upsertPlayerMatchStats,
            {
              playerId: externalId.playerId,
              matchKey,
              matchDate: match.matchDate,
              competitionId: cs?.competitionId,
              minutes: stat.player_match_minutes,
              stats: basicStats,
              providerMatchId: String(match.statsbombMatchId),
              raw: stat,
              features,
            }
          );
          processed++;
        }

        // Mark match as processed
        await ctx.runMutation(
          internal.ingest.statsbombIngest.markMatchStatsIngested,
          {
            id: match._id,
            playerStatsIngested: true,
          }
        );

        matchesProcessed++;
        totalPlayerStats += processed;
        totalSkipped += skipped;

        console.log(
          `[StatsBomb] Match done: ${processed} stats, ${skipped} skipped`
        );
      } catch (error) {
        console.error(
          `[StatsBomb] Error processing match ${match.statsbombMatchId}: ${error}`
        );
        errors++;
      }
    }

    console.log(`[StatsBomb] Batch complete: ${matchesProcessed} matches, ${totalPlayerStats} player stats`);

    return {
      matchesProcessed,
      totalPlayerStats,
      totalSkipped,
      errors,
      remaining: pendingMatches.length - matchesProcessed,
    };
  },
});

/**
 * Public action to trigger batch match stats ingestion
 */
export const triggerMatchStatsIngestion = action({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { limit }) => {
    try {
      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.batchIngestMatchStats,
        { limit: limit ?? 50 }
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Run daily StatsBomb sync
 * Orchestrates the full sync process
 *
 * Note: This uses inline execution for sub-actions since they're in the same file.
 * For cross-file action calls, use ctx.runAction().
 */
export const runDailySync = internalAction({
  handler: async (ctx) => {
    console.log("[StatsBomb] Starting daily sync...");

    // 1. Sync competitions (in case new seasons are available)
    let compSynced = 0;
    if (StatsBomb.isConfigured()) {
      try {
        const competitions = await StatsBomb.fetchCompetitions();
        for (const comp of competitions) {
          if (
            !isLicensedCompetition(comp.competition_name, comp.country_name) ||
            !isTargetSeason(comp.season_name)
          ) {
            continue;
          }

          const canonicalComp = await ctx.runQuery(
            internal.ingest.statsbombIngest.findCanonicalCompetition,
            {
              name: comp.competition_name,
              country: comp.country_name,
              season: comp.season_name,
            }
          );

          await ctx.runMutation(
            internal.ingest.statsbombIngest.upsertCompetitionSeason,
            {
              statsbombCompetitionId: comp.competition_id,
              statsbombSeasonId: comp.season_id,
              name: comp.competition_name,
              country: comp.country_name,
              season: comp.season_name,
              matchUpdated: comp.match_updated,
              matchAvailable: comp.match_available,
              competitionId: canonicalComp?._id,
            }
          );
          compSynced++;
        }
      } catch (error) {
        console.error(`[StatsBomb] Error syncing competitions: ${error}`);
      }
    }
    console.log(`[StatsBomb] Competitions synced: ${compSynced}`);

    // 2. Sync matches for each active competition-season
    const competitionSeasons = await ctx.runQuery(
      internal.ingest.statsbombIngest.getActiveCompetitionSeasons
    );

    let totalMatches = 0;
    for (const cs of competitionSeasons) {
      try {
        const matches = await StatsBomb.fetchMatches(
          cs.statsbombCompetitionId,
          cs.statsbombSeasonId
        );

        for (const match of matches) {
          await ctx.runMutation(internal.ingest.statsbombIngest.upsertMatch, {
            competitionSeasonId: cs._id,
            statsbombMatchId: match.match_id,
            matchDate: match.match_date,
            kickOff: match.kick_off,
            homeTeamName: match.home_team.home_team_name,
            awayTeamName: match.away_team.away_team_name,
            homeTeamId: match.home_team.home_team_id,
            awayTeamId: match.away_team.away_team_id,
            homeScore: match.home_score ?? undefined,
            awayScore: match.away_score ?? undefined,
            status: match.match_status,
            lastUpdated: match.last_updated,
          });
        }

        totalMatches += matches.length;

        await ctx.runMutation(
          internal.ingest.statsbombIngest.updateCompetitionSeasonSyncStatus,
          {
            id: cs._id,
            syncStatus: "synced",
            matchCount: matches.length,
          }
        );
      } catch (error) {
        console.error(
          `[StatsBomb] Error syncing matches for ${cs.name}: ${error}`
        );
      }
    }

    // 3. Ingest stats for pending matches (up to budget limit)
    const pendingMatches = await ctx.runQuery(
      internal.ingest.statsbombIngest.getMatchesNeedingStats,
      { limit: INGESTION_BUDGET.maxMatchesPerRun }
    );

    let processedMatches = 0;
    let totalPlayerStats = 0;

    for (const match of pendingMatches) {
      try {
        const playerStats = await StatsBomb.fetchMatchPlayerStats(
          match.statsbombMatchId
        );

        let processed = 0;
        for (const stat of playerStats) {
          const externalId = await ctx.runQuery(
            internal.ingest.statsbombIngest.getStatsBombExternalId,
            { statsbombPlayerId: stat.player_id }
          );

          if (!externalId) {
            await ctx.runMutation(
              internal.ingest.statsbombIngest.upsertStatsBombPlayerMapping,
              {
                statsbombPlayerId: stat.player_id,
                playerName: stat.player_name,
              }
            );
            continue;
          }

          const cs = await ctx.runQuery(
            internal.ingest.statsbombIngest.getCompetitionSeason,
            { id: match.competitionSeasonId }
          );

          const basicStats = {
            goals: stat.player_match_goals as number | undefined,
            assists: stat.player_match_assists as number | undefined,
            xG: stat.player_match_xg as number | undefined,
            xA: stat.player_match_xa as number | undefined,
            shots: stat.player_match_shots_total as number | undefined,
            shotsOnTarget: stat.player_match_shots_on_target as
              | number
              | undefined,
            keyPasses: stat.player_match_key_passes as number | undefined,
            tackles: stat.player_match_tackles as number | undefined,
            interceptions: stat.player_match_interceptions as number | undefined,
          };

          const matchKey = `${match.matchDate}_${match.homeTeamName.toLowerCase().replace(/\s+/g, "_")}_${match.awayTeamName.toLowerCase().replace(/\s+/g, "_")}`;

          await ctx.runMutation(
            internal.ingest.statsbombIngest.upsertPlayerMatchStats,
            {
              playerId: externalId.playerId,
              matchKey,
              matchDate: match.matchDate,
              competitionId: cs?.competitionId,
              minutes: stat.player_match_minutes,
              stats: basicStats,
              providerMatchId: String(match.statsbombMatchId),
              raw: stat,
              features: extractRatingFeatures(stat),
            }
          );
          processed++;
        }

        await ctx.runMutation(
          internal.ingest.statsbombIngest.markMatchStatsIngested,
          {
            id: match._id,
            playerStatsIngested: true,
          }
        );

        processedMatches++;
        totalPlayerStats += processed;
      } catch (error) {
        console.error(
          `[StatsBomb] Error ingesting stats for match ${match.statsbombMatchId}: ${error}`
        );
      }
    }

    console.log(`[StatsBomb] Daily sync complete:`);
    console.log(`  - Competitions synced: ${compSynced}`);
    console.log(`  - Total matches: ${totalMatches}`);
    console.log(`  - Matches processed: ${processedMatches}`);
    console.log(`  - Player stats: ${totalPlayerStats}`);

    return {
      competitionsSynced: compSynced,
      totalMatches,
      matchesProcessed: processedMatches,
      playerStatsProcessed: totalPlayerStats,
    };
  },
});

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Extract rating-relevant features from raw StatsBomb match stats
 */
function extractRatingFeatures(
  raw: StatsBomb.StatsBombPlayerMatchStats
): Record<string, number | undefined> {
  return {
    // Minutes
    minutes: raw.player_match_minutes,

    // Shooting
    xG: raw.player_match_xg as number | undefined,
    npxG: raw.player_match_npxg as number | undefined,
    shots: raw.player_match_shots_total as number | undefined,
    shotsOnTarget: raw.player_match_shots_on_target as number | undefined,

    // Passing
    xA: raw.player_match_xa as number | undefined,
    passesCompleted: raw.player_match_passes_completed as number | undefined,
    passesAttempted: raw.player_match_passes_attempted as number | undefined,
    progressivePasses: raw.player_match_progressive_passes_completed as
      | number
      | undefined,
    passesIntoFinalThird: raw.player_match_passes_into_final_third as
      | number
      | undefined,
    keyPasses: raw.player_match_key_passes as number | undefined,

    // Carrying
    carries: raw.player_match_carries as number | undefined,
    progressiveCarries: raw.player_match_progressive_carries as
      | number
      | undefined,
    takeOnsAttempted: raw.player_match_take_ons_attempted as number | undefined,
    takeOnsSuccessful: raw.player_match_take_ons_won as number | undefined,

    // Creating
    shotCreatingActions: raw.player_match_shot_creating_actions as
      | number
      | undefined,
    goalCreatingActions: raw.player_match_goal_creating_actions as
      | number
      | undefined,

    // Defensive
    tackles: raw.player_match_tackles as number | undefined,
    tacklesWon: raw.player_match_tackles_won as number | undefined,
    interceptions: raw.player_match_interceptions as number | undefined,
    blocks: raw.player_match_blocks as number | undefined,
    clearances: raw.player_match_clearances as number | undefined,
    aerialDuelsWon: raw.player_match_aerials_won as number | undefined,
    aerialDuelsLost: raw.player_match_aerials_lost as number | undefined,

    // Pressure
    pressures: raw.player_match_pressures as number | undefined,
    pressuresSuccessful: raw.player_match_pressure_regains as
      | number
      | undefined,

    // GK
    saves: raw.player_match_saves as number | undefined,
    psxG: raw.player_match_psxg as number | undefined,

    // OBV (On-Ball Value)
    obv: raw.player_match_obv as number | undefined,
    obvPass: raw.player_match_obv_pass as number | undefined,
    obvShot: raw.player_match_obv_shot as number | undefined,
    obvDefensiveAction: raw.player_match_obv_defensive_action as number | undefined,
    obvDribbleCarry: raw.player_match_obv_dribble_carry as number | undefined,
    obvGk: raw.player_match_obv_gk as number | undefined,
  };
}

// ============================================================================
// Player Linking Functions
// ============================================================================

/**
 * Get unlinked StatsBomb player mappings
 */
export const getUnlinkedPlayerMappings = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 100 }) => {
    return await ctx.db
      .query("statsbombPlayerMappings")
      .filter((q) => q.eq(q.field("playerId"), undefined))
      .take(limit);
  },
});

/**
 * Try to resolve a StatsBomb player to a canonical player
 * Returns the best match with confidence score
 */
export const tryResolvePlayer = internalQuery({
  args: {
    statsbombPlayerId: v.number(),
    playerName: v.string(),
  },
  handler: async (ctx, { statsbombPlayerId, playerName }) => {
    const normalizedInputName = normalizeName(playerName);

    // Strategy 1: Check existing external ID
    const existingExternal = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_provider_playerId", (q) =>
        q.eq("provider", "statsbomb").eq("providerPlayerId", String(statsbombPlayerId))
      )
      .first();

    if (existingExternal) {
      return {
        playerId: existingExternal.playerId,
        confidence: 1.0,
        reason: "existing_external_id",
      };
    }

    // Strategy 2: Check StatsBomb mapping table
    const existingMapping = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();

    if (existingMapping?.playerId) {
      return {
        playerId: existingMapping.playerId,
        confidence: 0.95,
        reason: "existing_mapping",
      };
    }

    // Strategy 3: Find by normalized name
    const byName = await ctx.db
      .query("players")
      .withIndex("by_nameNormalized", (q) =>
        q.eq("nameNormalized", normalizedInputName)
      )
      .collect();

    if (byName.length === 1) {
      return {
        playerId: byName[0]._id,
        confidence: 0.95,
        reason: "exact_name_match",
      };
    }

    if (byName.length > 1) {
      // Multiple matches - return the first one (most recently created)
      const sorted = byName.sort((a, b) => b._creationTime - a._creationTime);
      return {
        playerId: sorted[0]._id,
        confidence: 0.7,
        reason: `multiple_name_matches_${byName.length}`,
        candidateIds: byName.map(p => p._id),
      };
    }

    // Strategy 4: No match found - return null
    return {
      playerId: null,
      confidence: 0,
      reason: "no_match_found",
    };
  },
});

/**
 * Link a StatsBomb player and create external ID
 */
export const linkPlayerAndCreateExternal = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    playerId: v.id("players"),
    playerName: v.string(),
    confidence: v.number(),
  },
  handler: async (ctx, { statsbombPlayerId, playerId, playerName, confidence }) => {
    const now = Date.now();
    const providerPlayerId = String(statsbombPlayerId);

    // Create or update external ID
    const existingExternal = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_player_provider", (q) =>
        q.eq("playerId", playerId).eq("provider", "statsbomb")
      )
      .first();

    if (existingExternal) {
      await ctx.db.patch(existingExternal._id, {
        providerPlayerId,
        confidence,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("playerExternalIds", {
        playerId,
        provider: "statsbomb",
        providerPlayerId,
        confidence,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Update StatsBomb mapping
    const existingMapping = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();

    if (existingMapping) {
      await ctx.db.patch(existingMapping._id, {
        playerId,
        playerName,
        cachedAt: now,
      });
    }

    return { success: true };
  },
});

/**
 * Add a StatsBomb player to the unresolved queue
 */
export const addToUnresolvedQueue = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    playerName: v.string(),
    reason: v.string(),
    candidateIds: v.optional(v.array(v.id("players"))),
  },
  handler: async (ctx, { statsbombPlayerId, playerName, reason, candidateIds }) => {
    const now = Date.now();
    const providerPlayerId = String(statsbombPlayerId);

    // Check if already in queue
    const existing = await ctx.db
      .query("unresolvedExternalPlayers")
      .withIndex("by_provider_playerId", (q) =>
        q.eq("provider", "statsbomb").eq("providerPlayerId", providerPlayerId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        payload: { statsbombPlayerId, playerName },
        candidatePlayerIds: candidateIds,
        reason,
        status: "pending",
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("unresolvedExternalPlayers", {
      provider: "statsbomb",
      providerPlayerId,
      payload: { statsbombPlayerId, playerName },
      candidatePlayerIds: candidateIds,
      reason,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Get all StatsBomb player mappings
 */
export const getAllPlayerMappings = internalQuery({
  handler: async (ctx) => {
    return await ctx.db.query("statsbombPlayerMappings").collect();
  },
});

/**
 * Link a StatsBomb player to a canonical player
 */
export const linkPlayerMapping = internalMutation({
  args: {
    mappingId: v.id("statsbombPlayerMappings"),
    playerId: v.id("players"),
    confidence: v.number(),
  },
  handler: async (ctx, { mappingId, playerId, confidence }) => {
    const mapping = await ctx.db.get(mappingId);
    if (!mapping) throw new Error(`Mapping not found: ${mappingId}`);

    await linkStatsBombPlayer(
      ctx.db,
      mapping.statsbombPlayerId,
      playerId,
      mapping.playerName,
      confidence
    );

    return { success: true };
  },
});

/**
 * Internal action to resolve and link all unlinked StatsBomb players
 */
export const resolveAndLinkPlayers = internalAction({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 100 }) => {
    const unlinkedMappings = await ctx.runQuery(
      internal.ingest.statsbombIngest.getUnlinkedPlayerMappings,
      { limit }
    );

    console.log(`[StatsBomb] Found ${unlinkedMappings.length} unlinked player mappings`);

    let linked = 0;
    let addedToQueue = 0;
    let errors = 0;

    for (const mapping of unlinkedMappings) {
      try {
        // Try to resolve the player using the query
        const result = await ctx.runQuery(
          internal.ingest.statsbombIngest.tryResolvePlayer,
          {
            statsbombPlayerId: mapping.statsbombPlayerId,
            playerName: mapping.playerName,
          }
        );

        if (result.playerId && result.confidence >= 0.9) {
          // High confidence match - link automatically
          await ctx.runMutation(
            internal.ingest.statsbombIngest.linkPlayerAndCreateExternal,
            {
              statsbombPlayerId: mapping.statsbombPlayerId,
              playerId: result.playerId,
              playerName: mapping.playerName,
              confidence: result.confidence,
            }
          );
          console.log(
            `[StatsBomb] Linked: ${mapping.playerName} -> ${result.playerId} (${Math.round(result.confidence * 100)}%)`
          );
          linked++;
        } else {
          // Low confidence or no match - add to review queue
          await ctx.runMutation(
            internal.ingest.statsbombIngest.addToUnresolvedQueue,
            {
              statsbombPlayerId: mapping.statsbombPlayerId,
              playerName: mapping.playerName,
              reason: result.reason,
              candidateIds: result.candidateIds,
            }
          );
          console.log(
            `[StatsBomb] Added to queue: ${mapping.playerName} (${result.reason})`
          );
          addedToQueue++;
        }
      } catch (error) {
        console.error(
          `[StatsBomb] Error resolving ${mapping.playerName}: ${error}`
        );
        errors++;
      }
    }

    return {
      total: unlinkedMappings.length,
      linked,
      addedToQueue,
      errors,
    };
  },
});

/**
 * Update all players to have normalized names
 */
export const ensureNormalizedNames = internalMutation({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 500 }) => {
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

    return { updated, remaining: players.length === limit };
  },
});

/**
 * Create a canonical player from StatsBomb data
 * Requires competitionId, teamId, position, and positionGroup
 */
export const createPlayerFromStatsBomb = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    playerName: v.string(),
    competitionId: v.id("competitions"),
    teamId: v.id("teams"),
    position: v.string(),
    positionGroup: v.union(v.literal("GK"), v.literal("DEF"), v.literal("MID"), v.literal("ATT")),
  },
  handler: async (ctx, { statsbombPlayerId, playerName, competitionId, teamId, position, positionGroup }) => {
    const now = Date.now();
    const normalized = normalizeName(playerName);

    // Create the canonical player
    const playerId = await ctx.db.insert("players", {
      name: playerName,
      nameNormalized: normalized,
      provider: "statsbomb",
      providerPlayerId: String(statsbombPlayerId),
      competitionId,
      teamId,
      position,
      positionGroup,
      createdAt: now,
      updatedAt: now,
    });

    // Create external ID mapping
    await ctx.db.insert("playerExternalIds", {
      playerId,
      provider: "statsbomb",
      providerPlayerId: String(statsbombPlayerId),
      confidence: 1.0,
      createdAt: now,
      updatedAt: now,
    });

    // Update StatsBomb mapping
    const existingMapping = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();

    if (existingMapping) {
      await ctx.db.patch(existingMapping._id, {
        playerId,
        cachedAt: now,
      });
    }

    return playerId;
  },
});

/**
 * Find or create a team by StatsBomb team ID
 */
export const findOrCreateTeam = internalMutation({
  args: {
    statsbombTeamId: v.number(),
    teamName: v.string(),
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, { statsbombTeamId, teamName, competitionId }) => {
    // First try to find by provider team ID
    const existingByProvider = await ctx.db
      .query("teams")
      .withIndex("by_provider_team", (q) =>
        q.eq("provider", "statsbomb").eq("providerTeamId", String(statsbombTeamId))
      )
      .first();

    if (existingByProvider) {
      return existingByProvider._id;
    }

    // Try to find by name in the competition
    const normalizedName = teamName.toLowerCase().trim();
    const teamsInCompetition = await ctx.db
      .query("teams")
      .withIndex("by_competition", (q) => q.eq("competitionId", competitionId))
      .collect();

    for (const team of teamsInCompetition) {
      if (team.name.toLowerCase().trim() === normalizedName) {
        // Found by name - add the StatsBomb ID
        await ctx.db.patch(team._id, {
          providerTeamId: String(statsbombTeamId),
          provider: "statsbomb",
        });
        return team._id;
      }
    }

    // Create new team
    const now = Date.now();
    const teamId = await ctx.db.insert("teams", {
      name: teamName,
      competitionId,
      provider: "statsbomb",
      providerTeamId: String(statsbombTeamId),
      createdAt: now,
    });

    return teamId;
  },
});

/**
 * Create a player from StatsBomb match stats context
 */
export const createPlayerFromMatchStats = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    playerName: v.string(),
    teamId: v.id("teams"),
    competitionId: v.id("competitions"),
    position: v.optional(v.string()),
  },
  handler: async (ctx, { statsbombPlayerId, playerName, teamId, competitionId, position }) => {
    const now = Date.now();
    const normalized = normalizeName(playerName);

    // Map position to positionGroup
    const positionGroup = mapPositionToGroup(position);

    // Create the canonical player
    const playerId = await ctx.db.insert("players", {
      name: playerName,
      nameNormalized: normalized,
      provider: "statsbomb",
      providerPlayerId: String(statsbombPlayerId),
      competitionId,
      teamId,
      position: position || "Unknown",
      positionGroup,
      createdAt: now,
      updatedAt: now,
    });

    // Create external ID mapping
    await ctx.db.insert("playerExternalIds", {
      playerId,
      provider: "statsbomb",
      providerPlayerId: String(statsbombPlayerId),
      confidence: 1.0,
      createdAt: now,
      updatedAt: now,
    });

    // Update StatsBomb mapping
    const existingMapping = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();

    if (existingMapping) {
      await ctx.db.patch(existingMapping._id, {
        playerId,
        cachedAt: now,
      });
    }

    return playerId;
  },
});

/**
 * Map StatsBomb position string to position group
 */
function mapPositionToGroup(position?: string): "GK" | "DEF" | "MID" | "ATT" {
  if (!position) return "MID"; // Default to MID if unknown

  const pos = position.toLowerCase();
  if (pos.includes("goalkeeper") || pos.includes("gk")) return "GK";
  if (pos.includes("back") || pos.includes("defender") || pos.includes("center back") || pos.includes("wing back")) return "DEF";
  if (pos.includes("forward") || pos.includes("striker") || pos.includes("wing") && !pos.includes("back")) return "ATT";
  return "MID"; // Midfielders and anything else
}

/**
 * Ingest all players from a specific competition using season stats
 * Now checks for existing players to prevent duplicates!
 */
export const ingestPlayersFromSeason = internalAction({
  args: {
    competitionSeasonId: v.id("statsbombCompetitionSeasons"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { competitionSeasonId, limit = 1000 }) => {
    const cs = await ctx.runQuery(
      internal.ingest.statsbombIngest.getCompetitionSeason,
      { id: competitionSeasonId }
    );

    if (!cs) {
      throw new Error(`Competition season not found: ${competitionSeasonId}`);
    }

    if (!cs.competitionId) {
      console.log(`[StatsBomb] Competition season ${cs.name} not linked to canonical competition`);
      return { created: 0, linked: 0, skipped: 0, resolved: 0, error: "No canonical competition" };
    }

    console.log(`[StatsBomb] Fetching season player stats for ${cs.name} ${cs.season}`);
    const seasonStats = await StatsBomb.fetchSeasonPlayerStats(
      cs.statsbombCompetitionId,
      cs.statsbombSeasonId
    );

    console.log(`[StatsBomb] Found ${seasonStats.length} players`);

    let created = 0;
    let linked = 0;
    let skipped = 0;
    let resolved = 0; // Players that were matched to existing records

    for (const stat of seasonStats.slice(0, limit)) {
      try {
        // Check if StatsBomb player ID already has external mapping
        const existingMapping = await ctx.runQuery(
          internal.ingest.statsbombIngest.getStatsBombExternalId,
          { statsbombPlayerId: stat.player_id }
        );

        if (existingMapping) {
          linked++;
          continue;
        }

        // TRY TO RESOLVE TO EXISTING PLAYER FIRST (prevents duplicates!)
        const resolveResult = await ctx.runQuery(
          internal.ingest.statsbombIngest.tryResolveToExistingPlayer,
          {
            playerName: stat.player_name,
            competitionId: cs.competitionId,
          }
        );

        if (resolveResult.playerId && resolveResult.confidence >= 0.9) {
          // Found existing player - create external ID link instead of new player
          await ctx.runMutation(
            internal.ingest.statsbombIngest.linkStatsBombToExistingPlayer,
            {
              statsbombPlayerId: stat.player_id,
              existingPlayerId: resolveResult.playerId,
              playerName: stat.player_name,
              confidence: resolveResult.confidence,
            }
          );
          console.log(`[StatsBomb] Resolved: ${stat.player_name} -> existing player (${Math.round(resolveResult.confidence * 100)}%)`);
          resolved++;
          continue;
        }

        // No existing player found - create new one
        // Find or create the team
        const teamId = await ctx.runMutation(
          internal.ingest.statsbombIngest.findOrCreateTeam,
          {
            statsbombTeamId: stat.team_id,
            teamName: stat.team_name,
            competitionId: cs.competitionId,
          }
        );

        // Create the player
        await ctx.runMutation(
          internal.ingest.statsbombIngest.createPlayerFromMatchStats,
          {
            statsbombPlayerId: stat.player_id,
            playerName: stat.player_name,
            teamId,
            competitionId: cs.competitionId,
          }
        );

        console.log(`[StatsBomb] Created: ${stat.player_name} (${stat.team_name})`);
        created++;
      } catch (error) {
        console.error(`[StatsBomb] Error processing ${stat.player_name}: ${error}`);
        skipped++;
      }
    }

    return { created, linked, skipped, resolved, total: seasonStats.length };
  },
});

/**
 * Try to resolve a player name to an existing canonical player
 */
export const tryResolveToExistingPlayer = internalQuery({
  args: {
    playerName: v.string(),
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, { playerName, competitionId }) => {
    const normalizedName = normalizeName(playerName);

    // Strategy 1: Exact normalized name match
    const exactMatches = await ctx.db
      .query("players")
      .withIndex("by_nameNormalized", (q) => q.eq("nameNormalized", normalizedName))
      .collect();

    // Prefer matches from any provider EXCEPT statsbomb (to find API-Football originals)
    const nonStatsbombMatches = exactMatches.filter((p) => p.provider !== "statsbomb");

    if (nonStatsbombMatches.length === 1) {
      return {
        playerId: nonStatsbombMatches[0]._id,
        confidence: 0.95,
        reason: "exact_name_match_non_statsbomb",
      };
    }

    // Strategy 2: Match within competition
    if (nonStatsbombMatches.length === 0 && exactMatches.length > 0) {
      // Check if any match is in the same competition
      const sameCompetition = exactMatches.filter((p) =>
        p.competitionId === competitionId && p.provider !== "statsbomb"
      );
      if (sameCompetition.length === 1) {
        return {
          playerId: sameCompetition[0]._id,
          confidence: 0.92,
          reason: "exact_name_match_same_competition",
        };
      }
    }

    // Strategy 3: Search within competition players for fuzzy match
    const competitionPlayers = await ctx.db
      .query("players")
      .withIndex("by_competition", (q) => q.eq("competitionId", competitionId))
      .filter((q) => q.neq(q.field("provider"), "statsbomb"))
      .collect();

    for (const player of competitionPlayers) {
      const playerNormalized = player.nameNormalized || normalizeName(player.name);
      if (playerNormalized === normalizedName) {
        return {
          playerId: player._id,
          confidence: 0.93,
          reason: "exact_name_in_competition",
        };
      }
    }

    // No match found
    return {
      playerId: null,
      confidence: 0,
      reason: "no_match_found",
    };
  },
});

/**
 * Link a StatsBomb player ID to an existing canonical player
 */
export const linkStatsBombToExistingPlayer = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    existingPlayerId: v.id("players"),
    playerName: v.string(),
    confidence: v.number(),
  },
  handler: async (ctx, { statsbombPlayerId, existingPlayerId, playerName, confidence }) => {
    const now = Date.now();
    const providerPlayerId = String(statsbombPlayerId);

    // Create external ID mapping
    const existingExternal = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_player_provider", (q) =>
        q.eq("playerId", existingPlayerId).eq("provider", "statsbomb")
      )
      .first();

    if (!existingExternal) {
      await ctx.db.insert("playerExternalIds", {
        playerId: existingPlayerId,
        provider: "statsbomb",
        providerPlayerId,
        confidence,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Update StatsBomb mapping
    const existingMapping = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();

    if (existingMapping) {
      await ctx.db.patch(existingMapping._id, {
        playerId: existingPlayerId,
        playerName,
        cachedAt: now,
      });
    } else {
      await ctx.db.insert("statsbombPlayerMappings", {
        statsbombPlayerId,
        playerName,
        playerId: existingPlayerId,
        cachedAt: now,
      });
    }

    return { linked: true, playerId: existingPlayerId };
  },
});

/**
 * Public action to ingest all players from a StatsBomb competition season
 * This creates canonical players with proper team/competition context
 */
export const triggerIngestPlayersFromSeason = action({
  args: {
    competitionSeasonId: v.optional(v.id("statsbombCompetitionSeasons")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { competitionSeasonId, limit }) => {
    try {
      // First ensure all existing players have normalized names
      await ctx.runMutation(
        internal.ingest.statsbombIngest.ensureNormalizedNames,
        { limit: 1000 }
      );

      // If no competition season provided, get the first active one
      let csId = competitionSeasonId;
      if (!csId) {
        const seasons = await ctx.runQuery(
          internal.ingest.statsbombIngest.getActiveCompetitionSeasons
        );
        if (seasons.length === 0) {
          return { success: false, error: "No active competition seasons found" };
        }
        csId = seasons[0]._id;
        console.log(`[StatsBomb] Using competition season: ${seasons[0].name} ${seasons[0].season}`);
      }

      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.ingestPlayersFromSeason,
        { competitionSeasonId: csId, limit: limit ?? 1000 }
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Public action to ingest players from ALL active competition seasons
 */
export const triggerIngestAllPlayers = action({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    try {
      // First ensure all existing players have normalized names
      await ctx.runMutation(
        internal.ingest.statsbombIngest.ensureNormalizedNames,
        { limit: 1000 }
      );

      // Get all active competition seasons
      const seasons = await ctx.runQuery(
        internal.ingest.statsbombIngest.getActiveCompetitionSeasons
      );

      if (seasons.length === 0) {
        return { success: false, error: "No active competition seasons found" };
      }

      console.log(`[StatsBomb] Found ${seasons.length} competition seasons to process`);

      const results: Array<{ name: string; created: number; linked: number; skipped: number }> = [];

      for (const cs of seasons) {
        if (!cs.competitionId) {
          console.log(`[StatsBomb] Skipping ${cs.name} - no canonical competition linked`);
          continue;
        }

        console.log(`[StatsBomb] Processing: ${cs.name} ${cs.season}`);

        const result = await ctx.runAction(
          internal.ingest.statsbombIngest.ingestPlayersFromSeason,
          { competitionSeasonId: cs._id, limit: limit ?? 1000 }
        );

        results.push({
          name: `${cs.name} ${cs.season}`,
          created: result.created,
          linked: result.linked,
          skipped: result.skipped,
        });
      }

      const totals = results.reduce(
        (acc, r) => ({
          created: acc.created + r.created,
          linked: acc.linked + r.linked,
          skipped: acc.skipped + r.skipped,
        }),
        { created: 0, linked: 0, skipped: 0 }
      );

      return { success: true, results, totals };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Public action to trigger player linking
 */
export const triggerPlayerLinking = action({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    try {
      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.resolveAndLinkPlayers,
        { limit: limit ?? 500 }
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

// Export for public API testing
export const testStatsBombConnection = action({
  handler: async () => {
    if (!StatsBomb.isConfigured()) {
      return { success: false, error: "Credentials not configured" };
    }

    try {
      const competitions = await StatsBomb.fetchCompetitions();
      return {
        success: true,
        competitionsCount: competitions.length,
        sample: competitions.slice(0, 3).map((c) => ({
          name: c.competition_name,
          country: c.country_name,
          season: c.season_name,
        })),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Public action to trigger a full StatsBomb sync
 * Use this to manually run a sync from the CLI for testing
 */
export const triggerFullSync = action({
  handler: async (ctx) => {
    if (!StatsBomb.isConfigured()) {
      return { success: false, error: "Credentials not configured" };
    }

    try {
      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.runDailySync,
        {}
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Get stats about StatsBomb data ingestion
 */
export const getStatsBombStats = action({
  handler: async (ctx) => {
    const stats = await ctx.runQuery(
      internal.ingest.statsbombIngest.getIngestionStats
    );
    return stats;
  },
});

/**
 * Internal query to get ingestion statistics
 */
export const getIngestionStats = internalQuery({
  handler: async (ctx) => {
    // Count ALL players
    const allPlayers = await ctx.db.query("players").collect();

    // Count players by provider
    const statsbombPlayers = allPlayers.filter((p) => p.provider === "statsbomb");
    const apiFootballPlayers = allPlayers.filter((p) => p.provider === "apiFootball");

    // Count external IDs for statsbomb
    const statsbombExternalIds = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_provider_playerId")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .collect();

    // Count player mappings
    const playerMappings = await ctx.db
      .query("statsbombPlayerMappings")
      .collect();

    const linkedMappings = playerMappings.filter((m) => m.playerId);
    const unlinkedMappings = playerMappings.filter((m) => !m.playerId);

    // Count competition seasons
    const competitionSeasons = await ctx.db
      .query("statsbombCompetitionSeasons")
      .collect();

    const linkedCompetitions = competitionSeasons.filter((c) => c.competitionId);

    // Count matches
    const matches = await ctx.db.query("statsbombMatches").collect();
    const availableMatches = matches.filter((m) => m.status === "available");

    return {
      allPlayers: allPlayers.length,
      playersByProvider: {
        statsbomb: statsbombPlayers.length,
        apiFootball: apiFootballPlayers.length,
        other: allPlayers.length - statsbombPlayers.length - apiFootballPlayers.length,
      },
      statsbombPlayers: {
        total: statsbombPlayers.length,
        byCompetition: Object.entries(
          statsbombPlayers.reduce((acc, p) => {
            acc[p.competitionId] = (acc[p.competitionId] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        ).slice(0, 10),
      },
      externalIds: statsbombExternalIds.length,
      playerMappings: {
        total: playerMappings.length,
        linked: linkedMappings.length,
        unlinked: unlinkedMappings.length,
      },
      competitionSeasons: {
        total: competitionSeasons.length,
        linked: linkedCompetitions.length,
      },
      matches: {
        total: matches.length,
        available: availableMatches.length,
      },
    };
  },
});

/**
 * Find potential duplicate players between providers
 */
export const findPotentialDuplicates = internalQuery({
  handler: async (ctx) => {
    const allPlayers = await ctx.db.query("players").collect();

    // Group players by normalized name
    const playersByName: Record<string, typeof allPlayers> = {};
    for (const player of allPlayers) {
      const key = player.nameNormalized || normalizeName(player.name);
      if (!playersByName[key]) {
        playersByName[key] = [];
      }
      playersByName[key].push(player);
    }

    // Find names with multiple players from different providers
    const duplicates: Array<{
      name: string;
      players: Array<{
        id: string;
        name: string;
        provider: string;
        team: string;
        competitionId: string;
      }>;
    }> = [];

    for (const [normalizedName, players] of Object.entries(playersByName)) {
      if (players.length > 1) {
        const providers = new Set(players.map((p) => p.provider));
        // Only report if there are multiple providers (true duplicates)
        if (providers.size > 1) {
          duplicates.push({
            name: normalizedName,
            players: players.map((p) => ({
              id: p._id,
              name: p.name,
              provider: p.provider,
              team: p.teamId,
              competitionId: p.competitionId,
            })),
          });
        }
      }
    }

    return {
      totalDuplicateGroups: duplicates.length,
      totalDuplicatePlayers: duplicates.reduce((acc, d) => acc + d.players.length, 0),
      samples: duplicates.slice(0, 20),
    };
  },
});

/**
 * Public action to find duplicates
 */
export const getDuplicatePlayers = action({
  handler: async (ctx) => {
    return await ctx.runQuery(
      internal.ingest.statsbombIngest.findPotentialDuplicates
    );
  },
});

/**
 * Get sample players from each provider for comparison
 */
export const getSamplePlayers = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 10 }) => {
    const allPlayers = await ctx.db.query("players").collect();

    const statsbombPlayers = allPlayers
      .filter((p) => p.provider === "statsbomb")
      .slice(0, limit);
    const apiFootballPlayers = allPlayers
      .filter((p) => p.provider === "apiFootball")
      .slice(0, limit);

    return {
      statsbomb: statsbombPlayers.map((p) => ({
        id: p._id,
        name: p.name,
        nameNormalized: p.nameNormalized,
        position: p.position,
        positionGroup: p.positionGroup,
        teamId: p.teamId,
        competitionId: p.competitionId,
        providerPlayerId: p.providerPlayerId,
      })),
      apiFootball: apiFootballPlayers.map((p) => ({
        id: p._id,
        name: p.name,
        nameNormalized: p.nameNormalized,
        position: p.position,
        positionGroup: p.positionGroup,
        teamId: p.teamId,
        competitionId: p.competitionId,
        providerPlayerId: p.providerPlayerId,
      })),
    };
  },
});

/**
 * Check what StatsBomb match stats we have
 */
export const getStatsBombMatchStats = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 10 }) => {
    const matchStats = await ctx.db
      .query("providerPlayerMatchStats")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .take(limit);

    return {
      count: matchStats.length,
      samples: matchStats.map((s) => ({
        playerId: s.playerId,
        matchKey: s.matchKey,
        matchDate: s.matchDate,
        minutes: s.minutes,
        stats: s.stats,
        hasRaw: !!s.raw,
        hasFeatures: !!s.features,
      })),
    };
  },
});

/**
 * Get sample stats with detailed data (small query)
 */
export const getSampleDetailedStats = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 20 }) => {
    // Get sample stats with xG > 0
    const sampleStats = await ctx.db
      .query("providerPlayerMatchStats")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .take(limit);

    return sampleStats.map((s) => ({
      playerId: s.playerId,
      matchDate: s.matchDate,
      matchKey: s.matchKey,
      minutes: s.minutes,
      stats: s.stats,
      features: s.features ? Object.keys(s.features as Record<string, unknown>).slice(0, 10) : [],
    }));
  },
});

/**
 * Count total StatsBomb match stats records
 */
export const countMatchStatsRecords = internalAction({
  handler: async (ctx) => {
    // Count in batches to avoid memory issues
    let total = 0;
    let cursor: string | null = null;
    const batchSize = 1000;

    // We'll estimate by sampling
    const sample = await ctx.runQuery(
      internal.ingest.statsbombIngest.getStatsBombMatchStats,
      { limit: 100 }
    );

    // Get total from matches ingested
    const matchStatus = await ctx.runQuery(
      internal.ingest.statsbombIngest.countMatchesByStatus
    );

    // Estimate: ~31 players per match average
    const estimatedTotal = matchStatus.ingested * 31;

    return {
      matchesIngested: matchStatus.ingested,
      sampleRecords: sample.count,
      estimatedTotalRecords: estimatedTotal,
      sampleWithXG: sample.samples.filter((s) => s.stats?.xG && s.stats.xG > 0).length,
    };
  },
});

/**
 * Public action to get stats summary
 */
export const getStatsSummary = action({
  handler: async (ctx) => {
    const counts = await ctx.runAction(
      internal.ingest.statsbombIngest.countMatchStatsRecords
    );
    const samples = await ctx.runQuery(
      internal.ingest.statsbombIngest.getSampleDetailedStats,
      { limit: 10 }
    );
    return { counts, samples };
  },
});

// ============================================================================
// Deduplication Functions
// ============================================================================

/**
 * Merge a duplicate StatsBomb player into an API-Football player
 * - Creates external ID linking StatsBomb ID to API-Football player
 * - Updates StatsBomb mapping to point to API-Football player
 * - Deletes the duplicate StatsBomb player record
 */
export const mergeDuplicatePlayer = internalMutation({
  args: {
    statsbombPlayerId: v.id("players"),
    apiFootballPlayerId: v.id("players"),
  },
  handler: async (ctx, { statsbombPlayerId, apiFootballPlayerId }) => {
    const statsbombPlayer = await ctx.db.get(statsbombPlayerId);
    const apiFootballPlayer = await ctx.db.get(apiFootballPlayerId);

    if (!statsbombPlayer || !apiFootballPlayer) {
      throw new Error("One or both players not found");
    }

    if (statsbombPlayer.provider !== "statsbomb") {
      throw new Error("First player must be StatsBomb provider");
    }

    const now = Date.now();

    // 1. Create external ID linking StatsBomb ID to API-Football player
    const existingExternal = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_player_provider", (q) =>
        q.eq("playerId", apiFootballPlayerId).eq("provider", "statsbomb")
      )
      .first();

    if (!existingExternal) {
      await ctx.db.insert("playerExternalIds", {
        playerId: apiFootballPlayerId,
        provider: "statsbomb",
        providerPlayerId: statsbombPlayer.providerPlayerId,
        confidence: 0.95,
        createdAt: now,
        updatedAt: now,
      });
    }

    // 2. Update StatsBomb mapping to point to API-Football player
    const sbMapping = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", parseInt(statsbombPlayer.providerPlayerId))
      )
      .first();

    if (sbMapping) {
      await ctx.db.patch(sbMapping._id, {
        playerId: apiFootballPlayerId,
        cachedAt: now,
      });
    }

    // 3. Delete the old external ID for the StatsBomb player (if any)
    const oldExternal = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_player_provider", (q) =>
        q.eq("playerId", statsbombPlayerId).eq("provider", "statsbomb")
      )
      .first();

    if (oldExternal) {
      await ctx.db.delete(oldExternal._id);
    }

    // 4. Delete the duplicate StatsBomb player record
    await ctx.db.delete(statsbombPlayerId);

    return {
      merged: true,
      canonicalPlayerId: apiFootballPlayerId,
      deletedPlayerId: statsbombPlayerId,
    };
  },
});

/**
 * Find and merge all duplicate players automatically
 */
export const mergeAllDuplicates = internalAction({
  args: { limit: v.optional(v.number()), dryRun: v.optional(v.boolean()) },
  handler: async (ctx, { limit = 100, dryRun = false }) => {
    // Find duplicates
    const duplicates = await ctx.runQuery(
      internal.ingest.statsbombIngest.findPotentialDuplicates
    );

    console.log(`[Dedup] Found ${duplicates.totalDuplicateGroups} duplicate groups`);

    let merged = 0;
    let skipped = 0;
    let errors = 0;

    for (const group of duplicates.samples.slice(0, limit)) {
      // Find API-Football and StatsBomb players in this group
      const apiFootballPlayer = group.players.find((p) => p.provider === "apiFootball");
      const statsbombPlayer = group.players.find((p) => p.provider === "statsbomb");

      if (!apiFootballPlayer || !statsbombPlayer) {
        console.log(`[Dedup] Skipping ${group.name} - not a StatsBomb/API-Football duplicate`);
        skipped++;
        continue;
      }

      if (dryRun) {
        console.log(`[Dedup] Would merge: ${group.name} (${statsbombPlayer.id} -> ${apiFootballPlayer.id})`);
        merged++;
        continue;
      }

      try {
        await ctx.runMutation(
          internal.ingest.statsbombIngest.mergeDuplicatePlayer,
          {
            statsbombPlayerId: statsbombPlayer.id as Id<"players">,
            apiFootballPlayerId: apiFootballPlayer.id as Id<"players">,
          }
        );
        console.log(`[Dedup] Merged: ${group.name}`);
        merged++;
      } catch (error) {
        console.error(`[Dedup] Error merging ${group.name}: ${error}`);
        errors++;
      }
    }

    return {
      totalDuplicates: duplicates.totalDuplicateGroups,
      processed: merged + skipped + errors,
      merged,
      skipped,
      errors,
      dryRun,
    };
  },
});

/**
 * Public action to trigger deduplication
 */
export const triggerDeduplication = action({
  args: { limit: v.optional(v.number()), dryRun: v.optional(v.boolean()) },
  handler: async (ctx, { limit, dryRun }) => {
    try {
      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.mergeAllDuplicates,
        { limit: limit ?? 500, dryRun: dryRun ?? false }
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

// ============================================================================
// Player Mapping Ingestion (from /api/v1/player-mapping endpoint)
// ============================================================================

/**
 * Upsert a player mapping with full bio data from player-mapping endpoint
 */
export const upsertFullPlayerMapping = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    livePlayerId: v.optional(v.number()),
    sbPlayerId: v.optional(v.number()),
    playerName: v.string(),
    playerNickname: v.optional(v.string()),
    birthDate: v.optional(v.string()),
    heightCm: v.optional(v.number()),
    weightKg: v.optional(v.number()),
    countryId: v.optional(v.number()),
    countryName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Check if mapping already exists
    const existing = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", args.statsbombPlayerId)
      )
      .first();

    if (existing) {
      // Update with new bio data (only if not already set or if different)
      await ctx.db.patch(existing._id, {
        livePlayerId: args.livePlayerId ?? existing.livePlayerId,
        sbPlayerId: args.sbPlayerId ?? existing.sbPlayerId,
        playerName: args.playerName,
        playerNickname: args.playerNickname ?? existing.playerNickname,
        birthDate: args.birthDate ?? existing.birthDate,
        heightCm: args.heightCm ?? existing.heightCm,
        weightKg: args.weightKg ?? existing.weightKg,
        countryId: args.countryId ?? existing.countryId,
        countryName: args.countryName ?? existing.countryName,
        cachedAt: now,
      });
      return { updated: true, id: existing._id };
    }

    // Create new mapping
    const id = await ctx.db.insert("statsbombPlayerMappings", {
      statsbombPlayerId: args.statsbombPlayerId,
      livePlayerId: args.livePlayerId,
      sbPlayerId: args.sbPlayerId,
      playerName: args.playerName,
      playerNickname: args.playerNickname,
      birthDate: args.birthDate,
      heightCm: args.heightCm,
      weightKg: args.weightKg,
      countryId: args.countryId,
      countryName: args.countryName,
      cachedAt: now,
    });

    return { created: true, id };
  },
});

/**
 * Ingest player mappings from StatsBomb player-mapping endpoint
 * This is the best source for player identity resolution and bio data
 */
export const ingestPlayerMappings = internalAction({
  handler: async (ctx) => {
    if (!StatsBomb.isConfigured()) {
      console.log("[StatsBomb] Credentials not configured, skipping player mapping ingestion");
      return { success: false, error: "Credentials not configured" };
    }

    console.log("[StatsBomb] Fetching player mappings from /api/v1/player-mapping...");

    try {
      const mappings = await StatsBomb.fetchPlayerMappings();
      console.log(`[StatsBomb] Received ${mappings.length} player mappings`);

      let created = 0;
      let updated = 0;
      let errors = 0;

      for (const mapping of mappings) {
        try {
          const result = await ctx.runMutation(
            internal.ingest.statsbombIngest.upsertFullPlayerMapping,
            {
              statsbombPlayerId: mapping.offline_player_id,
              livePlayerId: mapping.live_player_id,
              sbPlayerId: mapping.sb_player_id,
              playerName: mapping.player_name,
              playerNickname: mapping.player_nickname ?? undefined,
              birthDate: mapping.birth_date,
              heightCm: mapping.height,
              weightKg: mapping.weight,
              countryId: mapping.country?.id,
              countryName: mapping.country?.name,
            }
          );

          if (result.created) created++;
          else if (result.updated) updated++;
        } catch (error) {
          console.error(`[StatsBomb] Error storing mapping for ${mapping.player_name}: ${error}`);
          errors++;
        }
      }

      console.log(`[StatsBomb] Player mappings: ${created} created, ${updated} updated, ${errors} errors`);

      return {
        success: true,
        total: mappings.length,
        created,
        updated,
        errors,
      };
    } catch (error) {
      console.error(`[StatsBomb] Error fetching player mappings: ${error}`);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Public action to trigger player mapping ingestion
 */
export const triggerIngestPlayerMappings = action({
  handler: async (ctx) => {
    try {
      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.ingestPlayerMappings,
        {}
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

// ============================================================================
// Player Bio Backfill
// ============================================================================

/**
 * Get players that need bio backfill (have StatsBomb external ID but missing bio fields)
 */
export const getPlayersNeedingBioBackfill = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 100 }) => {
    // Get all StatsBomb external IDs
    const externalIds = await ctx.db
      .query("playerExternalIds")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .collect();

    const playersNeedingBackfill: Array<{
      playerId: string;
      statsbombPlayerId: number;
      playerName: string;
      missingFields: string[];
    }> = [];

    for (const ext of externalIds) {
      const player = await ctx.db.get(ext.playerId);
      if (!player) continue;

      const missingFields: string[] = [];
      if (!player.birthDate) missingFields.push("birthDate");
      if (!player.heightCm) missingFields.push("heightCm");
      if (!player.weightKg) missingFields.push("weightKg");

      if (missingFields.length > 0) {
        playersNeedingBackfill.push({
          playerId: player._id,
          statsbombPlayerId: parseInt(ext.providerPlayerId),
          playerName: player.name,
          missingFields,
        });

        if (playersNeedingBackfill.length >= limit) break;
      }
    }

    return playersNeedingBackfill;
  },
});

/**
 * Get StatsBomb mapping with bio data
 */
export const getStatsBombMappingWithBio = internalQuery({
  args: { statsbombPlayerId: v.number() },
  handler: async (ctx, { statsbombPlayerId }) => {
    return await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();
  },
});

/**
 * Update player bio fields
 */
export const updatePlayerBio = internalMutation({
  args: {
    playerId: v.id("players"),
    birthDate: v.optional(v.string()),
    heightCm: v.optional(v.number()),
    weightKg: v.optional(v.number()),
  },
  handler: async (ctx, { playerId, birthDate, heightCm, weightKg }) => {
    const player = await ctx.db.get(playerId);
    if (!player) throw new Error(`Player not found: ${playerId}`);

    const updates: Record<string, unknown> = {};
    let fieldsUpdated = 0;

    // Only update if currently empty
    if (birthDate && !player.birthDate) {
      updates.birthDate = birthDate;
      fieldsUpdated++;
    }
    if (heightCm && !player.heightCm) {
      updates.heightCm = heightCm;
      fieldsUpdated++;
    }
    if (weightKg && !player.weightKg) {
      updates.weightKg = weightKg;
      fieldsUpdated++;
    }

    if (fieldsUpdated > 0) {
      updates.updatedAt = Date.now();
      await ctx.db.patch(playerId, updates);
    }

    return { updated: fieldsUpdated > 0, fieldsUpdated };
  },
});

/**
 * Backfill player bio data from StatsBomb mappings
 */
export const backfillPlayerBio = internalAction({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 500 }) => {
    // Get players needing bio backfill
    const playersNeedingBackfill = await ctx.runQuery(
      internal.ingest.statsbombIngest.getPlayersNeedingBioBackfill,
      { limit }
    );

    console.log(`[StatsBomb] Found ${playersNeedingBackfill.length} players needing bio backfill`);

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const player of playersNeedingBackfill) {
      try {
        // Get StatsBomb mapping with bio data
        const mapping = await ctx.runQuery(
          internal.ingest.statsbombIngest.getStatsBombMappingWithBio,
          { statsbombPlayerId: player.statsbombPlayerId }
        );

        if (!mapping) {
          console.log(`[StatsBomb] No mapping found for ${player.playerName} (${player.statsbombPlayerId})`);
          skipped++;
          continue;
        }

        // Check if mapping has any bio data to backfill
        if (!mapping.birthDate && !mapping.heightCm && !mapping.weightKg) {
          skipped++;
          continue;
        }

        // Update player
        const result = await ctx.runMutation(
          internal.ingest.statsbombIngest.updatePlayerBio,
          {
            playerId: player.playerId as Id<"players">,
            birthDate: mapping.birthDate,
            heightCm: mapping.heightCm,
            weightKg: mapping.weightKg,
          }
        );

        if (result.updated) {
          console.log(`[StatsBomb] Updated bio for ${player.playerName}: ${result.fieldsUpdated} fields`);
          updated++;
        } else {
          skipped++;
        }
      } catch (error) {
        console.error(`[StatsBomb] Error backfilling bio for ${player.playerName}: ${error}`);
        errors++;
      }
    }

    return {
      total: playersNeedingBackfill.length,
      updated,
      skipped,
      errors,
    };
  },
});

/**
 * Public action to trigger bio backfill
 */
export const triggerBackfillPlayerBio = action({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    try {
      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.backfillPlayerBio,
        { limit: limit ?? 500 }
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Get bio backfill statistics
 */
export const getBioBackfillStats = internalQuery({
  handler: async (ctx) => {
    // Get all players with StatsBomb external IDs
    const externalIds = await ctx.db
      .query("playerExternalIds")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .collect();

    let withBirthDate = 0;
    let withHeight = 0;
    let withWeight = 0;
    let missingAll = 0;
    let hasAll = 0;

    for (const ext of externalIds) {
      const player = await ctx.db.get(ext.playerId);
      if (!player) continue;

      if (player.birthDate) withBirthDate++;
      if (player.heightCm) withHeight++;
      if (player.weightKg) withWeight++;

      if (!player.birthDate && !player.heightCm && !player.weightKg) {
        missingAll++;
      }
      if (player.birthDate && player.heightCm && player.weightKg) {
        hasAll++;
      }
    }

    // Get StatsBomb mappings with bio data
    const mappings = await ctx.db.query("statsbombPlayerMappings").collect();
    const mappingsWithBio = mappings.filter(
      (m) => m.birthDate || m.heightCm || m.weightKg
    );

    return {
      playersWithStatsBomb: externalIds.length,
      playersWithBirthDate: withBirthDate,
      playersWithHeight: withHeight,
      playersWithWeight: withWeight,
      playersHasAllBio: hasAll,
      playersMissingAllBio: missingAll,
      statsbombMappingsTotal: mappings.length,
      statsbombMappingsWithBio: mappingsWithBio.length,
    };
  },
});

/**
 * Public action to get bio backfill stats
 */
export const getBioStats = action({
  handler: async (ctx) => {
    return await ctx.runQuery(
      internal.ingest.statsbombIngest.getBioBackfillStats
    );
  },
});

// ============================================================================
// Season Stats Ingestion
// ============================================================================

/**
 * Upsert season player aggregates
 */
export const upsertSeasonAggregates = internalMutation({
  args: {
    playerId: v.id("players"),
    competitionId: v.optional(v.id("competitions")),
    teamId: v.optional(v.id("teams")),
    season: v.string(),
    minutes: v.number(),
    appearances: v.number(),
    totals: v.optional(v.any()),
    per90: v.optional(v.any()),
    additionalStats: v.optional(v.any()),
    raw: v.optional(v.any()),
    features: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Check if aggregate already exists
    const existing = await ctx.db
      .query("providerPlayerAggregates")
      .filter((q) =>
        q.and(
          q.eq(q.field("playerId"), args.playerId),
          q.eq(q.field("provider"), "statsbomb"),
          q.eq(q.field("season"), args.season)
        )
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        minutes: args.minutes,
        appearances: args.appearances,
        totals: args.totals,
        per90: args.per90,
        additionalStats: args.additionalStats,
        raw: args.raw,
        features: args.features,
        fetchedAt: now,
      });
      return { updated: true, id: existing._id };
    }

    const id = await ctx.db.insert("providerPlayerAggregates", {
      playerId: args.playerId,
      provider: "statsbomb",
      competitionId: args.competitionId,
      teamId: args.teamId,
      window: "season",
      season: args.season,
      minutes: args.minutes,
      appearances: args.appearances,
      totals: args.totals,
      per90: args.per90,
      additionalStats: args.additionalStats,
      raw: args.raw,
      features: args.features,
      fetchedAt: now,
    });

    return { created: true, id };
  },
});

/**
 * Extract season features from raw stats
 * NOTE: StatsBomb API returns per-90 values with _90 suffix (e.g., player_season_goals_90)
 */
function extractSeasonRatingFeatures(
  raw: StatsBomb.StatsBombSeasonPlayerStats
): Record<string, number | undefined> {
  // Cast raw to any to access dynamic field names
  const r = raw as Record<string, unknown>;

  return {
    // Minutes and appearances
    minutes: r.player_season_minutes as number | undefined,
    minutes360: r.player_season_360_minutes as number | undefined,
    appearances: r.player_season_appearances as number | undefined,

    // Shooting (per-90 values from API)
    goals: r.player_season_goals_90 as number | undefined,
    npxG: r.player_season_np_xg_90 as number | undefined,
    shots: r.player_season_shots_90 as number | undefined,
    shotsOnTarget: r.player_season_shots_on_target_90 as number | undefined,

    // Passing (per-90 values from API)
    assists: r.player_season_assists_90 as number | undefined,
    xA: r.player_season_xa_90 as number | undefined,
    progressivePasses: r.player_season_progressive_passes_90 as number | undefined,
    keyPasses: r.player_season_key_passes_90 as number | undefined,

    // Carrying (per-90 values from API)
    progressiveCarries: r.player_season_progressive_carries_90 as number | undefined,
    takeOnsSuccessful: r.player_season_successful_dribbles_90 as number | undefined,

    // Creating (per-90 values from API)
    shotCreatingActions: r.player_season_shot_creating_actions_90 as number | undefined,
    goalCreatingActions: r.player_season_goal_creating_actions_90 as number | undefined,

    // Defensive (per-90 values from API)
    tackles: r.player_season_tackles_90 as number | undefined,
    interceptions: r.player_season_interceptions_90 as number | undefined,
    blocks: r.player_season_blocks_90 as number | undefined,
    clearances: r.player_season_clearances_90 as number | undefined,
    aerialDuelsWon: r.player_season_aerial_wins_90 as number | undefined,

    // Pressure (per-90 values from API)
    pressures: r.player_season_pressures_90 as number | undefined,
    pressuresSuccessful: r.player_season_pressure_regains_90 as number | undefined,

    // GK (per-90 values from API)
    saves: r.player_season_saves_90 as number | undefined,
    psxG: r.player_season_psxg_90 as number | undefined,
    goalsAgainst: r.player_season_goals_faced_90 as number | undefined,

    // OBV - On-Ball Value (per-90 values from API)
    obv: r.player_season_obv_90 as number | undefined,
    obvPass: r.player_season_obv_pass_90 as number | undefined,
    obvShot: r.player_season_obv_shot_90 as number | undefined,
    obvDefensiveAction: r.player_season_obv_defensive_action_90 as number | undefined,
    obvDribbleCarry: r.player_season_obv_dribble_carry_90 as number | undefined,
    obvGk: r.player_season_obv_gk_90 as number | undefined,
  };
}

/**
 * Ingest season stats for a competition-season
 */
export const ingestSeasonStats = internalAction({
  args: {
    competitionSeasonId: v.id("statsbombCompetitionSeasons"),
  },
  handler: async (ctx, { competitionSeasonId }) => {
    const cs = await ctx.runQuery(
      internal.ingest.statsbombIngest.getCompetitionSeason,
      { id: competitionSeasonId }
    );

    if (!cs) {
      throw new Error(`Competition season not found: ${competitionSeasonId}`);
    }

    console.log(`[StatsBomb] Fetching season stats for ${cs.name} ${cs.season}`);

    const seasonStats = await StatsBomb.fetchSeasonPlayerStats(
      cs.statsbombCompetitionId,
      cs.statsbombSeasonId
    );

    console.log(`[StatsBomb] Received ${seasonStats.length} player season stats`);

    let created = 0;
    let updated = 0;
    let skipped = 0;
    let errors = 0;
    let firstError: string | null = null;

    for (const stat of seasonStats) {
      try {
        // Check if player is linked
        const externalId = await ctx.runQuery(
          internal.ingest.statsbombIngest.getStatsBombExternalId,
          { statsbombPlayerId: stat.player_id }
        );

        if (!externalId) {
          skipped++;
          continue;
        }

        // Log first few linked players for debugging
        if (created + updated + errors < 5) {
          console.log(`[StatsBomb] Processing linked player ${stat.player_id} (${stat.player_name}), playerId: ${externalId.playerId}`);
        }

        // Extract features (API already returns per-90 values with _90 suffix)
        const features = extractSeasonRatingFeatures(stat);

        const minutes = stat.player_season_minutes ?? 0;
        const appearances = stat.player_season_appearances ?? 0;

        // Per-90 values - API already provides these, use directly
        // Note: Convert null to undefined for schema compatibility
        const per90 = {
          goals: features.goals ?? undefined,
          assists: features.assists ?? undefined,
          shots: features.shots ?? undefined,
          tackles: features.tackles ?? undefined,
          interceptions: features.interceptions ?? undefined,
          xG: features.npxG ?? undefined,  // Use npxG (non-penalty xG) per 90
          xA: features.xA ?? undefined,
          clearances: features.clearances ?? undefined,
          blocks: features.blocks ?? undefined,
          aerialDuelsWon: features.aerialDuelsWon ?? undefined,
          saves: features.saves ?? undefined,
          goalsConceded: features.goalsAgainst ?? undefined,
        };

        // Totals - these are per-90 values from the API, multiply back for totals
        const nineties = minutes / 90;
        const totals = {
          appearances,
          goals: features.goals != null ? features.goals * nineties : undefined,
          assists: features.assists != null ? features.assists * nineties : undefined,
          xG: features.npxG != null ? features.npxG * nineties : undefined,
          xA: features.xA != null ? features.xA * nineties : undefined,
          shots: features.shots != null ? features.shots * nineties : undefined,
          tackles: features.tackles != null ? features.tackles * nineties : undefined,
          interceptions: features.interceptions != null ? features.interceptions * nineties : undefined,
        };

        // Additional stats - OBV and advanced metrics (per-90 values from API)
        // Note: API returns null for some fields, but schema expects undefined, so filter nulls
        const additionalStats = {
          xG: totals.xG ?? undefined,  // Total xG for the season
          xA: totals.xA ?? undefined,  // Total xA for the season
          xGPer90: features.npxG ?? undefined,  // Per-90 from API
          xAPer90: features.xA ?? undefined,    // Per-90 from API
          progressivePasses: features.progressivePasses ?? undefined,
          progressiveCarries: features.progressiveCarries ?? undefined,
          successfulPressures: features.pressuresSuccessful ?? undefined,
          // OBV (On-Ball Value) fields - per-90 values from API
          obv: features.obv ?? undefined,
          obvPass: features.obvPass ?? undefined,
          obvShot: features.obvShot ?? undefined,
          obvDefensiveAction: features.obvDefensiveAction ?? undefined,
          obvDribbleCarry: features.obvDribbleCarry ?? undefined,
          obvGk: features.obvGk ?? undefined,
        };

        const result = await ctx.runMutation(
          internal.ingest.statsbombIngest.upsertSeasonAggregates,
          {
            playerId: externalId.playerId,
            competitionId: cs.competitionId,
            season: cs.season,
            minutes: minutes,
            appearances,
            totals,
            per90,
            additionalStats,
            raw: stat,
            features,
          }
        );

        if (result.created) created++;
        else if (result.updated) updated++;
      } catch (error) {
        // Log first few errors with full details
        if (errors < 3) {
          console.error(`[StatsBomb] Error storing season stats for player ${stat.player_id} (${stat.player_name}):`, error);
        }
        if (!firstError) {
          firstError = `Player ${stat.player_id} (${stat.player_name}): ${String(error)}`;
        }
        errors++;
      }
    }

    console.log(`[StatsBomb] Season stats: ${created} created, ${updated} updated, ${skipped} skipped, ${errors} errors`);

    return {
      total: seasonStats.length,
      created,
      updated,
      skipped,
      errors,
      firstError,
    };
  },
});

/**
 * Public action to trigger season stats ingestion
 */
export const triggerIngestSeasonStats = action({
  args: {
    competitionSeasonId: v.optional(v.id("statsbombCompetitionSeasons")),
  },
  handler: async (ctx, { competitionSeasonId }) => {
    try {
      // If no competition season provided, get the first active one
      let csId = competitionSeasonId;
      if (!csId) {
        const seasons = await ctx.runQuery(
          internal.ingest.statsbombIngest.getActiveCompetitionSeasons
        );
        if (seasons.length === 0) {
          return { success: false, error: "No active competition seasons found" };
        }
        csId = seasons[0]._id;
        console.log(`[StatsBomb] Using competition season: ${seasons[0].name} ${seasons[0].season}`);
      }

      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.ingestSeasonStats,
        { competitionSeasonId: csId }
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Public action to ingest season stats for all active competitions
 */
export const triggerIngestAllSeasonStats = action({
  handler: async (ctx) => {
    try {
      const seasons = await ctx.runQuery(
        internal.ingest.statsbombIngest.getActiveCompetitionSeasons
      );

      if (seasons.length === 0) {
        return { success: false, error: "No active competition seasons found" };
      }

      console.log(`[StatsBomb] Found ${seasons.length} competition seasons to process`);

      const results: Array<{ name: string; created: number; updated: number; skipped: number }> = [];

      for (const cs of seasons) {
        if (!cs.competitionId) {
          console.log(`[StatsBomb] Skipping ${cs.name} - no canonical competition linked`);
          continue;
        }

        console.log(`[StatsBomb] Processing season stats: ${cs.name} ${cs.season}`);

        const result = await ctx.runAction(
          internal.ingest.statsbombIngest.ingestSeasonStats,
          { competitionSeasonId: cs._id }
        );

        results.push({
          name: `${cs.name} ${cs.season}`,
          created: result.created,
          updated: result.updated,
          skipped: result.skipped,
        });
      }

      const totals = results.reduce(
        (acc, r) => ({
          created: acc.created + r.created,
          updated: acc.updated + r.updated,
          skipped: acc.skipped + r.skipped,
        }),
        { created: 0, updated: 0, skipped: 0 }
      );

      return { success: true, results, totals };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});
