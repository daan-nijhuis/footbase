# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Footbase is a football player statistics platform that ingests data from sports APIs, computes player ratings, generates AI reports, and displays data through a React web application.

## Tech Stack

- **Frontend**: React 19 + TanStack Router + TanStack Query + Vite
- **Backend**: Convex (serverless database + functions)
- **Styling**: Tailwind CSS v4 + Radix UI
- **Auth**: Better Auth with Convex adapter
- **Data Sources**: API-Football (primary), Fotmob, SofaScore, Wikidata (stubs)
- **Deployment**: Vercel

## Commands

```bash
# Development (runs both frontend and Convex backend)
pnpm dev:all

# Frontend only (port 3000)
pnpm dev

# Convex backend only (watches for changes)
pnpm dev:convex

# Build for production
pnpm build

# Run tests
pnpm test

# Export codebase context for LLMs
pnpm export-context
```

## Architecture

### Directory Structure

```
convex/                    # Serverless backend
├── schema.ts              # Database schema (source of truth for all tables)
├── playerQueries.ts       # Player list/detail queries with filters
├── competitionQueries.ts  # Competition queries
├── admin.ts               # Admin functions for dashboard operations
├── crons.ts               # Cron job definitions
├── auth.ts                # Better Auth configuration
├── http.ts                # HTTP endpoint handlers
├── providers/             # External API integrations
│   ├── apiFootball.ts     # API-Football data fetching
│   └── apiFootballClient.ts # HTTP client with rate limiting
├── ingest/                # Data ingestion pipelines
│   ├── apiFootballIngest.ts # Ingestion actions
│   └── cronRunner.ts      # Daily cron handler
├── ratings/               # Player rating computation
│   ├── compute.ts         # Rating calculation logic
│   ├── aggregate.ts       # Stats aggregation
│   └── positionMapping.ts # Position-based weights
├── ai/                    # AI report generation
│   ├── generatePlayerReport.ts # OpenAI/Anthropic integration
│   ├── buildPlayerAiInput.ts   # Input preparation
│   ├── batchApi.ts        # OpenAI Batch API support
│   └── aiCronRunner.ts    # Daily AI batch job
└── enrichment/            # Data enrichment from multiple providers

src/                       # React frontend
├── routes/                # TanStack Router file-based routes
│   ├── __root.tsx         # Root layout
│   ├── index.tsx          # Home page
│   ├── players.index.tsx  # Players list with filters
│   ├── players.$playerId.tsx # Player detail page
│   ├── competitions.*.tsx # Competition pages
│   └── login.tsx          # Auth page
├── components/
│   ├── app/               # Business logic components
│   └── ui/                # Radix-based UI primitives
└── lib/
    ├── convex.ts          # Convex client factory
    └── providers.tsx      # React context providers
```

### Key Patterns

**Convex Functions**: Use `query` for reads, `mutation` for writes, `action` for external API calls. Internal functions use `internalQuery`, `internalMutation`, `internalAction`.

**Query Patterns**: Player queries use nuqs for URL state management. Filters, pagination, and sorting are all URL-driven.

**TanStack Router**: File-based routing in `src/routes/`. Routes define loaders for data prefetching. Use `<Link>` for navigation.

**Auth Flow**: Better Auth with Convex adapter. Auth state managed via `@convex-dev/better-auth`. HTTP endpoints handle auth callbacks at `convex/http.ts`.

### Database Schema Highlights

The schema (`convex/schema.ts`) includes validators for:
- **Tiers**: Platinum, Diamond, Elite, Gold, Silver, Bronze
- **Position Groups**: GK, DEF, MID, ATT
- **Providers**: apiFootball, fotmob, sofascore, etc.

Key tables: `players`, `teams`, `competitions`, `appearances`, `playerRollingStats`, `playerRatings`, `playerAiReports`.

### Cron Jobs

- **04:00 UTC**: Daily data ingestion (competitions, teams, players, fixtures)
- **05:00 UTC**: Daily AI report batch generation

### Environment Variables

Set in Convex Dashboard for backend, `.env` for frontend:

```env
# Convex (required)
CONVEX_DEPLOYMENT=dev:your-project
VITE_CONVEX_URL=https://your-project.convex.cloud

# Auth (set in Convex dashboard)
SITE_URL=http://localhost:3000
VITE_CONVEX_SITE_URL=https://your-project.convex.site

# Data ingestion (Convex dashboard)
API_FOOTBALL_KEY=your_key

# AI reports (Convex dashboard)
AI_GATEWAY_API_KEY=your_key
AI_PLAYER_REPORT_MODEL=openai/gpt-4o-mini
```

## Path Aliases

- `@/*` maps to `./src/*` (e.g., `@/components/ui/button`)
