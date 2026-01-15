/**
 * Rating Scoring Functions
 *
 * Computes player ratings using percentile-based normalization
 * with position-specific weights.
 */

import type {
  PositionGroup,
  RatingFeatures,
  RatingWeights,
  Tier,
} from "../lib/metrics";
import { TIER_FACTORS, DEFAULT_RATING_PROFILES } from "../lib/metrics";

// ============================================================================
// Percentile Computation
// ============================================================================

/**
 * Compute percentile rank for a value within a sorted array
 * Returns value between 0 and 1
 */
export function computePercentile(value: number, sortedValues: number[]): number {
  if (sortedValues.length === 0) return 0.5;
  if (sortedValues.length === 1) return 0.5;

  // Count how many values are strictly less than this value
  let countLess = 0;
  let countEqual = 0;

  for (const v of sortedValues) {
    if (v < value) countLess++;
    else if (v === value) countEqual++;
  }

  // Use mid-rank percentile: (count_less + 0.5 * count_equal) / total
  return (countLess + 0.5 * countEqual) / sortedValues.length;
}

/**
 * Build percentile distributions for all features from player feature vectors
 */
export function buildPercentileDistributions(
  playerFeatures: RatingFeatures[]
): Map<keyof RatingFeatures, number[]> {
  const distributions = new Map<keyof RatingFeatures, number[]>();

  // List of feature keys to include
  const featureKeys: (keyof RatingFeatures)[] = [
    "goalsPer90",
    "assistsPer90",
    "shotsPer90",
    "shotsOnTargetPer90",
    "passesPer90",
    "keyPassesPer90",
    "tacklesPer90",
    "interceptionsPer90",
    "tacklesInterceptionsPer90",
    "clearancesPer90",
    "blocksPer90",
    "duelsWonPer90",
    "aerialDuelsWonPer90",
    "dribblesPer90",
    "dribblesSuccessfulPer90",
    "foulsCommittedPer90",
    "yellowCardsPer90",
    "redCardsPer90",
    "cardsPenaltyPer90",
    "savesPer90",
    "goalsConcededPer90",
    "xGPer90",
    "xAPer90",
    "passCompletionRate",
    "duelWinRate",
    "aerialWinRate",
    "dribbleSuccessRate",
    "shotAccuracy",
    "cleanSheetRate",
    "saveRate",
    "goalContributionsPer90",
  ];

  for (const key of featureKeys) {
    const values = playerFeatures
      .map((f) => f[key] as number)
      .filter((v) => v !== undefined && v !== null && !isNaN(v));

    // Sort ascending for percentile computation
    values.sort((a, b) => a - b);
    distributions.set(key, values);
  }

  return distributions;
}

/**
 * Build percentile distributions for a specific position group
 */
export function buildPositionGroupDistributions(
  playerFeatures: Array<{
    positionGroup: PositionGroup;
    features: RatingFeatures;
  }>,
  positionGroup: PositionGroup
): Map<keyof RatingFeatures, number[]> {
  const filtered = playerFeatures
    .filter((p) => p.positionGroup === positionGroup)
    .map((p) => p.features);

  return buildPercentileDistributions(filtered);
}

// ============================================================================
// Rating Calculation
// ============================================================================

/**
 * Compute raw rating score from feature vector using weights and percentile normalization
 */
export function computeRatingScore(
  features: RatingFeatures,
  weights: RatingWeights,
  invertMetrics: string[],
  distributions: Map<keyof RatingFeatures, number[]>
): number {
  let totalWeight = 0;
  let weightedSum = 0;

  for (const [metricKey, weight] of Object.entries(weights)) {
    if (weight === 0) continue;

    const featureKey = metricKey as keyof RatingFeatures;
    const value = features[featureKey];

    if (value === undefined || value === null || isNaN(value as number)) {
      // Skip missing metrics - they don't contribute to the score
      continue;
    }

    const distribution = distributions.get(featureKey);
    if (!distribution || distribution.length === 0) {
      continue;
    }

    // Compute percentile (0-1)
    let percentile = computePercentile(value as number, distribution);

    // Invert if this is a "lower is better" metric
    if (invertMetrics.includes(metricKey)) {
      percentile = 1 - percentile;
    }

    weightedSum += percentile * weight;
    totalWeight += weight;
  }

  // Return weighted average (0-1)
  if (totalWeight === 0) return 0.5; // Default to middle if no metrics available

  return weightedSum / totalWeight;
}

/**
 * Convert raw score (0-1) to rating (0-100)
 */
export function scoreToRating(score: number): number {
  // Map 0-1 to 0-100 with some non-linearity to spread middle values
  // Using a gentle S-curve: 100 * (score ^ 0.9)
  // This slightly compresses low values and expands high values
  const rating = Math.round(100 * Math.pow(score, 0.9));
  return Math.max(0, Math.min(100, rating));
}

/**
 * Compute level score adjusted by tier
 */
export function computeLevelScore(rating365: number, tier?: Tier): number {
  const tierFactor = tier ? TIER_FACTORS[tier] : TIER_FACTORS.Bronze;
  const levelScore = Math.round(rating365 * tierFactor);
  return Math.max(0, Math.min(100, levelScore));
}

// ============================================================================
// Full Rating Computation
// ============================================================================

export interface PlayerRatingInput {
  playerId: string;
  competitionId: string;
  positionGroup: PositionGroup;
  features365: RatingFeatures;
  featuresLast5: RatingFeatures;
  tier?: Tier;
}

export interface ComputedRating {
  playerId: string;
  competitionId: string;
  positionGroup: PositionGroup;
  rating365: number;
  ratingLast5: number;
  tier?: Tier;
  levelScore: number;
}

/**
 * Compute ratings for all players using position-group-specific distributions
 */
export function computeAllRatings(
  players: PlayerRatingInput[],
  customProfiles?: Map<PositionGroup, { weights: RatingWeights; invertMetrics: string[] }>
): ComputedRating[] {
  // Build distributions for each position group
  const distributionsByPosition = new Map<
    PositionGroup,
    {
      rolling365: Map<keyof RatingFeatures, number[]>;
      last5: Map<keyof RatingFeatures, number[]>;
    }
  >();

  const positionGroups: PositionGroup[] = ["GK", "DEF", "MID", "ATT"];

  for (const pg of positionGroups) {
    const pgPlayers = players.filter((p) => p.positionGroup === pg);

    distributionsByPosition.set(pg, {
      rolling365: buildPercentileDistributions(pgPlayers.map((p) => p.features365)),
      last5: buildPercentileDistributions(pgPlayers.map((p) => p.featuresLast5)),
    });
  }

  // Compute ratings for each player
  const results: ComputedRating[] = [];

  for (const player of players) {
    const profile = customProfiles?.get(player.positionGroup) ??
      DEFAULT_RATING_PROFILES[player.positionGroup];

    const distributions = distributionsByPosition.get(player.positionGroup);
    if (!distributions) continue;

    // Compute raw scores
    const score365 = computeRatingScore(
      player.features365,
      profile.weights,
      profile.invertMetrics,
      distributions.rolling365
    );

    const scoreLast5 = computeRatingScore(
      player.featuresLast5,
      profile.weights,
      profile.invertMetrics,
      distributions.last5
    );

    // Convert to ratings
    const rating365 = scoreToRating(score365);
    const ratingLast5 = scoreToRating(scoreLast5);

    // Compute level score
    const levelScore = computeLevelScore(rating365, player.tier);

    results.push({
      playerId: player.playerId,
      competitionId: player.competitionId,
      positionGroup: player.positionGroup,
      rating365,
      ratingLast5,
      tier: player.tier,
      levelScore,
    });
  }

  return results;
}

// ============================================================================
// Competition Strength
// ============================================================================

/**
 * Compute competition strength score from player level scores
 * Uses average of top N players
 */
export function computeCompetitionStrength(
  playerLevelScores: number[],
  topN: number = 25
): number {
  if (playerLevelScores.length === 0) return 0;

  // Sort descending and take top N
  const sorted = [...playerLevelScores].sort((a, b) => b - a);
  const topPlayers = sorted.slice(0, Math.min(topN, sorted.length));

  // Average
  const avg = topPlayers.reduce((a, b) => a + b, 0) / topPlayers.length;

  return Math.round(avg);
}
