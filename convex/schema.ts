import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Tier enum for competition classification
export const tierValidator = v.union(
  v.literal("Platinum"),
  v.literal("Diamond"),
  v.literal("Elite"),
  v.literal("Gold"),
  v.literal("Silver"),
  v.literal("Bronze")
);

// Position group enum
export const positionGroupValidator = v.union(
  v.literal("GK"),
  v.literal("DEF"),
  v.literal("MID"),
  v.literal("ATT")
);

// Provider enum (extensible for future providers)
export const providerValidator = v.union(
  v.literal("apiFootball"),
  v.literal("fotmob"),
  v.literal("sofascore")
);

// Ingestion status enum
export const ingestionStatusValidator = v.union(
  v.literal("pending"),
  v.literal("running"),
  v.literal("completed"),
  v.literal("failed")
);

// Stats object validator for appearances
export const statsValidator = v.object({
  goals: v.optional(v.number()),
  assists: v.optional(v.number()),
  yellowCards: v.optional(v.number()),
  redCards: v.optional(v.number()),
  shots: v.optional(v.number()),
  shotsOnTarget: v.optional(v.number()),
  passes: v.optional(v.number()),
  passAccuracy: v.optional(v.number()),
  keyPasses: v.optional(v.number()),
  tackles: v.optional(v.number()),
  interceptions: v.optional(v.number()),
  clearances: v.optional(v.number()),
  blocks: v.optional(v.number()),
  duelsWon: v.optional(v.number()),
  duelsTotal: v.optional(v.number()),
  aerialDuelsWon: v.optional(v.number()),
  aerialDuelsTotal: v.optional(v.number()),
  dribbles: v.optional(v.number()),
  dribblesSuccessful: v.optional(v.number()),
  foulsCommitted: v.optional(v.number()),
  foulsDrawn: v.optional(v.number()),
  saves: v.optional(v.number()),
  goalsConceded: v.optional(v.number()),
  cleanSheet: v.optional(v.boolean()),
  penaltiesSaved: v.optional(v.number()),
  penaltiesMissed: v.optional(v.number()),
  xG: v.optional(v.number()),
  xA: v.optional(v.number()),
});

// Totals object for aggregated stats
export const totalsValidator = v.object({
  appearances: v.number(),
  goals: v.optional(v.number()),
  assists: v.optional(v.number()),
  yellowCards: v.optional(v.number()),
  redCards: v.optional(v.number()),
  shots: v.optional(v.number()),
  shotsOnTarget: v.optional(v.number()),
  passes: v.optional(v.number()),
  keyPasses: v.optional(v.number()),
  tackles: v.optional(v.number()),
  interceptions: v.optional(v.number()),
  clearances: v.optional(v.number()),
  blocks: v.optional(v.number()),
  duelsWon: v.optional(v.number()),
  duelsTotal: v.optional(v.number()),
  aerialDuelsWon: v.optional(v.number()),
  aerialDuelsTotal: v.optional(v.number()),
  dribbles: v.optional(v.number()),
  dribblesSuccessful: v.optional(v.number()),
  foulsCommitted: v.optional(v.number()),
  foulsDrawn: v.optional(v.number()),
  saves: v.optional(v.number()),
  goalsConceded: v.optional(v.number()),
  cleanSheets: v.optional(v.number()),
  xG: v.optional(v.number()),
  xA: v.optional(v.number()),
});

// Per90 stats validator
export const per90Validator = v.object({
  goals: v.optional(v.number()),
  assists: v.optional(v.number()),
  shots: v.optional(v.number()),
  shotsOnTarget: v.optional(v.number()),
  passes: v.optional(v.number()),
  keyPasses: v.optional(v.number()),
  tackles: v.optional(v.number()),
  interceptions: v.optional(v.number()),
  clearances: v.optional(v.number()),
  blocks: v.optional(v.number()),
  duelsWon: v.optional(v.number()),
  aerialDuelsWon: v.optional(v.number()),
  dribbles: v.optional(v.number()),
  dribblesSuccessful: v.optional(v.number()),
  foulsCommitted: v.optional(v.number()),
  foulsDrawn: v.optional(v.number()),
  saves: v.optional(v.number()),
  goalsConceded: v.optional(v.number()),
  xG: v.optional(v.number()),
  xA: v.optional(v.number()),
});

// Weights object for rating profiles
export const weightsValidator = v.record(v.string(), v.number());

// Ingestion summary object
export const ingestionSummaryValidator = v.object({
  competitionsProcessed: v.optional(v.number()),
  teamsProcessed: v.optional(v.number()),
  playersProcessed: v.optional(v.number()),
  appearancesProcessed: v.optional(v.number()),
  errorsCount: v.optional(v.number()),
});

export default defineSchema({
  // Competitions table
  competitions: defineTable({
    name: v.string(),
    country: v.string(),
    provider: providerValidator,
    providerLeagueId: v.string(),
    season: v.string(),
    tier: v.optional(tierValidator),
    isActive: v.boolean(),
    logoUrl: v.optional(v.string()),
    type: v.optional(v.string()), // "League" or "Cup"
    createdAt: v.number(),
  })
    .index("by_country", ["country"])
    .index("by_provider_league", ["provider", "providerLeagueId"])
    .index("by_tier", ["tier"])
    .index("by_active", ["isActive"]),

  // Teams table
  teams: defineTable({
    name: v.string(),
    competitionId: v.id("competitions"),
    provider: providerValidator,
    providerTeamId: v.string(),
    logoUrl: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_competition", ["competitionId"])
    .index("by_provider_team", ["provider", "providerTeamId"]),

  // Players table
  players: defineTable({
    name: v.string(),
    teamId: v.id("teams"),
    competitionId: v.id("competitions"),
    provider: providerValidator,
    birthDate: v.optional(v.string()),
    age: v.optional(v.number()),
    nationality: v.optional(v.string()),
    position: v.string(),
    positionGroup: positionGroupValidator,
    providerPlayerId: v.string(),
    photoUrl: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_competition", ["competitionId"])
    .index("by_team", ["teamId"])
    .index("by_provider_player", ["provider", "providerPlayerId"])
    .index("by_positionGroup", ["positionGroup"]),

  // Appearances table (per-match stats)
  appearances: defineTable({
    playerId: v.id("players"),
    matchDate: v.string(),
    competitionId: v.id("competitions"),
    teamId: v.id("teams"),
    minutes: v.number(),
    stats: statsValidator,
    provider: providerValidator,
    providerFixtureId: v.string(),
    createdAt: v.number(),
  })
    .index("by_player_date", ["playerId", "matchDate"])
    .index("by_competition_date", ["competitionId", "matchDate"])
    .index("by_provider_fixture_player", ["provider", "providerFixtureId", "playerId"]),

  // Player rolling stats (aggregated over time window)
  playerRollingStats: defineTable({
    playerId: v.id("players"),
    competitionId: v.id("competitions"),
    fromDate: v.string(),
    toDate: v.string(),
    minutes: v.number(),
    totals: totalsValidator,
    per90: per90Validator,
    last5: totalsValidator,
    updatedAt: v.number(),
  }).index("by_player_competition", ["playerId", "competitionId"]),

  // Rating profiles (weights per position group)
  ratingProfiles: defineTable({
    positionGroup: positionGroupValidator,
    weights: weightsValidator,
    invertMetrics: v.array(v.string()),
    updatedAt: v.number(),
  }).index("by_positionGroup", ["positionGroup"]),

  // Player ratings (computed scores)
  playerRatings: defineTable({
    playerId: v.id("players"),
    competitionId: v.id("competitions"),
    positionGroup: positionGroupValidator,
    rating365: v.number(),
    ratingLast5: v.number(),
    tier: v.optional(tierValidator),
    levelScore: v.number(),
    updatedAt: v.number(),
  })
    .index("by_competition_rating", ["competitionId", "rating365"])
    .index("by_positionGroup_rating", ["positionGroup", "rating365"]),

  // Competition ratings (strength scores per competition)
  competitionRatings: defineTable({
    competitionId: v.id("competitions"),
    tier: v.optional(tierValidator),
    strengthScore: v.number(),
    updatedAt: v.number(),
  }).index("by_strengthScore", ["strengthScore"]),

  // Ingestion runs (tracking data pipeline runs)
  ingestionRuns: defineTable({
    provider: providerValidator,
    startedAt: v.number(),
    finishedAt: v.optional(v.number()),
    status: ingestionStatusValidator,
    summary: v.optional(ingestionSummaryValidator),
    error: v.optional(v.string()),
    requestsUsed: v.optional(v.number()),
  }).index("by_startedAt", ["startedAt"]),

  // Ingestion state for resumable operations
  ingestionState: defineTable({
    provider: providerValidator,
    competitionId: v.id("competitions"),
    season: v.string(),
    // Player pagination state
    playersNextPage: v.optional(v.number()),
    playersComplete: v.optional(v.boolean()),
    // Teams state
    teamsComplete: v.optional(v.boolean()),
    // Fixtures state
    fixturesLastDate: v.optional(v.string()),
    updatedAt: v.number(),
  }).index("by_provider_competition", ["provider", "competitionId"]),
});
