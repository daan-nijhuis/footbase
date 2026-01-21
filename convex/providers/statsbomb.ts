/**
 * StatsBomb Data API Provider
 *
 * Provides typed fetch functions for StatsBomb Data API endpoints.
 *
 * Endpoints used:
 * - GET /api/v4/competitions - Competition catalog with update timestamps
 * - GET /api/v6/competitions/{comp}/seasons/{season}/matches - Match list
 * - GET /api/v4/lineups/{match_id} - Lineups with player bio and positions
 * - GET /api/v5/matches/{match_id}/player-stats - Per-match player stats (wide)
 * - GET /api/v4/competitions/{comp}/seasons/{season}/player-stats - Season aggregates
 * - GET /api/v1/matches/{match_id}/team-stats - Team context (possession, xG)
 * - GET /api/v2/competitions/{comp}/seasons/{season}/team-stats - Team season stats
 * - GET /api/v1/player-mapping - Identity mapping for deduplication
 */

import { fetchJson, StatsBombError, isConfigured } from "./statsbombClient";

export { StatsBombError, isConfigured };

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Competition from /api/v4/competitions
 */
export interface StatsBombCompetition {
  competition_id: number;
  competition_name: string;
  country_name: string;
  competition_gender: string;
  competition_youth: boolean;
  competition_international: boolean;
  season_id: number;
  season_name: string;
  // Update timestamps for change detection
  match_updated: string; // ISO timestamp
  match_updated_360: string | null;
  match_available: string; // ISO timestamp
  match_available_360: string | null;
}

/**
 * Match from /api/v6/competitions/{comp}/seasons/{season}/matches
 */
export interface StatsBombMatch {
  match_id: number;
  match_date: string; // YYYY-MM-DD
  kick_off: string; // HH:MM:SS
  home_team: {
    home_team_id: number;
    home_team_name: string;
    home_team_gender: string;
    home_team_group: string | null;
    country: { id: number; name: string };
    managers: Array<{
      id: number;
      name: string;
      nickname: string | null;
      dob: string;
      country: { id: number; name: string };
    }>;
  };
  away_team: {
    away_team_id: number;
    away_team_name: string;
    away_team_gender: string;
    away_team_group: string | null;
    country: { id: number; name: string };
    managers: Array<{
      id: number;
      name: string;
      nickname: string | null;
      dob: string;
      country: { id: number; name: string };
    }>;
  };
  home_score: number | null;
  away_score: number | null;
  match_status: string; // "available", "scheduled", etc.
  match_status_360: string | null;
  last_updated: string; // ISO timestamp for change detection
  last_updated_360: string | null;
  competition: {
    competition_id: number;
    competition_name: string;
    country_name: string;
  };
  season: {
    season_id: number;
    season_name: string;
  };
  metadata?: {
    data_version: string;
    shot_fidelity_version: string;
    xy_fidelity_version: string;
  };
  competition_stage?: {
    id: number;
    name: string;
  };
  stadium?: {
    id: number;
    name: string;
    country: { id: number; name: string };
  };
  referee?: {
    id: number;
    name: string;
    country: { id: number; name: string };
  };
  match_week?: number;
}

/**
 * Player position segment from lineups
 */
export interface StatsBombPositionSegment {
  position_id: number;
  position: string;
  from: string; // "00:00:00" format
  to: string | null;
  from_period: number;
  to_period: number | null;
  start_reason: string; // "Starting XI", "Substitution On", etc.
  end_reason: string | null; // "Substitution Off", "Full Time", etc.
}

/**
 * Player from lineups endpoint
 */
export interface StatsBombLineupPlayer {
  player_id: number;
  player_name: string;
  player_nickname: string | null;
  jersey_number: number;
  country: { id: number; name: string };
  positions: StatsBombPositionSegment[];
  cards: Array<{
    time: string;
    card_type: string;
    reason: string | null;
    period: number;
  }>;
}

/**
 * Team lineup from /api/v4/lineups/{match_id}
 */
export interface StatsBombLineup {
  team_id: number;
  team_name: string;
  lineup: StatsBombLineupPlayer[];
}

/**
 * Player match stats from /api/v5/matches/{match_id}/player-stats
 * Contains 200+ stat fields - we store raw and extract key features
 */
export interface StatsBombPlayerMatchStats {
  player_match_id: number;
  player_id: number;
  player_name: string;
  player_nickname: string | null;
  team_id: number;
  team_name: string;
  match_id: number;
  player_match_minutes: number;
  player_match_starting_position?: string;
  // The actual stats are dynamic - all fields prefixed with player_match_
  // Examples: player_match_xg, player_match_xa, player_match_passes_completed
  [key: string]: unknown;
}

/**
 * Player season stats from /api/v4/competitions/{comp}/seasons/{season}/player-stats
 */
export interface StatsBombSeasonPlayerStats {
  player_id: number;
  player_name: string;
  player_nickname: string | null;
  team_id: number;
  team_name: string;
  player_season_minutes: number;
  player_season_minutes_360?: number;
  player_season_appearances: number;
  // The actual stats are dynamic - all fields prefixed with player_season_
  [key: string]: unknown;
}

/**
 * Team match stats from /api/v1/matches/{match_id}/team-stats
 */
export interface StatsBombTeamMatchStats {
  team_id: number;
  team_name: string;
  match_id: number;
  team_match_possession: number;
  // Additional stats like xG, shots, passes, etc.
  [key: string]: unknown;
}

/**
 * Team season stats from /api/v2/competitions/{comp}/seasons/{season}/team-stats
 */
export interface StatsBombTeamSeasonStats {
  team_id: number;
  team_name: string;
  team_season_matches: number;
  team_season_possession: number;
  // Additional stats
  [key: string]: unknown;
}

/**
 * Player mapping from /api/v1/player-mapping
 */
export interface StatsBombPlayerMapping {
  offline_player_id: number;
  player_name: string;
  sb_player_id?: number;
  live_player_id?: number;
  player_nickname?: string | null;
  birth_date?: string;
  country?: { id: number; name: string };
  height?: number;
  weight?: number;
  // Match links
  matches?: Array<{
    offline_match_id: number;
    live_match_id?: number;
  }>;
}

// ============================================================================
// API Fetch Functions
// ============================================================================

/**
 * Fetch all competitions from the catalog
 * GET /api/v4/competitions
 */
export async function fetchCompetitions(): Promise<StatsBombCompetition[]> {
  const { data } = await fetchJson<StatsBombCompetition[]>("/v4/competitions");
  return data;
}

/**
 * Fetch matches for a competition-season
 * GET /api/v6/competitions/{competition_id}/seasons/{season_id}/matches
 */
export async function fetchMatches(
  competitionId: number,
  seasonId: number
): Promise<StatsBombMatch[]> {
  const { data } = await fetchJson<StatsBombMatch[]>(
    `/v6/competitions/${competitionId}/seasons/${seasonId}/matches`
  );
  return data;
}

/**
 * Fetch lineups for a match (includes player bio and positions)
 * GET /api/v4/lineups/{match_id}
 */
export async function fetchLineups(matchId: number): Promise<StatsBombLineup[]> {
  const { data } = await fetchJson<StatsBombLineup[]>(`/v4/lineups/${matchId}`);
  return data;
}

/**
 * Fetch player stats for a match (wide: 200+ metrics)
 * GET /api/v5/matches/{match_id}/player-stats
 */
export async function fetchMatchPlayerStats(
  matchId: number
): Promise<StatsBombPlayerMatchStats[]> {
  const { data } = await fetchJson<StatsBombPlayerMatchStats[]>(
    `/v5/matches/${matchId}/player-stats`
  );
  return data;
}

/**
 * Fetch player season aggregates for a competition-season
 * GET /api/v4/competitions/{competition_id}/seasons/{season_id}/player-stats
 */
export async function fetchSeasonPlayerStats(
  competitionId: number,
  seasonId: number
): Promise<StatsBombSeasonPlayerStats[]> {
  const { data } = await fetchJson<StatsBombSeasonPlayerStats[]>(
    `/v4/competitions/${competitionId}/seasons/${seasonId}/player-stats`
  );
  return data;
}

/**
 * Fetch team stats for a match
 * GET /api/v1/matches/{match_id}/team-stats
 */
export async function fetchMatchTeamStats(
  matchId: number
): Promise<StatsBombTeamMatchStats[]> {
  const { data } = await fetchJson<StatsBombTeamMatchStats[]>(
    `/v1/matches/${matchId}/team-stats`
  );
  return data;
}

/**
 * Fetch team season aggregates for a competition-season
 * GET /api/v2/competitions/{competition_id}/seasons/{season_id}/team-stats
 */
export async function fetchSeasonTeamStats(
  competitionId: number,
  seasonId: number
): Promise<StatsBombTeamSeasonStats[]> {
  const { data } = await fetchJson<StatsBombTeamSeasonStats[]>(
    `/v2/competitions/${competitionId}/seasons/${seasonId}/team-stats`
  );
  return data;
}

/**
 * Fetch player identity mappings
 * GET /api/v1/player-mapping?all-account-data=true
 */
export async function fetchPlayerMappings(): Promise<StatsBombPlayerMapping[]> {
  const { data } = await fetchJson<StatsBombPlayerMapping[]>(
    "/v1/player-mapping?all-account-data=true"
  );
  return data;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Map StatsBomb position string to canonical position group
 */
export function mapPositionToGroup(
  position: string
): "GK" | "DEF" | "MID" | "ATT" {
  const posLower = position.toLowerCase();

  // Goalkeeper
  if (posLower.includes("goalkeeper")) {
    return "GK";
  }

  // Defenders
  if (
    posLower.includes("back") ||
    posLower.includes("defender") ||
    posLower.includes("center back") ||
    posLower.includes("wing back") ||
    posLower.includes("left back") ||
    posLower.includes("right back")
  ) {
    return "DEF";
  }

  // Attackers
  if (
    posLower.includes("forward") ||
    posLower.includes("striker") ||
    posLower.includes("center forward") ||
    posLower.includes("left wing") ||
    posLower.includes("right wing")
  ) {
    return "ATT";
  }

  // Everything else is midfield (includes various midfield positions)
  return "MID";
}

/**
 * Get the starting position from lineup positions array
 */
export function getStartingPosition(
  positions: StatsBombPositionSegment[]
): { position: string; positionGroup: "GK" | "DEF" | "MID" | "ATT" } | null {
  // Find the starting XI position
  const startingPos = positions.find((p) => p.start_reason === "Starting XI");

  if (startingPos) {
    return {
      position: startingPos.position,
      positionGroup: mapPositionToGroup(startingPos.position),
    };
  }

  // Fall back to first position if no starting XI found (substitute)
  if (positions.length > 0) {
    return {
      position: positions[0].position,
      positionGroup: mapPositionToGroup(positions[0].position),
    };
  }

  return null;
}

/**
 * Calculate total minutes played from position segments
 */
export function calculateMinutesFromPositions(
  positions: StatsBombPositionSegment[]
): number {
  let totalMinutes = 0;

  for (const pos of positions) {
    const fromParts = pos.from.split(":").map(Number);
    const fromMinutes = fromParts[0] * 60 + fromParts[1] + fromParts[2] / 60;

    let toMinutes = 90; // Default to end of match
    if (pos.to) {
      const toParts = pos.to.split(":").map(Number);
      toMinutes = toParts[0] * 60 + toParts[1] + toParts[2] / 60;
    }

    totalMinutes += toMinutes - fromMinutes;
  }

  return Math.round(totalMinutes);
}

/**
 * Check if a player was a starter
 */
export function isStarter(positions: StatsBombPositionSegment[]): boolean {
  return positions.some((p) => p.start_reason === "Starting XI");
}

/**
 * Create a match key for deduplication
 * Format: YYYY-MM-DD_homeTeam_awayTeam
 */
export function createMatchKey(match: StatsBombMatch): string {
  const homeTeam = match.home_team.home_team_name
    .toLowerCase()
    .replace(/\s+/g, "_");
  const awayTeam = match.away_team.away_team_name
    .toLowerCase()
    .replace(/\s+/g, "_");
  return `${match.match_date}_${homeTeam}_${awayTeam}`;
}

/**
 * Extract numeric stats from a raw stats object
 * Filters to only include numeric values (skipping IDs, names, etc.)
 */
export function extractNumericStats(
  raw: Record<string, unknown>,
  prefix: string = ""
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "number" && !key.includes("_id")) {
      const cleanKey = prefix ? key.replace(prefix, "") : key;
      result[cleanKey] = value;
    }
  }

  return result;
}
