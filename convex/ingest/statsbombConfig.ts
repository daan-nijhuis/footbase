/**
 * StatsBomb Integration Configuration
 *
 * Configuration for licensed competitions, target seasons, and ingestion settings.
 */

/**
 * Licensed StatsBomb competitions
 * These are the competitions we have StatsBomb Data API access for.
 *
 * Note: The actual StatsBomb competition IDs need to be verified against
 * the competitions endpoint response. The IDs below are placeholders.
 */
export const LICENSED_COMPETITIONS = [
  {
    name: "Eredivisie",
    country: "Netherlands",
    // StatsBomb competition ID (verify via /api/v4/competitions)
    statsbombCompetitionId: null as number | null, // Will be resolved dynamically
    matchName: "Eredivisie", // Name pattern to match from API
  },
  {
    name: "Keuken Kampioen Divisie",
    country: "Netherlands",
    statsbombCompetitionId: null as number | null,
    matchName: "Keuken Kampioen Divisie",
  },
  {
    name: "Bundesliga",
    country: "Germany",
    statsbombCompetitionId: null as number | null,
    matchName: "1. Bundesliga", // StatsBomb may use different naming
  },
  {
    name: "Jupiler Pro League",
    country: "Belgium",
    statsbombCompetitionId: null as number | null,
    matchName: "Jupiler Pro League",
  },
  {
    name: "Danish Superliga",
    country: "Denmark",
    statsbombCompetitionId: null as number | null,
    matchName: "Superliga",
  },
] as const;

/**
 * Target season for initial ingestion
 * Start with the current season, can be expanded later
 */
export const TARGET_SEASONS = ["2025/2026", "2024/2025"] as const;

/**
 * Primary target season (for initial sync)
 */
export const PRIMARY_SEASON = "2025/2026";

/**
 * Ingestion budget limits to prevent runaway API usage
 */
export const INGESTION_BUDGET = {
  // Maximum matches to process per sync run
  maxMatchesPerRun: 50,

  // Maximum API requests per sync run
  maxRequestsPerRun: 200,

  // Minimum delay between requests (ms)
  minRequestDelay: 50,

  // Maximum concurrent match processing
  maxConcurrentMatches: 5,
} as const;

/**
 * Match statuses that indicate stats are available
 */
export const AVAILABLE_MATCH_STATUSES = ["available", "completed"] as const;

/**
 * Minimum minutes played to consider a player for rating
 */
export const MIN_MINUTES_FOR_RATING = 90;

/**
 * Minimum minutes for "stable" season rating
 */
export const STABLE_MINUTES_THRESHOLD = 900;

/**
 * Feature extraction configuration
 * Maps StatsBomb stat field names to our internal feature names
 */
export const STAT_FIELD_MAPPING = {
  // Shooting
  xG: "player_match_xg",
  npxG: "player_match_npxg",
  shots: "player_match_shots_total",
  shotsOnTarget: "player_match_shots_on_target",

  // Passing
  xA: "player_match_xa",
  passesCompleted: "player_match_passes_completed",
  passesAttempted: "player_match_passes_attempted",
  progressivePasses: "player_match_progressive_passes_completed",
  passesIntoFinalThird: "player_match_passes_into_final_third",
  passesIntoPenaltyArea: "player_match_passes_into_penalty_area",
  throughBalls: "player_match_through_balls",
  crossesCompleted: "player_match_crosses_completed",

  // Carrying
  carries: "player_match_carries",
  progressiveCarries: "player_match_progressive_carries",
  carriesIntoFinalThird: "player_match_carries_into_final_third",
  carriesIntoPenaltyArea: "player_match_carries_into_penalty_area",
  takeOnsAttempted: "player_match_take_ons_attempted",
  takeOnsSuccessful: "player_match_take_ons_won",

  // Creating
  shotCreatingActions: "player_match_shot_creating_actions",
  goalCreatingActions: "player_match_goal_creating_actions",

  // Defensive
  tackles: "player_match_tackles",
  tacklesWon: "player_match_tackles_won",
  interceptions: "player_match_interceptions",
  blocks: "player_match_blocks",
  clearances: "player_match_clearances",
  aerialDuelsWon: "player_match_aerials_won",
  aerialDuelsLost: "player_match_aerials_lost",

  // Pressure
  pressures: "player_match_pressures",
  pressuresSuccessful: "player_match_pressure_regains",
  pressuresInAttackingThird: "player_match_pressures_att_third",

  // GK
  saves: "player_match_saves",
  psxG: "player_match_psxg",
  goalsAgainst: "player_match_goals_against",

  // OBV (On-Ball Value) - StatsBomb's proprietary player value metric
  obv: "player_match_obv",
  obvPass: "player_match_obv_pass",
  obvShot: "player_match_obv_shot",
  obvDefensiveAction: "player_match_obv_defensive_action",
  obvDribbleCarry: "player_match_obv_dribble_carry",
  obvGk: "player_match_obv_gk",
} as const;

/**
 * Season stats field mapping (prefixed with player_season_)
 */
export const SEASON_STAT_FIELD_MAPPING = {
  xG: "player_season_xg",
  npxG: "player_season_npxg",
  xA: "player_season_xa",
  goals: "player_season_goals",
  assists: "player_season_assists",
  progressivePasses: "player_season_progressive_passes_completed",
  progressiveCarries: "player_season_progressive_carries",
  pressures: "player_season_pressures",
  tackles: "player_season_tackles",
  interceptions: "player_season_interceptions",

  // OBV (On-Ball Value)
  obv: "player_season_obv",
  obvPass: "player_season_obv_pass",
  obvShot: "player_season_obv_shot",
  obvDefensiveAction: "player_season_obv_defensive_action",
  obvDribbleCarry: "player_season_obv_dribble_carry",
  obvGk: "player_season_obv_gk",
} as const;

/**
 * Check if a competition name matches our licensed list
 */
export function isLicensedCompetition(
  competitionName: string,
  countryName: string
): boolean {
  const normalized = competitionName.toLowerCase();
  const countryNormalized = countryName.toLowerCase();

  return LICENSED_COMPETITIONS.some((comp) => {
    const matchNameNormalized = comp.matchName.toLowerCase();
    const compCountryNormalized = comp.country.toLowerCase();

    // Match by name similarity and country
    return (
      (normalized.includes(matchNameNormalized) ||
        matchNameNormalized.includes(normalized)) &&
      countryNormalized === compCountryNormalized
    );
  });
}

/**
 * Check if a season matches our target seasons
 */
export function isTargetSeason(seasonName: string): boolean {
  return TARGET_SEASONS.some((target) =>
    seasonName.includes(target) || target.includes(seasonName)
  );
}
