/**
 * Identity Resolution System
 *
 * Resolves external provider players to canonical players in our database.
 * Prevents duplicate players by matching on normalized names and other criteria.
 */

import { v } from "convex/values";
import { Doc, Id } from "../_generated/dataModel";
import { DatabaseReader, DatabaseWriter, MutationCtx, QueryCtx } from "../_generated/server";

// ============================================================================
// Types
// ============================================================================

export type Provider = "apiFootball" | "fotmob" | "sofascore" | "thesportsdb" | "wikidata" | "footballdata";

export interface ExternalPlayerData {
  provider: Provider;
  providerPlayerId: string;
  name: string;
  teamName?: string;
  teamId?: string;
  birthDate?: string;
  nationality?: string;
  position?: string;
}

export interface ResolveResult {
  playerId: Id<"players"> | null;
  confidence: number;
  isNew: boolean;
  reason: string;
  candidatePlayerIds?: Id<"players">[];
}

export interface MatchCandidate {
  playerId: Id<"players">;
  player: Doc<"players">;
  score: number;
  matchReasons: string[];
}

// ============================================================================
// Configuration
// ============================================================================

const CONFIDENCE_THRESHOLD = 0.92;
const EXACT_MATCH_SCORE = 1.0;
const NAME_TEAM_MATCH_SCORE = 0.85;
const NAME_ONLY_MATCH_SCORE = 0.6;
const BIRTHDATE_BONUS = 0.15;
const NATIONALITY_BONUS = 0.05;

// ============================================================================
// Name Normalization
// ============================================================================

/**
 * Normalize a name for matching:
 * - Convert to lowercase
 * - Remove accents/diacritics
 * - Remove punctuation
 * - Collapse whitespace
 */
export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    // Remove accents/diacritics
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Remove punctuation except spaces
    .replace(/[^\w\s]/g, "")
    // Collapse whitespace
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalize a team name for matching
 */
export function normalizeTeamName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Remove common suffixes
    .replace(/\b(fc|cf|sc|ac|afc|ssc|bv|sv|vfb|vfl|fsv|tsv|1\.|fk|sk|rcd|cd|ud|rc|as|ss|us)\b/gi, "")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Calculate string similarity using Levenshtein distance
 */
export function calculateSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1;
  if (!str1 || !str2) return 0;

  const len1 = str1.length;
  const len2 = str2.length;

  // Quick exit for very different lengths
  if (Math.abs(len1 - len2) > Math.max(len1, len2) * 0.5) return 0;

  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  const maxLen = Math.max(len1, len2);
  return 1 - matrix[len1][len2] / maxLen;
}

// ============================================================================
// Resolution Functions
// ============================================================================

/**
 * Check if external ID already exists in our system
 */
export async function findExistingExternalId(
  db: DatabaseReader,
  provider: Provider,
  providerPlayerId: string
): Promise<Id<"players"> | null> {
  const existing = await db
    .query("playerExternalIds")
    .withIndex("by_provider_playerId", (q) =>
      q.eq("provider", provider).eq("providerPlayerId", providerPlayerId)
    )
    .first();

  return existing?.playerId ?? null;
}

/**
 * Find candidate matches for a player in the database
 */
export async function findCandidateMatches(
  db: DatabaseReader,
  data: ExternalPlayerData,
  competitionId?: Id<"competitions">,
  teamId?: Id<"teams">
): Promise<MatchCandidate[]> {
  const normalizedName = normalizeName(data.name);
  const candidates: MatchCandidate[] = [];

  // Strategy 1: Look up by normalized name
  const byNameNormalized = await db
    .query("players")
    .withIndex("by_nameNormalized", (q) => q.eq("nameNormalized", normalizedName))
    .collect();

  for (const player of byNameNormalized) {
    const { score, matchReasons } = calculateMatchScore(player, data);
    if (score > 0.5) {
      candidates.push({ playerId: player._id, player, score, matchReasons });
    }
  }

  // Strategy 2: If we have a team, look up players in that team
  if (teamId && candidates.length === 0) {
    const teamPlayers = await db
      .query("players")
      .withIndex("by_team", (q) => q.eq("teamId", teamId))
      .collect();

    for (const player of teamPlayers) {
      // Check if already in candidates
      if (candidates.some((c) => c.playerId === player._id)) continue;

      const playerNormalized = normalizeName(player.name);
      const nameSimilarity = calculateSimilarity(normalizedName, playerNormalized);

      if (nameSimilarity > 0.8) {
        const { score, matchReasons } = calculateMatchScore(player, data);
        candidates.push({ playerId: player._id, player, score, matchReasons });
      }
    }
  }

  // Strategy 3: If we have a competition, do a broader search
  if (competitionId && candidates.length === 0) {
    const competitionPlayers = await db
      .query("players")
      .withIndex("by_competition", (q) => q.eq("competitionId", competitionId))
      .collect();

    for (const player of competitionPlayers) {
      // Check if already in candidates
      if (candidates.some((c) => c.playerId === player._id)) continue;

      const playerNormalized = normalizeName(player.name);
      const nameSimilarity = calculateSimilarity(normalizedName, playerNormalized);

      if (nameSimilarity > 0.85) {
        const { score, matchReasons } = calculateMatchScore(player, data);
        candidates.push({ playerId: player._id, player, score, matchReasons });
      }
    }
  }

  // Sort by score descending
  return candidates.sort((a, b) => b.score - a.score);
}

/**
 * Calculate match score between a database player and external data
 */
function calculateMatchScore(
  player: Doc<"players">,
  data: ExternalPlayerData
): { score: number; matchReasons: string[] } {
  const matchReasons: string[] = [];
  let score = 0;

  const playerNormalized = normalizeName(player.name);
  const dataNormalized = normalizeName(data.name);

  // Name matching
  if (playerNormalized === dataNormalized) {
    score = NAME_ONLY_MATCH_SCORE;
    matchReasons.push("exact_name_match");
  } else {
    const similarity = calculateSimilarity(playerNormalized, dataNormalized);
    if (similarity > 0.85) {
      score = similarity * NAME_ONLY_MATCH_SCORE;
      matchReasons.push(`name_similarity_${Math.round(similarity * 100)}%`);
    }
  }

  if (score === 0) return { score: 0, matchReasons: [] };

  // Birth date matching (strong signal)
  if (player.birthDate && data.birthDate) {
    if (player.birthDate === data.birthDate) {
      score += BIRTHDATE_BONUS;
      matchReasons.push("birthdate_match");
    } else {
      // Birthdate mismatch is a strong negative signal
      score = Math.max(0, score - 0.3);
      matchReasons.push("birthdate_mismatch");
    }
  }

  // Nationality matching
  if (player.nationality && data.nationality) {
    const playerNat = player.nationality.toLowerCase();
    const dataNat = data.nationality.toLowerCase();
    if (playerNat === dataNat || playerNat.includes(dataNat) || dataNat.includes(playerNat)) {
      score += NATIONALITY_BONUS;
      matchReasons.push("nationality_match");
    }
  }

  // Team name matching
  if (data.teamName) {
    // We'd need to look up the team to compare - for now skip
    // This is handled by the team-scoped search above
  }

  return { score: Math.min(score, 1), matchReasons };
}

/**
 * Main resolution function - attempts to resolve an external player to a canonical player
 */
export async function resolvePlayer(
  db: DatabaseReader,
  data: ExternalPlayerData,
  competitionId?: Id<"competitions">,
  teamId?: Id<"teams">
): Promise<ResolveResult> {
  // Step 1: Check if we already have this exact external ID
  const existingPlayerId = await findExistingExternalId(db, data.provider, data.providerPlayerId);
  if (existingPlayerId) {
    return {
      playerId: existingPlayerId,
      confidence: EXACT_MATCH_SCORE,
      isNew: false,
      reason: "existing_external_id",
    };
  }

  // Step 2: Find candidate matches
  const candidates = await findCandidateMatches(db, data, competitionId, teamId);

  // No candidates found
  if (candidates.length === 0) {
    return {
      playerId: null,
      confidence: 0,
      isNew: true,
      reason: "no_candidates_found",
    };
  }

  // Single high-confidence match
  if (candidates.length === 1 && candidates[0].score >= CONFIDENCE_THRESHOLD) {
    return {
      playerId: candidates[0].playerId,
      confidence: candidates[0].score,
      isNew: false,
      reason: `single_match: ${candidates[0].matchReasons.join(", ")}`,
    };
  }

  // Multiple candidates - check if top match is clearly better
  if (candidates.length > 1) {
    const [best, second] = candidates;
    const scoreDiff = best.score - second.score;

    // Clear winner with high confidence
    if (best.score >= CONFIDENCE_THRESHOLD && scoreDiff > 0.1) {
      return {
        playerId: best.playerId,
        confidence: best.score,
        isNew: false,
        reason: `best_match_clear_winner: ${best.matchReasons.join(", ")}`,
      };
    }
  }

  // Ambiguous - return for review
  const topCandidate = candidates[0];
  return {
    playerId: topCandidate.score >= CONFIDENCE_THRESHOLD ? topCandidate.playerId : null,
    confidence: topCandidate.score,
    isNew: topCandidate.score < CONFIDENCE_THRESHOLD,
    reason:
      candidates.length > 1
        ? `ambiguous_multiple_candidates_${candidates.length}`
        : `low_confidence_${Math.round(topCandidate.score * 100)}%`,
    candidatePlayerIds: candidates.map((c) => c.playerId),
  };
}

// ============================================================================
// Database Operations
// ============================================================================

/**
 * Create or update external ID mapping
 */
export async function upsertExternalId(
  db: DatabaseWriter,
  playerId: Id<"players">,
  provider: Provider,
  providerPlayerId: string,
  confidence: number,
  providerTeamId?: string,
  providerCompetitionId?: string
): Promise<Id<"playerExternalIds">> {
  const now = Date.now();

  // Check if mapping already exists
  const existing = await db
    .query("playerExternalIds")
    .withIndex("by_player_provider", (q) =>
      q.eq("playerId", playerId).eq("provider", provider)
    )
    .first();

  if (existing) {
    await db.patch(existing._id, {
      providerPlayerId,
      providerTeamId,
      providerCompetitionId,
      confidence,
      updatedAt: now,
    });
    return existing._id;
  }

  return await db.insert("playerExternalIds", {
    playerId,
    provider,
    providerPlayerId,
    providerTeamId,
    providerCompetitionId,
    confidence,
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Add to unresolved queue for manual review
 */
export async function addToReviewQueue(
  db: DatabaseWriter,
  data: ExternalPlayerData,
  payload: unknown,
  reason: string,
  candidatePlayerIds?: Id<"players">[]
): Promise<Id<"unresolvedExternalPlayers">> {
  const now = Date.now();

  // Check if already in queue
  const existing = await db
    .query("unresolvedExternalPlayers")
    .withIndex("by_provider_playerId", (q) =>
      q.eq("provider", data.provider).eq("providerPlayerId", data.providerPlayerId)
    )
    .first();

  if (existing) {
    // Update existing entry
    await db.patch(existing._id, {
      payload,
      candidatePlayerIds,
      reason,
      status: "pending",
      updatedAt: now,
    });
    return existing._id;
  }

  return await db.insert("unresolvedExternalPlayers", {
    provider: data.provider,
    providerPlayerId: data.providerPlayerId,
    payload,
    candidatePlayerIds,
    reason,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Resolve and link a player, handling all edge cases
 */
export async function resolveAndLinkPlayer(
  db: DatabaseWriter,
  data: ExternalPlayerData,
  payload: unknown,
  competitionId?: Id<"competitions">,
  teamId?: Id<"teams">
): Promise<{
  playerId: Id<"players"> | null;
  externalIdCreated: boolean;
  addedToReviewQueue: boolean;
  resolution: ResolveResult;
}> {
  // Resolve the player
  const resolution = await resolvePlayer(db, data, competitionId, teamId);

  // Case 1: High confidence match
  if (resolution.playerId && resolution.confidence >= CONFIDENCE_THRESHOLD) {
    await upsertExternalId(
      db,
      resolution.playerId,
      data.provider,
      data.providerPlayerId,
      resolution.confidence,
      data.teamId,
      competitionId ? competitionId.toString() : undefined
    );
    return {
      playerId: resolution.playerId,
      externalIdCreated: true,
      addedToReviewQueue: false,
      resolution,
    };
  }

  // Case 2: Low confidence or ambiguous - add to review queue
  await addToReviewQueue(db, data, payload, resolution.reason, resolution.candidatePlayerIds);
  return {
    playerId: null,
    externalIdCreated: false,
    addedToReviewQueue: true,
    resolution,
  };
}

// ============================================================================
// Helper for updating normalized names on existing players
// ============================================================================

/**
 * Update all players to have normalized names
 */
export async function ensureNormalizedNames(
  db: DatabaseWriter,
  limit: number = 100
): Promise<number> {
  const players = await db
    .query("players")
    .filter((q) => q.eq(q.field("nameNormalized"), undefined))
    .take(limit);

  let updated = 0;
  for (const player of players) {
    const normalized = normalizeName(player.name);
    await db.patch(player._id, { nameNormalized: normalized });
    updated++;
  }

  return updated;
}
