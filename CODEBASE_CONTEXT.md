# Footbase Codebase Context

> Auto-generated context export for LLM understanding

## Overview

**Footbase** is a football player statistics platform that:
- Ingests data from multiple sports data providers (API-Football, Fotmob, SofaScore)
- Enriches player data (height, weight, preferred foot)
- Computes player ratings and aggregated statistics
- Displays data through a React web application

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + TanStack Router + Vite |
| Backend | Convex (serverless DB + functions) |
| Styling | Tailwind CSS + Radix UI |
| Data Sources | API-Football, Fotmob, SofaScore, Wikidata |
| Deployment | Vercel |

## Directory Structure

```
Footbase/
├── convex/                   # Convex serverless backend
├──   providers/              # External API integrations
├──   ingest/                 # Data ingestion pipelines
├──   ratings/                # Player rating computation
├──   enrichment/             # Data enrichment logic
├──   merge/                  # Player merging logic
├──   resolve/                # Player resolution
├── src/                      # React frontend
├──   routes/                 # TanStack Router pages
├──   components/app/         # Business logic components
├──   lib/                    # Utilities & providers
```

## Export Statistics

- **Generated**: 2026-01-15T16:35:42.861Z
- **Files exported**: 45
- **Total size**: 367.1 KB

## Environment Variables

```env
# Convex
# Get these values by running `npx convex dev`
CONVEX_DEPLOYMENT=dev:your-project-name
VITE_CONVEX_URL=https://your-project-name.convex.cloud

# API Football (for data ingestion - future use)
# Sign up at https://www.api-football.com/ or https://rapidapi.com/api-sports/api/api-football
API_FOOTBALL_KEY=your_api_key_here
API_FOOTBALL_HOST=api-football-v1.p.rapidapi.com

```

## File Index

### 📦 Dependencies

- `package.json`

### 🗄️ Database Schema

- `convex/schema.ts`

### 📊 Database Queries

- `convex/competitionQueries.ts`
- `convex/playerQueries.ts`

### ⚙️ Backend Logic

- `convex/admin.ts`
- `convex/crons.ts`
- `convex/health.ts`

### 🔌 External Providers

- `convex/providers/apiFootball.ts`
- `convex/providers/apiFootballClient.ts`
- `convex/providers/fetchWrapper.ts`
- `convex/providers/fotmob.ts`
- `convex/providers/sofascore.ts`

### 📥 Data Ingestion

- `convex/ingest/apiFootballIngest.ts`
- `convex/ingest/cronRunner.ts`

### ⭐ Rating System

- `convex/ratings/aggregate.ts`
- `convex/ratings/compute.ts`
- `convex/ratings/positionMapping.ts`
- `convex/ratings/scoring.ts`
- `convex/ratings/seed.ts`

### ✨ Data Enrichment

- `convex/enrichment/enrichActions.ts`
- `convex/enrichment/testProviders.ts`

### 🔀 Player Merging

- `convex/merge/mergePlayer.ts`

### 🔍 Player Resolution

- `convex/resolve/resolvePlayer.ts`

### 🔧 Admin Utilities

- `convex/admin/seedTestData.ts`

### 📚 Backend Utilities

- `convex/lib/metrics.ts`

### 🛤️ Routes & Pages

- `src/routes/__root.tsx`
- `src/routes/competitions.$competitionId.tsx`
- `src/routes/competitions.index.tsx`
- `src/routes/debug.tsx`
- `src/routes/index.tsx`
- `src/routes/players.$playerId.tsx`
- `src/routes/players.index.tsx`

### 🧩 App Components

- `src/components/app/CompetitionsTable.tsx`
- `src/components/app/Pagination.tsx`
- `src/components/app/PlayerFilters.tsx`
- `src/components/app/PlayersTable.tsx`
- `src/components/app/PositionBadge.tsx`
- `src/components/app/RatingDisplay.tsx`
- `src/components/app/StatsCard.tsx`
- `src/components/app/TierBadge.tsx`

### 🔧 Frontend Utilities

- `src/lib/convex.ts`
- `src/lib/metrics.ts`
- `src/lib/providers.tsx`
- `src/lib/utils.ts`

### 📄 Other

- `src/router.tsx`

---

## File Contents

### 📦 Dependencies

#### `package.json`

```json
{
  "name": "footbase",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev --port 3000",
    "dev:convex": "npx convex dev",
    "dev:all": "concurrently \"pnpm dev\" \"pnpm dev:convex\"",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "export-context": "npx tsx scripts/export-context.ts"
  },
  "dependencies": {
    "@convex-dev/react-query": "^0.1.0",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-tabs": "^1.1.13",
    "@tanstack/react-devtools": "^0.7.0",
    "@tanstack/react-query": "^5.90.17",
    "@tanstack/react-router": "^1.132.0",
    "@tanstack/react-router-devtools": "^1.132.0",
    "@tanstack/react-router-ssr-query": "^1.131.7",
    "@tanstack/react-start": "^1.132.0",
    "@tanstack/react-table": "^8.21.3",
    "@tanstack/router-plugin": "^1.132.0",
    "@vercel/analytics": "^1.6.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "convex": "^1.31.4",
    "framer-motion": "^12.26.2",
    "lucide-react": "^0.561.0",
    "nitro": "npm:nitro-nightly@latest",
    "nuqs": "^2.8.6",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "tailwind-merge": "^3.4.0",
    "vite-tsconfig-paths": "^6.0.2"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.18",
    "@tanstack/devtools-vite": "^0.3.11",
    "@testing-library/dom": "^10.4.0",
    "@testing-library/react": "^16.2.0",
    "@types/node": "^22.10.2",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "@vitejs/plugin-react": "^5.0.4",
    "autoprefixer": "^10.4.23",
    "concurrently": "^9.2.1",
    "jsdom": "^27.0.0",
    "tailwindcss": "^4.1.18",
    "tsx": "^4.21.0",
    "typescript": "^5.7.2",
    "vite": "^7.1.7",
    "vitest": "^3.0.5",
    "web-vitals": "^5.1.0"
  }
}
```

### 🗄️ Database Schema

#### `convex/schema.ts`

```typescript
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
  v.literal("sofascore"),
  v.literal("thesportsdb"),
  v.literal("wikidata"),
  v.literal("footballdata")
);

// Enrichment window type
export const enrichmentWindowValidator = v.union(
  v.literal("365"),
  v.literal("season"),
  v.literal("career")
);

// Preferred foot enum
export const preferredFootValidator = v.union(
  v.literal("left"),
  v.literal("right"),
  v.literal("both")
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
    nameNormalized: v.optional(v.string()), // Lowercase, no accents, for matching
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
    // Enriched fields
    heightCm: v.optional(v.number()),
    weightKg: v.optional(v.number()),
    preferredFoot: v.optional(preferredFootValidator),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_competition", ["competitionId"])
    .index("by_team", ["teamId"])
    .index("by_provider_player", ["provider", "providerPlayerId"])
    .index("by_positionGroup", ["positionGroup"])
    .index("by_nameNormalized", ["nameNormalized"]),

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

  // ============================================================================
  // Enrichment Tables
  // ============================================================================

  // External IDs for players (maps canonical player to provider-specific IDs)
  playerExternalIds: defineTable({
    playerId: v.id("players"),
    provider: providerValidator,
    providerPlayerId: v.string(),
    providerTeamId: v.optional(v.string()),
    providerCompetitionId: v.optional(v.string()),
    confidence: v.number(), // 0-1 confidence score
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_provider_playerId", ["provider", "providerPlayerId"])
    .index("by_player", ["playerId"])
    .index("by_player_provider", ["playerId", "provider"]),

  // External IDs for teams
  teamExternalIds: defineTable({
    teamId: v.id("teams"),
    provider: providerValidator,
    providerTeamId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_provider_teamId", ["provider", "providerTeamId"])
    .index("by_team", ["teamId"]),

  // External IDs for competitions
  competitionExternalIds: defineTable({
    competitionId: v.id("competitions"),
    provider: providerValidator,
    providerCompetitionId: v.string(),
    season: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_provider_competitionId", ["provider", "providerCompetitionId", "season"])
    .index("by_competition", ["competitionId"]),

  // Provider player profiles (raw + normalized data from each provider)
  providerPlayerProfiles: defineTable({
    playerId: v.id("players"),
    provider: providerValidator,
    fetchedAt: v.number(),
    // Raw profile JSON from provider
    profile: v.any(),
    // Normalized canonical fields extracted from profile
    normalized: v.object({
      name: v.optional(v.string()),
      birthDate: v.optional(v.string()),
      nationality: v.optional(v.string()),
      heightCm: v.optional(v.number()),
      weightKg: v.optional(v.number()),
      preferredFoot: v.optional(preferredFootValidator),
      photoUrl: v.optional(v.string()),
      position: v.optional(v.string()),
      positionGroup: v.optional(positionGroupValidator),
    }),
  }).index("by_player_provider", ["playerId", "provider"]),

  // Provider player aggregates (stats from each provider)
  providerPlayerAggregates: defineTable({
    playerId: v.id("players"),
    provider: providerValidator,
    competitionId: v.optional(v.id("competitions")),
    window: enrichmentWindowValidator,
    fromDate: v.optional(v.string()),
    toDate: v.optional(v.string()),
    season: v.optional(v.string()),
    minutes: v.optional(v.number()),
    appearances: v.optional(v.number()),
    totals: v.optional(totalsValidator),
    per90: v.optional(per90Validator),
    // Additional stats that may come from enrichment providers
    additionalStats: v.optional(v.object({
      xG: v.optional(v.number()),
      xA: v.optional(v.number()),
      xGPer90: v.optional(v.number()),
      xAPer90: v.optional(v.number()),
      npxG: v.optional(v.number()), // Non-penalty xG
      npxGPer90: v.optional(v.number()),
      progressivePasses: v.optional(v.number()),
      progressiveCarries: v.optional(v.number()),
      successfulPressures: v.optional(v.number()),
    })),
    fetchedAt: v.number(),
  }).index("by_player_provider_window", ["playerId", "provider", "window"]),

  // Provider player match stats (per-match stats from enrichment providers)
  providerPlayerMatchStats: defineTable({
    playerId: v.id("players"),
    provider: providerValidator,
    matchKey: v.string(), // Unique key for the match (e.g., "2024-05-01_team1_team2")
    matchDate: v.string(),
    competitionId: v.optional(v.id("competitions")),
    teamId: v.optional(v.id("teams")),
    minutes: v.optional(v.number()),
    stats: v.object({
      goals: v.optional(v.number()),
      assists: v.optional(v.number()),
      xG: v.optional(v.number()),
      xA: v.optional(v.number()),
      shots: v.optional(v.number()),
      shotsOnTarget: v.optional(v.number()),
      keyPasses: v.optional(v.number()),
      tackles: v.optional(v.number()),
      interceptions: v.optional(v.number()),
      // Add more as needed
    }),
    fetchedAt: v.number(),
  })
    .index("by_provider_match_player", ["provider", "matchKey", "playerId"])
    .index("by_player_date", ["playerId", "matchDate"]),

  // Enrichment state for resumable operations
  enrichmentState: defineTable({
    provider: providerValidator,
    cursor: v.optional(v.any()), // Provider-specific cursor for pagination
    lastProcessedPlayerId: v.optional(v.id("players")),
    totalProcessed: v.optional(v.number()),
    updatedAt: v.number(),
  }).index("by_provider", ["provider"]),

  // Unresolved external players (review queue for ambiguous matches)
  unresolvedExternalPlayers: defineTable({
    provider: providerValidator,
    providerPlayerId: v.string(),
    payload: v.any(), // Raw player data from provider
    candidatePlayerIds: v.optional(v.array(v.id("players"))), // Potential matches
    reason: v.string(), // Why it couldn't be resolved
    status: v.union(
      v.literal("pending"),
      v.literal("resolved"),
      v.literal("rejected")
    ),
    resolvedPlayerId: v.optional(v.id("players")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_provider_playerId", ["provider", "providerPlayerId"])
    .index("by_status", ["status"]),

  // Player field conflicts (when providers disagree)
  playerFieldConflicts: defineTable({
    playerId: v.id("players"),
    field: v.string(), // e.g., "birthDate", "heightCm"
    canonicalValue: v.optional(v.any()),
    provider: providerValidator,
    providerValue: v.any(),
    resolved: v.boolean(),
    resolvedValue: v.optional(v.any()),
    fetchedAt: v.number(),
    resolvedAt: v.optional(v.number()),
  })
    .index("by_player_field", ["playerId", "field"])
    .index("by_unresolved", ["resolved"]),
});
```

### 📊 Database Queries

#### `convex/competitionQueries.ts`

```typescript
import { v } from "convex/values";
import { query } from "./_generated/server";
import { tierValidator } from "./schema";

/**
 * List competitions with optional filters
 */
export const list = query({
  args: {
    country: v.optional(v.string()),
    tier: v.optional(tierValidator),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Fetch all competitions and filter in memory for flexibility
    const competitions = await ctx.db.query("competitions").collect();

    // Apply filters
    let filtered = competitions;
    if (args.isActive !== undefined) {
      filtered = filtered.filter((c) => c.isActive === args.isActive);
    }
    if (args.country) {
      filtered = filtered.filter((c) => c.country === args.country);
    }
    if (args.tier) {
      filtered = filtered.filter((c) => c.tier === args.tier);
    }

    // Get competition ratings for strength scores
    const competitionRatings = await ctx.db.query("competitionRatings").collect();
    const ratingsMap = new Map(
      competitionRatings.map((r) => [r.competitionId, r])
    );

    // Get player counts per competition
    const players = await ctx.db.query("players").collect();
    const playerCountMap = new Map<string, number>();
    for (const player of players) {
      const key = player.competitionId;
      playerCountMap.set(key, (playerCountMap.get(key) || 0) + 1);
    }

    // Map to output format
    const result = filtered.map((competition) => {
      const rating = ratingsMap.get(competition._id);
      return {
        _id: competition._id,
        name: competition.name,
        country: competition.country,
        tier: competition.tier ?? rating?.tier,
        isActive: competition.isActive,
        logoUrl: competition.logoUrl,
        strengthScore: rating?.strengthScore,
        playerCount: playerCountMap.get(competition._id) || 0,
        season: competition.season,
      };
    });

    // Sort by strength score descending, then by name
    result.sort((a, b) => {
      if (a.strengthScore && b.strengthScore) {
        return b.strengthScore - a.strengthScore;
      }
      if (a.strengthScore) return -1;
      if (b.strengthScore) return 1;
      return a.name.localeCompare(b.name);
    });

    return result;
  },
});

/**
 * Get a single competition by ID
 */
export const get = query({
  args: {
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, args) => {
    const competition = await ctx.db.get(args.competitionId);
    if (!competition) return null;

    // Get competition rating
    const ratings = await ctx.db.query("competitionRatings").collect();
    const rating = ratings.find((r) => r.competitionId === args.competitionId);

    // Get player count
    const players = await ctx.db
      .query("players")
      .withIndex("by_competition", (q) => q.eq("competitionId", args.competitionId))
      .collect();

    // Get team count
    const teams = await ctx.db
      .query("teams")
      .withIndex("by_competition", (q) => q.eq("competitionId", args.competitionId))
      .collect();

    return {
      ...competition,
      tier: competition.tier ?? rating?.tier,
      strengthScore: rating?.strengthScore,
      playerCount: players.length,
      teamCount: teams.length,
    };
  },
});

/**
 * Get list of unique countries from competitions
 */
export const countries = query({
  args: {},
  handler: async (ctx) => {
    const competitions = await ctx.db.query("competitions").collect();
    const countriesSet = [...new Set(competitions.map((c) => c.country))];
    return countriesSet.sort();
  },
});
```

#### `convex/playerQueries.ts`

```typescript
import { v } from "convex/values";
import { query } from "./_generated/server";
import { positionGroupValidator, tierValidator } from "./schema";
import type { Doc, Id } from "./_generated/dataModel";

// Window type for rating selection
const windowValidator = v.union(v.literal("365"), v.literal("last5"));

// Sort options
const sortValidator = v.union(
  v.literal("rating"),
  v.literal("minutes"),
  v.literal("age"),
  v.literal("name")
);

/**
 * List players with filters, pagination, and sorting
 */
export const list = query({
  args: {
    search: v.optional(v.string()),
    country: v.optional(v.string()),
    competitionId: v.optional(v.id("competitions")),
    tier: v.optional(tierValidator),
    positionGroup: v.optional(positionGroupValidator),
    minMinutes: v.optional(v.number()),
    ageMin: v.optional(v.number()),
    ageMax: v.optional(v.number()),
    window: v.optional(windowValidator),
    sort: v.optional(sortValidator),
    sortDesc: v.optional(v.boolean()),
    page: v.optional(v.number()),
    pageSize: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const minMinutes = args.minMinutes ?? 90;
    const window = args.window ?? "365";
    const sort = args.sort ?? "rating";
    const sortDesc = args.sortDesc ?? true;
    const page = args.page ?? 1;
    const pageSize = Math.min(args.pageSize ?? 25, 100);

    // Fetch players - use index if filtering by competition
    let players: Doc<"players">[];
    if (args.competitionId) {
      players = await ctx.db
        .query("players")
        .withIndex("by_competition", (q) => q.eq("competitionId", args.competitionId!))
        .collect();
    } else {
      players = await ctx.db.query("players").collect();
    }

    // Get all related data in batch
    const [teams, competitions, rollingStats, playerRatings, competitionRatings] =
      await Promise.all([
        ctx.db.query("teams").collect(),
        ctx.db.query("competitions").collect(),
        ctx.db.query("playerRollingStats").collect(),
        ctx.db.query("playerRatings").collect(),
        ctx.db.query("competitionRatings").collect(),
      ]);

    // Create lookup maps
    const teamsMap = new Map(teams.map((t) => [t._id, t]));
    const competitionsMap = new Map(competitions.map((c) => [c._id, c]));
    const competitionRatingsMap = new Map(
      competitionRatings.map((r) => [r.competitionId, r])
    );

    // Create maps for player data
    const rollingStatsMap = new Map<string, Doc<"playerRollingStats">>();
    for (const stat of rollingStats) {
      rollingStatsMap.set(stat.playerId, stat);
    }

    const playerRatingsMap = new Map<string, Doc<"playerRatings">>();
    for (const rating of playerRatings) {
      playerRatingsMap.set(rating.playerId, rating);
    }

    // Apply filters
    let filtered = players.filter((player) => {
      // Search filter
      if (args.search) {
        const searchLower = args.search.toLowerCase();
        if (!player.name.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Position group filter
      if (args.positionGroup) {
        if (player.positionGroup !== args.positionGroup) {
          return false;
        }
      }

      // Country filter (via competition)
      if (args.country) {
        const competition = competitionsMap.get(player.competitionId);
        if (!competition || competition.country !== args.country) {
          return false;
        }
      }

      // Tier filter (via competition or competition rating)
      if (args.tier) {
        const competition = competitionsMap.get(player.competitionId);
        const compRating = competitionRatingsMap.get(player.competitionId);
        const tier = competition?.tier ?? compRating?.tier;
        if (tier !== args.tier) {
          return false;
        }
      }

      // Minutes filter - treat players without stats as having 0 minutes
      const stats = rollingStatsMap.get(player._id);
      const playerMinutes = stats?.minutes ?? 0;
      if (playerMinutes < minMinutes) {
        return false;
      }

      // Age filters
      if (player.age !== undefined) {
        if (args.ageMin !== undefined && player.age < args.ageMin) {
          return false;
        }
        if (args.ageMax !== undefined && player.age > args.ageMax) {
          return false;
        }
      }

      return true;
    });

    // Enrich with team, competition, and rating data
    type EnrichedPlayer = {
      _id: Id<"players">;
      name: string;
      age: number | undefined;
      nationality: string | undefined;
      positionGroup: string;
      position: string;
      photoUrl: string | undefined;
      // Enriched profile fields
      heightCm: number | undefined;
      weightKg: number | undefined;
      preferredFoot: string | undefined;
      // Team/competition
      teamId: Id<"teams">;
      teamName: string;
      teamLogoUrl: string | undefined;
      competitionId: Id<"competitions">;
      competitionName: string;
      competitionLogoUrl: string | undefined;
      tier: string | undefined;
      // Stats
      minutes: number;
      rating365: number | undefined;
      ratingLast5: number | undefined;
      levelScore: number | undefined;
    };

    const enriched: EnrichedPlayer[] = filtered.map((player) => {
      const team = teamsMap.get(player.teamId);
      const competition = competitionsMap.get(player.competitionId);
      const compRating = competitionRatingsMap.get(player.competitionId);
      const stats = rollingStatsMap.get(player._id);
      const rating = playerRatingsMap.get(player._id);

      return {
        _id: player._id,
        name: player.name,
        age: player.age,
        nationality: player.nationality,
        positionGroup: player.positionGroup,
        position: player.position,
        photoUrl: player.photoUrl,
        // Include enriched profile fields
        heightCm: player.heightCm,
        weightKg: player.weightKg,
        preferredFoot: player.preferredFoot,
        teamId: player.teamId,
        teamName: team?.name ?? "Unknown",
        teamLogoUrl: team?.logoUrl,
        competitionId: player.competitionId,
        competitionName: competition?.name ?? "Unknown",
        competitionLogoUrl: competition?.logoUrl,
        tier: competition?.tier ?? compRating?.tier,
        minutes: stats?.minutes ?? 0,
        rating365: rating?.rating365,
        ratingLast5: rating?.ratingLast5,
        levelScore: rating?.levelScore,
      };
    });

    // Sort
    enriched.sort((a, b) => {
      let comparison = 0;

      switch (sort) {
        case "rating":
          const ratingA = window === "365" ? a.rating365 : a.ratingLast5;
          const ratingB = window === "365" ? b.rating365 : b.ratingLast5;
          comparison = (ratingB ?? 0) - (ratingA ?? 0);
          break;
        case "minutes":
          comparison = b.minutes - a.minutes;
          break;
        case "age":
          comparison = (a.age ?? 99) - (b.age ?? 99);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
      }

      return sortDesc ? comparison : -comparison;
    });

    // Paginate
    const totalCount = enriched.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedPlayers = enriched.slice(startIndex, startIndex + pageSize);

    return {
      players: paginatedPlayers,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  },
});

/**
 * Get a single player with full details including enriched data
 */
export const get = query({
  args: {
    playerId: v.id("players"),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId);
    if (!player) return null;

    // Get related data
    const [team, competition] = await Promise.all([
      ctx.db.get(player.teamId),
      ctx.db.get(player.competitionId),
    ]);

    // Get competition rating for tier
    const competitionRatings = await ctx.db
      .query("competitionRatings")
      .collect();
    const compRating = competitionRatings.find(
      (r) => r.competitionId === player.competitionId
    );

    // Get player rolling stats
    const rollingStats = await ctx.db
      .query("playerRollingStats")
      .withIndex("by_player_competition", (q) =>
        q.eq("playerId", args.playerId)
      )
      .first();

    // Get player rating
    const playerRatings = await ctx.db.query("playerRatings").collect();
    const rating = playerRatings.find((r) => r.playerId === args.playerId);

    // Get last 5 appearances
    const appearances = await ctx.db
      .query("appearances")
      .withIndex("by_player_date", (q) => q.eq("playerId", args.playerId))
      .order("desc")
      .take(5);

    // Get external IDs for this player
    const externalIds = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_player", (q) => q.eq("playerId", args.playerId))
      .collect();

    // Get provider aggregates for xG/xA data
    const providerAggregates = await ctx.db
      .query("providerPlayerAggregates")
      .filter((q) => q.eq(q.field("playerId"), args.playerId))
      .collect();

    // Extract xG/xA from provider aggregates (prefer FotMob for xG data)
    const fotmobAgg = providerAggregates.find((a) => a.provider === "fotmob" && a.window === "career");
    const sofascoreAgg = providerAggregates.find((a) => a.provider === "sofascore" && a.window === "career");
    const xGData = fotmobAgg?.additionalStats || sofascoreAgg?.additionalStats;

    return {
      _id: player._id,
      name: player.name,
      age: player.age,
      birthDate: player.birthDate,
      nationality: player.nationality,
      positionGroup: player.positionGroup,
      position: player.position,
      photoUrl: player.photoUrl,
      // Enriched profile fields
      heightCm: player.heightCm,
      weightKg: player.weightKg,
      preferredFoot: player.preferredFoot,
      team: team
        ? {
            _id: team._id,
            name: team.name,
            logoUrl: team.logoUrl,
          }
        : null,
      competition: competition
        ? {
            _id: competition._id,
            name: competition.name,
            country: competition.country,
            logoUrl: competition.logoUrl,
            tier: competition.tier ?? compRating?.tier,
          }
        : null,
      stats: rollingStats
        ? {
            minutes: rollingStats.minutes,
            fromDate: rollingStats.fromDate,
            toDate: rollingStats.toDate,
            totals: rollingStats.totals,
            per90: rollingStats.per90,
            last5: rollingStats.last5,
          }
        : null,
      rating: rating
        ? {
            rating365: rating.rating365,
            ratingLast5: rating.ratingLast5,
            levelScore: rating.levelScore,
            tier: rating.tier,
          }
        : null,
      // xG/xA from enrichment providers
      advancedStats: xGData
        ? {
            xG: xGData.xG,
            xA: xGData.xA,
            xGPer90: xGData.xGPer90,
            xAPer90: xGData.xAPer90,
            npxG: xGData.npxG,
          }
        : null,
      recentAppearances: appearances.map((app) => ({
        _id: app._id,
        matchDate: app.matchDate,
        minutes: app.minutes,
        stats: app.stats,
      })),
      // External provider IDs
      externalIds: externalIds.map((ext) => ({
        provider: ext.provider,
        providerPlayerId: ext.providerPlayerId,
        confidence: ext.confidence,
      })),
    };
  },
});
```

### ⚙️ Backend Logic

#### `convex/admin.ts`

```typescript
/**
 * Admin Functions for Manual Triggers
 *
 * These internal functions can be called from the Convex dashboard
 * to manually trigger ingestion or update competition settings.
 *
 * Usage from Convex Dashboard:
 * 1. Go to Functions tab
 * 2. Find the function under "admin"
 * 3. Click "Run" and provide arguments
 */

import { v } from "convex/values";
import { internalAction, internalMutation, internalQuery, query } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { tierValidator } from "./schema";
import type { IngestionResult } from "./ingest/apiFootballIngest";
import type { DailyIngestionResult } from "./ingest/cronRunner";
import {
  fetchTeamsByLeague,
  fetchPlayersByLeague,
} from "./providers/apiFootball";

// ============================================================================
// Manual Ingestion Triggers
// ============================================================================

/**
 * Manually trigger a full ingestion run for NL + DE
 *
 * @param maxRequests - Maximum API requests to make (default: 50)
 *
 * Run from dashboard: internal.admin.adminRunIngestionNow
 * Args: { "maxRequests": 50 }
 */
export const adminRunIngestionNow = internalAction({
  args: {
    maxRequests: v.optional(v.number()),
    countries: v.optional(v.array(v.string())),
    season: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<IngestionResult> => {
    const countries = args.countries || ["Netherlands", "Germany"];
    const season = args.season || new Date().getFullYear().toString();
    const maxRequests = args.maxRequests || 50;

    console.log(
      `[Admin] Starting manual ingestion for ${countries.join(", ")}, season: ${season}, maxRequests: ${maxRequests}`
    );

    const result: IngestionResult = await ctx.runAction(
      internal.ingest.apiFootballIngest.ingestCountries,
      {
        countries,
        season,
        maxRequests,
      }
    );

    console.log("[Admin] Ingestion result:", result);
    return result;
  },
});

/**
 * Manually trigger fixture ingestion for recent matches
 *
 * @param dateFrom - Start date (YYYY-MM-DD), defaults to 2 days ago
 * @param dateTo - End date (YYYY-MM-DD), defaults to today
 * @param maxRequests - Maximum API requests (default: 30)
 *
 * Run from dashboard: internal.admin.adminRunFixturesNow
 * Args: { "dateFrom": "2024-01-01", "dateTo": "2024-01-02", "maxRequests": 30 }
 */
export const adminRunFixturesNow = internalAction({
  args: {
    dateFrom: v.optional(v.string()),
    dateTo: v.optional(v.string()),
    maxRequests: v.optional(v.number()),
    countries: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args): Promise<IngestionResult> => {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    const dateFrom = args.dateFrom || twoDaysAgo.toISOString().split("T")[0];
    const dateTo = args.dateTo || today.toISOString().split("T")[0];
    const countries = args.countries || ["Netherlands", "Germany"];
    const maxRequests = args.maxRequests || 30;

    console.log(
      `[Admin] Starting fixture ingestion from ${dateFrom} to ${dateTo}, maxRequests: ${maxRequests}`
    );

    const result: IngestionResult = await ctx.runAction(
      internal.ingest.apiFootballIngest.ingestRecentFixtures,
      {
        dateFrom,
        dateTo,
        maxRequests,
        countries,
      }
    );

    console.log("[Admin] Fixtures result:", result);
    return result;
  },
});

/**
 * Run a complete daily ingestion cycle (same as cron job)
 *
 * Run from dashboard: internal.admin.adminRunDailyNow
 * Args: {}
 */
export const adminRunDailyNow = internalAction({
  args: {},
  handler: async (ctx): Promise<DailyIngestionResult> => {
    console.log("[Admin] Running full daily ingestion cycle...");

    const result: DailyIngestionResult = await ctx.runAction(
      internal.ingest.cronRunner.runDailyIngestion,
      {}
    );

    console.log("[Admin] Daily ingestion result:", result);
    return result;
  },
});

// Internal helper query to get competition by ID
export const getCompetitionById = internalQuery({
  args: { competitionId: v.id("competitions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.competitionId);
  },
});

/**
 * Targeted ingestion for a specific competition
 * Fetches ALL teams and ALL players for one league until complete
 *
 * @param competitionId - The Convex ID of the competition to ingest
 * @param maxRequests - Maximum API requests (default: 30)
 *
 * Run from dashboard: internal.admin.ingestSingleCompetition
 */
export const ingestSingleCompetition = internalAction({
  args: {
    competitionId: v.id("competitions"),
    maxRequests: v.optional(v.number()),
    season: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    competitionName: string;
    requestsUsed: number;
    teamsAdded: number;
    playersAdded: number;
    playersComplete: boolean;
    error?: string;
  }> => {
    const maxRequests = args.maxRequests || 30;
    let requestsUsed = 0;
    let teamsAdded = 0;
    let playersAdded = 0;
    let playersComplete = false;

    // Get competition details
    const competition = await ctx.runQuery(internal.admin.getCompetitionById, {
      competitionId: args.competitionId,
    });

    if (!competition) {
      return {
        success: false,
        competitionName: "Unknown",
        requestsUsed: 0,
        teamsAdded: 0,
        playersAdded: 0,
        playersComplete: false,
        error: "Competition not found",
      };
    }

    const season = args.season || competition.season;
    console.log(`[Admin] Starting targeted ingestion for ${competition.name} (${season})`);

    try {
      // Get or create ingestion state
      const state = await ctx.runMutation(
        internal.ingest.apiFootballIngest.getIngestionState,
        { competitionId: args.competitionId, season }
      );

      // Step 1: Fetch teams if not complete
      if (!state?.teamsComplete && requestsUsed < maxRequests) {
        console.log(`[Admin] Fetching teams for ${competition.name}...`);
        const teamsResult = await fetchTeamsByLeague(
          competition.providerLeagueId,
          season
        );
        requestsUsed++;

        for (const team of teamsResult.items) {
          await ctx.runMutation(internal.ingest.apiFootballIngest.upsertTeam, {
            data: {
              providerTeamId: team.providerTeamId,
              name: team.name,
              logoUrl: team.logoUrl,
            },
            competitionId: args.competitionId,
          });
          teamsAdded++;
        }

        await ctx.runMutation(internal.ingest.apiFootballIngest.updateIngestionState, {
          stateId: state!._id,
          updates: { teamsComplete: true },
        });

        console.log(`[Admin] Added ${teamsAdded} teams for ${competition.name}`);
      }

      // Step 2: Fetch ALL players (paginated)
      // Note: Free plan limits to page 3 max (60 players)
      const MAX_PAGE_FREE_PLAN = 3;
      let currentPage = state?.playersNextPage || 1;
      let hasMorePages = !state?.playersComplete && currentPage <= MAX_PAGE_FREE_PLAN;

      while (hasMorePages && requestsUsed < maxRequests && currentPage <= MAX_PAGE_FREE_PLAN) {
        console.log(`[Admin] Fetching players page ${currentPage} for ${competition.name}...`);

        const playersResult = await fetchPlayersByLeague(
          competition.providerLeagueId,
          season,
          currentPage
        );
        requestsUsed++;

        for (const player of playersResult.items) {
          const result = await ctx.runMutation(internal.ingest.apiFootballIngest.upsertPlayer, {
            data: {
              providerPlayerId: player.providerPlayerId,
              name: player.name,
              position: player.position,
              positionGroup: player.positionGroup,
              birthDate: player.birthDate,
              age: player.age,
              nationality: player.nationality,
              photoUrl: player.photoUrl,
              providerTeamId: player.providerTeamId,
            },
            competitionId: args.competitionId,
          });
          if (result) playersAdded++;
        }

        // Check pagination (but cap at MAX_PAGE_FREE_PLAN)
        if (playersResult.paging) {
          const apiHasMore = playersResult.paging.current < playersResult.paging.total;
          currentPage = playersResult.paging.current + 1;
          hasMorePages = apiHasMore && currentPage <= MAX_PAGE_FREE_PLAN;
          console.log(`[Admin] Page ${playersResult.paging.current}/${Math.min(playersResult.paging.total, MAX_PAGE_FREE_PLAN)} - ${playersResult.items.length} players`);
        } else {
          hasMorePages = false;
        }

        // Update state
        await ctx.runMutation(internal.ingest.apiFootballIngest.updateIngestionState, {
          stateId: state!._id,
          updates: {
            playersNextPage: hasMorePages ? currentPage : undefined,
            playersComplete: !hasMorePages,
          },
        });
      }

      playersComplete = !hasMorePages;

      console.log(`[Admin] Completed: ${competition.name} - ${teamsAdded} teams, ${playersAdded} players, complete: ${playersComplete}`);

      return {
        success: true,
        competitionName: competition.name,
        requestsUsed,
        teamsAdded,
        playersAdded,
        playersComplete,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[Admin] Error ingesting ${competition.name}:`, errorMessage);
      return {
        success: false,
        competitionName: competition.name,
        requestsUsed,
        teamsAdded,
        playersAdded,
        playersComplete: false,
        error: errorMessage,
      };
    }
  },
});

// ============================================================================
// Competition Management
// ============================================================================

/**
 * Set the tier for a competition
 *
 * @param competitionId - The Convex ID of the competition
 * @param tier - One of: Platinum, Diamond, Elite, Gold, Silver, Bronze
 *
 * Run from dashboard: internal.admin.setCompetitionTier
 * Args: { "competitionId": "...", "tier": "Gold" }
 */
export const setCompetitionTier = internalMutation({
  args: {
    competitionId: v.id("competitions"),
    tier: tierValidator,
  },
  handler: async (ctx, args) => {
    const competition = await ctx.db.get(args.competitionId);
    if (!competition) {
      throw new Error(`Competition not found: ${args.competitionId}`);
    }

    await ctx.db.patch(args.competitionId, {
      tier: args.tier,
    });

    console.log(
      `[Admin] Set tier for ${competition.name} to ${args.tier}`
    );

    return { success: true, competition: competition.name, tier: args.tier };
  },
});

/**
 * Toggle competition active status
 *
 * @param competitionId - The Convex ID of the competition
 * @param isActive - Whether the competition should be active
 *
 * Run from dashboard: internal.admin.setCompetitionActive
 */
export const setCompetitionActive = internalMutation({
  args: {
    competitionId: v.id("competitions"),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const competition = await ctx.db.get(args.competitionId);
    if (!competition) {
      throw new Error(`Competition not found: ${args.competitionId}`);
    }

    await ctx.db.patch(args.competitionId, {
      isActive: args.isActive,
    });

    console.log(
      `[Admin] Set ${competition.name} isActive to ${args.isActive}`
    );

    return { success: true, competition: competition.name, isActive: args.isActive };
  },
});

/**
 * Batch set active status for competitions
 *
 * @param isActive - Whether to set competitions as active
 * @param country - Optional: filter by country
 * @param nameContains - Optional: filter by name pattern
 * @param excludeNames - Optional: names to exclude from update
 */
export const batchSetActive = internalMutation({
  args: {
    isActive: v.boolean(),
    country: v.optional(v.string()),
    nameContains: v.optional(v.string()),
    excludeNames: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    let competitions = await ctx.db.query("competitions").collect();

    if (args.country) {
      competitions = competitions.filter((c) => c.country === args.country);
    }

    if (args.nameContains) {
      competitions = competitions.filter((c) =>
        c.name.toLowerCase().includes(args.nameContains!.toLowerCase())
      );
    }

    if (args.excludeNames && args.excludeNames.length > 0) {
      const excludeLower = args.excludeNames.map((n) => n.toLowerCase());
      competitions = competitions.filter(
        (c) => !excludeLower.some((ex) => c.name.toLowerCase().includes(ex))
      );
    }

    let updated = 0;
    for (const competition of competitions) {
      await ctx.db.patch(competition._id, { isActive: args.isActive });
      updated++;
    }

    console.log(
      `[Admin] Set isActive=${args.isActive} for ${updated} competitions`
    );

    return { success: true, updated, isActive: args.isActive };
  },
});

/**
 * Batch set tiers for multiple competitions by name pattern
 *
 * @param country - Country to filter by
 * @param tier - Tier to set
 * @param nameContains - Optional name filter
 */
export const batchSetTier = internalMutation({
  args: {
    country: v.string(),
    tier: tierValidator,
    nameContains: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let competitions = await ctx.db
      .query("competitions")
      .withIndex("by_country", (q) => q.eq("country", args.country))
      .collect();

    if (args.nameContains) {
      competitions = competitions.filter((c) =>
        c.name.toLowerCase().includes(args.nameContains!.toLowerCase())
      );
    }

    let updated = 0;
    for (const competition of competitions) {
      await ctx.db.patch(competition._id, { tier: args.tier });
      updated++;
    }

    console.log(
      `[Admin] Set tier ${args.tier} for ${updated} competitions in ${args.country}`
    );

    return { success: true, updated, tier: args.tier };
  },
});

// ============================================================================
// Data Inspection Queries
// ============================================================================

/**
 * List all players with their ratings (if any)
 * This is a public query for frontend use
 */
export const listPlayersWithRatings = query({
  args: {
    limit: v.optional(v.number()),
    competitionId: v.optional(v.id("competitions")),
    hasRatingOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100;

    // Get all players
    let players;
    if (args.competitionId) {
      players = await ctx.db
        .query("players")
        .withIndex("by_competition", (q) => q.eq("competitionId", args.competitionId!))
        .collect();
    } else {
      players = await ctx.db.query("players").collect();
    }

    // Get all ratings
    const ratings = await ctx.db.query("playerRatings").collect();
    const ratingsByPlayer = new Map(ratings.map((r) => [r.playerId.toString(), r]));

    // Get all rolling stats for minutes
    const rollingStats = await ctx.db.query("playerRollingStats").collect();
    const statsByPlayer = new Map(rollingStats.map((s) => [s.playerId.toString(), s]));

    // Get teams and competitions for display
    const teams = await ctx.db.query("teams").collect();
    const teamsMap = new Map(teams.map((t) => [t._id.toString(), t]));
    const competitions = await ctx.db.query("competitions").collect();
    const competitionsMap = new Map(competitions.map((c) => [c._id.toString(), c]));

    // Build player list
    let result = players.map((p) => {
      const rating = ratingsByPlayer.get(p._id.toString());
      const stats = statsByPlayer.get(p._id.toString());
      const team = teamsMap.get(p.teamId.toString());
      const competition = competitionsMap.get(p.competitionId.toString());

      return {
        _id: p._id,
        name: p.name,
        position: p.position,
        positionGroup: p.positionGroup,
        team: team?.name ?? "Unknown",
        competition: competition?.name ?? "Unknown",
        photoUrl: p.photoUrl,
        minutes: stats?.minutes ?? 0,
        appearances: stats?.totals?.appearances ?? 0,
        rating365: rating?.rating365 ?? null,
        ratingLast5: rating?.ratingLast5 ?? null,
        levelScore: rating?.levelScore ?? null,
        hasRating: !!rating,
      };
    });

    // Filter by hasRatingOnly if specified
    if (args.hasRatingOnly) {
      result = result.filter((p) => p.hasRating);
    }

    // Sort by rating (if exists) or minutes
    result.sort((a, b) => {
      if (a.rating365 !== null && b.rating365 !== null) {
        return b.rating365 - a.rating365;
      }
      if (a.rating365 !== null) return -1;
      if (b.rating365 !== null) return 1;
      return b.minutes - a.minutes;
    });

    return result.slice(0, limit);
  },
});

/**
 * List all competitions with their current settings
 */
export const listCompetitions = query({
  args: {
    country: v.optional(v.string()),
    activeOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let competitions;

    if (args.country) {
      competitions = await ctx.db
        .query("competitions")
        .withIndex("by_country", (q) => q.eq("country", args.country!))
        .collect();
    } else if (args.activeOnly) {
      competitions = await ctx.db
        .query("competitions")
        .withIndex("by_active", (q) => q.eq("isActive", true))
        .collect();
    } else {
      competitions = await ctx.db.query("competitions").collect();
    }

    return competitions.map((c) => ({
      _id: c._id,
      name: c.name,
      country: c.country,
      season: c.season,
      tier: c.tier,
      isActive: c.isActive,
      type: c.type,
    }));
  },
});

/**
 * Get ingestion run history
 */
export const listIngestionRuns = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;

    const runs = await ctx.db
      .query("ingestionRuns")
      .withIndex("by_startedAt")
      .order("desc")
      .take(limit);

    return runs.map((r) => ({
      _id: r._id,
      status: r.status,
      startedAt: new Date(r.startedAt).toISOString(),
      finishedAt: r.finishedAt ? new Date(r.finishedAt).toISOString() : null,
      requestsUsed: r.requestsUsed,
      summary: r.summary,
      error: r.error,
    }));
  },
});

/**
 * Get ingestion stats summary
 */
export const getIngestionStats = query({
  args: {},
  handler: async (ctx) => {
    const [competitions, teams, players, appearances] = await Promise.all([
      ctx.db.query("competitions").collect(),
      ctx.db.query("teams").collect(),
      ctx.db.query("players").collect(),
      ctx.db.query("appearances").collect(),
    ]);

    const activeCompetitions = competitions.filter((c) => c.isActive);
    const competitionsByCountry = competitions.reduce(
      (acc, c) => {
        acc[c.country] = (acc[c.country] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      totalCompetitions: competitions.length,
      activeCompetitions: activeCompetitions.length,
      totalTeams: teams.length,
      totalPlayers: players.length,
      totalAppearances: appearances.length,
      competitionsByCountry,
    };
  },
});

/**
 * Debug: Test API connection and return config info
 */
export const debugTestApiConnection = internalAction({
  args: {
    country: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    config: {
      hasKey: boolean;
      host: string | undefined;
      mode: string | undefined;
    };
    result?: unknown;
    error?: string;
  }> => {
    const country = args.country || "Netherlands";

    console.log("[Debug] Testing API connection...");
    console.log("[Debug] API_FOOTBALL_KEY exists:", !!process.env.API_FOOTBALL_KEY);
    console.log("[Debug] API_FOOTBALL_HOST:", process.env.API_FOOTBALL_HOST);
    console.log("[Debug] API_FOOTBALL_MODE:", process.env.API_FOOTBALL_MODE);

    try {
      // Import dynamically to get the latest config
      const { fetchLeaguesByCountry } = await import("./providers/apiFootball");

      console.log(`[Debug] Fetching leagues for ${country}...`);
      const result = await fetchLeaguesByCountry(country);

      console.log(`[Debug] Success! Found ${result.items.length} leagues`);
      console.log("[Debug] First 3 leagues:", result.items.slice(0, 3).map(l => l.name));

      return {
        success: true,
        config: {
          hasKey: !!process.env.API_FOOTBALL_KEY,
          host: process.env.API_FOOTBALL_HOST,
          mode: process.env.API_FOOTBALL_MODE,
        },
        result: {
          leaguesFound: result.items.length,
          firstLeagues: result.items.slice(0, 5).map(l => ({
            id: l.providerLeagueId,
            name: l.name,
            type: l.type,
          })),
          rateLimit: result.rateLimit,
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[Debug] API Error:", errorMessage);

      return {
        success: false,
        config: {
          hasKey: !!process.env.API_FOOTBALL_KEY,
          host: process.env.API_FOOTBALL_HOST,
          mode: process.env.API_FOOTBALL_MODE,
        },
        error: errorMessage,
      };
    }
  },
});

/**
 * Update season for all competitions (useful for API version mismatches)
 *
 * @param fromSeason - Current season value to update
 * @param toSeason - New season value
 * @param country - Optional: only update for specific country
 *
 * Run from dashboard: internal.admin.updateCompetitionSeasons
 * Args: { "fromSeason": "2025", "toSeason": "2024" }
 */
export const updateCompetitionSeasons = internalMutation({
  args: {
    fromSeason: v.string(),
    toSeason: v.string(),
    country: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let competitions;

    if (args.country) {
      competitions = await ctx.db
        .query("competitions")
        .withIndex("by_country", (q) => q.eq("country", args.country!))
        .collect();
    } else {
      competitions = await ctx.db.query("competitions").collect();
    }

    // Filter by fromSeason
    competitions = competitions.filter((c) => c.season === args.fromSeason);

    let updated = 0;
    for (const competition of competitions) {
      await ctx.db.patch(competition._id, { season: args.toSeason });
      updated++;
    }

    console.log(
      `[Admin] Updated ${updated} competitions from season ${args.fromSeason} to ${args.toSeason}`
    );

    return { success: true, updated, fromSeason: args.fromSeason, toSeason: args.toSeason };
  },
});

/**
 * Reset ingestion state for a competition (to re-ingest from scratch)
 */
export const resetIngestionState = internalMutation({
  args: {
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, args) => {
    const state = await ctx.db
      .query("ingestionState")
      .withIndex("by_provider_competition", (q) =>
        q.eq("provider", "apiFootball").eq("competitionId", args.competitionId)
      )
      .first();

    if (state) {
      await ctx.db.delete(state._id);
      console.log(`[Admin] Deleted ingestion state for competition ${args.competitionId}`);
    }

    return { success: true, deleted: !!state };
  },
});

// ============================================================================
// Rating System Management
// ============================================================================

/**
 * Seed default rating profiles
 *
 * Run from dashboard: internal.admin.adminSeedRatingProfiles
 * Args: { "force": false }
 */
export const adminSeedRatingProfiles = internalAction({
  args: {
    force: v.optional(v.boolean()),
  },
  handler: async (ctx, args): Promise<{ seeded: boolean; count: number }> => {
    console.log("[Admin] Seeding rating profiles...");

    const result: { seeded: boolean; count: number } = await ctx.runMutation(
      internal.ratings.seed.seedRatingProfiles,
      { force: args.force ?? false }
    );

    console.log("[Admin] Seed result:", result);
    return result;
  },
});

/**
 * Manually trigger rating computation
 *
 * @param competitionId - Optional: compute for specific competition only
 * @param country - Optional: compute for specific country only
 * @param dryRun - If true, compute but don't persist
 *
 * Run from dashboard: internal.admin.adminComputeRatings
 * Args: { "country": "Netherlands", "dryRun": false }
 */
interface RatingComputationResult {
  success: boolean;
  playersProcessed: number;
  ratingsComputed: number;
  competitionsRated: number;
  dryRun?: boolean;
}

export const adminComputeRatings = internalAction({
  args: {
    competitionId: v.optional(v.id("competitions")),
    country: v.optional(v.string()),
    dryRun: v.optional(v.boolean()),
    // Custom date range (for testing with historical data)
    customFromDate: v.optional(v.string()),
    customToDate: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<RatingComputationResult> => {
    console.log("[Admin] Starting rating computation...");

    const result: RatingComputationResult = await ctx.runAction(
      internal.ratings.compute.recomputeRollingStatsAndRatings,
      {
        competitionId: args.competitionId,
        country: args.country,
        dryRun: args.dryRun ?? false,
        customFromDate: args.customFromDate,
        customToDate: args.customToDate,
      }
    );

    console.log("[Admin] Rating computation result:", result);
    return result;
  },
});

/**
 * List players with ratings (internal version for CLI)
 */
export const internalListPlayersWithRatings = internalQuery({
  args: {
    limit: v.optional(v.number()),
    hasRatingOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    // Get all players
    const players = await ctx.db.query("players").collect();

    // Get all ratings
    const ratings = await ctx.db.query("playerRatings").collect();
    const ratingsByPlayer = new Map(ratings.map((r) => [r.playerId.toString(), r]));

    // Get all rolling stats for minutes
    const rollingStats = await ctx.db.query("playerRollingStats").collect();
    const statsByPlayer = new Map(rollingStats.map((s) => [s.playerId.toString(), s]));

    // Get teams for display
    const teams = await ctx.db.query("teams").collect();
    const teamsMap = new Map(teams.map((t) => [t._id.toString(), t]));

    // Build player list
    let result = players.map((p) => {
      const rating = ratingsByPlayer.get(p._id.toString());
      const stats = statsByPlayer.get(p._id.toString());
      const team = teamsMap.get(p.teamId.toString());

      return {
        name: p.name,
        position: p.positionGroup,
        team: team?.name ?? "Unknown",
        minutes: stats?.minutes ?? 0,
        appearances: stats?.totals?.appearances ?? 0,
        rating365: rating?.rating365 ?? null,
        levelScore: rating?.levelScore ?? null,
      };
    });

    // Filter by hasRatingOnly if specified
    if (args.hasRatingOnly) {
      result = result.filter((p) => p.rating365 !== null);
    }

    // Sort by rating (if exists) or minutes
    result.sort((a, b) => {
      if (a.rating365 !== null && b.rating365 !== null) {
        return b.rating365 - a.rating365;
      }
      if (a.rating365 !== null) return -1;
      if (b.rating365 !== null) return 1;
      return b.minutes - a.minutes;
    });

    return result.slice(0, limit);
  },
});

/**
 * Debug: Check appearances and player minutes
 */
export const debugAppearances = internalQuery({
  args: {},
  handler: async (ctx) => {
    const appearances = await ctx.db.query("appearances").collect();
    const players = await ctx.db.query("players").collect();

    // Group appearances by player
    const minutesByPlayer = new Map<string, number>();
    for (const app of appearances) {
      const current = minutesByPlayer.get(app.playerId.toString()) ?? 0;
      minutesByPlayer.set(app.playerId.toString(), current + app.minutes);
    }

    // Find players with most minutes
    const playerMinutesList = Array.from(minutesByPlayer.entries())
      .map(([id, mins]) => ({ playerId: id, minutes: mins }))
      .sort((a, b) => b.minutes - a.minutes);

    // Players with 300+ minutes
    const playersWithEnoughMinutes = playerMinutesList.filter(
      (p) => p.minutes >= 300
    );

    // Check if appearance players exist in players table
    const playerIds = new Set(players.map((p) => p._id.toString()));
    const appearancePlayerIds = new Set(appearances.map((a) => a.playerId.toString()));
    const matchingPlayers = [...appearancePlayerIds].filter((id) =>
      playerIds.has(id)
    );

    // Get date range of appearances
    const dates = appearances.map((a) => a.matchDate).sort();
    const minDate = dates[0] ?? null;
    const maxDate = dates[dates.length - 1] ?? null;

    return {
      totalAppearances: appearances.length,
      totalPlayers: players.length,
      uniquePlayersWithAppearances: appearancePlayerIds.size,
      appearancePlayersInPlayersTable: matchingPlayers.length,
      playersWithEnoughMinutes: playersWithEnoughMinutes.length,
      topPlayersByMinutes: playerMinutesList.slice(0, 10),
      sampleAppearance: appearances[0] ?? null,
      dateRange: { minDate, maxDate },
    };
  },
});

/**
 * Get rating stats summary
 */
export const getRatingStats = query({
  args: {},
  handler: async (ctx) => {
    const [playerRatings, playerRollingStats, competitionRatings, ratingProfiles] =
      await Promise.all([
        ctx.db.query("playerRatings").collect(),
        ctx.db.query("playerRollingStats").collect(),
        ctx.db.query("competitionRatings").collect(),
        ctx.db.query("ratingProfiles").collect(),
      ]);

    // Get top rated players
    const topRated = [...playerRatings]
      .sort((a, b) => b.rating365 - a.rating365)
      .slice(0, 10);

    // Get rating distribution
    const ratingBuckets = {
      "90-100": 0,
      "80-89": 0,
      "70-79": 0,
      "60-69": 0,
      "50-59": 0,
      "40-49": 0,
      "30-39": 0,
      "20-29": 0,
      "10-19": 0,
      "0-9": 0,
    };

    for (const r of playerRatings) {
      if (r.rating365 >= 90) ratingBuckets["90-100"]++;
      else if (r.rating365 >= 80) ratingBuckets["80-89"]++;
      else if (r.rating365 >= 70) ratingBuckets["70-79"]++;
      else if (r.rating365 >= 60) ratingBuckets["60-69"]++;
      else if (r.rating365 >= 50) ratingBuckets["50-59"]++;
      else if (r.rating365 >= 40) ratingBuckets["40-49"]++;
      else if (r.rating365 >= 30) ratingBuckets["30-39"]++;
      else if (r.rating365 >= 20) ratingBuckets["20-29"]++;
      else if (r.rating365 >= 10) ratingBuckets["10-19"]++;
      else ratingBuckets["0-9"]++;
    }

    return {
      totalPlayerRatings: playerRatings.length,
      totalRollingStats: playerRollingStats.length,
      totalCompetitionRatings: competitionRatings.length,
      ratingProfiles: ratingProfiles.length,
      topRated,
      ratingDistribution: ratingBuckets,
    };
  },
});

/**
 * List rating profiles
 */
export const listRatingProfiles = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("ratingProfiles").collect();
  },
});

/**
 * Update a rating profile's weights
 *
 * Run from dashboard: internal.admin.updateRatingProfile
 */
export const adminUpdateRatingProfile = internalMutation({
  args: {
    positionGroup: v.union(
      v.literal("GK"),
      v.literal("DEF"),
      v.literal("MID"),
      v.literal("ATT")
    ),
    weights: v.record(v.string(), v.number()),
    invertMetrics: v.array(v.string()),
  },
  handler: async (ctx, args): Promise<Id<"ratingProfiles">> => {
    const existing = await ctx.db
      .query("ratingProfiles")
      .withIndex("by_positionGroup", (q) =>
        q.eq("positionGroup", args.positionGroup)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        weights: args.weights,
        invertMetrics: args.invertMetrics,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("ratingProfiles", {
      positionGroup: args.positionGroup,
      weights: args.weights,
      invertMetrics: args.invertMetrics,
      updatedAt: Date.now(),
    });
  },
});

// ============================================================================
// Enrichment Management
// ============================================================================

import type { EnrichmentResult } from "./enrichment/enrichActions";

/**
 * Manually trigger FotMob enrichment
 *
 * @param maxRequests - Maximum API requests to make (default: 20)
 * @param batchSize - Number of players to process (default: 10)
 *
 * Run from dashboard: internal.admin.adminEnrichFromFotMob
 * Args: { "maxRequests": 20, "batchSize": 10 }
 */
export const adminEnrichFromFotMob = internalAction({
  args: {
    maxRequests: v.optional(v.number()),
    batchSize: v.optional(v.number()),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<EnrichmentResult> => {
    console.log(
      `[Admin] Starting FotMob enrichment, maxRequests: ${args.maxRequests ?? 20}, batchSize: ${args.batchSize ?? 10}`
    );

    const result: EnrichmentResult = await ctx.runAction(
      internal.enrichment.enrichActions.enrichPlayersFromFotMob,
      {
        maxRequests: args.maxRequests,
        batchSize: args.batchSize,
        competitionIds: args.competitionIds,
      }
    );

    console.log("[Admin] FotMob enrichment result:", result);
    return result;
  },
});

/**
 * Manually trigger SofaScore enrichment
 *
 * @param maxRequests - Maximum API requests to make (default: 15)
 * @param batchSize - Number of players to process (default: 5)
 *
 * Run from dashboard: internal.admin.adminEnrichFromSofaScore
 * Args: { "maxRequests": 15, "batchSize": 5 }
 */
export const adminEnrichFromSofaScore = internalAction({
  args: {
    maxRequests: v.optional(v.number()),
    batchSize: v.optional(v.number()),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<EnrichmentResult> => {
    console.log(
      `[Admin] Starting SofaScore enrichment, maxRequests: ${args.maxRequests ?? 15}, batchSize: ${args.batchSize ?? 5}`
    );

    const result: EnrichmentResult = await ctx.runAction(
      internal.enrichment.enrichActions.enrichPlayersFromSofaScore,
      {
        maxRequests: args.maxRequests,
        batchSize: args.batchSize,
        competitionIds: args.competitionIds,
      }
    );

    console.log("[Admin] SofaScore enrichment result:", result);
    return result;
  },
});

/**
 * Manually trigger enrichment from all providers
 *
 * Run from dashboard: internal.admin.adminEnrichFromAllProviders
 * Args: { "fotMobRequests": 20, "sofaScoreRequests": 15 }
 */
export const adminEnrichFromAllProviders = internalAction({
  args: {
    fotMobRequests: v.optional(v.number()),
    sofaScoreRequests: v.optional(v.number()),
    batchSize: v.optional(v.number()),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<{
    fotmob: EnrichmentResult;
    sofascore: EnrichmentResult;
    totalPlayersEnriched: number;
  }> => {
    console.log("[Admin] Starting combined enrichment from all providers");

    const result = await ctx.runAction(
      internal.enrichment.enrichActions.enrichPlayersFromAllProviders,
      {
        fotMobRequests: args.fotMobRequests,
        sofaScoreRequests: args.sofaScoreRequests,
        batchSize: args.batchSize,
        competitionIds: args.competitionIds,
      }
    );

    console.log("[Admin] Combined enrichment result:", result);
    return result;
  },
});

/**
 * Get enrichment statistics
 */
export const getEnrichmentStats = query({
  args: {},
  handler: async (ctx) => {
    const [
      externalIds,
      profiles,
      aggregates,
      unresolved,
      conflicts,
      enrichmentStates,
    ] = await Promise.all([
      ctx.db.query("playerExternalIds").collect(),
      ctx.db.query("providerPlayerProfiles").collect(),
      ctx.db.query("providerPlayerAggregates").collect(),
      ctx.db.query("unresolvedExternalPlayers").collect(),
      ctx.db.query("playerFieldConflicts").collect(),
      ctx.db.query("enrichmentState").collect(),
    ]);

    // Group by provider
    const externalIdsByProvider: Record<string, number> = {};
    for (const ext of externalIds) {
      externalIdsByProvider[ext.provider] = (externalIdsByProvider[ext.provider] || 0) + 1;
    }

    const profilesByProvider: Record<string, number> = {};
    for (const profile of profiles) {
      profilesByProvider[profile.provider] = (profilesByProvider[profile.provider] || 0) + 1;
    }

    const unresolvedByStatus: Record<string, number> = {};
    for (const u of unresolved) {
      unresolvedByStatus[u.status] = (unresolvedByStatus[u.status] || 0) + 1;
    }

    const unresolvedConflicts = conflicts.filter((c) => !c.resolved);

    return {
      totalExternalIds: externalIds.length,
      externalIdsByProvider,
      totalProfiles: profiles.length,
      profilesByProvider,
      totalAggregates: aggregates.length,
      totalUnresolved: unresolved.length,
      unresolvedByStatus,
      totalConflicts: conflicts.length,
      unresolvedConflicts: unresolvedConflicts.length,
      enrichmentStates: enrichmentStates.map((s) => ({
        provider: s.provider,
        totalProcessed: s.totalProcessed,
        updatedAt: s.updatedAt ? new Date(s.updatedAt).toISOString() : null,
      })),
    };
  },
});

/**
 * List unresolved external players (review queue)
 */
export const listUnresolvedPlayers = query({
  args: {
    limit: v.optional(v.number()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    let query = ctx.db.query("unresolvedExternalPlayers");

    if (args.status) {
      query = query.filter((q) => q.eq(q.field("status"), args.status));
    }

    const unresolved = await query.take(limit);

    return unresolved.map((u) => ({
      _id: u._id,
      provider: u.provider,
      providerPlayerId: u.providerPlayerId,
      reason: u.reason,
      status: u.status,
      candidateCount: u.candidatePlayerIds?.length ?? 0,
      createdAt: new Date(u.createdAt).toISOString(),
    }));
  },
});

/**
 * List field conflicts
 */
export const listFieldConflicts = query({
  args: {
    unresolvedOnly: v.optional(v.boolean()),
    playerId: v.optional(v.id("players")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    let conflicts = await ctx.db.query("playerFieldConflicts").collect();

    if (args.unresolvedOnly) {
      conflicts = conflicts.filter((c) => !c.resolved);
    }

    if (args.playerId) {
      conflicts = conflicts.filter((c) => c.playerId === args.playerId);
    }

    return conflicts.slice(0, limit).map((c) => ({
      _id: c._id,
      playerId: c.playerId,
      field: c.field,
      canonicalValue: c.canonicalValue,
      providerValue: c.providerValue,
      provider: c.provider,
      resolved: c.resolved,
      resolvedValue: c.resolvedValue,
    }));
  },
});

/**
 * Resolve an unresolved external player manually
 */
export const resolveExternalPlayer = internalMutation({
  args: {
    unresolvedId: v.id("unresolvedExternalPlayers"),
    playerId: v.id("players"),
  },
  handler: async (ctx, args) => {
    const unresolved = await ctx.db.get(args.unresolvedId);
    if (!unresolved) {
      throw new Error(`Unresolved player not found: ${args.unresolvedId}`);
    }

    const player = await ctx.db.get(args.playerId);
    if (!player) {
      throw new Error(`Player not found: ${args.playerId}`);
    }

    const now = Date.now();

    // Create external ID mapping
    await ctx.db.insert("playerExternalIds", {
      playerId: args.playerId,
      provider: unresolved.provider,
      providerPlayerId: unresolved.providerPlayerId,
      confidence: 1.0, // Manual resolution = 100% confidence
      createdAt: now,
      updatedAt: now,
    });

    // Mark as resolved
    await ctx.db.patch(args.unresolvedId, {
      status: "resolved",
      resolvedPlayerId: args.playerId,
      updatedAt: now,
    });

    console.log(
      `[Admin] Resolved external player ${unresolved.providerPlayerId} -> ${player.name}`
    );

    return { success: true };
  },
});

/**
 * Reject an unresolved external player (not a real match)
 */
export const rejectExternalPlayer = internalMutation({
  args: {
    unresolvedId: v.id("unresolvedExternalPlayers"),
  },
  handler: async (ctx, args) => {
    const unresolved = await ctx.db.get(args.unresolvedId);
    if (!unresolved) {
      throw new Error(`Unresolved player not found: ${args.unresolvedId}`);
    }

    await ctx.db.patch(args.unresolvedId, {
      status: "rejected",
      updatedAt: Date.now(),
    });

    console.log(`[Admin] Rejected external player ${unresolved.providerPlayerId}`);

    return { success: true };
  },
});

/**
 * Update normalized names for all players (one-time migration)
 */
export const updateNormalizedNames = internalMutation({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 500;

    // Import normalize function
    const { normalizeName } = await import("./resolve/resolvePlayer");

    const players = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("nameNormalized"), undefined))
      .take(limit);

    let updated = 0;
    for (const player of players) {
      const normalized = normalizeName(player.name);
      await ctx.db.patch(player._id, { nameNormalized: normalized });
      updated++;
    }

    console.log(`[Admin] Updated normalized names for ${updated} players`);

    return { updated, remaining: players.length === limit };
  },
});
```

#### `convex/crons.ts`

```typescript
/**
 * Cron Jobs for Data Ingestion
 *
 * Schedules daily ingestion runs for API-Football data.
 * Runs at 04:00 UTC to capture results from the previous day.
 */

import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

/**
 * Daily ingestion job
 *
 * Runs daily at 04:00 UTC (early morning to avoid peak times)
 * 1. Ingests competitions, teams, and players for NL + DE
 * 2. Ingests recent fixtures from the last 2 days
 *
 * Rate limit budget: ~80 requests (conservative for free plan)
 * - Competition ingestion: ~50 requests (leagues + teams + player pages)
 * - Fixtures ingestion: ~30 requests
 */
crons.daily(
  "daily-ingestion-nl-de",
  { hourUTC: 4, minuteUTC: 0 },
  internal.ingest.cronRunner.runDailyIngestion
);

export default crons;
```

#### `convex/health.ts`

```typescript
import { query } from "./_generated/server";

export const ping = query({
  args: {},
  handler: async () => {
    return {
      status: "ok",
      timestamp: Date.now(),
      message: "Footbase API is healthy",
    };
  },
});
```

### 🔌 External Providers

#### `convex/providers/apiFootball.ts`

```typescript
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
      new Date().getFullYear().toString();

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
```

#### `convex/providers/apiFootballClient.ts`

```typescript
/**
 * API-Football HTTP Client
 *
 * Supports both API-Sports and RapidAPI authentication modes.
 * Environment variables:
 * - API_FOOTBALL_KEY: Your API key
 * - API_FOOTBALL_HOST: API host (defaults based on mode)
 * - API_FOOTBALL_MODE: "apisports" | "rapidapi" (auto-detected from host if not set)
 *
 * Supported endpoints:
 * - API-Sports direct: https://v3.football.api-sports.io
 * - RapidAPI: https://api-football-v1.p.rapidapi.com
 */

// Default URLs for each mode
const APISPORTS_URL = "https://v3.football.api-sports.io";
const RAPIDAPI_URL = "https://api-football-v1.p.rapidapi.com";

// Typed error for API failures
export class ApiFootballError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = "ApiFootballError";
  }
}

// Rate limit info from response headers
export interface RateLimitInfo {
  requestsRemaining: number;
  requestsLimit: number;
}

// Response wrapper with rate limit info
export interface ApiResponse<T> {
  data: T;
  rateLimit?: RateLimitInfo;
}

// Standard API-Football response structure
export interface ApiFootballResponse<T> {
  get: string;
  parameters: Record<string, string>;
  errors: string[] | Record<string, string>;
  results: number;
  paging?: {
    current: number;
    total: number;
  };
  response: T;
}

/**
 * Detect the API mode based on environment variables
 */
function detectMode(): "apisports" | "rapidapi" {
  const explicitMode = process.env.API_FOOTBALL_MODE;
  if (explicitMode === "apisports" || explicitMode === "rapidapi") {
    return explicitMode;
  }

  // Auto-detect from host
  const host = process.env.API_FOOTBALL_HOST;
  if (host && host.includes("rapidapi")) {
    return "rapidapi";
  }

  return "apisports";
}

/**
 * Get the base URL for API requests
 */
function getBaseUrl(): string {
  const host = process.env.API_FOOTBALL_HOST;
  const mode = detectMode();

  if (host) {
    // Use custom host if provided
    return host.startsWith("http") ? host : `https://${host}`;
  }

  // Use default URL based on mode
  return mode === "rapidapi" ? RAPIDAPI_URL : APISPORTS_URL;
}

/**
 * Get authentication headers based on API mode
 */
function getAuthHeaders(): Record<string, string> {
  const apiKey = process.env.API_FOOTBALL_KEY;
  const mode = detectMode();
  const host = process.env.API_FOOTBALL_HOST;

  if (!apiKey) {
    throw new ApiFootballError(
      "API_FOOTBALL_KEY environment variable is not set. " +
        "Set it in your Convex dashboard under Settings > Environment Variables."
    );
  }

  if (mode === "rapidapi") {
    // Use custom host or default RapidAPI host
    const rapidApiHost = host || "api-football-v1.p.rapidapi.com";
    return {
      "x-rapidapi-host": rapidApiHost.replace(/^https?:\/\//, ""),
      "x-rapidapi-key": apiKey,
    };
  }

  // Default: apisports mode
  return {
    "x-apisports-key": apiKey,
  };
}

/**
 * Parse rate limit headers from API response
 */
function parseRateLimitHeaders(
  headers: Headers
): RateLimitInfo | undefined {
  const remaining = headers.get("x-ratelimit-remaining");
  const limit = headers.get("x-ratelimit-requests-limit");

  if (remaining !== null && limit !== null) {
    return {
      requestsRemaining: parseInt(remaining, 10),
      requestsLimit: parseInt(limit, 10),
    };
  }
  return undefined;
}

/**
 * Sleep helper for retry backoff
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch JSON from API-Football with authentication and retry logic
 *
 * @param path - API endpoint path (e.g., "/leagues", "/teams")
 * @param params - Query parameters
 * @param maxRetries - Maximum number of retries for 429 errors (default: 3)
 */
export async function fetchJson<T>(
  path: string,
  params: Record<string, string | number> = {},
  maxRetries = 3
): Promise<ApiResponse<ApiFootballResponse<T>>> {
  const baseUrl = getBaseUrl();
  const url = new URL(path, baseUrl);

  // Add query parameters
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const headers = getAuthHeaders();

  console.log(`[API-Football] Request: ${url.toString()}`);
  console.log(`[API-Football] Mode: ${detectMode()}, Headers: ${JSON.stringify(Object.keys(headers))}`);

  let lastError: Error | null = null;
  let retryCount = 0;

  while (retryCount <= maxRetries) {
    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          ...headers,
          Accept: "application/json",
        },
      });

      // Parse rate limit info
      const rateLimit = parseRateLimitHeaders(response.headers);

      // Log rate limit info
      if (rateLimit) {
        console.log(
          `[API-Football] ${path} - Requests remaining: ${rateLimit.requestsRemaining}/${rateLimit.requestsLimit}`
        );
      }

      // Handle rate limiting with retry
      if (response.status === 429) {
        if (retryCount < maxRetries) {
          const backoffMs = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
          console.log(
            `[API-Football] Rate limited (429). Retrying in ${backoffMs}ms... (attempt ${retryCount + 1}/${maxRetries})`
          );
          await sleep(backoffMs);
          retryCount++;
          continue;
        }
        throw new ApiFootballError(
          "Rate limit exceeded after max retries",
          429
        );
      }

      // Handle other HTTP errors
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`[API-Football] Error ${response.status}: ${errorBody}`);
        throw new ApiFootballError(
          `API request failed: ${response.status} ${response.statusText} - ${errorBody.slice(0, 200)}`,
          response.status,
          errorBody
        );
      }

      const data = (await response.json()) as ApiFootballResponse<T>;

      // Check for API-level errors
      const errors = data.errors;
      if (errors && (Array.isArray(errors) ? errors.length > 0 : Object.keys(errors).length > 0)) {
        const errorMsg = Array.isArray(errors)
          ? errors.join(", ")
          : Object.entries(errors)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", ");
        throw new ApiFootballError(`API returned errors: ${errorMsg}`);
      }

      return {
        data,
        rateLimit,
      };
    } catch (error) {
      if (error instanceof ApiFootballError) {
        throw error;
      }
      lastError = error as Error;
      if (retryCount < maxRetries) {
        const backoffMs = Math.pow(2, retryCount) * 1000;
        console.log(
          `[API-Football] Request failed: ${lastError.message}. Retrying in ${backoffMs}ms...`
        );
        await sleep(backoffMs);
        retryCount++;
        continue;
      }
    }
  }

  throw new ApiFootballError(
    `Request failed after ${maxRetries} retries: ${lastError?.message}`
  );
}
```

#### `convex/providers/fetchWrapper.ts`

```typescript
/**
 * Shared Fetch Wrapper
 *
 * Provides rate-limited, retry-capable HTTP fetching for enrichment providers.
 * Features:
 * - Configurable rate limiting
 * - Retry with exponential backoff for 429/5xx
 * - Random jitter to avoid thundering herd
 * - Request budgeting
 * - Timeout handling
 */

// ============================================================================
// Types
// ============================================================================

export interface FetchOptions {
  headers?: Record<string, string>;
  timeout?: number; // ms, default 30000
  retries?: number; // default 3
  retryDelay?: number; // ms, base delay for exponential backoff, default 1000
}

export interface RateLimitConfig {
  requestsPerMinute: number;
  minDelayMs?: number; // Minimum delay between requests
}

export interface RequestBudget {
  maxRequests: number;
  used: number;
}

export interface FetchResult<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

// ============================================================================
// Rate Limiting
// ============================================================================

// Track last request time per provider
const lastRequestTime: Map<string, number> = new Map();

/**
 * Calculate delay needed to respect rate limit
 */
function calculateRateLimitDelay(
  provider: string,
  config: RateLimitConfig
): number {
  const now = Date.now();
  const lastTime = lastRequestTime.get(provider) || 0;
  const minInterval = 60000 / config.requestsPerMinute;
  const timeSinceLast = now - lastTime;

  if (timeSinceLast >= minInterval) {
    return config.minDelayMs || 0;
  }

  return Math.max(minInterval - timeSinceLast, config.minDelayMs || 0);
}

/**
 * Add random jitter to avoid thundering herd
 */
function addJitter(delay: number, maxJitter: number = 500): number {
  return delay + Math.random() * maxJitter;
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================================
// Fetch with Retry
// ============================================================================

/**
 * Fetch with retry and exponential backoff
 */
async function fetchWithRetry(
  url: string,
  options: FetchOptions = {},
  attempt: number = 1
): Promise<Response> {
  const { headers = {}, timeout = 30000, retries = 3, retryDelay = 1000 } = options;

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      headers: {
        // Use browser-like headers to avoid being blocked by unofficial APIs
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        ...headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle rate limiting (429) and server errors (5xx)
    if (response.status === 429 || response.status >= 500) {
      if (attempt < retries) {
        const delay = addJitter(retryDelay * Math.pow(2, attempt - 1));
        console.warn(
          `[Fetch] ${response.status} for ${url}, retrying in ${Math.round(delay)}ms (attempt ${attempt}/${retries})`
        );
        await sleep(delay);
        return fetchWithRetry(url, options, attempt + 1);
      }
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle abort (timeout)
    if (error instanceof Error && error.name === "AbortError") {
      if (attempt < retries) {
        const delay = addJitter(retryDelay * Math.pow(2, attempt - 1));
        console.warn(
          `[Fetch] Timeout for ${url}, retrying in ${Math.round(delay)}ms (attempt ${attempt}/${retries})`
        );
        await sleep(delay);
        return fetchWithRetry(url, options, attempt + 1);
      }
      throw new Error(`Request timed out after ${timeout}ms: ${url}`);
    }

    // Handle network errors
    if (attempt < retries) {
      const delay = addJitter(retryDelay * Math.pow(2, attempt - 1));
      console.warn(
        `[Fetch] Network error for ${url}, retrying in ${Math.round(delay)}ms (attempt ${attempt}/${retries})`
      );
      await sleep(delay);
      return fetchWithRetry(url, options, attempt + 1);
    }

    throw error;
  }
}

// ============================================================================
// Main Fetch Function
// ============================================================================

/**
 * Rate-limited fetch with retry capability
 */
export async function rateLimitedFetch<T>(
  provider: string,
  url: string,
  rateLimitConfig: RateLimitConfig,
  budget?: RequestBudget,
  options: FetchOptions = {}
): Promise<FetchResult<T>> {
  // Check budget
  if (budget && budget.used >= budget.maxRequests) {
    throw new BudgetExhaustedError(
      `Request budget exhausted: ${budget.used}/${budget.maxRequests}`
    );
  }

  // Apply rate limiting
  const delay = calculateRateLimitDelay(provider, rateLimitConfig);
  if (delay > 0) {
    await sleep(addJitter(delay));
  }

  // Update last request time
  lastRequestTime.set(provider, Date.now());

  // Make request
  const response = await fetchWithRetry(url, options);

  // Increment budget if provided
  if (budget) {
    budget.used++;
  }

  // Handle non-OK responses
  if (!response.ok) {
    const text = await response.text();
    throw new ProviderApiError(
      `Provider API error: ${response.status} ${response.statusText}`,
      response.status,
      text
    );
  }

  // Parse response
  const data = (await response.json()) as T;

  // Extract headers
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return {
    data,
    status: response.status,
    headers,
  };
}

// ============================================================================
// Error Classes
// ============================================================================

export class ProviderApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public responseBody?: string
  ) {
    super(message);
    this.name = "ProviderApiError";
  }
}

export class BudgetExhaustedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BudgetExhaustedError";
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if we can make more requests within budget
 */
export function canMakeRequest(budget: RequestBudget): boolean {
  return budget.used < budget.maxRequests;
}

/**
 * Create a new request budget
 */
export function createBudget(maxRequests: number): RequestBudget {
  return {
    maxRequests,
    used: 0,
  };
}

/**
 * Default rate limit configs for providers
 */
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  fotmob: {
    requestsPerMinute: 30, // Conservative estimate
    minDelayMs: 2000,
  },
  sofascore: {
    requestsPerMinute: 20, // Conservative estimate
    minDelayMs: 3000,
  },
  thesportsdb: {
    requestsPerMinute: 60,
    minDelayMs: 1000,
  },
  wikidata: {
    requestsPerMinute: 60,
    minDelayMs: 1000,
  },
  footballdata: {
    requestsPerMinute: 10,
    minDelayMs: 6000,
  },
};
```

#### `convex/providers/fotmob.ts`

```typescript
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
```

#### `convex/providers/sofascore.ts`

```typescript
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
```

### 📥 Data Ingestion

#### `convex/ingest/apiFootballIngest.ts`

```typescript
/**
 * API-Football Ingestion Actions
 *
 * Internal actions for ingesting data from API-Football:
 * - ingestCountries: Fetch competitions, teams, and players for specified countries
 * - ingestRecentFixtures: Fetch recent match results and player appearances
 *
 * These are Convex actions (not mutations) because they make external HTTP calls.
 */

import { v } from "convex/values";
import { internalAction, internalMutation } from "../_generated/server";
import { internal } from "../_generated/api";
import type { Doc, Id } from "../_generated/dataModel";
import {
  fetchLeaguesByCountry,
  fetchTeamsByLeague,
  fetchPlayersByLeague,
  fetchFixturesByLeague,
  fetchFixturePlayerStats,
  ApiFootballError,
  type CanonicalCompetition,
  type CanonicalTeam,
  type CanonicalPlayer,
  type CanonicalAppearance,
} from "../providers/apiFootball";

// ============================================================================
// Types
// ============================================================================

export interface IngestionSummary {
  competitionsProcessed: number;
  teamsProcessed: number;
  playersProcessed: number;
  appearancesProcessed: number;
  errorsCount: number;
}

export interface IngestionResult {
  success: boolean;
  requestsUsed: number;
  summary: IngestionSummary;
  error?: string;
}

interface IngestionContext {
  requestsUsed: number;
  maxRequests: number;
  summary: IngestionSummary;
  runId: Id<"ingestionRuns">;
}

// ============================================================================
// Helper: Check if we can make more requests
// ============================================================================

function canMakeRequest(ctx: IngestionContext): boolean {
  return ctx.requestsUsed < ctx.maxRequests;
}

function incrementRequests(ctx: IngestionContext, count: number = 1): void {
  ctx.requestsUsed += count;
}

// Rate limiting: 10 requests per minute = 6 seconds per request
const RATE_LIMIT_DELAY_MS = 6500; // 6.5 seconds to be safe

async function rateLimitedDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_DELAY_MS));
}

// ============================================================================
// Mutations for data persistence (called from actions)
// ============================================================================

// Start an ingestion run
export const startIngestionRun = internalMutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.insert("ingestionRuns", {
      provider: "apiFootball",
      startedAt: Date.now(),
      status: "running",
    });
  },
});

// Complete an ingestion run
export const completeIngestionRun = internalMutation({
  args: {
    runId: v.id("ingestionRuns"),
    summary: v.object({
      competitionsProcessed: v.number(),
      teamsProcessed: v.number(),
      playersProcessed: v.number(),
      appearancesProcessed: v.number(),
      errorsCount: v.number(),
    }),
    requestsUsed: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.runId, {
      status: "completed",
      finishedAt: Date.now(),
      summary: args.summary,
      requestsUsed: args.requestsUsed,
    });
  },
});

// Fail an ingestion run
export const failIngestionRun = internalMutation({
  args: {
    runId: v.id("ingestionRuns"),
    error: v.string(),
    requestsUsed: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.runId, {
      status: "failed",
      finishedAt: Date.now(),
      error: args.error,
      requestsUsed: args.requestsUsed,
    });
  },
});

// Upsert a competition
export const upsertCompetition = internalMutation({
  args: {
    data: v.object({
      providerLeagueId: v.string(),
      name: v.string(),
      country: v.string(),
      season: v.string(),
      type: v.optional(v.string()),
      logoUrl: v.optional(v.string()),
      isActive: v.boolean(),
    }),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("competitions")
      .withIndex("by_provider_league", (q) =>
        q.eq("provider", "apiFootball").eq("providerLeagueId", args.data.providerLeagueId)
      )
      .first();

    if (existing) {
      // Update existing (preserve tier if set)
      await ctx.db.patch(existing._id, {
        name: args.data.name,
        season: args.data.season,
        type: args.data.type,
        logoUrl: args.data.logoUrl,
        // Don't update isActive if already set to preserve manual overrides
      });
      return existing._id;
    }

    // Insert new
    return await ctx.db.insert("competitions", {
      provider: "apiFootball",
      providerLeagueId: args.data.providerLeagueId,
      name: args.data.name,
      country: args.data.country,
      season: args.data.season,
      type: args.data.type,
      logoUrl: args.data.logoUrl,
      isActive: args.data.isActive,
      createdAt: Date.now(),
    });
  },
});

// Upsert a team
export const upsertTeam = internalMutation({
  args: {
    data: v.object({
      providerTeamId: v.string(),
      name: v.string(),
      logoUrl: v.optional(v.string()),
    }),
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("teams")
      .withIndex("by_provider_team", (q) =>
        q.eq("provider", "apiFootball").eq("providerTeamId", args.data.providerTeamId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.data.name,
        logoUrl: args.data.logoUrl,
        competitionId: args.competitionId,
      });
      return existing._id;
    }

    return await ctx.db.insert("teams", {
      provider: "apiFootball",
      providerTeamId: args.data.providerTeamId,
      name: args.data.name,
      logoUrl: args.data.logoUrl,
      competitionId: args.competitionId,
      createdAt: Date.now(),
    });
  },
});

// Upsert a player
export const upsertPlayer = internalMutation({
  args: {
    data: v.object({
      providerPlayerId: v.string(),
      name: v.string(),
      position: v.string(),
      positionGroup: v.union(
        v.literal("GK"),
        v.literal("DEF"),
        v.literal("MID"),
        v.literal("ATT")
      ),
      birthDate: v.optional(v.string()),
      age: v.optional(v.number()),
      nationality: v.optional(v.string()),
      photoUrl: v.optional(v.string()),
      providerTeamId: v.string(),
    }),
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, args) => {
    // Find the team by provider ID
    const team = await ctx.db
      .query("teams")
      .withIndex("by_provider_team", (q) =>
        q.eq("provider", "apiFootball").eq("providerTeamId", args.data.providerTeamId)
      )
      .first();

    if (!team) {
      console.warn(
        `[Ingest] Team not found for player ${args.data.name} (team ID: ${args.data.providerTeamId})`
      );
      return null;
    }

    const existing = await ctx.db
      .query("players")
      .withIndex("by_provider_player", (q) =>
        q.eq("provider", "apiFootball").eq("providerPlayerId", args.data.providerPlayerId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.data.name,
        position: args.data.position,
        positionGroup: args.data.positionGroup,
        birthDate: args.data.birthDate,
        age: args.data.age,
        nationality: args.data.nationality,
        photoUrl: args.data.photoUrl,
        teamId: team._id,
        competitionId: args.competitionId,
      });
      return existing._id;
    }

    return await ctx.db.insert("players", {
      provider: "apiFootball",
      providerPlayerId: args.data.providerPlayerId,
      name: args.data.name,
      position: args.data.position,
      positionGroup: args.data.positionGroup,
      birthDate: args.data.birthDate,
      age: args.data.age,
      nationality: args.data.nationality,
      photoUrl: args.data.photoUrl,
      teamId: team._id,
      competitionId: args.competitionId,
      createdAt: Date.now(),
    });
  },
});

// Upsert an appearance
export const upsertAppearance = internalMutation({
  args: {
    data: v.object({
      providerPlayerId: v.string(),
      providerFixtureId: v.string(),
      providerTeamId: v.string(),
      matchDate: v.string(),
      minutes: v.number(),
      // Player info for auto-creating players from fixtures
      playerName: v.optional(v.string()),
      playerPhoto: v.optional(v.string()),
      playerPosition: v.optional(v.string()),
      stats: v.object({
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
        blocks: v.optional(v.number()),
        duelsWon: v.optional(v.number()),
        duelsTotal: v.optional(v.number()),
        dribbles: v.optional(v.number()),
        dribblesSuccessful: v.optional(v.number()),
        foulsCommitted: v.optional(v.number()),
        foulsDrawn: v.optional(v.number()),
        saves: v.optional(v.number()),
        goalsConceded: v.optional(v.number()),
        penaltiesSaved: v.optional(v.number()),
        penaltiesMissed: v.optional(v.number()),
      }),
    }),
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, args) => {
    // Find team first (required)
    const team = await ctx.db
      .query("teams")
      .withIndex("by_provider_team", (q) =>
        q.eq("provider", "apiFootball").eq("providerTeamId", args.data.providerTeamId)
      )
      .first();

    if (!team) {
      console.warn(
        `[Ingest] Team not found for appearance (team: ${args.data.providerTeamId})`
      );
      return null;
    }

    // Find or auto-create player
    let player = await ctx.db
      .query("players")
      .withIndex("by_provider_player", (q) =>
        q.eq("provider", "apiFootball").eq("providerPlayerId", args.data.providerPlayerId)
      )
      .first();

    if (!player) {
      // Auto-create player from fixture data if we have the info
      if (args.data.playerName) {
        // Map position to position group
        const position = args.data.playerPosition || "Unknown";
        let positionGroup: "GK" | "DEF" | "MID" | "ATT" = "MID";
        const posNorm = position.toUpperCase();
        if (posNorm === "G" || posNorm.includes("GOALKEEPER")) {
          positionGroup = "GK";
        } else if (posNorm === "D" || posNorm.includes("DEFENDER") || posNorm.includes("BACK")) {
          positionGroup = "DEF";
        } else if (posNorm === "F" || posNorm.includes("FORWARD") || posNorm.includes("ATTACKER")) {
          positionGroup = "ATT";
        }

        const playerId = await ctx.db.insert("players", {
          provider: "apiFootball",
          providerPlayerId: args.data.providerPlayerId,
          name: args.data.playerName,
          position,
          positionGroup,
          photoUrl: args.data.playerPhoto,
          teamId: team._id,
          competitionId: args.competitionId,
          createdAt: Date.now(),
        });
        player = await ctx.db.get(playerId);
        console.log(`[Ingest] Auto-created player: ${args.data.playerName} (${positionGroup})`);
      } else {
        console.warn(
          `[Ingest] Player not found and no player info to auto-create (player: ${args.data.providerPlayerId})`
        );
        return null;
      }
    }

    if (!player) {
      return null;
    }

    // Check for existing appearance (idempotency)
    const existing = await ctx.db
      .query("appearances")
      .withIndex("by_provider_fixture_player", (q) =>
        q
          .eq("provider", "apiFootball")
          .eq("providerFixtureId", args.data.providerFixtureId)
          .eq("playerId", player._id)
      )
      .first();

    if (existing) {
      // Update existing appearance
      await ctx.db.patch(existing._id, {
        minutes: args.data.minutes,
        stats: args.data.stats,
        matchDate: args.data.matchDate,
      });
      return existing._id;
    }

    return await ctx.db.insert("appearances", {
      provider: "apiFootball",
      providerFixtureId: args.data.providerFixtureId,
      playerId: player._id,
      teamId: team._id,
      competitionId: args.competitionId,
      matchDate: args.data.matchDate,
      minutes: args.data.minutes,
      stats: args.data.stats,
      createdAt: Date.now(),
    });
  },
});

// Get or create ingestion state for a competition
export const getIngestionState = internalMutation({
  args: {
    competitionId: v.id("competitions"),
    season: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("ingestionState")
      .withIndex("by_provider_competition", (q) =>
        q.eq("provider", "apiFootball").eq("competitionId", args.competitionId)
      )
      .first();

    if (existing) {
      return existing;
    }

    const id = await ctx.db.insert("ingestionState", {
      provider: "apiFootball",
      competitionId: args.competitionId,
      season: args.season,
      playersNextPage: 1,
      playersComplete: false,
      teamsComplete: false,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(id);
  },
});

// Update ingestion state
export const updateIngestionState = internalMutation({
  args: {
    stateId: v.id("ingestionState"),
    updates: v.object({
      playersNextPage: v.optional(v.number()),
      playersComplete: v.optional(v.boolean()),
      teamsComplete: v.optional(v.boolean()),
      fixturesLastDate: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.stateId, {
      ...args.updates,
      updatedAt: Date.now(),
    });
  },
});

// Get active competitions
export const getActiveCompetitions = internalMutation({
  args: {
    countries: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    let competitions = await ctx.db
      .query("competitions")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();

    if (args.countries && args.countries.length > 0) {
      competitions = competitions.filter((c) =>
        args.countries!.includes(c.country)
      );
    }

    return competitions;
  },
});

// ============================================================================
// Main Ingestion Action: ingestCountries
// ============================================================================

export const ingestCountries = internalAction({
  args: {
    countries: v.array(v.string()),
    season: v.optional(v.string()),
    maxRequests: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const season = args.season || new Date().getFullYear().toString();
    const maxRequests = args.maxRequests || 50; // Conservative default for free plan

    // Start ingestion run
    const runId = await ctx.runMutation(internal.ingest.apiFootballIngest.startIngestionRun, {});

    const ingestionCtx: IngestionContext = {
      requestsUsed: 0,
      maxRequests,
      summary: {
        competitionsProcessed: 0,
        teamsProcessed: 0,
        playersProcessed: 0,
        appearancesProcessed: 0,
        errorsCount: 0,
      },
      runId,
    };

    try {
      console.log(
        `[Ingest] Starting ingestion for countries: ${args.countries.join(", ")}, season: ${season}, maxRequests: ${maxRequests}`
      );

      // Step 1: Fetch and upsert competitions for each country
      for (const country of args.countries) {
        if (!canMakeRequest(ingestionCtx)) {
          console.log("[Ingest] Max requests reached, stopping competition fetch");
          break;
        }

        console.log(`[Ingest] Fetching leagues for ${country}...`);
        try {
          const result = await fetchLeaguesByCountry(country);
          incrementRequests(ingestionCtx);

          for (const comp of result.items) {
            await ctx.runMutation(internal.ingest.apiFootballIngest.upsertCompetition, {
              data: {
                providerLeagueId: comp.providerLeagueId,
                name: comp.name,
                country: comp.country,
                season: comp.season,
                type: comp.type,
                logoUrl: comp.logoUrl,
                isActive: comp.isActive,
              },
            });
            ingestionCtx.summary.competitionsProcessed++;
          }

          console.log(`[Ingest] Processed ${result.items.length} leagues for ${country}`);
        } catch (error) {
          console.error(`[Ingest] Error fetching leagues for ${country}:`, error);
          ingestionCtx.summary.errorsCount++;
        }
      }

      // Step 2: Get active competitions and fetch teams/players
      const activeCompetitions = await ctx.runMutation(
        internal.ingest.apiFootballIngest.getActiveCompetitions,
        { countries: args.countries }
      );

      console.log(`[Ingest] Found ${activeCompetitions.length} active competitions`);

      for (const competition of activeCompetitions) {
        if (!canMakeRequest(ingestionCtx)) {
          console.log("[Ingest] Max requests reached, stopping");
          break;
        }

        // Get or create ingestion state
        const state = await ctx.runMutation(
          internal.ingest.apiFootballIngest.getIngestionState,
          { competitionId: competition._id, season }
        );

        if (!state) continue;

        // Fetch teams if not complete
        if (!state.teamsComplete) {
          if (!canMakeRequest(ingestionCtx)) break;

          console.log(`[Ingest] Fetching teams for ${competition.name}...`);
          try {
            const teamsResult = await fetchTeamsByLeague(
              competition.providerLeagueId,
              season
            );
            incrementRequests(ingestionCtx);

            for (const team of teamsResult.items) {
              await ctx.runMutation(internal.ingest.apiFootballIngest.upsertTeam, {
                data: {
                  providerTeamId: team.providerTeamId,
                  name: team.name,
                  logoUrl: team.logoUrl,
                },
                competitionId: competition._id,
              });
              ingestionCtx.summary.teamsProcessed++;
            }

            await ctx.runMutation(internal.ingest.apiFootballIngest.updateIngestionState, {
              stateId: state._id,
              updates: { teamsComplete: true },
            });

            console.log(`[Ingest] Processed ${teamsResult.items.length} teams for ${competition.name}`);
          } catch (error) {
            console.error(`[Ingest] Error fetching teams for ${competition.name}:`, error);
            ingestionCtx.summary.errorsCount++;
          }
        }

        // Fetch players (paginated, resumable)
        if (!state.playersComplete) {
          let currentPage = state.playersNextPage || 1;
          let hasMorePages = true;

          while (hasMorePages && canMakeRequest(ingestionCtx)) {
            console.log(`[Ingest] Fetching players for ${competition.name}, page ${currentPage}...`);
            try {
              const playersResult = await fetchPlayersByLeague(
                competition.providerLeagueId,
                season,
                currentPage
              );
              incrementRequests(ingestionCtx);

              for (const player of playersResult.items) {
                await ctx.runMutation(internal.ingest.apiFootballIngest.upsertPlayer, {
                  data: {
                    providerPlayerId: player.providerPlayerId,
                    name: player.name,
                    position: player.position,
                    positionGroup: player.positionGroup,
                    birthDate: player.birthDate,
                    age: player.age,
                    nationality: player.nationality,
                    photoUrl: player.photoUrl,
                    providerTeamId: player.providerTeamId,
                  },
                  competitionId: competition._id,
                });
                ingestionCtx.summary.playersProcessed++;
              }

              // Check pagination
              if (playersResult.paging) {
                hasMorePages = playersResult.paging.current < playersResult.paging.total;
                currentPage = playersResult.paging.current + 1;
              } else {
                hasMorePages = false;
              }

              // Update state with progress
              await ctx.runMutation(internal.ingest.apiFootballIngest.updateIngestionState, {
                stateId: state._id,
                updates: {
                  playersNextPage: hasMorePages ? currentPage : undefined,
                  playersComplete: !hasMorePages,
                },
              });

              console.log(
                `[Ingest] Processed ${playersResult.items.length} players from page ${currentPage - 1}` +
                  (hasMorePages ? `, next page: ${currentPage}` : " (complete)")
              );
            } catch (error) {
              console.error(
                `[Ingest] Error fetching players for ${competition.name}, page ${currentPage}:`,
                error
              );
              ingestionCtx.summary.errorsCount++;
              break; // Stop pagination on error, will resume next run
            }
          }
        }
      }

      // Complete the run
      await ctx.runMutation(internal.ingest.apiFootballIngest.completeIngestionRun, {
        runId,
        summary: ingestionCtx.summary,
        requestsUsed: ingestionCtx.requestsUsed,
      });

      console.log(`[Ingest] Completed. Requests used: ${ingestionCtx.requestsUsed}/${maxRequests}`);
      console.log("[Ingest] Summary:", ingestionCtx.summary);

      return {
        success: true,
        requestsUsed: ingestionCtx.requestsUsed,
        summary: ingestionCtx.summary,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[Ingest] Fatal error:", errorMessage);

      await ctx.runMutation(internal.ingest.apiFootballIngest.failIngestionRun, {
        runId,
        error: errorMessage,
        requestsUsed: ingestionCtx.requestsUsed,
      });

      return {
        success: false,
        error: errorMessage,
        requestsUsed: ingestionCtx.requestsUsed,
        summary: ingestionCtx.summary,
      };
    }
  },
});

// ============================================================================
// Incremental Fixtures Ingestion
// ============================================================================

export const ingestRecentFixtures = internalAction({
  args: {
    dateFrom: v.string(), // YYYY-MM-DD
    dateTo: v.string(), // YYYY-MM-DD
    maxRequests: v.optional(v.number()),
    countries: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const maxRequests = args.maxRequests || 30;

    const runId = await ctx.runMutation(internal.ingest.apiFootballIngest.startIngestionRun, {});

    const ingestionCtx: IngestionContext = {
      requestsUsed: 0,
      maxRequests,
      summary: {
        competitionsProcessed: 0,
        teamsProcessed: 0,
        playersProcessed: 0,
        appearancesProcessed: 0,
        errorsCount: 0,
      },
      runId,
    };

    try {
      console.log(
        `[Ingest:Fixtures] Starting for ${args.dateFrom} to ${args.dateTo}, maxRequests: ${maxRequests}`
      );

      // Get active competitions
      const activeCompetitions = await ctx.runMutation(
        internal.ingest.apiFootballIngest.getActiveCompetitions,
        { countries: args.countries }
      );

      console.log(`[Ingest:Fixtures] Processing ${activeCompetitions.length} competitions`);

      for (const competition of activeCompetitions) {
        if (!canMakeRequest(ingestionCtx)) {
          console.log("[Ingest:Fixtures] Max requests reached, stopping");
          break;
        }

        console.log(`[Ingest:Fixtures] Fetching fixtures for ${competition.name}...`);
        try {
          // Rate limit: wait before making request
          await rateLimitedDelay();

          const fixturesResult = await fetchFixturesByLeague(
            competition.providerLeagueId,
            competition.season,
            args.dateFrom,
            args.dateTo
          );
          incrementRequests(ingestionCtx);

          // Filter for finished fixtures (FT = Full Time, AET = After Extra Time, PEN = Penalties)
          const finishedFixtures = fixturesResult.items.filter(
            (f) => ["FT", "AET", "PEN"].includes(f.status)
          );

          console.log(
            `[Ingest:Fixtures] Found ${finishedFixtures.length} finished fixtures for ${competition.name}`
          );

          for (const fixture of finishedFixtures) {
            if (!canMakeRequest(ingestionCtx)) break;

            console.log(
              `[Ingest:Fixtures] Fetching player stats for fixture ${fixture.providerFixtureId}...`
            );
            try {
              // Rate limit: wait before making request
              await rateLimitedDelay();

              const playerStats = await fetchFixturePlayerStats(fixture.providerFixtureId);
              incrementRequests(ingestionCtx, 2); // This endpoint makes 2 requests internally

              for (const appearance of playerStats.items) {
                const result = await ctx.runMutation(internal.ingest.apiFootballIngest.upsertAppearance, {
                  data: {
                    providerPlayerId: appearance.providerPlayerId,
                    providerFixtureId: appearance.providerFixtureId,
                    providerTeamId: appearance.providerTeamId,
                    matchDate: appearance.matchDate,
                    minutes: appearance.minutes,
                    // Include player info for auto-creation
                    playerName: appearance.playerName,
                    playerPhoto: appearance.playerPhoto,
                    playerPosition: appearance.playerPosition,
                    stats: appearance.stats,
                  },
                  competitionId: competition._id,
                });
                if (result) {
                  ingestionCtx.summary.appearancesProcessed++;
                }
              }

              console.log(
                `[Ingest:Fixtures] Processed ${playerStats.items.length} appearances for fixture ${fixture.providerFixtureId}`
              );
            } catch (error) {
              console.error(
                `[Ingest:Fixtures] Error fetching player stats for fixture ${fixture.providerFixtureId}:`,
                error
              );
              ingestionCtx.summary.errorsCount++;
            }
          }

          ingestionCtx.summary.competitionsProcessed++;
        } catch (error) {
          console.error(
            `[Ingest:Fixtures] Error fetching fixtures for ${competition.name}:`,
            error
          );
          ingestionCtx.summary.errorsCount++;
        }
      }

      await ctx.runMutation(internal.ingest.apiFootballIngest.completeIngestionRun, {
        runId,
        summary: ingestionCtx.summary,
        requestsUsed: ingestionCtx.requestsUsed,
      });

      console.log(
        `[Ingest:Fixtures] Completed. Requests used: ${ingestionCtx.requestsUsed}/${maxRequests}`
      );
      console.log("[Ingest:Fixtures] Summary:", ingestionCtx.summary);

      return {
        success: true,
        requestsUsed: ingestionCtx.requestsUsed,
        summary: ingestionCtx.summary,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[Ingest:Fixtures] Fatal error:", errorMessage);

      await ctx.runMutation(internal.ingest.apiFootballIngest.failIngestionRun, {
        runId,
        error: errorMessage,
        requestsUsed: ingestionCtx.requestsUsed,
      });

      return {
        success: false,
        error: errorMessage,
        requestsUsed: ingestionCtx.requestsUsed,
        summary: ingestionCtx.summary,
      };
    }
  },
});
```

#### `convex/ingest/cronRunner.ts`

```typescript
/**
 * Cron Runner for Daily Ingestion
 *
 * This module contains the internal action that runs the daily ingestion.
 * It's called by the cron job defined in crons.ts.
 *
 * Pipeline steps:
 * 1. Ingest competitions, teams, players from API-Football
 * 2. Ingest recent fixtures for match stats
 * 3. Recompute rolling stats and ratings
 * 4. Enrich players from FotMob and SofaScore (new)
 */

import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";
import type { IngestionResult } from "./apiFootballIngest";
import type { EnrichmentResult } from "../enrichment/enrichActions";

// Re-export for use in admin.ts
export type { IngestionResult };

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Run the daily ingestion for NL + DE
 *
 * This action:
 * 1. Runs ingestCountries for Netherlands and Germany
 * 2. Runs ingestRecentFixtures for the last 2 days
 * 3. Recomputes player and competition ratings
 * 4. Enriches players from FotMob and SofaScore
 *
 * Budget: ~80 API-Football requests + ~35 enrichment requests
 */
export interface DailyIngestionResult {
  success: boolean;
  totalRequests: number;
  countriesResult: IngestionResult;
  fixturesResult: IngestionResult;
  ratingsResult?: {
    success: boolean;
    playersProcessed: number;
    ratingsComputed: number;
    competitionsRated: number;
  };
  enrichmentResult?: {
    fotmob: EnrichmentResult;
    sofascore: EnrichmentResult;
    totalPlayersEnriched: number;
  };
}

export const runDailyIngestion = internalAction({
  args: {},
  handler: async (ctx): Promise<DailyIngestionResult> => {
    console.log("[Cron] Starting daily ingestion...");

    const season = new Date().getFullYear().toString();
    const countries = ["Netherlands", "Germany"];

    // Step 1: Ingest competitions, teams, and players
    // Budget: ~50 requests
    console.log("[Cron] Step 1: Ingesting competitions, teams, and players...");
    const countriesResult: IngestionResult = await ctx.runAction(
      internal.ingest.apiFootballIngest.ingestCountries,
      {
        countries,
        season,
        maxRequests: 50,
      }
    );

    console.log("[Cron] Countries ingestion result:", countriesResult);

    // Step 2: Ingest recent fixtures (last 2 days)
    // Budget: ~30 requests
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    console.log("[Cron] Step 2: Ingesting recent fixtures...");
    const fixturesResult: IngestionResult = await ctx.runAction(
      internal.ingest.apiFootballIngest.ingestRecentFixtures,
      {
        dateFrom: formatDate(twoDaysAgo),
        dateTo: formatDate(today),
        maxRequests: 30,
        countries,
      }
    );

    console.log("[Cron] Fixtures ingestion result:", fixturesResult);

    // Step 3: Recompute player and competition ratings
    console.log("[Cron] Step 3: Recomputing ratings...");
    let ratingsResult;
    try {
      ratingsResult = await ctx.runAction(
        internal.ratings.compute.recomputeRollingStatsAndRatings,
        {
          // Compute for all players in the countries we ingested
          // This is fast since it doesn't make external API calls
        }
      );
      console.log("[Cron] Ratings result:", ratingsResult);
    } catch (error) {
      console.error("[Cron] Ratings computation failed:", error);
      ratingsResult = {
        success: false,
        playersProcessed: 0,
        ratingsComputed: 0,
        competitionsRated: 0,
      };
    }

    // Step 4: Enrich players from FotMob and SofaScore
    // Budget: ~20 FotMob requests + ~15 SofaScore requests
    console.log("[Cron] Step 4: Enriching players from external providers...");
    let enrichmentResult;
    try {
      enrichmentResult = await ctx.runAction(
        internal.enrichment.enrichActions.enrichPlayersFromAllProviders,
        {
          fotMobRequests: 20,
          sofaScoreRequests: 15,
          batchSize: 10,
        }
      );
      console.log("[Cron] Enrichment result:", enrichmentResult);
    } catch (error) {
      console.error("[Cron] Enrichment failed:", error);
      enrichmentResult = undefined;
    }

    const totalRequests =
      (countriesResult.requestsUsed || 0) + (fixturesResult.requestsUsed || 0);

    console.log(`[Cron] Daily ingestion completed. Total requests: ${totalRequests}`);

    return {
      success: countriesResult.success && fixturesResult.success,
      totalRequests,
      countriesResult,
      fixturesResult,
      ratingsResult,
      enrichmentResult,
    };
  },
});
```

### ⭐ Rating System

#### `convex/ratings/aggregate.ts`

```typescript
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
```

#### `convex/ratings/compute.ts`

```typescript
/**
 * Rating Computation Actions
 *
 * Main actions for computing and storing player and competition ratings.
 */

import { v } from "convex/values";
import { internalAction, internalMutation, internalQuery } from "../_generated/server";
import { internal } from "../_generated/api";
import type { Doc, Id } from "../_generated/dataModel";
import { computeRollingStats, computeLastNStats } from "./aggregate";
import {
  computeAllRatings,
  computeCompetitionStrength,
  type PlayerRatingInput,
} from "./scoring";
import type { PositionGroup, Tier, AggregatedTotals, Per90Stats } from "../lib/metrics";
import {
  MIN_MINUTES_FOR_RATING,
  ROLLING_WINDOW_DAYS,
  FORM_WINDOW_MATCHES,
  TOP_N_FOR_COMPETITION_STRENGTH,
} from "../lib/metrics";

// ============================================================================
// Internal Queries
// ============================================================================

/**
 * Get all appearances for a list of player IDs
 */
export const getAppearancesForPlayers = internalQuery({
  args: {
    playerIds: v.array(v.id("players")),
  },
  handler: async (ctx, args) => {
    const appearances: Doc<"appearances">[] = [];

    // Batch query appearances by player
    for (const playerId of args.playerIds) {
      const playerApps = await ctx.db
        .query("appearances")
        .withIndex("by_player_date", (q) => q.eq("playerId", playerId))
        .collect();
      appearances.push(...playerApps);
    }

    return appearances;
  },
});

/**
 * Get all players with optional filters
 */
export const getPlayersForRating = internalQuery({
  args: {
    competitionId: v.optional(v.id("competitions")),
    country: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let players: Doc<"players">[];

    if (args.competitionId) {
      players = await ctx.db
        .query("players")
        .withIndex("by_competition", (q) =>
          q.eq("competitionId", args.competitionId!)
        )
        .collect();
    } else {
      players = await ctx.db.query("players").collect();
    }

    // If country filter, need to join with competitions
    if (args.country) {
      const competitions = await ctx.db.query("competitions").collect();
      const competitionsByCountry = new Set(
        competitions.filter((c) => c.country === args.country).map((c) => c._id)
      );
      players = players.filter((p) =>
        competitionsByCountry.has(p.competitionId)
      );
    }

    return players;
  },
});

/**
 * Get all competitions with tier info
 */
export const getCompetitionsWithTiers = internalQuery({
  args: {},
  handler: async (ctx) => {
    const competitions = await ctx.db.query("competitions").collect();
    return competitions;
  },
});

/**
 * Get rating profiles from database
 */
export const getRatingProfiles = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("ratingProfiles").collect();
  },
});

// ============================================================================
// Internal Mutations
// ============================================================================

/**
 * Upsert player rolling stats
 */
export const upsertPlayerRollingStats = internalMutation({
  args: {
    playerId: v.id("players"),
    competitionId: v.id("competitions"),
    fromDate: v.string(),
    toDate: v.string(),
    minutes: v.number(),
    totals: v.object({
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
    }),
    per90: v.object({
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
    }),
    last5: v.object({
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
    }),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("playerRollingStats")
      .withIndex("by_player_competition", (q) =>
        q.eq("playerId", args.playerId).eq("competitionId", args.competitionId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        fromDate: args.fromDate,
        toDate: args.toDate,
        minutes: args.minutes,
        totals: args.totals,
        per90: args.per90,
        last5: args.last5,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("playerRollingStats", {
      playerId: args.playerId,
      competitionId: args.competitionId,
      fromDate: args.fromDate,
      toDate: args.toDate,
      minutes: args.minutes,
      totals: args.totals,
      per90: args.per90,
      last5: args.last5,
      updatedAt: Date.now(),
    });
  },
});

/**
 * Upsert player rating
 */
export const upsertPlayerRating = internalMutation({
  args: {
    playerId: v.id("players"),
    competitionId: v.id("competitions"),
    positionGroup: v.union(
      v.literal("GK"),
      v.literal("DEF"),
      v.literal("MID"),
      v.literal("ATT")
    ),
    rating365: v.number(),
    ratingLast5: v.number(),
    tier: v.optional(
      v.union(
        v.literal("Platinum"),
        v.literal("Diamond"),
        v.literal("Elite"),
        v.literal("Gold"),
        v.literal("Silver"),
        v.literal("Bronze")
      )
    ),
    levelScore: v.number(),
  },
  handler: async (ctx, args) => {
    // Find existing rating for this player
    const existingRatings = await ctx.db.query("playerRatings").collect();
    const existing = existingRatings.find(
      (r) =>
        r.playerId === args.playerId && r.competitionId === args.competitionId
    );

    if (existing) {
      await ctx.db.patch(existing._id, {
        positionGroup: args.positionGroup,
        rating365: args.rating365,
        ratingLast5: args.ratingLast5,
        tier: args.tier,
        levelScore: args.levelScore,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("playerRatings", {
      playerId: args.playerId,
      competitionId: args.competitionId,
      positionGroup: args.positionGroup,
      rating365: args.rating365,
      ratingLast5: args.ratingLast5,
      tier: args.tier,
      levelScore: args.levelScore,
      updatedAt: Date.now(),
    });
  },
});

/**
 * Upsert competition rating
 */
export const upsertCompetitionRating = internalMutation({
  args: {
    competitionId: v.id("competitions"),
    tier: v.optional(
      v.union(
        v.literal("Platinum"),
        v.literal("Diamond"),
        v.literal("Elite"),
        v.literal("Gold"),
        v.literal("Silver"),
        v.literal("Bronze")
      )
    ),
    strengthScore: v.number(),
  },
  handler: async (ctx, args) => {
    const existingRatings = await ctx.db.query("competitionRatings").collect();
    const existing = existingRatings.find(
      (r) => r.competitionId === args.competitionId
    );

    if (existing) {
      await ctx.db.patch(existing._id, {
        tier: args.tier,
        strengthScore: args.strengthScore,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("competitionRatings", {
      competitionId: args.competitionId,
      tier: args.tier,
      strengthScore: args.strengthScore,
      updatedAt: Date.now(),
    });
  },
});

/**
 * Batch upsert player rolling stats
 */
export const batchUpsertPlayerRollingStats = internalMutation({
  args: {
    stats: v.array(
      v.object({
        playerId: v.id("players"),
        competitionId: v.id("competitions"),
        fromDate: v.string(),
        toDate: v.string(),
        minutes: v.number(),
        totals: v.any(),
        per90: v.any(),
        last5: v.any(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Get all existing stats
    const existingStats = await ctx.db.query("playerRollingStats").collect();
    const existingMap = new Map(
      existingStats.map((s) => [`${s.playerId}:${s.competitionId}`, s])
    );

    for (const stat of args.stats) {
      const key = `${stat.playerId}:${stat.competitionId}`;
      const existing = existingMap.get(key);

      if (existing) {
        await ctx.db.patch(existing._id, {
          fromDate: stat.fromDate,
          toDate: stat.toDate,
          minutes: stat.minutes,
          totals: stat.totals,
          per90: stat.per90,
          last5: stat.last5,
          updatedAt: Date.now(),
        });
      } else {
        await ctx.db.insert("playerRollingStats", {
          playerId: stat.playerId,
          competitionId: stat.competitionId,
          fromDate: stat.fromDate,
          toDate: stat.toDate,
          minutes: stat.minutes,
          totals: stat.totals,
          per90: stat.per90,
          last5: stat.last5,
          updatedAt: Date.now(),
        });
      }
    }
  },
});

/**
 * Batch upsert player ratings
 */
export const batchUpsertPlayerRatings = internalMutation({
  args: {
    ratings: v.array(
      v.object({
        playerId: v.id("players"),
        competitionId: v.id("competitions"),
        positionGroup: v.union(
          v.literal("GK"),
          v.literal("DEF"),
          v.literal("MID"),
          v.literal("ATT")
        ),
        rating365: v.number(),
        ratingLast5: v.number(),
        tier: v.optional(
          v.union(
            v.literal("Platinum"),
            v.literal("Diamond"),
            v.literal("Elite"),
            v.literal("Gold"),
            v.literal("Silver"),
            v.literal("Bronze")
          )
        ),
        levelScore: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Get all existing ratings
    const existingRatings = await ctx.db.query("playerRatings").collect();
    const existingMap = new Map(
      existingRatings.map((r) => [`${r.playerId}:${r.competitionId}`, r])
    );

    for (const rating of args.ratings) {
      const key = `${rating.playerId}:${rating.competitionId}`;
      const existing = existingMap.get(key);

      if (existing) {
        await ctx.db.patch(existing._id, {
          positionGroup: rating.positionGroup,
          rating365: rating.rating365,
          ratingLast5: rating.ratingLast5,
          tier: rating.tier,
          levelScore: rating.levelScore,
          updatedAt: Date.now(),
        });
      } else {
        await ctx.db.insert("playerRatings", {
          playerId: rating.playerId,
          competitionId: rating.competitionId,
          positionGroup: rating.positionGroup,
          rating365: rating.rating365,
          ratingLast5: rating.ratingLast5,
          tier: rating.tier,
          levelScore: rating.levelScore,
          updatedAt: Date.now(),
        });
      }
    }
  },
});

// ============================================================================
// Result Types
// ============================================================================

interface RatingComputationResult {
  success: boolean;
  playersProcessed: number;
  ratingsComputed: number;
  competitionsRated: number;
  dryRun?: boolean;
}

// ============================================================================
// Main Computation Action
// ============================================================================

export const recomputeRollingStatsAndRatings = internalAction({
  args: {
    competitionId: v.optional(v.id("competitions")),
    country: v.optional(v.string()),
    dryRun: v.optional(v.boolean()),
    // Custom date range (for testing with historical data)
    customFromDate: v.optional(v.string()),
    customToDate: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<RatingComputationResult> => {
    const dryRun = args.dryRun ?? false;

    console.log("[Ratings] Starting rating computation...");
    console.log(
      `[Ratings] Filters: competitionId=${args.competitionId ?? "all"}, country=${args.country ?? "all"}, dryRun=${dryRun}`
    );

    // Step 1: Get all players matching filters
    const players: Doc<"players">[] = await ctx.runQuery(
      internal.ratings.compute.getPlayersForRating,
      {
        competitionId: args.competitionId,
        country: args.country,
      }
    );

    console.log(`[Ratings] Found ${players.length} players`);

    if (players.length === 0) {
      return {
        success: true,
        playersProcessed: 0,
        ratingsComputed: 0,
        competitionsRated: 0,
      };
    }

    // Step 2: Get all competitions
    const competitions: Doc<"competitions">[] = await ctx.runQuery(
      internal.ratings.compute.getCompetitionsWithTiers,
      {}
    );
    const competitionMap = new Map(competitions.map((c) => [c._id, c]));

    // Step 3: Get all appearances for players
    const playerIds = players.map((p) => p._id);
    const allAppearances: Doc<"appearances">[] = await ctx.runQuery(
      internal.ratings.compute.getAppearancesForPlayers,
      { playerIds }
    );

    console.log(`[Ratings] Found ${allAppearances.length} total appearances`);

    // Group appearances by player
    const appearancesByPlayer = new Map<Id<"players">, Doc<"appearances">[]>();
    for (const app of allAppearances) {
      const existing = appearancesByPlayer.get(app.playerId) ?? [];
      existing.push(app);
      appearancesByPlayer.set(app.playerId, existing);
    }

    // Step 4: Compute rolling window dates
    let fromDateStr: string;
    let toDateStr: string;

    if (args.customFromDate && args.customToDate) {
      // Use custom date range
      fromDateStr = args.customFromDate;
      toDateStr = args.customToDate;
      console.log(`[Ratings] Using custom date range: ${fromDateStr} to ${toDateStr}`);
    } else {
      // Default: rolling window from today
      const today = new Date();
      const fromDate365 = new Date(today);
      fromDate365.setDate(fromDate365.getDate() - ROLLING_WINDOW_DAYS);
      fromDateStr = fromDate365.toISOString().split("T")[0];
      toDateStr = today.toISOString().split("T")[0];
    }

    console.log(`[Ratings] Rolling window: ${fromDateStr} to ${toDateStr}`);

    // Step 5: Compute rolling stats for each player
    const rollingStatsToUpsert: Array<{
      playerId: Id<"players">;
      competitionId: Id<"competitions">;
      fromDate: string;
      toDate: string;
      minutes: number;
      totals: AggregatedTotals;
      per90: Per90Stats;
      last5: AggregatedTotals;
    }> = [];

    const ratingInputs: PlayerRatingInput[] = [];

    for (const player of players) {
      const appearances = appearancesByPlayer.get(player._id) ?? [];

      // Compute rolling 365 stats
      const rolling365 = computeRollingStats(appearances, fromDateStr, toDateStr);

      // Compute last 5 stats
      const last5Stats = computeLastNStats(appearances, FORM_WINDOW_MATCHES);

      // Store rolling stats
      rollingStatsToUpsert.push({
        playerId: player._id,
        competitionId: player.competitionId,
        fromDate: fromDateStr,
        toDate: toDateStr,
        minutes: rolling365.minutes,
        totals: rolling365.totals,
        per90: rolling365.per90,
        last5: last5Stats.totals,
      });

      // Only include in rating if meets minimum minutes
      if (rolling365.minutes >= MIN_MINUTES_FOR_RATING) {
        const competition = competitionMap.get(player.competitionId);

        ratingInputs.push({
          playerId: player._id,
          competitionId: player.competitionId,
          positionGroup: player.positionGroup as PositionGroup,
          features365: rolling365.features,
          featuresLast5: last5Stats.features,
          tier: competition?.tier as Tier | undefined,
        });
      }
    }

    console.log(
      `[Ratings] ${ratingInputs.length} players meet minimum minutes (${MIN_MINUTES_FOR_RATING})`
    );

    // Step 6: Compute ratings
    const computedRatings = computeAllRatings(ratingInputs);

    console.log(`[Ratings] Computed ${computedRatings.length} ratings`);

    // Step 7: Persist data (unless dry run)
    if (!dryRun) {
      // Batch upsert rolling stats (in chunks to avoid transaction limits)
      const BATCH_SIZE = 100;
      for (let i = 0; i < rollingStatsToUpsert.length; i += BATCH_SIZE) {
        const batch = rollingStatsToUpsert.slice(i, i + BATCH_SIZE);
        await ctx.runMutation(
          internal.ratings.compute.batchUpsertPlayerRollingStats,
          { stats: batch }
        );
      }

      console.log(`[Ratings] Persisted ${rollingStatsToUpsert.length} rolling stats`);

      // Batch upsert ratings
      const ratingsToUpsert = computedRatings.map((r) => ({
        playerId: r.playerId as Id<"players">,
        competitionId: r.competitionId as Id<"competitions">,
        positionGroup: r.positionGroup,
        rating365: r.rating365,
        ratingLast5: r.ratingLast5,
        tier: r.tier,
        levelScore: r.levelScore,
      }));

      for (let i = 0; i < ratingsToUpsert.length; i += BATCH_SIZE) {
        const batch = ratingsToUpsert.slice(i, i + BATCH_SIZE);
        await ctx.runMutation(
          internal.ratings.compute.batchUpsertPlayerRatings,
          { ratings: batch }
        );
      }

      console.log(`[Ratings] Persisted ${ratingsToUpsert.length} player ratings`);

      // Step 8: Compute and persist competition strength scores
      const competitionsToRate = new Set(
        ratingInputs.map((r) => r.competitionId)
      );
      let competitionsRated = 0;

      for (const compId of competitionsToRate) {
        const compRatings = computedRatings.filter(
          (r) => r.competitionId === compId
        );
        const levelScores = compRatings.map((r) => r.levelScore);
        const strengthScore = computeCompetitionStrength(
          levelScores,
          TOP_N_FOR_COMPETITION_STRENGTH
        );

        const competition = competitionMap.get(compId as Id<"competitions">);

        await ctx.runMutation(
          internal.ratings.compute.upsertCompetitionRating,
          {
            competitionId: compId as Id<"competitions">,
            tier: competition?.tier as Tier | undefined,
            strengthScore,
          }
        );
        competitionsRated++;
      }

      console.log(`[Ratings] Persisted ${competitionsRated} competition ratings`);
    }

    const result = {
      success: true,
      playersProcessed: players.length,
      ratingsComputed: computedRatings.length,
      competitionsRated: new Set(ratingInputs.map((r) => r.competitionId)).size,
      dryRun,
    };

    console.log("[Ratings] Completed:", result);

    return result;
  },
});
```

#### `convex/ratings/positionMapping.ts`

```typescript
/**
 * Position Group Mapping
 *
 * Maps raw position strings from various sources to canonical position groups.
 */

import type { PositionGroup } from "../lib/metrics";

// ============================================================================
// Position Mappings
// ============================================================================

// Map of lowercase position strings to position groups
const POSITION_MAP: Record<string, PositionGroup> = {
  // Goalkeepers
  goalkeeper: "GK",
  gk: "GK",
  g: "GK",
  keeper: "GK",
  portero: "GK",
  gardien: "GK",
  torwart: "GK",

  // Defenders
  defender: "DEF",
  "centre-back": "DEF",
  "center-back": "DEF",
  cb: "DEF",
  centreback: "DEF",
  centerback: "DEF",
  "left-back": "DEF",
  "right-back": "DEF",
  lb: "DEF",
  rb: "DEF",
  leftback: "DEF",
  rightback: "DEF",
  "left back": "DEF",
  "right back": "DEF",
  fullback: "DEF",
  "full-back": "DEF",
  "wing-back": "DEF",
  wingback: "DEF",
  lwb: "DEF",
  rwb: "DEF",
  "left wing-back": "DEF",
  "right wing-back": "DEF",
  sweeper: "DEF",
  libero: "DEF",
  defensor: "DEF",
  défenseur: "DEF",
  verteidiger: "DEF",

  // Midfielders
  midfielder: "MID",
  midfield: "MID",
  mf: "MID",
  "central midfield": "MID",
  "central midfielder": "MID",
  cm: "MID",
  "defensive midfield": "MID",
  "defensive midfielder": "MID",
  dm: "MID",
  dmf: "MID",
  cdm: "MID",
  "holding midfielder": "MID",
  "attacking midfield": "MID",
  "attacking midfielder": "MID",
  am: "MID",
  amf: "MID",
  cam: "MID",
  "left midfield": "MID",
  "right midfield": "MID",
  lm: "MID",
  rm: "MID",
  "left winger": "MID",
  "right winger": "MID",
  lw: "MID",
  rw: "MID",
  winger: "MID",
  wing: "MID",
  mediocampista: "MID",
  milieu: "MID",
  mittelfeldspieler: "MID",

  // Attackers
  attacker: "ATT",
  attack: "ATT",
  forward: "ATT",
  striker: "ATT",
  st: "ATT",
  fw: "ATT",
  cf: "ATT",
  "centre-forward": "ATT",
  "center-forward": "ATT",
  centreforward: "ATT",
  centerforward: "ATT",
  "second striker": "ATT",
  ss: "ATT",
  "false 9": "ATT",
  false9: "ATT",
  "left forward": "ATT",
  "right forward": "ATT",
  lf: "ATT",
  rf: "ATT",
  delantero: "ATT",
  attaquant: "ATT",
  stürmer: "ATT",
  angreifer: "ATT",
};

// ============================================================================
// Mapping Functions
// ============================================================================

/**
 * Map a raw position string to a canonical position group
 * Returns undefined if position cannot be mapped
 */
export function mapPositionToGroup(position: string): PositionGroup | undefined {
  if (!position) return undefined;

  const normalized = position.toLowerCase().trim();

  // Direct match
  if (POSITION_MAP[normalized]) {
    return POSITION_MAP[normalized];
  }

  // Partial match - check if any key is contained in the position
  for (const [key, group] of Object.entries(POSITION_MAP)) {
    if (normalized.includes(key)) {
      return group;
    }
  }

  // Fallback patterns
  if (normalized.includes("goal") || normalized.includes("keeper")) {
    return "GK";
  }
  if (normalized.includes("defend") || normalized.includes("back")) {
    return "DEF";
  }
  if (normalized.includes("mid") || normalized.includes("wing")) {
    return "MID";
  }
  if (
    normalized.includes("forward") ||
    normalized.includes("attack") ||
    normalized.includes("strik")
  ) {
    return "ATT";
  }

  return undefined;
}

/**
 * Map a raw position string to a canonical position group
 * Returns a default if position cannot be mapped
 */
export function mapPositionToGroupWithDefault(
  position: string,
  defaultGroup: PositionGroup = "MID"
): PositionGroup {
  return mapPositionToGroup(position) ?? defaultGroup;
}

/**
 * Validate that a value is a valid position group
 */
export function isValidPositionGroup(value: string): value is PositionGroup {
  return ["GK", "DEF", "MID", "ATT"].includes(value);
}
```

#### `convex/ratings/scoring.ts`

```typescript
/**
 * Rating Scoring Functions
 *
 * Computes player ratings using percentile-based normalization
 * with position-specific weights.
 */

import type {
  PositionGroup,
  RatingFeatures,
  RatingWeights,
  Tier,
} from "../lib/metrics";
import { TIER_FACTORS, DEFAULT_RATING_PROFILES } from "../lib/metrics";

// ============================================================================
// Percentile Computation
// ============================================================================

/**
 * Compute percentile rank for a value within a sorted array
 * Returns value between 0 and 1
 */
export function computePercentile(value: number, sortedValues: number[]): number {
  if (sortedValues.length === 0) return 0.5;
  if (sortedValues.length === 1) return 0.5;

  // Count how many values are strictly less than this value
  let countLess = 0;
  let countEqual = 0;

  for (const v of sortedValues) {
    if (v < value) countLess++;
    else if (v === value) countEqual++;
  }

  // Use mid-rank percentile: (count_less + 0.5 * count_equal) / total
  return (countLess + 0.5 * countEqual) / sortedValues.length;
}

/**
 * Build percentile distributions for all features from player feature vectors
 */
export function buildPercentileDistributions(
  playerFeatures: RatingFeatures[]
): Map<keyof RatingFeatures, number[]> {
  const distributions = new Map<keyof RatingFeatures, number[]>();

  // List of feature keys to include
  const featureKeys: (keyof RatingFeatures)[] = [
    "goalsPer90",
    "assistsPer90",
    "shotsPer90",
    "shotsOnTargetPer90",
    "passesPer90",
    "keyPassesPer90",
    "tacklesPer90",
    "interceptionsPer90",
    "tacklesInterceptionsPer90",
    "clearancesPer90",
    "blocksPer90",
    "duelsWonPer90",
    "aerialDuelsWonPer90",
    "dribblesPer90",
    "dribblesSuccessfulPer90",
    "foulsCommittedPer90",
    "yellowCardsPer90",
    "redCardsPer90",
    "cardsPenaltyPer90",
    "savesPer90",
    "goalsConcededPer90",
    "xGPer90",
    "xAPer90",
    "passCompletionRate",
    "duelWinRate",
    "aerialWinRate",
    "dribbleSuccessRate",
    "shotAccuracy",
    "cleanSheetRate",
    "saveRate",
    "goalContributionsPer90",
  ];

  for (const key of featureKeys) {
    const values = playerFeatures
      .map((f) => f[key] as number)
      .filter((v) => v !== undefined && v !== null && !isNaN(v));

    // Sort ascending for percentile computation
    values.sort((a, b) => a - b);
    distributions.set(key, values);
  }

  return distributions;
}

/**
 * Build percentile distributions for a specific position group
 */
export function buildPositionGroupDistributions(
  playerFeatures: Array<{
    positionGroup: PositionGroup;
    features: RatingFeatures;
  }>,
  positionGroup: PositionGroup
): Map<keyof RatingFeatures, number[]> {
  const filtered = playerFeatures
    .filter((p) => p.positionGroup === positionGroup)
    .map((p) => p.features);

  return buildPercentileDistributions(filtered);
}

// ============================================================================
// Rating Calculation
// ============================================================================

/**
 * Compute raw rating score from feature vector using weights and percentile normalization
 */
export function computeRatingScore(
  features: RatingFeatures,
  weights: RatingWeights,
  invertMetrics: string[],
  distributions: Map<keyof RatingFeatures, number[]>
): number {
  let totalWeight = 0;
  let weightedSum = 0;

  for (const [metricKey, weight] of Object.entries(weights)) {
    if (weight === 0) continue;

    const featureKey = metricKey as keyof RatingFeatures;
    const value = features[featureKey];

    if (value === undefined || value === null || isNaN(value as number)) {
      // Skip missing metrics - they don't contribute to the score
      continue;
    }

    const distribution = distributions.get(featureKey);
    if (!distribution || distribution.length === 0) {
      continue;
    }

    // Compute percentile (0-1)
    let percentile = computePercentile(value as number, distribution);

    // Invert if this is a "lower is better" metric
    if (invertMetrics.includes(metricKey)) {
      percentile = 1 - percentile;
    }

    weightedSum += percentile * weight;
    totalWeight += weight;
  }

  // Return weighted average (0-1)
  if (totalWeight === 0) return 0.5; // Default to middle if no metrics available

  return weightedSum / totalWeight;
}

/**
 * Convert raw score (0-1) to rating (0-100)
 */
export function scoreToRating(score: number): number {
  // Map 0-1 to 0-100 with some non-linearity to spread middle values
  // Using a gentle S-curve: 100 * (score ^ 0.9)
  // This slightly compresses low values and expands high values
  const rating = Math.round(100 * Math.pow(score, 0.9));
  return Math.max(0, Math.min(100, rating));
}

/**
 * Compute level score adjusted by tier
 */
export function computeLevelScore(rating365: number, tier?: Tier): number {
  const tierFactor = tier ? TIER_FACTORS[tier] : TIER_FACTORS.Bronze;
  const levelScore = Math.round(rating365 * tierFactor);
  return Math.max(0, Math.min(100, levelScore));
}

// ============================================================================
// Full Rating Computation
// ============================================================================

export interface PlayerRatingInput {
  playerId: string;
  competitionId: string;
  positionGroup: PositionGroup;
  features365: RatingFeatures;
  featuresLast5: RatingFeatures;
  tier?: Tier;
}

export interface ComputedRating {
  playerId: string;
  competitionId: string;
  positionGroup: PositionGroup;
  rating365: number;
  ratingLast5: number;
  tier?: Tier;
  levelScore: number;
}

/**
 * Compute ratings for all players using position-group-specific distributions
 */
export function computeAllRatings(
  players: PlayerRatingInput[],
  customProfiles?: Map<PositionGroup, { weights: RatingWeights; invertMetrics: string[] }>
): ComputedRating[] {
  // Build distributions for each position group
  const distributionsByPosition = new Map<
    PositionGroup,
    {
      rolling365: Map<keyof RatingFeatures, number[]>;
      last5: Map<keyof RatingFeatures, number[]>;
    }
  >();

  const positionGroups: PositionGroup[] = ["GK", "DEF", "MID", "ATT"];

  for (const pg of positionGroups) {
    const pgPlayers = players.filter((p) => p.positionGroup === pg);

    distributionsByPosition.set(pg, {
      rolling365: buildPercentileDistributions(pgPlayers.map((p) => p.features365)),
      last5: buildPercentileDistributions(pgPlayers.map((p) => p.featuresLast5)),
    });
  }

  // Compute ratings for each player
  const results: ComputedRating[] = [];

  for (const player of players) {
    const profile = customProfiles?.get(player.positionGroup) ??
      DEFAULT_RATING_PROFILES[player.positionGroup];

    const distributions = distributionsByPosition.get(player.positionGroup);
    if (!distributions) continue;

    // Compute raw scores
    const score365 = computeRatingScore(
      player.features365,
      profile.weights,
      profile.invertMetrics,
      distributions.rolling365
    );

    const scoreLast5 = computeRatingScore(
      player.featuresLast5,
      profile.weights,
      profile.invertMetrics,
      distributions.last5
    );

    // Convert to ratings
    const rating365 = scoreToRating(score365);
    const ratingLast5 = scoreToRating(scoreLast5);

    // Compute level score
    const levelScore = computeLevelScore(rating365, player.tier);

    results.push({
      playerId: player.playerId,
      competitionId: player.competitionId,
      positionGroup: player.positionGroup,
      rating365,
      ratingLast5,
      tier: player.tier,
      levelScore,
    });
  }

  return results;
}

// ============================================================================
// Competition Strength
// ============================================================================

/**
 * Compute competition strength score from player level scores
 * Uses average of top N players
 */
export function computeCompetitionStrength(
  playerLevelScores: number[],
  topN: number = 25
): number {
  if (playerLevelScores.length === 0) return 0;

  // Sort descending and take top N
  const sorted = [...playerLevelScores].sort((a, b) => b - a);
  const topPlayers = sorted.slice(0, Math.min(topN, sorted.length));

  // Average
  const avg = topPlayers.reduce((a, b) => a + b, 0) / topPlayers.length;

  return Math.round(avg);
}
```

#### `convex/ratings/seed.ts`

```typescript
/**
 * Seed Rating Profiles
 *
 * Seeds the default rating profiles into the database.
 */

import { v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";
import { DEFAULT_RATING_PROFILES } from "../lib/metrics";
import type { PositionGroup } from "../lib/metrics";

/**
 * Check if rating profiles exist
 */
export const hasRatingProfiles = internalQuery({
  args: {},
  handler: async (ctx) => {
    const profiles = await ctx.db.query("ratingProfiles").collect();
    return profiles.length > 0;
  },
});

/**
 * Seed default rating profiles
 */
export const seedRatingProfiles = internalMutation({
  args: {
    force: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Check if profiles already exist
    const existing = await ctx.db.query("ratingProfiles").collect();

    if (existing.length > 0 && !args.force) {
      console.log("[Seed] Rating profiles already exist, skipping");
      return { seeded: false, count: existing.length };
    }

    // Delete existing if force
    if (args.force) {
      for (const profile of existing) {
        await ctx.db.delete(profile._id);
      }
    }

    // Insert default profiles
    const positionGroups: PositionGroup[] = ["GK", "DEF", "MID", "ATT"];
    let count = 0;

    for (const pg of positionGroups) {
      const profile = DEFAULT_RATING_PROFILES[pg];

      await ctx.db.insert("ratingProfiles", {
        positionGroup: pg,
        weights: profile.weights,
        invertMetrics: profile.invertMetrics,
        updatedAt: Date.now(),
      });
      count++;
    }

    console.log(`[Seed] Seeded ${count} rating profiles`);

    return { seeded: true, count };
  },
});

/**
 * Update a specific rating profile's weights
 */
export const updateRatingProfile = internalMutation({
  args: {
    positionGroup: v.union(
      v.literal("GK"),
      v.literal("DEF"),
      v.literal("MID"),
      v.literal("ATT")
    ),
    weights: v.record(v.string(), v.number()),
    invertMetrics: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("ratingProfiles")
      .withIndex("by_positionGroup", (q) =>
        q.eq("positionGroup", args.positionGroup)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        weights: args.weights,
        invertMetrics: args.invertMetrics,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("ratingProfiles", {
      positionGroup: args.positionGroup,
      weights: args.weights,
      invertMetrics: args.invertMetrics,
      updatedAt: Date.now(),
    });
  },
});
```

### ✨ Data Enrichment

#### `convex/enrichment/enrichActions.ts`

```typescript
/**
 * Enrichment Actions
 *
 * Orchestrates data enrichment from FotMob and SofaScore providers.
 * Features:
 * - Rate-limited fetching with request budgeting
 * - Identity resolution to prevent duplicates
 * - Canonical merging with precedence rules
 * - Idempotent operations
 */

import { v } from "convex/values";
import { internalAction, internalMutation, internalQuery } from "../_generated/server";
import { internal } from "../_generated/api";
import type { Doc, Id } from "../_generated/dataModel";
import { createBudget, type RequestBudget } from "../providers/fetchWrapper";
import * as FotMob from "../providers/fotmob";
import * as SofaScore from "../providers/sofascore";
import {
  normalizeName,
  resolvePlayer,
  upsertExternalId,
  addToReviewQueue,
  type ExternalPlayerData,
  type Provider,
} from "../resolve/resolvePlayer";
import {
  mergeProviderProfile,
  storeProviderAggregates,
  type NormalizedProfile,
} from "../merge/mergePlayer";

// ============================================================================
// Types
// ============================================================================

export interface EnrichmentResult {
  provider: Provider;
  playersProcessed: number;
  profilesFetched: number;
  profilesMerged: number;
  externalIdsMapped: number;
  addedToReviewQueue: number;
  errors: number;
  requestsUsed: number;
  budgetExhausted: boolean;
}

export interface EnrichmentConfig {
  maxRequests: number;
  batchSize?: number;
  competitionIds?: Id<"competitions">[];
}

// ============================================================================
// Internal Queries
// ============================================================================

/**
 * Get players that need enrichment
 */
export const getPlayersForEnrichment = internalQuery({
  args: {
    provider: v.union(
      v.literal("fotmob"),
      v.literal("sofascore")
    ),
    limit: v.number(),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<Doc<"players">[]> => {
    // Get players that don't have an external ID for this provider yet
    let playersQuery = ctx.db.query("players");

    // Filter by competition if specified
    if (args.competitionIds && args.competitionIds.length > 0) {
      // We need to collect and filter manually since we can't do OR in index
      const allPlayers: Doc<"players">[] = [];
      for (const compId of args.competitionIds) {
        const competitionPlayers = await ctx.db
          .query("players")
          .withIndex("by_competition", (q) => q.eq("competitionId", compId))
          .collect();
        allPlayers.push(...competitionPlayers);
      }

      // Filter out players who already have external IDs for this provider
      const playersWithoutExternalId: Doc<"players">[] = [];
      for (const player of allPlayers) {
        const existingExternalId = await ctx.db
          .query("playerExternalIds")
          .withIndex("by_player_provider", (q) =>
            q.eq("playerId", player._id).eq("provider", args.provider)
          )
          .first();

        if (!existingExternalId) {
          playersWithoutExternalId.push(player);
        }
      }

      return playersWithoutExternalId.slice(0, args.limit);
    }

    // Get all players if no competition filter
    const allPlayers = await ctx.db.query("players").take(args.limit * 2);

    // Filter out players who already have external IDs
    const playersWithoutExternalId: Doc<"players">[] = [];
    for (const player of allPlayers) {
      if (playersWithoutExternalId.length >= args.limit) break;

      const existingExternalId = await ctx.db
        .query("playerExternalIds")
        .withIndex("by_player_provider", (q) =>
          q.eq("playerId", player._id).eq("provider", args.provider)
        )
        .first();

      if (!existingExternalId) {
        playersWithoutExternalId.push(player);
      }
    }

    return playersWithoutExternalId;
  },
});

/**
 * Get players that have external IDs but need profile enrichment
 */
export const getPlayersForProfileEnrichment = internalQuery({
  args: {
    provider: v.union(
      v.literal("fotmob"),
      v.literal("sofascore")
    ),
    limit: v.number(),
  },
  handler: async (ctx, args): Promise<Array<{ player: Doc<"players">; externalId: Doc<"playerExternalIds"> }>> => {
    // Get external IDs for the provider
    const externalIds = await ctx.db
      .query("playerExternalIds")
      .filter((q) => q.eq(q.field("provider"), args.provider))
      .take(args.limit * 2);

    const results: Array<{ player: Doc<"players">; externalId: Doc<"playerExternalIds"> }> = [];

    for (const extId of externalIds) {
      if (results.length >= args.limit) break;

      // Check if we already have a profile for this player/provider
      const existingProfile = await ctx.db
        .query("providerPlayerProfiles")
        .withIndex("by_player_provider", (q) =>
          q.eq("playerId", extId.playerId).eq("provider", args.provider)
        )
        .first();

      if (!existingProfile) {
        const player = await ctx.db.get(extId.playerId);
        if (player) {
          results.push({ player, externalId: extId });
        }
      }
    }

    return results;
  },
});

// ============================================================================
// Internal Mutations
// ============================================================================

/**
 * Process a single player's enrichment result
 */
export const processPlayerEnrichment = internalMutation({
  args: {
    playerId: v.id("players"),
    provider: v.union(v.literal("fotmob"), v.literal("sofascore")),
    providerPlayerId: v.string(),
    confidence: v.number(),
    rawProfile: v.any(),
    normalizedProfile: v.any(),
  },
  handler: async (ctx, args) => {
    // Store external ID mapping
    await upsertExternalId(
      ctx.db,
      args.playerId,
      args.provider,
      args.providerPlayerId,
      args.confidence
    );

    // Merge profile data
    const mergeResult = await mergeProviderProfile(
      ctx.db,
      args.playerId,
      args.provider,
      args.normalizedProfile as NormalizedProfile,
      args.rawProfile
    );

    return mergeResult;
  },
});

/**
 * Add unresolved player to review queue
 */
export const addUnresolvedPlayer = internalMutation({
  args: {
    provider: v.union(v.literal("fotmob"), v.literal("sofascore")),
    providerPlayerId: v.string(),
    name: v.string(),
    payload: v.any(),
    reason: v.string(),
    candidatePlayerIds: v.optional(v.array(v.id("players"))),
  },
  handler: async (ctx, args) => {
    const data: ExternalPlayerData = {
      provider: args.provider,
      providerPlayerId: args.providerPlayerId,
      name: args.name,
    };

    await addToReviewQueue(
      ctx.db,
      data,
      args.payload,
      args.reason,
      args.candidatePlayerIds
    );
  },
});

/**
 * Store provider aggregated stats
 */
export const storePlayerAggregates = internalMutation({
  args: {
    playerId: v.id("players"),
    provider: v.union(v.literal("fotmob"), v.literal("sofascore")),
    stats: v.any(),
    window: v.union(v.literal("365"), v.literal("season"), v.literal("career")),
    competitionId: v.optional(v.id("competitions")),
    season: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await storeProviderAggregates(
      ctx.db,
      args.playerId,
      args.provider,
      args.stats,
      {
        window: args.window,
        competitionId: args.competitionId,
        season: args.season,
      }
    );
  },
});

/**
 * Update enrichment state for resumable operations
 */
export const updateEnrichmentState = internalMutation({
  args: {
    provider: v.union(v.literal("fotmob"), v.literal("sofascore")),
    lastProcessedPlayerId: v.optional(v.id("players")),
    totalProcessed: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("enrichmentState")
      .withIndex("by_provider", (q) => q.eq("provider", args.provider))
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        lastProcessedPlayerId: args.lastProcessedPlayerId,
        totalProcessed: args.totalProcessed,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("enrichmentState", {
        provider: args.provider,
        lastProcessedPlayerId: args.lastProcessedPlayerId,
        totalProcessed: args.totalProcessed,
        updatedAt: now,
      });
    }
  },
});

// ============================================================================
// FotMob Enrichment Action
// ============================================================================

/**
 * Enrich players from FotMob
 */
export const enrichPlayersFromFotMob = internalAction({
  args: {
    maxRequests: v.optional(v.number()),
    batchSize: v.optional(v.number()),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<EnrichmentResult> => {
    const maxRequests = args.maxRequests ?? 20;
    const batchSize = args.batchSize ?? 10;
    const budget = createBudget(maxRequests);

    const result: EnrichmentResult = {
      provider: "fotmob",
      playersProcessed: 0,
      profilesFetched: 0,
      profilesMerged: 0,
      externalIdsMapped: 0,
      addedToReviewQueue: 0,
      errors: 0,
      requestsUsed: 0,
      budgetExhausted: false,
    };

    console.log(`[FotMob] Starting enrichment with budget: ${maxRequests} requests`);

    try {
      // Get players that need enrichment
      const players = await ctx.runQuery(
        internal.enrichment.enrichActions.getPlayersForEnrichment,
        {
          provider: "fotmob",
          limit: batchSize,
          competitionIds: args.competitionIds,
        }
      );

      console.log(`[FotMob] Found ${players.length} players to enrich`);

      for (const player of players) {
        if (budget.used >= budget.maxRequests) {
          result.budgetExhausted = true;
          console.log(`[FotMob] Budget exhausted after ${budget.used} requests`);
          break;
        }

        try {
          result.playersProcessed++;

          // Search for player in FotMob
          const searchResults = await FotMob.searchPlayer(player.name, budget);

          if (searchResults.length === 0) {
            console.log(`[FotMob] No search results for: ${player.name}`);
            continue;
          }

          // Find best match from search results
          const bestMatch = findBestSearchMatch(player, searchResults);

          if (!bestMatch) {
            await ctx.runMutation(
              internal.enrichment.enrichActions.addUnresolvedPlayer,
              {
                provider: "fotmob",
                providerPlayerId: searchResults[0].providerPlayerId,
                name: player.name,
                payload: searchResults,
                reason: "no_confident_match_in_search",
              }
            );
            result.addedToReviewQueue++;
            continue;
          }

          // Fetch full profile
          const { raw: rawProfile, normalized: normalizedProfile } = await FotMob.getPlayer(
            bestMatch.providerPlayerId,
            budget
          );
          result.profilesFetched++;

          // Process the enrichment
          await ctx.runMutation(
            internal.enrichment.enrichActions.processPlayerEnrichment,
            {
              playerId: player._id,
              provider: "fotmob",
              providerPlayerId: bestMatch.providerPlayerId,
              confidence: 0.95,
              rawProfile,
              normalizedProfile,
            }
          );
          result.profilesMerged++;
          result.externalIdsMapped++;

          // Fetch stats if within budget
          if (budget.used < budget.maxRequests - 1) {
            try {
              const { careerStats } = await FotMob.getPlayerStats(
                bestMatch.providerPlayerId,
                budget
              );

              if (careerStats) {
                await ctx.runMutation(
                  internal.enrichment.enrichActions.storePlayerAggregates,
                  {
                    playerId: player._id,
                    provider: "fotmob",
                    stats: careerStats,
                    window: "career",
                  }
                );
              }
            } catch (statsError) {
              console.warn(`[FotMob] Failed to fetch stats for ${player.name}:`, statsError);
            }
          }

          console.log(`[FotMob] Enriched player: ${player.name}`);
        } catch (playerError) {
          result.errors++;
          console.error(`[FotMob] Error processing player ${player.name}:`, playerError);
        }
      }

      // Update enrichment state
      if (players.length > 0) {
        await ctx.runMutation(
          internal.enrichment.enrichActions.updateEnrichmentState,
          {
            provider: "fotmob",
            lastProcessedPlayerId: players[players.length - 1]._id,
            totalProcessed: result.playersProcessed,
          }
        );
      }
    } catch (error) {
      console.error("[FotMob] Enrichment failed:", error);
      result.errors++;
    }

    result.requestsUsed = budget.used;
    console.log(`[FotMob] Enrichment complete:`, result);
    return result;
  },
});

// ============================================================================
// SofaScore Enrichment Action
// ============================================================================

/**
 * Enrich players from SofaScore
 */
export const enrichPlayersFromSofaScore = internalAction({
  args: {
    maxRequests: v.optional(v.number()),
    batchSize: v.optional(v.number()),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<EnrichmentResult> => {
    const maxRequests = args.maxRequests ?? 15; // Lower default for SofaScore
    const batchSize = args.batchSize ?? 5;
    const budget = createBudget(maxRequests);

    const result: EnrichmentResult = {
      provider: "sofascore",
      playersProcessed: 0,
      profilesFetched: 0,
      profilesMerged: 0,
      externalIdsMapped: 0,
      addedToReviewQueue: 0,
      errors: 0,
      requestsUsed: 0,
      budgetExhausted: false,
    };

    console.log(`[SofaScore] Starting enrichment with budget: ${maxRequests} requests`);

    try {
      // Get players that need enrichment
      const players = await ctx.runQuery(
        internal.enrichment.enrichActions.getPlayersForEnrichment,
        {
          provider: "sofascore",
          limit: batchSize,
          competitionIds: args.competitionIds,
        }
      );

      console.log(`[SofaScore] Found ${players.length} players to enrich`);

      for (const player of players) {
        if (budget.used >= budget.maxRequests) {
          result.budgetExhausted = true;
          console.log(`[SofaScore] Budget exhausted after ${budget.used} requests`);
          break;
        }

        try {
          result.playersProcessed++;

          // Search for player in SofaScore
          const searchResults = await SofaScore.searchPlayer(player.name, budget);

          if (searchResults.length === 0) {
            console.log(`[SofaScore] No search results for: ${player.name}`);
            continue;
          }

          // Find best match from search results
          const bestMatch = findBestSearchMatch(player, searchResults);

          if (!bestMatch) {
            await ctx.runMutation(
              internal.enrichment.enrichActions.addUnresolvedPlayer,
              {
                provider: "sofascore",
                providerPlayerId: searchResults[0].providerPlayerId,
                name: player.name,
                payload: searchResults,
                reason: "no_confident_match_in_search",
              }
            );
            result.addedToReviewQueue++;
            continue;
          }

          // Fetch full profile
          const { raw: rawProfile, normalized: normalizedProfile } = await SofaScore.getPlayer(
            bestMatch.providerPlayerId,
            budget
          );
          result.profilesFetched++;

          // Process the enrichment
          await ctx.runMutation(
            internal.enrichment.enrichActions.processPlayerEnrichment,
            {
              playerId: player._id,
              provider: "sofascore",
              providerPlayerId: bestMatch.providerPlayerId,
              confidence: 0.95,
              rawProfile,
              normalizedProfile,
            }
          );
          result.profilesMerged++;
          result.externalIdsMapped++;

          // Fetch stats if within budget
          if (budget.used < budget.maxRequests - 1) {
            try {
              const { careerStats } = await SofaScore.getPlayerStats(
                bestMatch.providerPlayerId,
                budget
              );

              if (careerStats) {
                await ctx.runMutation(
                  internal.enrichment.enrichActions.storePlayerAggregates,
                  {
                    playerId: player._id,
                    provider: "sofascore",
                    stats: careerStats,
                    window: "career",
                  }
                );
              }
            } catch (statsError) {
              console.warn(`[SofaScore] Failed to fetch stats for ${player.name}:`, statsError);
            }
          }

          console.log(`[SofaScore] Enriched player: ${player.name}`);
        } catch (playerError) {
          result.errors++;
          console.error(`[SofaScore] Error processing player ${player.name}:`, playerError);
        }
      }

      // Update enrichment state
      if (players.length > 0) {
        await ctx.runMutation(
          internal.enrichment.enrichActions.updateEnrichmentState,
          {
            provider: "sofascore",
            lastProcessedPlayerId: players[players.length - 1]._id,
            totalProcessed: result.playersProcessed,
          }
        );
      }
    } catch (error) {
      console.error("[SofaScore] Enrichment failed:", error);
      result.errors++;
    }

    result.requestsUsed = budget.used;
    console.log(`[SofaScore] Enrichment complete:`, result);
    return result;
  },
});

// ============================================================================
// Combined Enrichment Action
// ============================================================================

/**
 * Run enrichment from all providers sequentially
 */
export const enrichPlayersFromAllProviders = internalAction({
  args: {
    fotMobRequests: v.optional(v.number()),
    sofaScoreRequests: v.optional(v.number()),
    batchSize: v.optional(v.number()),
    competitionIds: v.optional(v.array(v.id("competitions"))),
  },
  handler: async (ctx, args): Promise<{
    fotmob: EnrichmentResult;
    sofascore: EnrichmentResult;
    totalPlayersEnriched: number;
  }> => {
    console.log("[Enrichment] Starting combined enrichment from all providers");

    // Run FotMob enrichment
    const fotmobResult = await ctx.runAction(
      internal.enrichment.enrichActions.enrichPlayersFromFotMob,
      {
        maxRequests: args.fotMobRequests ?? 20,
        batchSize: args.batchSize ?? 10,
        competitionIds: args.competitionIds,
      }
    );

    // Run SofaScore enrichment
    const sofascoreResult = await ctx.runAction(
      internal.enrichment.enrichActions.enrichPlayersFromSofaScore,
      {
        maxRequests: args.sofaScoreRequests ?? 15,
        batchSize: args.batchSize ?? 5,
        competitionIds: args.competitionIds,
      }
    );

    const totalPlayersEnriched = fotmobResult.profilesMerged + sofascoreResult.profilesMerged;

    console.log(`[Enrichment] Combined enrichment complete. Total players enriched: ${totalPlayersEnriched}`);

    return {
      fotmob: fotmobResult,
      sofascore: sofascoreResult,
      totalPlayersEnriched,
    };
  },
});

// ============================================================================
// Helper Functions
// ============================================================================

interface SearchResult {
  providerPlayerId: string;
  name: string;
  teamName?: string;
  position?: string;
}

/**
 * Find the best matching search result for a player
 */
function findBestSearchMatch(
  player: Doc<"players">,
  searchResults: SearchResult[]
): SearchResult | null {
  const playerNormalized = normalizeName(player.name);

  let bestMatch: SearchResult | null = null;
  let bestScore = 0;

  for (const result of searchResults) {
    const resultNormalized = normalizeName(result.name);
    let score = 0;

    // Exact name match
    if (playerNormalized === resultNormalized) {
      score = 1.0;
    } else {
      // Calculate similarity
      score = calculateSimpleSimilarity(playerNormalized, resultNormalized);
    }

    // Boost score if position matches
    if (result.position && player.position) {
      const positionMatch =
        result.position.toLowerCase().includes(player.position.toLowerCase()) ||
        player.position.toLowerCase().includes(result.position.toLowerCase());
      if (positionMatch) {
        score += 0.1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = result;
    }
  }

  // Only return if confidence is high enough
  return bestScore >= 0.8 ? bestMatch : null;
}

/**
 * Simple similarity calculation for quick matching
 */
function calculateSimpleSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1;
  if (!str1 || !str2) return 0;

  // Check if one contains the other
  if (str1.includes(str2) || str2.includes(str1)) {
    const shorter = str1.length < str2.length ? str1 : str2;
    const longer = str1.length >= str2.length ? str1 : str2;
    return shorter.length / longer.length;
  }

  // Simple Jaccard-like similarity on words
  const words1 = new Set(str1.split(" "));
  const words2 = new Set(str2.split(" "));
  const intersection = new Set([...words1].filter((x) => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}
```

#### `convex/enrichment/testProviders.ts`

```typescript
/**
 * Test file for enrichment providers
 * This allows us to verify FotMob and SofaScore APIs work
 */

import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import * as FotMob from "../providers/fotmob";
import * as SofaScore from "../providers/sofascore";
import { createBudget } from "../providers/fetchWrapper";

/**
 * Test FotMob provider by searching for a known player
 */
export const testFotMob = internalAction({
  args: {
    playerName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const playerName = args.playerName ?? "Memphis Depay";
    const budget = createBudget(5);

    console.log(`[Test] Testing FotMob provider with search: "${playerName}"`);

    try {
      // Test search
      const searchResults = await FotMob.searchPlayer(playerName, budget);
      console.log(`[Test] FotMob search results: ${searchResults.length} players found`);

      if (searchResults.length === 0) {
        return {
          success: false,
          error: "No search results",
          requestsUsed: budget.used,
        };
      }

      // Get first result details
      const firstResult = searchResults[0];
      console.log(`[Test] First result: ${firstResult.name} (ID: ${firstResult.providerPlayerId})`);

      // Test getPlayer
      const { raw, normalized } = await FotMob.getPlayer(firstResult.providerPlayerId, budget);
      console.log(`[Test] Player profile fetched:`, normalized);

      // Test getPlayerStats
      const { seasonStats, careerStats } = await FotMob.getPlayerStats(
        firstResult.providerPlayerId,
        budget
      );
      console.log(`[Test] Player stats: ${seasonStats.length} seasons`);

      return {
        success: true,
        provider: "fotmob",
        searchResults: searchResults.slice(0, 3),
        profile: normalized,
        careerStats,
        requestsUsed: budget.used,
      };
    } catch (error) {
      console.error("[Test] FotMob test failed:", error);
      return {
        success: false,
        provider: "fotmob",
        error: error instanceof Error ? error.message : String(error),
        requestsUsed: budget.used,
      };
    }
  },
});

/**
 * Test SofaScore provider by searching for a known player
 */
export const testSofaScore = internalAction({
  args: {
    playerName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const playerName = args.playerName ?? "Virgil van Dijk";
    const budget = createBudget(5);

    console.log(`[Test] Testing SofaScore provider with search: "${playerName}"`);

    try {
      // Test search
      const searchResults = await SofaScore.searchPlayer(playerName, budget);
      console.log(`[Test] SofaScore search results: ${searchResults.length} players found`);

      if (searchResults.length === 0) {
        return {
          success: false,
          error: "No search results",
          requestsUsed: budget.used,
        };
      }

      // Get first result details
      const firstResult = searchResults[0];
      console.log(`[Test] First result: ${firstResult.name} (ID: ${firstResult.providerPlayerId})`);

      // Test getPlayer
      const { raw, normalized } = await SofaScore.getPlayer(firstResult.providerPlayerId, budget);
      console.log(`[Test] Player profile fetched:`, normalized);

      // Test getPlayerStats
      const { seasonStats, careerStats } = await SofaScore.getPlayerStats(
        firstResult.providerPlayerId,
        budget
      );
      console.log(`[Test] Player stats: ${seasonStats.length} seasons`);

      return {
        success: true,
        provider: "sofascore",
        searchResults: searchResults.slice(0, 3),
        profile: normalized,
        careerStats,
        requestsUsed: budget.used,
      };
    } catch (error) {
      console.error("[Test] SofaScore test failed:", error);
      return {
        success: false,
        provider: "sofascore",
        error: error instanceof Error ? error.message : String(error),
        requestsUsed: budget.used,
      };
    }
  },
});

/**
 * Debug FotMob player profile API response
 */
export const debugFotMobPlayerApi = internalAction({
  args: {
    playerId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = `https://www.fotmob.com/api/playerData?id=${args.playerId}`;

    console.log(`[Debug] Fetching FotMob player: ${url}`);

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
          "Origin": "https://www.fotmob.com",
          "Referer": "https://www.fotmob.com/",
        },
      });

      console.log(`[Debug] Response status: ${response.status}`);

      const text = await response.text();
      console.log(`[Debug] Response body (first 3000 chars): ${text.substring(0, 3000)}`);

      try {
        const data = JSON.parse(text);
        return {
          success: true,
          status: response.status,
          dataKeys: Object.keys(data),
          data,
        };
      } catch {
        return {
          success: false,
          status: response.status,
          error: "Failed to parse JSON",
          body: text.substring(0, 500),
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Debug API-Football status
 */
export const debugApiFootball = internalAction({
  args: {},
  handler: async (ctx) => {
    const apiKey = process.env.API_FOOTBALL_KEY;
    const mode = process.env.API_FOOTBALL_MODE;
    const host = process.env.API_FOOTBALL_HOST;

    console.log(`[Debug] API_FOOTBALL_KEY: ${apiKey ? apiKey.slice(0, 5) + "..." : "NOT SET"}`);
    console.log(`[Debug] API_FOOTBALL_MODE: ${mode || "NOT SET"}`);
    console.log(`[Debug] API_FOOTBALL_HOST: ${host || "NOT SET"}`);

    if (!apiKey) {
      return { success: false, error: "API_FOOTBALL_KEY not set" };
    }

    // Try a simple status request
    const baseUrl = host?.startsWith("http") ? host : `https://${host || "v3.football.api-sports.io"}`;
    const url = `${baseUrl}/status`;

    console.log(`[Debug] Testing URL: ${url}`);

    try {
      const response = await fetch(url, {
        headers: {
          "x-apisports-key": apiKey,
          "Accept": "application/json",
        },
      });

      console.log(`[Debug] Response status: ${response.status}`);

      const text = await response.text();
      console.log(`[Debug] Response body: ${text.substring(0, 500)}`);

      try {
        const data = JSON.parse(text);
        return {
          success: true,
          status: response.status,
          data,
        };
      } catch {
        return {
          success: false,
          status: response.status,
          error: "Failed to parse JSON",
          body: text.substring(0, 500),
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Debug SofaScore API response
 */
export const debugSofaScoreApi = internalAction({
  args: {
    playerName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const playerName = args.playerName ?? "Virgil van Dijk";
    const url = `https://api.sofascore.com/api/v1/search/players?q=${encodeURIComponent(playerName)}`;

    console.log(`[Debug] Fetching SofaScore search: ${url}`);

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
          "Origin": "https://www.sofascore.com",
          "Referer": "https://www.sofascore.com/",
        },
      });

      console.log(`[Debug] Response status: ${response.status}`);

      const text = await response.text();
      console.log(`[Debug] Response body (first 2000 chars): ${text.substring(0, 2000)}`);

      try {
        const data = JSON.parse(text);
        return {
          success: true,
          status: response.status,
          data,
        };
      } catch {
        return {
          success: false,
          status: response.status,
          error: "Failed to parse JSON",
          body: text.substring(0, 500),
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Test both providers
 */
export const testAllProviders = internalAction({
  args: {},
  handler: async (ctx) => {
    console.log("[Test] Testing all enrichment providers...");

    const fotmobResult = await ctx.runAction(
      // @ts-ignore - will work at runtime
      { name: "enrichment/testProviders:testFotMob" },
      { playerName: "Memphis Depay" }
    );

    const sofascoreResult = await ctx.runAction(
      // @ts-ignore - will work at runtime
      { name: "enrichment/testProviders:testSofaScore" },
      { playerName: "Virgil van Dijk" }
    );

    return {
      fotmob: fotmobResult,
      sofascore: sofascoreResult,
    };
  },
});
```

### 🔀 Player Merging

#### `convex/merge/mergePlayer.ts`

```typescript
/**
 * Canonical Merge Utilities
 *
 * Merges data from multiple providers into canonical player records.
 * Implements field precedence rules and conflict detection.
 */

import { Doc, Id } from "../_generated/dataModel";
import { DatabaseWriter } from "../_generated/server";
import type { Provider } from "../resolve/resolvePlayer";

// ============================================================================
// Types
// ============================================================================

export type PreferredFoot = "left" | "right" | "both";
export type PositionGroup = "GK" | "DEF" | "MID" | "ATT";

export interface NormalizedProfile {
  name?: string;
  birthDate?: string;
  nationality?: string;
  heightCm?: number;
  weightKg?: number;
  preferredFoot?: PreferredFoot;
  photoUrl?: string;
  position?: string;
  positionGroup?: PositionGroup;
}

export interface MergeConflict {
  field: string;
  canonicalValue: unknown;
  providerValue: unknown;
  provider: Provider;
}

export interface MergeResult {
  updatedFields: string[];
  conflicts: MergeConflict[];
  profileStored: boolean;
}

// ============================================================================
// Field Precedence Configuration
// ============================================================================

/**
 * Provider precedence for each field.
 * Higher number = higher priority.
 * API-Football is our primary source, enrichment providers fill gaps.
 */
export const FIELD_PRECEDENCE: Record<string, Record<Provider, number>> = {
  // Basic info - primary source is most trusted
  name: {
    apiFootball: 100,
    fotmob: 50,
    sofascore: 50,
    thesportsdb: 40,
    wikidata: 30,
    footballdata: 20,
  },
  birthDate: {
    apiFootball: 100,
    wikidata: 90, // Wikipedia is reliable for birth dates
    sofascore: 80,
    fotmob: 80,
    thesportsdb: 70,
    footballdata: 60,
  },
  nationality: {
    apiFootball: 100,
    wikidata: 90,
    sofascore: 80,
    fotmob: 80,
    thesportsdb: 70,
    footballdata: 60,
  },
  // Physical attributes - sports sites are better
  heightCm: {
    sofascore: 100,
    fotmob: 90,
    apiFootball: 80,
    thesportsdb: 70,
    wikidata: 60,
    footballdata: 50,
  },
  weightKg: {
    sofascore: 100,
    fotmob: 90,
    apiFootball: 80,
    thesportsdb: 70,
    wikidata: 60,
    footballdata: 50,
  },
  preferredFoot: {
    sofascore: 100,
    fotmob: 90,
    apiFootball: 80,
    thesportsdb: 70,
    wikidata: 60,
    footballdata: 50,
  },
  // Photos - prefer higher quality sources
  photoUrl: {
    apiFootball: 100,
    sofascore: 90,
    fotmob: 80,
    thesportsdb: 70,
    wikidata: 60,
    footballdata: 50,
  },
  // Position - primary source is most accurate for current position
  position: {
    apiFootball: 100,
    fotmob: 80,
    sofascore: 80,
    thesportsdb: 60,
    wikidata: 40,
    footballdata: 50,
  },
  positionGroup: {
    apiFootball: 100,
    fotmob: 80,
    sofascore: 80,
    thesportsdb: 60,
    wikidata: 40,
    footballdata: 50,
  },
};

/**
 * Get precedence score for a field and provider
 */
function getPrecedence(field: string, provider: Provider): number {
  const fieldPrec = FIELD_PRECEDENCE[field];
  if (!fieldPrec) return 50; // Default precedence
  return fieldPrec[provider] ?? 50;
}

// ============================================================================
// Value Comparison Utilities
// ============================================================================

/**
 * Check if two values are effectively equal
 */
function valuesEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null && b == null) return true;
  if (a == null || b == null) return false;

  // String comparison (case insensitive)
  if (typeof a === "string" && typeof b === "string") {
    return a.toLowerCase().trim() === b.toLowerCase().trim();
  }

  // Number comparison (allow small floating point differences)
  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) < 0.001;
  }

  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Check if a value is empty/null/undefined
 */
function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  return false;
}

// ============================================================================
// Merge Functions
// ============================================================================

/**
 * Determine if a new value should override the current canonical value
 */
function shouldOverride(
  field: string,
  canonicalValue: unknown,
  newValue: unknown,
  newProvider: Provider,
  currentProvider?: Provider
): boolean {
  // If canonical is empty, always use new value
  if (isEmpty(canonicalValue)) return true;

  // If new value is empty, don't override
  if (isEmpty(newValue)) return false;

  // If values are equal, no need to override
  if (valuesEqual(canonicalValue, newValue)) return false;

  // Compare precedence
  const currentPrecedence = currentProvider ? getPrecedence(field, currentProvider) : 0;
  const newPrecedence = getPrecedence(field, newProvider);

  return newPrecedence > currentPrecedence;
}

/**
 * Merge a provider profile into canonical player data
 */
export async function mergeProviderProfile(
  db: DatabaseWriter,
  playerId: Id<"players">,
  provider: Provider,
  profile: NormalizedProfile,
  rawProfile: unknown
): Promise<MergeResult> {
  const player = await db.get(playerId);
  if (!player) {
    throw new Error(`Player not found: ${playerId}`);
  }

  const now = Date.now();
  const updatedFields: string[] = [];
  const conflicts: MergeConflict[] = [];
  const updates: Partial<Doc<"players">> = {};

  // Get existing provider profiles to determine current source of truth
  const existingProfile = await db
    .query("providerPlayerProfiles")
    .withIndex("by_player_provider", (q) =>
      q.eq("playerId", playerId).eq("provider", provider)
    )
    .first();

  // Fields to potentially merge
  const mergeableFields: (keyof NormalizedProfile)[] = [
    "birthDate",
    "nationality",
    "heightCm",
    "weightKg",
    "preferredFoot",
    "photoUrl",
    "position",
    "positionGroup",
  ];

  for (const field of mergeableFields) {
    const newValue = profile[field];
    if (isEmpty(newValue)) continue;

    const canonicalValue = player[field as keyof Doc<"players">];
    const shouldUpdate = shouldOverride(field, canonicalValue, newValue, provider);

    if (shouldUpdate) {
      // Check for conflict (non-empty canonical value being overridden)
      if (!isEmpty(canonicalValue) && !valuesEqual(canonicalValue, newValue)) {
        conflicts.push({
          field,
          canonicalValue,
          providerValue: newValue,
          provider,
        });
      }

      (updates as Record<string, unknown>)[field] = newValue;
      updatedFields.push(field);
    } else if (!isEmpty(canonicalValue) && !valuesEqual(canonicalValue, newValue)) {
      // Log conflict even when not updating
      conflicts.push({
        field,
        canonicalValue,
        providerValue: newValue,
        provider,
      });
    }
  }

  // Apply updates to player
  if (Object.keys(updates).length > 0) {
    updates.updatedAt = now;
    await db.patch(playerId, updates);
  }

  // Sanitize normalized profile to only include schema-valid fields
  const sanitizedProfile: NormalizedProfile = {
    name: profile.name,
    birthDate: profile.birthDate,
    nationality: profile.nationality,
    heightCm: profile.heightCm,
    weightKg: profile.weightKg,
    preferredFoot: profile.preferredFoot,
    photoUrl: profile.photoUrl,
    position: profile.position,
    positionGroup: profile.positionGroup,
  };

  // Store/update provider profile
  if (existingProfile) {
    await db.patch(existingProfile._id, {
      profile: rawProfile,
      normalized: sanitizedProfile,
      fetchedAt: now,
    });
  } else {
    await db.insert("providerPlayerProfiles", {
      playerId,
      provider,
      profile: rawProfile,
      normalized: sanitizedProfile,
      fetchedAt: now,
    });
  }

  // Log conflicts to playerFieldConflicts table
  for (const conflict of conflicts) {
    await logConflict(db, playerId, conflict, now);
  }

  return {
    updatedFields,
    conflicts,
    profileStored: true,
  };
}

/**
 * Log a field conflict for later resolution
 */
async function logConflict(
  db: DatabaseWriter,
  playerId: Id<"players">,
  conflict: MergeConflict,
  timestamp: number
): Promise<void> {
  // Check if conflict already exists
  const existing = await db
    .query("playerFieldConflicts")
    .withIndex("by_player_field", (q) =>
      q.eq("playerId", playerId).eq("field", conflict.field)
    )
    .filter((q) => q.eq(q.field("provider"), conflict.provider))
    .first();

  if (existing) {
    // Update existing conflict
    await db.patch(existing._id, {
      canonicalValue: conflict.canonicalValue,
      providerValue: conflict.providerValue,
      resolved: false,
      fetchedAt: timestamp,
    });
  } else {
    // Create new conflict record
    await db.insert("playerFieldConflicts", {
      playerId,
      field: conflict.field,
      canonicalValue: conflict.canonicalValue,
      provider: conflict.provider,
      providerValue: conflict.providerValue,
      resolved: false,
      fetchedAt: timestamp,
    });
  }
}

// ============================================================================
// Stats Merge Utilities
// ============================================================================

export interface ProviderStats {
  appearances?: number;
  minutes?: number;
  goals?: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
  xG?: number;
  xA?: number;
  npxG?: number;
  xGPer90?: number;
  xAPer90?: number;
  goalsPer90?: number;
  assistsPer90?: number;
  rating?: number;
}

/**
 * Store provider-specific aggregated stats
 */
export async function storeProviderAggregates(
  db: DatabaseWriter,
  playerId: Id<"players">,
  provider: Provider,
  stats: ProviderStats,
  options: {
    window: "365" | "season" | "career";
    competitionId?: Id<"competitions">;
    season?: string;
    fromDate?: string;
    toDate?: string;
  }
): Promise<Id<"providerPlayerAggregates">> {
  const now = Date.now();

  // Check if aggregate already exists
  const existing = await db
    .query("providerPlayerAggregates")
    .withIndex("by_player_provider_window", (q) =>
      q.eq("playerId", playerId).eq("provider", provider).eq("window", options.window)
    )
    .first();

  // Build totals object
  const totals: Record<string, number> = {};
  if (stats.appearances !== undefined) totals.appearances = stats.appearances;
  if (stats.goals !== undefined) totals.goals = stats.goals;
  if (stats.assists !== undefined) totals.assists = stats.assists;
  if (stats.yellowCards !== undefined) totals.yellowCards = stats.yellowCards;
  if (stats.redCards !== undefined) totals.redCards = stats.redCards;
  if (stats.xG !== undefined) totals.xG = stats.xG;
  if (stats.xA !== undefined) totals.xA = stats.xA;

  // Build per90 object
  const per90: Record<string, number> = {};
  if (stats.goalsPer90 !== undefined) per90.goals = stats.goalsPer90;
  if (stats.assistsPer90 !== undefined) per90.assists = stats.assistsPer90;
  if (stats.xGPer90 !== undefined) per90.xG = stats.xGPer90;
  if (stats.xAPer90 !== undefined) per90.xA = stats.xAPer90;

  // Build additional stats
  const additionalStats: Record<string, number> = {};
  if (stats.xG !== undefined) additionalStats.xG = stats.xG;
  if (stats.xA !== undefined) additionalStats.xA = stats.xA;
  if (stats.xGPer90 !== undefined) additionalStats.xGPer90 = stats.xGPer90;
  if (stats.xAPer90 !== undefined) additionalStats.xAPer90 = stats.xAPer90;
  if (stats.npxG !== undefined) additionalStats.npxG = stats.npxG;

  const data = {
    playerId,
    provider,
    competitionId: options.competitionId,
    window: options.window,
    fromDate: options.fromDate,
    toDate: options.toDate,
    season: options.season,
    minutes: stats.minutes,
    appearances: stats.appearances,
    totals: Object.keys(totals).length > 0 ? { appearances: stats.appearances ?? 0, ...totals } : undefined,
    per90: Object.keys(per90).length > 0 ? per90 : undefined,
    additionalStats: Object.keys(additionalStats).length > 0 ? additionalStats : undefined,
    fetchedAt: now,
  };

  if (existing) {
    await db.patch(existing._id, data);
    return existing._id;
  }

  return await db.insert("providerPlayerAggregates", data);
}

// ============================================================================
// Conflict Resolution
// ============================================================================

/**
 * Resolve a conflict by accepting a specific value
 */
export async function resolveConflict(
  db: DatabaseWriter,
  conflictId: Id<"playerFieldConflicts">,
  acceptedValue: unknown
): Promise<void> {
  const conflict = await db.get(conflictId);
  if (!conflict) {
    throw new Error(`Conflict not found: ${conflictId}`);
  }

  const now = Date.now();

  // Update the player with the accepted value
  const player = await db.get(conflict.playerId);
  if (player) {
    await db.patch(conflict.playerId, {
      [conflict.field]: acceptedValue,
      updatedAt: now,
    });
  }

  // Mark conflict as resolved
  await db.patch(conflictId, {
    resolved: true,
    resolvedValue: acceptedValue,
    resolvedAt: now,
  });
}

/**
 * Get all unresolved conflicts for a player
 */
export async function getUnresolvedConflicts(
  db: DatabaseWriter,
  playerId: Id<"players">
): Promise<Doc<"playerFieldConflicts">[]> {
  return await db
    .query("playerFieldConflicts")
    .withIndex("by_player_field", (q) => q.eq("playerId", playerId))
    .filter((q) => q.eq(q.field("resolved"), false))
    .collect();
}
```

### 🔍 Player Resolution

#### `convex/resolve/resolvePlayer.ts`

```typescript
/**
 * Identity Resolution System
 *
 * Resolves external provider players to canonical players in our database.
 * Prevents duplicate players by matching on normalized names and other criteria.
 */

import { v } from "convex/values";
import { Doc, Id } from "../_generated/dataModel";
import { DatabaseReader, DatabaseWriter, MutationCtx, QueryCtx } from "../_generated/server";

// ============================================================================
// Types
// ============================================================================

export type Provider = "apiFootball" | "fotmob" | "sofascore" | "thesportsdb" | "wikidata" | "footballdata";

export interface ExternalPlayerData {
  provider: Provider;
  providerPlayerId: string;
  name: string;
  teamName?: string;
  teamId?: string;
  birthDate?: string;
  nationality?: string;
  position?: string;
}

export interface ResolveResult {
  playerId: Id<"players"> | null;
  confidence: number;
  isNew: boolean;
  reason: string;
  candidatePlayerIds?: Id<"players">[];
}

export interface MatchCandidate {
  playerId: Id<"players">;
  player: Doc<"players">;
  score: number;
  matchReasons: string[];
}

// ============================================================================
// Configuration
// ============================================================================

const CONFIDENCE_THRESHOLD = 0.92;
const EXACT_MATCH_SCORE = 1.0;
const NAME_TEAM_MATCH_SCORE = 0.85;
const NAME_ONLY_MATCH_SCORE = 0.6;
const BIRTHDATE_BONUS = 0.15;
const NATIONALITY_BONUS = 0.05;

// ============================================================================
// Name Normalization
// ============================================================================

/**
 * Normalize a name for matching:
 * - Convert to lowercase
 * - Remove accents/diacritics
 * - Remove punctuation
 * - Collapse whitespace
 */
export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    // Remove accents/diacritics
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Remove punctuation except spaces
    .replace(/[^\w\s]/g, "")
    // Collapse whitespace
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalize a team name for matching
 */
export function normalizeTeamName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Remove common suffixes
    .replace(/\b(fc|cf|sc|ac|afc|ssc|bv|sv|vfb|vfl|fsv|tsv|1\.|fk|sk|rcd|cd|ud|rc|as|ss|us)\b/gi, "")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Calculate string similarity using Levenshtein distance
 */
export function calculateSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1;
  if (!str1 || !str2) return 0;

  const len1 = str1.length;
  const len2 = str2.length;

  // Quick exit for very different lengths
  if (Math.abs(len1 - len2) > Math.max(len1, len2) * 0.5) return 0;

  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  const maxLen = Math.max(len1, len2);
  return 1 - matrix[len1][len2] / maxLen;
}

// ============================================================================
// Resolution Functions
// ============================================================================

/**
 * Check if external ID already exists in our system
 */
export async function findExistingExternalId(
  db: DatabaseReader,
  provider: Provider,
  providerPlayerId: string
): Promise<Id<"players"> | null> {
  const existing = await db
    .query("playerExternalIds")
    .withIndex("by_provider_playerId", (q) =>
      q.eq("provider", provider).eq("providerPlayerId", providerPlayerId)
    )
    .first();

  return existing?.playerId ?? null;
}

/**
 * Find candidate matches for a player in the database
 */
export async function findCandidateMatches(
  db: DatabaseReader,
  data: ExternalPlayerData,
  competitionId?: Id<"competitions">,
  teamId?: Id<"teams">
): Promise<MatchCandidate[]> {
  const normalizedName = normalizeName(data.name);
  const candidates: MatchCandidate[] = [];

  // Strategy 1: Look up by normalized name
  const byNameNormalized = await db
    .query("players")
    .withIndex("by_nameNormalized", (q) => q.eq("nameNormalized", normalizedName))
    .collect();

  for (const player of byNameNormalized) {
    const { score, matchReasons } = calculateMatchScore(player, data);
    if (score > 0.5) {
      candidates.push({ playerId: player._id, player, score, matchReasons });
    }
  }

  // Strategy 2: If we have a team, look up players in that team
  if (teamId && candidates.length === 0) {
    const teamPlayers = await db
      .query("players")
      .withIndex("by_team", (q) => q.eq("teamId", teamId))
      .collect();

    for (const player of teamPlayers) {
      // Check if already in candidates
      if (candidates.some((c) => c.playerId === player._id)) continue;

      const playerNormalized = normalizeName(player.name);
      const nameSimilarity = calculateSimilarity(normalizedName, playerNormalized);

      if (nameSimilarity > 0.8) {
        const { score, matchReasons } = calculateMatchScore(player, data);
        candidates.push({ playerId: player._id, player, score, matchReasons });
      }
    }
  }

  // Strategy 3: If we have a competition, do a broader search
  if (competitionId && candidates.length === 0) {
    const competitionPlayers = await db
      .query("players")
      .withIndex("by_competition", (q) => q.eq("competitionId", competitionId))
      .collect();

    for (const player of competitionPlayers) {
      // Check if already in candidates
      if (candidates.some((c) => c.playerId === player._id)) continue;

      const playerNormalized = normalizeName(player.name);
      const nameSimilarity = calculateSimilarity(normalizedName, playerNormalized);

      if (nameSimilarity > 0.85) {
        const { score, matchReasons } = calculateMatchScore(player, data);
        candidates.push({ playerId: player._id, player, score, matchReasons });
      }
    }
  }

  // Sort by score descending
  return candidates.sort((a, b) => b.score - a.score);
}

/**
 * Calculate match score between a database player and external data
 */
function calculateMatchScore(
  player: Doc<"players">,
  data: ExternalPlayerData
): { score: number; matchReasons: string[] } {
  const matchReasons: string[] = [];
  let score = 0;

  const playerNormalized = normalizeName(player.name);
  const dataNormalized = normalizeName(data.name);

  // Name matching
  if (playerNormalized === dataNormalized) {
    score = NAME_ONLY_MATCH_SCORE;
    matchReasons.push("exact_name_match");
  } else {
    const similarity = calculateSimilarity(playerNormalized, dataNormalized);
    if (similarity > 0.85) {
      score = similarity * NAME_ONLY_MATCH_SCORE;
      matchReasons.push(`name_similarity_${Math.round(similarity * 100)}%`);
    }
  }

  if (score === 0) return { score: 0, matchReasons: [] };

  // Birth date matching (strong signal)
  if (player.birthDate && data.birthDate) {
    if (player.birthDate === data.birthDate) {
      score += BIRTHDATE_BONUS;
      matchReasons.push("birthdate_match");
    } else {
      // Birthdate mismatch is a strong negative signal
      score = Math.max(0, score - 0.3);
      matchReasons.push("birthdate_mismatch");
    }
  }

  // Nationality matching
  if (player.nationality && data.nationality) {
    const playerNat = player.nationality.toLowerCase();
    const dataNat = data.nationality.toLowerCase();
    if (playerNat === dataNat || playerNat.includes(dataNat) || dataNat.includes(playerNat)) {
      score += NATIONALITY_BONUS;
      matchReasons.push("nationality_match");
    }
  }

  // Team name matching
  if (data.teamName) {
    // We'd need to look up the team to compare - for now skip
    // This is handled by the team-scoped search above
  }

  return { score: Math.min(score, 1), matchReasons };
}

/**
 * Main resolution function - attempts to resolve an external player to a canonical player
 */
export async function resolvePlayer(
  db: DatabaseReader,
  data: ExternalPlayerData,
  competitionId?: Id<"competitions">,
  teamId?: Id<"teams">
): Promise<ResolveResult> {
  // Step 1: Check if we already have this exact external ID
  const existingPlayerId = await findExistingExternalId(db, data.provider, data.providerPlayerId);
  if (existingPlayerId) {
    return {
      playerId: existingPlayerId,
      confidence: EXACT_MATCH_SCORE,
      isNew: false,
      reason: "existing_external_id",
    };
  }

  // Step 2: Find candidate matches
  const candidates = await findCandidateMatches(db, data, competitionId, teamId);

  // No candidates found
  if (candidates.length === 0) {
    return {
      playerId: null,
      confidence: 0,
      isNew: true,
      reason: "no_candidates_found",
    };
  }

  // Single high-confidence match
  if (candidates.length === 1 && candidates[0].score >= CONFIDENCE_THRESHOLD) {
    return {
      playerId: candidates[0].playerId,
      confidence: candidates[0].score,
      isNew: false,
      reason: `single_match: ${candidates[0].matchReasons.join(", ")}`,
    };
  }

  // Multiple candidates - check if top match is clearly better
  if (candidates.length > 1) {
    const [best, second] = candidates;
    const scoreDiff = best.score - second.score;

    // Clear winner with high confidence
    if (best.score >= CONFIDENCE_THRESHOLD && scoreDiff > 0.1) {
      return {
        playerId: best.playerId,
        confidence: best.score,
        isNew: false,
        reason: `best_match_clear_winner: ${best.matchReasons.join(", ")}`,
      };
    }
  }

  // Ambiguous - return for review
  const topCandidate = candidates[0];
  return {
    playerId: topCandidate.score >= CONFIDENCE_THRESHOLD ? topCandidate.playerId : null,
    confidence: topCandidate.score,
    isNew: topCandidate.score < CONFIDENCE_THRESHOLD,
    reason:
      candidates.length > 1
        ? `ambiguous_multiple_candidates_${candidates.length}`
        : `low_confidence_${Math.round(topCandidate.score * 100)}%`,
    candidatePlayerIds: candidates.map((c) => c.playerId),
  };
}

// ============================================================================
// Database Operations
// ============================================================================

/**
 * Create or update external ID mapping
 */
export async function upsertExternalId(
  db: DatabaseWriter,
  playerId: Id<"players">,
  provider: Provider,
  providerPlayerId: string,
  confidence: number,
  providerTeamId?: string,
  providerCompetitionId?: string
): Promise<Id<"playerExternalIds">> {
  const now = Date.now();

  // Check if mapping already exists
  const existing = await db
    .query("playerExternalIds")
    .withIndex("by_player_provider", (q) =>
      q.eq("playerId", playerId).eq("provider", provider)
    )
    .first();

  if (existing) {
    await db.patch(existing._id, {
      providerPlayerId,
      providerTeamId,
      providerCompetitionId,
      confidence,
      updatedAt: now,
    });
    return existing._id;
  }

  return await db.insert("playerExternalIds", {
    playerId,
    provider,
    providerPlayerId,
    providerTeamId,
    providerCompetitionId,
    confidence,
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Add to unresolved queue for manual review
 */
export async function addToReviewQueue(
  db: DatabaseWriter,
  data: ExternalPlayerData,
  payload: unknown,
  reason: string,
  candidatePlayerIds?: Id<"players">[]
): Promise<Id<"unresolvedExternalPlayers">> {
  const now = Date.now();

  // Check if already in queue
  const existing = await db
    .query("unresolvedExternalPlayers")
    .withIndex("by_provider_playerId", (q) =>
      q.eq("provider", data.provider).eq("providerPlayerId", data.providerPlayerId)
    )
    .first();

  if (existing) {
    // Update existing entry
    await db.patch(existing._id, {
      payload,
      candidatePlayerIds,
      reason,
      status: "pending",
      updatedAt: now,
    });
    return existing._id;
  }

  return await db.insert("unresolvedExternalPlayers", {
    provider: data.provider,
    providerPlayerId: data.providerPlayerId,
    payload,
    candidatePlayerIds,
    reason,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  });
}

/**
 * Resolve and link a player, handling all edge cases
 */
export async function resolveAndLinkPlayer(
  db: DatabaseWriter,
  data: ExternalPlayerData,
  payload: unknown,
  competitionId?: Id<"competitions">,
  teamId?: Id<"teams">
): Promise<{
  playerId: Id<"players"> | null;
  externalIdCreated: boolean;
  addedToReviewQueue: boolean;
  resolution: ResolveResult;
}> {
  // Resolve the player
  const resolution = await resolvePlayer(db, data, competitionId, teamId);

  // Case 1: High confidence match
  if (resolution.playerId && resolution.confidence >= CONFIDENCE_THRESHOLD) {
    await upsertExternalId(
      db,
      resolution.playerId,
      data.provider,
      data.providerPlayerId,
      resolution.confidence,
      data.teamId,
      competitionId ? competitionId.toString() : undefined
    );
    return {
      playerId: resolution.playerId,
      externalIdCreated: true,
      addedToReviewQueue: false,
      resolution,
    };
  }

  // Case 2: Low confidence or ambiguous - add to review queue
  await addToReviewQueue(db, data, payload, resolution.reason, resolution.candidatePlayerIds);
  return {
    playerId: null,
    externalIdCreated: false,
    addedToReviewQueue: true,
    resolution,
  };
}

// ============================================================================
// Helper for updating normalized names on existing players
// ============================================================================

/**
 * Update all players to have normalized names
 */
export async function ensureNormalizedNames(
  db: DatabaseWriter,
  limit: number = 100
): Promise<number> {
  const players = await db
    .query("players")
    .filter((q) => q.eq(q.field("nameNormalized"), undefined))
    .take(limit);

  let updated = 0;
  for (const player of players) {
    const normalized = normalizeName(player.name);
    await db.patch(player._id, { nameNormalized: normalized });
    updated++;
  }

  return updated;
}
```

### 🔧 Admin Utilities

#### `convex/admin/seedTestData.ts`

```typescript
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
```

### 📚 Backend Utilities

#### `convex/lib/metrics.ts`

```typescript
/**
 * Canonical Metric Schema
 *
 * Shared type definitions for stats, aggregation, and ratings.
 * These types are used by both client and server code.
 */

// ============================================================================
// Position Groups
// ============================================================================

export type PositionGroup = "GK" | "DEF" | "MID" | "ATT";

export const POSITION_GROUPS: readonly PositionGroup[] = [
  "GK",
  "DEF",
  "MID",
  "ATT",
] as const;

// ============================================================================
// Competition Tiers
// ============================================================================

export type Tier =
  | "Platinum"
  | "Diamond"
  | "Elite"
  | "Gold"
  | "Silver"
  | "Bronze";

export const TIERS: readonly Tier[] = [
  "Platinum",
  "Diamond",
  "Elite",
  "Gold",
  "Silver",
  "Bronze",
] as const;

// Tier factors for level score calculation
export const TIER_FACTORS: Record<Tier, number> = {
  Platinum: 1.0,
  Diamond: 0.92,
  Elite: 0.88,
  Gold: 0.85,
  Silver: 0.78,
  Bronze: 0.7,
};

// ============================================================================
// Canonical Stats (per-match)
// ============================================================================

export interface CanonicalStats {
  // Common attacking
  goals?: number;
  assists?: number;
  shots?: number;
  shotsOnTarget?: number;

  // Passing
  passes?: number;
  passAccuracy?: number; // percentage 0-100
  keyPasses?: number;

  // Dribbling
  dribbles?: number;
  dribblesSuccessful?: number;

  // Defensive
  tackles?: number;
  interceptions?: number;
  clearances?: number;
  blocks?: number;

  // Duels
  duelsWon?: number;
  duelsTotal?: number;
  aerialDuelsWon?: number;
  aerialDuelsTotal?: number;

  // Discipline
  foulsCommitted?: number;
  foulsDrawn?: number;
  yellowCards?: number;
  redCards?: number;

  // Goalkeeper specific
  saves?: number;
  goalsConceded?: number;
  cleanSheet?: boolean;
  penaltiesSaved?: number;
  penaltiesMissed?: number;

  // Advanced (when available)
  xG?: number;
  xA?: number;
}

// ============================================================================
// Aggregated Totals
// ============================================================================

export interface AggregatedTotals {
  appearances: number;
  goals?: number;
  assists?: number;
  shots?: number;
  shotsOnTarget?: number;
  passes?: number;
  keyPasses?: number;
  tackles?: number;
  interceptions?: number;
  clearances?: number;
  blocks?: number;
  duelsWon?: number;
  duelsTotal?: number;
  aerialDuelsWon?: number;
  aerialDuelsTotal?: number;
  dribbles?: number;
  dribblesSuccessful?: number;
  foulsCommitted?: number;
  foulsDrawn?: number;
  yellowCards?: number;
  redCards?: number;
  saves?: number;
  goalsConceded?: number;
  cleanSheets?: number;
  xG?: number;
  xA?: number;
}

// ============================================================================
// Per-90 Stats
// ============================================================================

export interface Per90Stats {
  goals?: number;
  assists?: number;
  shots?: number;
  shotsOnTarget?: number;
  passes?: number;
  keyPasses?: number;
  tackles?: number;
  interceptions?: number;
  clearances?: number;
  blocks?: number;
  duelsWon?: number;
  aerialDuelsWon?: number;
  dribbles?: number;
  dribblesSuccessful?: number;
  foulsCommitted?: number;
  foulsDrawn?: number;
  saves?: number;
  goalsConceded?: number;
  xG?: number;
  xA?: number;
}

// ============================================================================
// Rate Stats (derived percentages)
// ============================================================================

export interface RateStats {
  passCompletionRate?: number; // 0-1
  duelWinRate?: number; // 0-1
  aerialWinRate?: number; // 0-1
  dribbleSuccessRate?: number; // 0-1
  shotAccuracy?: number; // 0-1 (shotsOnTarget / shots)
  cleanSheetRate?: number; // 0-1 (cleanSheets / appearances)
  saveRate?: number; // 0-1 (saves / (saves + goalsConceded))
}

// ============================================================================
// Feature Vector for Rating Calculation
// ============================================================================

export interface RatingFeatures {
  // Per90 stats (raw)
  goalsPer90: number;
  assistsPer90: number;
  shotsPer90: number;
  shotsOnTargetPer90: number;
  passesPer90: number;
  keyPassesPer90: number;
  tacklesPer90: number;
  interceptionsPer90: number;
  tacklesInterceptionsPer90: number; // combined defensive
  clearancesPer90: number;
  blocksPer90: number;
  duelsWonPer90: number;
  aerialDuelsWonPer90: number;
  dribblesPer90: number;
  dribblesSuccessfulPer90: number;
  foulsCommittedPer90: number;
  yellowCardsPer90: number;
  redCardsPer90: number;
  cardsPenaltyPer90: number; // yellow + 3*red
  savesPer90: number;
  goalsConcededPer90: number;
  xGPer90: number;
  xAPer90: number;

  // Rate stats
  passCompletionRate: number;
  duelWinRate: number;
  aerialWinRate: number;
  dribbleSuccessRate: number;
  shotAccuracy: number;
  cleanSheetRate: number;
  saveRate: number;

  // Goal contributions
  goalContributionsPer90: number; // goals + assists

  // Sample size
  minutes: number;
  appearances: number;
}

// ============================================================================
// Rating Profile (weights per position group)
// ============================================================================

export interface RatingWeights {
  [metricKey: string]: number;
}

export interface RatingProfile {
  positionGroup: PositionGroup;
  weights: RatingWeights;
  invertMetrics: string[]; // metrics where lower is better
}

// Default rating profiles
export const DEFAULT_RATING_PROFILES: Record<PositionGroup, RatingProfile> = {
  GK: {
    positionGroup: "GK",
    weights: {
      savesPer90: 0.25,
      goalsConcededPer90: 0.25, // inverted
      cleanSheetRate: 0.2,
      saveRate: 0.15,
      passCompletionRate: 0.1,
      clearancesPer90: 0.05,
    },
    invertMetrics: ["goalsConcededPer90"],
  },
  DEF: {
    positionGroup: "DEF",
    weights: {
      tacklesInterceptionsPer90: 0.2,
      aerialWinRate: 0.15,
      duelWinRate: 0.15,
      clearancesPer90: 0.1,
      blocksPer90: 0.08,
      keyPassesPer90: 0.08,
      dribblesSuccessfulPer90: 0.07,
      goalContributionsPer90: 0.07,
      cardsPenaltyPer90: 0.1, // inverted
    },
    invertMetrics: ["cardsPenaltyPer90"],
  },
  MID: {
    positionGroup: "MID",
    weights: {
      keyPassesPer90: 0.18,
      assistsPer90: 0.12,
      passCompletionRate: 0.12,
      tacklesInterceptionsPer90: 0.12,
      duelWinRate: 0.1,
      dribblesSuccessfulPer90: 0.1,
      goalsPer90: 0.08,
      xAPer90: 0.08, // if available, else falls back to 0
      cardsPenaltyPer90: 0.1, // inverted
    },
    invertMetrics: ["cardsPenaltyPer90"],
  },
  ATT: {
    positionGroup: "ATT",
    weights: {
      goalsPer90: 0.2,
      xGPer90: 0.15, // if available
      assistsPer90: 0.1,
      xAPer90: 0.1, // if available
      shotsOnTargetPer90: 0.12,
      keyPassesPer90: 0.1,
      dribbleSuccessRate: 0.08,
      shotAccuracy: 0.08,
      cardsPenaltyPer90: 0.07, // inverted
    },
    invertMetrics: ["cardsPenaltyPer90"],
  },
};

// ============================================================================
// Rolling Stats Result
// ============================================================================

export interface RollingStatsResult {
  minutes: number;
  fromDate: string;
  toDate: string;
  totals: AggregatedTotals;
  per90: Per90Stats;
  rates: RateStats;
  features: RatingFeatures;
}

// ============================================================================
// Rating Result
// ============================================================================

export interface PlayerRatingResult {
  playerId: string;
  competitionId: string;
  positionGroup: PositionGroup;
  rating365: number;
  ratingLast5: number;
  tier?: Tier;
  levelScore: number;
}

export interface CompetitionRatingResult {
  competitionId: string;
  tier?: Tier;
  strengthScore: number;
  playerCount: number;
}

// ============================================================================
// Constants
// ============================================================================

export const MIN_MINUTES_FOR_RATING = 90;
export const ROLLING_WINDOW_DAYS = 365;
export const FORM_WINDOW_MATCHES = 5;
export const TOP_N_FOR_COMPETITION_STRENGTH = 25;
```

### 🛤️ Routes & Pages

#### `src/routes/__root.tsx`

```typescript
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Analytics } from '@vercel/analytics/react'

import Header from '../components/Header'
import { Providers } from '../lib/providers'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Footbase - European Football Scouting',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </Providers>
        <Scripts />
        <Analytics />
      </body>
    </html>
  )
}
```

#### `src/routes/competitions.$competitionId.tsx`

```typescript
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { PlayerFilters, type PlayerFiltersState } from "@/components/app/PlayerFilters";
import { PlayersTable } from "@/components/app/PlayersTable";
import { Pagination } from "@/components/app/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TierBadge } from "@/components/app/TierBadge";
import { StatHighlight } from "@/components/app/StatsCard";
import { ArrowLeft, MapPin, Users, Trophy } from "lucide-react";

interface CompetitionPlayersSearchParams {
  search?: string;
  positionGroup?: string;
  minMinutes?: number;
  window?: "365" | "last5";
  page?: number;
  sort?: string;
  sortDesc?: boolean;
}

export const Route = createFileRoute("/competitions/$competitionId")({
  validateSearch: (search: Record<string, unknown>): CompetitionPlayersSearchParams => {
    return {
      search: (search.search as string) || undefined,
      positionGroup: (search.positionGroup as string) || undefined,
      minMinutes: search.minMinutes ? Number(search.minMinutes) : undefined,
      window: (search.window as "365" | "last5") || undefined,
      page: search.page ? Number(search.page) : undefined,
      sort: (search.sort as string) || undefined,
      sortDesc: search.sortDesc === "true" || search.sortDesc === true,
    };
  },
  component: CompetitionDetailPage,
});

function CompetitionDetailPage() {
  const { competitionId } = Route.useParams();
  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = Route.useSearch();

  // Fetch competition details
  const { data: competition, isLoading: competitionLoading } = useQuery(
    convexQuery(api.competitionQueries.get, {
      competitionId: competitionId as Id<"competitions">,
    })
  );

  // Convert search params to filter state
  const filters: PlayerFiltersState = {
    search: searchParams.search || "",
    country: "",
    competitionId: competitionId,
    tier: "",
    positionGroup: searchParams.positionGroup || "",
    minMinutes: searchParams.minMinutes ?? 300,
    window: searchParams.window || "365",
  };

  const page = searchParams.page || 1;

  // Fetch players for this competition
  const { data: playersData, isLoading: playersLoading } = useQuery(
    convexQuery(api.playerQueries.list, {
      competitionId: competitionId as Id<"competitions">,
      search: filters.search || undefined,
      positionGroup: filters.positionGroup
        ? (filters.positionGroup as "GK" | "DEF" | "MID" | "ATT")
        : undefined,
      minMinutes: filters.minMinutes,
      window: filters.window,
      page,
      pageSize: 25,
      sort: (searchParams.sort as "rating" | "minutes" | "age" | "name") || "rating",
      sortDesc: searchParams.sortDesc ?? true,
    })
  );

  const handleFiltersChange = (newFilters: Partial<PlayerFiltersState>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        search: newFilters.search !== undefined ? newFilters.search : prev.search,
        positionGroup:
          newFilters.positionGroup !== undefined
            ? newFilters.positionGroup
            : prev.positionGroup,
        minMinutes:
          newFilters.minMinutes !== undefined
            ? newFilters.minMinutes
            : prev.minMinutes,
        window: newFilters.window !== undefined ? newFilters.window : prev.window,
        page: 1,
      }),
    });
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: newPage,
      }),
    });
  };

  const handleSortingChange = (sorting: Array<{ id: string; desc: boolean }>) => {
    if (sorting.length > 0) {
      const sortMap: Record<string, string> = {
        name: "name",
        minutes: "minutes",
        rating365: "rating",
        ratingLast5: "rating",
      };
      const sortId = sortMap[sorting[0].id] || "rating";
      navigate({
        search: (prev) => ({
          ...prev,
          sort: sortId,
          sortDesc: sorting[0].desc,
        }),
      });
    }
  };

  const sorting = searchParams.sort
    ? [
        {
          id:
            searchParams.sort === "rating"
              ? filters.window === "365"
                ? "rating365"
                : "ratingLast5"
              : searchParams.sort,
          desc: searchParams.sortDesc ?? true,
        },
      ]
    : [];

  if (competitionLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-48 w-full rounded-lg mb-6" />
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/competitions">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar competities
          </Link>
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Competitie niet gevonden</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/competitions">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Terug naar competities
        </Link>
      </Button>

      {/* Competition Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            {competition.logoUrl ? (
              <img
                src={competition.logoUrl}
                alt={competition.name}
                className="w-20 h-20 object-contain"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                <Trophy className="h-10 w-10 text-muted-foreground" />
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{competition.name}</h1>
                <TierBadge tier={competition.tier} />
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {competition.country}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {competition.playerCount} spelers
                </div>
                <span>Seizoen {competition.season}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md">
                <StatHighlight label="Teams" value={competition.teamCount} />
                <StatHighlight label="Spelers" value={competition.playerCount} />
                <StatHighlight
                  label="Sterkte"
                  value={competition.strengthScore?.toFixed(1) || "-"}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <PlayerFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            countries={[]}
            competitions={[]}
          />
        </CardContent>
      </Card>

      {/* Players Table */}
      {playersLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <>
          <PlayersTable
            players={playersData?.players || []}
            window={filters.window}
            sorting={sorting}
            onSortingChange={handleSortingChange}
          />

          {playersData && (
            <Pagination
              page={playersData.pagination.page}
              totalPages={playersData.pagination.totalPages}
              totalCount={playersData.pagination.totalCount}
              pageSize={playersData.pagination.pageSize}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
```

#### `src/routes/competitions.index.tsx`

```typescript
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import { CompetitionsTable } from "@/components/app/CompetitionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy } from "lucide-react";

// Use a special value for "all" options since Radix Select doesn't allow empty strings
const ALL_VALUE = "__all__";

interface CompetitionsSearchParams {
  country?: string;
  tier?: string;
}

export const Route = createFileRoute("/competitions/")({
  validateSearch: (search: Record<string, unknown>): CompetitionsSearchParams => {
    return {
      country: (search.country as string) || undefined,
      tier: (search.tier as string) || undefined,
    };
  },
  component: CompetitionsPage,
});

const tiers = [
  { value: ALL_VALUE, label: "Alle tiers" },
  { value: "Platinum", label: "Platinum" },
  { value: "Diamond", label: "Diamond" },
  { value: "Elite", label: "Elite" },
  { value: "Gold", label: "Goud" },
  { value: "Silver", label: "Zilver" },
  { value: "Bronze", label: "Brons" },
];

function CompetitionsPage() {
  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = Route.useSearch();

  // Fetch countries
  const { data: countries = [] } = useQuery(
    convexQuery(api.competitionQueries.countries, {})
  );

  // Fetch competitions
  const { data: competitions, isLoading } = useQuery(
    convexQuery(api.competitionQueries.list, {
      country: searchParams.country || undefined,
      tier: searchParams.tier
        ? (searchParams.tier as "Platinum" | "Diamond" | "Elite" | "Gold" | "Silver" | "Bronze")
        : undefined,
    })
  );

  const handleCountryChange = (value: string) => {
    const actualValue = value === ALL_VALUE ? undefined : value;
    navigate({
      search: (prev) => ({
        ...prev,
        country: actualValue,
      }),
    });
  };

  const handleTierChange = (value: string) => {
    const actualValue = value === ALL_VALUE ? undefined : value;
    navigate({
      search: (prev) => ({
        ...prev,
        tier: actualValue,
      }),
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Competities</h1>
          <p className="text-sm text-muted-foreground">
            Overzicht van alle competities en hun sterkte
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select
              value={searchParams.country || ALL_VALUE}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Land" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>Alle landen</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={searchParams.tier || ALL_VALUE}
              onValueChange={handleTierChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                {tiers.map((tier) => (
                  <SelectItem key={tier.value} value={tier.value}>
                    {tier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <CompetitionsTable competitions={competitions || []} />
      )}
    </div>
  );
}
```

#### `src/routes/debug.tsx`

```typescript
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  const { data, isLoading, error, refetch } = useQuery(
    convexQuery(api.health.ping, {})
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Footbase Debug</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Health Check Card */}
        <Card>
          <CardHeader>
            <CardTitle>Convex Health Check</CardTitle>
            <CardDescription>
              Tests connectivity to Convex backend
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="text-muted-foreground">Loading...</div>
            )}
            {error && (
              <div className="text-destructive">
                Error: {error instanceof Error ? error.message : String(error)}
              </div>
            )}
            {data && (
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={() => refetch()} variant="outline">
              Refresh
            </Button>
          </CardFooter>
        </Card>

        {/* Environment Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Info</CardTitle>
            <CardDescription>Current configuration details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Convex URL:</span>
                <span className="font-mono text-sm">
                  {import.meta.env.VITE_CONVEX_URL || "Not configured"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode:</span>
                <span className="font-mono text-sm">{import.meta.env.MODE}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Schema Overview */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Database Schema</CardTitle>
          <CardDescription>MVP data model tables</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "competitions", desc: "League/competition data" },
              { name: "teams", desc: "Team information" },
              { name: "players", desc: "Player profiles" },
              { name: "appearances", desc: "Per-match stats" },
              { name: "playerRollingStats", desc: "Aggregated statistics" },
              { name: "ratingProfiles", desc: "Position-based weights" },
              { name: "playerRatings", desc: "Computed ratings" },
              { name: "competitionRatings", desc: "League strength scores" },
              { name: "ingestionRuns", desc: "Data pipeline tracking" },
            ].map((table) => (
              <div
                key={table.name}
                className="p-3 border border-border rounded-lg"
              >
                <div className="font-medium text-sm">{table.name}</div>
                <div className="text-xs text-muted-foreground">{table.desc}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

#### `src/routes/index.tsx`

```typescript
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Trophy } from "lucide-react";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary mb-6">
            <span className="text-primary-foreground font-bold text-3xl">F</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Footbase
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            European Football Scouting Platform
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/players">
              <Button size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                Bekijk Spelers
              </Button>
            </Link>
            <Link to="/competitions">
              <Button size="lg" variant="outline" className="gap-2">
                <Trophy className="h-5 w-5" />
                Bekijk Competities
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Spelers Ranking</CardTitle>
              <CardDescription>
                Bekijk en vergelijk spelers op basis van prestaties over 365 dagen of de laatste 5 wedstrijden
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/players">
                <Button variant="outline" className="w-full">
                  Naar Spelers
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                <Trophy className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle>Competities</CardTitle>
              <CardDescription>
                Verken competities met tier classificatie: Platinum, Diamond, Elite, Goud, Zilver, Brons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/competitions">
                <Button variant="outline" className="w-full">
                  Naar Competities
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>Version 0.1</p>
        </div>
      </div>
    </div>
  );
}
```

#### `src/routes/players.$playerId.tsx`

```typescript
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { TierBadge } from "@/components/app/TierBadge";
import { PositionBadge } from "@/components/app/PositionBadge";
import { RatingDisplay } from "@/components/app/RatingDisplay";
import { StatsCard, StatHighlight } from "@/components/app/StatsCard";
import { ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react";

export const Route = createFileRoute("/players/$playerId")({
  component: PlayerProfilePage,
});

function PlayerProfilePage() {
  const { playerId } = Route.useParams();

  const { data: player, isLoading } = useQuery(
    convexQuery(api.playerQueries.get, {
      playerId: playerId as Id<"players">,
    })
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/players">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar spelers
          </Link>
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Speler niet gevonden</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get stats based on position group
  const getPositionStats = () => {
    const per90 = player.stats?.per90;
    if (!per90) return [];

    switch (player.positionGroup) {
      case "GK":
        return [
          { label: "Saves", value: per90.saves, suffix: "/90" },
          { label: "Goals Conceded", value: per90.goalsConceded, suffix: "/90" },
        ];
      case "DEF":
        return [
          { label: "Tackles", value: per90.tackles, suffix: "/90" },
          { label: "Interceptions", value: per90.interceptions, suffix: "/90" },
          { label: "Clearances", value: per90.clearances, suffix: "/90" },
          { label: "Blocks", value: per90.blocks, suffix: "/90" },
          { label: "Duels Won", value: per90.duelsWon, suffix: "/90" },
          { label: "Aerial Duels", value: per90.aerialDuelsWon, suffix: "/90" },
        ];
      case "MID":
        return [
          { label: "Key Passes", value: per90.keyPasses, suffix: "/90" },
          { label: "Passes", value: per90.passes, suffix: "/90" },
          { label: "Tackles", value: per90.tackles, suffix: "/90" },
          { label: "Interceptions", value: per90.interceptions, suffix: "/90" },
          { label: "Dribbles", value: per90.dribblesSuccessful, suffix: "/90" },
          { label: "Goals", value: per90.goals, suffix: "/90" },
        ];
      case "ATT":
        return [
          { label: "Goals", value: per90.goals, suffix: "/90" },
          { label: "Assists", value: per90.assists, suffix: "/90" },
          { label: "Shots", value: per90.shots, suffix: "/90" },
          { label: "xG", value: per90.xG, suffix: "/90" },
          { label: "xA", value: per90.xA, suffix: "/90" },
          { label: "Key Passes", value: per90.keyPasses, suffix: "/90" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/players">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Terug naar spelers
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Player Info Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                {player.photoUrl ? (
                  <img
                    src={player.photoUrl}
                    alt={player.name}
                    className="w-32 h-32 rounded-full object-cover mb-4 bg-muted"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}

                <h1 className="text-2xl font-bold mb-2">{player.name}</h1>

                <div className="flex items-center gap-2 mb-4">
                  <PositionBadge positionGroup={player.positionGroup} />
                  <span className="text-sm text-muted-foreground">
                    {player.position}
                  </span>
                </div>

                <Separator className="my-4" />

                <div className="w-full space-y-3 text-left">
                  {player.team && (
                    <div className="flex items-center gap-3">
                      {player.team.logoUrl ? (
                        <img
                          src={player.team.logoUrl}
                          alt=""
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded bg-muted" />
                      )}
                      <span className="font-medium">{player.team.name}</span>
                    </div>
                  )}

                  {player.competition && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {player.competition.logoUrl ? (
                          <img
                            src={player.competition.logoUrl}
                            alt=""
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded bg-muted" />
                        )}
                        <span className="text-sm text-muted-foreground">
                          {player.competition.name}
                        </span>
                      </div>
                      <TierBadge tier={player.competition.tier} />
                    </div>
                  )}

                  <Separator className="my-4" />

                  {player.age && (
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{player.age} jaar</span>
                      {player.birthDate && (
                        <span className="text-muted-foreground">
                          ({player.birthDate})
                        </span>
                      )}
                    </div>
                  )}

                  {player.nationality && (
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{player.nationality}</span>
                    </div>
                  )}

                  {player.stats && (
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{player.stats.minutes} minuten gespeeld</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Ratings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rating Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <RatingDisplay
                  rating={player.rating?.rating365}
                  size="lg"
                  showLabel
                  label="Rating (365 dagen)"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <RatingDisplay
                  rating={player.rating?.ratingLast5}
                  size="lg"
                  showLabel
                  label="Rating (Laatste 5)"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <RatingDisplay
                  rating={player.rating?.levelScore}
                  size="lg"
                  showLabel
                  label="Level Score"
                />
              </CardContent>
            </Card>
          </div>

          {/* Per 90 Stats */}
          {player.stats?.per90 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Statistieken per 90 minuten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {getPositionStats().map((stat, index) => (
                    <StatHighlight
                      key={index}
                      label={stat.label}
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Totals */}
          {player.stats?.totals && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Seizoen totalen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatHighlight
                    label="Wedstrijden"
                    value={player.stats.totals.appearances}
                  />
                  <StatHighlight label="Goals" value={player.stats.totals.goals} />
                  <StatHighlight label="Assists" value={player.stats.totals.assists} />
                  <StatHighlight
                    label="Geel"
                    value={player.stats.totals.yellowCards}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Appearances */}
          {player.recentAppearances && player.recentAppearances.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Laatste 5 wedstrijden</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {player.recentAppearances.map((app) => (
                    <div
                      key={app._id}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground w-24">
                          {app.matchDate}
                        </span>
                        <span className="text-sm font-medium">
                          {app.minutes} min
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        {app.stats.goals !== undefined && app.stats.goals > 0 && (
                          <span className="text-green-600 font-medium">
                            {app.stats.goals} goal{app.stats.goals > 1 ? "s" : ""}
                          </span>
                        )}
                        {app.stats.assists !== undefined && app.stats.assists > 0 && (
                          <span className="text-blue-600 font-medium">
                            {app.stats.assists} assist{app.stats.assists > 1 ? "s" : ""}
                          </span>
                        )}
                        {app.stats.yellowCards !== undefined &&
                          app.stats.yellowCards > 0 && (
                            <span className="text-yellow-600">
                              {app.stats.yellowCards} geel
                            </span>
                          )}
                        {app.stats.redCards !== undefined &&
                          app.stats.redCards > 0 && (
                            <span className="text-red-600">Rood</span>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
```

#### `src/routes/players.index.tsx`

```typescript
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import { PlayerFilters, type PlayerFiltersState } from "@/components/app/PlayerFilters";
import { PlayersTable } from "@/components/app/PlayersTable";
import { Pagination } from "@/components/app/Pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Id } from "../../convex/_generated/dataModel";

// Search params for URL state
interface PlayersSearchParams {
  search?: string;
  country?: string;
  competitionId?: string;
  tier?: string;
  positionGroup?: string;
  minMinutes?: number;
  window?: "365" | "last5";
  page?: number;
  sort?: string;
  sortDesc?: boolean;
}

export const Route = createFileRoute("/players/")({
  validateSearch: (search: Record<string, unknown>): PlayersSearchParams => {
    return {
      search: (search.search as string) || undefined,
      country: (search.country as string) || undefined,
      competitionId: (search.competitionId as string) || undefined,
      tier: (search.tier as string) || undefined,
      positionGroup: (search.positionGroup as string) || undefined,
      minMinutes: search.minMinutes !== undefined ? Number(search.minMinutes) : undefined,
      window: (search.window as "365" | "last5") || undefined,
      page: search.page ? Number(search.page) : undefined,
      sort: (search.sort as string) || undefined,
      sortDesc: search.sortDesc === "true" || search.sortDesc === true,
    };
  },
  component: PlayersPage,
});

function PlayersPage() {
  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = Route.useSearch();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Convert search params to filter state
  const filters: PlayerFiltersState = {
    search: searchParams.search || "",
    country: searchParams.country || "",
    competitionId: searchParams.competitionId || "",
    tier: searchParams.tier || "",
    positionGroup: searchParams.positionGroup || "",
    minMinutes: searchParams.minMinutes ?? 90,
    window: searchParams.window || "365",
  };

  const page = searchParams.page || 1;

  // Fetch countries for filter
  const { data: countries = [] } = useQuery(
    convexQuery(api.competitionQueries.countries, {})
  );

  // Fetch competitions for filter
  const { data: competitionsData } = useQuery(
    convexQuery(api.competitionQueries.list, {
      isActive: true,
    })
  );
  const competitions = competitionsData || [];

  // Fetch players
  const { data: playersData, isLoading } = useQuery(
    convexQuery(api.playerQueries.list, {
      search: filters.search || undefined,
      country: filters.country || undefined,
      competitionId: filters.competitionId
        ? (filters.competitionId as Id<"competitions">)
        : undefined,
      tier: filters.tier
        ? (filters.tier as "Platinum" | "Diamond" | "Elite" | "Gold" | "Silver" | "Bronze")
        : undefined,
      positionGroup: filters.positionGroup
        ? (filters.positionGroup as "GK" | "DEF" | "MID" | "ATT")
        : undefined,
      minMinutes: filters.minMinutes,
      window: filters.window,
      page,
      pageSize: 25,
      sort: (searchParams.sort as "rating" | "minutes" | "age" | "name") || "rating",
      sortDesc: searchParams.sortDesc ?? true,
    })
  );

  const handleFiltersChange = (newFilters: Partial<PlayerFiltersState>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...newFilters,
        page: 1, // Reset to page 1 when filters change
      }),
    });
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: newPage,
      }),
    });
  };

  const handleSortingChange = (sorting: Array<{ id: string; desc: boolean }>) => {
    if (sorting.length > 0) {
      const sortMap: Record<string, string> = {
        name: "name",
        minutes: "minutes",
        rating365: "rating",
        ratingLast5: "rating",
      };
      const sortId = sortMap[sorting[0].id] || "rating";
      navigate({
        search: (prev) => ({
          ...prev,
          sort: sortId,
          sortDesc: sorting[0].desc,
        }),
      });
    }
  };

  const sorting = searchParams.sort
    ? [
        {
          id:
            searchParams.sort === "rating"
              ? filters.window === "365"
                ? "rating365"
                : "ratingLast5"
              : searchParams.sort,
          desc: searchParams.sortDesc ?? true,
        },
      ]
    : [];

  // Count active filters for badge
  const activeFilterCount = [
    filters.search,
    filters.country,
    filters.competitionId,
    filters.tier,
    filters.positionGroup,
    filters.minMinutes !== 90,
    filters.window !== "365",
  ].filter(Boolean).length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Spelers</h1>
            <p className="text-sm text-muted-foreground">
              Ranking en statistieken van spelers
            </p>
          </div>
        </div>

        {/* Mobile Filter Toggle Button */}
        <Button
          variant={isFiltersOpen ? "default" : "outline"}
          size="sm"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="md:hidden relative"
        >
          {isFiltersOpen ? (
            <X className="h-4 w-4 mr-2" />
          ) : (
            <SlidersHorizontal className="h-4 w-4 mr-2" />
          )}
          Filters
          {activeFilterCount > 0 && !isFiltersOpen && (
            <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filters - Always visible on desktop, animated on mobile */}
      <div className="hidden md:block mb-6">
        <Card>
          <CardContent className="pt-6">
            <PlayerFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              countries={countries}
              competitions={competitions.map((c) => ({ _id: c._id, name: c.name }))}
            />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Filters with Animation */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="md:hidden overflow-hidden mb-6"
          >
            <Card>
              <CardContent className="pt-6">
                <PlayerFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  countries={countries}
                  competitions={competitions.map((c) => ({ _id: c._id, name: c.name }))}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <>
          <PlayersTable
            players={playersData?.players || []}
            window={filters.window}
            sorting={sorting}
            onSortingChange={handleSortingChange}
          />

          {playersData && (
            <Pagination
              page={playersData.pagination.page}
              totalPages={playersData.pagination.totalPages}
              totalCount={playersData.pagination.totalCount}
              pageSize={playersData.pagination.pageSize}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
```

### 🧩 App Components

#### `src/components/app/CompetitionsTable.tsx`

```typescript
import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TierBadge } from "./TierBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface Competition {
  _id: string;
  name: string;
  country: string;
  tier: string | undefined;
  isActive: boolean;
  logoUrl: string | undefined;
  strengthScore: number | undefined;
  playerCount: number;
  season: string;
}

interface CompetitionsTableProps {
  competitions: Competition[];
  isLoading?: boolean;
}

export function CompetitionsTable({
  competitions,
  isLoading = false,
}: CompetitionsTableProps) {
  const columns = useMemo<ColumnDef<Competition>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Competitie",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {row.original.logoUrl ? (
              <img
                src={row.original.logoUrl}
                alt=""
                className="w-8 h-8 object-contain"
              />
            ) : (
              <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                {row.original.name.charAt(0)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-medium">{row.original.name}</span>
              <span className="text-xs text-muted-foreground">
                {row.original.season}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "country",
        header: "Land",
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.country}</span>
        ),
      },
      {
        accessorKey: "tier",
        header: "Tier",
        cell: ({ row }) => <TierBadge tier={row.original.tier} />,
      },
      {
        accessorKey: "strengthScore",
        header: "Sterkte",
        cell: ({ row }) =>
          row.original.strengthScore !== undefined ? (
            <span className="font-mono text-sm">
              {row.original.strengthScore.toFixed(1)}
            </span>
          ) : (
            <span className="text-muted-foreground">-</span>
          ),
      },
      {
        accessorKey: "playerCount",
        header: "Spelers",
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.playerCount}</Badge>
        ),
      },
      {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) =>
          row.original.isActive ? (
            <Badge variant="default" className="bg-green-600">
              Actief
            </Badge>
          ) : (
            <Badge variant="secondary">Inactief</Badge>
          ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: competitions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="cursor-pointer">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <Link
                      to="/competitions/$competitionId"
                      params={{ competitionId: row.original._id }}
                      className="block"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Link>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Geen competities gevonden
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
```

#### `src/components/app/Pagination.tsx`

```typescript
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-sm text-muted-foreground">
        {totalCount > 0 ? (
          <>
            {startItem}-{endItem} van {totalCount} spelers
          </>
        ) : (
          "Geen spelers gevonden"
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="text-sm mx-2">
          Pagina {page} van {totalPages || 1}
        </span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(totalPages)}
          disabled={page >= totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
```

#### `src/components/app/PlayerFilters.tsx`

```typescript
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

// Use a special value for "all" options since Radix Select doesn't allow empty strings
const ALL_VALUE = "__all__";

export interface PlayerFiltersState {
  search: string;
  country: string;
  competitionId: string;
  tier: string;
  positionGroup: string;
  minMinutes: number;
  window: "365" | "last5";
}

interface PlayerFiltersProps {
  filters: PlayerFiltersState;
  onFiltersChange: (filters: Partial<PlayerFiltersState>) => void;
  countries: string[];
  competitions: Array<{ _id: string; name: string }>;
}

const tiers = [
  { value: ALL_VALUE, label: "Alle tiers" },
  { value: "Platinum", label: "Platinum" },
  { value: "Diamond", label: "Diamond" },
  { value: "Elite", label: "Elite" },
  { value: "Gold", label: "Goud" },
  { value: "Silver", label: "Zilver" },
  { value: "Bronze", label: "Brons" },
];

const positionGroups = [
  { value: ALL_VALUE, label: "Alle posities" },
  { value: "GK", label: "Keepers" },
  { value: "DEF", label: "Verdedigers" },
  { value: "MID", label: "Middenvelders" },
  { value: "ATT", label: "Aanvallers" },
];

const minMinutesOptions = [
  { value: "0", label: "Geen minimum" },
  { value: "90", label: "90+ min" },
  { value: "300", label: "300+ min" },
  { value: "450", label: "450+ min" },
  { value: "900", label: "900+ min" },
];

// Convert empty string to ALL_VALUE for Select display
const toSelectValue = (value: string) => value || ALL_VALUE;
// Convert ALL_VALUE back to empty string for state
const fromSelectValue = (value: string) => value === ALL_VALUE ? "" : value;

export function PlayerFilters({
  filters,
  onFiltersChange,
  countries,
  competitions,
}: PlayerFiltersProps) {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFiltersChange({ search: e.target.value });
    },
    [onFiltersChange]
  );

  const handleClearSearch = useCallback(() => {
    onFiltersChange({ search: "" });
  }, [onFiltersChange]);

  const handleClearAll = useCallback(() => {
    onFiltersChange({
      search: "",
      country: "",
      competitionId: "",
      tier: "",
      positionGroup: "",
      minMinutes: 90,
      window: "365",
    });
  }, [onFiltersChange]);

  const hasActiveFilters =
    filters.search ||
    filters.country ||
    filters.competitionId ||
    filters.tier ||
    filters.positionGroup ||
    filters.minMinutes !== 90 ||
    filters.window !== "365";

  return (
    <div className="space-y-4">
      {/* Search and window toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoek speler..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-9 pr-9"
          />
          {filters.search && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Tabs
          value={filters.window}
          onValueChange={(value) =>
            onFiltersChange({ window: value as "365" | "last5" })
          }
        >
          <TabsList>
            <TabsTrigger value="365">365 dagen</TabsTrigger>
            <TabsTrigger value="last5">Laatste 5</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Filter selects */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <Select
          value={toSelectValue(filters.country)}
          onValueChange={(value) => onFiltersChange({ country: fromSelectValue(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Land" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>Alle landen</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={toSelectValue(filters.competitionId)}
          onValueChange={(value) => onFiltersChange({ competitionId: fromSelectValue(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Competitie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>Alle competities</SelectItem>
            {competitions.map((comp) => (
              <SelectItem key={comp._id} value={comp._id}>
                {comp.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={toSelectValue(filters.tier)}
          onValueChange={(value) => onFiltersChange({ tier: fromSelectValue(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            {tiers.map((tier) => (
              <SelectItem key={tier.value} value={tier.value}>
                {tier.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={toSelectValue(filters.positionGroup)}
          onValueChange={(value) => onFiltersChange({ positionGroup: fromSelectValue(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Positie" />
          </SelectTrigger>
          <SelectContent>
            {positionGroups.map((pos) => (
              <SelectItem key={pos.value} value={pos.value}>
                {pos.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.minMinutes.toString()}
          onValueChange={(value) =>
            onFiltersChange({ minMinutes: parseInt(value, 10) })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Min. minuten" />
          </SelectTrigger>
          <SelectContent>
            {minMinutesOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear filters button */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            <X className="h-4 w-4 mr-1" />
            Filters wissen
          </Button>
        </div>
      )}
    </div>
  );
}
```

#### `src/components/app/PlayersTable.tsx`

```typescript
import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TierBadge } from "./TierBadge";
import { PositionBadge } from "./PositionBadge";
import { RatingDisplay } from "./RatingDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Player {
  _id: string;
  name: string;
  age: number | undefined;
  nationality: string | undefined;
  positionGroup: string;
  position: string;
  photoUrl: string | undefined;
  teamId: string;
  teamName: string;
  teamLogoUrl: string | undefined;
  competitionId: string;
  competitionName: string;
  competitionLogoUrl: string | undefined;
  tier: string | undefined;
  minutes: number;
  rating365: number | undefined;
  ratingLast5: number | undefined;
  levelScore: number | undefined;
}

interface PlayersTableProps {
  players: Player[];
  isLoading?: boolean;
  window: "365" | "last5";
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
}

export function PlayersTable({
  players,
  isLoading = false,
  window,
  sorting = [],
  onSortingChange,
}: PlayersTableProps) {
  const columns = useMemo<ColumnDef<Player>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Speler
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {row.original.photoUrl ? (
              <img
                src={row.original.photoUrl}
                alt={row.original.name}
                className="w-8 h-8 rounded-full object-cover bg-muted"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                {row.original.name.charAt(0)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-medium">{row.original.name}</span>
              <span className="text-xs text-muted-foreground">
                {row.original.position}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "age",
        header: "Leeftijd",
        cell: ({ row }) => row.original.age ?? "-",
      },
      {
        accessorKey: "nationality",
        header: "Nat",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.nationality?.slice(0, 3).toUpperCase() ?? "-"}
          </span>
        ),
      },
      {
        accessorKey: "positionGroup",
        header: "Pos",
        cell: ({ row }) => (
          <PositionBadge positionGroup={row.original.positionGroup} />
        ),
      },
      {
        accessorKey: "teamName",
        header: "Team",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.teamLogoUrl && (
              <img
                src={row.original.teamLogoUrl}
                alt=""
                className="w-5 h-5 object-contain"
              />
            )}
            <span className="truncate max-w-[120px]">{row.original.teamName}</span>
          </div>
        ),
      },
      {
        accessorKey: "competitionName",
        header: "Competitie",
        cell: ({ row }) => (
          <span className="truncate max-w-[120px] text-muted-foreground">
            {row.original.competitionName}
          </span>
        ),
      },
      {
        accessorKey: "tier",
        header: "Tier",
        cell: ({ row }) => <TierBadge tier={row.original.tier} />,
      },
      {
        accessorKey: "minutes",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Min
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <span className="font-mono text-sm">{row.original.minutes}</span>
        ),
      },
      {
        accessorKey: window === "365" ? "rating365" : "ratingLast5",
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <RatingDisplay
            rating={window === "365" ? row.original.rating365 : row.original.ratingLast5}
            size="sm"
          />
        ),
      },
      {
        accessorKey: "levelScore",
        header: "Level",
        cell: ({ row }) => (
          <RatingDisplay rating={row.original.levelScore} size="sm" />
        ),
      },
    ],
    [window]
  );

  const table = useReactTable({
    data: players,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: onSortingChange
      ? (updater) => {
          const newSorting = typeof updater === "function" ? updater(sorting) : updater;
          onSortingChange(newSorting);
        }
      : undefined,
    manualSorting: true,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell key={cell.id}>
                    {index === 0 ? (
                      <Link
                        to="/players/$playerId"
                        params={{ playerId: row.original._id }}
                        className="block"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Link>
                    ) : (
                      <Link
                        to="/players/$playerId"
                        params={{ playerId: row.original._id }}
                        className="block"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Link>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Geen spelers gevonden
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
```

#### `src/components/app/PositionBadge.tsx`

```typescript
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PositionGroup = "GK" | "DEF" | "MID" | "ATT";

interface PositionBadgeProps {
  positionGroup: PositionGroup | string;
  className?: string;
}

const positionConfig: Record<PositionGroup, { label: string; variant: "gk" | "def" | "mid" | "att" }> = {
  GK: { label: "GK", variant: "gk" },
  DEF: { label: "DEF", variant: "def" },
  MID: { label: "MID", variant: "mid" },
  ATT: { label: "ATT", variant: "att" },
};

export function PositionBadge({ positionGroup, className }: PositionBadgeProps) {
  const config = positionConfig[positionGroup as PositionGroup];

  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        {positionGroup}
      </Badge>
    );
  }

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
```

#### `src/components/app/RatingDisplay.tsx`

```typescript
import { cn } from "@/lib/utils";

interface RatingDisplayProps {
  rating: number | undefined | null;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

function getRatingColor(rating: number): string {
  if (rating >= 80) return "text-green-600";
  if (rating >= 60) return "text-emerald-600";
  if (rating >= 40) return "text-amber-600";
  if (rating >= 20) return "text-orange-600";
  return "text-red-600";
}

function getRatingBgColor(rating: number): string {
  if (rating >= 80) return "bg-green-50";
  if (rating >= 60) return "bg-emerald-50";
  if (rating >= 40) return "bg-amber-50";
  if (rating >= 20) return "bg-orange-50";
  return "bg-red-50";
}

export function RatingDisplay({
  rating,
  size = "md",
  showLabel = false,
  label,
  className,
}: RatingDisplayProps) {
  const sizeClasses = {
    sm: "text-sm font-medium",
    md: "text-base font-semibold",
    lg: "text-2xl font-bold",
  };

  if (rating === undefined || rating === null) {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        {showLabel && label && (
          <span className="text-xs text-muted-foreground mb-1">{label}</span>
        )}
        <span className={cn("text-muted-foreground", sizeClasses[size])}>-</span>
      </div>
    );
  }

  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {showLabel && label && (
        <span className="text-xs text-muted-foreground mb-1">{label}</span>
      )}
      <span
        className={cn(
          sizeClasses[size],
          getRatingColor(rating),
          size === "lg" && cn("px-3 py-1 rounded-lg", getRatingBgColor(rating))
        )}
      >
        {roundedRating.toFixed(1)}
      </span>
    </div>
  );
}
```

#### `src/components/app/StatsCard.tsx`

```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: number | string | undefined | null;
  suffix?: string;
}

interface StatsCardProps {
  title: string;
  stats: StatItem[];
  className?: string;
}

export function StatsCard({ title, stats, className }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span className="text-lg font-semibold">
                {stat.value !== undefined && stat.value !== null
                  ? typeof stat.value === "number"
                    ? stat.value.toFixed(stat.suffix ? 2 : 0)
                    : stat.value
                  : "-"}
                {stat.suffix && stat.value !== undefined && stat.value !== null && (
                  <span className="text-xs text-muted-foreground ml-0.5">
                    {stat.suffix}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface StatHighlightProps {
  label: string;
  value: number | string | undefined | null;
  suffix?: string;
  className?: string;
}

export function StatHighlight({ label, value, suffix, className }: StatHighlightProps) {
  return (
    <div className={cn("flex flex-col items-center p-4 rounded-lg bg-muted/50", className)}>
      <span className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <span className="text-2xl font-bold mt-1">
        {value !== undefined && value !== null
          ? typeof value === "number"
            ? value.toFixed(suffix ? 2 : 0)
            : value
          : "-"}
        {suffix && value !== undefined && value !== null && (
          <span className="text-sm font-normal text-muted-foreground ml-0.5">
            {suffix}
          </span>
        )}
      </span>
    </div>
  );
}
```

#### `src/components/app/TierBadge.tsx`

```typescript
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Tier = "Platinum" | "Diamond" | "Elite" | "Gold" | "Silver" | "Bronze";

interface TierBadgeProps {
  tier: Tier | string | undefined | null;
  className?: string;
}

const tierConfig: Record<Tier, { label: string; variant: "platinum" | "diamond" | "elite" | "gold" | "silver" | "bronze" }> = {
  Platinum: { label: "Platinum", variant: "platinum" },
  Diamond: { label: "Diamond", variant: "diamond" },
  Elite: { label: "Elite", variant: "elite" },
  Gold: { label: "Goud", variant: "gold" },
  Silver: { label: "Zilver", variant: "silver" },
  Bronze: { label: "Brons", variant: "bronze" },
};

export function TierBadge({ tier, className }: TierBadgeProps) {
  if (!tier) {
    return (
      <Badge variant="outline" className={cn("text-muted-foreground", className)}>
        -
      </Badge>
    );
  }

  const config = tierConfig[tier as Tier];
  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        {tier}
      </Badge>
    );
  }

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
```

### 🔧 Frontend Utilities

#### `src/lib/convex.ts`

```typescript
import { ConvexQueryClient } from "@convex-dev/react-query";
import { ConvexReactClient } from "convex/react";

// Get Convex URL from environment, with fallback for development
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

if (!CONVEX_URL) {
  console.warn(
    "VITE_CONVEX_URL is not set. Run `npx convex dev` to configure your Convex project."
  );
}

// Create the Convex client - reads from VITE_CONVEX_URL env variable
// Use a placeholder URL if not set (will fail at runtime but allows app to load)
export const convex = new ConvexReactClient(
  CONVEX_URL || "https://placeholder.convex.cloud"
);

// Create the Convex Query Client for TanStack Query integration
export const convexQueryClient = new ConvexQueryClient(convex);
```

#### `src/lib/metrics.ts`

```typescript
/**
 * Metrics Types Re-export
 *
 * Re-exports types from convex/lib/metrics for use in frontend code.
 */

export type {
  PositionGroup,
  Tier,
  CanonicalStats,
  AggregatedTotals,
  Per90Stats,
  RateStats,
  RatingFeatures,
  RatingWeights,
  RatingProfile,
  RollingStatsResult,
  PlayerRatingResult,
  CompetitionRatingResult,
} from "../../convex/lib/metrics";

export {
  POSITION_GROUPS,
  TIERS,
  TIER_FACTORS,
  DEFAULT_RATING_PROFILES,
  MIN_MINUTES_FOR_RATING,
  ROLLING_WINDOW_DAYS,
  FORM_WINDOW_MATCHES,
  TOP_N_FOR_COMPETITION_STRENGTH,
} from "../../convex/lib/metrics";
```

#### `src/lib/providers.tsx`

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexProvider } from "convex/react";
import { convex, convexQueryClient } from "./convex";

// Create QueryClient with Convex adapter
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Use Convex's caching/updating for queries
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});

// Connect the Convex query client to the QueryClient
convexQueryClient.connect(queryClient);

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ConvexProvider>
  );
}

// Export queryClient for use in router context if needed
export { queryClient };
```

#### `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 📄 Other

#### `src/router.tsx`

```typescript
import { createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},

    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  return router
}
```
