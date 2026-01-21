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
│   ├── admin/                # Admin utilities
│   ├── ai/                   # AI & report generation
│   ├── enrichment/           # Data enrichment logic
│   ├── ingest/               # Data ingestion pipelines
│   ├── lib/                  # Shared utilities
│   ├── merge/                # Player merging logic
│   ├── providers/            # External API integrations
│   ├── ratings/              # Player rating computation
│   ├── resolve/              # Player resolution
├── src/                      # React frontend
│   ├── routes/               # TanStack Router pages
│   ├── components/           # React components
│   │   ├── app/              # Business logic components
│   │   └── ui/               # UI primitives
│   └── lib/                  # Shared utilities
├── scripts/                  # Build & utility scripts
```

## Export Statistics

- **Generated**: 2026-01-20T13:59:23.424Z
- **Files exported**: 67
- **Total size**: 693.9 KB

## Environment Variables

```env
# Convex
# Get these values by running `npx convex dev`
CONVEX_DEPLOYMENT=dev:your-project-name
VITE_CONVEX_URL=https://your-project-name.convex.cloud

# Better Auth
# SITE_URL is used by Convex auth functions (set this in Convex dashboard environment variables)
SITE_URL=http://localhost:3000
# VITE_CONVEX_SITE_URL is the Convex HTTP endpoint for auth
VITE_CONVEX_SITE_URL=https://your-project-name.convex.site

# API Football (for data ingestion - future use)
# Sign up at https://www.api-football.com/ or https://rapidapi.com/api-sports/api/api-football
API_FOOTBALL_KEY=your_api_key_here
API_FOOTBALL_HOST=api-football-v1.p.rapidapi.com

# AI Player Reports
# Supports OpenAI, Anthropic, or xAI APIs
# Get your API key from: https://platform.openai.com (OpenAI) or https://console.anthropic.com (Anthropic)
AI_GATEWAY_API_KEY=your_api_key_here
# Model string (e.g., "openai/gpt-4o-mini", "anthropic/claude-3-haiku-20240307", "xai/grok-2")
AI_PLAYER_REPORT_MODEL=openai/gpt-4o-mini
# Maximum output tokens per report (keep low for cost control)
AI_PLAYER_REPORT_MAX_OUTPUT_TOKENS=600
# Maximum reports to generate per daily cron run
AI_PLAYER_REPORT_DAILY_LIMIT=200
# Locale for generated content (currently only Dutch supported)
AI_PLAYER_REPORT_LOCALE=nl

```

## File Index

### ⚙️ Configuration

- `tsconfig.json`
- `vite.config.ts`

### 📦 Dependencies

- `package.json`

### 🗄️ Database Schema

- `convex/schema.ts`

### 📊 Database Queries

- `convex/ai/playerAiQueries.ts`
- `convex/competitionQueries.ts`
- `convex/playerQueries.ts`

### ⚙️ Backend Logic

- `convex/admin.ts`
- `convex/auth.config.ts`
- `convex/auth.ts`
- `convex/convex.config.ts`
- `convex/crons.ts`
- `convex/health.ts`
- `convex/http.ts`

### ✨ Data enrichment logic

- `convex/enrichment/enrichActions.ts`
- `convex/enrichment/testProviders.ts`

### ⭐ Player rating computation

- `convex/ratings/aggregate.ts`
- `convex/ratings/compute.ts`
- `convex/ratings/positionMapping.ts`
- `convex/ratings/scoring.ts`
- `convex/ratings/seed.ts`
- `convex/ratings/statsbombFeatures.ts`

### 📚 Shared utilities

- `convex/lib/auth.ts`
- `convex/lib/metrics.ts`

### 📥 Data ingestion pipelines

- `convex/ingest/apiFootballIngest.ts`
- `convex/ingest/cronRunner.ts`
- `convex/ingest/statsbombConfig.ts`
- `convex/ingest/statsbombIngest.ts`

### 🔀 Player merging logic

- `convex/merge/mergePlayer.ts`

### 🔌 External API integrations

- `convex/providers/apiFootball.ts`
- `convex/providers/apiFootballClient.ts`
- `convex/providers/fetchWrapper.ts`
- `convex/providers/fotmob.ts`
- `convex/providers/sofascore.ts`
- `convex/providers/statsbomb.ts`
- `convex/providers/statsbombClient.ts`

### 🔍 Player resolution

- `convex/resolve/resolvePlayer.ts`

### 🔧 Admin utilities

- `convex/admin/seedTestData.ts`

### 🤖 AI & report generation

- `convex/ai/aiCronRunner.ts`
- `convex/ai/batchApi.ts`
- `convex/ai/buildPlayerAiInput.ts`
- `convex/ai/generatePlayerReport.ts`

### 🛤️ Routes & Pages

- `src/routes/__root.tsx`
- `src/routes/competitions.$competitionId.tsx`
- `src/routes/competitions.index.tsx`
- `src/routes/debug.tsx`
- `src/routes/index.tsx`
- `src/routes/login.tsx`
- `src/routes/players.$playerId.tsx`
- `src/routes/players.index.tsx`

### 🧩 App Components

- `src/components/app/CompetitionsTable.tsx`
- `src/components/app/DataSourceBadge.tsx`
- `src/components/app/Pagination.tsx`
- `src/components/app/PlayerAiReport.tsx`
- `src/components/app/PlayerFilters.tsx`
- `src/components/app/PlayersTable.tsx`
- `src/components/app/PositionBadge.tsx`
- `src/components/app/RatingDisplay.tsx`
- `src/components/app/StatsCard.tsx`
- `src/components/app/TierBadge.tsx`

### 🧩 Components

- `src/components/Header.tsx`

### 🔧 Frontend Utilities

- `src/lib/auth-client.ts`
- `src/lib/convex.ts`
- `src/lib/metrics.ts`
- `src/lib/providers.tsx`
- `src/lib/utils.ts`

### 📜 Scripts

- `scripts/export-context.ts`

---

## File Contents

### ⚙️ Configuration

#### `tsconfig.json`

```json
{
  "include": ["src/**/*.ts", "src/**/*.tsx", "convex/**/*.ts"],
  "exclude": ["node_modules"],
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client", "node"],

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": false,
    "noEmit": true,

    /* Linting */
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'url'
import { nitro } from 'nitro/vite'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Proxy auth requests to Convex in local development
      '/api/auth': {
        target: 'https://capable-salmon-323.convex.site',
        changeOrigin: true,
      },
    },
  },
  ssr: {
    noExternal: ['@convex-dev/better-auth'],
  },
  plugins: [
    devtools(),
    tailwindcss(),
    nitro({
      preset: 'vercel',
    }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),

    tanstackStart(),
    viteReact(),
  ],
})

export default config
```

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
    "@convex-dev/better-auth": "^0.10.10",
    "@convex-dev/react-query": "^0.1.0",
    "better-auth": "1.4.9",
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
  },
  "packageManager": "pnpm@10.15.1+sha512.34e538c329b5553014ca8e8f4535997f96180a1d0f614339357449935350d924e22f8614682191264ec33d1462ac21561aff97f6bb18065351c162c7e8f6de67"
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
  v.literal("footballdata"),
  v.literal("statsbomb")
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
    teamId: v.optional(v.id("teams")), // For multi-team seasons (e.g., player transferred mid-season)
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
      // OBV (On-Ball Value) from StatsBomb
      obv: v.optional(v.number()),
      obvPass: v.optional(v.number()),
      obvShot: v.optional(v.number()),
      obvDefensiveAction: v.optional(v.number()),
      obvDribbleCarry: v.optional(v.number()),
      obvGk: v.optional(v.number()),
    })),
    // Raw provider response (for StatsBomb and other providers with wide stats)
    raw: v.optional(v.any()),
    // Extracted rating features (curated subset for rating computation)
    features: v.optional(v.any()),
    fetchedAt: v.number(),
  })
    .index("by_player_provider_window", ["playerId", "provider", "window"])
    .index("by_player_provider_season_team", ["playerId", "provider", "season", "teamId"]),

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
    // Provider-specific match ID (e.g., StatsBomb match_id)
    providerMatchId: v.optional(v.string()),
    // Raw provider response (for StatsBomb and other providers with wide stats)
    raw: v.optional(v.any()),
    // Extracted rating features (curated subset for rating computation)
    features: v.optional(v.any()),
    fetchedAt: v.number(),
  })
    .index("by_provider_match_player", ["provider", "matchKey", "playerId"])
    .index("by_player_date", ["playerId", "matchDate"])
    .index("by_provider_matchId_player", ["provider", "providerMatchId", "playerId"]),

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

  // ============================================================================
  // AI Player Reports
  // ============================================================================

  // AI-generated player reports with descriptions and analysis
  playerAiReports: defineTable({
    playerId: v.id("players"),
    window: v.union(v.literal("365"), v.literal("last5")), // Stats window used
    locale: v.string(), // e.g., "nl" for Dutch
    // Generated content
    shortDescription: v.string(), // 2-3 sentences
    longDescription: v.string(), // 8-12 lines, no markdown
    archetype: v.string(), // e.g., "Box-to-Box Midfielder"
    playstyleTags: v.array(v.string()), // max 10 tags
    strengths: v.array(v.string()), // max 6
    weaknesses: v.array(v.string()), // max 6
    confidence: v.number(), // 0-1 confidence score
    // Metadata for caching/debugging
    model: v.string(), // Model used (e.g., "openai/gpt-4o-mini")
    inputHash: v.string(), // SHA256 hash of input snapshot for cache invalidation
    sourcesUsed: v.array(v.string()), // Which data providers contributed
    generatedAt: v.number(), // Timestamp
  })
    .index("by_player_window_locale", ["playerId", "window", "locale"])
    .index("by_generatedAt", ["generatedAt"]),

  // AI job queue for deduplication and locking
  playerAiJobs: defineTable({
    playerId: v.id("players"),
    window: v.union(v.literal("365"), v.literal("last5")),
    locale: v.string(),
    status: v.union(
      v.literal("queued"),
      v.literal("running"),
      v.literal("done"),
      v.literal("error")
    ),
    lockedUntil: v.number(), // Timestamp for distributed locking
    attempts: v.number(), // Number of attempts
    lastError: v.optional(v.string()), // Last error message if failed
    updatedAt: v.number(),
  }).index("by_player_window_locale", ["playerId", "window", "locale"]),

  // Daily player view counts (for prioritizing AI generation)
  playerViewsDaily: defineTable({
    dayKey: v.string(), // "YYYY-MM-DD"
    playerId: v.id("players"),
    views: v.number(),
  })
    .index("by_day_player", ["dayKey", "playerId"])
    .index("by_day_views", ["dayKey", "views"]),

  // AI usage logs for cost tracking
  aiUsageLogs: defineTable({
    model: v.string(),
    playerId: v.optional(v.id("players")),
    window: v.optional(v.string()),
    promptTokens: v.optional(v.number()),
    completionTokens: v.optional(v.number()),
    totalTokens: v.optional(v.number()),
    durationMs: v.optional(v.number()),
    success: v.boolean(),
    error: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  // ============================================================================
  // AI Batch Processing (OpenAI Batch API)
  // ============================================================================

  // Batch job tracking
  aiBatchJobs: defineTable({
    batchId: v.string(), // OpenAI batch ID
    inputFileId: v.string(), // OpenAI file ID for input
    outputFileId: v.optional(v.string()), // OpenAI file ID for output
    errorFileId: v.optional(v.string()), // OpenAI file ID for errors
    status: v.string(), // validating, in_progress, completed, failed, etc.
    window: v.union(v.literal("365"), v.literal("last5")),
    locale: v.string(),
    totalRequests: v.number(),
    completedRequests: v.number(),
    failedRequests: v.number(),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
  }).index("by_batchId", ["batchId"]),

  // Batch request metadata (for processing results)
  aiBatchMetadata: defineTable({
    customId: v.string(), // OpenAI custom_id for the request
    playerId: v.id("players"),
    inputHash: v.string(),
    window: v.union(v.literal("365"), v.literal("last5")),
    locale: v.string(),
    processed: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_customId", ["customId"])
    .index("by_processed", ["processed"]),

  // ============================================================================
  // StatsBomb Integration Tables
  // ============================================================================

  // StatsBomb competition-seasons for sync tracking
  statsbombCompetitionSeasons: defineTable({
    statsbombCompetitionId: v.number(),
    statsbombSeasonId: v.number(),
    competitionId: v.optional(v.id("competitions")), // Link to canonical competition
    name: v.string(),
    country: v.string(),
    season: v.string(), // e.g., "2025/2026"
    matchCount: v.optional(v.number()),
    matchUpdated: v.optional(v.string()), // ISO timestamp from API for change detection
    matchAvailable: v.optional(v.string()), // ISO timestamp for last available match data
    syncStatus: v.union(
      v.literal("pending"),
      v.literal("syncing"),
      v.literal("synced"),
      v.literal("error")
    ),
    lastSyncedAt: v.optional(v.number()),
    lastError: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_statsbomb_ids", ["statsbombCompetitionId", "statsbombSeasonId"])
    .index("by_sync_status", ["syncStatus"])
    .index("by_competition", ["competitionId"]),

  // StatsBomb matches for incremental sync tracking
  statsbombMatches: defineTable({
    statsbombMatchId: v.number(),
    competitionSeasonId: v.id("statsbombCompetitionSeasons"),
    matchDate: v.string(), // YYYY-MM-DD
    kickOff: v.optional(v.string()), // HH:MM:SS
    homeTeamName: v.string(),
    awayTeamName: v.string(),
    homeTeamId: v.optional(v.number()), // StatsBomb team ID
    awayTeamId: v.optional(v.number()), // StatsBomb team ID
    homeScore: v.optional(v.number()),
    awayScore: v.optional(v.number()),
    status: v.string(), // "scheduled", "available", etc.
    lastUpdated: v.optional(v.string()), // ISO timestamp from API for change detection
    // Sync state flags
    lineupsIngested: v.boolean(),
    playerStatsIngested: v.boolean(),
    teamStatsIngested: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_statsbomb_match", ["statsbombMatchId"])
    .index("by_competition_season", ["competitionSeasonId", "matchDate"])
    .index("by_pending_player_stats", ["playerStatsIngested", "status"])
    .index("by_pending_lineups", ["lineupsIngested", "status"]),

  // StatsBomb player mappings (from /api/v1/player-mapping endpoint)
  statsbombPlayerMappings: defineTable({
    statsbombPlayerId: v.number(), // offline_player_id
    livePlayerId: v.optional(v.number()), // live_player_id for live matches
    sbPlayerId: v.optional(v.number()), // sb_player_id (canonical StatsBomb ID)
    playerName: v.string(),
    playerNickname: v.optional(v.string()),
    // Bio fields from player-mapping endpoint
    birthDate: v.optional(v.string()),
    heightCm: v.optional(v.number()),
    weightKg: v.optional(v.number()),
    countryId: v.optional(v.number()),
    countryName: v.optional(v.string()),
    // External ID mappings from StatsBomb
    externalMappings: v.optional(v.array(v.object({
      provider: v.string(),
      providerId: v.string(),
    }))),
    // Link to canonical player (once resolved)
    playerId: v.optional(v.id("players")),
    cachedAt: v.number(),
  })
    .index("by_statsbomb_id", ["statsbombPlayerId"])
    .index("by_player", ["playerId"]),
});
```

### 📊 Database Queries

#### `convex/ai/playerAiQueries.ts`

```typescript
/**
 * Player AI Report Queries and View Tracking
 *
 * Public queries for fetching AI reports and mutations for tracking views.
 */

import { v } from "convex/values";
import { query, mutation, internalMutation, internalQuery } from "../_generated/server";
import { aiWindowValidator } from "./buildPlayerAiInput";
import type { Doc } from "../_generated/dataModel";
import { requireAuth } from "../lib/auth";

// ============================================================================
// Public Queries
// ============================================================================

/**
 * Get AI report for a player
 */
export const getReport = query({
  args: {
    playerId: v.id("players"),
    window: v.optional(aiWindowValidator),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const window = args.window ?? "365";
    const locale = args.locale ?? "nl";

    const report = await ctx.db
      .query("playerAiReports")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", window).eq("locale", locale)
      )
      .first();

    if (!report) return null;

    return {
      shortDescription: report.shortDescription,
      longDescription: report.longDescription,
      archetype: report.archetype,
      playstyleTags: report.playstyleTags,
      strengths: report.strengths,
      weaknesses: report.weaknesses,
      confidence: report.confidence,
      generatedAt: report.generatedAt,
      model: report.model,
      window: report.window,
    };
  },
});

/**
 * Check if a report exists and its freshness
 */
export const getReportStatus = query({
  args: {
    playerId: v.id("players"),
    window: v.optional(aiWindowValidator),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const window = args.window ?? "365";
    const locale = args.locale ?? "nl";

    // Check for existing report
    const report = await ctx.db
      .query("playerAiReports")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", window).eq("locale", locale)
      )
      .first();

    // Check for pending job
    const job = await ctx.db
      .query("playerAiJobs")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", window).eq("locale", locale)
      )
      .first();

    return {
      hasReport: !!report,
      generatedAt: report?.generatedAt,
      isStale: report ? Date.now() - report.generatedAt > 7 * 24 * 60 * 60 * 1000 : false, // > 7 days
      jobStatus: job?.status,
      jobError: job?.lastError,
    };
  },
});

// ============================================================================
// View Tracking
// ============================================================================

/**
 * Track a player profile view (public mutation)
 * Called from the player profile page to record views for AI prioritization
 */
export const trackView = mutation({
  args: {
    playerId: v.id("players"),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    // Verify player exists
    const player = await ctx.db.get(args.playerId);
    if (!player) return;

    const now = new Date();
    const dayKey = now.toISOString().split("T")[0]; // "YYYY-MM-DD"

    // Find existing view record for today
    const existing = await ctx.db
      .query("playerViewsDaily")
      .withIndex("by_day_player", (q) =>
        q.eq("dayKey", dayKey).eq("playerId", args.playerId)
      )
      .first();

    if (existing) {
      // Increment existing
      await ctx.db.patch(existing._id, {
        views: existing.views + 1,
      });
    } else {
      // Create new record
      await ctx.db.insert("playerViewsDaily", {
        dayKey,
        playerId: args.playerId,
        views: 1,
      });
    }
  },
});

/**
 * Request AI report generation (public mutation with rate limiting)
 * Used for lazy generation when a user views a player without a report
 */
export const requestReport = mutation({
  args: {
    playerId: v.id("players"),
    window: v.optional(aiWindowValidator),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const window = args.window ?? "365";
    const locale = args.locale ?? "nl";

    // Check if player exists and has enough minutes
    const player = await ctx.db.get(args.playerId);
    if (!player) {
      return { success: false, error: "Player not found" };
    }

    // Get rolling stats to check minutes
    const stats = await ctx.db
      .query("playerRollingStats")
      .withIndex("by_player_competition", (q) =>
        q.eq("playerId", args.playerId)
      )
      .first();

    if (!stats || stats.minutes < 90) {
      return { success: false, error: "Insufficient minutes played" };
    }

    // Check if report already exists
    const existingReport = await ctx.db
      .query("playerAiReports")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", window).eq("locale", locale)
      )
      .first();

    if (existingReport) {
      return { success: true, cached: true };
    }

    // Check if job already exists and is recent
    const existingJob = await ctx.db
      .query("playerAiJobs")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", window).eq("locale", locale)
      )
      .first();

    const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000;

    if (existingJob) {
      // If job is running or was recently updated, don't create another
      if (
        existingJob.status === "running" ||
        (existingJob.status === "queued" && existingJob.updatedAt > fiveMinutesAgo)
      ) {
        return { success: true, queued: true, jobId: existingJob._id };
      }

      // If too many attempts, don't retry
      if (existingJob.attempts >= 3) {
        return { success: false, error: "Too many failed attempts" };
      }
    }

    // Create/update job as queued
    if (existingJob) {
      await ctx.db.patch(existingJob._id, {
        status: "queued",
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("playerAiJobs", {
        playerId: args.playerId,
        window,
        locale,
        status: "queued",
        lockedUntil: 0,
        attempts: 0,
        updatedAt: now,
      });
    }

    return { success: true, queued: true };
  },
});

// ============================================================================
// Internal Queries for Cron Jobs
// ============================================================================

/**
 * Get top viewed players for a date range
 */
export const getTopViewedPlayers = internalQuery({
  args: {
    dayKey: v.string(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    // Get all views for the day, sorted by views descending
    const views = await ctx.db
      .query("playerViewsDaily")
      .withIndex("by_day_views", (q) => q.eq("dayKey", args.dayKey))
      .order("desc")
      .take(args.limit * 2); // Take extra in case some don't qualify

    // Filter to players with sufficient minutes
    const qualifiedPlayers: Array<{ playerId: Doc<"players">["_id"]; views: number }> = [];

    for (const view of views) {
      if (qualifiedPlayers.length >= args.limit) break;

      const stats = await ctx.db
        .query("playerRollingStats")
        .withIndex("by_player_competition", (q) =>
          q.eq("playerId", view.playerId)
        )
        .first();

      if (stats && stats.minutes >= 90) {
        qualifiedPlayers.push({
          playerId: view.playerId,
          views: view.views,
        });
      }
    }

    return qualifiedPlayers;
  },
});

/**
 * Get top rated players without AI reports
 */
export const getTopRatedWithoutReports = internalQuery({
  args: {
    locale: v.string(),
    window: aiWindowValidator,
    limit: v.number(),
    minMinutes: v.number(),
  },
  handler: async (ctx, args) => {
    // Get all player ratings sorted by rating
    const ratings = await ctx.db
      .query("playerRatings")
      .withIndex("by_positionGroup_rating")
      .order("desc")
      .take(args.limit * 3); // Take extra to filter

    const candidates: Array<{
      playerId: Doc<"players">["_id"];
      rating: number;
    }> = [];

    for (const rating of ratings) {
      if (candidates.length >= args.limit) break;

      // Check if report already exists
      const existingReport = await ctx.db
        .query("playerAiReports")
        .withIndex("by_player_window_locale", (q) =>
          q
            .eq("playerId", rating.playerId)
            .eq("window", args.window)
            .eq("locale", args.locale)
        )
        .first();

      if (existingReport) continue;

      // Check minutes
      const stats = await ctx.db
        .query("playerRollingStats")
        .withIndex("by_player_competition", (q) =>
          q.eq("playerId", rating.playerId)
        )
        .first();

      if (!stats || stats.minutes < args.minMinutes) continue;

      candidates.push({
        playerId: rating.playerId,
        rating: args.window === "365" ? rating.rating365 : rating.ratingLast5,
      });
    }

    return candidates;
  },
});

/**
 * Queued job type for batch processing
 */
interface QueuedJob {
  playerId: string;
  window: "365" | "last5";
  locale: string;
}

/**
 * Get queued jobs that need processing
 */
export const getQueuedJobs = internalQuery({
  args: {
    limit: v.number(),
  },
  handler: async (ctx, args): Promise<QueuedJob[]> => {
    const now = Date.now();

    // Get jobs that are queued or have expired locks
    const allJobs = await ctx.db.query("playerAiJobs").collect();

    const processable = allJobs
      .filter(
        (job) =>
          job.status === "queued" ||
          (job.status === "running" && job.lockedUntil < now)
      )
      .filter((job) => job.attempts < 3)
      .slice(0, args.limit);

    // Map to simplified type for batch processing
    return processable.map((job) => ({
      playerId: job.playerId,
      window: job.window,
      locale: job.locale,
    }));
  },
});
```

#### `convex/competitionQueries.ts`

```typescript
import { v } from "convex/values";
import { query } from "./_generated/server";
import { tierValidator } from "./schema";
import { requireAuth } from "./lib/auth";

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
    await requireAuth(ctx);

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
    await requireAuth(ctx);

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
    await requireAuth(ctx);

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
import { requireAuth } from "./lib/auth";
import type { Doc, Id } from "./_generated/dataModel";
import {
  type StatsBombExtractedFeatures,
  type StatsBombPer90Features,
} from "./ratings/statsbombFeatures";

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
    await requireAuth(ctx);

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
    await requireAuth(ctx);

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

    // Provider preference: StatsBomb > FotMob > SofaScore > API-Football
    const statsbombAgg = providerAggregates.find(
      (a) => a.provider === "statsbomb" && a.window === "season"
    );
    const fotmobAgg = providerAggregates.find(
      (a) => a.provider === "fotmob" && a.window === "career"
    );
    const sofascoreAgg = providerAggregates.find(
      (a) => a.provider === "sofascore" && a.window === "career"
    );

    // Use best available aggregate for xG/xA data
    const primaryAggregate = statsbombAgg || fotmobAgg || sofascoreAgg;
    const xGData = primaryAggregate?.additionalStats;

    // Determine data source
    const dataSource = statsbombAgg
      ? "statsbomb"
      : fotmobAgg
        ? "fotmob"
        : sofascoreAgg
          ? "sofascore"
          : "apiFootball";

    // Extract StatsBomb features if available
    // Note: For season aggregates, features already contain per-90 values from the API
    // so we use them directly instead of calling normalizeToPer90
    const statsbombFeatures = statsbombAgg?.features as
      | StatsBombExtractedFeatures
      | undefined;
    // Use the stored per90 field directly since season stats are already per-90
    const statsbombStoredPer90 = statsbombAgg?.per90 as Record<string, number | undefined> | undefined;
    // Map stored per90 to StatsBombPer90Features format
    const statsbombPer90 = statsbombFeatures ? {
      minutes: statsbombFeatures.minutes,
      // Use stored per90 values directly
      xGPer90: statsbombStoredPer90?.xG,
      npxGPer90: statsbombFeatures.npxG,
      shotsPer90: statsbombFeatures.shots,
      goalsPer90: statsbombFeatures.goals,
      xAPer90: statsbombStoredPer90?.xA,
      progressivePassesPer90: statsbombFeatures.progressivePasses,
      progressiveCarriesPer90: statsbombFeatures.progressiveCarries,
      tacklesPer90: statsbombFeatures.tackles,
      interceptionsPer90: statsbombFeatures.interceptions,
      blocksPer90: statsbombFeatures.blocks,
      clearancesPer90: statsbombFeatures.clearances,
      pressuresPer90: statsbombFeatures.pressures,
      pressuresSuccessfulPer90: statsbombFeatures.pressuresSuccessful,
      shotCreatingActionsPer90: statsbombFeatures.shotCreatingActions,
      goalCreatingActionsPer90: statsbombFeatures.goalCreatingActions,
      // Rates (already normalized)
      pressureSuccessRate: statsbombFeatures.pressureSuccessRate,
      // OBV values are already per-90 from API
      obvPer90: statsbombFeatures.obv,
      obvPassPer90: statsbombFeatures.obvPass,
      obvShotPer90: statsbombFeatures.obvShot,
      obvDefensiveActionPer90: statsbombFeatures.obvDefensiveAction,
      obvDribbleCarryPer90: statsbombFeatures.obvDribbleCarry,
      obvGkPer90: statsbombFeatures.obvGk,
    } : null;

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
      stats: {
        // Prefer StatsBomb minutes if available, otherwise use rolling stats
        minutes: statsbombAgg?.minutes ?? rollingStats?.minutes ?? 0,
        fromDate: rollingStats?.fromDate ?? null,
        toDate: rollingStats?.toDate ?? null,
        // Prefer StatsBomb totals/per90 if available
        totals: statsbombAgg?.totals ?? rollingStats?.totals ?? null,
        per90: statsbombPer90 ?? rollingStats?.per90 ?? null,
        last5: rollingStats?.last5 ?? null,
        // Track which provider supplied the primary stats
        dataSource,
      },
      rating: rating
        ? {
            rating365: rating.rating365,
            ratingLast5: rating.ratingLast5,
            levelScore: rating.levelScore,
            tier: rating.tier,
          }
        : null,
      // xG/xA from enrichment providers (StatsBomb > FotMob > SofaScore)
      advancedStats: xGData
        ? {
            xG: xGData.xG,
            xA: xGData.xA,
            xGPer90: xGData.xGPer90,
            xAPer90: xGData.xAPer90,
            npxG: xGData.npxG,
            dataSource: primaryAggregate?.provider ?? null,
          }
        : null,
      // StatsBomb-specific advanced stats (OBV, progressive actions, etc.)
      statsbombStats: statsbombFeatures
        ? {
            // On-Ball Value metrics
            obv: statsbombFeatures.obv,
            obvPer90: statsbombPer90?.obvPer90,
            obvPass: statsbombFeatures.obvPass,
            obvShot: statsbombFeatures.obvShot,
            obvDefensiveAction: statsbombFeatures.obvDefensiveAction,
            obvDribbleCarry: statsbombFeatures.obvDribbleCarry,
            // Progressive actions
            progressivePasses: statsbombFeatures.progressivePasses,
            progressivePassesPer90: statsbombPer90?.progressivePassesPer90,
            progressiveCarries: statsbombFeatures.progressiveCarries,
            progressiveCarriesPer90: statsbombPer90?.progressiveCarriesPer90,
            // Pressure stats
            pressures: statsbombFeatures.pressures,
            pressuresPer90: statsbombPer90?.pressuresPer90,
            pressuresSuccessful: statsbombFeatures.pressuresSuccessful,
            pressureSuccessRate: statsbombFeatures.pressureSuccessRate,
            // Creating
            shotCreatingActions: statsbombFeatures.shotCreatingActions,
            shotCreatingActionsPer90: statsbombPer90?.shotCreatingActionsPer90,
            goalCreatingActions: statsbombFeatures.goalCreatingActions,
            goalCreatingActionsPer90: statsbombPer90?.goalCreatingActionsPer90,
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
import { requireAuth } from "./lib/auth";
import type { Id } from "./_generated/dataModel";
import { tierValidator } from "./schema";
import type { IngestionResult } from "./ingest/apiFootballIngest";
import type { DailyIngestionResult } from "./ingest/cronRunner";
import {
  fetchTeamsByLeague,
  fetchPlayersByLeague,
} from "./providers/apiFootball";
import { getCurrentFootballSeason } from "./lib/metrics";

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
    const season = args.season || getCurrentFootballSeason();
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

/**
 * Manually trigger a StatsBomb sync run
 *
 * Run from dashboard: internal.admin.adminRunStatsBombSyncNow
 * Args: {}
 */
export const adminRunStatsBombSyncNow = internalAction({
  args: {},
  handler: async (ctx) => {
    console.log("[Admin] Running StatsBomb sync...");

    const result = await ctx.runAction(
      internal.ingest.statsbombIngest.runDailySync,
      {}
    );

    console.log("[Admin] StatsBomb sync result:", result);
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
    await requireAuth(ctx);

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
    await requireAuth(ctx);

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
    await requireAuth(ctx);

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
    await requireAuth(ctx);

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
    await requireAuth(ctx);

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
    await requireAuth(ctx);

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
    await requireAuth(ctx);

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
    await requireAuth(ctx);

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
    await requireAuth(ctx);

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

// ============================================================================
// AI Report Management
// ============================================================================

/**
 * Manually generate an AI report for a specific player
 *
 * Run from dashboard: internal.admin.adminGenerateAiReport
 * Args: { "playerId": "...", "window": "365", "forceRegenerate": false }
 */
export const adminGenerateAiReport = internalAction({
  args: {
    playerId: v.id("players"),
    window: v.optional(v.union(v.literal("365"), v.literal("last5"))),
    locale: v.optional(v.string()),
    forceRegenerate: v.optional(v.boolean()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    report?: unknown;
    cached?: boolean;
    error?: string;
  }> => {
    const window = args.window ?? "365";
    const locale = args.locale ?? "nl";

    console.log(
      `[Admin] Generating AI report for player ${args.playerId}, window: ${window}, locale: ${locale}`
    );

    const result: {
      success: boolean;
      report?: unknown;
      cached?: boolean;
      error?: string;
    } = await ctx.runAction(
      internal.ai.generatePlayerReport.generateReport,
      {
        playerId: args.playerId,
        window,
        locale,
        forceRegenerate: args.forceRegenerate ?? false,
      }
    );

    console.log("[Admin] AI generation result:", {
      success: result.success,
      cached: result.cached,
      error: result.error,
    });

    return result;
  },
});

/**
 * Manually run the daily AI batch job
 *
 * Run from dashboard: internal.admin.adminRunAiBatchNow
 */
interface AiBatchResult {
  success: boolean;
  totalProcessed: number;
  reportsGenerated: number;
  cacheHits: number;
  errors: number;
  errorDetails: string[];
}

export const adminRunAiBatchNow = internalAction({
  args: {},
  handler: async (ctx): Promise<AiBatchResult> => {
    console.log("[Admin] Manually triggering AI batch job");

    const result: AiBatchResult = await ctx.runAction(
      internal.ai.aiCronRunner.runDailyAiBatch,
      {}
    );

    console.log("[Admin] AI batch result:", result);
    return result;
  },
});

/**
 * Get AI report statistics
 */
export const getAiReportStats = query({
  args: {},
  handler: async (ctx) => {
    await requireAuth(ctx);

    const [reports, jobs, usageLogs, viewsDaily] = await Promise.all([
      ctx.db.query("playerAiReports").collect(),
      ctx.db.query("playerAiJobs").collect(),
      ctx.db.query("aiUsageLogs").collect(),
      ctx.db.query("playerViewsDaily").collect(),
    ]);

    // Reports by model
    const reportsByModel: Record<string, number> = {};
    for (const report of reports) {
      reportsByModel[report.model] = (reportsByModel[report.model] || 0) + 1;
    }

    // Reports by window
    const reportsByWindow: Record<string, number> = {};
    for (const report of reports) {
      reportsByWindow[report.window] = (reportsByWindow[report.window] || 0) + 1;
    }

    // Jobs by status
    const jobsByStatus: Record<string, number> = {};
    for (const job of jobs) {
      jobsByStatus[job.status] = (jobsByStatus[job.status] || 0) + 1;
    }

    // Usage logs in last 24h
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentLogs = usageLogs.filter((log) => log.createdAt > oneDayAgo);
    const successfulLogs = recentLogs.filter((log) => log.success);
    const failedLogs = recentLogs.filter((log) => !log.success);

    // Average confidence
    const avgConfidence = reports.length > 0
      ? reports.reduce((sum, r) => sum + r.confidence, 0) / reports.length
      : 0;

    // Top viewed players today
    const today = new Date().toISOString().split("T")[0];
    const todayViews = viewsDaily
      .filter((v) => v.dayKey === today)
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    return {
      totalReports: reports.length,
      reportsByModel,
      reportsByWindow,
      avgConfidence: avgConfidence.toFixed(2),
      totalJobs: jobs.length,
      jobsByStatus,
      usageLast24h: {
        total: recentLogs.length,
        successful: successfulLogs.length,
        failed: failedLogs.length,
      },
      topViewedToday: todayViews.map((v) => ({
        playerId: v.playerId,
        views: v.views,
      })),
    };
  },
});

/**
 * List AI reports with player info
 */
export const listAiReports = query({
  args: {
    limit: v.optional(v.number()),
    window: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx);

    const limit = args.limit ?? 50;

    let reports = await ctx.db.query("playerAiReports").collect();

    if (args.window) {
      reports = reports.filter((r) => r.window === args.window);
    }

    // Sort by generatedAt descending
    reports.sort((a, b) => b.generatedAt - a.generatedAt);

    // Get player names
    const playerIds = [...new Set(reports.map((r) => r.playerId))];
    const players = await Promise.all(playerIds.map((id) => ctx.db.get(id)));
    const playerMap = new Map(players.filter(Boolean).map((p) => [p!._id, p!]));

    return reports.slice(0, limit).map((r) => ({
      _id: r._id,
      playerId: r.playerId,
      playerName: playerMap.get(r.playerId)?.name ?? "Unknown",
      window: r.window,
      locale: r.locale,
      archetype: r.archetype,
      confidence: r.confidence,
      model: r.model,
      generatedAt: new Date(r.generatedAt).toISOString(),
    }));
  },
});

/**
 * Delete an AI report (for testing/cleanup)
 */
export const deleteAiReport = internalMutation({
  args: {
    reportId: v.id("playerAiReports"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.reportId);
    console.log(`[Admin] Deleted AI report ${args.reportId}`);
    return { success: true };
  },
});

/**
 * Clear all AI reports for a player (for testing)
 */
export const clearPlayerAiReports = internalMutation({
  args: {
    playerId: v.id("players"),
  },
  handler: async (ctx, args) => {
    const reports = await ctx.db
      .query("playerAiReports")
      .filter((q) => q.eq(q.field("playerId"), args.playerId))
      .collect();

    for (const report of reports) {
      await ctx.db.delete(report._id);
    }

    // Also clear jobs
    const jobs = await ctx.db
      .query("playerAiJobs")
      .filter((q) => q.eq(q.field("playerId"), args.playerId))
      .collect();

    for (const job of jobs) {
      await ctx.db.delete(job._id);
    }

    console.log(`[Admin] Cleared ${reports.length} reports and ${jobs.length} jobs for player ${args.playerId}`);
    return { reportsDeleted: reports.length, jobsDeleted: jobs.length };
  },
});

// ============================================================================
// OpenAI Batch API Management
// ============================================================================

/**
 * Create an OpenAI Batch for AI report generation
 * This uses the OpenAI Batch API for 50% cost savings on bulk generation.
 *
 * Run from dashboard: internal.admin.adminCreateAiBatch
 * Args: { "window": "365", "locale": "nl", "minMinutes": 90, "limit": 100 }
 */
export const adminCreateAiBatch = internalAction({
  args: {
    window: v.optional(v.union(v.literal("365"), v.literal("last5"))),
    locale: v.optional(v.string()),
    minMinutes: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    batchId?: string;
    totalRequests?: number;
    skipped?: number;
    error?: string;
  }> => {
    const window = args.window ?? "365";
    const locale = args.locale ?? "nl";

    console.log(
      `[Admin] Creating AI batch for window: ${window}, locale: ${locale}, minMinutes: ${args.minMinutes ?? 90}, limit: ${args.limit ?? 1000}`
    );

    const result = await ctx.runAction(
      internal.ai.batchApi.createBatch,
      {
        window,
        locale,
        minMinutes: args.minMinutes,
        limit: args.limit,
      }
    );

    console.log("[Admin] Batch creation result:", result);
    return result;
  },
});

/**
 * Check the status of an OpenAI batch job
 *
 * Run from dashboard: internal.admin.adminCheckAiBatch
 * Args: { "batchId": "batch_..." }
 */
export const adminCheckAiBatch = internalAction({
  args: {
    batchId: v.string(),
  },
  handler: async (ctx, args): Promise<{
    status: string;
    completed: number;
    failed: number;
    total: number;
    outputFileId?: string;
  }> => {
    console.log(`[Admin] Checking batch status: ${args.batchId}`);

    const result = await ctx.runAction(
      internal.ai.batchApi.checkBatch,
      { batchId: args.batchId }
    );

    console.log("[Admin] Batch status:", result);
    return result;
  },
});

/**
 * Process completed batch results and upsert AI reports
 *
 * Run from dashboard: internal.admin.adminProcessBatchResults
 * Args: { "batchId": "batch_..." }
 */
export const adminProcessBatchResults = internalAction({
  args: {
    batchId: v.string(),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    processed: number;
    failed: number;
    error?: string;
  }> => {
    console.log(`[Admin] Processing batch results: ${args.batchId}`);

    const result = await ctx.runAction(
      internal.ai.batchApi.processBatchResults,
      { batchId: args.batchId }
    );

    console.log("[Admin] Batch processing result:", result);
    return result;
  },
});

/**
 * List all batch jobs
 */
export const listBatchJobs = query({
  args: {},
  handler: async (ctx) => {
    await requireAuth(ctx);

    const jobs = await ctx.db
      .query("aiBatchJobs")
      .order("desc")
      .take(20);

    return jobs.map((j) => ({
      _id: j._id,
      batchId: j.batchId,
      status: j.status,
      window: j.window,
      locale: j.locale,
      totalRequests: j.totalRequests,
      completedRequests: j.completedRequests,
      failedRequests: j.failedRequests,
      createdAt: new Date(j.createdAt).toISOString(),
      completedAt: j.completedAt ? new Date(j.completedAt).toISOString() : null,
    }));
  },
});

// ============================================================================
// StatsBomb Coverage Statistics
// ============================================================================

/**
 * Internal version - Get StatsBomb data coverage statistics (no auth required)
 * Run from CLI: npx convex run admin:internalGetStatsBombCoverage
 */
export const internalGetStatsBombCoverage = internalQuery({
  args: {},
  handler: async (ctx) => {
    const [
      players,
      statsbombIds,
      aggregates,
      matches,
      competitionSeasons,
      mappings,
    ] = await Promise.all([
      ctx.db.query("players").collect(),
      ctx.db
        .query("playerExternalIds")
        .filter((q) => q.eq(q.field("provider"), "statsbomb"))
        .collect(),
      ctx.db
        .query("providerPlayerAggregates")
        .filter((q) => q.eq(q.field("provider"), "statsbomb"))
        .collect(),
      ctx.db.query("statsbombMatches").collect(),
      ctx.db.query("statsbombCompetitionSeasons").collect(),
      ctx.db.query("statsbombPlayerMappings").collect(),
    ]);

    // Count players with season aggregates
    const playersWithSeasonStats = new Set(
      aggregates.filter((a) => a.window === "season").map((a) => a.playerId)
    );

    // Count players with match stats
    const matchStatsPlayers = await ctx.db
      .query("providerPlayerMatchStats")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .collect();
    const playersWithMatchStats = new Set(matchStatsPlayers.map((m) => m.playerId));

    // Match ingestion status
    const matchesIngested = matches.filter((m) => m.playerStatsIngested).length;
    const matchesPending = matches.filter(
      (m) => !m.playerStatsIngested && m.status === "available"
    ).length;

    // Competition coverage
    const competitionCoverage = competitionSeasons.map((cs) => ({
      name: cs.name,
      country: cs.country,
      season: cs.season,
      syncStatus: cs.syncStatus,
      matchCount: cs.matchCount ?? 0,
    }));

    // Linked vs unlinked mappings
    const linkedMappings = mappings.filter((m) => m.playerId != null).length;
    const unlinkedMappings = mappings.filter((m) => m.playerId == null).length;

    return {
      totalPlayers: players.length,
      playersWithStatsBombId: statsbombIds.length,
      playersWithSeasonStats: playersWithSeasonStats.size,
      playersWithMatchStats: playersWithMatchStats.size,
      coveragePercent:
        players.length > 0
          ? ((statsbombIds.length / players.length) * 100).toFixed(1)
          : "0",
      totalMatches: matches.length,
      matchesIngested,
      matchesPending,
      matchesUnavailable: matches.length - matchesIngested - matchesPending,
      totalMappings: mappings.length,
      linkedMappings,
      unlinkedMappings,
      competitionSeasons: competitionCoverage,
    };
  },
});

/**
 * Get StatsBomb data coverage statistics
 * Shows how many players have StatsBomb data vs API-Football only
 */
export const getStatsBombCoverageStats = query({
  args: {},
  handler: async (ctx) => {
    await requireAuth(ctx);

    const [
      players,
      statsbombIds,
      aggregates,
      matches,
      competitionSeasons,
      mappings,
    ] = await Promise.all([
      ctx.db.query("players").collect(),
      ctx.db
        .query("playerExternalIds")
        .filter((q) => q.eq(q.field("provider"), "statsbomb"))
        .collect(),
      ctx.db
        .query("providerPlayerAggregates")
        .filter((q) => q.eq(q.field("provider"), "statsbomb"))
        .collect(),
      ctx.db.query("statsbombMatches").collect(),
      ctx.db.query("statsbombCompetitionSeasons").collect(),
      ctx.db.query("statsbombPlayerMappings").collect(),
    ]);

    // Count players with season aggregates
    const playersWithSeasonStats = new Set(
      aggregates.filter((a) => a.window === "season").map((a) => a.playerId)
    );

    // Count players with match stats
    const matchStatsPlayers = await ctx.db
      .query("providerPlayerMatchStats")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .collect();
    const playersWithMatchStats = new Set(matchStatsPlayers.map((m) => m.playerId));

    // Match ingestion status
    const matchesIngested = matches.filter((m) => m.playerStatsIngested).length;
    const matchesPending = matches.filter(
      (m) => !m.playerStatsIngested && m.status === "available"
    ).length;

    // Competition coverage
    const competitionCoverage = competitionSeasons.map((cs) => ({
      name: cs.name,
      country: cs.country,
      season: cs.season,
      syncStatus: cs.syncStatus,
      matchCount: cs.matchCount ?? 0,
    }));

    // Linked vs unlinked mappings
    const linkedMappings = mappings.filter((m) => m.playerId != null).length;
    const unlinkedMappings = mappings.filter((m) => m.playerId == null).length;

    return {
      // Player coverage
      totalPlayers: players.length,
      playersWithStatsBombId: statsbombIds.length,
      playersWithSeasonStats: playersWithSeasonStats.size,
      playersWithMatchStats: playersWithMatchStats.size,
      coveragePercent:
        players.length > 0
          ? ((statsbombIds.length / players.length) * 100).toFixed(1)
          : "0",

      // Match coverage
      totalMatches: matches.length,
      matchesIngested,
      matchesPending,
      matchesUnavailable: matches.length - matchesIngested - matchesPending,

      // Mapping coverage
      totalMappings: mappings.length,
      linkedMappings,
      unlinkedMappings,

      // Competition coverage
      competitionSeasons: competitionCoverage,
    };
  },
});

/**
 * Get a sample player with full StatsBomb data for testing
 */
export const getSamplePlayerWithStats = internalQuery({
  args: { playerName: v.optional(v.string()) },
  handler: async (ctx, { playerName }) => {
    // If player name provided, search for that player
    let statsbombPlayer;
    if (playerName) {
      statsbombPlayer = await ctx.db
        .query("players")
        .filter((q) =>
          q.and(
            q.eq(q.field("provider"), "statsbomb"),
            q.eq(q.field("name"), playerName)
          )
        )
        .first();
    } else {
      // Get a player that was created FROM StatsBomb (not the first one)
      const players = await ctx.db
        .query("players")
        .filter((q) => q.eq(q.field("provider"), "statsbomb"))
        .take(10);
      statsbombPlayer = players[5]; // Get 6th player to avoid debug-modified ones
    }

    if (!statsbombPlayer) {
      return { error: "No StatsBomb player found" };
    }

    // Get a player with StatsBomb external ID
    const externalId = await ctx.db
      .query("playerExternalIds")
      .filter((q) =>
        q.and(
          q.eq(q.field("provider"), "statsbomb"),
          q.eq(q.field("playerId"), statsbombPlayer._id)
        )
      )
      .first();

    if (!externalId) {
      return { error: "No StatsBomb player found" };
    }

    const player = await ctx.db.get(externalId.playerId);
    if (!player) {
      return { error: "Player not found" };
    }

    // Get season aggregates
    const seasonAgg = await ctx.db
      .query("providerPlayerAggregates")
      .filter((q) =>
        q.and(
          q.eq(q.field("playerId"), externalId.playerId),
          q.eq(q.field("provider"), "statsbomb"),
          q.eq(q.field("window"), "season")
        )
      )
      .first();

    // Get team and competition
    const [team, competition] = await Promise.all([
      ctx.db.get(player.teamId),
      ctx.db.get(player.competitionId),
    ]);

    return {
      player: {
        id: player._id,
        name: player.name,
        position: player.position,
        positionGroup: player.positionGroup,
        provider: player.provider,
        team: team?.name,
        competition: competition?.name,
      },
      statsbombStats: seasonAgg
        ? {
            season: seasonAgg.season,
            minutes: seasonAgg.minutes,
            appearances: seasonAgg.appearances,
            totals: seasonAgg.totals,
            per90: seasonAgg.per90,
            additionalStats: seasonAgg.additionalStats,
            // Include extracted features to see full data
            features: seasonAgg.features,
            // Show specific values for goals, xg, obv from raw
            rawValues: seasonAgg.raw
              ? {
                  goals_90: (seasonAgg.raw as Record<string, unknown>).player_season_goals_90,
                  np_xg_90: (seasonAgg.raw as Record<string, unknown>).player_season_np_xg_90,
                  obv_90: (seasonAgg.raw as Record<string, unknown>).player_season_obv_90,
                  minutes: (seasonAgg.raw as Record<string, unknown>).player_season_minutes,
                  appearances: (seasonAgg.raw as Record<string, unknown>).player_season_appearances,
                  // Check field existence
                  hasObvField: "player_season_obv_90" in (seasonAgg.raw as Record<string, unknown>),
                  rawFieldCount: Object.keys(seasonAgg.raw as Record<string, unknown>).length,
                }
              : null,
          }
        : null,
    };
  },
});

/**
 * Debug query to check external IDs and season stats
 */
export const countStatsBombExternalIds = internalQuery({
  args: { type: v.optional(v.union(v.literal("externalIds"), v.literal("seasonAggs"))) },
  handler: async (ctx, { type = "externalIds" }) => {
    // Count using take() in batches
    const BATCH_SIZE = 500;

    if (type === "externalIds") {
      let count = 0;
      let batch;
      do {
        batch = await ctx.db
          .query("playerExternalIds")
          .filter((q) => q.eq(q.field("provider"), "statsbomb"))
          .take(BATCH_SIZE);
        count = batch.length;
      } while (false);  // Just one batch
      return { totalExternalIds: count, note: "Sample of first 500" };
    } else {
      const batch = await ctx.db
        .query("providerPlayerAggregates")
        .filter((q) =>
          q.and(
            q.eq(q.field("provider"), "statsbomb"),
            q.eq(q.field("window"), "season")
          )
        )
        .take(BATCH_SIZE);
      return { totalSeasonAggregates: batch.length, note: "Sample of first 500" };
    }
  },
});

export const debugStatsBombData = internalQuery({
  args: {},
  handler: async (ctx) => {
    // Get some StatsBomb external IDs
    const statsbombExternalIds = await ctx.db
      .query("playerExternalIds")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .take(10);

    // Get some StatsBomb season aggregates
    const statsbombSeasonAggs = await ctx.db
      .query("providerPlayerAggregates")
      .filter((q) =>
        q.and(
          q.eq(q.field("provider"), "statsbomb"),
          q.eq(q.field("window"), "season")
        )
      )
      .take(10);

    // Get player names for the external IDs
    const playerIds = statsbombExternalIds.map((e) => e.playerId);
    const players = await Promise.all(
      playerIds.map((id) => ctx.db.get(id))
    );

    return {
      externalIds: statsbombExternalIds.map((e, i) => ({
        providerPlayerId: e.providerPlayerId,
        playerId: e.playerId,
        playerName: players[i]?.name,
      })),
      seasonAggregates: statsbombSeasonAggs.map((a) => ({
        playerId: a.playerId,
        season: a.season,
        minutes: a.minutes,
        hasFeatures: !!a.features,
      })),
      totalExternalIds: statsbombExternalIds.length,
      totalSeasonAggs: statsbombSeasonAggs.length,
    };
  },
});

import * as StatsBomb from "./providers/statsbomb";

/**
 * Delete StatsBomb season aggregates in batches
 */
export const deleteStatsBombSeasonAggregates = internalMutation({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 100 }) => {
    const aggregates = await ctx.db
      .query("providerPlayerAggregates")
      .filter((q) =>
        q.and(
          q.eq(q.field("provider"), "statsbomb"),
          q.eq(q.field("window"), "season")
        )
      )
      .take(limit);

    for (const agg of aggregates) {
      await ctx.db.delete(agg._id);
    }

    return { deleted: aggregates.length, hasMore: aggregates.length === limit };
  },
});

/**
 * Test feature extraction directly
 */
export const testFeatureExtraction = internalQuery({
  args: {},
  handler: async (ctx) => {
    // Get a season aggregate with raw data
    const seasonAgg = await ctx.db
      .query("providerPlayerAggregates")
      .filter((q) =>
        q.and(
          q.eq(q.field("provider"), "statsbomb"),
          q.eq(q.field("window"), "season")
        )
      )
      .first();

    if (!seasonAgg?.raw) {
      return { error: "No season aggregate with raw data found" };
    }

    const raw = seasonAgg.raw as Record<string, unknown>;

    // Manually extract the values using the same logic as extractSeasonRatingFeatures
    return {
      extractedValues: {
        goals: raw.player_season_goals_90,
        npxG: raw.player_season_np_xg_90,
        obv: raw.player_season_obv_90,
        obvPass: raw.player_season_obv_pass_90,
        assists: raw.player_season_assists_90,
        tackles: raw.player_season_tackles_90,
        interceptions: raw.player_season_interceptions_90,
        progressivePasses: raw.player_season_progressive_passes_90,
      },
      storedFeatures: seasonAgg.features,
      storedPer90: seasonAgg.per90,
      storedAdditionalStats: seasonAgg.additionalStats,
    };
  },
});

/**
 * Debug action to test season stats API and catch specific errors
 */
export const debugSeasonStatsApi = internalAction({
  args: {},
  handler: async (ctx) => {
    // Get the first active competition season
    const competitionSeasons = await ctx.runQuery(
      internal.ingest.statsbombIngest.getActiveCompetitionSeasons
    );

    const cs = competitionSeasons.find((c) => c.competitionId);
    if (!cs) {
      return { error: "No linked competition season found" };
    }

    // Fetch a sample of season stats
    const seasonStats = await StatsBomb.fetchSeasonPlayerStats(
      cs.statsbombCompetitionId,
      cs.statsbombSeasonId
    );

    // Try to process the second player (first one already exists) to catch any error
    const stat = seasonStats[1];

    try {
      // Check if player is linked
      const externalId = await ctx.runQuery(
        internal.ingest.statsbombIngest.getStatsBombExternalId,
        { statsbombPlayerId: stat.player_id }
      );

      if (!externalId) {
        return {
          error: "Player not found in external IDs",
          player_id: stat.player_id,
          player_name: stat.player_name,
        };
      }

      // Simple test - just call upsert with minimal data
      const minutes = stat.player_season_minutes ?? 0;
      const appearances = stat.player_season_appearances ?? 0;

      // Try to upsert with minimal data (using schema-compatible field names)
      const result = await ctx.runMutation(
        internal.ingest.statsbombIngest.upsertSeasonAggregates,
        {
          playerId: externalId.playerId,
          competitionId: cs.competitionId,
          season: cs.season,
          minutes: minutes,
          appearances: appearances,
          totals: { appearances: appearances, goals: 0 },  // totals requires appearances
          per90: { goals: 0 },
          additionalStats: {},
          raw: stat,
          features: {},
        }
      );

      return {
        success: true,
        player: stat.player_name,
        result,
      };
    } catch (error) {
      return {
        error: String(error),
        player: stat.player_name,
        player_id: stat.player_id,
        stack: error instanceof Error ? error.stack : undefined,
      };
    }
  },
});

// ============================================================================
// Sample Data Export for Context Generation
// ============================================================================

/**
 * Export sample data from all tables for context generation.
 * Returns up to 20 records per table.
 *
 * Usage: npx convex run admin:exportSampleData --prod
 */
export const exportSampleData = query({
  args: {},
  handler: async (ctx) => {
    const limit = 20;

    // Helper to safely query and return sample data
    const getSamples = async <T>(
      tableName: string,
      queryFn: () => Promise<T[]>
    ): Promise<{ table: string; count: number; samples: T[] }> => {
      try {
        const samples = await queryFn();
        return { table: tableName, count: samples.length, samples };
      } catch {
        return { table: tableName, count: 0, samples: [] };
      }
    };

    // Query each table for sample data
    const [
      competitions,
      teams,
      players,
      appearances,
      playerRollingStats,
      ratingProfiles,
      playerRatings,
      competitionRatings,
      ingestionRuns,
      playerExternalIds,
      providerPlayerProfiles,
      providerPlayerAggregates,
      playerAiReports,
      statsbombCompetitionSeasons,
      statsbombMatches,
      statsbombPlayerMappings,
    ] = await Promise.all([
      getSamples("competitions", () => ctx.db.query("competitions").take(limit)),
      getSamples("teams", () => ctx.db.query("teams").take(limit)),
      getSamples("players", () => ctx.db.query("players").take(limit)),
      getSamples("appearances", () => ctx.db.query("appearances").take(limit)),
      getSamples("playerRollingStats", () => ctx.db.query("playerRollingStats").take(limit)),
      getSamples("ratingProfiles", () => ctx.db.query("ratingProfiles").take(limit)),
      getSamples("playerRatings", () => ctx.db.query("playerRatings").take(limit)),
      getSamples("competitionRatings", () => ctx.db.query("competitionRatings").take(limit)),
      getSamples("ingestionRuns", () => ctx.db.query("ingestionRuns").take(limit)),
      getSamples("playerExternalIds", () => ctx.db.query("playerExternalIds").take(limit)),
      getSamples("providerPlayerProfiles", () => ctx.db.query("providerPlayerProfiles").take(limit)),
      getSamples("providerPlayerAggregates", () => ctx.db.query("providerPlayerAggregates").take(limit)),
      getSamples("playerAiReports", () => ctx.db.query("playerAiReports").take(limit)),
      getSamples("statsbombCompetitionSeasons", () => ctx.db.query("statsbombCompetitionSeasons").take(limit)),
      getSamples("statsbombMatches", () => ctx.db.query("statsbombMatches").take(limit)),
      getSamples("statsbombPlayerMappings", () => ctx.db.query("statsbombPlayerMappings").take(limit)),
    ]);

    return {
      exportedAt: new Date().toISOString(),
      limit,
      tables: [
        competitions,
        teams,
        players,
        appearances,
        playerRollingStats,
        ratingProfiles,
        playerRatings,
        competitionRatings,
        ingestionRuns,
        playerExternalIds,
        providerPlayerProfiles,
        providerPlayerAggregates,
        playerAiReports,
        statsbombCompetitionSeasons,
        statsbombMatches,
        statsbombPlayerMappings,
      ],
    };
  },
});
```

#### `convex/auth.config.ts`

```typescript
import { getAuthConfigProvider } from "@convex-dev/better-auth/auth-config";
import type { AuthConfig } from "convex/server";

export default {
  providers: [getAuthConfigProvider()],
} satisfies AuthConfig;
```

#### `convex/auth.ts`

```typescript
import { betterAuth } from "better-auth/minimal";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import authConfig from "./auth.config";

// Create the Better Auth component client
export const authComponent = createClient<DataModel>(components.betterAuth);

// Factory function to create auth instance with context
// Uses GenericCtx to support both query and action contexts
export function createAuth(ctx: GenericCtx<DataModel>) {
  return betterAuth({
    baseURL: process.env.SITE_URL,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      convex({ authConfig }),
      crossDomain({ siteUrl: process.env.SITE_URL! }),
    ],
  });
}

// Query to get the current authenticated user
import { query, action } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return await authComponent.getAuthUser(ctx);
  },
});

// Action to seed a user via Better Auth API
export const seedUser = action({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const auth = createAuth(ctx);

    try {
      // Use Better Auth's signUp API
      const result = await auth.api.signUpEmail({
        body: {
          email: args.email,
          password: args.password,
          name: args.name,
        },
      });

      return { success: true, user: result.user };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return { success: false, error: errorMessage };
    }
  },
});

// Action to reset user password (admin use only)
export const resetUserPassword = action({
  args: {
    email: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    const auth = createAuth(ctx);

    try {
      // Use Better Auth's internal context to update password
      const authCtx = await auth.$context;

      // Find the user by email
      const result = await authCtx.internalAdapter.findUserByEmail(args.email);
      if (!result || !result.user) {
        return { success: false, error: "User not found" };
      }

      // Hash the new password using Better Auth's password utility
      const hashedPassword = await authCtx.password.hash(args.newPassword);

      // Update the account's password
      await authCtx.internalAdapter.updatePassword(result.user.id, hashedPassword);

      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return { success: false, error: errorMessage };
    }
  },
});
```

#### `convex/convex.config.ts`

```typescript
import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const app: any = defineApp();
app.use(betterAuth);

export default app;
```

#### `convex/crons.ts`

```typescript
/**
 * Cron Jobs for Data Ingestion and AI Report Generation
 *
 * Schedules:
 * - Daily ingestion runs for API-Football data
 * - Daily AI report batch generation
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

/**
 * StatsBomb daily sync job
 *
 * Runs daily at 06:00 UTC (after API-Football ingestion)
 * 1. Syncs competition-seasons from StatsBomb catalog
 * 2. Syncs match lists for active competition-seasons
 * 3. Ingests player stats for matches with new/updated data
 *
 * Licensed competitions: Eredivisie, Keuken Kampioen Divisie, Bundesliga,
 * Jupiler Pro League, Danish Superliga
 *
 * Budget: ~200 requests (configurable via INGESTION_BUDGET)
 */
crons.daily(
  "daily-statsbomb-sync",
  { hourUTC: 6, minuteUTC: 0 },
  internal.ingest.statsbombIngest.runDailySync
);

/**
 * Daily AI report generation job
 *
 * Runs daily at 05:00 UTC (after ingestion completes)
 * 1. Processes queued lazy-generation requests
 * 2. Generates reports for top viewed players
 * 3. Fills remaining quota with top rated players
 *
 * Budget controlled by AI_PLAYER_REPORT_DAILY_LIMIT (default: 200)
 */
crons.daily(
  "daily-ai-reports",
  { hourUTC: 5, minuteUTC: 0 },
  internal.ai.aiCronRunner.runDailyAiBatch
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

#### `convex/http.ts`

```typescript
import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

// Register Better Auth routes with CORS enabled
authComponent.registerRoutes(http, createAuth, {
  cors: {
    allowedOrigins: [
      "http://localhost:3000",
      "https://footbase.app",
      "https://www.footbase.app",
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

export default http;
```

### ✨ Data enrichment logic

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

### ⭐ Player rating computation

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

#### `convex/ratings/statsbombFeatures.ts`

```typescript
/**
 * StatsBomb Feature Extraction
 *
 * Extracts rating-relevant features from raw StatsBomb match and season stats.
 * These features are used to compute player ratings.
 */

import type { StatsBombPlayerMatchStats, StatsBombSeasonPlayerStats } from "../providers/statsbomb";

// ============================================================================
// Types
// ============================================================================

/**
 * Extracted features for rating computation
 * All values are raw totals (not per-90)
 */
export interface StatsBombExtractedFeatures {
  // Minutes
  minutes: number;

  // Shooting
  xG?: number;
  npxG?: number;
  shots?: number;
  shotsOnTarget?: number;
  goals?: number;

  // Passing
  xA?: number;
  passesCompleted?: number;
  passesAttempted?: number;
  passCompletionPct?: number;
  progressivePasses?: number;
  passesIntoFinalThird?: number;
  passesIntoPenaltyArea?: number;
  throughBalls?: number;
  crossesCompleted?: number;
  keyPasses?: number;

  // Carrying
  carries?: number;
  progressiveCarries?: number;
  carriesIntoFinalThird?: number;
  carriesIntoPenaltyArea?: number;
  takeOnsAttempted?: number;
  takeOnsSuccessful?: number;
  takeOnSuccessRate?: number;

  // Creating
  shotCreatingActions?: number;
  goalCreatingActions?: number;
  assists?: number;

  // Defensive
  tackles?: number;
  tacklesWon?: number;
  interceptions?: number;
  blocks?: number;
  clearances?: number;
  aerialDuelsWon?: number;
  aerialDuelsLost?: number;
  aerialDuelWinRate?: number;

  // Pressure
  pressures?: number;
  pressuresSuccessful?: number;
  pressureSuccessRate?: number;
  pressuresInAttackingThird?: number;

  // GK
  saves?: number;
  psxG?: number;
  goalsAgainst?: number;
  savePercentage?: number;

  // OBV (On-Ball Value) - StatsBomb's proprietary player value metric
  obv?: number;
  obvPass?: number;
  obvShot?: number;
  obvDefensiveAction?: number;
  obvDribbleCarry?: number;
  obvGk?: number;
}

/**
 * Per-90 normalized features for rating
 */
export interface StatsBombPer90Features {
  minutes: number;

  // Shooting per 90
  xGPer90?: number;
  npxGPer90?: number;
  shotsPer90?: number;
  goalsPer90?: number;

  // Passing per 90
  xAPer90?: number;
  progressivePassesPer90?: number;
  passesIntoFinalThirdPer90?: number;
  keyPassesPer90?: number;

  // Carrying per 90
  progressiveCarriesPer90?: number;
  carriesIntoFinalThirdPer90?: number;
  takeOnsSuccessfulPer90?: number;

  // Creating per 90
  shotCreatingActionsPer90?: number;
  goalCreatingActionsPer90?: number;
  assistsPer90?: number;

  // Defensive per 90
  tacklesPer90?: number;
  interceptionsPer90?: number;
  blocksPer90?: number;
  clearancesPer90?: number;

  // Pressure per 90
  pressuresPer90?: number;
  pressuresSuccessfulPer90?: number;

  // Rates (already normalized)
  passCompletionPct?: number;
  takeOnSuccessRate?: number;
  aerialDuelWinRate?: number;
  pressureSuccessRate?: number;
  savePercentage?: number;

  // OBV per 90 (On-Ball Value)
  obvPer90?: number;
  obvPassPer90?: number;
  obvShotPer90?: number;
  obvDefensiveActionPer90?: number;
  obvDribbleCarryPer90?: number;
  obvGkPer90?: number;
}

// ============================================================================
// Feature Extraction Functions
// ============================================================================

/**
 * Extract features from raw StatsBomb match stats
 */
export function extractMatchFeatures(
  raw: StatsBombPlayerMatchStats
): StatsBombExtractedFeatures {
  const minutes = raw.player_match_minutes ?? 0;

  // Helper to safely get numeric values
  const num = (key: string): number | undefined => {
    const val = raw[key];
    return typeof val === "number" ? val : undefined;
  };

  // Calculate rates
  const passesAttempted = num("player_match_passes_attempted");
  const passesCompleted = num("player_match_passes_completed");
  const passCompletionPct =
    passesAttempted && passesAttempted > 0
      ? (passesCompleted ?? 0) / passesAttempted
      : undefined;

  const takeOnsAttempted = num("player_match_take_ons_attempted");
  const takeOnsSuccessful = num("player_match_take_ons_won");
  const takeOnSuccessRate =
    takeOnsAttempted && takeOnsAttempted > 0
      ? (takeOnsSuccessful ?? 0) / takeOnsAttempted
      : undefined;

  const aerialDuelsWon = num("player_match_aerials_won");
  const aerialDuelsLost = num("player_match_aerials_lost");
  const aerialDuelWinRate =
    aerialDuelsWon !== undefined && aerialDuelsLost !== undefined
      ? aerialDuelsWon / (aerialDuelsWon + aerialDuelsLost) || 0
      : undefined;

  const pressures = num("player_match_pressures");
  const pressuresSuccessful = num("player_match_pressure_regains");
  const pressureSuccessRate =
    pressures && pressures > 0
      ? (pressuresSuccessful ?? 0) / pressures
      : undefined;

  const saves = num("player_match_saves");
  const shotsOnTargetAgainst = num("player_match_shots_on_target_against");
  const savePercentage =
    shotsOnTargetAgainst && shotsOnTargetAgainst > 0
      ? (saves ?? 0) / shotsOnTargetAgainst
      : undefined;

  return {
    minutes,

    // Shooting
    xG: num("player_match_xg"),
    npxG: num("player_match_npxg"),
    shots: num("player_match_shots_total"),
    shotsOnTarget: num("player_match_shots_on_target"),
    goals: num("player_match_goals"),

    // Passing
    xA: num("player_match_xa"),
    passesCompleted,
    passesAttempted,
    passCompletionPct,
    progressivePasses: num("player_match_progressive_passes_completed"),
    passesIntoFinalThird: num("player_match_passes_into_final_third"),
    passesIntoPenaltyArea: num("player_match_passes_into_penalty_area"),
    throughBalls: num("player_match_through_balls"),
    crossesCompleted: num("player_match_crosses_completed"),
    keyPasses: num("player_match_key_passes"),

    // Carrying
    carries: num("player_match_carries"),
    progressiveCarries: num("player_match_progressive_carries"),
    carriesIntoFinalThird: num("player_match_carries_into_final_third"),
    carriesIntoPenaltyArea: num("player_match_carries_into_penalty_area"),
    takeOnsAttempted,
    takeOnsSuccessful,
    takeOnSuccessRate,

    // Creating
    shotCreatingActions: num("player_match_shot_creating_actions"),
    goalCreatingActions: num("player_match_goal_creating_actions"),
    assists: num("player_match_assists"),

    // Defensive
    tackles: num("player_match_tackles"),
    tacklesWon: num("player_match_tackles_won"),
    interceptions: num("player_match_interceptions"),
    blocks: num("player_match_blocks"),
    clearances: num("player_match_clearances"),
    aerialDuelsWon,
    aerialDuelsLost,
    aerialDuelWinRate,

    // Pressure
    pressures,
    pressuresSuccessful,
    pressureSuccessRate,
    pressuresInAttackingThird: num("player_match_pressures_att_third"),

    // GK
    saves,
    psxG: num("player_match_psxg"),
    goalsAgainst: num("player_match_goals_against"),
    savePercentage,

    // OBV (On-Ball Value)
    obv: num("player_match_obv"),
    obvPass: num("player_match_obv_pass"),
    obvShot: num("player_match_obv_shot"),
    obvDefensiveAction: num("player_match_obv_defensive_action"),
    obvDribbleCarry: num("player_match_obv_dribble_carry"),
    obvGk: num("player_match_obv_gk"),
  };
}

/**
 * Extract features from raw StatsBomb season stats
 */
export function extractSeasonFeatures(
  raw: StatsBombSeasonPlayerStats
): StatsBombExtractedFeatures {
  const minutes = raw.player_season_minutes ?? 0;

  // Helper to safely get numeric values
  const num = (key: string): number | undefined => {
    const val = raw[key];
    return typeof val === "number" ? val : undefined;
  };

  // Calculate rates (same logic as match)
  const passesAttempted = num("player_season_passes_attempted");
  const passesCompleted = num("player_season_passes_completed");
  const passCompletionPct =
    passesAttempted && passesAttempted > 0
      ? (passesCompleted ?? 0) / passesAttempted
      : undefined;

  const takeOnsAttempted = num("player_season_take_ons_attempted");
  const takeOnsSuccessful = num("player_season_take_ons_won");
  const takeOnSuccessRate =
    takeOnsAttempted && takeOnsAttempted > 0
      ? (takeOnsSuccessful ?? 0) / takeOnsAttempted
      : undefined;

  const aerialDuelsWon = num("player_season_aerials_won");
  const aerialDuelsLost = num("player_season_aerials_lost");
  const aerialDuelWinRate =
    aerialDuelsWon !== undefined && aerialDuelsLost !== undefined
      ? aerialDuelsWon / (aerialDuelsWon + aerialDuelsLost) || 0
      : undefined;

  const pressures = num("player_season_pressures");
  const pressuresSuccessful = num("player_season_pressure_regains");
  const pressureSuccessRate =
    pressures && pressures > 0
      ? (pressuresSuccessful ?? 0) / pressures
      : undefined;

  return {
    minutes,

    // Shooting
    xG: num("player_season_xg"),
    npxG: num("player_season_npxg"),
    shots: num("player_season_shots_total"),
    shotsOnTarget: num("player_season_shots_on_target"),
    goals: num("player_season_goals"),

    // Passing
    xA: num("player_season_xa"),
    passesCompleted,
    passesAttempted,
    passCompletionPct,
    progressivePasses: num("player_season_progressive_passes_completed"),
    passesIntoFinalThird: num("player_season_passes_into_final_third"),
    passesIntoPenaltyArea: num("player_season_passes_into_penalty_area"),
    keyPasses: num("player_season_key_passes"),

    // Carrying
    carries: num("player_season_carries"),
    progressiveCarries: num("player_season_progressive_carries"),
    carriesIntoFinalThird: num("player_season_carries_into_final_third"),
    carriesIntoPenaltyArea: num("player_season_carries_into_penalty_area"),
    takeOnsAttempted,
    takeOnsSuccessful,
    takeOnSuccessRate,

    // Creating
    shotCreatingActions: num("player_season_shot_creating_actions"),
    goalCreatingActions: num("player_season_goal_creating_actions"),
    assists: num("player_season_assists"),

    // Defensive
    tackles: num("player_season_tackles"),
    tacklesWon: num("player_season_tackles_won"),
    interceptions: num("player_season_interceptions"),
    blocks: num("player_season_blocks"),
    clearances: num("player_season_clearances"),
    aerialDuelsWon,
    aerialDuelsLost,
    aerialDuelWinRate,

    // Pressure
    pressures,
    pressuresSuccessful,
    pressureSuccessRate,
    pressuresInAttackingThird: num("player_season_pressures_att_third"),

    // GK
    saves: num("player_season_saves"),
    psxG: num("player_season_psxg"),
    goalsAgainst: num("player_season_goals_against"),

    // OBV (On-Ball Value)
    obv: num("player_season_obv"),
    obvPass: num("player_season_obv_pass"),
    obvShot: num("player_season_obv_shot"),
    obvDefensiveAction: num("player_season_obv_defensive_action"),
    obvDribbleCarry: num("player_season_obv_dribble_carry"),
    obvGk: num("player_season_obv_gk"),
  };
}

// ============================================================================
// Per-90 Normalization
// ============================================================================

/**
 * Convert extracted features to per-90 rates
 */
export function normalizeToPer90(
  features: StatsBombExtractedFeatures
): StatsBombPer90Features {
  const { minutes } = features;

  // Helper to calculate per 90 value
  const per90 = (val: number | undefined): number | undefined => {
    if (val === undefined || minutes === 0) return undefined;
    return (val / minutes) * 90;
  };

  return {
    minutes,

    // Shooting per 90
    xGPer90: per90(features.xG),
    npxGPer90: per90(features.npxG),
    shotsPer90: per90(features.shots),
    goalsPer90: per90(features.goals),

    // Passing per 90
    xAPer90: per90(features.xA),
    progressivePassesPer90: per90(features.progressivePasses),
    passesIntoFinalThirdPer90: per90(features.passesIntoFinalThird),
    keyPassesPer90: per90(features.keyPasses),

    // Carrying per 90
    progressiveCarriesPer90: per90(features.progressiveCarries),
    carriesIntoFinalThirdPer90: per90(features.carriesIntoFinalThird),
    takeOnsSuccessfulPer90: per90(features.takeOnsSuccessful),

    // Creating per 90
    shotCreatingActionsPer90: per90(features.shotCreatingActions),
    goalCreatingActionsPer90: per90(features.goalCreatingActions),
    assistsPer90: per90(features.assists),

    // Defensive per 90
    tacklesPer90: per90(features.tackles),
    interceptionsPer90: per90(features.interceptions),
    blocksPer90: per90(features.blocks),
    clearancesPer90: per90(features.clearances),

    // Pressure per 90
    pressuresPer90: per90(features.pressures),
    pressuresSuccessfulPer90: per90(features.pressuresSuccessful),

    // Rates (already normalized, pass through)
    passCompletionPct: features.passCompletionPct,
    takeOnSuccessRate: features.takeOnSuccessRate,
    aerialDuelWinRate: features.aerialDuelWinRate,
    pressureSuccessRate: features.pressureSuccessRate,
    savePercentage: features.savePercentage,

    // OBV per 90
    obvPer90: per90(features.obv),
    obvPassPer90: per90(features.obvPass),
    obvShotPer90: per90(features.obvShot),
    obvDefensiveActionPer90: per90(features.obvDefensiveAction),
    obvDribbleCarryPer90: per90(features.obvDribbleCarry),
    obvGkPer90: per90(features.obvGk),
  };
}

// ============================================================================
// Feature Aggregation
// ============================================================================

/**
 * Aggregate multiple match features into a single feature set
 */
export function aggregateMatchFeatures(
  matches: StatsBombExtractedFeatures[]
): StatsBombExtractedFeatures {
  if (matches.length === 0) {
    return { minutes: 0 };
  }

  // Sum all numeric features
  const result: StatsBombExtractedFeatures = { minutes: 0 };

  for (const match of matches) {
    result.minutes += match.minutes;

    // Sum each feature
    const featureKeys = Object.keys(match) as (keyof StatsBombExtractedFeatures)[];
    for (const key of featureKeys) {
      if (key === "minutes") continue;

      const val = match[key];
      if (typeof val === "number") {
        // Skip rate fields (will recalculate)
        if (key.includes("Rate") || key.includes("Pct") || key.includes("Percentage")) {
          continue;
        }
        const currentVal = result[key];
        const currentNum = typeof currentVal === "number" ? currentVal : 0;
        // Use type assertion for dynamic key assignment
        (result as unknown as Record<string, number>)[key] = currentNum + val;
      }
    }
  }

  // Recalculate rates from aggregated totals
  if (result.passesAttempted && result.passesAttempted > 0) {
    result.passCompletionPct = (result.passesCompleted ?? 0) / result.passesAttempted;
  }

  if (result.takeOnsAttempted && result.takeOnsAttempted > 0) {
    result.takeOnSuccessRate = (result.takeOnsSuccessful ?? 0) / result.takeOnsAttempted;
  }

  if (result.aerialDuelsWon !== undefined && result.aerialDuelsLost !== undefined) {
    const total = result.aerialDuelsWon + result.aerialDuelsLost;
    result.aerialDuelWinRate = total > 0 ? result.aerialDuelsWon / total : 0;
  }

  if (result.pressures && result.pressures > 0) {
    result.pressureSuccessRate = (result.pressuresSuccessful ?? 0) / result.pressures;
  }

  return result;
}

// ============================================================================
// Position-Specific Feature Selection
// ============================================================================

type PositionGroup = "GK" | "DEF" | "MID" | "ATT";

/**
 * Get the most relevant features for a position group
 */
export function getRelevantFeaturesForPosition(
  positionGroup: PositionGroup
): (keyof StatsBombPer90Features)[] {
  switch (positionGroup) {
    case "GK":
      return [
        "savePercentage",
        "goalsPer90", // goals against
        "obvGkPer90", // OBV for goalkeepers
      ];

    case "DEF":
      return [
        "tacklesPer90",
        "interceptionsPer90",
        "blocksPer90",
        "clearancesPer90",
        "aerialDuelWinRate",
        "pressuresPer90",
        "progressivePassesPer90",
        "progressiveCarriesPer90",
        "passCompletionPct",
        "obvPer90", // Total OBV
        "obvDefensiveActionPer90", // Defensive OBV
        "obvPassPer90", // Pass OBV
      ];

    case "MID":
      return [
        "xGPer90",
        "xAPer90",
        "progressivePassesPer90",
        "progressiveCarriesPer90",
        "keyPassesPer90",
        "tacklesPer90",
        "interceptionsPer90",
        "pressuresPer90",
        "passCompletionPct",
        "shotCreatingActionsPer90",
        "obvPer90", // Total OBV
        "obvPassPer90", // Pass OBV
        "obvDribbleCarryPer90", // Dribble/carry OBV
      ];

    case "ATT":
      return [
        "xGPer90",
        "npxGPer90",
        "xAPer90",
        "shotsPer90",
        "goalsPer90",
        "assistsPer90",
        "shotCreatingActionsPer90",
        "goalCreatingActionsPer90",
        "takeOnsSuccessfulPer90",
        "pressuresPer90",
        "obvPer90", // Total OBV
        "obvShotPer90", // Shot OBV
        "obvDribbleCarryPer90", // Dribble/carry OBV
      ];

    default:
      return [
        "xGPer90",
        "xAPer90",
        "progressivePassesPer90",
        "progressiveCarriesPer90",
        "pressuresPer90",
        "obvPer90", // Total OBV
      ];
  }
}
```

### 📚 Shared utilities

#### `convex/lib/auth.ts`

```typescript
import { authComponent } from "../auth";
import type { QueryCtx, MutationCtx } from "../_generated/server";

/**
 * Require authentication for a query/mutation.
 * Throws if user is not authenticated.
 * @returns The authenticated user
 */
export async function requireAuth(ctx: QueryCtx | MutationCtx) {
  const user = await authComponent.getAuthUser(ctx);
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

/**
 * Get current user if authenticated (doesn't throw).
 * @returns The user or null if not authenticated
 */
export async function getUser(ctx: QueryCtx | MutationCtx) {
  return await authComponent.getAuthUser(ctx);
}
```

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

// ============================================================================
// Season Helpers
// ============================================================================

/**
 * Get current football season for API-Football
 *
 * European football seasons run from August to May.
 * API-Football uses the starting year of the season.
 *
 * Examples:
 * - January 2026 -> season "2025" (2025-2026 season)
 * - August 2025 -> season "2025" (2025-2026 season just started)
 * - July 2025 -> season "2024" (2024-2025 season still running)
 */
export function getCurrentFootballSeason(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 1-12

  // If January-July, we're in the second half of the previous season
  // If August-December, we're in the first half of the current season
  const seasonYear = month >= 8 ? year : year - 1;

  return seasonYear.toString();
}
```

### 📥 Data ingestion pipelines

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
import { getCurrentFootballSeason } from "../lib/metrics";

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
    const season = args.season || getCurrentFootballSeason();
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
import { getCurrentFootballSeason } from "../lib/metrics";

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

    const season = getCurrentFootballSeason();
    const countries = ["Netherlands", "Germany"];

    console.log(`[Cron] Using season: ${season}`);

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

#### `convex/ingest/statsbombConfig.ts`

```typescript
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
```

#### `convex/ingest/statsbombIngest.ts`

```typescript
/**
 * StatsBomb Data Ingestion Pipeline
 *
 * Handles fetching and storing data from StatsBomb Data API.
 * Follows patterns from apiFootballIngest.ts for consistency.
 *
 * Main flows:
 * 1. syncCompetitions - Sync licensed competition-seasons
 * 2. syncMatchesForSeason - Sync match list for a competition-season
 * 3. ingestMatchStats - Ingest lineups + player stats for a match
 * 4. ingestSeasonAggregates - Ingest season-level player aggregates
 */

import { v } from "convex/values";
import { action, internalAction, internalMutation, internalQuery } from "../_generated/server";
import { internal } from "../_generated/api";
import { Doc, Id } from "../_generated/dataModel";
import * as StatsBomb from "../providers/statsbomb";
import {
  LICENSED_COMPETITIONS,
  TARGET_SEASONS,
  INGESTION_BUDGET,
  AVAILABLE_MATCH_STATUSES,
  isLicensedCompetition,
  isTargetSeason,
} from "./statsbombConfig";
import {
  resolveStatsBombPlayer,
  linkStatsBombPlayer,
  addStatsBombToReviewQueue,
  normalizeName,
} from "../resolve/resolvePlayer";

// ============================================================================
// Internal Queries
// ============================================================================

/**
 * Get a competition-season by StatsBomb IDs
 */
export const getCompetitionSeasonByStatsBombIds = internalQuery({
  args: {
    statsbombCompetitionId: v.number(),
    statsbombSeasonId: v.number(),
  },
  handler: async (ctx, { statsbombCompetitionId, statsbombSeasonId }) => {
    return await ctx.db
      .query("statsbombCompetitionSeasons")
      .withIndex("by_statsbomb_ids", (q) =>
        q
          .eq("statsbombCompetitionId", statsbombCompetitionId)
          .eq("statsbombSeasonId", statsbombSeasonId)
      )
      .first();
  },
});

/**
 * Get a competition-season by ID
 */
export const getCompetitionSeason = internalQuery({
  args: { id: v.id("statsbombCompetitionSeasons") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

/**
 * Get all active competition-seasons for sync
 */
export const getActiveCompetitionSeasons = internalQuery({
  handler: async (ctx) => {
    // Return both pending and synced competition-seasons for processing
    // Pending: needs initial match sync
    // Synced: may need match updates
    const pending = await ctx.db
      .query("statsbombCompetitionSeasons")
      .withIndex("by_sync_status", (q) => q.eq("syncStatus", "pending"))
      .collect();
    const synced = await ctx.db
      .query("statsbombCompetitionSeasons")
      .withIndex("by_sync_status", (q) => q.eq("syncStatus", "synced"))
      .collect();
    return [...pending, ...synced];
  },
});

/**
 * Get a match by StatsBomb match ID
 */
export const getMatchByStatsBombId = internalQuery({
  args: { statsbombMatchId: v.number() },
  handler: async (ctx, { statsbombMatchId }) => {
    return await ctx.db
      .query("statsbombMatches")
      .withIndex("by_statsbomb_match", (q) =>
        q.eq("statsbombMatchId", statsbombMatchId)
      )
      .first();
  },
});

/**
 * Get matches needing player stats ingestion
 */
export const getMatchesNeedingStats = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 50 }) => {
    const matches = await ctx.db
      .query("statsbombMatches")
      .withIndex("by_pending_player_stats", (q) =>
        q.eq("playerStatsIngested", false).eq("status", "available")
      )
      .take(limit);
    return matches;
  },
});

/**
 * Count matches by ingestion status
 */
export const countMatchesByStatus = internalQuery({
  handler: async (ctx) => {
    const allMatches = await ctx.db.query("statsbombMatches").collect();

    const pending = allMatches.filter(
      (m) => !m.playerStatsIngested && m.status === "available"
    );
    const ingested = allMatches.filter((m) => m.playerStatsIngested);
    const unavailable = allMatches.filter((m) => m.status !== "available");

    return {
      total: allMatches.length,
      pending: pending.length,
      ingested: ingested.length,
      unavailable: unavailable.length,
    };
  },
});

/**
 * Get matches for a competition-season
 */
export const getMatchesForCompetitionSeason = internalQuery({
  args: { competitionSeasonId: v.id("statsbombCompetitionSeasons") },
  handler: async (ctx, { competitionSeasonId }) => {
    return await ctx.db
      .query("statsbombMatches")
      .withIndex("by_competition_season", (q) =>
        q.eq("competitionSeasonId", competitionSeasonId)
      )
      .collect();
  },
});

/**
 * Get external ID for a StatsBomb player
 */
export const getStatsBombExternalId = internalQuery({
  args: { statsbombPlayerId: v.number() },
  handler: async (ctx, { statsbombPlayerId }) => {
    return await ctx.db
      .query("playerExternalIds")
      .withIndex("by_provider_playerId", (q) =>
        q.eq("provider", "statsbomb").eq("providerPlayerId", String(statsbombPlayerId))
      )
      .first();
  },
});

/**
 * Get StatsBomb player mapping
 */
export const getStatsBombPlayerMapping = internalQuery({
  args: { statsbombPlayerId: v.number() },
  handler: async (ctx, { statsbombPlayerId }) => {
    return await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();
  },
});

/**
 * Find canonical competition by name and country
 */
export const findCanonicalCompetition = internalQuery({
  args: {
    name: v.string(),
    country: v.string(),
    season: v.string(),
  },
  handler: async (ctx, { name, country, season }) => {
    // First try exact match by name and country
    const competitions = await ctx.db
      .query("competitions")
      .withIndex("by_country", (q) => q.eq("country", country))
      .collect();

    // Find best match by name similarity
    const nameLower = name.toLowerCase();
    for (const comp of competitions) {
      const compNameLower = comp.name.toLowerCase();
      if (
        compNameLower.includes(nameLower) ||
        nameLower.includes(compNameLower)
      ) {
        // Check season matches
        if (comp.season === season || season.includes(comp.season)) {
          return comp;
        }
      }
    }

    return null;
  },
});

// ============================================================================
// Internal Mutations
// ============================================================================

/**
 * Upsert a competition-season
 */
export const upsertCompetitionSeason = internalMutation({
  args: {
    statsbombCompetitionId: v.number(),
    statsbombSeasonId: v.number(),
    name: v.string(),
    country: v.string(),
    season: v.string(),
    matchUpdated: v.optional(v.string()),
    matchAvailable: v.optional(v.string()),
    competitionId: v.optional(v.id("competitions")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("statsbombCompetitionSeasons")
      .withIndex("by_statsbomb_ids", (q) =>
        q
          .eq("statsbombCompetitionId", args.statsbombCompetitionId)
          .eq("statsbombSeasonId", args.statsbombSeasonId)
      )
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        country: args.country,
        season: args.season,
        matchUpdated: args.matchUpdated,
        matchAvailable: args.matchAvailable,
        competitionId: args.competitionId ?? existing.competitionId,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("statsbombCompetitionSeasons", {
      statsbombCompetitionId: args.statsbombCompetitionId,
      statsbombSeasonId: args.statsbombSeasonId,
      name: args.name,
      country: args.country,
      season: args.season,
      matchUpdated: args.matchUpdated,
      matchAvailable: args.matchAvailable,
      competitionId: args.competitionId,
      syncStatus: "pending",
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Update competition-season sync status
 */
export const updateCompetitionSeasonSyncStatus = internalMutation({
  args: {
    id: v.id("statsbombCompetitionSeasons"),
    syncStatus: v.union(
      v.literal("pending"),
      v.literal("syncing"),
      v.literal("synced"),
      v.literal("error")
    ),
    lastError: v.optional(v.string()),
    matchCount: v.optional(v.number()),
  },
  handler: async (ctx, { id, syncStatus, lastError, matchCount }) => {
    const updates: Record<string, unknown> = {
      syncStatus,
      updatedAt: Date.now(),
    };

    if (syncStatus === "synced") {
      updates.lastSyncedAt = Date.now();
    }

    if (lastError !== undefined) {
      updates.lastError = lastError;
    }

    if (matchCount !== undefined) {
      updates.matchCount = matchCount;
    }

    await ctx.db.patch(id, updates);
  },
});

/**
 * Upsert a match
 */
export const upsertMatch = internalMutation({
  args: {
    competitionSeasonId: v.id("statsbombCompetitionSeasons"),
    statsbombMatchId: v.number(),
    matchDate: v.string(),
    kickOff: v.optional(v.string()),
    homeTeamName: v.string(),
    awayTeamName: v.string(),
    homeTeamId: v.optional(v.number()),
    awayTeamId: v.optional(v.number()),
    homeScore: v.optional(v.number()),
    awayScore: v.optional(v.number()),
    status: v.string(),
    lastUpdated: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("statsbombMatches")
      .withIndex("by_statsbomb_match", (q) =>
        q.eq("statsbombMatchId", args.statsbombMatchId)
      )
      .first();

    const now = Date.now();

    if (existing) {
      // Check if match was updated
      const wasUpdated =
        existing.lastUpdated !== args.lastUpdated ||
        existing.status !== args.status;

      await ctx.db.patch(existing._id, {
        matchDate: args.matchDate,
        kickOff: args.kickOff,
        homeTeamName: args.homeTeamName,
        awayTeamName: args.awayTeamName,
        homeTeamId: args.homeTeamId,
        awayTeamId: args.awayTeamId,
        homeScore: args.homeScore,
        awayScore: args.awayScore,
        status: args.status,
        lastUpdated: args.lastUpdated,
        // Reset ingestion flags if match was updated
        playerStatsIngested: wasUpdated ? false : existing.playerStatsIngested,
        lineupsIngested: wasUpdated ? false : existing.lineupsIngested,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("statsbombMatches", {
      competitionSeasonId: args.competitionSeasonId,
      statsbombMatchId: args.statsbombMatchId,
      matchDate: args.matchDate,
      kickOff: args.kickOff,
      homeTeamName: args.homeTeamName,
      awayTeamName: args.awayTeamName,
      homeTeamId: args.homeTeamId,
      awayTeamId: args.awayTeamId,
      homeScore: args.homeScore,
      awayScore: args.awayScore,
      status: args.status,
      lastUpdated: args.lastUpdated,
      lineupsIngested: false,
      playerStatsIngested: false,
      teamStatsIngested: false,
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Mark match stats as ingested
 */
export const markMatchStatsIngested = internalMutation({
  args: {
    id: v.id("statsbombMatches"),
    playerStatsIngested: v.optional(v.boolean()),
    lineupsIngested: v.optional(v.boolean()),
    teamStatsIngested: v.optional(v.boolean()),
  },
  handler: async (
    ctx,
    { id, playerStatsIngested, lineupsIngested, teamStatsIngested }
  ) => {
    const updates: Record<string, unknown> = { updatedAt: Date.now() };

    if (playerStatsIngested !== undefined) {
      updates.playerStatsIngested = playerStatsIngested;
    }
    if (lineupsIngested !== undefined) {
      updates.lineupsIngested = lineupsIngested;
    }
    if (teamStatsIngested !== undefined) {
      updates.teamStatsIngested = teamStatsIngested;
    }

    await ctx.db.patch(id, updates);
  },
});

/**
 * Upsert player match stats
 */
export const upsertPlayerMatchStats = internalMutation({
  args: {
    playerId: v.id("players"),
    matchKey: v.string(),
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
    }),
    providerMatchId: v.string(),
    raw: v.any(),
    features: v.any(),
  },
  handler: async (ctx, args) => {
    // Check for existing record
    const existing = await ctx.db
      .query("providerPlayerMatchStats")
      .withIndex("by_provider_matchId_player", (q) =>
        q
          .eq("provider", "statsbomb")
          .eq("providerMatchId", args.providerMatchId)
          .eq("playerId", args.playerId)
      )
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        matchDate: args.matchDate,
        competitionId: args.competitionId,
        teamId: args.teamId,
        minutes: args.minutes,
        stats: args.stats,
        raw: args.raw,
        features: args.features,
        fetchedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("providerPlayerMatchStats", {
      playerId: args.playerId,
      provider: "statsbomb",
      matchKey: args.matchKey,
      matchDate: args.matchDate,
      competitionId: args.competitionId,
      teamId: args.teamId,
      minutes: args.minutes,
      stats: args.stats,
      providerMatchId: args.providerMatchId,
      raw: args.raw,
      features: args.features,
      fetchedAt: now,
    });
  },
});

/**
 * Upsert StatsBomb player mapping
 */
export const upsertStatsBombPlayerMapping = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    playerName: v.string(),
    playerId: v.optional(v.id("players")),
  },
  handler: async (ctx, { statsbombPlayerId, playerName, playerId }) => {
    const existing = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        playerName,
        playerId: playerId ?? existing.playerId,
        cachedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("statsbombPlayerMappings", {
      statsbombPlayerId,
      playerName,
      playerId,
      cachedAt: now,
    });
  },
});

// ============================================================================
// Actions
// ============================================================================

/**
 * Sync licensed competitions from StatsBomb catalog
 */
export const syncCompetitions = internalAction({
  handler: async (ctx) => {
    if (!StatsBomb.isConfigured()) {
      console.log("[StatsBomb] Credentials not configured, skipping sync");
      return { synced: 0, error: "Credentials not configured" };
    }

    console.log("[StatsBomb] Fetching competitions catalog...");
    const competitions = await StatsBomb.fetchCompetitions();
    console.log(`[StatsBomb] Found ${competitions.length} competition-seasons`);

    let syncedCount = 0;

    for (const comp of competitions) {
      // Check if this is a licensed competition for a target season
      if (
        !isLicensedCompetition(comp.competition_name, comp.country_name) ||
        !isTargetSeason(comp.season_name)
      ) {
        continue;
      }

      console.log(
        `[StatsBomb] Syncing: ${comp.competition_name} (${comp.country_name}) - ${comp.season_name}`
      );

      // Try to find matching canonical competition
      const canonicalComp = await ctx.runQuery(
        internal.ingest.statsbombIngest.findCanonicalCompetition,
        {
          name: comp.competition_name,
          country: comp.country_name,
          season: comp.season_name,
        }
      );

      // Upsert the competition-season
      await ctx.runMutation(
        internal.ingest.statsbombIngest.upsertCompetitionSeason,
        {
          statsbombCompetitionId: comp.competition_id,
          statsbombSeasonId: comp.season_id,
          name: comp.competition_name,
          country: comp.country_name,
          season: comp.season_name,
          matchUpdated: comp.match_updated,
          matchAvailable: comp.match_available,
          competitionId: canonicalComp?._id,
        }
      );

      syncedCount++;
    }

    console.log(`[StatsBomb] Synced ${syncedCount} competition-seasons`);
    return { synced: syncedCount };
  },
});

/**
 * Sync matches for a competition-season
 */
export const syncMatchesForSeason = internalAction({
  args: { competitionSeasonId: v.id("statsbombCompetitionSeasons") },
  handler: async (ctx, { competitionSeasonId }) => {
    const cs = await ctx.runQuery(
      internal.ingest.statsbombIngest.getCompetitionSeason,
      { id: competitionSeasonId }
    );

    if (!cs) {
      throw new Error(`Competition-season not found: ${competitionSeasonId}`);
    }

    console.log(
      `[StatsBomb] Syncing matches for: ${cs.name} (${cs.country}) - ${cs.season}`
    );

    // Mark as syncing
    await ctx.runMutation(
      internal.ingest.statsbombIngest.updateCompetitionSeasonSyncStatus,
      {
        id: competitionSeasonId,
        syncStatus: "syncing",
      }
    );

    try {
      const matches = await StatsBomb.fetchMatches(
        cs.statsbombCompetitionId,
        cs.statsbombSeasonId
      );

      console.log(`[StatsBomb] Found ${matches.length} matches`);

      let upsertedCount = 0;
      let availableCount = 0;

      for (const match of matches) {
        await ctx.runMutation(internal.ingest.statsbombIngest.upsertMatch, {
          competitionSeasonId,
          statsbombMatchId: match.match_id,
          matchDate: match.match_date,
          kickOff: match.kick_off,
          homeTeamName: match.home_team.home_team_name,
          awayTeamName: match.away_team.away_team_name,
          homeTeamId: match.home_team.home_team_id,
          awayTeamId: match.away_team.away_team_id,
          homeScore: match.home_score ?? undefined,
          awayScore: match.away_score ?? undefined,
          status: match.match_status,
          lastUpdated: match.last_updated,
        });

        upsertedCount++;
        if (AVAILABLE_MATCH_STATUSES.includes(match.match_status as "available" | "completed")) {
          availableCount++;
        }
      }

      // Mark as synced
      await ctx.runMutation(
        internal.ingest.statsbombIngest.updateCompetitionSeasonSyncStatus,
        {
          id: competitionSeasonId,
          syncStatus: "synced",
          matchCount: matches.length,
        }
      );

      console.log(
        `[StatsBomb] Synced ${upsertedCount} matches (${availableCount} available for stats)`
      );

      return {
        total: upsertedCount,
        available: availableCount,
      };
    } catch (error) {
      // Mark as error
      await ctx.runMutation(
        internal.ingest.statsbombIngest.updateCompetitionSeasonSyncStatus,
        {
          id: competitionSeasonId,
          syncStatus: "error",
          lastError: error instanceof Error ? error.message : String(error),
        }
      );
      throw error;
    }
  },
});

/**
 * Ingest player stats for a single match
 */
export const ingestMatchStats = internalAction({
  args: { statsbombMatchId: v.number() },
  handler: async (ctx, { statsbombMatchId }) => {
    const match = await ctx.runQuery(
      internal.ingest.statsbombIngest.getMatchByStatsBombId,
      { statsbombMatchId }
    );

    if (!match) {
      throw new Error(`Match not found: ${statsbombMatchId}`);
    }

    console.log(
      `[StatsBomb] Ingesting stats for: ${match.homeTeamName} vs ${match.awayTeamName} (${match.matchDate})`
    );

    // Fetch player stats
    const playerStats = await StatsBomb.fetchMatchPlayerStats(statsbombMatchId);
    console.log(`[StatsBomb] Found ${playerStats.length} player stat records`);

    let processedCount = 0;
    let skippedCount = 0;

    for (const stat of playerStats) {
      // Check if player is already linked
      const externalId = await ctx.runQuery(
        internal.ingest.statsbombIngest.getStatsBombExternalId,
        { statsbombPlayerId: stat.player_id }
      );

      if (!externalId) {
        // Player not linked - store in mapping for later resolution
        await ctx.runMutation(
          internal.ingest.statsbombIngest.upsertStatsBombPlayerMapping,
          {
            statsbombPlayerId: stat.player_id,
            playerName: stat.player_name,
          }
        );
        skippedCount++;
        continue;
      }

      // Get competition from the season
      const cs = await ctx.runQuery(
        internal.ingest.statsbombIngest.getCompetitionSeason,
        { id: match.competitionSeasonId }
      );

      // Extract basic stats for canonical stats object
      const basicStats = {
        goals: stat.player_match_goals as number | undefined,
        assists: stat.player_match_assists as number | undefined,
        xG: stat.player_match_xg as number | undefined,
        xA: stat.player_match_xa as number | undefined,
        shots: stat.player_match_shots_total as number | undefined,
        shotsOnTarget: stat.player_match_shots_on_target as number | undefined,
        keyPasses: stat.player_match_key_passes as number | undefined,
        tackles: stat.player_match_tackles as number | undefined,
        interceptions: stat.player_match_interceptions as number | undefined,
      };

      // Extract features for rating computation
      const features = extractRatingFeatures(stat);

      // Create match key
      const matchKey = StatsBomb.createMatchKey({
        match_date: match.matchDate,
        home_team: { home_team_id: match.homeTeamId!, home_team_name: match.homeTeamName } as StatsBomb.StatsBombMatch["home_team"],
        away_team: { away_team_id: match.awayTeamId!, away_team_name: match.awayTeamName } as StatsBomb.StatsBombMatch["away_team"],
      } as StatsBomb.StatsBombMatch);

      // Store player match stats
      await ctx.runMutation(
        internal.ingest.statsbombIngest.upsertPlayerMatchStats,
        {
          playerId: externalId.playerId,
          matchKey,
          matchDate: match.matchDate,
          competitionId: cs?.competitionId,
          minutes: stat.player_match_minutes,
          stats: basicStats,
          providerMatchId: String(statsbombMatchId),
          raw: stat, // Store full raw data
          features, // Store extracted features
        }
      );

      processedCount++;
    }

    // Mark match stats as ingested
    await ctx.runMutation(
      internal.ingest.statsbombIngest.markMatchStatsIngested,
      {
        id: match._id,
        playerStatsIngested: true,
      }
    );

    console.log(
      `[StatsBomb] Processed ${processedCount} player stats, skipped ${skippedCount} (unlinked players)`
    );

    return {
      processed: processedCount,
      skipped: skippedCount,
    };
  },
});

/**
 * Batch ingest player stats for multiple matches
 */
export const batchIngestMatchStats = internalAction({
  args: {
    limit: v.optional(v.number()),
    competitionSeasonId: v.optional(v.id("statsbombCompetitionSeasons")),
  },
  handler: async (ctx, { limit = 50, competitionSeasonId }) => {
    // Get matches needing stats
    let pendingMatches = await ctx.runQuery(
      internal.ingest.statsbombIngest.getMatchesNeedingStats,
      { limit }
    );

    // Filter by competition season if provided
    if (competitionSeasonId) {
      pendingMatches = pendingMatches.filter(
        (m) => m.competitionSeasonId === competitionSeasonId
      );
    }

    console.log(`[StatsBomb] Processing ${pendingMatches.length} matches for stats ingestion`);

    let matchesProcessed = 0;
    let totalPlayerStats = 0;
    let totalSkipped = 0;
    let errors = 0;

    for (const match of pendingMatches) {
      try {
        console.log(
          `[StatsBomb] Processing: ${match.homeTeamName} vs ${match.awayTeamName} (${match.matchDate})`
        );

        // Fetch player stats from API
        const playerStats = await StatsBomb.fetchMatchPlayerStats(match.statsbombMatchId);

        let processed = 0;
        let skipped = 0;

        // Get competition info once
        const cs = await ctx.runQuery(
          internal.ingest.statsbombIngest.getCompetitionSeason,
          { id: match.competitionSeasonId }
        );

        for (const stat of playerStats) {
          // Check if player is linked
          const externalId = await ctx.runQuery(
            internal.ingest.statsbombIngest.getStatsBombExternalId,
            { statsbombPlayerId: stat.player_id }
          );

          if (!externalId) {
            // Store mapping for later resolution
            await ctx.runMutation(
              internal.ingest.statsbombIngest.upsertStatsBombPlayerMapping,
              {
                statsbombPlayerId: stat.player_id,
                playerName: stat.player_name,
              }
            );
            skipped++;
            continue;
          }

          // Extract stats
          const basicStats = {
            goals: stat.player_match_goals as number | undefined,
            assists: stat.player_match_assists as number | undefined,
            xG: stat.player_match_xg as number | undefined,
            xA: stat.player_match_xa as number | undefined,
            shots: stat.player_match_shots_total as number | undefined,
            shotsOnTarget: stat.player_match_shots_on_target as number | undefined,
            keyPasses: stat.player_match_key_passes as number | undefined,
            tackles: stat.player_match_tackles as number | undefined,
            interceptions: stat.player_match_interceptions as number | undefined,
          };

          const features = extractRatingFeatures(stat);

          const matchKey = `${match.matchDate}_${match.homeTeamName.toLowerCase().replace(/\s+/g, "_")}_${match.awayTeamName.toLowerCase().replace(/\s+/g, "_")}`;

          // Store player match stats
          await ctx.runMutation(
            internal.ingest.statsbombIngest.upsertPlayerMatchStats,
            {
              playerId: externalId.playerId,
              matchKey,
              matchDate: match.matchDate,
              competitionId: cs?.competitionId,
              minutes: stat.player_match_minutes,
              stats: basicStats,
              providerMatchId: String(match.statsbombMatchId),
              raw: stat,
              features,
            }
          );
          processed++;
        }

        // Mark match as processed
        await ctx.runMutation(
          internal.ingest.statsbombIngest.markMatchStatsIngested,
          {
            id: match._id,
            playerStatsIngested: true,
          }
        );

        matchesProcessed++;
        totalPlayerStats += processed;
        totalSkipped += skipped;

        console.log(
          `[StatsBomb] Match done: ${processed} stats, ${skipped} skipped`
        );
      } catch (error) {
        console.error(
          `[StatsBomb] Error processing match ${match.statsbombMatchId}: ${error}`
        );
        errors++;
      }
    }

    console.log(`[StatsBomb] Batch complete: ${matchesProcessed} matches, ${totalPlayerStats} player stats`);

    return {
      matchesProcessed,
      totalPlayerStats,
      totalSkipped,
      errors,
      remaining: pendingMatches.length - matchesProcessed,
    };
  },
});

/**
 * Public action to trigger batch match stats ingestion
 */
export const triggerMatchStatsIngestion = action({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { limit }) => {
    try {
      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.batchIngestMatchStats,
        { limit: limit ?? 50 }
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Run daily StatsBomb sync
 * Orchestrates the full sync process
 *
 * Note: This uses inline execution for sub-actions since they're in the same file.
 * For cross-file action calls, use ctx.runAction().
 */
export const runDailySync = internalAction({
  handler: async (ctx) => {
    console.log("[StatsBomb] Starting daily sync...");

    // 1. Sync competitions (in case new seasons are available)
    let compSynced = 0;
    if (StatsBomb.isConfigured()) {
      try {
        const competitions = await StatsBomb.fetchCompetitions();
        for (const comp of competitions) {
          if (
            !isLicensedCompetition(comp.competition_name, comp.country_name) ||
            !isTargetSeason(comp.season_name)
          ) {
            continue;
          }

          const canonicalComp = await ctx.runQuery(
            internal.ingest.statsbombIngest.findCanonicalCompetition,
            {
              name: comp.competition_name,
              country: comp.country_name,
              season: comp.season_name,
            }
          );

          await ctx.runMutation(
            internal.ingest.statsbombIngest.upsertCompetitionSeason,
            {
              statsbombCompetitionId: comp.competition_id,
              statsbombSeasonId: comp.season_id,
              name: comp.competition_name,
              country: comp.country_name,
              season: comp.season_name,
              matchUpdated: comp.match_updated,
              matchAvailable: comp.match_available,
              competitionId: canonicalComp?._id,
            }
          );
          compSynced++;
        }
      } catch (error) {
        console.error(`[StatsBomb] Error syncing competitions: ${error}`);
      }
    }
    console.log(`[StatsBomb] Competitions synced: ${compSynced}`);

    // 2. Sync matches for each active competition-season
    const competitionSeasons = await ctx.runQuery(
      internal.ingest.statsbombIngest.getActiveCompetitionSeasons
    );

    let totalMatches = 0;
    for (const cs of competitionSeasons) {
      try {
        const matches = await StatsBomb.fetchMatches(
          cs.statsbombCompetitionId,
          cs.statsbombSeasonId
        );

        for (const match of matches) {
          await ctx.runMutation(internal.ingest.statsbombIngest.upsertMatch, {
            competitionSeasonId: cs._id,
            statsbombMatchId: match.match_id,
            matchDate: match.match_date,
            kickOff: match.kick_off,
            homeTeamName: match.home_team.home_team_name,
            awayTeamName: match.away_team.away_team_name,
            homeTeamId: match.home_team.home_team_id,
            awayTeamId: match.away_team.away_team_id,
            homeScore: match.home_score ?? undefined,
            awayScore: match.away_score ?? undefined,
            status: match.match_status,
            lastUpdated: match.last_updated,
          });
        }

        totalMatches += matches.length;

        await ctx.runMutation(
          internal.ingest.statsbombIngest.updateCompetitionSeasonSyncStatus,
          {
            id: cs._id,
            syncStatus: "synced",
            matchCount: matches.length,
          }
        );
      } catch (error) {
        console.error(
          `[StatsBomb] Error syncing matches for ${cs.name}: ${error}`
        );
      }
    }

    // 3. Ingest stats for pending matches (up to budget limit)
    const pendingMatches = await ctx.runQuery(
      internal.ingest.statsbombIngest.getMatchesNeedingStats,
      { limit: INGESTION_BUDGET.maxMatchesPerRun }
    );

    let processedMatches = 0;
    let totalPlayerStats = 0;

    for (const match of pendingMatches) {
      try {
        const playerStats = await StatsBomb.fetchMatchPlayerStats(
          match.statsbombMatchId
        );

        let processed = 0;
        for (const stat of playerStats) {
          const externalId = await ctx.runQuery(
            internal.ingest.statsbombIngest.getStatsBombExternalId,
            { statsbombPlayerId: stat.player_id }
          );

          if (!externalId) {
            await ctx.runMutation(
              internal.ingest.statsbombIngest.upsertStatsBombPlayerMapping,
              {
                statsbombPlayerId: stat.player_id,
                playerName: stat.player_name,
              }
            );
            continue;
          }

          const cs = await ctx.runQuery(
            internal.ingest.statsbombIngest.getCompetitionSeason,
            { id: match.competitionSeasonId }
          );

          const basicStats = {
            goals: stat.player_match_goals as number | undefined,
            assists: stat.player_match_assists as number | undefined,
            xG: stat.player_match_xg as number | undefined,
            xA: stat.player_match_xa as number | undefined,
            shots: stat.player_match_shots_total as number | undefined,
            shotsOnTarget: stat.player_match_shots_on_target as
              | number
              | undefined,
            keyPasses: stat.player_match_key_passes as number | undefined,
            tackles: stat.player_match_tackles as number | undefined,
            interceptions: stat.player_match_interceptions as number | undefined,
          };

          const matchKey = `${match.matchDate}_${match.homeTeamName.toLowerCase().replace(/\s+/g, "_")}_${match.awayTeamName.toLowerCase().replace(/\s+/g, "_")}`;

          await ctx.runMutation(
            internal.ingest.statsbombIngest.upsertPlayerMatchStats,
            {
              playerId: externalId.playerId,
              matchKey,
              matchDate: match.matchDate,
              competitionId: cs?.competitionId,
              minutes: stat.player_match_minutes,
              stats: basicStats,
              providerMatchId: String(match.statsbombMatchId),
              raw: stat,
              features: extractRatingFeatures(stat),
            }
          );
          processed++;
        }

        await ctx.runMutation(
          internal.ingest.statsbombIngest.markMatchStatsIngested,
          {
            id: match._id,
            playerStatsIngested: true,
          }
        );

        processedMatches++;
        totalPlayerStats += processed;
      } catch (error) {
        console.error(
          `[StatsBomb] Error ingesting stats for match ${match.statsbombMatchId}: ${error}`
        );
      }
    }

    console.log(`[StatsBomb] Daily sync complete:`);
    console.log(`  - Competitions synced: ${compSynced}`);
    console.log(`  - Total matches: ${totalMatches}`);
    console.log(`  - Matches processed: ${processedMatches}`);
    console.log(`  - Player stats: ${totalPlayerStats}`);

    return {
      competitionsSynced: compSynced,
      totalMatches,
      matchesProcessed: processedMatches,
      playerStatsProcessed: totalPlayerStats,
    };
  },
});

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Extract rating-relevant features from raw StatsBomb match stats
 */
function extractRatingFeatures(
  raw: StatsBomb.StatsBombPlayerMatchStats
): Record<string, number | undefined> {
  return {
    // Minutes
    minutes: raw.player_match_minutes,

    // Shooting
    xG: raw.player_match_xg as number | undefined,
    npxG: raw.player_match_npxg as number | undefined,
    shots: raw.player_match_shots_total as number | undefined,
    shotsOnTarget: raw.player_match_shots_on_target as number | undefined,

    // Passing
    xA: raw.player_match_xa as number | undefined,
    passesCompleted: raw.player_match_passes_completed as number | undefined,
    passesAttempted: raw.player_match_passes_attempted as number | undefined,
    progressivePasses: raw.player_match_progressive_passes_completed as
      | number
      | undefined,
    passesIntoFinalThird: raw.player_match_passes_into_final_third as
      | number
      | undefined,
    keyPasses: raw.player_match_key_passes as number | undefined,

    // Carrying
    carries: raw.player_match_carries as number | undefined,
    progressiveCarries: raw.player_match_progressive_carries as
      | number
      | undefined,
    takeOnsAttempted: raw.player_match_take_ons_attempted as number | undefined,
    takeOnsSuccessful: raw.player_match_take_ons_won as number | undefined,

    // Creating
    shotCreatingActions: raw.player_match_shot_creating_actions as
      | number
      | undefined,
    goalCreatingActions: raw.player_match_goal_creating_actions as
      | number
      | undefined,

    // Defensive
    tackles: raw.player_match_tackles as number | undefined,
    tacklesWon: raw.player_match_tackles_won as number | undefined,
    interceptions: raw.player_match_interceptions as number | undefined,
    blocks: raw.player_match_blocks as number | undefined,
    clearances: raw.player_match_clearances as number | undefined,
    aerialDuelsWon: raw.player_match_aerials_won as number | undefined,
    aerialDuelsLost: raw.player_match_aerials_lost as number | undefined,

    // Pressure
    pressures: raw.player_match_pressures as number | undefined,
    pressuresSuccessful: raw.player_match_pressure_regains as
      | number
      | undefined,

    // GK
    saves: raw.player_match_saves as number | undefined,
    psxG: raw.player_match_psxg as number | undefined,

    // OBV (On-Ball Value)
    obv: raw.player_match_obv as number | undefined,
    obvPass: raw.player_match_obv_pass as number | undefined,
    obvShot: raw.player_match_obv_shot as number | undefined,
    obvDefensiveAction: raw.player_match_obv_defensive_action as number | undefined,
    obvDribbleCarry: raw.player_match_obv_dribble_carry as number | undefined,
    obvGk: raw.player_match_obv_gk as number | undefined,
  };
}

// ============================================================================
// Player Linking Functions
// ============================================================================

/**
 * Get unlinked StatsBomb player mappings
 */
export const getUnlinkedPlayerMappings = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 100 }) => {
    return await ctx.db
      .query("statsbombPlayerMappings")
      .filter((q) => q.eq(q.field("playerId"), undefined))
      .take(limit);
  },
});

/**
 * Try to resolve a StatsBomb player to a canonical player
 * Returns the best match with confidence score
 */
export const tryResolvePlayer = internalQuery({
  args: {
    statsbombPlayerId: v.number(),
    playerName: v.string(),
  },
  handler: async (ctx, { statsbombPlayerId, playerName }) => {
    const normalizedInputName = normalizeName(playerName);

    // Strategy 1: Check existing external ID
    const existingExternal = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_provider_playerId", (q) =>
        q.eq("provider", "statsbomb").eq("providerPlayerId", String(statsbombPlayerId))
      )
      .first();

    if (existingExternal) {
      return {
        playerId: existingExternal.playerId,
        confidence: 1.0,
        reason: "existing_external_id",
      };
    }

    // Strategy 2: Check StatsBomb mapping table
    const existingMapping = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();

    if (existingMapping?.playerId) {
      return {
        playerId: existingMapping.playerId,
        confidence: 0.95,
        reason: "existing_mapping",
      };
    }

    // Strategy 3: Find by normalized name
    const byName = await ctx.db
      .query("players")
      .withIndex("by_nameNormalized", (q) =>
        q.eq("nameNormalized", normalizedInputName)
      )
      .collect();

    if (byName.length === 1) {
      return {
        playerId: byName[0]._id,
        confidence: 0.95,
        reason: "exact_name_match",
      };
    }

    if (byName.length > 1) {
      // Multiple matches - return the first one (most recently created)
      const sorted = byName.sort((a, b) => b._creationTime - a._creationTime);
      return {
        playerId: sorted[0]._id,
        confidence: 0.7,
        reason: `multiple_name_matches_${byName.length}`,
        candidateIds: byName.map(p => p._id),
      };
    }

    // Strategy 4: No match found - return null
    return {
      playerId: null,
      confidence: 0,
      reason: "no_match_found",
    };
  },
});

/**
 * Link a StatsBomb player and create external ID
 */
export const linkPlayerAndCreateExternal = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    playerId: v.id("players"),
    playerName: v.string(),
    confidence: v.number(),
  },
  handler: async (ctx, { statsbombPlayerId, playerId, playerName, confidence }) => {
    const now = Date.now();
    const providerPlayerId = String(statsbombPlayerId);

    // Create or update external ID
    const existingExternal = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_player_provider", (q) =>
        q.eq("playerId", playerId).eq("provider", "statsbomb")
      )
      .first();

    if (existingExternal) {
      await ctx.db.patch(existingExternal._id, {
        providerPlayerId,
        confidence,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("playerExternalIds", {
        playerId,
        provider: "statsbomb",
        providerPlayerId,
        confidence,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Update StatsBomb mapping
    const existingMapping = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();

    if (existingMapping) {
      await ctx.db.patch(existingMapping._id, {
        playerId,
        playerName,
        cachedAt: now,
      });
    }

    return { success: true };
  },
});

/**
 * Add a StatsBomb player to the unresolved queue
 */
export const addToUnresolvedQueue = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    playerName: v.string(),
    reason: v.string(),
    candidateIds: v.optional(v.array(v.id("players"))),
  },
  handler: async (ctx, { statsbombPlayerId, playerName, reason, candidateIds }) => {
    const now = Date.now();
    const providerPlayerId = String(statsbombPlayerId);

    // Check if already in queue
    const existing = await ctx.db
      .query("unresolvedExternalPlayers")
      .withIndex("by_provider_playerId", (q) =>
        q.eq("provider", "statsbomb").eq("providerPlayerId", providerPlayerId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        payload: { statsbombPlayerId, playerName },
        candidatePlayerIds: candidateIds,
        reason,
        status: "pending",
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("unresolvedExternalPlayers", {
      provider: "statsbomb",
      providerPlayerId,
      payload: { statsbombPlayerId, playerName },
      candidatePlayerIds: candidateIds,
      reason,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Get all StatsBomb player mappings
 */
export const getAllPlayerMappings = internalQuery({
  handler: async (ctx) => {
    return await ctx.db.query("statsbombPlayerMappings").collect();
  },
});

/**
 * Link a StatsBomb player to a canonical player
 */
export const linkPlayerMapping = internalMutation({
  args: {
    mappingId: v.id("statsbombPlayerMappings"),
    playerId: v.id("players"),
    confidence: v.number(),
  },
  handler: async (ctx, { mappingId, playerId, confidence }) => {
    const mapping = await ctx.db.get(mappingId);
    if (!mapping) throw new Error(`Mapping not found: ${mappingId}`);

    await linkStatsBombPlayer(
      ctx.db,
      mapping.statsbombPlayerId,
      playerId,
      mapping.playerName,
      confidence
    );

    return { success: true };
  },
});

/**
 * Internal action to resolve and link all unlinked StatsBomb players
 */
export const resolveAndLinkPlayers = internalAction({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 100 }) => {
    const unlinkedMappings = await ctx.runQuery(
      internal.ingest.statsbombIngest.getUnlinkedPlayerMappings,
      { limit }
    );

    console.log(`[StatsBomb] Found ${unlinkedMappings.length} unlinked player mappings`);

    let linked = 0;
    let addedToQueue = 0;
    let errors = 0;

    for (const mapping of unlinkedMappings) {
      try {
        // Try to resolve the player using the query
        const result = await ctx.runQuery(
          internal.ingest.statsbombIngest.tryResolvePlayer,
          {
            statsbombPlayerId: mapping.statsbombPlayerId,
            playerName: mapping.playerName,
          }
        );

        if (result.playerId && result.confidence >= 0.9) {
          // High confidence match - link automatically
          await ctx.runMutation(
            internal.ingest.statsbombIngest.linkPlayerAndCreateExternal,
            {
              statsbombPlayerId: mapping.statsbombPlayerId,
              playerId: result.playerId,
              playerName: mapping.playerName,
              confidence: result.confidence,
            }
          );
          console.log(
            `[StatsBomb] Linked: ${mapping.playerName} -> ${result.playerId} (${Math.round(result.confidence * 100)}%)`
          );
          linked++;
        } else {
          // Low confidence or no match - add to review queue
          await ctx.runMutation(
            internal.ingest.statsbombIngest.addToUnresolvedQueue,
            {
              statsbombPlayerId: mapping.statsbombPlayerId,
              playerName: mapping.playerName,
              reason: result.reason,
              candidateIds: result.candidateIds,
            }
          );
          console.log(
            `[StatsBomb] Added to queue: ${mapping.playerName} (${result.reason})`
          );
          addedToQueue++;
        }
      } catch (error) {
        console.error(
          `[StatsBomb] Error resolving ${mapping.playerName}: ${error}`
        );
        errors++;
      }
    }

    return {
      total: unlinkedMappings.length,
      linked,
      addedToQueue,
      errors,
    };
  },
});

/**
 * Update all players to have normalized names
 */
export const ensureNormalizedNames = internalMutation({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 500 }) => {
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

    return { updated, remaining: players.length === limit };
  },
});

/**
 * Create a canonical player from StatsBomb data
 * Requires competitionId, teamId, position, and positionGroup
 */
export const createPlayerFromStatsBomb = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    playerName: v.string(),
    competitionId: v.id("competitions"),
    teamId: v.id("teams"),
    position: v.string(),
    positionGroup: v.union(v.literal("GK"), v.literal("DEF"), v.literal("MID"), v.literal("ATT")),
  },
  handler: async (ctx, { statsbombPlayerId, playerName, competitionId, teamId, position, positionGroup }) => {
    const now = Date.now();
    const normalized = normalizeName(playerName);

    // Create the canonical player
    const playerId = await ctx.db.insert("players", {
      name: playerName,
      nameNormalized: normalized,
      provider: "statsbomb",
      providerPlayerId: String(statsbombPlayerId),
      competitionId,
      teamId,
      position,
      positionGroup,
      createdAt: now,
      updatedAt: now,
    });

    // Create external ID mapping
    await ctx.db.insert("playerExternalIds", {
      playerId,
      provider: "statsbomb",
      providerPlayerId: String(statsbombPlayerId),
      confidence: 1.0,
      createdAt: now,
      updatedAt: now,
    });

    // Update StatsBomb mapping
    const existingMapping = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();

    if (existingMapping) {
      await ctx.db.patch(existingMapping._id, {
        playerId,
        cachedAt: now,
      });
    }

    return playerId;
  },
});

/**
 * Find or create a team by StatsBomb team ID
 */
export const findOrCreateTeam = internalMutation({
  args: {
    statsbombTeamId: v.number(),
    teamName: v.string(),
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, { statsbombTeamId, teamName, competitionId }) => {
    // First try to find by provider team ID
    const existingByProvider = await ctx.db
      .query("teams")
      .withIndex("by_provider_team", (q) =>
        q.eq("provider", "statsbomb").eq("providerTeamId", String(statsbombTeamId))
      )
      .first();

    if (existingByProvider) {
      return existingByProvider._id;
    }

    // Try to find by name in the competition
    const normalizedName = teamName.toLowerCase().trim();
    const teamsInCompetition = await ctx.db
      .query("teams")
      .withIndex("by_competition", (q) => q.eq("competitionId", competitionId))
      .collect();

    for (const team of teamsInCompetition) {
      if (team.name.toLowerCase().trim() === normalizedName) {
        // Found by name - add the StatsBomb ID
        await ctx.db.patch(team._id, {
          providerTeamId: String(statsbombTeamId),
          provider: "statsbomb",
        });
        return team._id;
      }
    }

    // Create new team
    const now = Date.now();
    const teamId = await ctx.db.insert("teams", {
      name: teamName,
      competitionId,
      provider: "statsbomb",
      providerTeamId: String(statsbombTeamId),
      createdAt: now,
    });

    return teamId;
  },
});

/**
 * Create a player from StatsBomb match stats context
 */
export const createPlayerFromMatchStats = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    playerName: v.string(),
    teamId: v.id("teams"),
    competitionId: v.id("competitions"),
    position: v.optional(v.string()),
  },
  handler: async (ctx, { statsbombPlayerId, playerName, teamId, competitionId, position }) => {
    const now = Date.now();
    const normalized = normalizeName(playerName);

    // Map position to positionGroup
    const positionGroup = mapPositionToGroup(position);

    // Create the canonical player
    const playerId = await ctx.db.insert("players", {
      name: playerName,
      nameNormalized: normalized,
      provider: "statsbomb",
      providerPlayerId: String(statsbombPlayerId),
      competitionId,
      teamId,
      position: position || "Unknown",
      positionGroup,
      createdAt: now,
      updatedAt: now,
    });

    // Create external ID mapping
    await ctx.db.insert("playerExternalIds", {
      playerId,
      provider: "statsbomb",
      providerPlayerId: String(statsbombPlayerId),
      confidence: 1.0,
      createdAt: now,
      updatedAt: now,
    });

    // Update StatsBomb mapping
    const existingMapping = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();

    if (existingMapping) {
      await ctx.db.patch(existingMapping._id, {
        playerId,
        cachedAt: now,
      });
    }

    return playerId;
  },
});

/**
 * Map StatsBomb position string to position group
 */
function mapPositionToGroup(position?: string): "GK" | "DEF" | "MID" | "ATT" {
  if (!position) return "MID"; // Default to MID if unknown

  const pos = position.toLowerCase();
  if (pos.includes("goalkeeper") || pos.includes("gk")) return "GK";
  if (pos.includes("back") || pos.includes("defender") || pos.includes("center back") || pos.includes("wing back")) return "DEF";
  if (pos.includes("forward") || pos.includes("striker") || pos.includes("wing") && !pos.includes("back")) return "ATT";
  return "MID"; // Midfielders and anything else
}

/**
 * Ingest all players from a specific competition using season stats
 * Now checks for existing players to prevent duplicates!
 */
export const ingestPlayersFromSeason = internalAction({
  args: {
    competitionSeasonId: v.id("statsbombCompetitionSeasons"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { competitionSeasonId, limit = 1000 }) => {
    const cs = await ctx.runQuery(
      internal.ingest.statsbombIngest.getCompetitionSeason,
      { id: competitionSeasonId }
    );

    if (!cs) {
      throw new Error(`Competition season not found: ${competitionSeasonId}`);
    }

    if (!cs.competitionId) {
      console.log(`[StatsBomb] Competition season ${cs.name} not linked to canonical competition`);
      return { created: 0, linked: 0, skipped: 0, resolved: 0, error: "No canonical competition" };
    }

    console.log(`[StatsBomb] Fetching season player stats for ${cs.name} ${cs.season}`);
    const seasonStats = await StatsBomb.fetchSeasonPlayerStats(
      cs.statsbombCompetitionId,
      cs.statsbombSeasonId
    );

    console.log(`[StatsBomb] Found ${seasonStats.length} players`);

    let created = 0;
    let linked = 0;
    let skipped = 0;
    let resolved = 0; // Players that were matched to existing records

    for (const stat of seasonStats.slice(0, limit)) {
      try {
        // Check if StatsBomb player ID already has external mapping
        const existingMapping = await ctx.runQuery(
          internal.ingest.statsbombIngest.getStatsBombExternalId,
          { statsbombPlayerId: stat.player_id }
        );

        if (existingMapping) {
          linked++;
          continue;
        }

        // TRY TO RESOLVE TO EXISTING PLAYER FIRST (prevents duplicates!)
        const resolveResult = await ctx.runQuery(
          internal.ingest.statsbombIngest.tryResolveToExistingPlayer,
          {
            playerName: stat.player_name,
            competitionId: cs.competitionId,
          }
        );

        if (resolveResult.playerId && resolveResult.confidence >= 0.9) {
          // Found existing player - create external ID link instead of new player
          await ctx.runMutation(
            internal.ingest.statsbombIngest.linkStatsBombToExistingPlayer,
            {
              statsbombPlayerId: stat.player_id,
              existingPlayerId: resolveResult.playerId,
              playerName: stat.player_name,
              confidence: resolveResult.confidence,
            }
          );
          console.log(`[StatsBomb] Resolved: ${stat.player_name} -> existing player (${Math.round(resolveResult.confidence * 100)}%)`);
          resolved++;
          continue;
        }

        // No existing player found - create new one
        // Find or create the team
        const teamId = await ctx.runMutation(
          internal.ingest.statsbombIngest.findOrCreateTeam,
          {
            statsbombTeamId: stat.team_id,
            teamName: stat.team_name,
            competitionId: cs.competitionId,
          }
        );

        // Create the player
        await ctx.runMutation(
          internal.ingest.statsbombIngest.createPlayerFromMatchStats,
          {
            statsbombPlayerId: stat.player_id,
            playerName: stat.player_name,
            teamId,
            competitionId: cs.competitionId,
          }
        );

        console.log(`[StatsBomb] Created: ${stat.player_name} (${stat.team_name})`);
        created++;
      } catch (error) {
        console.error(`[StatsBomb] Error processing ${stat.player_name}: ${error}`);
        skipped++;
      }
    }

    return { created, linked, skipped, resolved, total: seasonStats.length };
  },
});

/**
 * Try to resolve a player name to an existing canonical player
 */
export const tryResolveToExistingPlayer = internalQuery({
  args: {
    playerName: v.string(),
    competitionId: v.id("competitions"),
  },
  handler: async (ctx, { playerName, competitionId }) => {
    const normalizedName = normalizeName(playerName);

    // Strategy 1: Exact normalized name match
    const exactMatches = await ctx.db
      .query("players")
      .withIndex("by_nameNormalized", (q) => q.eq("nameNormalized", normalizedName))
      .collect();

    // Prefer matches from any provider EXCEPT statsbomb (to find API-Football originals)
    const nonStatsbombMatches = exactMatches.filter((p) => p.provider !== "statsbomb");

    if (nonStatsbombMatches.length === 1) {
      return {
        playerId: nonStatsbombMatches[0]._id,
        confidence: 0.95,
        reason: "exact_name_match_non_statsbomb",
      };
    }

    // Strategy 2: Match within competition
    if (nonStatsbombMatches.length === 0 && exactMatches.length > 0) {
      // Check if any match is in the same competition
      const sameCompetition = exactMatches.filter((p) =>
        p.competitionId === competitionId && p.provider !== "statsbomb"
      );
      if (sameCompetition.length === 1) {
        return {
          playerId: sameCompetition[0]._id,
          confidence: 0.92,
          reason: "exact_name_match_same_competition",
        };
      }
    }

    // Strategy 3: Search within competition players for fuzzy match
    const competitionPlayers = await ctx.db
      .query("players")
      .withIndex("by_competition", (q) => q.eq("competitionId", competitionId))
      .filter((q) => q.neq(q.field("provider"), "statsbomb"))
      .collect();

    for (const player of competitionPlayers) {
      const playerNormalized = player.nameNormalized || normalizeName(player.name);
      if (playerNormalized === normalizedName) {
        return {
          playerId: player._id,
          confidence: 0.93,
          reason: "exact_name_in_competition",
        };
      }
    }

    // No match found
    return {
      playerId: null,
      confidence: 0,
      reason: "no_match_found",
    };
  },
});

/**
 * Link a StatsBomb player ID to an existing canonical player
 */
export const linkStatsBombToExistingPlayer = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    existingPlayerId: v.id("players"),
    playerName: v.string(),
    confidence: v.number(),
  },
  handler: async (ctx, { statsbombPlayerId, existingPlayerId, playerName, confidence }) => {
    const now = Date.now();
    const providerPlayerId = String(statsbombPlayerId);

    // Create external ID mapping
    const existingExternal = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_player_provider", (q) =>
        q.eq("playerId", existingPlayerId).eq("provider", "statsbomb")
      )
      .first();

    if (!existingExternal) {
      await ctx.db.insert("playerExternalIds", {
        playerId: existingPlayerId,
        provider: "statsbomb",
        providerPlayerId,
        confidence,
        createdAt: now,
        updatedAt: now,
      });
    }

    // Update StatsBomb mapping
    const existingMapping = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();

    if (existingMapping) {
      await ctx.db.patch(existingMapping._id, {
        playerId: existingPlayerId,
        playerName,
        cachedAt: now,
      });
    } else {
      await ctx.db.insert("statsbombPlayerMappings", {
        statsbombPlayerId,
        playerName,
        playerId: existingPlayerId,
        cachedAt: now,
      });
    }

    return { linked: true, playerId: existingPlayerId };
  },
});

/**
 * Public action to ingest all players from a StatsBomb competition season
 * This creates canonical players with proper team/competition context
 */
export const triggerIngestPlayersFromSeason = action({
  args: {
    competitionSeasonId: v.optional(v.id("statsbombCompetitionSeasons")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { competitionSeasonId, limit }) => {
    try {
      // First ensure all existing players have normalized names
      await ctx.runMutation(
        internal.ingest.statsbombIngest.ensureNormalizedNames,
        { limit: 1000 }
      );

      // If no competition season provided, get the first active one
      let csId = competitionSeasonId;
      if (!csId) {
        const seasons = await ctx.runQuery(
          internal.ingest.statsbombIngest.getActiveCompetitionSeasons
        );
        if (seasons.length === 0) {
          return { success: false, error: "No active competition seasons found" };
        }
        csId = seasons[0]._id;
        console.log(`[StatsBomb] Using competition season: ${seasons[0].name} ${seasons[0].season}`);
      }

      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.ingestPlayersFromSeason,
        { competitionSeasonId: csId, limit: limit ?? 1000 }
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Public action to ingest players from ALL active competition seasons
 */
export const triggerIngestAllPlayers = action({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    try {
      // First ensure all existing players have normalized names
      await ctx.runMutation(
        internal.ingest.statsbombIngest.ensureNormalizedNames,
        { limit: 1000 }
      );

      // Get all active competition seasons
      const seasons = await ctx.runQuery(
        internal.ingest.statsbombIngest.getActiveCompetitionSeasons
      );

      if (seasons.length === 0) {
        return { success: false, error: "No active competition seasons found" };
      }

      console.log(`[StatsBomb] Found ${seasons.length} competition seasons to process`);

      const results: Array<{ name: string; created: number; linked: number; skipped: number }> = [];

      for (const cs of seasons) {
        if (!cs.competitionId) {
          console.log(`[StatsBomb] Skipping ${cs.name} - no canonical competition linked`);
          continue;
        }

        console.log(`[StatsBomb] Processing: ${cs.name} ${cs.season}`);

        const result = await ctx.runAction(
          internal.ingest.statsbombIngest.ingestPlayersFromSeason,
          { competitionSeasonId: cs._id, limit: limit ?? 1000 }
        );

        results.push({
          name: `${cs.name} ${cs.season}`,
          created: result.created,
          linked: result.linked,
          skipped: result.skipped,
        });
      }

      const totals = results.reduce(
        (acc, r) => ({
          created: acc.created + r.created,
          linked: acc.linked + r.linked,
          skipped: acc.skipped + r.skipped,
        }),
        { created: 0, linked: 0, skipped: 0 }
      );

      return { success: true, results, totals };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Public action to trigger player linking
 */
export const triggerPlayerLinking = action({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    try {
      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.resolveAndLinkPlayers,
        { limit: limit ?? 500 }
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

// Export for public API testing
export const testStatsBombConnection = action({
  handler: async () => {
    if (!StatsBomb.isConfigured()) {
      return { success: false, error: "Credentials not configured" };
    }

    try {
      const competitions = await StatsBomb.fetchCompetitions();
      return {
        success: true,
        competitionsCount: competitions.length,
        sample: competitions.slice(0, 3).map((c) => ({
          name: c.competition_name,
          country: c.country_name,
          season: c.season_name,
        })),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Public action to trigger a full StatsBomb sync
 * Use this to manually run a sync from the CLI for testing
 */
export const triggerFullSync = action({
  handler: async (ctx) => {
    if (!StatsBomb.isConfigured()) {
      return { success: false, error: "Credentials not configured" };
    }

    try {
      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.runDailySync,
        {}
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Get stats about StatsBomb data ingestion
 */
export const getStatsBombStats = action({
  handler: async (ctx) => {
    const stats = await ctx.runQuery(
      internal.ingest.statsbombIngest.getIngestionStats
    );
    return stats;
  },
});

/**
 * Internal query to get ingestion statistics
 */
export const getIngestionStats = internalQuery({
  handler: async (ctx) => {
    // Count ALL players
    const allPlayers = await ctx.db.query("players").collect();

    // Count players by provider
    const statsbombPlayers = allPlayers.filter((p) => p.provider === "statsbomb");
    const apiFootballPlayers = allPlayers.filter((p) => p.provider === "apiFootball");

    // Count external IDs for statsbomb
    const statsbombExternalIds = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_provider_playerId")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .collect();

    // Count player mappings
    const playerMappings = await ctx.db
      .query("statsbombPlayerMappings")
      .collect();

    const linkedMappings = playerMappings.filter((m) => m.playerId);
    const unlinkedMappings = playerMappings.filter((m) => !m.playerId);

    // Count competition seasons
    const competitionSeasons = await ctx.db
      .query("statsbombCompetitionSeasons")
      .collect();

    const linkedCompetitions = competitionSeasons.filter((c) => c.competitionId);

    // Count matches
    const matches = await ctx.db.query("statsbombMatches").collect();
    const availableMatches = matches.filter((m) => m.status === "available");

    return {
      allPlayers: allPlayers.length,
      playersByProvider: {
        statsbomb: statsbombPlayers.length,
        apiFootball: apiFootballPlayers.length,
        other: allPlayers.length - statsbombPlayers.length - apiFootballPlayers.length,
      },
      statsbombPlayers: {
        total: statsbombPlayers.length,
        byCompetition: Object.entries(
          statsbombPlayers.reduce((acc, p) => {
            acc[p.competitionId] = (acc[p.competitionId] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        ).slice(0, 10),
      },
      externalIds: statsbombExternalIds.length,
      playerMappings: {
        total: playerMappings.length,
        linked: linkedMappings.length,
        unlinked: unlinkedMappings.length,
      },
      competitionSeasons: {
        total: competitionSeasons.length,
        linked: linkedCompetitions.length,
      },
      matches: {
        total: matches.length,
        available: availableMatches.length,
      },
    };
  },
});

/**
 * Find potential duplicate players between providers
 */
export const findPotentialDuplicates = internalQuery({
  handler: async (ctx) => {
    const allPlayers = await ctx.db.query("players").collect();

    // Group players by normalized name
    const playersByName: Record<string, typeof allPlayers> = {};
    for (const player of allPlayers) {
      const key = player.nameNormalized || normalizeName(player.name);
      if (!playersByName[key]) {
        playersByName[key] = [];
      }
      playersByName[key].push(player);
    }

    // Find names with multiple players from different providers
    const duplicates: Array<{
      name: string;
      players: Array<{
        id: string;
        name: string;
        provider: string;
        team: string;
        competitionId: string;
      }>;
    }> = [];

    for (const [normalizedName, players] of Object.entries(playersByName)) {
      if (players.length > 1) {
        const providers = new Set(players.map((p) => p.provider));
        // Only report if there are multiple providers (true duplicates)
        if (providers.size > 1) {
          duplicates.push({
            name: normalizedName,
            players: players.map((p) => ({
              id: p._id,
              name: p.name,
              provider: p.provider,
              team: p.teamId,
              competitionId: p.competitionId,
            })),
          });
        }
      }
    }

    return {
      totalDuplicateGroups: duplicates.length,
      totalDuplicatePlayers: duplicates.reduce((acc, d) => acc + d.players.length, 0),
      samples: duplicates.slice(0, 20),
    };
  },
});

/**
 * Public action to find duplicates
 */
export const getDuplicatePlayers = action({
  handler: async (ctx) => {
    return await ctx.runQuery(
      internal.ingest.statsbombIngest.findPotentialDuplicates
    );
  },
});

/**
 * Get sample players from each provider for comparison
 */
export const getSamplePlayers = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 10 }) => {
    const allPlayers = await ctx.db.query("players").collect();

    const statsbombPlayers = allPlayers
      .filter((p) => p.provider === "statsbomb")
      .slice(0, limit);
    const apiFootballPlayers = allPlayers
      .filter((p) => p.provider === "apiFootball")
      .slice(0, limit);

    return {
      statsbomb: statsbombPlayers.map((p) => ({
        id: p._id,
        name: p.name,
        nameNormalized: p.nameNormalized,
        position: p.position,
        positionGroup: p.positionGroup,
        teamId: p.teamId,
        competitionId: p.competitionId,
        providerPlayerId: p.providerPlayerId,
      })),
      apiFootball: apiFootballPlayers.map((p) => ({
        id: p._id,
        name: p.name,
        nameNormalized: p.nameNormalized,
        position: p.position,
        positionGroup: p.positionGroup,
        teamId: p.teamId,
        competitionId: p.competitionId,
        providerPlayerId: p.providerPlayerId,
      })),
    };
  },
});

/**
 * Check what StatsBomb match stats we have
 */
export const getStatsBombMatchStats = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 10 }) => {
    const matchStats = await ctx.db
      .query("providerPlayerMatchStats")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .take(limit);

    return {
      count: matchStats.length,
      samples: matchStats.map((s) => ({
        playerId: s.playerId,
        matchKey: s.matchKey,
        matchDate: s.matchDate,
        minutes: s.minutes,
        stats: s.stats,
        hasRaw: !!s.raw,
        hasFeatures: !!s.features,
      })),
    };
  },
});

/**
 * Get sample stats with detailed data (small query)
 */
export const getSampleDetailedStats = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 20 }) => {
    // Get sample stats with xG > 0
    const sampleStats = await ctx.db
      .query("providerPlayerMatchStats")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .take(limit);

    return sampleStats.map((s) => ({
      playerId: s.playerId,
      matchDate: s.matchDate,
      matchKey: s.matchKey,
      minutes: s.minutes,
      stats: s.stats,
      features: s.features ? Object.keys(s.features as Record<string, unknown>).slice(0, 10) : [],
    }));
  },
});

/**
 * Count total StatsBomb match stats records
 */
export const countMatchStatsRecords = internalAction({
  handler: async (ctx) => {
    // Count in batches to avoid memory issues
    let total = 0;
    let cursor: string | null = null;
    const batchSize = 1000;

    // We'll estimate by sampling
    const sample = await ctx.runQuery(
      internal.ingest.statsbombIngest.getStatsBombMatchStats,
      { limit: 100 }
    );

    // Get total from matches ingested
    const matchStatus = await ctx.runQuery(
      internal.ingest.statsbombIngest.countMatchesByStatus
    );

    // Estimate: ~31 players per match average
    const estimatedTotal = matchStatus.ingested * 31;

    return {
      matchesIngested: matchStatus.ingested,
      sampleRecords: sample.count,
      estimatedTotalRecords: estimatedTotal,
      sampleWithXG: sample.samples.filter((s) => s.stats?.xG && s.stats.xG > 0).length,
    };
  },
});

/**
 * Public action to get stats summary
 */
export const getStatsSummary = action({
  handler: async (ctx) => {
    const counts = await ctx.runAction(
      internal.ingest.statsbombIngest.countMatchStatsRecords
    );
    const samples = await ctx.runQuery(
      internal.ingest.statsbombIngest.getSampleDetailedStats,
      { limit: 10 }
    );
    return { counts, samples };
  },
});

// ============================================================================
// Deduplication Functions
// ============================================================================

/**
 * Merge a duplicate StatsBomb player into an API-Football player
 * - Creates external ID linking StatsBomb ID to API-Football player
 * - Updates StatsBomb mapping to point to API-Football player
 * - Deletes the duplicate StatsBomb player record
 */
export const mergeDuplicatePlayer = internalMutation({
  args: {
    statsbombPlayerId: v.id("players"),
    apiFootballPlayerId: v.id("players"),
  },
  handler: async (ctx, { statsbombPlayerId, apiFootballPlayerId }) => {
    const statsbombPlayer = await ctx.db.get(statsbombPlayerId);
    const apiFootballPlayer = await ctx.db.get(apiFootballPlayerId);

    if (!statsbombPlayer || !apiFootballPlayer) {
      throw new Error("One or both players not found");
    }

    if (statsbombPlayer.provider !== "statsbomb") {
      throw new Error("First player must be StatsBomb provider");
    }

    const now = Date.now();

    // 1. Create external ID linking StatsBomb ID to API-Football player
    const existingExternal = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_player_provider", (q) =>
        q.eq("playerId", apiFootballPlayerId).eq("provider", "statsbomb")
      )
      .first();

    if (!existingExternal) {
      await ctx.db.insert("playerExternalIds", {
        playerId: apiFootballPlayerId,
        provider: "statsbomb",
        providerPlayerId: statsbombPlayer.providerPlayerId,
        confidence: 0.95,
        createdAt: now,
        updatedAt: now,
      });
    }

    // 2. Update StatsBomb mapping to point to API-Football player
    const sbMapping = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", parseInt(statsbombPlayer.providerPlayerId))
      )
      .first();

    if (sbMapping) {
      await ctx.db.patch(sbMapping._id, {
        playerId: apiFootballPlayerId,
        cachedAt: now,
      });
    }

    // 3. Delete the old external ID for the StatsBomb player (if any)
    const oldExternal = await ctx.db
      .query("playerExternalIds")
      .withIndex("by_player_provider", (q) =>
        q.eq("playerId", statsbombPlayerId).eq("provider", "statsbomb")
      )
      .first();

    if (oldExternal) {
      await ctx.db.delete(oldExternal._id);
    }

    // 4. Delete the duplicate StatsBomb player record
    await ctx.db.delete(statsbombPlayerId);

    return {
      merged: true,
      canonicalPlayerId: apiFootballPlayerId,
      deletedPlayerId: statsbombPlayerId,
    };
  },
});

/**
 * Find and merge all duplicate players automatically
 */
export const mergeAllDuplicates = internalAction({
  args: { limit: v.optional(v.number()), dryRun: v.optional(v.boolean()) },
  handler: async (ctx, { limit = 100, dryRun = false }) => {
    // Find duplicates
    const duplicates = await ctx.runQuery(
      internal.ingest.statsbombIngest.findPotentialDuplicates
    );

    console.log(`[Dedup] Found ${duplicates.totalDuplicateGroups} duplicate groups`);

    let merged = 0;
    let skipped = 0;
    let errors = 0;

    for (const group of duplicates.samples.slice(0, limit)) {
      // Find API-Football and StatsBomb players in this group
      const apiFootballPlayer = group.players.find((p) => p.provider === "apiFootball");
      const statsbombPlayer = group.players.find((p) => p.provider === "statsbomb");

      if (!apiFootballPlayer || !statsbombPlayer) {
        console.log(`[Dedup] Skipping ${group.name} - not a StatsBomb/API-Football duplicate`);
        skipped++;
        continue;
      }

      if (dryRun) {
        console.log(`[Dedup] Would merge: ${group.name} (${statsbombPlayer.id} -> ${apiFootballPlayer.id})`);
        merged++;
        continue;
      }

      try {
        await ctx.runMutation(
          internal.ingest.statsbombIngest.mergeDuplicatePlayer,
          {
            statsbombPlayerId: statsbombPlayer.id as Id<"players">,
            apiFootballPlayerId: apiFootballPlayer.id as Id<"players">,
          }
        );
        console.log(`[Dedup] Merged: ${group.name}`);
        merged++;
      } catch (error) {
        console.error(`[Dedup] Error merging ${group.name}: ${error}`);
        errors++;
      }
    }

    return {
      totalDuplicates: duplicates.totalDuplicateGroups,
      processed: merged + skipped + errors,
      merged,
      skipped,
      errors,
      dryRun,
    };
  },
});

/**
 * Public action to trigger deduplication
 */
export const triggerDeduplication = action({
  args: { limit: v.optional(v.number()), dryRun: v.optional(v.boolean()) },
  handler: async (ctx, { limit, dryRun }) => {
    try {
      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.mergeAllDuplicates,
        { limit: limit ?? 500, dryRun: dryRun ?? false }
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

// ============================================================================
// Player Mapping Ingestion (from /api/v1/player-mapping endpoint)
// ============================================================================

/**
 * Upsert a player mapping with full bio data from player-mapping endpoint
 */
export const upsertFullPlayerMapping = internalMutation({
  args: {
    statsbombPlayerId: v.number(),
    livePlayerId: v.optional(v.number()),
    sbPlayerId: v.optional(v.number()),
    playerName: v.string(),
    playerNickname: v.optional(v.string()),
    birthDate: v.optional(v.string()),
    heightCm: v.optional(v.number()),
    weightKg: v.optional(v.number()),
    countryId: v.optional(v.number()),
    countryName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Check if mapping already exists
    const existing = await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", args.statsbombPlayerId)
      )
      .first();

    if (existing) {
      // Update with new bio data (only if not already set or if different)
      await ctx.db.patch(existing._id, {
        livePlayerId: args.livePlayerId ?? existing.livePlayerId,
        sbPlayerId: args.sbPlayerId ?? existing.sbPlayerId,
        playerName: args.playerName,
        playerNickname: args.playerNickname ?? existing.playerNickname,
        birthDate: args.birthDate ?? existing.birthDate,
        heightCm: args.heightCm ?? existing.heightCm,
        weightKg: args.weightKg ?? existing.weightKg,
        countryId: args.countryId ?? existing.countryId,
        countryName: args.countryName ?? existing.countryName,
        cachedAt: now,
      });
      return { updated: true, id: existing._id };
    }

    // Create new mapping
    const id = await ctx.db.insert("statsbombPlayerMappings", {
      statsbombPlayerId: args.statsbombPlayerId,
      livePlayerId: args.livePlayerId,
      sbPlayerId: args.sbPlayerId,
      playerName: args.playerName,
      playerNickname: args.playerNickname,
      birthDate: args.birthDate,
      heightCm: args.heightCm,
      weightKg: args.weightKg,
      countryId: args.countryId,
      countryName: args.countryName,
      cachedAt: now,
    });

    return { created: true, id };
  },
});

/**
 * Ingest player mappings from StatsBomb player-mapping endpoint
 * This is the best source for player identity resolution and bio data
 */
export const ingestPlayerMappings = internalAction({
  handler: async (ctx) => {
    if (!StatsBomb.isConfigured()) {
      console.log("[StatsBomb] Credentials not configured, skipping player mapping ingestion");
      return { success: false, error: "Credentials not configured" };
    }

    console.log("[StatsBomb] Fetching player mappings from /api/v1/player-mapping...");

    try {
      const mappings = await StatsBomb.fetchPlayerMappings();
      console.log(`[StatsBomb] Received ${mappings.length} player mappings`);

      let created = 0;
      let updated = 0;
      let errors = 0;

      for (const mapping of mappings) {
        try {
          const result = await ctx.runMutation(
            internal.ingest.statsbombIngest.upsertFullPlayerMapping,
            {
              statsbombPlayerId: mapping.offline_player_id,
              livePlayerId: mapping.live_player_id,
              sbPlayerId: mapping.sb_player_id,
              playerName: mapping.player_name,
              playerNickname: mapping.player_nickname ?? undefined,
              birthDate: mapping.birth_date,
              heightCm: mapping.height,
              weightKg: mapping.weight,
              countryId: mapping.country?.id,
              countryName: mapping.country?.name,
            }
          );

          if (result.created) created++;
          else if (result.updated) updated++;
        } catch (error) {
          console.error(`[StatsBomb] Error storing mapping for ${mapping.player_name}: ${error}`);
          errors++;
        }
      }

      console.log(`[StatsBomb] Player mappings: ${created} created, ${updated} updated, ${errors} errors`);

      return {
        success: true,
        total: mappings.length,
        created,
        updated,
        errors,
      };
    } catch (error) {
      console.error(`[StatsBomb] Error fetching player mappings: ${error}`);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Public action to trigger player mapping ingestion
 */
export const triggerIngestPlayerMappings = action({
  handler: async (ctx) => {
    try {
      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.ingestPlayerMappings,
        {}
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

// ============================================================================
// Player Bio Backfill
// ============================================================================

/**
 * Get players that need bio backfill (have StatsBomb external ID but missing bio fields)
 */
export const getPlayersNeedingBioBackfill = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 100 }) => {
    // Get all StatsBomb external IDs
    const externalIds = await ctx.db
      .query("playerExternalIds")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .collect();

    const playersNeedingBackfill: Array<{
      playerId: string;
      statsbombPlayerId: number;
      playerName: string;
      missingFields: string[];
    }> = [];

    for (const ext of externalIds) {
      const player = await ctx.db.get(ext.playerId);
      if (!player) continue;

      const missingFields: string[] = [];
      if (!player.birthDate) missingFields.push("birthDate");
      if (!player.heightCm) missingFields.push("heightCm");
      if (!player.weightKg) missingFields.push("weightKg");

      if (missingFields.length > 0) {
        playersNeedingBackfill.push({
          playerId: player._id,
          statsbombPlayerId: parseInt(ext.providerPlayerId),
          playerName: player.name,
          missingFields,
        });

        if (playersNeedingBackfill.length >= limit) break;
      }
    }

    return playersNeedingBackfill;
  },
});

/**
 * Get StatsBomb mapping with bio data
 */
export const getStatsBombMappingWithBio = internalQuery({
  args: { statsbombPlayerId: v.number() },
  handler: async (ctx, { statsbombPlayerId }) => {
    return await ctx.db
      .query("statsbombPlayerMappings")
      .withIndex("by_statsbomb_id", (q) =>
        q.eq("statsbombPlayerId", statsbombPlayerId)
      )
      .first();
  },
});

/**
 * Update player bio fields
 */
export const updatePlayerBio = internalMutation({
  args: {
    playerId: v.id("players"),
    birthDate: v.optional(v.string()),
    heightCm: v.optional(v.number()),
    weightKg: v.optional(v.number()),
  },
  handler: async (ctx, { playerId, birthDate, heightCm, weightKg }) => {
    const player = await ctx.db.get(playerId);
    if (!player) throw new Error(`Player not found: ${playerId}`);

    const updates: Record<string, unknown> = {};
    let fieldsUpdated = 0;

    // Only update if currently empty
    if (birthDate && !player.birthDate) {
      updates.birthDate = birthDate;
      fieldsUpdated++;
    }
    if (heightCm && !player.heightCm) {
      updates.heightCm = heightCm;
      fieldsUpdated++;
    }
    if (weightKg && !player.weightKg) {
      updates.weightKg = weightKg;
      fieldsUpdated++;
    }

    if (fieldsUpdated > 0) {
      updates.updatedAt = Date.now();
      await ctx.db.patch(playerId, updates);
    }

    return { updated: fieldsUpdated > 0, fieldsUpdated };
  },
});

/**
 * Backfill player bio data from StatsBomb mappings
 */
export const backfillPlayerBio = internalAction({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 500 }) => {
    // Get players needing bio backfill
    const playersNeedingBackfill = await ctx.runQuery(
      internal.ingest.statsbombIngest.getPlayersNeedingBioBackfill,
      { limit }
    );

    console.log(`[StatsBomb] Found ${playersNeedingBackfill.length} players needing bio backfill`);

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const player of playersNeedingBackfill) {
      try {
        // Get StatsBomb mapping with bio data
        const mapping = await ctx.runQuery(
          internal.ingest.statsbombIngest.getStatsBombMappingWithBio,
          { statsbombPlayerId: player.statsbombPlayerId }
        );

        if (!mapping) {
          console.log(`[StatsBomb] No mapping found for ${player.playerName} (${player.statsbombPlayerId})`);
          skipped++;
          continue;
        }

        // Check if mapping has any bio data to backfill
        if (!mapping.birthDate && !mapping.heightCm && !mapping.weightKg) {
          skipped++;
          continue;
        }

        // Update player
        const result = await ctx.runMutation(
          internal.ingest.statsbombIngest.updatePlayerBio,
          {
            playerId: player.playerId as Id<"players">,
            birthDate: mapping.birthDate,
            heightCm: mapping.heightCm,
            weightKg: mapping.weightKg,
          }
        );

        if (result.updated) {
          console.log(`[StatsBomb] Updated bio for ${player.playerName}: ${result.fieldsUpdated} fields`);
          updated++;
        } else {
          skipped++;
        }
      } catch (error) {
        console.error(`[StatsBomb] Error backfilling bio for ${player.playerName}: ${error}`);
        errors++;
      }
    }

    return {
      total: playersNeedingBackfill.length,
      updated,
      skipped,
      errors,
    };
  },
});

/**
 * Public action to trigger bio backfill
 */
export const triggerBackfillPlayerBio = action({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    try {
      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.backfillPlayerBio,
        { limit: limit ?? 500 }
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Get bio backfill statistics
 */
export const getBioBackfillStats = internalQuery({
  handler: async (ctx) => {
    // Get all players with StatsBomb external IDs
    const externalIds = await ctx.db
      .query("playerExternalIds")
      .filter((q) => q.eq(q.field("provider"), "statsbomb"))
      .collect();

    let withBirthDate = 0;
    let withHeight = 0;
    let withWeight = 0;
    let missingAll = 0;
    let hasAll = 0;

    for (const ext of externalIds) {
      const player = await ctx.db.get(ext.playerId);
      if (!player) continue;

      if (player.birthDate) withBirthDate++;
      if (player.heightCm) withHeight++;
      if (player.weightKg) withWeight++;

      if (!player.birthDate && !player.heightCm && !player.weightKg) {
        missingAll++;
      }
      if (player.birthDate && player.heightCm && player.weightKg) {
        hasAll++;
      }
    }

    // Get StatsBomb mappings with bio data
    const mappings = await ctx.db.query("statsbombPlayerMappings").collect();
    const mappingsWithBio = mappings.filter(
      (m) => m.birthDate || m.heightCm || m.weightKg
    );

    return {
      playersWithStatsBomb: externalIds.length,
      playersWithBirthDate: withBirthDate,
      playersWithHeight: withHeight,
      playersWithWeight: withWeight,
      playersHasAllBio: hasAll,
      playersMissingAllBio: missingAll,
      statsbombMappingsTotal: mappings.length,
      statsbombMappingsWithBio: mappingsWithBio.length,
    };
  },
});

/**
 * Public action to get bio backfill stats
 */
export const getBioStats = action({
  handler: async (ctx) => {
    return await ctx.runQuery(
      internal.ingest.statsbombIngest.getBioBackfillStats
    );
  },
});

// ============================================================================
// Season Stats Ingestion
// ============================================================================

/**
 * Upsert season player aggregates
 */
export const upsertSeasonAggregates = internalMutation({
  args: {
    playerId: v.id("players"),
    competitionId: v.optional(v.id("competitions")),
    teamId: v.optional(v.id("teams")),
    season: v.string(),
    minutes: v.number(),
    appearances: v.number(),
    totals: v.optional(v.any()),
    per90: v.optional(v.any()),
    additionalStats: v.optional(v.any()),
    raw: v.optional(v.any()),
    features: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Check if aggregate already exists
    const existing = await ctx.db
      .query("providerPlayerAggregates")
      .filter((q) =>
        q.and(
          q.eq(q.field("playerId"), args.playerId),
          q.eq(q.field("provider"), "statsbomb"),
          q.eq(q.field("season"), args.season)
        )
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        minutes: args.minutes,
        appearances: args.appearances,
        totals: args.totals,
        per90: args.per90,
        additionalStats: args.additionalStats,
        raw: args.raw,
        features: args.features,
        fetchedAt: now,
      });
      return { updated: true, id: existing._id };
    }

    const id = await ctx.db.insert("providerPlayerAggregates", {
      playerId: args.playerId,
      provider: "statsbomb",
      competitionId: args.competitionId,
      teamId: args.teamId,
      window: "season",
      season: args.season,
      minutes: args.minutes,
      appearances: args.appearances,
      totals: args.totals,
      per90: args.per90,
      additionalStats: args.additionalStats,
      raw: args.raw,
      features: args.features,
      fetchedAt: now,
    });

    return { created: true, id };
  },
});

/**
 * Extract season features from raw stats
 * NOTE: StatsBomb API returns per-90 values with _90 suffix (e.g., player_season_goals_90)
 */
function extractSeasonRatingFeatures(
  raw: StatsBomb.StatsBombSeasonPlayerStats
): Record<string, number | undefined> {
  // Cast raw to any to access dynamic field names
  const r = raw as Record<string, unknown>;

  return {
    // Minutes and appearances
    minutes: r.player_season_minutes as number | undefined,
    minutes360: r.player_season_360_minutes as number | undefined,
    appearances: r.player_season_appearances as number | undefined,

    // Shooting (per-90 values from API)
    goals: r.player_season_goals_90 as number | undefined,
    npxG: r.player_season_np_xg_90 as number | undefined,
    shots: r.player_season_shots_90 as number | undefined,
    shotsOnTarget: r.player_season_shots_on_target_90 as number | undefined,

    // Passing (per-90 values from API)
    assists: r.player_season_assists_90 as number | undefined,
    xA: r.player_season_xa_90 as number | undefined,
    progressivePasses: r.player_season_progressive_passes_90 as number | undefined,
    keyPasses: r.player_season_key_passes_90 as number | undefined,

    // Carrying (per-90 values from API)
    progressiveCarries: r.player_season_progressive_carries_90 as number | undefined,
    takeOnsSuccessful: r.player_season_successful_dribbles_90 as number | undefined,

    // Creating (per-90 values from API)
    shotCreatingActions: r.player_season_shot_creating_actions_90 as number | undefined,
    goalCreatingActions: r.player_season_goal_creating_actions_90 as number | undefined,

    // Defensive (per-90 values from API)
    tackles: r.player_season_tackles_90 as number | undefined,
    interceptions: r.player_season_interceptions_90 as number | undefined,
    blocks: r.player_season_blocks_90 as number | undefined,
    clearances: r.player_season_clearances_90 as number | undefined,
    aerialDuelsWon: r.player_season_aerial_wins_90 as number | undefined,

    // Pressure (per-90 values from API)
    pressures: r.player_season_pressures_90 as number | undefined,
    pressuresSuccessful: r.player_season_pressure_regains_90 as number | undefined,

    // GK (per-90 values from API)
    saves: r.player_season_saves_90 as number | undefined,
    psxG: r.player_season_psxg_90 as number | undefined,
    goalsAgainst: r.player_season_goals_faced_90 as number | undefined,

    // OBV - On-Ball Value (per-90 values from API)
    obv: r.player_season_obv_90 as number | undefined,
    obvPass: r.player_season_obv_pass_90 as number | undefined,
    obvShot: r.player_season_obv_shot_90 as number | undefined,
    obvDefensiveAction: r.player_season_obv_defensive_action_90 as number | undefined,
    obvDribbleCarry: r.player_season_obv_dribble_carry_90 as number | undefined,
    obvGk: r.player_season_obv_gk_90 as number | undefined,
  };
}

/**
 * Ingest season stats for a competition-season
 */
export const ingestSeasonStats = internalAction({
  args: {
    competitionSeasonId: v.id("statsbombCompetitionSeasons"),
  },
  handler: async (ctx, { competitionSeasonId }) => {
    const cs = await ctx.runQuery(
      internal.ingest.statsbombIngest.getCompetitionSeason,
      { id: competitionSeasonId }
    );

    if (!cs) {
      throw new Error(`Competition season not found: ${competitionSeasonId}`);
    }

    console.log(`[StatsBomb] Fetching season stats for ${cs.name} ${cs.season}`);

    const seasonStats = await StatsBomb.fetchSeasonPlayerStats(
      cs.statsbombCompetitionId,
      cs.statsbombSeasonId
    );

    console.log(`[StatsBomb] Received ${seasonStats.length} player season stats`);

    let created = 0;
    let updated = 0;
    let skipped = 0;
    let errors = 0;
    let firstError: string | null = null;

    for (const stat of seasonStats) {
      try {
        // Check if player is linked
        const externalId = await ctx.runQuery(
          internal.ingest.statsbombIngest.getStatsBombExternalId,
          { statsbombPlayerId: stat.player_id }
        );

        if (!externalId) {
          skipped++;
          continue;
        }

        // Log first few linked players for debugging
        if (created + updated + errors < 5) {
          console.log(`[StatsBomb] Processing linked player ${stat.player_id} (${stat.player_name}), playerId: ${externalId.playerId}`);
        }

        // Extract features (API already returns per-90 values with _90 suffix)
        const features = extractSeasonRatingFeatures(stat);

        const minutes = stat.player_season_minutes ?? 0;
        const appearances = stat.player_season_appearances ?? 0;

        // Per-90 values - API already provides these, use directly
        // Note: Convert null to undefined for schema compatibility
        const per90 = {
          goals: features.goals ?? undefined,
          assists: features.assists ?? undefined,
          shots: features.shots ?? undefined,
          tackles: features.tackles ?? undefined,
          interceptions: features.interceptions ?? undefined,
          xG: features.npxG ?? undefined,  // Use npxG (non-penalty xG) per 90
          xA: features.xA ?? undefined,
          clearances: features.clearances ?? undefined,
          blocks: features.blocks ?? undefined,
          aerialDuelsWon: features.aerialDuelsWon ?? undefined,
          saves: features.saves ?? undefined,
          goalsConceded: features.goalsAgainst ?? undefined,
        };

        // Totals - these are per-90 values from the API, multiply back for totals
        const nineties = minutes / 90;
        const totals = {
          appearances,
          goals: features.goals != null ? features.goals * nineties : undefined,
          assists: features.assists != null ? features.assists * nineties : undefined,
          xG: features.npxG != null ? features.npxG * nineties : undefined,
          xA: features.xA != null ? features.xA * nineties : undefined,
          shots: features.shots != null ? features.shots * nineties : undefined,
          tackles: features.tackles != null ? features.tackles * nineties : undefined,
          interceptions: features.interceptions != null ? features.interceptions * nineties : undefined,
        };

        // Additional stats - OBV and advanced metrics (per-90 values from API)
        // Note: API returns null for some fields, but schema expects undefined, so filter nulls
        const additionalStats = {
          xG: totals.xG ?? undefined,  // Total xG for the season
          xA: totals.xA ?? undefined,  // Total xA for the season
          xGPer90: features.npxG ?? undefined,  // Per-90 from API
          xAPer90: features.xA ?? undefined,    // Per-90 from API
          progressivePasses: features.progressivePasses ?? undefined,
          progressiveCarries: features.progressiveCarries ?? undefined,
          successfulPressures: features.pressuresSuccessful ?? undefined,
          // OBV (On-Ball Value) fields - per-90 values from API
          obv: features.obv ?? undefined,
          obvPass: features.obvPass ?? undefined,
          obvShot: features.obvShot ?? undefined,
          obvDefensiveAction: features.obvDefensiveAction ?? undefined,
          obvDribbleCarry: features.obvDribbleCarry ?? undefined,
          obvGk: features.obvGk ?? undefined,
        };

        const result = await ctx.runMutation(
          internal.ingest.statsbombIngest.upsertSeasonAggregates,
          {
            playerId: externalId.playerId,
            competitionId: cs.competitionId,
            season: cs.season,
            minutes: minutes,
            appearances,
            totals,
            per90,
            additionalStats,
            raw: stat,
            features,
          }
        );

        if (result.created) created++;
        else if (result.updated) updated++;
      } catch (error) {
        // Log first few errors with full details
        if (errors < 3) {
          console.error(`[StatsBomb] Error storing season stats for player ${stat.player_id} (${stat.player_name}):`, error);
        }
        if (!firstError) {
          firstError = `Player ${stat.player_id} (${stat.player_name}): ${String(error)}`;
        }
        errors++;
      }
    }

    console.log(`[StatsBomb] Season stats: ${created} created, ${updated} updated, ${skipped} skipped, ${errors} errors`);

    return {
      total: seasonStats.length,
      created,
      updated,
      skipped,
      errors,
      firstError,
    };
  },
});

/**
 * Public action to trigger season stats ingestion
 */
export const triggerIngestSeasonStats = action({
  args: {
    competitionSeasonId: v.optional(v.id("statsbombCompetitionSeasons")),
  },
  handler: async (ctx, { competitionSeasonId }) => {
    try {
      // If no competition season provided, get the first active one
      let csId = competitionSeasonId;
      if (!csId) {
        const seasons = await ctx.runQuery(
          internal.ingest.statsbombIngest.getActiveCompetitionSeasons
        );
        if (seasons.length === 0) {
          return { success: false, error: "No active competition seasons found" };
        }
        csId = seasons[0]._id;
        console.log(`[StatsBomb] Using competition season: ${seasons[0].name} ${seasons[0].season}`);
      }

      const result = await ctx.runAction(
        internal.ingest.statsbombIngest.ingestSeasonStats,
        { competitionSeasonId: csId }
      );
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Public action to ingest season stats for all active competitions
 */
export const triggerIngestAllSeasonStats = action({
  handler: async (ctx) => {
    try {
      const seasons = await ctx.runQuery(
        internal.ingest.statsbombIngest.getActiveCompetitionSeasons
      );

      if (seasons.length === 0) {
        return { success: false, error: "No active competition seasons found" };
      }

      console.log(`[StatsBomb] Found ${seasons.length} competition seasons to process`);

      const results: Array<{ name: string; created: number; updated: number; skipped: number }> = [];

      for (const cs of seasons) {
        if (!cs.competitionId) {
          console.log(`[StatsBomb] Skipping ${cs.name} - no canonical competition linked`);
          continue;
        }

        console.log(`[StatsBomb] Processing season stats: ${cs.name} ${cs.season}`);

        const result = await ctx.runAction(
          internal.ingest.statsbombIngest.ingestSeasonStats,
          { competitionSeasonId: cs._id }
        );

        results.push({
          name: `${cs.name} ${cs.season}`,
          created: result.created,
          updated: result.updated,
          skipped: result.skipped,
        });
      }

      const totals = results.reduce(
        (acc, r) => ({
          created: acc.created + r.created,
          updated: acc.updated + r.updated,
          skipped: acc.skipped + r.skipped,
        }),
        { created: 0, updated: 0, skipped: 0 }
      );

      return { success: true, results, totals };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});
```

### 🔀 Player merging logic

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
 * StatsBomb is highest quality for stats-related fields (licensed data).
 */
export const FIELD_PRECEDENCE: Record<string, Record<Provider, number>> = {
  // Basic info - primary source is most trusted
  name: {
    apiFootball: 100,
    statsbomb: 85, // Licensed data is reliable
    fotmob: 50,
    sofascore: 50,
    thesportsdb: 40,
    wikidata: 30,
    footballdata: 20,
  },
  birthDate: {
    apiFootball: 100,
    statsbomb: 95, // Licensed data is very reliable
    wikidata: 90, // Wikipedia is reliable for birth dates
    sofascore: 80,
    fotmob: 80,
    thesportsdb: 70,
    footballdata: 60,
  },
  nationality: {
    apiFootball: 100,
    statsbomb: 90, // Licensed data is reliable
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
    statsbomb: 85, // StatsBomb includes height in lineups
    apiFootball: 80,
    thesportsdb: 70,
    wikidata: 60,
    footballdata: 50,
  },
  weightKg: {
    sofascore: 100,
    fotmob: 90,
    statsbomb: 85, // StatsBomb includes weight in lineups
    apiFootball: 80,
    thesportsdb: 70,
    wikidata: 60,
    footballdata: 50,
  },
  preferredFoot: {
    sofascore: 100,
    fotmob: 90,
    apiFootball: 80,
    statsbomb: 70, // StatsBomb doesn't specialize in this
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
    statsbomb: 40, // StatsBomb doesn't provide photos
  },
  // Position - primary source is most accurate for current position
  position: {
    apiFootball: 100,
    statsbomb: 95, // StatsBomb has detailed position data from lineups
    fotmob: 80,
    sofascore: 80,
    thesportsdb: 60,
    wikidata: 40,
    footballdata: 50,
  },
  positionGroup: {
    apiFootball: 100,
    statsbomb: 95, // StatsBomb has detailed position data from lineups
    fotmob: 80,
    sofascore: 80,
    thesportsdb: 60,
    wikidata: 40,
    footballdata: 50,
  },
  // Stats fields - StatsBomb is highest quality for expected metrics
  xG: {
    statsbomb: 100, // StatsBomb xG is industry leading
    sofascore: 80,
    fotmob: 75,
    apiFootball: 70,
    thesportsdb: 50,
    wikidata: 30,
    footballdata: 40,
  },
  xA: {
    statsbomb: 100, // StatsBomb xA is industry leading
    sofascore: 80,
    fotmob: 75,
    apiFootball: 70,
    thesportsdb: 50,
    wikidata: 30,
    footballdata: 40,
  },
  npxG: {
    statsbomb: 100, // StatsBomb is authoritative for npxG
    sofascore: 75,
    fotmob: 70,
    apiFootball: 60,
    thesportsdb: 40,
    wikidata: 20,
    footballdata: 30,
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

### 🔌 External API integrations

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
  statsbomb: {
    // StatsBomb allows 15,000 requests per 5 minutes (3,000/min)
    // Using conservative 2,000/min to leave headroom
    requestsPerMinute: 2000,
    minDelayMs: 50, // Minimal delay due to generous rate limit
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

#### `convex/providers/statsbomb.ts`

```typescript
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
```

#### `convex/providers/statsbombClient.ts`

```typescript
/**
 * StatsBomb Data API HTTP Client
 *
 * Handles authentication and HTTP requests to StatsBomb API v4-v6.
 * Uses HTTP Basic Authentication with username/password.
 *
 * Environment variables:
 * - STATSBOMB_API_USER: Your StatsBomb API username
 * - STATSBOMB_API_PASSWORD: Your StatsBomb API password
 *
 * API Documentation: Hudl StatsBomb Data API
 * Base URL: https://data.statsbombservices.com/api
 */

// Base URL for StatsBomb Data API
const STATSBOMB_BASE_URL = "https://data.statsbombservices.com/api";

// Base64 encoding characters
const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * Pure JavaScript base64 encoder that works in Convex runtime
 * Does not depend on Buffer or btoa which may not be available
 */
function base64Encode(str: string): string {
  // Convert string to UTF-8 bytes
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code < 128) {
      bytes.push(code);
    } else if (code < 2048) {
      bytes.push(192 | (code >> 6));
      bytes.push(128 | (code & 63));
    } else {
      bytes.push(224 | (code >> 12));
      bytes.push(128 | ((code >> 6) & 63));
      bytes.push(128 | (code & 63));
    }
  }

  // Encode to base64
  let result = "";
  const len = bytes.length;
  for (let i = 0; i < len; i += 3) {
    const b1 = bytes[i];
    const b2 = i + 1 < len ? bytes[i + 1] : 0;
    const b3 = i + 2 < len ? bytes[i + 2] : 0;

    result += BASE64_CHARS[b1 >> 2];
    result += BASE64_CHARS[((b1 & 3) << 4) | (b2 >> 4)];
    result += i + 1 < len ? BASE64_CHARS[((b2 & 15) << 2) | (b3 >> 6)] : "=";
    result += i + 2 < len ? BASE64_CHARS[b3 & 63] : "=";
  }

  return result;
}

// Typed error for API failures
export class StatsBombError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = "StatsBombError";
  }
}

// Rate limit info from response headers
export interface RateLimitInfo {
  requestsRemaining?: number;
  retryAfter?: number;
}

// Response wrapper with rate limit info
export interface ApiResponse<T> {
  data: T;
  rateLimit?: RateLimitInfo;
}

/**
 * Get authentication headers using Basic Auth
 */
function getAuthHeaders(): Record<string, string> {
  const apiUser = process.env.STATSBOMB_API_USER;
  const apiPassword = process.env.STATSBOMB_API_PASSWORD;

  if (!apiUser || !apiPassword) {
    throw new StatsBombError(
      "STATSBOMB_API_USER and STATSBOMB_API_PASSWORD environment variables are required. " +
        "Set them in your Convex dashboard under Settings > Environment Variables."
    );
  }

  // Create Base64 encoded credentials for Basic Auth
  // Use pure JS base64 encoder since Buffer and btoa may not be available in Convex
  const credentials = base64Encode(`${apiUser}:${apiPassword}`);

  return {
    Authorization: `Basic ${credentials}`,
    Accept: "application/json",
  };
}

/**
 * Parse rate limit headers from API response
 */
function parseRateLimitHeaders(headers: Headers): RateLimitInfo | undefined {
  const retryAfter = headers.get("Retry-After");

  if (retryAfter !== null) {
    return {
      retryAfter: parseInt(retryAfter, 10),
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
 * Fetch JSON from StatsBomb API with authentication and retry logic
 *
 * @param path - API endpoint path (e.g., "/v4/competitions")
 * @param maxRetries - Maximum number of retries for 429 errors (default: 3)
 */
export async function fetchJson<T>(
  path: string,
  maxRetries = 3
): Promise<ApiResponse<T>> {
  const url = `${STATSBOMB_BASE_URL}${path}`;
  const headers = getAuthHeaders();

  console.log(`[StatsBomb] Request: ${url}`);

  let lastError: Error | null = null;
  let retryCount = 0;

  while (retryCount <= maxRetries) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      // Parse rate limit info
      const rateLimit = parseRateLimitHeaders(response.headers);

      // Handle rate limiting with retry
      if (response.status === 429) {
        const retryAfter = rateLimit?.retryAfter || 60;
        if (retryCount < maxRetries) {
          console.log(
            `[StatsBomb] Rate limited (429). Waiting ${retryAfter}s... (attempt ${retryCount + 1}/${maxRetries})`
          );
          await sleep(retryAfter * 1000);
          retryCount++;
          continue;
        }
        throw new StatsBombError("Rate limit exceeded after max retries", 429);
      }

      // Handle authentication errors
      if (response.status === 401) {
        throw new StatsBombError(
          "Authentication failed. Check STATSBOMB_API_USER and STATSBOMB_API_PASSWORD.",
          401
        );
      }

      // Handle forbidden (not licensed)
      if (response.status === 403) {
        throw new StatsBombError(
          "Access forbidden. This competition/season may not be licensed.",
          403
        );
      }

      // Handle not found
      if (response.status === 404) {
        throw new StatsBombError(
          `Resource not found: ${path}`,
          404
        );
      }

      // Handle other HTTP errors
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`[StatsBomb] Error ${response.status}: ${errorBody}`);
        throw new StatsBombError(
          `API request failed: ${response.status} ${response.statusText} - ${errorBody.slice(0, 200)}`,
          response.status,
          errorBody
        );
      }

      const data = (await response.json()) as T;

      console.log(
        `[StatsBomb] Success: ${path} (${Array.isArray(data) ? data.length : 1} items)`
      );

      return {
        data,
        rateLimit,
      };
    } catch (error) {
      if (error instanceof StatsBombError) {
        throw error;
      }
      lastError = error as Error;
      if (retryCount < maxRetries) {
        const backoffMs = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        console.log(
          `[StatsBomb] Request failed: ${lastError.message}. Retrying in ${backoffMs}ms... (attempt ${retryCount + 1}/${maxRetries})`
        );
        await sleep(backoffMs);
        retryCount++;
        continue;
      }
    }
  }

  throw new StatsBombError(
    `Request failed after ${maxRetries} retries: ${lastError?.message}`
  );
}

/**
 * Check if StatsBomb credentials are configured
 */
export function isConfigured(): boolean {
  return !!(process.env.STATSBOMB_API_USER && process.env.STATSBOMB_API_PASSWORD);
}
```

### 🔍 Player resolution

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

export type Provider = "apiFootball" | "fotmob" | "sofascore" | "thesportsdb" | "wikidata" | "footballdata" | "statsbomb";

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

// ============================================================================
// StatsBomb-Specific Resolution
// ============================================================================

/**
 * StatsBomb player data for resolution
 */
export interface StatsBombPlayerData {
  statsbombPlayerId: number;
  name: string;
  nickname?: string | null;
  birthDate?: string;
  nationality?: string;
  height?: number;
  teamName?: string;
}

/**
 * Resolve a StatsBomb player to a canonical player
 *
 * Uses multiple strategies:
 * 1. Check if StatsBomb external ID already exists
 * 2. Check StatsBomb player mapping table for existing link
 * 3. Use standard name/DOB/nationality matching
 *
 * @param db - Database reader
 * @param playerData - StatsBomb player data
 * @param competitionId - Optional competition context
 * @param teamId - Optional team context
 */
export async function resolveStatsBombPlayer(
  db: DatabaseReader,
  playerData: StatsBombPlayerData,
  competitionId?: Id<"competitions">,
  teamId?: Id<"teams">
): Promise<ResolveResult> {
  const providerPlayerId = String(playerData.statsbombPlayerId);

  // Strategy 1: Check existing external ID mapping
  const existingPlayerId = await findExistingExternalId(
    db,
    "statsbomb",
    providerPlayerId
  );

  if (existingPlayerId) {
    return {
      playerId: existingPlayerId,
      confidence: EXACT_MATCH_SCORE,
      isNew: false,
      reason: "existing_statsbomb_external_id",
    };
  }

  // Strategy 2: Check StatsBomb player mappings table
  const mapping = await db
    .query("statsbombPlayerMappings")
    .withIndex("by_statsbomb_id", (q) =>
      q.eq("statsbombPlayerId", playerData.statsbombPlayerId)
    )
    .first();

  if (mapping?.playerId) {
    return {
      playerId: mapping.playerId,
      confidence: 0.95, // High confidence from mapping
      isNew: false,
      reason: "existing_statsbomb_mapping",
    };
  }

  // Strategy 3: Standard resolution with StatsBomb data
  const externalData: ExternalPlayerData = {
    provider: "statsbomb",
    providerPlayerId,
    // Prefer nickname if available (often more recognizable)
    name: playerData.nickname || playerData.name,
    birthDate: playerData.birthDate,
    nationality: playerData.nationality,
    teamName: playerData.teamName,
  };

  const result = await resolvePlayer(db, externalData, competitionId, teamId);

  // Enhance reason with StatsBomb context
  if (result.playerId) {
    return {
      ...result,
      reason: `statsbomb_${result.reason}`,
    };
  }

  return result;
}

/**
 * Link a StatsBomb player to a canonical player
 * Creates the external ID mapping and updates the StatsBomb player mapping table
 */
export async function linkStatsBombPlayer(
  db: DatabaseWriter,
  statsbombPlayerId: number,
  playerId: Id<"players">,
  playerName: string,
  confidence: number
): Promise<void> {
  const now = Date.now();
  const providerPlayerId = String(statsbombPlayerId);

  // Create external ID mapping
  await upsertExternalId(db, playerId, "statsbomb", providerPlayerId, confidence);

  // Update StatsBomb player mapping table
  const existingMapping = await db
    .query("statsbombPlayerMappings")
    .withIndex("by_statsbomb_id", (q) =>
      q.eq("statsbombPlayerId", statsbombPlayerId)
    )
    .first();

  if (existingMapping) {
    await db.patch(existingMapping._id, {
      playerId,
      playerName,
      cachedAt: now,
    });
  } else {
    await db.insert("statsbombPlayerMappings", {
      statsbombPlayerId,
      playerName,
      playerId,
      cachedAt: now,
    });
  }
}

/**
 * Add a StatsBomb player to the review queue
 */
export async function addStatsBombToReviewQueue(
  db: DatabaseWriter,
  playerData: StatsBombPlayerData,
  reason: string,
  candidatePlayerIds?: Id<"players">[]
): Promise<Id<"unresolvedExternalPlayers">> {
  const externalData: ExternalPlayerData = {
    provider: "statsbomb",
    providerPlayerId: String(playerData.statsbombPlayerId),
    name: playerData.nickname || playerData.name,
    birthDate: playerData.birthDate,
    nationality: playerData.nationality,
    teamName: playerData.teamName,
  };

  return await addToReviewQueue(
    db,
    externalData,
    playerData, // Store full StatsBomb data as payload
    reason,
    candidatePlayerIds
  );
}
```

### 🔧 Admin utilities

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

### 🤖 AI & report generation

#### `convex/ai/aiCronRunner.ts`

```typescript
/**
 * AI Cron Runner
 *
 * Runs daily batch AI report generation for top viewed and top rated players.
 */

import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";
import type { Id } from "../_generated/dataModel";

interface BatchResult {
  success: boolean;
  totalProcessed: number;
  reportsGenerated: number;
  cacheHits: number;
  errors: number;
  errorDetails: string[];
}

/**
 * Daily batch AI report generation
 *
 * Strategy:
 * 1. Process top viewed players from yesterday (prioritize popular players)
 * 2. Fill remaining quota with top rated players without reports
 * 3. Stop at daily limit
 */
export const runDailyAiBatch = internalAction({
  args: {},
  handler: async (ctx): Promise<BatchResult> => {
    const dailyLimit = parseInt(process.env.AI_PLAYER_REPORT_DAILY_LIMIT ?? "200");
    const locale = process.env.AI_PLAYER_REPORT_LOCALE ?? "nl";
    const minMinutes = 90; // Minimum minutes for report generation

    const result: BatchResult = {
      success: true,
      totalProcessed: 0,
      reportsGenerated: 0,
      cacheHits: 0,
      errors: 0,
      errorDetails: [],
    };

    // Get yesterday's date for view tracking
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dayKey = yesterday.toISOString().split("T")[0];

    console.log(`[AI Batch] Starting daily batch for ${dayKey}, limit: ${dailyLimit}`);

    // 1. Process queued jobs first (from lazy generation requests)
    // @ts-expect-error - Type instantiation depth limit workaround for complex Convex types
    const getQueuedJobsRef = internal.ai.playerAiQueries.getQueuedJobs as any;
    const queuedJobs: Array<{ playerId: string; window: "365" | "last5"; locale: string }> =
      await ctx.runQuery(getQueuedJobsRef, {
        limit: Math.floor(dailyLimit * 0.3), // Reserve 30% for queued jobs
      });

    console.log(`[AI Batch] Found ${queuedJobs.length} queued jobs`);

    for (const job of queuedJobs) {
      if (result.totalProcessed >= dailyLimit) break;

      try {
        const genResult = await ctx.runAction(internal.ai.generatePlayerReport.generateReport, {
          playerId: job.playerId as Id<"players">,
          window: job.window,
          locale: job.locale,
        });

        result.totalProcessed++;
        if (genResult.success) {
          if (genResult.cached) {
            result.cacheHits++;
          } else {
            result.reportsGenerated++;
          }
        } else {
          result.errors++;
          result.errorDetails.push(`Player ${job.playerId}: ${genResult.error}`);
        }
      } catch (error) {
        result.errors++;
        result.errorDetails.push(`Player ${job.playerId}: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }

    // 2. Process top viewed players
    const remainingAfterQueued = dailyLimit - result.totalProcessed;
    if (remainingAfterQueued > 0) {
      const viewedLimit = Math.floor(remainingAfterQueued * 0.5); // 50% of remaining for viewed
      const topViewed = await ctx.runQuery(internal.ai.playerAiQueries.getTopViewedPlayers, {
        dayKey,
        limit: viewedLimit,
      });

      console.log(`[AI Batch] Processing ${topViewed.length} top viewed players`);

      for (const { playerId, views } of topViewed) {
        if (result.totalProcessed >= dailyLimit) break;

        try {
          // Generate for 365-day window
          const genResult = await ctx.runAction(internal.ai.generatePlayerReport.generateReport, {
            playerId,
            window: "365",
            locale,
          });

          result.totalProcessed++;
          if (genResult.success) {
            if (genResult.cached) {
              result.cacheHits++;
            } else {
              result.reportsGenerated++;
              console.log(`[AI Batch] Generated report for player ${playerId} (${views} views)`);
            }
          } else {
            result.errors++;
            result.errorDetails.push(`Player ${playerId}: ${genResult.error}`);
          }
        } catch (error) {
          result.errors++;
          result.errorDetails.push(`Player ${playerId}: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
    }

    // 3. Fill remaining quota with top rated players
    const remainingAfterViewed = dailyLimit - result.totalProcessed;
    if (remainingAfterViewed > 0) {
      const topRated = await ctx.runQuery(internal.ai.playerAiQueries.getTopRatedWithoutReports, {
        locale,
        window: "365",
        limit: remainingAfterViewed,
        minMinutes,
      });

      console.log(`[AI Batch] Processing ${topRated.length} top rated players without reports`);

      for (const { playerId, rating } of topRated) {
        if (result.totalProcessed >= dailyLimit) break;

        try {
          const genResult = await ctx.runAction(internal.ai.generatePlayerReport.generateReport, {
            playerId,
            window: "365",
            locale,
          });

          result.totalProcessed++;
          if (genResult.success) {
            if (genResult.cached) {
              result.cacheHits++;
            } else {
              result.reportsGenerated++;
              console.log(`[AI Batch] Generated report for player ${playerId} (rating: ${rating.toFixed(1)})`);
            }
          } else {
            result.errors++;
            result.errorDetails.push(`Player ${playerId}: ${genResult.error}`);
          }
        } catch (error) {
          result.errors++;
          result.errorDetails.push(`Player ${playerId}: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
    }

    console.log(`[AI Batch] Completed: ${result.reportsGenerated} generated, ${result.cacheHits} cached, ${result.errors} errors`);

    // Truncate error details if too many
    if (result.errorDetails.length > 10) {
      result.errorDetails = [
        ...result.errorDetails.slice(0, 10),
        `... and ${result.errorDetails.length - 10} more errors`,
      ];
    }

    return result;
  },
});

/**
 * Process a single queued job (for individual scheduling)
 */
interface ProcessJobResult {
  success: boolean;
  message?: string;
  playerId?: string;
  cached?: boolean;
  error?: string;
}

export const processQueuedJob = internalAction({
  args: {},
  handler: async (ctx): Promise<ProcessJobResult> => {
    // Get one queued job
    const queuedJobs: Array<{
      playerId: string;
      window: "365" | "last5";
      locale: string;
    }> = await ctx.runQuery(internal.ai.playerAiQueries.getQueuedJobs, {
      limit: 1,
    });

    if (queuedJobs.length === 0) {
      return { success: true, message: "No queued jobs" };
    }

    const job = queuedJobs[0];

    try {
      const result: {
        success: boolean;
        cached?: boolean;
        error?: string;
      } = await ctx.runAction(internal.ai.generatePlayerReport.generateReport, {
        playerId: job.playerId as Id<"players">,
        window: job.window,
        locale: job.locale,
      });

      return {
        success: result.success,
        playerId: job.playerId,
        cached: result.cached,
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        playerId: job.playerId,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});
```

#### `convex/ai/batchApi.ts`

```typescript
/**
 * OpenAI Batch API Integration
 *
 * Uses OpenAI's Batch API for 50% cost savings on bulk AI report generation.
 * https://platform.openai.com/docs/guides/batch
 *
 * Flow:
 * 1. prepareBatch: Collect eligible players and generate JSONL
 * 2. createBatch: Upload JSONL and create batch job
 * 3. checkBatch: Poll batch status
 * 4. processBatchResults: Download and process completed results
 */

import { v } from "convex/values";
import { internalAction, internalMutation, internalQuery } from "../_generated/server";
import { internal } from "../_generated/api";
import type { Id, Doc } from "../_generated/dataModel";
import { hashSnapshot, type PlayerAiSnapshot } from "./buildPlayerAiInput";

// Batch job status stored in Convex
export interface BatchJob {
  batchId: string;
  status: "validating" | "in_progress" | "finalizing" | "completed" | "failed" | "expired" | "cancelling" | "cancelled";
  inputFileId: string;
  outputFileId?: string;
  errorFileId?: string;
  requestCounts: {
    total: number;
    completed: number;
    failed: number;
  };
  createdAt: number;
  completedAt?: number;
  expiresAt?: number;
}

// Build the system prompt for AI report generation
function buildSystemPrompt(positionGroup: string, locale: string): string {
  const positionContext = {
    GK: "keeper/doelman",
    DEF: "verdediger",
    MID: "middenvelder",
    ATT: "aanvaller",
  }[positionGroup] || "speler";

  return `Je bent een expert voetbalanalist die spelersrapporten schrijft voor Nederlandse scouts en fans.

BELANGRIJKE REGELS:
- Schrijf ALTIJD in het Nederlands
- Verzin GEEN statistieken of cijfers - gebruik ALLEEN de gegeven data
- Focus op speelstijl, sterke/zwakke punten, en archetype
- Wees beknopt maar informatief
- Baseer je analyse op de per90 statistieken en totalen

Je analyseert een ${positionContext}.

OUTPUT FORMAT (strict JSON):
{
  "shortDescription": "Korte beschrijving (max 100 tekens)",
  "longDescription": "Uitgebreide analyse (max 300 tekens)",
  "archetype": "Speelstijl archetype (bijv: 'Schaduwspits', 'Box-to-box', 'Regista', 'Moderne keeper')",
  "playstyleTags": ["tag1", "tag2", "tag3"],
  "strengths": ["sterkte1", "sterkte2"],
  "weaknesses": ["zwakte1", "zwakte2"],
  "confidence": 0.0-1.0
}

De confidence score is gebaseerd op hoeveel data beschikbaar is (minuten gespeeld, statistieken aanwezig).`;
}

/**
 * Prepare batch: collect eligible players and generate batch request data
 */
export const prepareBatch = internalAction({
  args: {
    window: v.union(v.literal("365"), v.literal("last5")),
    locale: v.string(),
    minMinutes: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    requests: Array<{
      customId: string;
      playerId: string;
      inputHash: string;
      body: object;
    }>;
    skipped: number;
    error?: string;
  }> => {
    const minMinutes = args.minMinutes ?? 90;
    const limit = args.limit ?? 1000;
    const model = process.env.AI_PLAYER_REPORT_MODEL ?? "openai/gpt-4o-mini";
    const maxTokens = parseInt(process.env.AI_PLAYER_REPORT_MAX_OUTPUT_TOKENS ?? "600");

    // Extract model name (remove provider prefix)
    const modelName = model.includes("/") ? model.split("/").slice(1).join("/") : model;

    // Get eligible players
    const eligiblePlayers = await ctx.runQuery(internal.ai.batchApi.getEligiblePlayers, {
      minMinutes,
      limit,
    });

    console.log(`[Batch] Found ${eligiblePlayers.length} eligible players`);

    const requests: Array<{
      customId: string;
      playerId: string;
      inputHash: string;
      body: object;
    }> = [];
    let skipped = 0;

    for (const player of eligiblePlayers) {
      // Build snapshot for this player
      const snapshot = await ctx.runQuery(internal.ai.buildPlayerAiInput.buildSnapshot, {
        playerId: player._id,
        window: args.window,
      });

      if (!snapshot) {
        skipped++;
        continue;
      }

      const inputHash = hashSnapshot(snapshot);

      // Check if we already have a valid report with this hash
      const existingReport = await ctx.runQuery(internal.ai.batchApi.getReportByHash, {
        playerId: player._id,
        window: args.window,
        locale: args.locale,
        inputHash,
      });

      if (existingReport) {
        skipped++;
        continue;
      }

      // Build the request
      const systemPrompt = buildSystemPrompt(snapshot.positionGroup, args.locale);
      const userPrompt = `Analyseer deze speler en genereer een rapport:\n\n${JSON.stringify(snapshot, null, 2)}`;

      requests.push({
        customId: `${player._id}_${args.window}_${args.locale}`,
        playerId: player._id,
        inputHash,
        body: {
          model: modelName,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_tokens: maxTokens,
          temperature: 0.7,
          response_format: { type: "json_object" },
        },
      });
    }

    return {
      success: true,
      requests,
      skipped,
    };
  },
});

/**
 * Get eligible players for batch processing
 */
export const getEligiblePlayers = internalQuery({
  args: {
    minMinutes: v.number(),
    limit: v.number(),
  },
  handler: async (ctx, args): Promise<Array<Doc<"players">>> => {
    // Get all players
    const players = await ctx.db.query("players").collect();

    // Get rolling stats to filter by minutes
    const rollingStats = await ctx.db.query("playerRollingStats").collect();
    const statsMap = new Map(rollingStats.map((s) => [s.playerId, s]));

    // Filter by minutes and limit
    const eligible = players.filter((p) => {
      const stats = statsMap.get(p._id);
      return stats && stats.minutes >= args.minMinutes;
    });

    // Sort by minutes descending (prioritize players with more data)
    eligible.sort((a, b) => {
      const statsA = statsMap.get(a._id);
      const statsB = statsMap.get(b._id);
      return (statsB?.minutes ?? 0) - (statsA?.minutes ?? 0);
    });

    return eligible.slice(0, args.limit);
  },
});

/**
 * Check if a report with this hash already exists
 */
export const getReportByHash = internalQuery({
  args: {
    playerId: v.id("players"),
    window: v.union(v.literal("365"), v.literal("last5")),
    locale: v.string(),
    inputHash: v.string(),
  },
  handler: async (ctx, args): Promise<Doc<"playerAiReports"> | null> => {
    const report = await ctx.db
      .query("playerAiReports")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", args.window).eq("locale", args.locale)
      )
      .first();

    // Only return if hash matches (cache hit)
    if (report && report.inputHash === args.inputHash) {
      return report;
    }
    return null;
  },
});

/**
 * Create and upload batch to OpenAI
 */
export const createBatch = internalAction({
  args: {
    window: v.union(v.literal("365"), v.literal("last5")),
    locale: v.string(),
    minMinutes: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    batchId?: string;
    totalRequests?: number;
    skipped?: number;
    error?: string;
  }> => {
    const apiKey = process.env.AI_GATEWAY_API_KEY;
    if (!apiKey) {
      return { success: false, error: "AI_GATEWAY_API_KEY not configured" };
    }

    // Prepare batch requests
    const prepResult = await ctx.runAction(internal.ai.batchApi.prepareBatch, {
      window: args.window,
      locale: args.locale,
      minMinutes: args.minMinutes,
      limit: args.limit,
    });

    if (!prepResult.success) {
      return { success: false, error: prepResult.error };
    }

    if (prepResult.requests.length === 0) {
      return {
        success: true,
        totalRequests: 0,
        skipped: prepResult.skipped,
        error: "No new reports to generate - all players have up-to-date reports",
      };
    }

    console.log(`[Batch] Preparing ${prepResult.requests.length} requests, skipped ${prepResult.skipped}`);

    // Build JSONL content
    const jsonlLines = prepResult.requests.map((req) => {
      return JSON.stringify({
        custom_id: req.customId,
        method: "POST",
        url: "/v1/chat/completions",
        body: req.body,
      });
    });
    const jsonlContent = jsonlLines.join("\n");

    // Store request metadata for later processing
    await ctx.runMutation(internal.ai.batchApi.storeBatchMetadata, {
      requests: prepResult.requests.map((r) => ({
        customId: r.customId,
        playerId: r.playerId,
        inputHash: r.inputHash,
        window: args.window,
        locale: args.locale,
      })),
    });

    // Upload file to OpenAI
    const formData = new FormData();
    const blob = new Blob([jsonlContent], { type: "application/jsonl" });
    formData.append("file", blob, "batch_requests.jsonl");
    formData.append("purpose", "batch");

    const uploadResponse = await fetch("https://api.openai.com/v1/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error(`[Batch] File upload failed: ${errorText}`);
      return { success: false, error: `File upload failed: ${uploadResponse.status}` };
    }

    const uploadResult = await uploadResponse.json();
    const inputFileId = uploadResult.id;
    console.log(`[Batch] Uploaded file: ${inputFileId}`);

    // Create batch job
    const batchResponse = await fetch("https://api.openai.com/v1/batches", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_file_id: inputFileId,
        endpoint: "/v1/chat/completions",
        completion_window: "24h",
        metadata: {
          window: args.window,
          locale: args.locale,
          source: "footbase",
        },
      }),
    });

    if (!batchResponse.ok) {
      const errorText = await batchResponse.text();
      console.error(`[Batch] Batch creation failed: ${errorText}`);
      return { success: false, error: `Batch creation failed: ${batchResponse.status}` };
    }

    const batchResult = await batchResponse.json();
    console.log(`[Batch] Created batch: ${batchResult.id}`);

    // Store batch job info
    await ctx.runMutation(internal.ai.batchApi.storeBatchJob, {
      batchId: batchResult.id,
      inputFileId,
      status: batchResult.status,
      totalRequests: prepResult.requests.length,
      window: args.window,
      locale: args.locale,
    });

    return {
      success: true,
      batchId: batchResult.id,
      totalRequests: prepResult.requests.length,
      skipped: prepResult.skipped,
    };
  },
});

/**
 * Store batch metadata for processing results later
 */
export const storeBatchMetadata = internalMutation({
  args: {
    requests: v.array(
      v.object({
        customId: v.string(),
        playerId: v.string(),
        inputHash: v.string(),
        window: v.union(v.literal("365"), v.literal("last5")),
        locale: v.string(),
      })
    ),
  },
  handler: async (ctx, args): Promise<void> => {
    // Store in a simple key-value format
    // We'll use the aiBatchMetadata table
    for (const req of args.requests) {
      await ctx.db.insert("aiBatchMetadata", {
        customId: req.customId,
        playerId: req.playerId as Id<"players">,
        inputHash: req.inputHash,
        window: req.window,
        locale: req.locale,
        processed: false,
        createdAt: Date.now(),
      });
    }
  },
});

/**
 * Store batch job info
 */
export const storeBatchJob = internalMutation({
  args: {
    batchId: v.string(),
    inputFileId: v.string(),
    status: v.string(),
    totalRequests: v.number(),
    window: v.union(v.literal("365"), v.literal("last5")),
    locale: v.string(),
  },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.insert("aiBatchJobs", {
      batchId: args.batchId,
      inputFileId: args.inputFileId,
      status: args.status,
      totalRequests: args.totalRequests,
      completedRequests: 0,
      failedRequests: 0,
      window: args.window,
      locale: args.locale,
      createdAt: Date.now(),
    });
  },
});

/**
 * Check batch status and process if complete
 */
export const checkBatch = internalAction({
  args: {
    batchId: v.string(),
  },
  handler: async (ctx, args): Promise<{
    status: string;
    completed: number;
    failed: number;
    total: number;
    outputFileId?: string;
  }> => {
    const apiKey = process.env.AI_GATEWAY_API_KEY;
    if (!apiKey) {
      throw new Error("AI_GATEWAY_API_KEY not configured");
    }

    const response = await fetch(`https://api.openai.com/v1/batches/${args.batchId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to check batch: ${response.status}`);
    }

    const batch = await response.json();

    // Update batch job status in DB
    await ctx.runMutation(internal.ai.batchApi.updateBatchJob, {
      batchId: args.batchId,
      status: batch.status,
      completedRequests: batch.request_counts?.completed ?? 0,
      failedRequests: batch.request_counts?.failed ?? 0,
      outputFileId: batch.output_file_id ?? undefined,
      errorFileId: batch.error_file_id ?? undefined,
    });

    return {
      status: batch.status,
      completed: batch.request_counts?.completed ?? 0,
      failed: batch.request_counts?.failed ?? 0,
      total: batch.request_counts?.total ?? 0,
      outputFileId: batch.output_file_id,
    };
  },
});

/**
 * Update batch job status
 */
export const updateBatchJob = internalMutation({
  args: {
    batchId: v.string(),
    status: v.string(),
    completedRequests: v.number(),
    failedRequests: v.number(),
    outputFileId: v.optional(v.string()),
    errorFileId: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<void> => {
    const job = await ctx.db
      .query("aiBatchJobs")
      .filter((q) => q.eq(q.field("batchId"), args.batchId))
      .first();

    if (job) {
      await ctx.db.patch(job._id, {
        status: args.status,
        completedRequests: args.completedRequests,
        failedRequests: args.failedRequests,
        outputFileId: args.outputFileId,
        errorFileId: args.errorFileId,
        ...(args.status === "completed" ? { completedAt: Date.now() } : {}),
      });
    }
  },
});

/**
 * Process batch results - download output file and upsert reports
 */
export const processBatchResults = internalAction({
  args: {
    batchId: v.string(),
  },
  handler: async (ctx, args): Promise<{
    success: boolean;
    processed: number;
    failed: number;
    error?: string;
  }> => {
    const apiKey = process.env.AI_GATEWAY_API_KEY;
    if (!apiKey) {
      return { success: false, processed: 0, failed: 0, error: "API key not configured" };
    }

    // Get batch status to get output file ID
    const statusResult = await ctx.runAction(internal.ai.batchApi.checkBatch, {
      batchId: args.batchId,
    });

    if (statusResult.status !== "completed") {
      return {
        success: false,
        processed: 0,
        failed: 0,
        error: `Batch not complete, status: ${statusResult.status}`,
      };
    }

    if (!statusResult.outputFileId) {
      return { success: false, processed: 0, failed: 0, error: "No output file ID" };
    }

    // Download output file
    const fileResponse = await fetch(
      `https://api.openai.com/v1/files/${statusResult.outputFileId}/content`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!fileResponse.ok) {
      return { success: false, processed: 0, failed: 0, error: `Failed to download results: ${fileResponse.status}` };
    }

    const fileContent = await fileResponse.text();
    const lines = fileContent.trim().split("\n");

    console.log(`[Batch] Processing ${lines.length} results`);

    const model = process.env.AI_PLAYER_REPORT_MODEL ?? "openai/gpt-4o-mini";
    let processed = 0;
    let failed = 0;

    for (const line of lines) {
      try {
        const result = JSON.parse(line);
        const customId = result.custom_id;

        // Get metadata for this request
        const metadata = await ctx.runQuery(internal.ai.batchApi.getBatchMetadata, {
          customId,
        });

        if (!metadata) {
          console.warn(`[Batch] No metadata found for ${customId}`);
          failed++;
          continue;
        }

        if (result.error) {
          console.error(`[Batch] Error for ${customId}: ${result.error.message}`);
          failed++;
          continue;
        }

        const response = result.response;
        if (!response || response.status_code !== 200) {
          console.error(`[Batch] Bad response for ${customId}`);
          failed++;
          continue;
        }

        const content = response.body?.choices?.[0]?.message?.content;
        if (!content) {
          console.error(`[Batch] No content for ${customId}`);
          failed++;
          continue;
        }

        // Parse the AI response
        const reportData = JSON.parse(content);

        // Upsert the report
        await ctx.runMutation(internal.ai.batchApi.upsertReport, {
          playerId: metadata.playerId as Id<"players">,
          window: metadata.window,
          locale: metadata.locale,
          inputHash: metadata.inputHash,
          model,
          shortDescription: reportData.shortDescription || "",
          longDescription: reportData.longDescription || "",
          archetype: reportData.archetype || "",
          playstyleTags: reportData.playstyleTags || [],
          strengths: reportData.strengths || [],
          weaknesses: reportData.weaknesses || [],
          confidence: reportData.confidence || 0.5,
        });

        // Mark metadata as processed
        await ctx.runMutation(internal.ai.batchApi.markMetadataProcessed, {
          customId,
        });

        processed++;
      } catch (e) {
        console.error(`[Batch] Error processing line: ${e}`);
        failed++;
      }
    }

    console.log(`[Batch] Processed: ${processed}, Failed: ${failed}`);

    return { success: true, processed, failed };
  },
});

/**
 * Get batch metadata by custom ID
 */
export const getBatchMetadata = internalQuery({
  args: {
    customId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("aiBatchMetadata")
      .filter((q) => q.eq(q.field("customId"), args.customId))
      .first();
  },
});

/**
 * Mark metadata as processed
 */
export const markMetadataProcessed = internalMutation({
  args: {
    customId: v.string(),
  },
  handler: async (ctx, args): Promise<void> => {
    const metadata = await ctx.db
      .query("aiBatchMetadata")
      .filter((q) => q.eq(q.field("customId"), args.customId))
      .first();

    if (metadata) {
      await ctx.db.patch(metadata._id, { processed: true });
    }
  },
});

/**
 * Upsert AI report
 */
export const upsertReport = internalMutation({
  args: {
    playerId: v.id("players"),
    window: v.union(v.literal("365"), v.literal("last5")),
    locale: v.string(),
    inputHash: v.string(),
    model: v.string(),
    shortDescription: v.string(),
    longDescription: v.string(),
    archetype: v.string(),
    playstyleTags: v.array(v.string()),
    strengths: v.array(v.string()),
    weaknesses: v.array(v.string()),
    confidence: v.number(),
  },
  handler: async (ctx, args): Promise<void> => {
    // Check for existing report
    const existing = await ctx.db
      .query("playerAiReports")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", args.window).eq("locale", args.locale)
      )
      .first();

    const reportData = {
      playerId: args.playerId,
      window: args.window,
      locale: args.locale,
      shortDescription: args.shortDescription,
      longDescription: args.longDescription,
      archetype: args.archetype,
      playstyleTags: args.playstyleTags,
      strengths: args.strengths,
      weaknesses: args.weaknesses,
      confidence: args.confidence,
      model: args.model,
      inputHash: args.inputHash,
      sourcesUsed: ["playerRollingStats", "playerRatings"],
      generatedAt: Date.now(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, reportData);
    } else {
      await ctx.db.insert("playerAiReports", reportData);
    }
  },
});

/**
 * Get all active batch jobs
 */
export const listBatchJobs = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("aiBatchJobs").order("desc").take(10);
  },
});
```

#### `convex/ai/buildPlayerAiInput.ts`

```typescript
/**
 * AI Input Snapshot Builder
 *
 * Builds a compact JSON snapshot of player data for AI analysis.
 * Includes only the essential features needed for generating reports.
 */

import { v } from "convex/values";
import { internalQuery } from "../_generated/server";
import type { Doc, Id } from "../_generated/dataModel";

// Window type for stats selection
export const aiWindowValidator = v.union(v.literal("365"), v.literal("last5"));
export type AiWindow = "365" | "last5";

// The snapshot structure for AI input
export interface PlayerAiSnapshot {
  // Player identifiers
  playerId: string;
  name: string;
  positionGroup: "GK" | "DEF" | "MID" | "ATT";
  position: string;
  age?: number;
  nationality?: string;

  // Physical attributes (from enrichment)
  heightCm?: number;
  weightKg?: number;
  preferredFoot?: string;

  // Context
  teamName: string;
  competitionName: string;
  competitionTier?: string;
  competitionCountry: string;

  // Core stats
  minutes: number;
  appearances: number;
  window: AiWindow;

  // Ratings
  rating365?: number;
  ratingLast5?: number;
  levelScore?: number;

  // Key per90 features (max 15)
  per90: {
    goals?: number;
    assists?: number;
    shots?: number;
    shotsOnTarget?: number;
    keyPasses?: number;
    passes?: number;
    tackles?: number;
    interceptions?: number;
    clearances?: number;
    blocks?: number;
    duelsWon?: number;
    aerialDuelsWon?: number;
    dribblesSuccessful?: number;
    saves?: number;
    goalsConceded?: number;
  };

  // xG/xA if available
  advancedStats?: {
    xG?: number;
    xA?: number;
    xGPer90?: number;
    xAPer90?: number;
    dataSource?: string;
  };

  // StatsBomb-specific advanced features
  statsbombStats?: {
    // OBV (On-Ball Value)
    obvPer90?: number;
    // Progressive actions
    progressivePassesPer90?: number;
    progressiveCarriesPer90?: number;
    // Pressure
    pressuresPer90?: number;
    pressureSuccessRate?: number;
    // Creating
    shotCreatingActionsPer90?: number;
    goalCreatingActionsPer90?: number;
  };

  // Sources that contributed data
  sourcesUsed: string[];
}

/**
 * Build a compact snapshot of player data for AI analysis
 */
export const buildSnapshot = internalQuery({
  args: {
    playerId: v.id("players"),
    window: aiWindowValidator,
  },
  handler: async (ctx, args): Promise<PlayerAiSnapshot | null> => {
    const player = await ctx.db.get(args.playerId);
    if (!player) return null;

    const sourcesUsed: string[] = [player.provider];

    // Get team and competition
    const [team, competition] = await Promise.all([
      ctx.db.get(player.teamId),
      ctx.db.get(player.competitionId),
    ]);

    if (!team || !competition) return null;

    // Get competition rating for tier
    const competitionRatings = await ctx.db.query("competitionRatings").collect();
    const compRating = competitionRatings.find(
      (r) => r.competitionId === player.competitionId
    );

    // Get rolling stats
    const rollingStats = await ctx.db
      .query("playerRollingStats")
      .withIndex("by_player_competition", (q) =>
        q.eq("playerId", args.playerId)
      )
      .first();

    // Get player rating
    const playerRatings = await ctx.db.query("playerRatings").collect();
    const rating = playerRatings.find((r) => r.playerId === args.playerId);

    // Get provider aggregates for xG/xA
    const providerAggregates = await ctx.db
      .query("providerPlayerAggregates")
      .filter((q) => q.eq(q.field("playerId"), args.playerId))
      .collect();

    // Track which enrichment providers contributed
    for (const agg of providerAggregates) {
      if (!sourcesUsed.includes(agg.provider)) {
        sourcesUsed.push(agg.provider);
      }
    }

    // Provider preference: StatsBomb > FotMob > SofaScore
    const statsbombAgg = providerAggregates.find(
      (a) => a.provider === "statsbomb" && a.window === "season"
    );
    const fotmobAgg = providerAggregates.find(
      (a) => a.provider === "fotmob" && a.window === "365"
    );
    const sofascoreAgg = providerAggregates.find(
      (a) => a.provider === "sofascore"
    );

    // Use best available for xG/xA
    const primaryAggregate = statsbombAgg || fotmobAgg || sofascoreAgg;
    const xGData = primaryAggregate?.additionalStats;
    const xGSource = primaryAggregate?.provider;

    // Extract StatsBomb-specific features if available
    type StatsBombFeatures = {
      obvPer90?: number;
      progressivePassesPer90?: number;
      progressiveCarriesPer90?: number;
      pressuresPer90?: number;
      pressureSuccessRate?: number;
      shotCreatingActionsPer90?: number;
      goalCreatingActionsPer90?: number;
    };
    let statsbombStats: StatsBombFeatures | undefined;

    if (statsbombAgg?.features) {
      const features = statsbombAgg.features as Record<string, unknown>;
      const minutes = (features.minutes as number) || 0;

      // Helper to calculate per90
      const per90 = (val: unknown): number | undefined => {
        if (typeof val !== "number" || minutes === 0) return undefined;
        return (val / minutes) * 90;
      };

      statsbombStats = {
        obvPer90: per90(features.obv),
        progressivePassesPer90: per90(features.progressivePasses),
        progressiveCarriesPer90: per90(features.progressiveCarries),
        pressuresPer90: per90(features.pressures),
        pressureSuccessRate: typeof features.pressureSuccessRate === "number"
          ? features.pressureSuccessRate
          : undefined,
        shotCreatingActionsPer90: per90(features.shotCreatingActions),
        goalCreatingActionsPer90: per90(features.goalCreatingActions),
      };
    }

    // Build per90 stats based on window
    const per90Stats = rollingStats?.per90;
    const totals = args.window === "last5" ? rollingStats?.last5 : rollingStats?.totals;

    // Calculate minutes for the window
    // For "last5", we approximate based on last5 totals
    const minutes = args.window === "last5"
      ? Math.min(450, rollingStats?.minutes ?? 0) // Cap at ~5 games
      : rollingStats?.minutes ?? 0;

    const appearances = totals?.appearances ?? 0;

    // Build the snapshot
    const snapshot: PlayerAiSnapshot = {
      playerId: player._id,
      name: player.name,
      positionGroup: player.positionGroup,
      position: player.position,
      age: player.age,
      nationality: player.nationality,

      // Physical attributes
      heightCm: player.heightCm,
      weightKg: player.weightKg,
      preferredFoot: player.preferredFoot,

      // Context
      teamName: team.name,
      competitionName: competition.name,
      competitionTier: competition.tier ?? compRating?.tier,
      competitionCountry: competition.country,

      // Core stats
      minutes,
      appearances,
      window: args.window,

      // Ratings
      rating365: rating?.rating365,
      ratingLast5: rating?.ratingLast5,
      levelScore: rating?.levelScore,

      // Per90 features
      per90: {
        goals: per90Stats?.goals,
        assists: per90Stats?.assists,
        shots: per90Stats?.shots,
        shotsOnTarget: per90Stats?.shotsOnTarget,
        keyPasses: per90Stats?.keyPasses,
        passes: per90Stats?.passes,
        tackles: per90Stats?.tackles,
        interceptions: per90Stats?.interceptions,
        clearances: per90Stats?.clearances,
        blocks: per90Stats?.blocks,
        duelsWon: per90Stats?.duelsWon,
        aerialDuelsWon: per90Stats?.aerialDuelsWon,
        dribblesSuccessful: per90Stats?.dribblesSuccessful,
        saves: per90Stats?.saves,
        goalsConceded: per90Stats?.goalsConceded,
      },

      // Advanced stats if available (StatsBomb > FotMob > SofaScore)
      advancedStats: xGData
        ? {
            xG: xGData.xG,
            xA: xGData.xA,
            xGPer90: xGData.xGPer90,
            xAPer90: xGData.xAPer90,
            dataSource: xGSource,
          }
        : undefined,

      // StatsBomb-specific advanced features
      statsbombStats,

      sourcesUsed,
    };

    return snapshot;
  },
});

/**
 * Generate a stable hash for the snapshot to detect changes
 * Uses a simple approach that works in Node.js environment
 */
export function hashSnapshot(snapshot: PlayerAiSnapshot): string {
  // Create a stable JSON string (sorted keys)
  const stableJson = JSON.stringify(snapshot, Object.keys(snapshot).sort());

  // Simple hash function (djb2 algorithm)
  let hash = 5381;
  for (let i = 0; i < stableJson.length; i++) {
    const char = stableJson.charCodeAt(i);
    hash = ((hash << 5) + hash) ^ char;
  }

  // Convert to hex string and ensure it's always positive
  return (hash >>> 0).toString(16).padStart(8, "0");
}

/**
 * Check if a player has enough data for meaningful AI analysis
 */
export function hasEnoughData(snapshot: PlayerAiSnapshot): boolean {
  // Minimum 90 minutes played (roughly 1 full game)
  if (snapshot.minutes < 90) return false;

  // At least 1 appearance
  if (snapshot.appearances < 1) return false;

  // Must have at least some per90 stats
  const per90Values = Object.values(snapshot.per90).filter(
    (v) => v !== undefined && v !== null
  );
  if (per90Values.length < 3) return false;

  return true;
}
```

#### `convex/ai/generatePlayerReport.ts`

```typescript
/**
 * AI Player Report Generator
 *
 * Generates player descriptions and analysis using Vercel AI SDK + AI Gateway.
 * Includes caching, job locking, and cost control.
 */

import { v } from "convex/values";
import { internalAction, internalMutation, internalQuery } from "../_generated/server";
import { internal } from "../_generated/api";
import type { Id, Doc } from "../_generated/dataModel";
import { aiWindowValidator, type PlayerAiSnapshot, hashSnapshot, hasEnoughData } from "./buildPlayerAiInput";

// ============================================================================
// Types
// ============================================================================

interface AiReportOutput {
  shortDescription: string;
  longDescription: string;
  archetype: string;
  playstyleTags: string[];
  strengths: string[];
  weaknesses: string[];
  confidence: number;
  disclaimer: string;
}

interface GenerateResult {
  success: boolean;
  report?: Doc<"playerAiReports">;
  cached?: boolean;
  error?: string;
}

// ============================================================================
// Internal Queries/Mutations for DB Access
// ============================================================================

export const getExistingReport = internalQuery({
  args: {
    playerId: v.id("players"),
    window: aiWindowValidator,
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("playerAiReports")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", args.window).eq("locale", args.locale)
      )
      .first();
  },
});

export const getJob = internalQuery({
  args: {
    playerId: v.id("players"),
    window: aiWindowValidator,
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("playerAiJobs")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", args.window).eq("locale", args.locale)
      )
      .first();
  },
});

export const upsertJob = internalMutation({
  args: {
    playerId: v.id("players"),
    window: aiWindowValidator,
    locale: v.string(),
    status: v.union(
      v.literal("queued"),
      v.literal("running"),
      v.literal("done"),
      v.literal("error")
    ),
    lockedUntil: v.number(),
    attempts: v.optional(v.number()),
    lastError: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("playerAiJobs")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", args.window).eq("locale", args.locale)
      )
      .first();

    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, {
        status: args.status,
        lockedUntil: args.lockedUntil,
        attempts: args.attempts ?? existing.attempts,
        lastError: args.lastError,
        updatedAt: now,
      });
      return existing._id;
    } else {
      return await ctx.db.insert("playerAiJobs", {
        playerId: args.playerId,
        window: args.window,
        locale: args.locale,
        status: args.status,
        lockedUntil: args.lockedUntil,
        attempts: args.attempts ?? 0,
        lastError: args.lastError,
        updatedAt: now,
      });
    }
  },
});

export const upsertReport = internalMutation({
  args: {
    playerId: v.id("players"),
    window: aiWindowValidator,
    locale: v.string(),
    shortDescription: v.string(),
    longDescription: v.string(),
    archetype: v.string(),
    playstyleTags: v.array(v.string()),
    strengths: v.array(v.string()),
    weaknesses: v.array(v.string()),
    confidence: v.number(),
    model: v.string(),
    inputHash: v.string(),
    sourcesUsed: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("playerAiReports")
      .withIndex("by_player_window_locale", (q) =>
        q.eq("playerId", args.playerId).eq("window", args.window).eq("locale", args.locale)
      )
      .first();

    const now = Date.now();
    const data = {
      playerId: args.playerId,
      window: args.window,
      locale: args.locale,
      shortDescription: args.shortDescription,
      longDescription: args.longDescription,
      archetype: args.archetype,
      playstyleTags: args.playstyleTags,
      strengths: args.strengths,
      weaknesses: args.weaknesses,
      confidence: args.confidence,
      model: args.model,
      inputHash: args.inputHash,
      sourcesUsed: args.sourcesUsed,
      generatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    } else {
      return await ctx.db.insert("playerAiReports", data);
    }
  },
});

export const logAiUsage = internalMutation({
  args: {
    model: v.string(),
    playerId: v.optional(v.id("players")),
    window: v.optional(v.string()),
    promptTokens: v.optional(v.number()),
    completionTokens: v.optional(v.number()),
    totalTokens: v.optional(v.number()),
    durationMs: v.optional(v.number()),
    success: v.boolean(),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("aiUsageLogs", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// ============================================================================
// Main Generation Action
// ============================================================================

/**
 * Generate an AI report for a player
 *
 * This action:
 * 1. Checks cache (inputHash match)
 * 2. Acquires a distributed lock via playerAiJobs
 * 3. Calls Vercel AI Gateway
 * 4. Saves the result
 */
export const generateReport = internalAction({
  args: {
    playerId: v.id("players"),
    window: aiWindowValidator,
    locale: v.optional(v.string()),
    forceRegenerate: v.optional(v.boolean()),
  },
  handler: async (ctx, args): Promise<GenerateResult> => {
    const locale = args.locale ?? process.env.AI_PLAYER_REPORT_LOCALE ?? "nl";
    const model = process.env.AI_PLAYER_REPORT_MODEL ?? "openai/gpt-4o-mini";
    const maxTokens = parseInt(process.env.AI_PLAYER_REPORT_MAX_OUTPUT_TOKENS ?? "600");

    const startTime = Date.now();

    try {
      // 1. Build the snapshot
      const snapshot = await ctx.runQuery(internal.ai.buildPlayerAiInput.buildSnapshot, {
        playerId: args.playerId,
        window: args.window,
      });

      if (!snapshot) {
        return { success: false, error: "Player not found" };
      }

      // Check if player has enough data
      if (!hasEnoughData(snapshot)) {
        return {
          success: false,
          error: "Insufficient data for AI analysis (minimum 90 minutes played)",
        };
      }

      // 2. Check cache
      const inputHash = hashSnapshot(snapshot);
      const existingReport = await ctx.runQuery(internal.ai.generatePlayerReport.getExistingReport, {
        playerId: args.playerId,
        window: args.window,
        locale,
      });

      // Return cached if hash matches and not forcing regeneration
      if (existingReport && existingReport.inputHash === inputHash && !args.forceRegenerate) {
        return {
          success: true,
          report: existingReport,
          cached: true,
        };
      }

      // 3. Check/acquire job lock
      const now = Date.now();
      const lockDuration = 5 * 60 * 1000; // 5 minutes
      const existingJob = await ctx.runQuery(internal.ai.generatePlayerReport.getJob, {
        playerId: args.playerId,
        window: args.window,
        locale,
      });

      // If job is running and lock hasn't expired, skip
      if (
        existingJob &&
        existingJob.status === "running" &&
        existingJob.lockedUntil > now
      ) {
        return {
          success: false,
          error: "Another generation is in progress",
        };
      }

      // Acquire lock
      const attempts = (existingJob?.attempts ?? 0) + 1;
      await ctx.runMutation(internal.ai.generatePlayerReport.upsertJob, {
        playerId: args.playerId,
        window: args.window,
        locale,
        status: "running",
        lockedUntil: now + lockDuration,
        attempts,
      });

      // 4. Call AI Gateway
      let aiResult: AiReportOutput;
      try {
        aiResult = await callAiGateway(snapshot, model, maxTokens, locale);
      } catch (aiError) {
        const errorMsg = aiError instanceof Error ? aiError.message : "AI call failed";

        // Log failure
        await ctx.runMutation(internal.ai.generatePlayerReport.logAiUsage, {
          model,
          playerId: args.playerId,
          window: args.window,
          success: false,
          error: errorMsg,
          durationMs: Date.now() - startTime,
        });

        // Update job status
        await ctx.runMutation(internal.ai.generatePlayerReport.upsertJob, {
          playerId: args.playerId,
          window: args.window,
          locale,
          status: "error",
          lockedUntil: 0,
          attempts,
          lastError: errorMsg,
        });

        return { success: false, error: errorMsg };
      }

      // 5. Save the report
      await ctx.runMutation(internal.ai.generatePlayerReport.upsertReport, {
        playerId: args.playerId,
        window: args.window,
        locale,
        shortDescription: aiResult.shortDescription,
        longDescription: aiResult.longDescription,
        archetype: aiResult.archetype,
        playstyleTags: aiResult.playstyleTags.slice(0, 10),
        strengths: aiResult.strengths.slice(0, 6),
        weaknesses: aiResult.weaknesses.slice(0, 6),
        confidence: Math.max(0, Math.min(1, aiResult.confidence)),
        model,
        inputHash,
        sourcesUsed: snapshot.sourcesUsed,
      });

      // Clear job lock
      await ctx.runMutation(internal.ai.generatePlayerReport.upsertJob, {
        playerId: args.playerId,
        window: args.window,
        locale,
        status: "done",
        lockedUntil: 0,
        attempts,
      });

      // Log success (token usage would come from AI SDK response)
      await ctx.runMutation(internal.ai.generatePlayerReport.logAiUsage, {
        model,
        playerId: args.playerId,
        window: args.window,
        success: true,
        durationMs: Date.now() - startTime,
      });

      // Fetch and return the saved report
      const savedReport = await ctx.runQuery(internal.ai.generatePlayerReport.getExistingReport, {
        playerId: args.playerId,
        window: args.window,
        locale,
      });

      return {
        success: true,
        report: savedReport ?? undefined,
        cached: false,
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";

      // Log failure
      await ctx.runMutation(internal.ai.generatePlayerReport.logAiUsage, {
        model,
        playerId: args.playerId,
        window: args.window,
        success: false,
        error: errorMsg,
        durationMs: Date.now() - startTime,
      });

      return { success: false, error: errorMsg };
    }
  },
});

// ============================================================================
// AI Gateway Call
// ============================================================================

/**
 * Call the Vercel AI Gateway to generate a report
 */
async function callAiGateway(
  snapshot: PlayerAiSnapshot,
  model: string,
  maxTokens: number,
  locale: string
): Promise<AiReportOutput> {
  const apiKey = process.env.AI_GATEWAY_API_KEY;

  if (!apiKey) {
    throw new Error("AI_GATEWAY_API_KEY not configured");
  }

  // Build the system prompt
  const systemPrompt = buildSystemPrompt(locale);

  // Build the user prompt with snapshot data
  const userPrompt = buildUserPrompt(snapshot, locale);

  // Determine the correct API endpoint based on model prefix
  const { baseUrl, modelName } = parseModelString(model);

  // Call the appropriate API
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI Gateway error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content in AI response");
  }

  // Parse the JSON response
  let parsed: AiReportOutput;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("Failed to parse AI response as JSON");
  }

  // Validate required fields
  validateAiResponse(parsed);

  return parsed;
}

/**
 * Parse model string to get base URL and model name
 * Supports:
 * - "openai/gpt-4o-mini" -> OpenAI API
 * - "anthropic/claude-3-haiku" -> Anthropic API
 * - "xai/grok-2" -> xAI API
 * - "gpt-4o-mini" -> OpenAI API (fallback)
 */
function parseModelString(model: string): { baseUrl: string; modelName: string } {
  // If it's a provider/model string
  if (model.includes("/")) {
    const [provider, ...rest] = model.split("/");
    const modelName = rest.join("/");

    switch (provider.toLowerCase()) {
      case "openai":
        return {
          baseUrl: "https://api.openai.com/v1/chat/completions",
          modelName,
        };
      case "anthropic":
        return {
          baseUrl: "https://api.anthropic.com/v1/messages",
          modelName,
        };
      case "xai":
        return {
          baseUrl: "https://api.x.ai/v1/chat/completions",
          modelName,
        };
      default:
        // Use OpenAI-compatible endpoint
        return {
          baseUrl: "https://api.openai.com/v1/chat/completions",
          modelName: model,
        };
    }
  }

  // Fallback to OpenAI direct
  return {
    baseUrl: "https://api.openai.com/v1/chat/completions",
    modelName: model,
  };
}

/**
 * Build system prompt based on locale
 */
function buildSystemPrompt(locale: string): string {
  const basePrompt = `You are a professional football scouting analyst. Your task is to analyze player statistics and generate insightful, accurate reports.

CRITICAL RULES:
1. You MUST NOT invent or fabricate any numbers, statistics, or facts
2. All claims must be directly tied to the provided statistics
3. If data is sparse, be conservative and acknowledge limitations
4. Output must be in ${locale === "nl" ? "Dutch" : "English"}

OUTPUT FORMAT:
You must respond with a valid JSON object containing these exact fields:
{
  "shortDescription": "2-3 sentences summarizing the player",
  "longDescription": "8-12 lines of detailed analysis (no markdown)",
  "archetype": "Single string describing player type (e.g., 'Box-to-Box Midfielder')",
  "playstyleTags": ["array", "of", "style", "tags", "max", "10"],
  "strengths": ["array", "of", "strengths", "max", "6"],
  "weaknesses": ["array", "of", "weaknesses", "max", "6"],
  "confidence": 0.8,
  "disclaimer": "Brief note about data limitations"
}

The confidence score (0-1) should reflect:
- Data completeness (more stats = higher confidence)
- Minutes played (more minutes = more reliable)
- How clear the patterns are in the data`;

  return basePrompt;
}

/**
 * Build user prompt with player snapshot
 */
function buildUserPrompt(snapshot: PlayerAiSnapshot, locale: string): string {
  const statsPreamble = locale === "nl"
    ? "Analyseer de volgende spelerstatistieken:"
    : "Analyze the following player statistics:";

  // Format per90 stats, filtering out undefined values
  const per90Display = Object.entries(snapshot.per90)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `  ${key}: ${(value as number).toFixed(2)}`)
    .join("\n");

  // Format advanced stats if available
  const advancedDisplay = snapshot.advancedStats
    ? Object.entries(snapshot.advancedStats)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `  ${key}: ${(value as number).toFixed(2)}`)
        .join("\n")
    : "";

  const prompt = `${statsPreamble}

PLAYER PROFILE:
- Name: ${snapshot.name}
- Position: ${snapshot.position} (${snapshot.positionGroup})
- Age: ${snapshot.age ?? "Unknown"}
- Nationality: ${snapshot.nationality ?? "Unknown"}
- Team: ${snapshot.teamName}
- Competition: ${snapshot.competitionName} (${snapshot.competitionTier ?? "Unranked"})
- Country: ${snapshot.competitionCountry}
${snapshot.heightCm ? `- Height: ${snapshot.heightCm}cm` : ""}
${snapshot.weightKg ? `- Weight: ${snapshot.weightKg}kg` : ""}
${snapshot.preferredFoot ? `- Preferred Foot: ${snapshot.preferredFoot}` : ""}

PERFORMANCE (${snapshot.window === "365" ? "Last 365 days" : "Last 5 matches"}):
- Minutes Played: ${snapshot.minutes}
- Appearances: ${snapshot.appearances}

RATINGS:
- Rating (365 days): ${snapshot.rating365?.toFixed(1) ?? "N/A"}
- Rating (Last 5): ${snapshot.ratingLast5?.toFixed(1) ?? "N/A"}
- Level Score: ${snapshot.levelScore?.toFixed(1) ?? "N/A"}

PER 90 MINUTE STATISTICS:
${per90Display || "  No per90 stats available"}

${advancedDisplay ? `ADVANCED METRICS:\n${advancedDisplay}` : ""}

DATA SOURCES: ${snapshot.sourcesUsed.join(", ")}

Based on these statistics, generate a comprehensive player report. Remember:
- Only reference statistics that are actually provided above
- Be specific about what the numbers tell us
- Adjust confidence based on data quality (${snapshot.minutes} minutes is ${snapshot.minutes < 300 ? "limited" : snapshot.minutes < 900 ? "moderate" : "good"} sample size)`;

  return prompt;
}

/**
 * Validate AI response has all required fields
 */
function validateAiResponse(response: unknown): asserts response is AiReportOutput {
  const r = response as Record<string, unknown>;

  if (typeof r.shortDescription !== "string" || r.shortDescription.length < 10) {
    throw new Error("Invalid shortDescription in AI response");
  }
  if (typeof r.longDescription !== "string" || r.longDescription.length < 50) {
    throw new Error("Invalid longDescription in AI response");
  }
  if (typeof r.archetype !== "string" || r.archetype.length < 3) {
    throw new Error("Invalid archetype in AI response");
  }
  if (!Array.isArray(r.playstyleTags)) {
    throw new Error("Invalid playstyleTags in AI response");
  }
  if (!Array.isArray(r.strengths)) {
    throw new Error("Invalid strengths in AI response");
  }
  if (!Array.isArray(r.weaknesses)) {
    throw new Error("Invalid weaknesses in AI response");
  }
  if (typeof r.confidence !== "number" || r.confidence < 0 || r.confidence > 1) {
    throw new Error("Invalid confidence in AI response");
  }
}
```

### 🛤️ Routes & Pages

#### `src/routes/__root.tsx`

```typescript
import { useEffect } from "react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { Analytics } from "@vercel/analytics/react";
import type { QueryClient } from "@tanstack/react-query";
import type { ConvexQueryClient } from "@convex-dev/react-query";

import Header from "../components/Header";
import { Providers } from "../lib/providers";
import { authClient } from "../lib/auth-client";

import appCss from "../styles.css?url";

// Router context type
interface RouterContext {
  queryClient: QueryClient;
  convexQueryClient: ConvexQueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Footbase - European Football Scouting",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  component: RootComponent,
  shellComponent: RootDocument,
});

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  // Check if on login page (SSR-safe using router state)
  const isLoginPage = pathname === "/login";

  // Redirect to login if not authenticated
  const shouldRedirect = !isLoginPage && !isPending && !session;

  useEffect(() => {
    if (shouldRedirect) {
      router.navigate({ to: "/login" });
    }
  }, [shouldRedirect, router]);

  // On login page, only render the page content (no header)
  if (isLoginPage) {
    return <Outlet />;
  }

  // Wait for session check or redirect
  if (isPending || !session) {
    return null;
  }

  // Authenticated: render Header + content
  return <>{children}</>;
}

function RootComponent() {
  const { queryClient, convexQueryClient } = Route.useRouteContext();

  return (
    <Providers queryClient={queryClient} convexQueryClient={convexQueryClient}>
      <AuthGuard>
        <Header />
        <Outlet />
      </AuthGuard>
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </Providers>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Link to="/players" className="w-full sm:w-auto">
              <Button size="lg" className="gap-2 w-full sm:w-auto text-base">
                <Users className="h-5 w-5" />
                Bekijk Spelers
              </Button>
            </Link>
            <Link to="/competitions" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto text-base">
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

#### `src/routes/login.tsx`

```typescript
import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient, authConfig } from "@/lib/auth-client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

type AuthMode = "login" | "signup";

function LoginPage() {
  const { data: session } = authClient.useSession();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect to home (check cached data too)
  useEffect(() => {
    const cachedSession = authClient.getSessionData?.();
    if (session || cachedSession) {
      window.location.href = "/";
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Check if auth is properly configured
    if (!authConfig.isConfigured) {
      setError(
        "Authenticatie is niet correct geconfigureerd. Neem contact op met de beheerder."
      );
      console.error("Auth not configured. VITE_CONVEX_SITE_URL:", authConfig.baseURL);
      setIsLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        const result = await authClient.signIn.email({
          email,
          password,
        });

        if (result.error) {
          // Map common error codes to user-friendly Dutch messages
          const errorMessage = getErrorMessage(result.error);
          setError(errorMessage);
          setIsLoading(false);
        } else {
          setSuccess(true);
          window.location.href = "/";
        }
      } else {
        const result = await authClient.signUp.email({
          email,
          password,
          name,
        });

        if (result.error) {
          const errorMessage = getErrorMessage(result.error);
          setError(errorMessage);
          setIsLoading(false);
        } else {
          setSuccess(true);
          window.location.href = "/";
        }
      }
    } catch (err) {
      // Handle network errors and unexpected failures
      const errorMessage = getNetworkErrorMessage(err);
      setError(errorMessage);
      console.error("Auth error:", err);
      setIsLoading(false);
    }
  };

  // Map Better Auth error codes to Dutch user-friendly messages
  function getErrorMessage(error: { message?: string; code?: string; status?: number }): string {
    const code = error.code?.toLowerCase() || "";
    const message = error.message?.toLowerCase() || "";
    const status = error.status;

    // Check status codes first
    if (status === 404) {
      return "Authenticatieserver niet bereikbaar. Controleer de configuratie.";
    }
    if (status === 401 || code === "invalid_credentials" || message.includes("invalid")) {
      return "Onjuist e-mailadres of wachtwoord.";
    }
    if (status === 429 || code === "too_many_requests") {
      return "Te veel inlogpogingen. Probeer het later opnieuw.";
    }

    // Check error codes
    if (code === "user_not_found" || message.includes("user not found")) {
      return "Geen account gevonden met dit e-mailadres.";
    }
    if (code === "email_already_exists" || message.includes("already exists")) {
      return "Er bestaat al een account met dit e-mailadres.";
    }
    if (code === "invalid_email" || message.includes("invalid email")) {
      return "Ongeldig e-mailadres.";
    }
    if (code === "password_too_short" || message.includes("password") && message.includes("short")) {
      return "Wachtwoord moet minimaal 8 tekens bevatten.";
    }
    if (code === "weak_password" || message.includes("weak password")) {
      return "Kies een sterker wachtwoord.";
    }

    // Fallback to original message or generic error
    return error.message || "Er is iets misgegaan. Probeer het opnieuw.";
  }

  // Handle network-level errors
  function getNetworkErrorMessage(err: unknown): string {
    if (err instanceof TypeError && err.message.includes("fetch")) {
      return "Kan geen verbinding maken met de server. Controleer je internetverbinding.";
    }
    if (err instanceof Error) {
      if (err.message.includes("404")) {
        return "Authenticatieserver niet gevonden. De app is mogelijk niet correct geconfigureerd.";
      }
      if (err.message.includes("network") || err.message.includes("CORS")) {
        return "Netwerkfout. Probeer het later opnieuw.";
      }
    }
    return "Er is een onverwachte fout opgetreden. Probeer het opnieuw.";
  }

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="mx-auto h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                <span className="text-primary-foreground font-bold text-2xl">F</span>
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <CardTitle className="text-2xl font-bold">
                  {mode === "login" ? "Welkom terug" : "Account aanmaken"}
                </CardTitle>
                <CardDescription className="mt-2">
                  {mode === "login"
                    ? "Log in om door te gaan naar Footbase"
                    : "Maak een account aan om te beginnen"}
                </CardDescription>
              </motion.div>
            </AnimatePresence>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {mode === "signup" && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name">Naam</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Je naam"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                          required={mode === "signup"}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="je@email.nl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Label htmlFor="password">Wachtwoord</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Je wachtwoord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={8}
                  />
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  type="submit"
                  className="w-full relative overflow-hidden"
                  disabled={isLoading || success}
                >
                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Gelukt!
                      </motion.span>
                    ) : isLoading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Even geduld...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        {mode === "login" ? "Inloggen" : "Account aanmaken"}
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </form>

            <motion.div
              className="mt-6 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {mode === "login" ? (
                <>
                  Nog geen account?{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-primary hover:underline font-medium transition-colors"
                  >
                    Registreer hier
                  </button>
                </>
              ) : (
                <>
                  Al een account?{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-primary hover:underline font-medium transition-colors"
                  >
                    Log in
                  </button>
                </>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
```

#### `src/routes/players.$playerId.tsx`

```typescript
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
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
import { PlayerAiReport } from "@/components/app/PlayerAiReport";
import { DataSourceBadge } from "@/components/app/DataSourceBadge";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/players/$playerId")({
  component: PlayerProfilePage,
});

function PlayerProfilePage() {
  const { playerId } = Route.useParams();
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [isRequestingReport, setIsRequestingReport] = useState(false);
  const [requestError, setRequestError] = useState<string | undefined>();

  const { data: player, isLoading } = useQuery(
    convexQuery(api.playerQueries.get, {
      playerId: playerId as Id<"players">,
    })
  );

  // Query for AI report
  const { data: aiReport, isLoading: isAiReportLoading, refetch: refetchAiReport } = useQuery(
    convexQuery(api["ai/playerAiQueries"].getReport, {
      playerId: playerId as Id<"players">,
      window: "365",
      locale: "nl",
    })
  );

  // Track view mutation
  const trackViewMutation = useConvexMutation(api["ai/playerAiQueries"].trackView);

  // Request report mutation
  const requestReportMutation = useConvexMutation(api["ai/playerAiQueries"].requestReport);

  // Track view on mount (once per page load)
  useEffect(() => {
    if (!hasTrackedView && playerId) {
      trackViewMutation({ playerId: playerId as Id<"players"> })
        .then(() => setHasTrackedView(true))
        .catch(() => {
          // Silently fail - view tracking is best-effort
        });
    }
  }, [playerId, hasTrackedView, trackViewMutation]);

  // Handler to request AI report generation
  const handleRequestReport = async () => {
    setIsRequestingReport(true);
    setRequestError(undefined);

    try {
      const result = await requestReportMutation({
        playerId: playerId as Id<"players">,
        window: "365",
        locale: "nl",
      });

      if (!result.success) {
        setRequestError(result.error || "Er is een fout opgetreden");
      } else if (result.queued) {
        // Report was queued, it will be generated async
        // Poll for updates
        setTimeout(() => refetchAiReport(), 3000);
        setTimeout(() => refetchAiReport(), 10000);
        setTimeout(() => refetchAiReport(), 30000);
      }
    } catch {
      setRequestError("Er is een fout opgetreden");
    } finally {
      setIsRequestingReport(false);
    }
  };

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
                  {player.stats?.dataSource && (
                    <DataSourceBadge source={player.stats.dataSource} />
                  )}
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

          {/* StatsBomb Advanced Stats */}
          {player.statsbombStats && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  Geavanceerde Statistieken
                  <Badge variant="statsbomb" className="text-xs">StatsBomb</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* OBV (On-Ball Value) */}
                  <StatHighlight
                    label="OBV"
                    value={player.statsbombStats.obvPer90?.toFixed(2)}
                    suffix="/90"
                  />
                  {/* Progressive Actions */}
                  <StatHighlight
                    label="Prog. Passes"
                    value={player.statsbombStats.progressivePassesPer90?.toFixed(1)}
                    suffix="/90"
                  />
                  <StatHighlight
                    label="Prog. Carries"
                    value={player.statsbombStats.progressiveCarriesPer90?.toFixed(1)}
                    suffix="/90"
                  />
                  {/* Pressure */}
                  <StatHighlight
                    label="Pressures"
                    value={player.statsbombStats.pressuresPer90?.toFixed(1)}
                    suffix="/90"
                  />
                  {/* Creating */}
                  <StatHighlight
                    label="SCA"
                    value={player.statsbombStats.shotCreatingActionsPer90?.toFixed(1)}
                    suffix="/90"
                  />
                  <StatHighlight
                    label="GCA"
                    value={player.statsbombStats.goalCreatingActionsPer90?.toFixed(1)}
                    suffix="/90"
                  />
                  {/* Success Rates */}
                  {player.statsbombStats.pressureSuccessRate !== undefined && (
                    <StatHighlight
                      label="Pressure %"
                      value={(player.statsbombStats.pressureSuccessRate * 100).toFixed(0)}
                      suffix="%"
                    />
                  )}
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

          {/* AI Report Section */}
          <PlayerAiReport
            report={aiReport}
            isLoading={isAiReportLoading}
            onRequestReport={player.stats?.minutes && player.stats.minutes >= 90 ? handleRequestReport : undefined}
            isRequesting={isRequestingReport}
            error={requestError}
          />
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
    minMinutes: searchParams.minMinutes ?? 0,
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
    filters.minMinutes !== 0,
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

#### `src/components/app/DataSourceBadge.tsx`

```typescript
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type DataSource = "statsbomb" | "fotmob" | "sofascore" | "apiFootball";

interface DataSourceBadgeProps {
  source: DataSource | string | undefined | null;
  className?: string;
  showLabel?: boolean;
}

const sourceConfig: Record<
  DataSource,
  {
    label: string;
    variant: "statsbomb" | "fotmob" | "sofascore" | "apifootball";
  }
> = {
  statsbomb: { label: "StatsBomb", variant: "statsbomb" },
  fotmob: { label: "FotMob", variant: "fotmob" },
  sofascore: { label: "SofaScore", variant: "sofascore" },
  apiFootball: { label: "API-Football", variant: "apifootball" },
};

export function DataSourceBadge({
  source,
  className,
  showLabel = true,
}: DataSourceBadgeProps) {
  if (!source) {
    return null;
  }

  const config = sourceConfig[source as DataSource];
  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        {source}
      </Badge>
    );
  }

  return (
    <Badge variant={config.variant} className={cn("text-xs", className)}>
      {showLabel ? config.label : config.label.charAt(0)}
    </Badge>
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

#### `src/components/app/PlayerAiReport.tsx`

```typescript
/**
 * Player AI Report Display Component
 *
 * Displays AI-generated player descriptions, archetype, playstyle tags,
 * strengths and weaknesses.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sparkles,
  Target,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

interface AiReport {
  shortDescription: string;
  longDescription: string;
  archetype: string;
  playstyleTags: string[];
  strengths: string[];
  weaknesses: string[];
  confidence: number;
  generatedAt: number;
  model: string;
  window: "365" | "last5";
}

interface PlayerAiReportProps {
  report: AiReport | null | undefined;
  isLoading: boolean;
  onRequestReport?: () => void;
  isRequesting?: boolean;
  error?: string;
}

export function PlayerAiReport({
  report,
  isLoading,
  onRequestReport,
  isRequesting,
  error,
}: PlayerAiReportProps) {
  if (isLoading) {
    return <PlayerAiReportSkeleton />;
  }

  if (!report) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-amber-500" />
            AI Spelersanalyse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Er is nog geen AI-analyse beschikbaar voor deze speler.
            </p>
            {error && (
              <div className="flex items-center justify-center gap-2 text-destructive text-sm mb-4">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            {onRequestReport && (
              <Button
                onClick={onRequestReport}
                disabled={isRequesting}
                variant="outline"
                size="sm"
              >
                {isRequesting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyseren...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Genereer Analyse
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const confidenceLabel = getConfidenceLabel(report.confidence);
  const generatedDate = new Date(report.generatedAt).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="space-y-4">
      {/* Short Description Card */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-amber-500" />
              AI Spelersanalyse
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {confidenceLabel}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {report.shortDescription}
          </p>
        </CardContent>
      </Card>

      {/* Archetype and Tags */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4" />
            Speelstijl
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Archetype */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Archetype</p>
            <Badge variant="secondary" className="text-sm">
              {report.archetype}
            </Badge>
          </div>

          {/* Playstyle Tags */}
          {report.playstyleTags.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Kenmerken</p>
              <div className="flex flex-wrap gap-1.5">
                {report.playstyleTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              Sterke Punten
            </CardTitle>
          </CardHeader>
          <CardContent>
            {report.strengths.length > 0 ? (
              <ul className="space-y-1.5">
                {report.strengths.map((strength, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-green-500 mt-1.5">
                      <svg
                        className="h-2 w-2 fill-current"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    </span>
                    {strength}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Geen sterke punten geidentificeerd
              </p>
            )}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm text-red-600">
              <TrendingDown className="h-4 w-4" />
              Verbeterpunten
            </CardTitle>
          </CardHeader>
          <CardContent>
            {report.weaknesses.length > 0 ? (
              <ul className="space-y-1.5">
                {report.weaknesses.map((weakness, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-red-500 mt-1.5">
                      <svg
                        className="h-2 w-2 fill-current"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    </span>
                    {weakness}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Geen verbeterpunten geidentificeerd
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Long Description */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Uitgebreide Analyse</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {report.longDescription}
          </p>
          <p className="text-xs text-muted-foreground/60 mt-4 pt-4 border-t">
            Gegenereerd op {generatedDate} op basis van{" "}
            {report.window === "365" ? "365 dagen" : "laatste 5 wedstrijden"} data
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function PlayerAiReportSkeleton() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-24" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-14" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getConfidenceLabel(confidence: number): string {
  if (confidence >= 0.8) return "Hoge betrouwbaarheid";
  if (confidence >= 0.6) return "Gemiddelde betrouwbaarheid";
  if (confidence >= 0.4) return "Lage betrouwbaarheid";
  return "Zeer beperkte data";
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
      minMinutes: 0,
      window: "365",
    });
  }, [onFiltersChange]);

  const hasActiveFilters =
    filters.search ||
    filters.country ||
    filters.competitionId ||
    filters.tier ||
    filters.positionGroup ||
    filters.minMinutes !== 0 ||
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

### 🧩 Components

#### `src/components/Header.tsx`

```typescript
import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Users, Trophy, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";

function NavLink({
  to,
  children,
  icon: Icon,
  onClick,
  mobile = false,
}: {
  to: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const routerState = useRouterState();
  const isActive = routerState.location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-md font-medium transition-colors",
        mobile ? "px-4 py-3 text-base" : "px-3 py-2 text-sm",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      <Icon className={cn(mobile ? "h-5 w-5" : "h-4 w-4")} />
      {children}
    </Link>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const routerState = useRouterState();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [routerState.location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleSignOut = async () => {
    setIsMenuOpen(false);
    await authClient.signOut();
    window.location.href = "/login";
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <nav className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold">Footbase</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/players" icon={Users}>
              Spelers
            </NavLink>
            <NavLink to="/competitions" icon={Trophy}>
              Competities
            </NavLink>

            {user && (
              <div className="ml-4 pl-4 border-l border-border flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {user.name || user.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Uitloggen
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Sluit menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-[57px] left-0 right-0 z-50 bg-card border-b border-border shadow-xl md:hidden"
            >
              <div className="flex flex-col">
                {/* Navigation Links */}
                <div className="py-3 px-4 space-y-1">
                  <NavLink to="/players" icon={Users} onClick={closeMenu} mobile>
                    Spelers
                  </NavLink>
                  <NavLink to="/competitions" icon={Trophy} onClick={closeMenu} mobile>
                    Competities
                  </NavLink>
                </div>

                {/* User Section */}
                {user && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    className="border-t border-border p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {(user.name || user.email || "U").charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {user.name || "Gebruiker"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Uitloggen
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```

### 🔧 Frontend Utilities

#### `src/lib/auth-client.ts`

```typescript
import { createAuthClient } from "better-auth/react";
import {
  convexClient,
  crossDomainClient,
} from "@convex-dev/better-auth/client/plugins";

// In development: use direct Convex URL (Nitro intercepts before Vite proxy)
// In production: use same-origin (Vercel rewrites proxy to Convex)
const isDev = import.meta.env.DEV;
// Use production Convex in dev so we can test with real user data
const devConvexUrl = "https://descriptive-kudu-712.convex.site";

export const authClient = createAuthClient({
  baseURL: isDev ? devConvexUrl : "",
  plugins: [convexClient(), crossDomainClient()],
});

// Export auth config info for debugging (SSR-safe)
export const authConfig = {
  baseURL: isDev ? devConvexUrl : (typeof window !== "undefined" ? window.location.origin : ""),
  isConfigured: true,
};
```

#### `src/lib/convex.ts`

```typescript
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";

// Factory function to create per-request Convex clients for SSR
export function createConvexClients() {
  const convexUrl =
    process.env.VITE_CONVEX_URL ?? import.meta.env.VITE_CONVEX_URL;

  if (!convexUrl) {
    console.warn(
      "VITE_CONVEX_URL is not set. Run `npx convex dev` to configure your Convex project."
    );
  }

  const convexQueryClient = new ConvexQueryClient(
    convexUrl || "https://placeholder.convex.cloud"
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  });

  // Connect the Convex query client to the QueryClient
  convexQueryClient.connect(queryClient);

  return { convexQueryClient, queryClient };
}

// Export type for router context
export type ConvexClients = ReturnType<typeof createConvexClients>;
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
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { authClient } from "./auth-client";

interface ProvidersProps {
  children: React.ReactNode;
  queryClient: QueryClient;
  convexQueryClient: ConvexQueryClient;
}

export function Providers({
  children,
  queryClient,
  convexQueryClient,
}: ProvidersProps) {
  return (
    <ConvexBetterAuthProvider
      client={convexQueryClient.convexClient}
      authClient={authClient}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConvexBetterAuthProvider>
  );
}
```

#### `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 📜 Scripts

#### `scripts/export-context.ts`

```typescript
#!/usr/bin/env npx tsx

/**
 * Codebase Context Export Script
 *
 * Exports important files to a single markdown file for LLM context.
 * Focuses on: schema, logic, routes, configuration
 * Excludes: node_modules, generated files, UI primitives, build artifacts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT_DIR, 'CODEBASE_CONTEXT.md');

// Priority patterns - files matching these are placed first in output
const PRIORITY_PATTERNS = [
  'package.json',
  '**/schema.ts',
  '**/convex.ts',
  '**/providers.tsx',
  '**/router.tsx',
  '**/__root.tsx',
];

// Directories to scan for important files
// Each entry can specify include patterns and exclude patterns
const SCAN_DIRS = [
  // Backend - all Convex code (automatically includes all subfolders)
  { dir: 'convex', include: ['*.ts'], exclude: ['_generated/**', 'tsconfig.json'] },
  // Frontend routes
  { dir: 'src/routes', include: ['*.tsx'], exclude: [] },
  // App-specific components (business logic)
  { dir: 'src/components/app', include: ['*.tsx'], exclude: [] },
  // Standalone components outside /app and /ui
  { dir: 'src/components', include: ['*.tsx'], exclude: ['app/**', 'ui/**'] },
  // Frontend utilities
  { dir: 'src/lib', include: ['*.ts', '*.tsx'], exclude: [] },
  // Scripts (for reference)
  { dir: 'scripts', include: ['*.ts'], exclude: [] },
];

// Patterns to always exclude
const GLOBAL_EXCLUDES = [
  'node_modules',
  'dist',
  'dist-ssr',
  '.next',
  '.vercel',
  '.tanstack',
  '_generated',
  '*.local',
  '*.lock',
  '.DS_Store',
  '*.map',
  '*.d.ts',
  'routeTree.gen.ts',
];

// UI component files to exclude (standard primitives)
const UI_PRIMITIVES = [
  'button.tsx', 'card.tsx', 'input.tsx', 'label.tsx', 'select.tsx',
  'table.tsx', 'tabs.tsx', 'badge.tsx', 'dialog.tsx', 'dropdown-menu.tsx',
  'popover.tsx', 'tooltip.tsx', 'separator.tsx', 'skeleton.tsx',
  'scroll-area.tsx', 'sheet.tsx', 'slider.tsx', 'switch.tsx',
  'textarea.tsx', 'toast.tsx', 'toaster.tsx', 'use-toast.ts',
  'accordion.tsx', 'alert.tsx', 'avatar.tsx', 'checkbox.tsx',
  'collapsible.tsx', 'command.tsx', 'context-menu.tsx', 'hover-card.tsx',
  'menubar.tsx', 'navigation-menu.tsx', 'progress.tsx', 'radio-group.tsx',
  'resizable.tsx', 'sonner.tsx', 'toggle.tsx', 'toggle-group.tsx',
];

interface FileEntry {
  relativePath: string;
  absolutePath: string;
  category: string;
  size: number;
}

function shouldExclude(filePath: string): boolean {
  const normalizedPath = filePath.replace(/\\/g, '/');
  const fileName = path.basename(filePath);

  // Check global excludes
  for (const exclude of GLOBAL_EXCLUDES) {
    if (exclude.startsWith('*.')) {
      const ext = exclude.slice(1);
      if (normalizedPath.endsWith(ext)) return true;
    } else if (normalizedPath.includes(`/${exclude}/`) || normalizedPath.includes(`/${exclude}`)) {
      return true;
    }
  }

  // Check UI primitives
  if (normalizedPath.includes('/components/ui/') && UI_PRIMITIVES.includes(fileName)) {
    return true;
  }

  return false;
}

function matchesPattern(fileName: string, pattern: string): boolean {
  if (pattern === '*.ts') return fileName.endsWith('.ts') && !fileName.endsWith('.d.ts');
  if (pattern === '*.tsx') return fileName.endsWith('.tsx');
  if (pattern === '*.json') return fileName.endsWith('.json');
  return fileName === pattern;
}

function scanDirectory(dirPath: string, patterns: string[], excludePatterns: string[]): string[] {
  const results: string[] = [];
  const absoluteDir = path.join(ROOT_DIR, dirPath);

  if (!fs.existsSync(absoluteDir)) return results;

  function scan(currentDir: string, relativePath: string = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const entryRelPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
      const entryAbsPath = path.join(currentDir, entry.name);
      const fullRelPath = `${dirPath}/${entryRelPath}`;

      // Check exclude patterns
      const shouldSkip = excludePatterns.some(pattern => {
        if (pattern.includes('**')) {
          const prefix = pattern.replace('/**', '');
          return entryRelPath.startsWith(prefix) || entry.name === prefix;
        }
        return entry.name === pattern;
      });

      if (shouldSkip) continue;

      if (entry.isDirectory()) {
        scan(entryAbsPath, entryRelPath);
      } else if (entry.isFile()) {
        const matchesAny = patterns.some(p => matchesPattern(entry.name, p));
        if (matchesAny && !shouldExclude(fullRelPath)) {
          results.push(fullRelPath);
        }
      }
    }
  }

  scan(absoluteDir);
  return results;
}

// Emoji mappings for known folder patterns
const FOLDER_EMOJIS: Record<string, string> = {
  'providers': '🔌',
  'ingest': '📥',
  'ratings': '⭐',
  'enrichment': '✨',
  'merge': '🔀',
  'resolve': '🔍',
  'admin': '🔧',
  'lib': '📚',
  'ai': '🤖',
  'validation': '✅',
  'analytics': '📈',
  'notifications': '🔔',
  'cache': '💾',
  'jobs': '⏰',
  'webhooks': '🪝',
  'migrations': '🔄',
};

// Get emoji for a folder name (with fallback)
function getFolderEmoji(folderName: string): string {
  return FOLDER_EMOJIS[folderName] || '📁';
}

// Dynamically build category name for convex subfolders
function buildConvexCategoryName(folderName: string): string {
  const emoji = getFolderEmoji(folderName);
  const description = FOLDER_DESCRIPTIONS[folderName] || folderName.charAt(0).toUpperCase() + folderName.slice(1);
  return `${emoji} ${description}`;
}

// Category mappings - maps folder patterns to category names
// Order matters: more specific patterns should come first
const STATIC_CATEGORY_MAPPINGS: Array<{ pattern: string | RegExp; category: string }> = [
  // Specific file patterns
  { pattern: 'package.json', category: '📦 Dependencies' },
  { pattern: /convex\/schema\.ts$/, category: '🗄️ Database Schema' },
  { pattern: /Queries\.ts$/, category: '📊 Database Queries' },

  // Root config files
  { pattern: /^(tsconfig|vite\.config|tailwind\.config|postcss\.config|eslint\.config)/, category: '⚙️ Configuration' },

  // Catch-all for convex root files (subfolders handled dynamically)
  { pattern: /^convex\/[^/]+$/, category: '⚙️ Backend Logic' },

  // Frontend patterns
  { pattern: /^src\/routes\//, category: '🛤️ Routes & Pages' },
  { pattern: /^src\/components\/app\//, category: '🧩 App Components' },
  { pattern: /^src\/components\//, category: '🧩 Components' },
  { pattern: /^src\/lib\//, category: '🔧 Frontend Utilities' },

  // Scripts
  { pattern: /^scripts\//, category: '📜 Scripts' },
];

// Build dynamic category mappings based on discovered convex subfolders
function buildCategoryMappings(): Array<{ pattern: string | RegExp; category: string }> {
  const dynamicMappings: Array<{ pattern: string | RegExp; category: string }> = [];

  // Discover convex subfolders and create mappings for them
  const convexSubdirs = discoverSubdirs('convex');
  for (const subdir of convexSubdirs) {
    const pattern = new RegExp(`^convex/${subdir}/`);
    const category = buildConvexCategoryName(subdir);
    dynamicMappings.push({ pattern, category });
  }

  // Combine static and dynamic mappings (static first for priority)
  return [
    ...STATIC_CATEGORY_MAPPINGS.slice(0, 3), // package.json, schema.ts, Queries.ts
    ...dynamicMappings, // All convex subfolders
    ...STATIC_CATEGORY_MAPPINGS.slice(3), // Rest of static mappings
  ];
}

// Memoize category mappings (built once on first use)
let cachedCategoryMappings: Array<{ pattern: string | RegExp; category: string }> | null = null;

function getCategoryMappings(): Array<{ pattern: string | RegExp; category: string }> {
  if (!cachedCategoryMappings) {
    cachedCategoryMappings = buildCategoryMappings();
  }
  return cachedCategoryMappings;
}

function categorizeFile(relativePath: string): string {
  const normalizedPath = relativePath.replace(/\\/g, '/');
  const mappings = getCategoryMappings();

  for (const { pattern, category } of mappings) {
    if (typeof pattern === 'string') {
      if (normalizedPath === pattern || normalizedPath.endsWith(`/${pattern}`)) {
        return category;
      }
    } else if (pattern.test(normalizedPath)) {
      return category;
    }
  }

  return '📄 Other';
}

function getFileContent(absolutePath: string): string | null {
  try {
    return fs.readFileSync(absolutePath, 'utf-8');
  } catch {
    return null;
  }
}

function getLanguage(filePath: string): string {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) return 'typescript';
  if (filePath.endsWith('.json')) return 'json';
  if (filePath.endsWith('.md')) return 'markdown';
  if (filePath.endsWith('.css')) return 'css';
  return '';
}

// Auto-discover subdirectories for dynamic tree generation
function discoverSubdirs(baseDir: string): string[] {
  const absoluteDir = path.join(ROOT_DIR, baseDir);
  if (!fs.existsSync(absoluteDir)) return [];

  const entries = fs.readdirSync(absoluteDir, { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory() && !e.name.startsWith('_') && !e.name.startsWith('.'))
    .map(e => e.name)
    .sort();
}

// Category descriptions for known folder patterns
const FOLDER_DESCRIPTIONS: Record<string, string> = {
  'convex': 'Convex serverless backend',
  'providers': 'External API integrations',
  'ingest': 'Data ingestion pipelines',
  'ratings': 'Player rating computation',
  'enrichment': 'Data enrichment logic',
  'merge': 'Player merging logic',
  'resolve': 'Player resolution',
  'ai': 'AI & report generation',
  'admin': 'Admin utilities',
  'lib': 'Shared utilities',
  'src': 'React frontend',
  'routes': 'TanStack Router pages',
  'components': 'React components',
  'app': 'Business logic components',
  'ui': 'UI primitives',
  'scripts': 'Build & utility scripts',
};

function getDescription(folderName: string): string {
  return FOLDER_DESCRIPTIONS[folderName] || folderName;
}

function generateDirectoryTree(): string {
  const tree: string[] = ['```'];
  tree.push('Footbase/');

  // Convex backend
  tree.push(`├── convex/`.padEnd(30) + `# ${getDescription('convex')}`);
  const convexSubdirs = discoverSubdirs('convex');
  for (const subdir of convexSubdirs) {
    tree.push(`│   ├── ${subdir}/`.padEnd(30) + `# ${getDescription(subdir)}`);
  }

  // Frontend
  tree.push(`├── src/`.padEnd(30) + `# ${getDescription('src')}`);
  tree.push(`│   ├── routes/`.padEnd(30) + `# ${getDescription('routes')}`);
  tree.push(`│   ├── components/`.padEnd(30) + `# ${getDescription('components')}`);
  tree.push(`│   │   ├── app/`.padEnd(30) + `# ${getDescription('app')}`);
  tree.push(`│   │   └── ui/`.padEnd(30) + `# ${getDescription('ui')}`);
  tree.push(`│   └── lib/`.padEnd(30) + `# ${getDescription('lib')}`);

  // Scripts
  if (fs.existsSync(path.join(ROOT_DIR, 'scripts'))) {
    tree.push(`├── scripts/`.padEnd(30) + `# ${getDescription('scripts')}`);
  }

  tree.push('```');
  return tree.join('\n');
}

interface SampleTable {
  table: string;
  count: number;
  samples: Record<string, unknown>[];
}

interface SampleDataExport {
  exportedAt: string;
  limit: number;
  tables: SampleTable[];
}

const SAMPLE_DATA_CACHE_FILE = path.join(ROOT_DIR, '.sample-data-cache.json');

/**
 * Fetch sample data from Convex production database
 * Falls back to cached file if Convex query fails
 */
function fetchSampleData(): SampleDataExport | null {
  console.log('📊 Fetching sample data from Convex...');

  try {
    const result = execSync(
      'npx convex run admin:exportSampleData --prod',
      {
        cwd: ROOT_DIR,
        encoding: 'utf-8',
        timeout: 60000, // 60 second timeout
        stdio: ['pipe', 'pipe', 'pipe'],
      }
    );

    // Parse the JSON output
    const data = JSON.parse(result.trim()) as SampleDataExport;
    console.log(`✅ Fetched samples from ${data.tables.length} tables`);

    // Cache the result for future runs
    fs.writeFileSync(SAMPLE_DATA_CACHE_FILE, JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.warn('⚠️  Could not fetch sample data from Convex');

    // Try to load from cache
    if (fs.existsSync(SAMPLE_DATA_CACHE_FILE)) {
      console.log('📂 Loading sample data from cache...');
      try {
        const cached = JSON.parse(fs.readFileSync(SAMPLE_DATA_CACHE_FILE, 'utf-8')) as SampleDataExport;
        console.log(`✅ Loaded cached samples from ${cached.exportedAt}`);
        return cached;
      } catch {
        console.warn('   Cache file is invalid');
      }
    }

    console.warn('   To enable sample data export:');
    console.warn('   1. Fix any TypeScript errors in convex/');
    console.warn('   2. Run: npx convex deploy');
    console.warn('   3. Re-run this script');
    return null;
  }
}

/**
 * Format sample data as markdown
 */
function formatSampleDataMarkdown(data: SampleDataExport): string {
  const lines: string[] = [];

  lines.push('## Database Sample Data');
  lines.push('');
  lines.push(`> Sample records from production database (up to ${data.limit} per table)`);
  lines.push(`> Exported: ${data.exportedAt}`);
  lines.push('');

  for (const table of data.tables) {
    if (table.count === 0) continue;

    lines.push(`### \`${table.table}\` (${table.count} samples)`);
    lines.push('');
    lines.push('```json');

    // Format each sample with truncation for very long fields
    const truncatedSamples = table.samples.map(sample => {
      const truncated: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(sample)) {
        if (typeof value === 'string' && value.length > 200) {
          truncated[key] = value.substring(0, 200) + '...';
        } else if (typeof value === 'object' && value !== null) {
          const str = JSON.stringify(value);
          if (str.length > 300) {
            truncated[key] = '[Object truncated]';
          } else {
            truncated[key] = value;
          }
        } else {
          truncated[key] = value;
        }
      }
      return truncated;
    });

    lines.push(JSON.stringify(truncatedSamples.slice(0, 5), null, 2)); // Show first 5 in detail

    if (table.count > 5) {
      lines.push(`\n// ... and ${table.count - 5} more records`);
    }

    lines.push('```');
    lines.push('');
  }

  return lines.join('\n');
}

function handleEnvFile(): string | null {
  const envPath = path.join(ROOT_DIR, '.env');
  const envExamplePath = path.join(ROOT_DIR, '.env.example');
  const envLocalPath = path.join(ROOT_DIR, '.env.local');

  // Check if .env.example exists
  if (fs.existsSync(envExamplePath)) {
    const content = fs.readFileSync(envExamplePath, 'utf-8');
    // Only include if it doesn't contain actual values
    if (!content.includes('=sk-') && !content.includes('=api_')) {
      return content;
    }
  }

  // Generate template from .env or .env.local
  const sourceEnv = fs.existsSync(envPath) ? envPath :
                    fs.existsSync(envLocalPath) ? envLocalPath : null;

  if (sourceEnv) {
    const content = fs.readFileSync(sourceEnv, 'utf-8');
    const lines = content.split('\n');
    const template = lines.map(line => {
      if (line.startsWith('#') || line.trim() === '') return line;
      const [key] = line.split('=');
      if (key) return `${key.trim()}=<your-value>`;
      return line;
    }).join('\n');
    return template;
  }

  return null;
}

function matchesPriorityPattern(relativePath: string): boolean {
  const normalizedPath = relativePath.replace(/\\/g, '/');
  for (const pattern of PRIORITY_PATTERNS) {
    if (pattern.startsWith('**/')) {
      const suffix = pattern.slice(3);
      if (normalizedPath.endsWith(suffix) || normalizedPath.endsWith(`/${suffix}`)) {
        return true;
      }
    } else if (normalizedPath === pattern || normalizedPath.endsWith(`/${pattern}`)) {
      return true;
    }
  }
  return false;
}

function main() {
  console.log('🚀 Exporting codebase context...\n');

  // Collect all files
  const allFiles: FileEntry[] = [];

  // Scan all configured directories
  for (const { dir, include, exclude } of SCAN_DIRS) {
    const scannedFiles = scanDirectory(dir, include, exclude);
    for (const file of scannedFiles) {
      // Skip duplicates
      if (allFiles.some(f => f.relativePath === file)) continue;

      const absolutePath = path.join(ROOT_DIR, file);
      const stats = fs.statSync(absolutePath);
      allFiles.push({
        relativePath: file,
        absolutePath,
        category: categorizeFile(file),
        size: stats.size,
      });
    }
  }

  // Add root-level config files
  const rootConfigFiles = ['package.json', 'tsconfig.json', 'vite.config.ts', 'tailwind.config.ts'];
  for (const file of rootConfigFiles) {
    const absolutePath = path.join(ROOT_DIR, file);
    if (fs.existsSync(absolutePath) && !allFiles.some(f => f.relativePath === file)) {
      const stats = fs.statSync(absolutePath);
      allFiles.push({
        relativePath: file,
        absolutePath,
        category: categorizeFile(file),
        size: stats.size,
      });
    }
  }

  // Sort: priority files first, then alphabetically within categories
  const files = allFiles.sort((a, b) => {
    const aPriority = matchesPriorityPattern(a.relativePath) ? 0 : 1;
    const bPriority = matchesPriorityPattern(b.relativePath) ? 0 : 1;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.relativePath.localeCompare(b.relativePath);
  });

  // Group files by category
  const grouped = new Map<string, FileEntry[]>();
  for (const file of files) {
    const existing = grouped.get(file.category) || [];
    existing.push(file);
    grouped.set(file.category, existing);
  }

  // Build category order dynamically
  // Start with priority categories, then add discovered convex folder categories, then frontend
  const priorityCategories = [
    '⚙️ Configuration',
    '📦 Dependencies',
    '🗄️ Database Schema',
    '📊 Database Queries',
    '⚙️ Backend Logic',
  ];

  // Get all categories from convex subfolders (sorted alphabetically for consistency)
  const convexSubdirs = discoverSubdirs('convex');
  const convexCategories = convexSubdirs.map(buildConvexCategoryName).sort();

  const frontendCategories = [
    '🛤️ Routes & Pages',
    '🧩 App Components',
    '🧩 Components',
    '🔧 Frontend Utilities',
    '📜 Scripts',
    '📄 Other',
  ];

  const categoryOrder = [...priorityCategories, ...convexCategories, ...frontendCategories];

  // Generate markdown
  const output: string[] = [];
  const timestamp = new Date().toISOString();
  const totalFiles = files.length;
  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  output.push('# Footbase Codebase Context');
  output.push('');
  output.push('> Auto-generated context export for LLM understanding');
  output.push('');
  output.push('## Overview');
  output.push('');
  output.push('**Footbase** is a football player statistics platform that:');
  output.push('- Ingests data from multiple sports data providers (API-Football, Fotmob, SofaScore)');
  output.push('- Enriches player data (height, weight, preferred foot)');
  output.push('- Computes player ratings and aggregated statistics');
  output.push('- Displays data through a React web application');
  output.push('');
  output.push('## Tech Stack');
  output.push('');
  output.push('| Layer | Technology |');
  output.push('|-------|------------|');
  output.push('| Frontend | React 19 + TanStack Router + Vite |');
  output.push('| Backend | Convex (serverless DB + functions) |');
  output.push('| Styling | Tailwind CSS + Radix UI |');
  output.push('| Data Sources | API-Football, Fotmob, SofaScore, Wikidata |');
  output.push('| Deployment | Vercel |');
  output.push('');
  output.push('## Directory Structure');
  output.push('');
  output.push(generateDirectoryTree());
  output.push('');
  output.push('## Export Statistics');
  output.push('');
  output.push(`- **Generated**: ${timestamp}`);
  output.push(`- **Files exported**: ${totalFiles}`);
  output.push(`- **Total size**: ${(totalSize / 1024).toFixed(1)} KB`);
  output.push('');

  // Add env template if available
  const envTemplate = handleEnvFile();
  if (envTemplate) {
    output.push('## Environment Variables');
    output.push('');
    output.push('```env');
    output.push(envTemplate);
    output.push('```');
    output.push('');
  }

  // Add sample data from production database
  const sampleData = fetchSampleData();
  if (sampleData) {
    output.push(formatSampleDataMarkdown(sampleData));
  }

  // Add file index
  output.push('## File Index');
  output.push('');
  for (const category of categoryOrder) {
    const categoryFiles = grouped.get(category);
    if (!categoryFiles || categoryFiles.length === 0) continue;

    output.push(`### ${category}`);
    output.push('');
    for (const file of categoryFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath))) {
      output.push(`- \`${file.relativePath}\``);
    }
    output.push('');
  }

  // Add file contents
  output.push('---');
  output.push('');
  output.push('## File Contents');
  output.push('');

  for (const category of categoryOrder) {
    const categoryFiles = grouped.get(category);
    if (!categoryFiles || categoryFiles.length === 0) continue;

    output.push(`### ${category}`);
    output.push('');

    for (const file of categoryFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath))) {
      const content = getFileContent(file.absolutePath);
      if (!content) continue;

      const lang = getLanguage(file.relativePath);
      output.push(`#### \`${file.relativePath}\``);
      output.push('');
      output.push(`\`\`\`${lang}`);
      output.push(content.trim());
      output.push('```');
      output.push('');
    }
  }

  // Write output
  fs.writeFileSync(OUTPUT_FILE, output.join('\n'));

  console.log(`✅ Exported ${totalFiles} files to ${OUTPUT_FILE}`);
  console.log(`📊 Total size: ${(totalSize / 1024).toFixed(1)} KB`);
  console.log('');
  console.log('Categories:');
  for (const category of categoryOrder) {
    const count = grouped.get(category)?.length || 0;
    if (count > 0) {
      console.log(`  ${category}: ${count} files`);
    }
  }
}

main();
```
