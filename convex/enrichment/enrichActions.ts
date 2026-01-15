/**
 * Enrichment Actions
 *
 * Orchestrates data enrichment from FotMob and SofaScore providers.
 * Features:
 * - Rate-limited fetching with request budgeting
 * - Identity resolution to prevent duplicates
 * - Canonical merging with precedence rules
 * - Idempotent operations
 */

import { v } from "convex/values";
import { internalAction, internalMutation, internalQuery } from "../_generated/server";
import { internal } from "../_generated/api";
import type { Doc, Id } from "../_generated/dataModel";
import { createBudget, type RequestBudget } from "../providers/fetchWrapper";
import * as FotMob from "../providers/fotmob";
import * as SofaScore from "../providers/sofascore";
import {
  normalizeName,
  resolvePlayer,
  upsertExternalId,
  addToReviewQueue,
  type ExternalPlayerData,
  type Provider,
} from "../resolve/resolvePlayer";
import {
  mergeProviderProfile,
  storeProviderAggregates,
  type NormalizedProfile,
} from "../merge/mergePlayer";

// ============================================================================
// Types
// ============================================================================

export interface EnrichmentResult {
  provider: Provider;
  playersProcessed: number;
  profilesFetched: number;
  profilesMerged: number;
  externalIdsMapped: number;
  addedToReviewQueue: number;
  errors: number;
  requestsUsed: number;
  budgetExhausted: boolean;
}

export interface EnrichmentConfig {
  maxRequests: number;
  batchSize?: number;
  competitionIds?: Id<"competitions">[];
}

// ============================================================================
// Internal Queries
// ============================================================================

/**
 * Get players that need enrichment
 */
export const getPlayersForEnrichment = internalQuery({
  args: {
    provider: v.union(
      v.literal("fotmob"),
      v.literal("sofascore")
    ),
    limit: v.number(),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<Doc<"players">[]> => {
    // Get players that don't have an external ID for this provider yet
    let playersQuery = ctx.db.query("players");

    // Filter by competition if specified
    if (args.competitionIds && args.competitionIds.length > 0) {
      // We need to collect and filter manually since we can't do OR in index
      const allPlayers: Doc<"players">[] = [];
      for (const compId of args.competitionIds) {
        const competitionPlayers = await ctx.db
          .query("players")
          .withIndex("by_competition", (q) => q.eq("competitionId", compId))
          .collect();
        allPlayers.push(...competitionPlayers);
      }

      // Filter out players who already have external IDs for this provider
      const playersWithoutExternalId: Doc<"players">[] = [];
      for (const player of allPlayers) {
        const existingExternalId = await ctx.db
          .query("playerExternalIds")
          .withIndex("by_player_provider", (q) =>
            q.eq("playerId", player._id).eq("provider", args.provider)
          )
          .first();

        if (!existingExternalId) {
          playersWithoutExternalId.push(player);
        }
      }

      return playersWithoutExternalId.slice(0, args.limit);
    }

    // Get all players if no competition filter
    const allPlayers = await ctx.db.query("players").take(args.limit * 2);

    // Filter out players who already have external IDs
    const playersWithoutExternalId: Doc<"players">[] = [];
    for (const player of allPlayers) {
      if (playersWithoutExternalId.length >= args.limit) break;

      const existingExternalId = await ctx.db
        .query("playerExternalIds")
        .withIndex("by_player_provider", (q) =>
          q.eq("playerId", player._id).eq("provider", args.provider)
        )
        .first();

      if (!existingExternalId) {
        playersWithoutExternalId.push(player);
      }
    }

    return playersWithoutExternalId;
  },
});

/**
 * Get players that have external IDs but need profile enrichment
 */
export const getPlayersForProfileEnrichment = internalQuery({
  args: {
    provider: v.union(
      v.literal("fotmob"),
      v.literal("sofascore")
    ),
    limit: v.number(),
  },
  handler: async (ctx, args): Promise<Array<{ player: Doc<"players">; externalId: Doc<"playerExternalIds"> }>> => {
    // Get external IDs for the provider
    const externalIds = await ctx.db
      .query("playerExternalIds")
      .filter((q) => q.eq(q.field("provider"), args.provider))
      .take(args.limit * 2);

    const results: Array<{ player: Doc<"players">; externalId: Doc<"playerExternalIds"> }> = [];

    for (const extId of externalIds) {
      if (results.length >= args.limit) break;

      // Check if we already have a profile for this player/provider
      const existingProfile = await ctx.db
        .query("providerPlayerProfiles")
        .withIndex("by_player_provider", (q) =>
          q.eq("playerId", extId.playerId).eq("provider", args.provider)
        )
        .first();

      if (!existingProfile) {
        const player = await ctx.db.get(extId.playerId);
        if (player) {
          results.push({ player, externalId: extId });
        }
      }
    }

    return results;
  },
});

// ============================================================================
// Internal Mutations
// ============================================================================

/**
 * Process a single player's enrichment result
 */
export const processPlayerEnrichment = internalMutation({
  args: {
    playerId: v.id("players"),
    provider: v.union(v.literal("fotmob"), v.literal("sofascore")),
    providerPlayerId: v.string(),
    confidence: v.number(),
    rawProfile: v.any(),
    normalizedProfile: v.any(),
  },
  handler: async (ctx, args) => {
    // Store external ID mapping
    await upsertExternalId(
      ctx.db,
      args.playerId,
      args.provider,
      args.providerPlayerId,
      args.confidence
    );

    // Merge profile data
    const mergeResult = await mergeProviderProfile(
      ctx.db,
      args.playerId,
      args.provider,
      args.normalizedProfile as NormalizedProfile,
      args.rawProfile
    );

    return mergeResult;
  },
});

/**
 * Add unresolved player to review queue
 */
export const addUnresolvedPlayer = internalMutation({
  args: {
    provider: v.union(v.literal("fotmob"), v.literal("sofascore")),
    providerPlayerId: v.string(),
    name: v.string(),
    payload: v.any(),
    reason: v.string(),
    candidatePlayerIds: v.optional(v.array(v.id("players"))),
  },
  handler: async (ctx, args) => {
    const data: ExternalPlayerData = {
      provider: args.provider,
      providerPlayerId: args.providerPlayerId,
      name: args.name,
    };

    await addToReviewQueue(
      ctx.db,
      data,
      args.payload,
      args.reason,
      args.candidatePlayerIds
    );
  },
});

/**
 * Store provider aggregated stats
 */
export const storePlayerAggregates = internalMutation({
  args: {
    playerId: v.id("players"),
    provider: v.union(v.literal("fotmob"), v.literal("sofascore")),
    stats: v.any(),
    window: v.union(v.literal("365"), v.literal("season"), v.literal("career")),
    competitionId: v.optional(v.id("competitions")),
    season: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await storeProviderAggregates(
      ctx.db,
      args.playerId,
      args.provider,
      args.stats,
      {
        window: args.window,
        competitionId: args.competitionId,
        season: args.season,
      }
    );
  },
});

/**
 * Update enrichment state for resumable operations
 */
export const updateEnrichmentState = internalMutation({
  args: {
    provider: v.union(v.literal("fotmob"), v.literal("sofascore")),
    lastProcessedPlayerId: v.optional(v.id("players")),
    totalProcessed: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("enrichmentState")
      .withIndex("by_provider", (q) => q.eq("provider", args.provider))
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        lastProcessedPlayerId: args.lastProcessedPlayerId,
        totalProcessed: args.totalProcessed,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("enrichmentState", {
        provider: args.provider,
        lastProcessedPlayerId: args.lastProcessedPlayerId,
        totalProcessed: args.totalProcessed,
        updatedAt: now,
      });
    }
  },
});

// ============================================================================
// FotMob Enrichment Action
// ============================================================================

/**
 * Enrich players from FotMob
 */
export const enrichPlayersFromFotMob = internalAction({
  args: {
    maxRequests: v.optional(v.number()),
    batchSize: v.optional(v.number()),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<EnrichmentResult> => {
    const maxRequests = args.maxRequests ?? 20;
    const batchSize = args.batchSize ?? 10;
    const budget = createBudget(maxRequests);

    const result: EnrichmentResult = {
      provider: "fotmob",
      playersProcessed: 0,
      profilesFetched: 0,
      profilesMerged: 0,
      externalIdsMapped: 0,
      addedToReviewQueue: 0,
      errors: 0,
      requestsUsed: 0,
      budgetExhausted: false,
    };

    console.log(`[FotMob] Starting enrichment with budget: ${maxRequests} requests`);

    try {
      // Get players that need enrichment
      const players = await ctx.runQuery(
        internal.enrichment.enrichActions.getPlayersForEnrichment,
        {
          provider: "fotmob",
          limit: batchSize,
          competitionIds: args.competitionIds,
        }
      );

      console.log(`[FotMob] Found ${players.length} players to enrich`);

      for (const player of players) {
        if (budget.used >= budget.maxRequests) {
          result.budgetExhausted = true;
          console.log(`[FotMob] Budget exhausted after ${budget.used} requests`);
          break;
        }

        try {
          result.playersProcessed++;

          // Search for player in FotMob
          const searchResults = await FotMob.searchPlayer(player.name, budget);

          if (searchResults.length === 0) {
            console.log(`[FotMob] No search results for: ${player.name}`);
            continue;
          }

          // Find best match from search results
          const bestMatch = findBestSearchMatch(player, searchResults);

          if (!bestMatch) {
            await ctx.runMutation(
              internal.enrichment.enrichActions.addUnresolvedPlayer,
              {
                provider: "fotmob",
                providerPlayerId: searchResults[0].providerPlayerId,
                name: player.name,
                payload: searchResults,
                reason: "no_confident_match_in_search",
              }
            );
            result.addedToReviewQueue++;
            continue;
          }

          // Fetch full profile
          const { raw: rawProfile, normalized: normalizedProfile } = await FotMob.getPlayer(
            bestMatch.providerPlayerId,
            budget
          );
          result.profilesFetched++;

          // Process the enrichment
          await ctx.runMutation(
            internal.enrichment.enrichActions.processPlayerEnrichment,
            {
              playerId: player._id,
              provider: "fotmob",
              providerPlayerId: bestMatch.providerPlayerId,
              confidence: 0.95,
              rawProfile,
              normalizedProfile,
            }
          );
          result.profilesMerged++;
          result.externalIdsMapped++;

          // Fetch stats if within budget
          if (budget.used < budget.maxRequests - 1) {
            try {
              const { careerStats } = await FotMob.getPlayerStats(
                bestMatch.providerPlayerId,
                budget
              );

              if (careerStats) {
                await ctx.runMutation(
                  internal.enrichment.enrichActions.storePlayerAggregates,
                  {
                    playerId: player._id,
                    provider: "fotmob",
                    stats: careerStats,
                    window: "career",
                  }
                );
              }
            } catch (statsError) {
              console.warn(`[FotMob] Failed to fetch stats for ${player.name}:`, statsError);
            }
          }

          console.log(`[FotMob] Enriched player: ${player.name}`);
        } catch (playerError) {
          result.errors++;
          console.error(`[FotMob] Error processing player ${player.name}:`, playerError);
        }
      }

      // Update enrichment state
      if (players.length > 0) {
        await ctx.runMutation(
          internal.enrichment.enrichActions.updateEnrichmentState,
          {
            provider: "fotmob",
            lastProcessedPlayerId: players[players.length - 1]._id,
            totalProcessed: result.playersProcessed,
          }
        );
      }
    } catch (error) {
      console.error("[FotMob] Enrichment failed:", error);
      result.errors++;
    }

    result.requestsUsed = budget.used;
    console.log(`[FotMob] Enrichment complete:`, result);
    return result;
  },
});

// ============================================================================
// SofaScore Enrichment Action
// ============================================================================

/**
 * Enrich players from SofaScore
 */
export const enrichPlayersFromSofaScore = internalAction({
  args: {
    maxRequests: v.optional(v.number()),
    batchSize: v.optional(v.number()),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<EnrichmentResult> => {
    const maxRequests = args.maxRequests ?? 15; // Lower default for SofaScore
    const batchSize = args.batchSize ?? 5;
    const budget = createBudget(maxRequests);

    const result: EnrichmentResult = {
      provider: "sofascore",
      playersProcessed: 0,
      profilesFetched: 0,
      profilesMerged: 0,
      externalIdsMapped: 0,
      addedToReviewQueue: 0,
      errors: 0,
      requestsUsed: 0,
      budgetExhausted: false,
    };

    console.log(`[SofaScore] Starting enrichment with budget: ${maxRequests} requests`);

    try {
      // Get players that need enrichment
      const players = await ctx.runQuery(
        internal.enrichment.enrichActions.getPlayersForEnrichment,
        {
          provider: "sofascore",
          limit: batchSize,
          competitionIds: args.competitionIds,
        }
      );

      console.log(`[SofaScore] Found ${players.length} players to enrich`);

      for (const player of players) {
        if (budget.used >= budget.maxRequests) {
          result.budgetExhausted = true;
          console.log(`[SofaScore] Budget exhausted after ${budget.used} requests`);
          break;
        }

        try {
          result.playersProcessed++;

          // Search for player in SofaScore
          const searchResults = await SofaScore.searchPlayer(player.name, budget);

          if (searchResults.length === 0) {
            console.log(`[SofaScore] No search results for: ${player.name}`);
            continue;
          }

          // Find best match from search results
          const bestMatch = findBestSearchMatch(player, searchResults);

          if (!bestMatch) {
            await ctx.runMutation(
              internal.enrichment.enrichActions.addUnresolvedPlayer,
              {
                provider: "sofascore",
                providerPlayerId: searchResults[0].providerPlayerId,
                name: player.name,
                payload: searchResults,
                reason: "no_confident_match_in_search",
              }
            );
            result.addedToReviewQueue++;
            continue;
          }

          // Fetch full profile
          const { raw: rawProfile, normalized: normalizedProfile } = await SofaScore.getPlayer(
            bestMatch.providerPlayerId,
            budget
          );
          result.profilesFetched++;

          // Process the enrichment
          await ctx.runMutation(
            internal.enrichment.enrichActions.processPlayerEnrichment,
            {
              playerId: player._id,
              provider: "sofascore",
              providerPlayerId: bestMatch.providerPlayerId,
              confidence: 0.95,
              rawProfile,
              normalizedProfile,
            }
          );
          result.profilesMerged++;
          result.externalIdsMapped++;

          // Fetch stats if within budget
          if (budget.used < budget.maxRequests - 1) {
            try {
              const { careerStats } = await SofaScore.getPlayerStats(
                bestMatch.providerPlayerId,
                budget
              );

              if (careerStats) {
                await ctx.runMutation(
                  internal.enrichment.enrichActions.storePlayerAggregates,
                  {
                    playerId: player._id,
                    provider: "sofascore",
                    stats: careerStats,
                    window: "career",
                  }
                );
              }
            } catch (statsError) {
              console.warn(`[SofaScore] Failed to fetch stats for ${player.name}:`, statsError);
            }
          }

          console.log(`[SofaScore] Enriched player: ${player.name}`);
        } catch (playerError) {
          result.errors++;
          console.error(`[SofaScore] Error processing player ${player.name}:`, playerError);
        }
      }

      // Update enrichment state
      if (players.length > 0) {
        await ctx.runMutation(
          internal.enrichment.enrichActions.updateEnrichmentState,
          {
            provider: "sofascore",
            lastProcessedPlayerId: players[players.length - 1]._id,
            totalProcessed: result.playersProcessed,
          }
        );
      }
    } catch (error) {
      console.error("[SofaScore] Enrichment failed:", error);
      result.errors++;
    }

    result.requestsUsed = budget.used;
    console.log(`[SofaScore] Enrichment complete:`, result);
    return result;
  },
});

// ============================================================================
// Combined Enrichment Action
// ============================================================================

/**
 * Run enrichment from all providers sequentially
 */
export const enrichPlayersFromAllProviders = internalAction({
  args: {
    fotMobRequests: v.optional(v.number()),
    sofaScoreRequests: v.optional(v.number()),
    batchSize: v.optional(v.number()),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<{
    fotmob: EnrichmentResult;
    sofascore: EnrichmentResult;
    totalPlayersEnriched: number;
  }> => {
    console.log("[Enrichment] Starting combined enrichment from all providers");

    // Run FotMob enrichment
    const fotmobResult = await ctx.runAction(
      internal.enrichment.enrichActions.enrichPlayersFromFotMob,
      {
        maxRequests: args.fotMobRequests ?? 20,
        batchSize: args.batchSize ?? 10,
        competitionIds: args.competitionIds,
      }
    );

    // Run SofaScore enrichment
    const sofascoreResult = await ctx.runAction(
      internal.enrichment.enrichActions.enrichPlayersFromSofaScore,
      {
        maxRequests: args.sofaScoreRequests ?? 15,
        batchSize: args.batchSize ?? 5,
        competitionIds: args.competitionIds,
      }
    );

    const totalPlayersEnriched = fotmobResult.profilesMerged + sofascoreResult.profilesMerged;

    console.log(`[Enrichment] Combined enrichment complete. Total players enriched: ${totalPlayersEnriched}`);

    return {
      fotmob: fotmobResult,
      sofascore: sofascoreResult,
      totalPlayersEnriched,
    };
  },
});

// ============================================================================
// Helper Functions
// ============================================================================

interface SearchResult {
  providerPlayerId: string;
  name: string;
  teamName?: string;
  position?: string;
}

/**
 * Find the best matching search result for a player
 */
function findBestSearchMatch(
  player: Doc<"players">,
  searchResults: SearchResult[]
): SearchResult | null {
  const playerNormalized = normalizeName(player.name);

  let bestMatch: SearchResult | null = null;
  let bestScore = 0;

  for (const result of searchResults) {
    const resultNormalized = normalizeName(result.name);
    let score = 0;

    // Exact name match
    if (playerNormalized === resultNormalized) {
      score = 1.0;
    } else {
      // Calculate similarity
      score = calculateSimpleSimilarity(playerNormalized, resultNormalized);
    }

    // Boost score if position matches
    if (result.position && player.position) {
      const positionMatch =
        result.position.toLowerCase().includes(player.position.toLowerCase()) ||
        player.position.toLowerCase().includes(result.position.toLowerCase());
      if (positionMatch) {
        score += 0.1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = result;
    }
  }

  // Only return if confidence is high enough
  return bestScore >= 0.8 ? bestMatch : null;
}

/**
 * Simple similarity calculation for quick matching
 */
function calculateSimpleSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1;
  if (!str1 || !str2) return 0;

  // Check if one contains the other
  if (str1.includes(str2) || str2.includes(str1)) {
    const shorter = str1.length < str2.length ? str1 : str2;
    const longer = str1.length >= str2.length ? str1 : str2;
    return shorter.length / longer.length;
  }

  // Simple Jaccard-like similarity on words
  const words1 = new Set(str1.split(" "));
  const words2 = new Set(str2.split(" "));
  const intersection = new Set([...words1].filter((x) => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}
