/**
 * Canonical Metric Schema
 *
 * Shared type definitions for stats, aggregation, and ratings.
 * These types are used by both client and server code.
 */

// ============================================================================
// Position Groups
// ============================================================================

export type PositionGroup = "GK" | "DEF" | "MID" | "ATT";

export const POSITION_GROUPS: readonly PositionGroup[] = [
  "GK",
  "DEF",
  "MID",
  "ATT",
] as const;

// ============================================================================
// Competition Tiers
// ============================================================================

export type Tier =
  | "Platinum"
  | "Diamond"
  | "Elite"
  | "Gold"
  | "Silver"
  | "Bronze";

export const TIERS: readonly Tier[] = [
  "Platinum",
  "Diamond",
  "Elite",
  "Gold",
  "Silver",
  "Bronze",
] as const;

// Tier factors for level score calculation
export const TIER_FACTORS: Record<Tier, number> = {
  Platinum: 1.0,
  Diamond: 0.92,
  Elite: 0.88,
  Gold: 0.85,
  Silver: 0.78,
  Bronze: 0.7,
};

// ============================================================================
// Canonical Stats (per-match)
// ============================================================================

export interface CanonicalStats {
  // Common attacking
  goals?: number;
  assists?: number;
  shots?: number;
  shotsOnTarget?: number;

  // Passing
  passes?: number;
  passAccuracy?: number; // percentage 0-100
  keyPasses?: number;

  // Dribbling
  dribbles?: number;
  dribblesSuccessful?: number;

  // Defensive
  tackles?: number;
  interceptions?: number;
  clearances?: number;
  blocks?: number;

  // Duels
  duelsWon?: number;
  duelsTotal?: number;
  aerialDuelsWon?: number;
  aerialDuelsTotal?: number;

  // Discipline
  foulsCommitted?: number;
  foulsDrawn?: number;
  yellowCards?: number;
  redCards?: number;

  // Goalkeeper specific
  saves?: number;
  goalsConceded?: number;
  cleanSheet?: boolean;
  penaltiesSaved?: number;
  penaltiesMissed?: number;

  // Advanced (when available)
  xG?: number;
  xA?: number;
}

// ============================================================================
// Aggregated Totals
// ============================================================================

export interface AggregatedTotals {
  appearances: number;
  goals?: number;
  assists?: number;
  shots?: number;
  shotsOnTarget?: number;
  passes?: number;
  keyPasses?: number;
  tackles?: number;
  interceptions?: number;
  clearances?: number;
  blocks?: number;
  duelsWon?: number;
  duelsTotal?: number;
  aerialDuelsWon?: number;
  aerialDuelsTotal?: number;
  dribbles?: number;
  dribblesSuccessful?: number;
  foulsCommitted?: number;
  foulsDrawn?: number;
  yellowCards?: number;
  redCards?: number;
  saves?: number;
  goalsConceded?: number;
  cleanSheets?: number;
  xG?: number;
  xA?: number;
}

// ============================================================================
// Per-90 Stats
// ============================================================================

export interface Per90Stats {
  goals?: number;
  assists?: number;
  shots?: number;
  shotsOnTarget?: number;
  passes?: number;
  keyPasses?: number;
  tackles?: number;
  interceptions?: number;
  clearances?: number;
  blocks?: number;
  duelsWon?: number;
  aerialDuelsWon?: number;
  dribbles?: number;
  dribblesSuccessful?: number;
  foulsCommitted?: number;
  foulsDrawn?: number;
  saves?: number;
  goalsConceded?: number;
  xG?: number;
  xA?: number;
}

// ============================================================================
// Rate Stats (derived percentages)
// ============================================================================

export interface RateStats {
  passCompletionRate?: number; // 0-1
  duelWinRate?: number; // 0-1
  aerialWinRate?: number; // 0-1
  dribbleSuccessRate?: number; // 0-1
  shotAccuracy?: number; // 0-1 (shotsOnTarget / shots)
  cleanSheetRate?: number; // 0-1 (cleanSheets / appearances)
  saveRate?: number; // 0-1 (saves / (saves + goalsConceded))
}

// ============================================================================
// Feature Vector for Rating Calculation
// ============================================================================

export interface RatingFeatures {
  // Per90 stats (raw)
  goalsPer90: number;
  assistsPer90: number;
  shotsPer90: number;
  shotsOnTargetPer90: number;
  passesPer90: number;
  keyPassesPer90: number;
  tacklesPer90: number;
  interceptionsPer90: number;
  tacklesInterceptionsPer90: number; // combined defensive
  clearancesPer90: number;
  blocksPer90: number;
  duelsWonPer90: number;
  aerialDuelsWonPer90: number;
  dribblesPer90: number;
  dribblesSuccessfulPer90: number;
  foulsCommittedPer90: number;
  yellowCardsPer90: number;
  redCardsPer90: number;
  cardsPenaltyPer90: number; // yellow + 3*red
  savesPer90: number;
  goalsConcededPer90: number;
  xGPer90: number;
  xAPer90: number;

  // Rate stats
  passCompletionRate: number;
  duelWinRate: number;
  aerialWinRate: number;
  dribbleSuccessRate: number;
  shotAccuracy: number;
  cleanSheetRate: number;
  saveRate: number;

  // Goal contributions
  goalContributionsPer90: number; // goals + assists

  // Sample size
  minutes: number;
  appearances: number;
}

// ============================================================================
// Rating Profile (weights per position group)
// ============================================================================

export interface RatingWeights {
  [metricKey: string]: number;
}

export interface RatingProfile {
  positionGroup: PositionGroup;
  weights: RatingWeights;
  invertMetrics: string[]; // metrics where lower is better
}

// Default rating profiles
export const DEFAULT_RATING_PROFILES: Record<PositionGroup, RatingProfile> = {
  GK: {
    positionGroup: "GK",
    weights: {
      savesPer90: 0.25,
      goalsConcededPer90: 0.25, // inverted
      cleanSheetRate: 0.2,
      saveRate: 0.15,
      passCompletionRate: 0.1,
      clearancesPer90: 0.05,
    },
    invertMetrics: ["goalsConcededPer90"],
  },
  DEF: {
    positionGroup: "DEF",
    weights: {
      tacklesInterceptionsPer90: 0.2,
      aerialWinRate: 0.15,
      duelWinRate: 0.15,
      clearancesPer90: 0.1,
      blocksPer90: 0.08,
      keyPassesPer90: 0.08,
      dribblesSuccessfulPer90: 0.07,
      goalContributionsPer90: 0.07,
      cardsPenaltyPer90: 0.1, // inverted
    },
    invertMetrics: ["cardsPenaltyPer90"],
  },
  MID: {
    positionGroup: "MID",
    weights: {
      keyPassesPer90: 0.18,
      assistsPer90: 0.12,
      passCompletionRate: 0.12,
      tacklesInterceptionsPer90: 0.12,
      duelWinRate: 0.1,
      dribblesSuccessfulPer90: 0.1,
      goalsPer90: 0.08,
      xAPer90: 0.08, // if available, else falls back to 0
      cardsPenaltyPer90: 0.1, // inverted
    },
    invertMetrics: ["cardsPenaltyPer90"],
  },
  ATT: {
    positionGroup: "ATT",
    weights: {
      goalsPer90: 0.2,
      xGPer90: 0.15, // if available
      assistsPer90: 0.1,
      xAPer90: 0.1, // if available
      shotsOnTargetPer90: 0.12,
      keyPassesPer90: 0.1,
      dribbleSuccessRate: 0.08,
      shotAccuracy: 0.08,
      cardsPenaltyPer90: 0.07, // inverted
    },
    invertMetrics: ["cardsPenaltyPer90"],
  },
};

// ============================================================================
// Rolling Stats Result
// ============================================================================

export interface RollingStatsResult {
  minutes: number;
  fromDate: string;
  toDate: string;
  totals: AggregatedTotals;
  per90: Per90Stats;
  rates: RateStats;
  features: RatingFeatures;
}

// ============================================================================
// Rating Result
// ============================================================================

export interface PlayerRatingResult {
  playerId: string;
  competitionId: string;
  positionGroup: PositionGroup;
  rating365: number;
  ratingLast5: number;
  tier?: Tier;
  levelScore: number;
}

export interface CompetitionRatingResult {
  competitionId: string;
  tier?: Tier;
  strengthScore: number;
  playerCount: number;
}

// ============================================================================
// Constants
// ============================================================================

export const MIN_MINUTES_FOR_RATING = 300;
export const ROLLING_WINDOW_DAYS = 365;
export const FORM_WINDOW_MATCHES = 5;
export const TOP_N_FOR_COMPETITION_STRENGTH = 25;
