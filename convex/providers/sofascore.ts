/**
 * SofaScore Provider
 *
 * Implements data fetching from SofaScore's unofficial API for enrichment purposes.
 * SofaScore provides detailed player metadata including height, weight, preferred foot.
 *
 * Note: These are undocumented endpoints - use responsibly with rate limiting.
 */

import {
  rateLimitedFetch,
  RATE_LIMITS,
  type RequestBudget,
  ProviderApiError,
} from "./fetchWrapper";

// ============================================================================
// Configuration
// ============================================================================

const SOFASCORE_BASE_URL = "https://api.sofascore.com/api/v1";

// Known tournament IDs for our supported countries
export const SOFASCORE_TOURNAMENT_IDS = {
  // Netherlands
  eredivisie: 37,
  eersteDivisie: 131,
  // Germany
  bundesliga: 35,
  bundesliga2: 44,
} as const;

// ============================================================================
// API Response Types
// ============================================================================

export interface SofaScoreSearchResult {
  players?: Array<{
    id: number;
    name: string;
    team?: {
      id: number;
      name: string;
    };
    position?: string;
  }>;
}

export interface SofaScorePlayerProfile {
  player: {
    id: number;
    name: string;
    firstName?: string;
    lastName?: string;
    shortName?: string;
    dateOfBirthTimestamp?: number;
    height?: number; // cm
    preferredFoot?: string; // "Left", "Right", "Both"
    position?: string;
    jerseyNumber?: string;
    country?: {
      name: string;
      alpha2?: string;
    };
    team?: {
      id: number;
      name: string;
    };
    proposedMarketValue?: number;
    contractUntilTimestamp?: number;
  };
}

export interface SofaScorePlayerStatistics {
  statistics?: Array<{
    tournament?: {
      id: number;
      name: string;
    };
    season?: {
      id: number;
      name: string;
    };
    rating?: number;
    appearances?: number;
    goals?: number;
    assists?: number;
    yellowCards?: number;
    redCards?: number;
    minutesPlayed?: number;
    // Additional stats
    successfulDribbles?: number;
    totalDribbles?: number;
    accuratePasses?: number;
    totalPasses?: number;
    totalShots?: number;
    shotsOnTarget?: number;
    tackles?: number;
    interceptions?: number;
    clearances?: number;
    aerialWon?: number;
    aerialLost?: number;
  }>;
}

export interface SofaScoreMatchRating {
  player: {
    id: number;
    name: string;
  };
  statistics?: {
    rating?: number;
    minutesPlayed?: number;
    goals?: number;
    assists?: number;
    totalShots?: number;
    shotsOnTarget?: number;
    accuratePasses?: number;
    totalPasses?: number;
    tackles?: number;
    interceptions?: number;
    clearances?: number;
    duelWon?: number;
    duelLost?: number;
    aerialWon?: number;
    aerialLost?: number;
    successfulDribbles?: number;
    foulsCommitted?: number;
    foulsDrawn?: number;
    yellowCards?: number;
    redCards?: number;
    saves?: number;
    goalsConceded?: number;
    // Advanced stats (when available)
    expectedGoals?: number;
    expectedAssists?: number;
  };
}

// ============================================================================
// Normalized Types for Enrichment
// ============================================================================

export interface SofaScorePlayerSearchResult {
  providerPlayerId: string;
  name: string;
  teamId?: string;
  teamName?: string;
  position?: string;
}

export interface SofaScoreNormalizedProfile {
  providerPlayerId: string;
  name: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  nationality?: string;
  heightCm?: number;
  preferredFoot?: "left" | "right" | "both";
  position?: string;
  positionGroup?: "GK" | "DEF" | "MID" | "ATT";
  teamId?: string;
  teamName?: string;
  marketValue?: number;
  contractUntil?: string;
}

export interface SofaScoreNormalizedStats {
  season?: string;
  tournamentId?: string;
  tournamentName?: string;
  appearances?: number;
  minutes?: number;
  goals?: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
  rating?: number;
  // Per90 calculated
  goalsPer90?: number;
  assistsPer90?: number;
  // Rate stats
  passAccuracy?: number;
  dribbleSuccessRate?: number;
  aerialWinRate?: number;
  // Raw totals
  shots?: number;
  shotsOnTarget?: number;
  tackles?: number;
  interceptions?: number;
  clearances?: number;
}

// ============================================================================
// Error Class
// ============================================================================

export class SofaScoreError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "SofaScoreError";
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Normalize preferred foot
 */
function normalizePreferredFoot(
  foot?: string
): "left" | "right" | "both" | undefined {
  if (!foot) return undefined;
  const lower = foot.toLowerCase();
  if (lower === "left") return "left";
  if (lower === "right") return "right";
  if (lower === "both") return "both";
  return undefined;
}

/**
 * Map position to position group
 */
function mapPositionToGroup(
  position?: string
): "GK" | "DEF" | "MID" | "ATT" | undefined {
  if (!position) return undefined;
  const lower = position.toLowerCase();

  if (lower === "g" || lower === "gk" || lower.includes("goalkeeper")) return "GK";
  if (lower === "d" || lower.includes("back") || lower.includes("defender")) return "DEF";
  if (lower === "m" || lower.includes("mid")) return "MID";
  if (lower === "f" || lower.includes("forward") || lower.includes("striker")) return "ATT";

  return undefined;
}

/**
 * Convert Unix timestamp to ISO date string
 */
function timestampToDateString(timestamp?: number): string | undefined {
  if (!timestamp) return undefined;
  return new Date(timestamp * 1000).toISOString().split("T")[0];
}

/**
 * SofaScore-specific headers to avoid being blocked
 */
const SOFASCORE_HEADERS = {
  "Origin": "https://www.sofascore.com",
  "Referer": "https://www.sofascore.com/",
};

// ============================================================================
// API Functions
// ============================================================================

/**
 * Search for players by name
 */
export async function searchPlayer(
  query: string,
  budget?: RequestBudget
): Promise<SofaScorePlayerSearchResult[]> {
  const url = `${SOFASCORE_BASE_URL}/search/players?q=${encodeURIComponent(query)}`;

  try {
    const result = await rateLimitedFetch<SofaScoreSearchResult>(
      "sofascore",
      url,
      RATE_LIMITS.sofascore,
      budget,
      { headers: SOFASCORE_HEADERS }
    );

    if (!result.data.players || !Array.isArray(result.data.players)) {
      return [];
    }

    return result.data.players.map((player) => ({
      providerPlayerId: player.id.toString(),
      name: player.name,
      teamId: player.team?.id?.toString(),
      teamName: player.team?.name,
      position: player.position,
    }));
  } catch (error) {
    if (error instanceof ProviderApiError) {
      throw new SofaScoreError(error.message, error.statusCode);
    }
    throw error;
  }
}

/**
 * Get full player profile
 */
export async function getPlayer(
  providerPlayerId: string,
  budget?: RequestBudget
): Promise<{
  raw: SofaScorePlayerProfile;
  normalized: SofaScoreNormalizedProfile;
}> {
  const url = `${SOFASCORE_BASE_URL}/player/${providerPlayerId}`;

  try {
    const result = await rateLimitedFetch<SofaScorePlayerProfile>(
      "sofascore",
      url,
      RATE_LIMITS.sofascore,
      budget,
      { headers: SOFASCORE_HEADERS }
    );

    const profile = result.data.player;

    // Normalize the profile
    const normalized: SofaScoreNormalizedProfile = {
      providerPlayerId,
      name: profile.name,
      firstName: profile.firstName,
      lastName: profile.lastName,
      birthDate: timestampToDateString(profile.dateOfBirthTimestamp),
      nationality: profile.country?.name,
      heightCm: profile.height,
      preferredFoot: normalizePreferredFoot(profile.preferredFoot),
      position: profile.position,
      positionGroup: mapPositionToGroup(profile.position),
      teamId: profile.team?.id?.toString(),
      teamName: profile.team?.name,
      marketValue: profile.proposedMarketValue,
      contractUntil: timestampToDateString(profile.contractUntilTimestamp),
    };

    return {
      raw: result.data,
      normalized,
    };
  } catch (error) {
    if (error instanceof ProviderApiError) {
      throw new SofaScoreError(error.message, error.statusCode);
    }
    throw error;
  }
}

/**
 * Get player statistics
 */
export async function getPlayerStats(
  providerPlayerId: string,
  budget?: RequestBudget,
  options: {
    season?: string;
    tournamentId?: string;
  } = {}
): Promise<{
  seasonStats: SofaScoreNormalizedStats[];
  careerStats?: SofaScoreNormalizedStats;
}> {
  const url = `${SOFASCORE_BASE_URL}/player/${providerPlayerId}/statistics/seasons`;

  try {
    const result = await rateLimitedFetch<SofaScorePlayerStatistics>(
      "sofascore",
      url,
      RATE_LIMITS.sofascore,
      budget,
      { headers: SOFASCORE_HEADERS }
    );

    const seasonStats: SofaScoreNormalizedStats[] = [];

    if (result.data.statistics) {
      for (const stat of result.data.statistics) {
        // Filter by season/tournament if specified
        if (options.season && !stat.season?.name?.includes(options.season)) {
          continue;
        }
        if (
          options.tournamentId &&
          stat.tournament?.id?.toString() !== options.tournamentId
        ) {
          continue;
        }

        const minutes = stat.minutesPlayed || 0;
        const per90Factor = minutes > 0 ? 90 / minutes : 0;

        // Calculate rates
        const passAccuracy =
          stat.totalPasses && stat.totalPasses > 0
            ? (stat.accuratePasses || 0) / stat.totalPasses
            : undefined;
        const dribbleSuccessRate =
          stat.totalDribbles && stat.totalDribbles > 0
            ? (stat.successfulDribbles || 0) / stat.totalDribbles
            : undefined;
        const aerialTotal = (stat.aerialWon || 0) + (stat.aerialLost || 0);
        const aerialWinRate =
          aerialTotal > 0 ? (stat.aerialWon || 0) / aerialTotal : undefined;

        seasonStats.push({
          season: stat.season?.name,
          tournamentId: stat.tournament?.id?.toString(),
          tournamentName: stat.tournament?.name,
          appearances: stat.appearances,
          minutes,
          goals: stat.goals,
          assists: stat.assists,
          yellowCards: stat.yellowCards,
          redCards: stat.redCards,
          rating: stat.rating,
          goalsPer90: per90Factor > 0 ? (stat.goals || 0) * per90Factor : undefined,
          assistsPer90: per90Factor > 0 ? (stat.assists || 0) * per90Factor : undefined,
          passAccuracy,
          dribbleSuccessRate,
          aerialWinRate,
          shots: stat.totalShots,
          shotsOnTarget: stat.shotsOnTarget,
          tackles: stat.tackles,
          interceptions: stat.interceptions,
          clearances: stat.clearances,
        });
      }
    }

    // Aggregate career stats
    let careerStats: SofaScoreNormalizedStats | undefined;
    if (seasonStats.length > 0) {
      const totalMinutes = seasonStats.reduce((sum, s) => sum + (s.minutes || 0), 0);
      const per90Factor = totalMinutes > 0 ? 90 / totalMinutes : 0;

      careerStats = {
        appearances: seasonStats.reduce((sum, s) => sum + (s.appearances || 0), 0),
        minutes: totalMinutes,
        goals: seasonStats.reduce((sum, s) => sum + (s.goals || 0), 0),
        assists: seasonStats.reduce((sum, s) => sum + (s.assists || 0), 0),
        yellowCards: seasonStats.reduce((sum, s) => sum + (s.yellowCards || 0), 0),
        redCards: seasonStats.reduce((sum, s) => sum + (s.redCards || 0), 0),
        shots: seasonStats.reduce((sum, s) => sum + (s.shots || 0), 0),
        shotsOnTarget: seasonStats.reduce((sum, s) => sum + (s.shotsOnTarget || 0), 0),
        tackles: seasonStats.reduce((sum, s) => sum + (s.tackles || 0), 0),
        interceptions: seasonStats.reduce((sum, s) => sum + (s.interceptions || 0), 0),
        clearances: seasonStats.reduce((sum, s) => sum + (s.clearances || 0), 0),
      };

      if (per90Factor > 0) {
        careerStats.goalsPer90 = (careerStats.goals || 0) * per90Factor;
        careerStats.assistsPer90 = (careerStats.assists || 0) * per90Factor;
      }

      // Calculate average rating
      const ratingsWithValues = seasonStats.filter((s) => s.rating !== undefined);
      if (ratingsWithValues.length > 0) {
        careerStats.rating =
          ratingsWithValues.reduce((sum, s) => sum + (s.rating || 0), 0) /
          ratingsWithValues.length;
      }
    }

    return {
      seasonStats,
      careerStats,
    };
  } catch (error) {
    if (error instanceof ProviderApiError) {
      throw new SofaScoreError(error.message, error.statusCode);
    }
    throw error;
  }
}

/**
 * Get tournament/competition info
 */
export async function getTournament(
  tournamentId: string,
  budget?: RequestBudget
): Promise<{
  id: string;
  name: string;
  country?: string;
}> {
  const url = `${SOFASCORE_BASE_URL}/unique-tournament/${tournamentId}`;

  try {
    const result = await rateLimitedFetch<{
      uniqueTournament: {
        id: number;
        name: string;
        category?: {
          name: string;
          flag?: string;
        };
      };
    }>("sofascore", url, RATE_LIMITS.sofascore, budget, { headers: SOFASCORE_HEADERS });

    return {
      id: result.data.uniqueTournament.id.toString(),
      name: result.data.uniqueTournament.name,
      country: result.data.uniqueTournament.category?.name,
    };
  } catch (error) {
    if (error instanceof ProviderApiError) {
      throw new SofaScoreError(error.message, error.statusCode);
    }
    throw error;
  }
}

/**
 * Get team info
 */
export async function getTeam(
  teamId: string,
  budget?: RequestBudget
): Promise<{
  id: string;
  name: string;
  country?: string;
}> {
  const url = `${SOFASCORE_BASE_URL}/team/${teamId}`;

  try {
    const result = await rateLimitedFetch<{
      team: {
        id: number;
        name: string;
        country?: {
          name: string;
        };
      };
    }>("sofascore", url, RATE_LIMITS.sofascore, budget, { headers: SOFASCORE_HEADERS });

    return {
      id: result.data.team.id.toString(),
      name: result.data.team.name,
      country: result.data.team.country?.name,
    };
  } catch (error) {
    if (error instanceof ProviderApiError) {
      throw new SofaScoreError(error.message, error.statusCode);
    }
    throw error;
  }
}

/**
 * Get match player statistics
 */
export async function getMatchPlayerStats(
  matchId: string,
  budget?: RequestBudget
): Promise<SofaScoreMatchRating[]> {
  const url = `${SOFASCORE_BASE_URL}/event/${matchId}/lineups`;

  try {
    const result = await rateLimitedFetch<{
      home?: { players?: SofaScoreMatchRating[] };
      away?: { players?: SofaScoreMatchRating[] };
    }>("sofascore", url, RATE_LIMITS.sofascore, budget, { headers: SOFASCORE_HEADERS });

    const players: SofaScoreMatchRating[] = [];

    if (result.data.home?.players) {
      players.push(...result.data.home.players);
    }
    if (result.data.away?.players) {
      players.push(...result.data.away.players);
    }

    return players;
  } catch (error) {
    if (error instanceof ProviderApiError) {
      throw new SofaScoreError(error.message, error.statusCode);
    }
    throw error;
  }
}

// ============================================================================
// Environment Check
// ============================================================================

/**
 * Check if SofaScore provider is enabled
 */
export function isEnabled(): boolean {
  // In Convex, we don't have direct access to env vars in this way
  // This would be checked at the action level
  return true;
}
