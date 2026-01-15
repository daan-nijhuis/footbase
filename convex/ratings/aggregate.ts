/**
 * Aggregation Functions for Player Stats
 *
 * Computes rolling totals, per-90 stats, and derived features from appearances.
 */

import type { Doc } from "../_generated/dataModel";
import type {
  AggregatedTotals,
  Per90Stats,
  RateStats,
  RatingFeatures,
  RollingStatsResult,
} from "../lib/metrics";

// ============================================================================
// Aggregation: Compute totals from appearances
// ============================================================================

export function aggregateAppearances(
  appearances: Doc<"appearances">[]
): AggregatedTotals {
  const totals: AggregatedTotals = {
    appearances: appearances.length,
    goals: 0,
    assists: 0,
    shots: 0,
    shotsOnTarget: 0,
    passes: 0,
    keyPasses: 0,
    tackles: 0,
    interceptions: 0,
    clearances: 0,
    blocks: 0,
    duelsWon: 0,
    duelsTotal: 0,
    aerialDuelsWon: 0,
    aerialDuelsTotal: 0,
    dribbles: 0,
    dribblesSuccessful: 0,
    foulsCommitted: 0,
    foulsDrawn: 0,
    yellowCards: 0,
    redCards: 0,
    saves: 0,
    goalsConceded: 0,
    cleanSheets: 0,
    xG: 0,
    xA: 0,
  };

  for (const app of appearances) {
    const s = app.stats;

    totals.goals = (totals.goals ?? 0) + (s.goals ?? 0);
    totals.assists = (totals.assists ?? 0) + (s.assists ?? 0);
    totals.shots = (totals.shots ?? 0) + (s.shots ?? 0);
    totals.shotsOnTarget = (totals.shotsOnTarget ?? 0) + (s.shotsOnTarget ?? 0);
    totals.passes = (totals.passes ?? 0) + (s.passes ?? 0);
    totals.keyPasses = (totals.keyPasses ?? 0) + (s.keyPasses ?? 0);
    totals.tackles = (totals.tackles ?? 0) + (s.tackles ?? 0);
    totals.interceptions = (totals.interceptions ?? 0) + (s.interceptions ?? 0);
    totals.clearances = (totals.clearances ?? 0) + (s.clearances ?? 0);
    totals.blocks = (totals.blocks ?? 0) + (s.blocks ?? 0);
    totals.duelsWon = (totals.duelsWon ?? 0) + (s.duelsWon ?? 0);
    totals.duelsTotal = (totals.duelsTotal ?? 0) + (s.duelsTotal ?? 0);
    totals.aerialDuelsWon =
      (totals.aerialDuelsWon ?? 0) + (s.aerialDuelsWon ?? 0);
    totals.aerialDuelsTotal =
      (totals.aerialDuelsTotal ?? 0) + (s.aerialDuelsTotal ?? 0);
    totals.dribbles = (totals.dribbles ?? 0) + (s.dribbles ?? 0);
    totals.dribblesSuccessful =
      (totals.dribblesSuccessful ?? 0) + (s.dribblesSuccessful ?? 0);
    totals.foulsCommitted =
      (totals.foulsCommitted ?? 0) + (s.foulsCommitted ?? 0);
    totals.foulsDrawn = (totals.foulsDrawn ?? 0) + (s.foulsDrawn ?? 0);
    totals.yellowCards = (totals.yellowCards ?? 0) + (s.yellowCards ?? 0);
    totals.redCards = (totals.redCards ?? 0) + (s.redCards ?? 0);
    totals.saves = (totals.saves ?? 0) + (s.saves ?? 0);
    totals.goalsConceded = (totals.goalsConceded ?? 0) + (s.goalsConceded ?? 0);
    totals.xG = (totals.xG ?? 0) + (s.xG ?? 0);
    totals.xA = (totals.xA ?? 0) + (s.xA ?? 0);

    if (s.cleanSheet) {
      totals.cleanSheets = (totals.cleanSheets ?? 0) + 1;
    }
  }

  return totals;
}

// ============================================================================
// Per-90 Calculation
// ============================================================================

export function computePer90(totals: AggregatedTotals, minutes: number): Per90Stats {
  if (minutes === 0) {
    return {};
  }

  const factor = 90 / minutes;

  return {
    goals: totals.goals !== undefined ? totals.goals * factor : undefined,
    assists: totals.assists !== undefined ? totals.assists * factor : undefined,
    shots: totals.shots !== undefined ? totals.shots * factor : undefined,
    shotsOnTarget:
      totals.shotsOnTarget !== undefined
        ? totals.shotsOnTarget * factor
        : undefined,
    passes: totals.passes !== undefined ? totals.passes * factor : undefined,
    keyPasses:
      totals.keyPasses !== undefined ? totals.keyPasses * factor : undefined,
    tackles: totals.tackles !== undefined ? totals.tackles * factor : undefined,
    interceptions:
      totals.interceptions !== undefined
        ? totals.interceptions * factor
        : undefined,
    clearances:
      totals.clearances !== undefined ? totals.clearances * factor : undefined,
    blocks: totals.blocks !== undefined ? totals.blocks * factor : undefined,
    duelsWon:
      totals.duelsWon !== undefined ? totals.duelsWon * factor : undefined,
    aerialDuelsWon:
      totals.aerialDuelsWon !== undefined
        ? totals.aerialDuelsWon * factor
        : undefined,
    dribbles:
      totals.dribbles !== undefined ? totals.dribbles * factor : undefined,
    dribblesSuccessful:
      totals.dribblesSuccessful !== undefined
        ? totals.dribblesSuccessful * factor
        : undefined,
    foulsCommitted:
      totals.foulsCommitted !== undefined
        ? totals.foulsCommitted * factor
        : undefined,
    foulsDrawn:
      totals.foulsDrawn !== undefined ? totals.foulsDrawn * factor : undefined,
    saves: totals.saves !== undefined ? totals.saves * factor : undefined,
    goalsConceded:
      totals.goalsConceded !== undefined
        ? totals.goalsConceded * factor
        : undefined,
    xG: totals.xG !== undefined ? totals.xG * factor : undefined,
    xA: totals.xA !== undefined ? totals.xA * factor : undefined,
  };
}

// ============================================================================
// Rate Stats Calculation
// ============================================================================

export function computeRates(
  totals: AggregatedTotals,
  minutes: number,
  appearances: Doc<"appearances">[]
): RateStats {
  const rates: RateStats = {};

  // Pass completion rate - use average of passAccuracy from appearances
  const passAccuracies = appearances
    .map((a) => a.stats.passAccuracy)
    .filter((v): v is number => v !== undefined && v !== null);
  if (passAccuracies.length > 0) {
    rates.passCompletionRate =
      passAccuracies.reduce((a, b) => a + b, 0) / passAccuracies.length / 100;
  }

  // Duel win rate
  if (totals.duelsTotal && totals.duelsTotal > 0) {
    rates.duelWinRate = (totals.duelsWon ?? 0) / totals.duelsTotal;
  }

  // Aerial win rate
  if (totals.aerialDuelsTotal && totals.aerialDuelsTotal > 0) {
    rates.aerialWinRate = (totals.aerialDuelsWon ?? 0) / totals.aerialDuelsTotal;
  }

  // Dribble success rate
  if (totals.dribbles && totals.dribbles > 0) {
    rates.dribbleSuccessRate =
      (totals.dribblesSuccessful ?? 0) / totals.dribbles;
  }

  // Shot accuracy
  if (totals.shots && totals.shots > 0) {
    rates.shotAccuracy = (totals.shotsOnTarget ?? 0) / totals.shots;
  }

  // Clean sheet rate
  if (totals.appearances > 0) {
    rates.cleanSheetRate = (totals.cleanSheets ?? 0) / totals.appearances;
  }

  // Save rate (for GK)
  const shotsAgainst = (totals.saves ?? 0) + (totals.goalsConceded ?? 0);
  if (shotsAgainst > 0) {
    rates.saveRate = (totals.saves ?? 0) / shotsAgainst;
  }

  return rates;
}

// ============================================================================
// Feature Vector Computation
// ============================================================================

export function computeFeatures(
  totals: AggregatedTotals,
  per90: Per90Stats,
  rates: RateStats,
  minutes: number
): RatingFeatures {
  const factor = minutes > 0 ? 90 / minutes : 0;

  return {
    // Per90 stats
    goalsPer90: per90.goals ?? 0,
    assistsPer90: per90.assists ?? 0,
    shotsPer90: per90.shots ?? 0,
    shotsOnTargetPer90: per90.shotsOnTarget ?? 0,
    passesPer90: per90.passes ?? 0,
    keyPassesPer90: per90.keyPasses ?? 0,
    tacklesPer90: per90.tackles ?? 0,
    interceptionsPer90: per90.interceptions ?? 0,
    tacklesInterceptionsPer90: (per90.tackles ?? 0) + (per90.interceptions ?? 0),
    clearancesPer90: per90.clearances ?? 0,
    blocksPer90: per90.blocks ?? 0,
    duelsWonPer90: per90.duelsWon ?? 0,
    aerialDuelsWonPer90: per90.aerialDuelsWon ?? 0,
    dribblesPer90: per90.dribbles ?? 0,
    dribblesSuccessfulPer90: per90.dribblesSuccessful ?? 0,
    foulsCommittedPer90: per90.foulsCommitted ?? 0,
    yellowCardsPer90: (totals.yellowCards ?? 0) * factor,
    redCardsPer90: (totals.redCards ?? 0) * factor,
    cardsPenaltyPer90:
      ((totals.yellowCards ?? 0) + 3 * (totals.redCards ?? 0)) * factor,
    savesPer90: per90.saves ?? 0,
    goalsConcededPer90: per90.goalsConceded ?? 0,
    xGPer90: per90.xG ?? 0,
    xAPer90: per90.xA ?? 0,

    // Rate stats
    passCompletionRate: rates.passCompletionRate ?? 0,
    duelWinRate: rates.duelWinRate ?? 0,
    aerialWinRate: rates.aerialWinRate ?? 0,
    dribbleSuccessRate: rates.dribbleSuccessRate ?? 0,
    shotAccuracy: rates.shotAccuracy ?? 0,
    cleanSheetRate: rates.cleanSheetRate ?? 0,
    saveRate: rates.saveRate ?? 0,

    // Combined stats
    goalContributionsPer90: (per90.goals ?? 0) + (per90.assists ?? 0),

    // Sample size
    minutes,
    appearances: totals.appearances,
  };
}

// ============================================================================
// Full Rolling Stats Computation
// ============================================================================

export function computeRollingStats(
  appearances: Doc<"appearances">[],
  fromDate: string,
  toDate: string
): RollingStatsResult {
  // Filter appearances by date range and minutes > 0
  const filtered = appearances.filter(
    (a) => a.matchDate >= fromDate && a.matchDate <= toDate && a.minutes > 0
  );

  // Sort by date ascending
  filtered.sort((a, b) => a.matchDate.localeCompare(b.matchDate));

  // Calculate total minutes
  const minutes = filtered.reduce((sum, a) => sum + a.minutes, 0);

  // Aggregate totals
  const totals = aggregateAppearances(filtered);

  // Compute per90
  const per90 = computePer90(totals, minutes);

  // Compute rates
  const rates = computeRates(totals, minutes, filtered);

  // Compute features
  const features = computeFeatures(totals, per90, rates, minutes);

  return {
    minutes,
    fromDate,
    toDate,
    totals,
    per90,
    rates,
    features,
  };
}

// ============================================================================
// Last N Appearances Stats
// ============================================================================

export function computeLastNStats(
  appearances: Doc<"appearances">[],
  n: number
): RollingStatsResult {
  // Filter for appearances with minutes > 0
  const withMinutes = appearances.filter((a) => a.minutes > 0);

  // Sort by date descending
  withMinutes.sort((a, b) => b.matchDate.localeCompare(a.matchDate));

  // Take last N
  const lastN = withMinutes.slice(0, n);

  if (lastN.length === 0) {
    return {
      minutes: 0,
      fromDate: "",
      toDate: "",
      totals: { appearances: 0 },
      per90: {},
      rates: {},
      features: computeFeatures({ appearances: 0 }, {}, {}, 0),
    };
  }

  // Date range
  const fromDate = lastN[lastN.length - 1].matchDate;
  const toDate = lastN[0].matchDate;

  // Calculate minutes
  const minutes = lastN.reduce((sum, a) => sum + a.minutes, 0);

  // Aggregate totals
  const totals = aggregateAppearances(lastN);

  // Compute per90
  const per90 = computePer90(totals, minutes);

  // Compute rates
  const rates = computeRates(totals, minutes, lastN);

  // Compute features
  const features = computeFeatures(totals, per90, rates, minutes);

  return {
    minutes,
    fromDate,
    toDate,
    totals,
    per90,
    rates,
    features,
  };
}
