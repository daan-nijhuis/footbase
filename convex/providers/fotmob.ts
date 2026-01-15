/**
 * FotMob Provider
 *
 * Implements data fetching from FotMob's unofficial API for enrichment purposes.
 * FotMob provides excellent xG/xA data and detailed player statistics.
 *
 * Note: These are undocumented endpoints - use responsibly with rate limiting.
 */

import {
  rateLimitedFetch,
  RATE_LIMITS,
  type RequestBudget,
  type FetchResult as BaseFetchResult,
  ProviderApiError,
} from "./fetchWrapper";

// ============================================================================
// Configuration
// ============================================================================

const FOTMOB_BASE_URL = "https://www.fotmob.com/api";

// Known league IDs for our supported countries
export const FOTMOB_LEAGUE_IDS = {
  // Netherlands
  eredivisie: 57,
  eersteDivisie: 58,
  // Germany
  bundesliga: 54,
  bundesliga2: 55,
} as const;

// ============================================================================
// API Response Types
// ============================================================================

export interface FotMobSearchResult {
  squad: Array<{
    id: number;
    name: string;
    teamId: number;
    teamName: string;
  }>;
  // Other result types like teams, leagues
}

export interface FotMobPlayerProfile {
  id: number;
  name: string;
  birthDate: {
    utcTime: string;
    age?: string;
  };
  nationality?: {
    country: string;
    countryCode: string;
  };
  primaryTeam?: {
    teamId: number;
    teamName: string;
  };
  positionDescription?: {
    primaryPosition?: {
      label: string;
    };
  };
  height?: string; // e.g., "185 cm"
  weight?: string; // e.g., "78 kg"
  preferredFoot?: string; // "Right", "Left", "Both"
  mainLeague?: {
    leagueId: number;
    leagueName: string;
  };
  // Stats summary
  statSeasons?: Array<{
    seasonName: string;
    leagueId: number;
    leagueName: string;
    stats?: FotMobPlayerSeasonStats;
  }>;
}

export interface FotMobPlayerSeasonStats {
  goals?: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
  appearances?: number;
  minutes?: number;
  rating?: number;
  // xG data (main value of FotMob)
  expectedGoals?: number;
  expectedAssists?: number;
  expectedGoalsOnTarget?: number;
  expectedGoalsNonPenalty?: number;
  // Per 90 variants
  goalsPer90?: number;
  assistsPer90?: number;
  expectedGoalsPer90?: number;
  expectedAssistsPer90?: number;
  // Additional stats
  shotsTotalPer90?: number;
  shotsOnTargetPer90?: number;
  successfulDribblesPercentage?: number;
  accuratePassesPercentage?: number;
  tacklesWonPercentage?: number;
}

export interface FotMobMatchStats {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  playerStats: {
    minutes: number;
    goals?: number;
    assists?: number;
    xG?: number;
    xA?: number;
    shots?: number;
    shotsOnTarget?: number;
    rating?: number;
  };
}

// ============================================================================
// Normalized Types for Enrichment
// ============================================================================

export interface FotMobPlayerSearchResult {
  providerPlayerId: string;
  name: string;
  teamId?: string;
  teamName?: string;
}

export interface FotMobNormalizedProfile {
  providerPlayerId: string;
  name: string;
  birthDate?: string;
  nationality?: string;
  heightCm?: number;
  weightKg?: number;
  preferredFoot?: "left" | "right" | "both";
  photoUrl?: string;
  position?: string;
  positionGroup?: "GK" | "DEF" | "MID" | "ATT";
  teamId?: string;
  teamName?: string;
}

export interface FotMobNormalizedStats {
  season?: string;
  leagueId?: string;
  appearances?: number;
  minutes?: number;
  goals?: number;
  assists?: number;
  xG?: number;
  xA?: number;
  npxG?: number; // Non-penalty xG
  xGPer90?: number;
  xAPer90?: number;
  goalsPer90?: number;
  assistsPer90?: number;
  rating?: number;
}

// ============================================================================
// Error Class
// ============================================================================

export class FotMobError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "FotMobError";
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Parse height string to cm
 */
function parseHeight(height?: string): number | undefined {
  if (!height) return undefined;
  const match = height.match(/(\d+)\s*cm/i);
  return match ? parseInt(match[1], 10) : undefined;
}

/**
 * Parse weight string to kg
 */
function parseWeight(weight?: string): number | undefined {
  if (!weight) return undefined;
  const match = weight.match(/(\d+)\s*kg/i);
  return match ? parseInt(match[1], 10) : undefined;
}

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
  if (lower === "both" || lower === "either") return "both";
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

  if (lower.includes("goalkeeper") || lower === "gk") return "GK";
  if (
    lower.includes("defender") ||
    lower.includes("back") ||
    lower === "cb" ||
    lower === "lb" ||
    lower === "rb"
  )
    return "DEF";
  if (
    lower.includes("midfielder") ||
    lower.includes("mid") ||
    lower === "cm" ||
    lower === "dm" ||
    lower === "am"
  )
    return "MID";
  if (
    lower.includes("forward") ||
    lower.includes("striker") ||
    lower.includes("winger") ||
    lower === "st" ||
    lower === "cf" ||
    lower === "lw" ||
    lower === "rw"
  )
    return "ATT";

  return undefined;
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Search for players by name
 */
export async function searchPlayer(
  query: string,
  budget?: RequestBudget
): Promise<FotMobPlayerSearchResult[]> {
  const url = `${FOTMOB_BASE_URL}/searchapi/?term=${encodeURIComponent(query)}`;

  try {
    const result = await rateLimitedFetch<FotMobSearchResult>(
      "fotmob",
      url,
      RATE_LIMITS.fotmob,
      budget
    );

    if (!result.data.squad || !Array.isArray(result.data.squad)) {
      return [];
    }

    return result.data.squad.map((player) => ({
      providerPlayerId: player.id.toString(),
      name: player.name,
      teamId: player.teamId?.toString(),
      teamName: player.teamName,
    }));
  } catch (error) {
    if (error instanceof ProviderApiError) {
      throw new FotMobError(error.message, error.statusCode);
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
  raw: FotMobPlayerProfile;
  normalized: FotMobNormalizedProfile;
}> {
  const url = `${FOTMOB_BASE_URL}/playerData?id=${providerPlayerId}`;

  try {
    const result = await rateLimitedFetch<FotMobPlayerProfile>(
      "fotmob",
      url,
      RATE_LIMITS.fotmob,
      budget
    );

    const profile = result.data;

    // Normalize the profile
    const normalized: FotMobNormalizedProfile = {
      providerPlayerId,
      name: profile.name,
      birthDate: profile.birthDate?.utcTime?.split("T")[0],
      nationality: profile.nationality?.country,
      heightCm: parseHeight(profile.height),
      weightKg: parseWeight(profile.weight),
      preferredFoot: normalizePreferredFoot(profile.preferredFoot),
      position: profile.positionDescription?.primaryPosition?.label,
      positionGroup: mapPositionToGroup(
        profile.positionDescription?.primaryPosition?.label
      ),
      teamId: profile.primaryTeam?.teamId?.toString(),
      teamName: profile.primaryTeam?.teamName,
    };

    return {
      raw: profile,
      normalized,
    };
  } catch (error) {
    if (error instanceof ProviderApiError) {
      throw new FotMobError(error.message, error.statusCode);
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
    leagueId?: string;
  } = {}
): Promise<{
  seasonStats: FotMobNormalizedStats[];
  careerStats?: FotMobNormalizedStats;
}> {
  // Get player profile which includes season stats
  const { raw: profile } = await getPlayer(providerPlayerId, budget);

  const seasonStats: FotMobNormalizedStats[] = [];

  if (profile.statSeasons) {
    for (const season of profile.statSeasons) {
      // Filter by season/league if specified
      if (options.season && !season.seasonName.includes(options.season)) {
        continue;
      }
      if (options.leagueId && season.leagueId.toString() !== options.leagueId) {
        continue;
      }

      if (season.stats) {
        seasonStats.push({
          season: season.seasonName,
          leagueId: season.leagueId?.toString(),
          appearances: season.stats.appearances,
          minutes: season.stats.minutes,
          goals: season.stats.goals,
          assists: season.stats.assists,
          xG: season.stats.expectedGoals,
          xA: season.stats.expectedAssists,
          npxG: season.stats.expectedGoalsNonPenalty,
          xGPer90: season.stats.expectedGoalsPer90,
          xAPer90: season.stats.expectedAssistsPer90,
          goalsPer90: season.stats.goalsPer90,
          assistsPer90: season.stats.assistsPer90,
          rating: season.stats.rating,
        });
      }
    }
  }

  // Aggregate career stats from all seasons
  let careerStats: FotMobNormalizedStats | undefined;
  if (seasonStats.length > 0) {
    careerStats = {
      appearances: seasonStats.reduce((sum, s) => sum + (s.appearances || 0), 0),
      minutes: seasonStats.reduce((sum, s) => sum + (s.minutes || 0), 0),
      goals: seasonStats.reduce((sum, s) => sum + (s.goals || 0), 0),
      assists: seasonStats.reduce((sum, s) => sum + (s.assists || 0), 0),
      xG: seasonStats.reduce((sum, s) => sum + (s.xG || 0), 0),
      xA: seasonStats.reduce((sum, s) => sum + (s.xA || 0), 0),
      npxG: seasonStats.reduce((sum, s) => sum + (s.npxG || 0), 0),
    };

    // Calculate per90 for career
    if (careerStats.minutes && careerStats.minutes > 0) {
      const per90Factor = 90 / careerStats.minutes;
      careerStats.goalsPer90 = (careerStats.goals || 0) * per90Factor;
      careerStats.assistsPer90 = (careerStats.assists || 0) * per90Factor;
      careerStats.xGPer90 = (careerStats.xG || 0) * per90Factor;
      careerStats.xAPer90 = (careerStats.xA || 0) * per90Factor;
    }
  }

  return {
    seasonStats,
    careerStats,
  };
}

/**
 * Get league/competition info
 */
export async function getLeague(
  leagueId: string,
  budget?: RequestBudget
): Promise<{
  id: string;
  name: string;
  country: string;
  season: string;
}> {
  const url = `${FOTMOB_BASE_URL}/leagues?id=${leagueId}`;

  try {
    const result = await rateLimitedFetch<{
      details: {
        id: number;
        name: string;
        country: string;
        selectedSeason: string;
      };
    }>("fotmob", url, RATE_LIMITS.fotmob, budget);

    return {
      id: result.data.details.id.toString(),
      name: result.data.details.name,
      country: result.data.details.country,
      season: result.data.details.selectedSeason,
    };
  } catch (error) {
    if (error instanceof ProviderApiError) {
      throw new FotMobError(error.message, error.statusCode);
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
  leagueId?: string;
}> {
  const url = `${FOTMOB_BASE_URL}/teams?id=${teamId}`;

  try {
    const result = await rateLimitedFetch<{
      details: {
        id: number;
        name: string;
        country?: string;
      };
      history?: {
        leagueId?: number;
      };
    }>("fotmob", url, RATE_LIMITS.fotmob, budget);

    return {
      id: result.data.details.id.toString(),
      name: result.data.details.name,
      country: result.data.details.country,
      leagueId: result.data.history?.leagueId?.toString(),
    };
  } catch (error) {
    if (error instanceof ProviderApiError) {
      throw new FotMobError(error.message, error.statusCode);
    }
    throw error;
  }
}

// ============================================================================
// Environment Check
// ============================================================================

/**
 * Check if FotMob provider is enabled
 */
export function isEnabled(): boolean {
  // In Convex, we don't have direct access to env vars in this way
  // This would be checked at the action level
  return true;
}
