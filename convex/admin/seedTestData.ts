/**
 * Seed Test Data
 *
 * Seeds the database with test players for demonstrating enrichment.
 * Used when API-Football quota is exhausted.
 */

import { v } from "convex/values";
import { internalMutation } from "../_generated/server";
import type { Doc } from "../_generated/dataModel";

// Test data: Dutch and German players for enrichment testing
const TEST_COMPETITIONS = [
  {
    providerLeagueId: "88",
    name: "Eredivisie",
    country: "Netherlands",
    season: "2024",
    type: "League",
    logoUrl: "https://media.api-sports.io/football/leagues/88.png",
    isActive: true,
    tier: "Gold" as const,
  },
  {
    providerLeagueId: "78",
    name: "Bundesliga",
    country: "Germany",
    season: "2024",
    type: "League",
    logoUrl: "https://media.api-sports.io/football/leagues/78.png",
    isActive: true,
    tier: "Platinum" as const,
  },
];

const TEST_TEAMS = [
  {
    providerTeamId: "194",
    name: "Ajax",
    competitionProviderLeagueId: "88",
    logoUrl: "https://media.api-sports.io/football/teams/194.png",
  },
  {
    providerTeamId: "197",
    name: "PSV Eindhoven",
    competitionProviderLeagueId: "88",
    logoUrl: "https://media.api-sports.io/football/teams/197.png",
  },
  {
    providerTeamId: "157",
    name: "Bayern Munich",
    competitionProviderLeagueId: "78",
    logoUrl: "https://media.api-sports.io/football/teams/157.png",
  },
  {
    providerTeamId: "165",
    name: "Borussia Dortmund",
    competitionProviderLeagueId: "78",
    logoUrl: "https://media.api-sports.io/football/teams/165.png",
  },
];

const TEST_PLAYERS = [
  // Ajax players
  {
    providerPlayerId: "35845",
    name: "Steven Bergwijn",
    age: 26,
    birthDate: "1997-10-08",
    nationality: "Netherlands",
    position: "Attacker",
    positionGroup: "ATT" as const,
    photoUrl: "https://media.api-sports.io/football/players/35845.png",
    teamProviderTeamId: "194",
  },
  {
    providerPlayerId: "47380",
    name: "Brian Brobbey",
    age: 22,
    birthDate: "2002-02-01",
    nationality: "Netherlands",
    position: "Attacker",
    positionGroup: "ATT" as const,
    photoUrl: "https://media.api-sports.io/football/players/47380.png",
    teamProviderTeamId: "194",
  },
  // PSV players
  {
    providerPlayerId: "2295",
    name: "Luuk de Jong",
    age: 33,
    birthDate: "1990-08-27",
    nationality: "Netherlands",
    position: "Attacker",
    positionGroup: "ATT" as const,
    photoUrl: "https://media.api-sports.io/football/players/2295.png",
    teamProviderTeamId: "197",
  },
  {
    providerPlayerId: "47393",
    name: "Johan Bakayoko",
    age: 21,
    birthDate: "2003-04-01",
    nationality: "Belgium",
    position: "Midfielder",
    positionGroup: "MID" as const,
    photoUrl: "https://media.api-sports.io/football/players/47393.png",
    teamProviderTeamId: "197",
  },
  // Bayern Munich players
  {
    providerPlayerId: "521",
    name: "Harry Kane",
    age: 31,
    birthDate: "1993-07-28",
    nationality: "England",
    position: "Attacker",
    positionGroup: "ATT" as const,
    photoUrl: "https://media.api-sports.io/football/players/521.png",
    teamProviderTeamId: "157",
  },
  {
    providerPlayerId: "1100",
    name: "Thomas Muller",
    age: 35,
    birthDate: "1989-09-13",
    nationality: "Germany",
    position: "Midfielder",
    positionGroup: "MID" as const,
    photoUrl: "https://media.api-sports.io/football/players/1100.png",
    teamProviderTeamId: "157",
  },
  // Dortmund players
  {
    providerPlayerId: "1573",
    name: "Marco Reus",
    age: 35,
    birthDate: "1989-05-31",
    nationality: "Germany",
    position: "Midfielder",
    positionGroup: "MID" as const,
    photoUrl: "https://media.api-sports.io/football/players/1573.png",
    teamProviderTeamId: "165",
  },
  {
    providerPlayerId: "30893",
    name: "Karim Adeyemi",
    age: 22,
    birthDate: "2002-01-18",
    nationality: "Germany",
    position: "Attacker",
    positionGroup: "ATT" as const,
    photoUrl: "https://media.api-sports.io/football/players/30893.png",
    teamProviderTeamId: "165",
  },
];

/**
 * Seed test competitions, teams, and players
 */
export const seedTestCompetitions = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const results = { competitions: 0, teams: 0, players: 0 };

    // Seed competitions
    for (const comp of TEST_COMPETITIONS) {
      const existing = await ctx.db
        .query("competitions")
        .withIndex("by_provider_league", (q) =>
          q.eq("provider", "apiFootball").eq("providerLeagueId", comp.providerLeagueId)
        )
        .first();

      if (!existing) {
        await ctx.db.insert("competitions", {
          provider: "apiFootball",
          providerLeagueId: comp.providerLeagueId,
          name: comp.name,
          country: comp.country,
          season: comp.season,
          type: comp.type,
          logoUrl: comp.logoUrl,
          isActive: comp.isActive,
          tier: comp.tier,
          createdAt: now,
        });
        results.competitions++;
      }
    }

    // Get competition map
    const competitions = await ctx.db.query("competitions").collect();
    const compMap = new Map(competitions.map((c) => [c.providerLeagueId, c._id]));

    // Seed teams
    for (const team of TEST_TEAMS) {
      const competitionId = compMap.get(team.competitionProviderLeagueId);
      if (!competitionId) continue;

      const existing = await ctx.db
        .query("teams")
        .withIndex("by_provider_team", (q) =>
          q.eq("provider", "apiFootball").eq("providerTeamId", team.providerTeamId)
        )
        .first();

      if (!existing) {
        await ctx.db.insert("teams", {
          provider: "apiFootball",
          providerTeamId: team.providerTeamId,
          name: team.name,
          logoUrl: team.logoUrl,
          competitionId,
          createdAt: now,
        });
        results.teams++;
      }
    }

    // Get team map
    const teams = await ctx.db.query("teams").collect();
    const teamMap = new Map(teams.map((t) => [t.providerTeamId, t]));

    // Seed players
    for (const player of TEST_PLAYERS) {
      const team = teamMap.get(player.teamProviderTeamId);
      if (!team) continue;

      const existing = await ctx.db
        .query("players")
        .withIndex("by_provider_player", (q) =>
          q.eq("provider", "apiFootball").eq("providerPlayerId", player.providerPlayerId)
        )
        .first();

      if (!existing) {
        await ctx.db.insert("players", {
          provider: "apiFootball",
          providerPlayerId: player.providerPlayerId,
          name: player.name,
          nameNormalized: player.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          age: player.age,
          birthDate: player.birthDate,
          nationality: player.nationality,
          position: player.position,
          positionGroup: player.positionGroup,
          photoUrl: player.photoUrl,
          teamId: team._id,
          competitionId: team.competitionId,
          createdAt: now,
        });
        results.players++;
      }
    }

    console.log(`[Seed] Seeded test data:`, results);
    return results;
  },
});

/**
 * Clear all test data
 */
export const clearTestData = internalMutation({
  args: {
    confirm: v.boolean(),
  },
  handler: async (ctx, args) => {
    if (!args.confirm) {
      throw new Error("Must confirm deletion by passing confirm: true");
    }

    // Delete in order: dependent tables first
    const externalIds = await ctx.db.query("playerExternalIds").collect();
    for (const e of externalIds) {
      await ctx.db.delete(e._id);
    }

    const profiles = await ctx.db.query("providerPlayerProfiles").collect();
    for (const p of profiles) {
      await ctx.db.delete(p._id);
    }

    const appearances = await ctx.db.query("appearances").collect();
    for (const a of appearances) {
      await ctx.db.delete(a._id);
    }

    const players = await ctx.db.query("players").collect();
    for (const p of players) {
      await ctx.db.delete(p._id);
    }

    const teams = await ctx.db.query("teams").collect();
    for (const t of teams) {
      await ctx.db.delete(t._id);
    }

    const competitions = await ctx.db.query("competitions").collect();
    for (const c of competitions) {
      await ctx.db.delete(c._id);
    }

    return {
      deleted: {
        externalIds: externalIds.length,
        profiles: profiles.length,
        appearances: appearances.length,
        players: players.length,
        teams: teams.length,
        competitions: competitions.length,
      },
    };
  },
});
