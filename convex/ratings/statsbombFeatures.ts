/**
 * StatsBomb Feature Extraction
 *
 * Extracts rating-relevant features from raw StatsBomb match and season stats.
 * These features are used to compute player ratings.
 */

import type { StatsBombPlayerMatchStats, StatsBombSeasonPlayerStats } from "../providers/statsbomb";

// ============================================================================
// Types
// ============================================================================

/**
 * Extracted features for rating computation
 * All values are raw totals (not per-90)
 */
export interface StatsBombExtractedFeatures {
  // Minutes
  minutes: number;

  // Shooting
  xG?: number;
  npxG?: number;
  shots?: number;
  shotsOnTarget?: number;
  goals?: number;

  // Passing
  xA?: number;
  passesCompleted?: number;
  passesAttempted?: number;
  passCompletionPct?: number;
  progressivePasses?: number;
  passesIntoFinalThird?: number;
  passesIntoPenaltyArea?: number;
  throughBalls?: number;
  crossesCompleted?: number;
  keyPasses?: number;

  // Carrying
  carries?: number;
  progressiveCarries?: number;
  carriesIntoFinalThird?: number;
  carriesIntoPenaltyArea?: number;
  takeOnsAttempted?: number;
  takeOnsSuccessful?: number;
  takeOnSuccessRate?: number;

  // Creating
  shotCreatingActions?: number;
  goalCreatingActions?: number;
  assists?: number;

  // Defensive
  tackles?: number;
  tacklesWon?: number;
  interceptions?: number;
  blocks?: number;
  clearances?: number;
  aerialDuelsWon?: number;
  aerialDuelsLost?: number;
  aerialDuelWinRate?: number;

  // Pressure
  pressures?: number;
  pressuresSuccessful?: number;
  pressureSuccessRate?: number;
  pressuresInAttackingThird?: number;

  // GK
  saves?: number;
  psxG?: number;
  goalsAgainst?: number;
  savePercentage?: number;

  // OBV (On-Ball Value) - StatsBomb's proprietary player value metric
  obv?: number;
  obvPass?: number;
  obvShot?: number;
  obvDefensiveAction?: number;
  obvDribbleCarry?: number;
  obvGk?: number;
}

/**
 * Per-90 normalized features for rating
 */
export interface StatsBombPer90Features {
  minutes: number;

  // Shooting per 90
  xGPer90?: number;
  npxGPer90?: number;
  shotsPer90?: number;
  goalsPer90?: number;

  // Passing per 90
  xAPer90?: number;
  progressivePassesPer90?: number;
  passesIntoFinalThirdPer90?: number;
  keyPassesPer90?: number;

  // Carrying per 90
  progressiveCarriesPer90?: number;
  carriesIntoFinalThirdPer90?: number;
  takeOnsSuccessfulPer90?: number;

  // Creating per 90
  shotCreatingActionsPer90?: number;
  goalCreatingActionsPer90?: number;
  assistsPer90?: number;

  // Defensive per 90
  tacklesPer90?: number;
  interceptionsPer90?: number;
  blocksPer90?: number;
  clearancesPer90?: number;

  // Pressure per 90
  pressuresPer90?: number;
  pressuresSuccessfulPer90?: number;

  // Rates (already normalized)
  passCompletionPct?: number;
  takeOnSuccessRate?: number;
  aerialDuelWinRate?: number;
  pressureSuccessRate?: number;
  savePercentage?: number;

  // OBV per 90 (On-Ball Value)
  obvPer90?: number;
  obvPassPer90?: number;
  obvShotPer90?: number;
  obvDefensiveActionPer90?: number;
  obvDribbleCarryPer90?: number;
  obvGkPer90?: number;
}

// ============================================================================
// Feature Extraction Functions
// ============================================================================

/**
 * Extract features from raw StatsBomb match stats
 */
export function extractMatchFeatures(
  raw: StatsBombPlayerMatchStats
): StatsBombExtractedFeatures {
  const minutes = raw.player_match_minutes ?? 0;

  // Helper to safely get numeric values
  const num = (key: string): number | undefined => {
    const val = raw[key];
    return typeof val === "number" ? val : undefined;
  };

  // Calculate rates
  const passesAttempted = num("player_match_passes_attempted");
  const passesCompleted = num("player_match_passes_completed");
  const passCompletionPct =
    passesAttempted && passesAttempted > 0
      ? (passesCompleted ?? 0) / passesAttempted
      : undefined;

  const takeOnsAttempted = num("player_match_take_ons_attempted");
  const takeOnsSuccessful = num("player_match_take_ons_won");
  const takeOnSuccessRate =
    takeOnsAttempted && takeOnsAttempted > 0
      ? (takeOnsSuccessful ?? 0) / takeOnsAttempted
      : undefined;

  const aerialDuelsWon = num("player_match_aerials_won");
  const aerialDuelsLost = num("player_match_aerials_lost");
  const aerialDuelWinRate =
    aerialDuelsWon !== undefined && aerialDuelsLost !== undefined
      ? aerialDuelsWon / (aerialDuelsWon + aerialDuelsLost) || 0
      : undefined;

  const pressures = num("player_match_pressures");
  const pressuresSuccessful = num("player_match_pressure_regains");
  const pressureSuccessRate =
    pressures && pressures > 0
      ? (pressuresSuccessful ?? 0) / pressures
      : undefined;

  const saves = num("player_match_saves");
  const shotsOnTargetAgainst = num("player_match_shots_on_target_against");
  const savePercentage =
    shotsOnTargetAgainst && shotsOnTargetAgainst > 0
      ? (saves ?? 0) / shotsOnTargetAgainst
      : undefined;

  return {
    minutes,

    // Shooting
    xG: num("player_match_xg"),
    npxG: num("player_match_npxg"),
    shots: num("player_match_shots_total"),
    shotsOnTarget: num("player_match_shots_on_target"),
    goals: num("player_match_goals"),

    // Passing
    xA: num("player_match_xa"),
    passesCompleted,
    passesAttempted,
    passCompletionPct,
    progressivePasses: num("player_match_progressive_passes_completed"),
    passesIntoFinalThird: num("player_match_passes_into_final_third"),
    passesIntoPenaltyArea: num("player_match_passes_into_penalty_area"),
    throughBalls: num("player_match_through_balls"),
    crossesCompleted: num("player_match_crosses_completed"),
    keyPasses: num("player_match_key_passes"),

    // Carrying
    carries: num("player_match_carries"),
    progressiveCarries: num("player_match_progressive_carries"),
    carriesIntoFinalThird: num("player_match_carries_into_final_third"),
    carriesIntoPenaltyArea: num("player_match_carries_into_penalty_area"),
    takeOnsAttempted,
    takeOnsSuccessful,
    takeOnSuccessRate,

    // Creating
    shotCreatingActions: num("player_match_shot_creating_actions"),
    goalCreatingActions: num("player_match_goal_creating_actions"),
    assists: num("player_match_assists"),

    // Defensive
    tackles: num("player_match_tackles"),
    tacklesWon: num("player_match_tackles_won"),
    interceptions: num("player_match_interceptions"),
    blocks: num("player_match_blocks"),
    clearances: num("player_match_clearances"),
    aerialDuelsWon,
    aerialDuelsLost,
    aerialDuelWinRate,

    // Pressure
    pressures,
    pressuresSuccessful,
    pressureSuccessRate,
    pressuresInAttackingThird: num("player_match_pressures_att_third"),

    // GK
    saves,
    psxG: num("player_match_psxg"),
    goalsAgainst: num("player_match_goals_against"),
    savePercentage,

    // OBV (On-Ball Value)
    obv: num("player_match_obv"),
    obvPass: num("player_match_obv_pass"),
    obvShot: num("player_match_obv_shot"),
    obvDefensiveAction: num("player_match_obv_defensive_action"),
    obvDribbleCarry: num("player_match_obv_dribble_carry"),
    obvGk: num("player_match_obv_gk"),
  };
}

/**
 * Extract features from raw StatsBomb season stats
 */
export function extractSeasonFeatures(
  raw: StatsBombSeasonPlayerStats
): StatsBombExtractedFeatures {
  const minutes = raw.player_season_minutes ?? 0;

  // Helper to safely get numeric values
  const num = (key: string): number | undefined => {
    const val = raw[key];
    return typeof val === "number" ? val : undefined;
  };

  // Calculate rates (same logic as match)
  const passesAttempted = num("player_season_passes_attempted");
  const passesCompleted = num("player_season_passes_completed");
  const passCompletionPct =
    passesAttempted && passesAttempted > 0
      ? (passesCompleted ?? 0) / passesAttempted
      : undefined;

  const takeOnsAttempted = num("player_season_take_ons_attempted");
  const takeOnsSuccessful = num("player_season_take_ons_won");
  const takeOnSuccessRate =
    takeOnsAttempted && takeOnsAttempted > 0
      ? (takeOnsSuccessful ?? 0) / takeOnsAttempted
      : undefined;

  const aerialDuelsWon = num("player_season_aerials_won");
  const aerialDuelsLost = num("player_season_aerials_lost");
  const aerialDuelWinRate =
    aerialDuelsWon !== undefined && aerialDuelsLost !== undefined
      ? aerialDuelsWon / (aerialDuelsWon + aerialDuelsLost) || 0
      : undefined;

  const pressures = num("player_season_pressures");
  const pressuresSuccessful = num("player_season_pressure_regains");
  const pressureSuccessRate =
    pressures && pressures > 0
      ? (pressuresSuccessful ?? 0) / pressures
      : undefined;

  return {
    minutes,

    // Shooting
    xG: num("player_season_xg"),
    npxG: num("player_season_npxg"),
    shots: num("player_season_shots_total"),
    shotsOnTarget: num("player_season_shots_on_target"),
    goals: num("player_season_goals"),

    // Passing
    xA: num("player_season_xa"),
    passesCompleted,
    passesAttempted,
    passCompletionPct,
    progressivePasses: num("player_season_progressive_passes_completed"),
    passesIntoFinalThird: num("player_season_passes_into_final_third"),
    passesIntoPenaltyArea: num("player_season_passes_into_penalty_area"),
    keyPasses: num("player_season_key_passes"),

    // Carrying
    carries: num("player_season_carries"),
    progressiveCarries: num("player_season_progressive_carries"),
    carriesIntoFinalThird: num("player_season_carries_into_final_third"),
    carriesIntoPenaltyArea: num("player_season_carries_into_penalty_area"),
    takeOnsAttempted,
    takeOnsSuccessful,
    takeOnSuccessRate,

    // Creating
    shotCreatingActions: num("player_season_shot_creating_actions"),
    goalCreatingActions: num("player_season_goal_creating_actions"),
    assists: num("player_season_assists"),

    // Defensive
    tackles: num("player_season_tackles"),
    tacklesWon: num("player_season_tackles_won"),
    interceptions: num("player_season_interceptions"),
    blocks: num("player_season_blocks"),
    clearances: num("player_season_clearances"),
    aerialDuelsWon,
    aerialDuelsLost,
    aerialDuelWinRate,

    // Pressure
    pressures,
    pressuresSuccessful,
    pressureSuccessRate,
    pressuresInAttackingThird: num("player_season_pressures_att_third"),

    // GK
    saves: num("player_season_saves"),
    psxG: num("player_season_psxg"),
    goalsAgainst: num("player_season_goals_against"),

    // OBV (On-Ball Value)
    obv: num("player_season_obv"),
    obvPass: num("player_season_obv_pass"),
    obvShot: num("player_season_obv_shot"),
    obvDefensiveAction: num("player_season_obv_defensive_action"),
    obvDribbleCarry: num("player_season_obv_dribble_carry"),
    obvGk: num("player_season_obv_gk"),
  };
}

// ============================================================================
// Per-90 Normalization
// ============================================================================

/**
 * Convert extracted features to per-90 rates
 */
export function normalizeToPer90(
  features: StatsBombExtractedFeatures
): StatsBombPer90Features {
  const { minutes } = features;

  // Helper to calculate per 90 value
  const per90 = (val: number | undefined): number | undefined => {
    if (val === undefined || minutes === 0) return undefined;
    return (val / minutes) * 90;
  };

  return {
    minutes,

    // Shooting per 90
    xGPer90: per90(features.xG),
    npxGPer90: per90(features.npxG),
    shotsPer90: per90(features.shots),
    goalsPer90: per90(features.goals),

    // Passing per 90
    xAPer90: per90(features.xA),
    progressivePassesPer90: per90(features.progressivePasses),
    passesIntoFinalThirdPer90: per90(features.passesIntoFinalThird),
    keyPassesPer90: per90(features.keyPasses),

    // Carrying per 90
    progressiveCarriesPer90: per90(features.progressiveCarries),
    carriesIntoFinalThirdPer90: per90(features.carriesIntoFinalThird),
    takeOnsSuccessfulPer90: per90(features.takeOnsSuccessful),

    // Creating per 90
    shotCreatingActionsPer90: per90(features.shotCreatingActions),
    goalCreatingActionsPer90: per90(features.goalCreatingActions),
    assistsPer90: per90(features.assists),

    // Defensive per 90
    tacklesPer90: per90(features.tackles),
    interceptionsPer90: per90(features.interceptions),
    blocksPer90: per90(features.blocks),
    clearancesPer90: per90(features.clearances),

    // Pressure per 90
    pressuresPer90: per90(features.pressures),
    pressuresSuccessfulPer90: per90(features.pressuresSuccessful),

    // Rates (already normalized, pass through)
    passCompletionPct: features.passCompletionPct,
    takeOnSuccessRate: features.takeOnSuccessRate,
    aerialDuelWinRate: features.aerialDuelWinRate,
    pressureSuccessRate: features.pressureSuccessRate,
    savePercentage: features.savePercentage,

    // OBV per 90
    obvPer90: per90(features.obv),
    obvPassPer90: per90(features.obvPass),
    obvShotPer90: per90(features.obvShot),
    obvDefensiveActionPer90: per90(features.obvDefensiveAction),
    obvDribbleCarryPer90: per90(features.obvDribbleCarry),
    obvGkPer90: per90(features.obvGk),
  };
}

// ============================================================================
// Feature Aggregation
// ============================================================================

/**
 * Aggregate multiple match features into a single feature set
 */
export function aggregateMatchFeatures(
  matches: StatsBombExtractedFeatures[]
): StatsBombExtractedFeatures {
  if (matches.length === 0) {
    return { minutes: 0 };
  }

  // Sum all numeric features
  const result: StatsBombExtractedFeatures = { minutes: 0 };

  for (const match of matches) {
    result.minutes += match.minutes;

    // Sum each feature
    const featureKeys = Object.keys(match) as (keyof StatsBombExtractedFeatures)[];
    for (const key of featureKeys) {
      if (key === "minutes") continue;

      const val = match[key];
      if (typeof val === "number") {
        // Skip rate fields (will recalculate)
        if (key.includes("Rate") || key.includes("Pct") || key.includes("Percentage")) {
          continue;
        }
        const currentVal = result[key];
        const currentNum = typeof currentVal === "number" ? currentVal : 0;
        // Use type assertion for dynamic key assignment
        (result as unknown as Record<string, number>)[key] = currentNum + val;
      }
    }
  }

  // Recalculate rates from aggregated totals
  if (result.passesAttempted && result.passesAttempted > 0) {
    result.passCompletionPct = (result.passesCompleted ?? 0) / result.passesAttempted;
  }

  if (result.takeOnsAttempted && result.takeOnsAttempted > 0) {
    result.takeOnSuccessRate = (result.takeOnsSuccessful ?? 0) / result.takeOnsAttempted;
  }

  if (result.aerialDuelsWon !== undefined && result.aerialDuelsLost !== undefined) {
    const total = result.aerialDuelsWon + result.aerialDuelsLost;
    result.aerialDuelWinRate = total > 0 ? result.aerialDuelsWon / total : 0;
  }

  if (result.pressures && result.pressures > 0) {
    result.pressureSuccessRate = (result.pressuresSuccessful ?? 0) / result.pressures;
  }

  return result;
}

// ============================================================================
// Position-Specific Feature Selection
// ============================================================================

type PositionGroup = "GK" | "DEF" | "MID" | "ATT";

/**
 * Get the most relevant features for a position group
 */
export function getRelevantFeaturesForPosition(
  positionGroup: PositionGroup
): (keyof StatsBombPer90Features)[] {
  switch (positionGroup) {
    case "GK":
      return [
        "savePercentage",
        "goalsPer90", // goals against
        "obvGkPer90", // OBV for goalkeepers
      ];

    case "DEF":
      return [
        "tacklesPer90",
        "interceptionsPer90",
        "blocksPer90",
        "clearancesPer90",
        "aerialDuelWinRate",
        "pressuresPer90",
        "progressivePassesPer90",
        "progressiveCarriesPer90",
        "passCompletionPct",
        "obvPer90", // Total OBV
        "obvDefensiveActionPer90", // Defensive OBV
        "obvPassPer90", // Pass OBV
      ];

    case "MID":
      return [
        "xGPer90",
        "xAPer90",
        "progressivePassesPer90",
        "progressiveCarriesPer90",
        "keyPassesPer90",
        "tacklesPer90",
        "interceptionsPer90",
        "pressuresPer90",
        "passCompletionPct",
        "shotCreatingActionsPer90",
        "obvPer90", // Total OBV
        "obvPassPer90", // Pass OBV
        "obvDribbleCarryPer90", // Dribble/carry OBV
      ];

    case "ATT":
      return [
        "xGPer90",
        "npxGPer90",
        "xAPer90",
        "shotsPer90",
        "goalsPer90",
        "assistsPer90",
        "shotCreatingActionsPer90",
        "goalCreatingActionsPer90",
        "takeOnsSuccessfulPer90",
        "pressuresPer90",
        "obvPer90", // Total OBV
        "obvShotPer90", // Shot OBV
        "obvDribbleCarryPer90", // Dribble/carry OBV
      ];

    default:
      return [
        "xGPer90",
        "xAPer90",
        "progressivePassesPer90",
        "progressiveCarriesPer90",
        "pressuresPer90",
        "obvPer90", // Total OBV
      ];
  }
}
