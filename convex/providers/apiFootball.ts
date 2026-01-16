/**
 * API-Football Provider Implementation
 *
 * Implements data fetching from API-Football (API-Sports) including:
 * - Leagues/competitions by country
 * - Teams by league
 * - Players by league (paginated)
 * - Fixtures and player statistics
 */

import {
  fetchJson,
  ApiFootballError,
  type RateLimitInfo,
} from "./apiFootballClient";
import { getCurrentFootballSeason } from "../lib/metrics";

// ============================================================================
// API Response Types
// ============================================================================

// League response from /leagues endpoint
export interface LeagueResponse {
  league: {
    id: number;
    name: string;
    type: "League" | "Cup";
    logo: string;
  };
  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };
  seasons: Array<{
    year: number;
    start: string;
    end: string;
    current: boolean;
  }>;
}

// Team response from /teams endpoint
export interface TeamResponse {
  team: {
    id: number;
    name: string;
    code: string | null;
    country: string;
    founded: number | null;
    national: boolean;
    logo: string;
  };
  venue: {
    id: number | null;
    name: string | null;
    address: string | null;
    city: string | null;
    capacity: number | null;
    surface: string | null;
    image: string | null;
  } | null;
}

// Player response from /players endpoint
export interface PlayerResponse {
  player: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number | null;
    birth: {
      date: string | null;
      place: string | null;
      country: string | null;
    };
    nationality: string | null;
    height: string | null;
    weight: string | null;
    injured: boolean;
    photo: string;
  };
  statistics: Array<{
    team: {
      id: number;
      name: string;
      logo: string;
    };
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string | null;
      season: number;
    };
    games: {
      appearences: number | null; // Note: API typo
      lineups: number | null;
      minutes: number | null;
      number: number | null;
      position: string | null;
      rating: string | null;
      captain: boolean;
    };
    // ... more stats fields available but not used in MVP
  }>;
}

// Fixture response from /fixtures endpoint
export interface FixtureResponse {
  fixture: {
    id: number;
    referee: string | null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
      first: number | null;
      second: number | null;
    };
    venue: {
      id: number | null;
      name: string | null;
      city: string | null;
    };
    status: {
      long: string;
      short: string;
      elapsed: number | null;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string | null;
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: { home: number | null; away: number | null };
    fulltime: { home: number | null; away: number | null };
    extratime: { home: number | null; away: number | null };
    penalty: { home: number | null; away: number | null };
  };
}

// Player statistics from /fixtures/players endpoint
export interface FixturePlayerStats {
  team: {
    id: number;
    name: string;
    logo: string;
    update: string;
  };
  players: Array<{
    player: {
      id: number;
      name: string;
      photo: string;
    };
    statistics: Array<{
      games: {
        minutes: number | null;
        number: number | null;
        position: string | null;
        rating: string | null;
        captain: boolean;
        substitute: boolean;
      };
      offsides: number | null;
      shots: {
        total: number | null;
        on: number | null;
      };
      goals: {
        total: number | null;
        conceded: number | null;
        assists: number | null;
        saves: number | null;
      };
      passes: {
        total: number | null;
        key: number | null;
        accuracy: string | null;
      };
      tackles: {
        total: number | null;
        blocks: number | null;
        interceptions: number | null;
      };
      duels: {
        total: number | null;
        won: number | null;
      };
      dribbles: {
        attempts: number | null;
        success: number | null;
        past: number | null;
      };
      fouls: {
        drawn: number | null;
        committed: number | null;
      };
      cards: {
        yellow: number | null;
        red: number | null;
      };
      penalty: {
        won: number | null;
        commited: number | null; // Note: API typo
        scored: number | null;
        missed: number | null;
        saved: number | null;
      };
    }>;
  }>;
}

// ============================================================================
// Canonical Types (normalized for our schema)
// ============================================================================

export interface CanonicalCompetition {
  providerLeagueId: string;
  name: string;
  country: string;
  season: string;
  type: "League" | "Cup";
  logoUrl?: string;
  isActive: boolean;
}

export interface CanonicalTeam {
  providerTeamId: string;
  name: string;
  logoUrl?: string;
}

export interface CanonicalPlayer {
  providerPlayerId: string;
  name: string;
  position: string;
  positionGroup: "GK" | "DEF" | "MID" | "ATT";
  birthDate?: string;
  age?: number;
  nationality?: string;
  photoUrl?: string;
  providerTeamId: string;
}

export interface CanonicalFixture {
  providerFixtureId: string;
  matchDate: string;
  status: string;
  providerLeagueId: string;
}

export interface CanonicalAppearance {
  providerPlayerId: string;
  providerFixtureId: string;
  providerTeamId: string;
  matchDate: string;
  minutes: number;
  // Player info for auto-creating players from fixtures
  playerName?: string;
  playerPhoto?: string;
  playerPosition?: string;
  stats: {
    goals?: number;
    assists?: number;
    yellowCards?: number;
    redCards?: number;
    shots?: number;
    shotsOnTarget?: number;
    passes?: number;
    passAccuracy?: number;
    keyPasses?: number;
    tackles?: number;
    interceptions?: number;
    blocks?: number;
    duelsWon?: number;
    duelsTotal?: number;
    dribbles?: number;
    dribblesSuccessful?: number;
    foulsCommitted?: number;
    foulsDrawn?: number;
    saves?: number;
    goalsConceded?: number;
    penaltiesSaved?: number;
    penaltiesMissed?: number;
  };
}

// ============================================================================
// Position Mapping
// ============================================================================

/**
 * Map API-Football position string to our position groups
 */
export function mapPositionToGroup(
  position: string | null
): "GK" | "DEF" | "MID" | "ATT" {
  if (!position) return "MID"; // Default fallback

  const normalized = position.toUpperCase();

  if (normalized.includes("GOALKEEPER") || normalized === "G") {
    return "GK";
  }
  if (
    normalized.includes("DEFENDER") ||
    normalized === "D" ||
    normalized.includes("BACK")
  ) {
    return "DEF";
  }
  if (
    normalized.includes("MIDFIELDER") ||
    normalized === "M" ||
    normalized.includes("MID")
  ) {
    return "MID";
  }
  if (
    normalized.includes("ATTACKER") ||
    normalized.includes("FORWARD") ||
    normalized === "F" ||
    normalized.includes("STRIKER")
  ) {
    return "ATT";
  }

  return "MID"; // Default fallback
}

// ============================================================================
// API Functions
// ============================================================================

export interface FetchResult<T> {
  items: T[];
  rateLimit?: RateLimitInfo;
  paging?: {
    current: number;
    total: number;
  };
}

/**
 * Fetch leagues/competitions for a country
 */
export async function fetchLeaguesByCountry(
  country: string
): Promise<FetchResult<CanonicalCompetition>> {
  const response = await fetchJson<LeagueResponse[]>("/leagues", { country });

  const items = response.data.response.map((item) => {
    // Find current season or most recent
    const currentSeason = item.seasons.find((s) => s.current);
    const season = currentSeason?.year.toString() ||
      item.seasons[item.seasons.length - 1]?.year.toString() ||
      getCurrentFootballSeason();

    return {
      providerLeagueId: item.league.id.toString(),
      name: item.league.name,
      country: item.country.name,
      season,
      type: item.league.type,
      logoUrl: item.league.logo,
      // Activate leagues by default, deactivate cups
      isActive: item.league.type === "League",
    } satisfies CanonicalCompetition;
  });

  return {
    items,
    rateLimit: response.rateLimit,
  };
}

/**
 * Fetch teams for a league and season
 */
export async function fetchTeamsByLeague(
  leagueId: string,
  season: string
): Promise<FetchResult<CanonicalTeam>> {
  const response = await fetchJson<TeamResponse[]>("/teams", {
    league: leagueId,
    season,
  });

  const items = response.data.response.map((item) => ({
    providerTeamId: item.team.id.toString(),
    name: item.team.name,
    logoUrl: item.team.logo,
  }));

  return {
    items,
    rateLimit: response.rateLimit,
  };
}

/**
 * Fetch players for a league and season (paginated)
 */
export async function fetchPlayersByLeague(
  leagueId: string,
  season: string,
  page: number = 1
): Promise<FetchResult<CanonicalPlayer>> {
  const response = await fetchJson<PlayerResponse[]>("/players", {
    league: leagueId,
    season,
    page,
  });

  const items = response.data.response.map((item) => {
    // Get position from first statistics entry
    const stats = item.statistics[0];
    const position = stats?.games?.position || "Unknown";

    return {
      providerPlayerId: item.player.id.toString(),
      name: item.player.name,
      position,
      positionGroup: mapPositionToGroup(position),
      birthDate: item.player.birth.date || undefined,
      age: item.player.age || undefined,
      nationality: item.player.nationality || undefined,
      photoUrl: item.player.photo,
      providerTeamId: stats?.team?.id.toString() || "",
    } satisfies CanonicalPlayer;
  });

  return {
    items,
    rateLimit: response.rateLimit,
    paging: response.data.paging,
  };
}

/**
 * Fetch fixtures for a league within a date range
 */
export async function fetchFixturesByLeague(
  leagueId: string,
  season: string,
  dateFrom: string,
  dateTo: string
): Promise<FetchResult<CanonicalFixture>> {
  const response = await fetchJson<FixtureResponse[]>("/fixtures", {
    league: leagueId,
    season,
    from: dateFrom,
    to: dateTo,
  });

  const items = response.data.response.map((item) => ({
    providerFixtureId: item.fixture.id.toString(),
    matchDate: item.fixture.date.split("T")[0], // Extract date part
    status: item.fixture.status.short,
    providerLeagueId: item.league.id.toString(),
  }));

  return {
    items,
    rateLimit: response.rateLimit,
  };
}

/**
 * Fetch player statistics for a fixture
 */
export async function fetchFixturePlayerStats(
  fixtureId: string
): Promise<FetchResult<CanonicalAppearance>> {
  const response = await fetchJson<FixturePlayerStats[]>("/fixtures/players", {
    fixture: fixtureId,
  });

  // Get fixture info to extract match date
  const fixtureResponse = await fetchJson<FixtureResponse[]>("/fixtures", {
    id: fixtureId,
  });
  const matchDate =
    fixtureResponse.data.response[0]?.fixture.date.split("T")[0] || "";

  const items: CanonicalAppearance[] = [];

  for (const teamStats of response.data.response) {
    for (const playerData of teamStats.players) {
      const stats = playerData.statistics[0];
      if (!stats) continue;

      // Only include players who played (have minutes)
      const minutes = stats.games.minutes;
      if (minutes === null || minutes === 0) continue;

      items.push({
        providerPlayerId: playerData.player.id.toString(),
        providerFixtureId: fixtureId,
        providerTeamId: teamStats.team.id.toString(),
        matchDate,
        minutes,
        // Player info for auto-creating players from fixtures
        playerName: playerData.player.name,
        playerPhoto: playerData.player.photo,
        playerPosition: stats.games.position ?? undefined,
        stats: {
          goals: stats.goals.total ?? undefined,
          assists: stats.goals.assists ?? undefined,
          yellowCards: stats.cards.yellow ?? undefined,
          redCards: stats.cards.red ?? undefined,
          shots: stats.shots.total ?? undefined,
          shotsOnTarget: stats.shots.on ?? undefined,
          passes: stats.passes.total ?? undefined,
          passAccuracy: stats.passes.accuracy
            ? parseFloat(stats.passes.accuracy)
            : undefined,
          keyPasses: stats.passes.key ?? undefined,
          tackles: stats.tackles.total ?? undefined,
          interceptions: stats.tackles.interceptions ?? undefined,
          blocks: stats.tackles.blocks ?? undefined,
          duelsWon: stats.duels.won ?? undefined,
          duelsTotal: stats.duels.total ?? undefined,
          dribbles: stats.dribbles.attempts ?? undefined,
          dribblesSuccessful: stats.dribbles.success ?? undefined,
          foulsCommitted: stats.fouls.committed ?? undefined,
          foulsDrawn: stats.fouls.drawn ?? undefined,
          saves: stats.goals.saves ?? undefined,
          goalsConceded: stats.goals.conceded ?? undefined,
          penaltiesSaved: stats.penalty.saved ?? undefined,
          penaltiesMissed: stats.penalty.missed ?? undefined,
        },
      });
    }
  }

  return {
    items,
    rateLimit: response.rateLimit,
  };
}

// Re-export error type
export { ApiFootballError };
