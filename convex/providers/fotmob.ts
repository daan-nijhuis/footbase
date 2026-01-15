/**
 * FotMob Provider Stub
 *
 * This is a placeholder for future FotMob integration.
 * The interface matches apiFootball.ts for consistency.
 */

import type {
  CanonicalCompetition,
  CanonicalTeam,
  CanonicalPlayer,
  CanonicalFixture,
  CanonicalAppearance,
  FetchResult,
} from "./apiFootball";

// Re-export types for consumers
export type {
  CanonicalCompetition,
  CanonicalTeam,
  CanonicalPlayer,
  CanonicalFixture,
  CanonicalAppearance,
  FetchResult,
};

export class FotMobError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FotMobError";
  }
}

const NOT_IMPLEMENTED = "FotMob provider is not yet implemented";

export async function fetchLeaguesByCountry(
  _country: string
): Promise<FetchResult<CanonicalCompetition>> {
  throw new FotMobError(NOT_IMPLEMENTED);
}

export async function fetchTeamsByLeague(
  _leagueId: string,
  _season: string
): Promise<FetchResult<CanonicalTeam>> {
  throw new FotMobError(NOT_IMPLEMENTED);
}

export async function fetchPlayersByLeague(
  _leagueId: string,
  _season: string,
  _page?: number
): Promise<FetchResult<CanonicalPlayer>> {
  throw new FotMobError(NOT_IMPLEMENTED);
}

export async function fetchFixturesByLeague(
  _leagueId: string,
  _season: string,
  _dateFrom: string,
  _dateTo: string
): Promise<FetchResult<CanonicalFixture>> {
  throw new FotMobError(NOT_IMPLEMENTED);
}

export async function fetchFixturePlayerStats(
  _fixtureId: string
): Promise<FetchResult<CanonicalAppearance>> {
  throw new FotMobError(NOT_IMPLEMENTED);
}
