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

// The search API returns an array of sections
export interface FotMobSearchSection {
  title: {
    key: string;
    value: string;
  };
  suggestions: Array<{
    type: string; // "player", "team", "league", etc.
    id: string;
    name: string;
    teamId?: number;
    teamName?: string;
    isCoach?: boolean;
  }>;
}

export type FotMobSearchResult = FotMobSearchSection[];

// Player information item in the playerInformation array
export interface FotMobPlayerInfoItem {
  title: string;
  translationKey?: string;
  value: {
    numberValue?: number;
    key?: string | null;
    fallback?: string | number | { utcTime: string };
  };
  countryCode?: string;
}

// Career history entry
export interface FotMobCareerEntry {
  seasonName: string;
  team: string;
  teamId: number;
  appearances?: string;
  goals?: string;
  assists?: string;
  rating?: { rating?: string };
  tournamentStats?: Array<{
    leagueId: number;
    leagueName: string;
    seasonName: string;
    appearances?: string;
    goals?: string;
    assists?: string;
    rating?: { rating?: string };
  }>;
}

export interface FotMobPlayerProfile {
  id: number;
  name: string;
  birthDate: {
    utcTime: string;
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
  // Player information is now in an array
  playerInformation?: FotMobPlayerInfoItem[];
  mainLeague?: {
    leagueId: number;
    leagueName: string;
    stats?: Array<{
      title: string;
      localizedTitleId?: string;
      value: number;
    }>;
  };
  // Career history
  careerHistory?: {
    careerItems?: {
      senior?: { seasonEntries?: FotMobCareerEntry[] };
      "national team"?: { seasonEntries?: FotMobCareerEntry[] };
    };
  };
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

/**
 * FotMob-specific headers to avoid being blocked
 */
const FOTMOB_HEADERS = {
  "Origin": "https://www.fotmob.com",
  "Referer": "https://www.fotmob.com/",
};

// ============================================================================
// API Functions
// ============================================================================

/**
 * Search for players by name
 * Note: FotMob's search API returns an array of sections with suggestions
 */
export async function searchPlayer(
  query: string,
  budget?: RequestBudget
): Promise<FotMobPlayerSearchResult[]> {
  // FotMob search endpoint
  const url = `${FOTMOB_BASE_URL}/search/suggest?term=${encodeURIComponent(query)}&lang=en`;

  try {
    const result = await rateLimitedFetch<FotMobSearchResult>(
      "fotmob",
      url,
      RATE_LIMITS.fotmob,
      budget,
      { headers: FOTMOB_HEADERS }
    );

    // The response is an array of sections
    if (!Array.isArray(result.data)) {
      return [];
    }

    // Collect all player suggestions from all sections (avoid duplicates)
    const players: FotMobPlayerSearchResult[] = [];
    const seenIds = new Set<string>();

    for (const section of result.data) {
      if (!section.suggestions) continue;

      for (const suggestion of section.suggestions) {
        // Only include players (not coaches, teams, etc.)
        if (suggestion.type === "player" && !suggestion.isCoach && !seenIds.has(suggestion.id)) {
          seenIds.add(suggestion.id);
          players.push({
            providerPlayerId: suggestion.id,
            name: suggestion.name,
            teamId: suggestion.teamId?.toString(),
            teamName: suggestion.teamName,
          });
        }
      }
    }

    return players;
  } catch (error) {
    if (error instanceof ProviderApiError) {
      throw new FotMobError(error.message, error.statusCode);
    }
    throw error;
  }
}

/**
 * Extract a value from playerInformation array by title
 */
function getPlayerInfoValue(
  info: FotMobPlayerInfoItem[] | undefined,
  title: string
): FotMobPlayerInfoItem | undefined {
  if (!info) return undefined;
  return info.find(
    (item) =>
      item.title.toLowerCase() === title.toLowerCase() ||
      item.translationKey?.toLowerCase().includes(title.toLowerCase())
  );
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
      budget,
      { headers: FOTMOB_HEADERS }
    );

    const profile = result.data;
    const playerInfo = profile.playerInformation;

    // Extract data from playerInformation array
    const heightInfo = getPlayerInfoValue(playerInfo, "height");
    const countryInfo = getPlayerInfoValue(playerInfo, "country");
    const footInfo = getPlayerInfoValue(playerInfo, "preferred foot");

    // Parse height from numberValue or fallback string
    let heightCm: number | undefined;
    if (heightInfo?.value.numberValue) {
      heightCm = heightInfo.value.numberValue;
    } else if (typeof heightInfo?.value.fallback === "string") {
      heightCm = parseHeight(heightInfo.value.fallback);
    }

    // Get nationality from countryInfo
    const nationality =
      typeof countryInfo?.value.fallback === "string"
        ? countryInfo.value.fallback
        : undefined;

    // Get preferred foot
    const preferredFootStr =
      footInfo?.value.key ||
      (typeof footInfo?.value.fallback === "string" ? footInfo.value.fallback : undefined);

    // Normalize the profile
    const normalized: FotMobNormalizedProfile = {
      providerPlayerId,
      name: profile.name,
      birthDate: profile.birthDate?.utcTime?.split("T")[0],
      nationality,
      heightCm,
      weightKg: undefined, // FotMob doesn't seem to provide weight in the new API
      preferredFoot: normalizePreferredFoot(preferredFootStr),
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
  // Get player profile which includes career history
  const { raw: profile } = await getPlayer(providerPlayerId, budget);

  const seasonStats: FotMobNormalizedStats[] = [];

  // Extract stats from mainLeague (current season)
  if (profile.mainLeague?.stats) {
    const stats = profile.mainLeague.stats;
    const getStatValue = (id: string): number | undefined => {
      const stat = stats.find((s) => s.localizedTitleId === id || s.title.toLowerCase() === id.toLowerCase());
      return stat?.value;
    };

    // Check season/league filters
    const seasonMatches = !options.season || profile.mainLeague.leagueName?.includes(options.season);
    const leagueMatches = !options.leagueId || profile.mainLeague.leagueId.toString() === options.leagueId;

    if (seasonMatches && leagueMatches) {
      seasonStats.push({
        season: "current",
        leagueId: profile.mainLeague.leagueId?.toString(),
        appearances: getStatValue("matches_uppercase") || getStatValue("matches"),
        minutes: getStatValue("minutes_played"),
        goals: getStatValue("goals"),
        assists: getStatValue("assists"),
        rating: getStatValue("rating"),
      });
    }
  }

  // Extract stats from career history (senior career)
  const seniorEntries = profile.careerHistory?.careerItems?.senior?.seasonEntries || [];
  for (const entry of seniorEntries) {
    // Filter by season if specified
    if (options.season && !entry.seasonName.includes(options.season)) {
      continue;
    }

    // Process each tournament in the season
    if (entry.tournamentStats) {
      for (const tournament of entry.tournamentStats) {
        // Filter by league if specified
        if (options.leagueId && tournament.leagueId.toString() !== options.leagueId) {
          continue;
        }

        seasonStats.push({
          season: entry.seasonName,
          leagueId: tournament.leagueId?.toString(),
          appearances: tournament.appearances ? parseInt(tournament.appearances, 10) : undefined,
          goals: tournament.goals ? parseInt(tournament.goals, 10) : undefined,
          assists: tournament.assists ? parseInt(tournament.assists, 10) : undefined,
          rating: tournament.rating?.rating ? parseFloat(tournament.rating.rating) : undefined,
        });
      }
    } else {
      // No tournament breakdown, use season totals
      seasonStats.push({
        season: entry.seasonName,
        appearances: entry.appearances ? parseInt(entry.appearances, 10) : undefined,
        goals: entry.goals ? parseInt(entry.goals, 10) : undefined,
        assists: entry.assists ? parseInt(entry.assists, 10) : undefined,
        rating: entry.rating?.rating ? parseFloat(entry.rating.rating) : undefined,
      });
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
    };

    // Calculate per90 for career if we have minutes
    if (careerStats.minutes && careerStats.minutes > 0) {
      const per90Factor = 90 / careerStats.minutes;
      careerStats.goalsPer90 = (careerStats.goals || 0) * per90Factor;
      careerStats.assistsPer90 = (careerStats.assists || 0) * per90Factor;
    }

    // Calculate average rating from seasons that have ratings
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
    }>("fotmob", url, RATE_LIMITS.fotmob, budget, { headers: FOTMOB_HEADERS });

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
    }>("fotmob", url, RATE_LIMITS.fotmob, budget, { headers: FOTMOB_HEADERS });

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
