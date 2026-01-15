/**
 * Canonical Merge Utilities
 *
 * Merges data from multiple providers into canonical player records.
 * Implements field precedence rules and conflict detection.
 */

import { Doc, Id } from "../_generated/dataModel";
import { DatabaseWriter } from "../_generated/server";
import type { Provider } from "../resolve/resolvePlayer";

// ============================================================================
// Types
// ============================================================================

export type PreferredFoot = "left" | "right" | "both";
export type PositionGroup = "GK" | "DEF" | "MID" | "ATT";

export interface NormalizedProfile {
  name?: string;
  birthDate?: string;
  nationality?: string;
  heightCm?: number;
  weightKg?: number;
  preferredFoot?: PreferredFoot;
  photoUrl?: string;
  position?: string;
  positionGroup?: PositionGroup;
}

export interface MergeConflict {
  field: string;
  canonicalValue: unknown;
  providerValue: unknown;
  provider: Provider;
}

export interface MergeResult {
  updatedFields: string[];
  conflicts: MergeConflict[];
  profileStored: boolean;
}

// ============================================================================
// Field Precedence Configuration
// ============================================================================

/**
 * Provider precedence for each field.
 * Higher number = higher priority.
 * API-Football is our primary source, enrichment providers fill gaps.
 */
export const FIELD_PRECEDENCE: Record<string, Record<Provider, number>> = {
  // Basic info - primary source is most trusted
  name: {
    apiFootball: 100,
    fotmob: 50,
    sofascore: 50,
    thesportsdb: 40,
    wikidata: 30,
    footballdata: 20,
  },
  birthDate: {
    apiFootball: 100,
    wikidata: 90, // Wikipedia is reliable for birth dates
    sofascore: 80,
    fotmob: 80,
    thesportsdb: 70,
    footballdata: 60,
  },
  nationality: {
    apiFootball: 100,
    wikidata: 90,
    sofascore: 80,
    fotmob: 80,
    thesportsdb: 70,
    footballdata: 60,
  },
  // Physical attributes - sports sites are better
  heightCm: {
    sofascore: 100,
    fotmob: 90,
    apiFootball: 80,
    thesportsdb: 70,
    wikidata: 60,
    footballdata: 50,
  },
  weightKg: {
    sofascore: 100,
    fotmob: 90,
    apiFootball: 80,
    thesportsdb: 70,
    wikidata: 60,
    footballdata: 50,
  },
  preferredFoot: {
    sofascore: 100,
    fotmob: 90,
    apiFootball: 80,
    thesportsdb: 70,
    wikidata: 60,
    footballdata: 50,
  },
  // Photos - prefer higher quality sources
  photoUrl: {
    apiFootball: 100,
    sofascore: 90,
    fotmob: 80,
    thesportsdb: 70,
    wikidata: 60,
    footballdata: 50,
  },
  // Position - primary source is most accurate for current position
  position: {
    apiFootball: 100,
    fotmob: 80,
    sofascore: 80,
    thesportsdb: 60,
    wikidata: 40,
    footballdata: 50,
  },
  positionGroup: {
    apiFootball: 100,
    fotmob: 80,
    sofascore: 80,
    thesportsdb: 60,
    wikidata: 40,
    footballdata: 50,
  },
};

/**
 * Get precedence score for a field and provider
 */
function getPrecedence(field: string, provider: Provider): number {
  const fieldPrec = FIELD_PRECEDENCE[field];
  if (!fieldPrec) return 50; // Default precedence
  return fieldPrec[provider] ?? 50;
}

// ============================================================================
// Value Comparison Utilities
// ============================================================================

/**
 * Check if two values are effectively equal
 */
function valuesEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null && b == null) return true;
  if (a == null || b == null) return false;

  // String comparison (case insensitive)
  if (typeof a === "string" && typeof b === "string") {
    return a.toLowerCase().trim() === b.toLowerCase().trim();
  }

  // Number comparison (allow small floating point differences)
  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) < 0.001;
  }

  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Check if a value is empty/null/undefined
 */
function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  return false;
}

// ============================================================================
// Merge Functions
// ============================================================================

/**
 * Determine if a new value should override the current canonical value
 */
function shouldOverride(
  field: string,
  canonicalValue: unknown,
  newValue: unknown,
  newProvider: Provider,
  currentProvider?: Provider
): boolean {
  // If canonical is empty, always use new value
  if (isEmpty(canonicalValue)) return true;

  // If new value is empty, don't override
  if (isEmpty(newValue)) return false;

  // If values are equal, no need to override
  if (valuesEqual(canonicalValue, newValue)) return false;

  // Compare precedence
  const currentPrecedence = currentProvider ? getPrecedence(field, currentProvider) : 0;
  const newPrecedence = getPrecedence(field, newProvider);

  return newPrecedence > currentPrecedence;
}

/**
 * Merge a provider profile into canonical player data
 */
export async function mergeProviderProfile(
  db: DatabaseWriter,
  playerId: Id<"players">,
  provider: Provider,
  profile: NormalizedProfile,
  rawProfile: unknown
): Promise<MergeResult> {
  const player = await db.get(playerId);
  if (!player) {
    throw new Error(`Player not found: ${playerId}`);
  }

  const now = Date.now();
  const updatedFields: string[] = [];
  const conflicts: MergeConflict[] = [];
  const updates: Partial<Doc<"players">> = {};

  // Get existing provider profiles to determine current source of truth
  const existingProfile = await db
    .query("providerPlayerProfiles")
    .withIndex("by_player_provider", (q) =>
      q.eq("playerId", playerId).eq("provider", provider)
    )
    .first();

  // Fields to potentially merge
  const mergeableFields: (keyof NormalizedProfile)[] = [
    "birthDate",
    "nationality",
    "heightCm",
    "weightKg",
    "preferredFoot",
    "photoUrl",
    "position",
    "positionGroup",
  ];

  for (const field of mergeableFields) {
    const newValue = profile[field];
    if (isEmpty(newValue)) continue;

    const canonicalValue = player[field as keyof Doc<"players">];
    const shouldUpdate = shouldOverride(field, canonicalValue, newValue, provider);

    if (shouldUpdate) {
      // Check for conflict (non-empty canonical value being overridden)
      if (!isEmpty(canonicalValue) && !valuesEqual(canonicalValue, newValue)) {
        conflicts.push({
          field,
          canonicalValue,
          providerValue: newValue,
          provider,
        });
      }

      (updates as Record<string, unknown>)[field] = newValue;
      updatedFields.push(field);
    } else if (!isEmpty(canonicalValue) && !valuesEqual(canonicalValue, newValue)) {
      // Log conflict even when not updating
      conflicts.push({
        field,
        canonicalValue,
        providerValue: newValue,
        provider,
      });
    }
  }

  // Apply updates to player
  if (Object.keys(updates).length > 0) {
    updates.updatedAt = now;
    await db.patch(playerId, updates);
  }

  // Store/update provider profile
  if (existingProfile) {
    await db.patch(existingProfile._id, {
      profile: rawProfile,
      normalized: profile,
      fetchedAt: now,
    });
  } else {
    await db.insert("providerPlayerProfiles", {
      playerId,
      provider,
      profile: rawProfile,
      normalized: profile,
      fetchedAt: now,
    });
  }

  // Log conflicts to playerFieldConflicts table
  for (const conflict of conflicts) {
    await logConflict(db, playerId, conflict, now);
  }

  return {
    updatedFields,
    conflicts,
    profileStored: true,
  };
}

/**
 * Log a field conflict for later resolution
 */
async function logConflict(
  db: DatabaseWriter,
  playerId: Id<"players">,
  conflict: MergeConflict,
  timestamp: number
): Promise<void> {
  // Check if conflict already exists
  const existing = await db
    .query("playerFieldConflicts")
    .withIndex("by_player_field", (q) =>
      q.eq("playerId", playerId).eq("field", conflict.field)
    )
    .filter((q) => q.eq(q.field("provider"), conflict.provider))
    .first();

  if (existing) {
    // Update existing conflict
    await db.patch(existing._id, {
      canonicalValue: conflict.canonicalValue,
      providerValue: conflict.providerValue,
      resolved: false,
      fetchedAt: timestamp,
    });
  } else {
    // Create new conflict record
    await db.insert("playerFieldConflicts", {
      playerId,
      field: conflict.field,
      canonicalValue: conflict.canonicalValue,
      provider: conflict.provider,
      providerValue: conflict.providerValue,
      resolved: false,
      fetchedAt: timestamp,
    });
  }
}

// ============================================================================
// Stats Merge Utilities
// ============================================================================

export interface ProviderStats {
  appearances?: number;
  minutes?: number;
  goals?: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
  xG?: number;
  xA?: number;
  npxG?: number;
  xGPer90?: number;
  xAPer90?: number;
  goalsPer90?: number;
  assistsPer90?: number;
  rating?: number;
}

/**
 * Store provider-specific aggregated stats
 */
export async function storeProviderAggregates(
  db: DatabaseWriter,
  playerId: Id<"players">,
  provider: Provider,
  stats: ProviderStats,
  options: {
    window: "365" | "season" | "career";
    competitionId?: Id<"competitions">;
    season?: string;
    fromDate?: string;
    toDate?: string;
  }
): Promise<Id<"providerPlayerAggregates">> {
  const now = Date.now();

  // Check if aggregate already exists
  const existing = await db
    .query("providerPlayerAggregates")
    .withIndex("by_player_provider_window", (q) =>
      q.eq("playerId", playerId).eq("provider", provider).eq("window", options.window)
    )
    .first();

  // Build totals object
  const totals: Record<string, number> = {};
  if (stats.appearances !== undefined) totals.appearances = stats.appearances;
  if (stats.goals !== undefined) totals.goals = stats.goals;
  if (stats.assists !== undefined) totals.assists = stats.assists;
  if (stats.yellowCards !== undefined) totals.yellowCards = stats.yellowCards;
  if (stats.redCards !== undefined) totals.redCards = stats.redCards;
  if (stats.xG !== undefined) totals.xG = stats.xG;
  if (stats.xA !== undefined) totals.xA = stats.xA;

  // Build per90 object
  const per90: Record<string, number> = {};
  if (stats.goalsPer90 !== undefined) per90.goals = stats.goalsPer90;
  if (stats.assistsPer90 !== undefined) per90.assists = stats.assistsPer90;
  if (stats.xGPer90 !== undefined) per90.xG = stats.xGPer90;
  if (stats.xAPer90 !== undefined) per90.xA = stats.xAPer90;

  // Build additional stats
  const additionalStats: Record<string, number> = {};
  if (stats.xG !== undefined) additionalStats.xG = stats.xG;
  if (stats.xA !== undefined) additionalStats.xA = stats.xA;
  if (stats.xGPer90 !== undefined) additionalStats.xGPer90 = stats.xGPer90;
  if (stats.xAPer90 !== undefined) additionalStats.xAPer90 = stats.xAPer90;
  if (stats.npxG !== undefined) additionalStats.npxG = stats.npxG;

  const data = {
    playerId,
    provider,
    competitionId: options.competitionId,
    window: options.window,
    fromDate: options.fromDate,
    toDate: options.toDate,
    season: options.season,
    minutes: stats.minutes,
    appearances: stats.appearances,
    totals: Object.keys(totals).length > 0 ? { appearances: stats.appearances ?? 0, ...totals } : undefined,
    per90: Object.keys(per90).length > 0 ? per90 : undefined,
    additionalStats: Object.keys(additionalStats).length > 0 ? additionalStats : undefined,
    fetchedAt: now,
  };

  if (existing) {
    await db.patch(existing._id, data);
    return existing._id;
  }

  return await db.insert("providerPlayerAggregates", data);
}

// ============================================================================
// Conflict Resolution
// ============================================================================

/**
 * Resolve a conflict by accepting a specific value
 */
export async function resolveConflict(
  db: DatabaseWriter,
  conflictId: Id<"playerFieldConflicts">,
  acceptedValue: unknown
): Promise<void> {
  const conflict = await db.get(conflictId);
  if (!conflict) {
    throw new Error(`Conflict not found: ${conflictId}`);
  }

  const now = Date.now();

  // Update the player with the accepted value
  const player = await db.get(conflict.playerId);
  if (player) {
    await db.patch(conflict.playerId, {
      [conflict.field]: acceptedValue,
      updatedAt: now,
    });
  }

  // Mark conflict as resolved
  await db.patch(conflictId, {
    resolved: true,
    resolvedValue: acceptedValue,
    resolvedAt: now,
  });
}

/**
 * Get all unresolved conflicts for a player
 */
export async function getUnresolvedConflicts(
  db: DatabaseWriter,
  playerId: Id<"players">
): Promise<Doc<"playerFieldConflicts">[]> {
  return await db
    .query("playerFieldConflicts")
    .withIndex("by_player_field", (q) => q.eq("playerId", playerId))
    .filter((q) => q.eq(q.field("resolved"), false))
    .collect();
}
