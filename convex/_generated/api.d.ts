/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as admin_seedTestData from "../admin/seedTestData.js";
import type * as ai_aiCronRunner from "../ai/aiCronRunner.js";
import type * as ai_batchApi from "../ai/batchApi.js";
import type * as ai_buildPlayerAiInput from "../ai/buildPlayerAiInput.js";
import type * as ai_generatePlayerReport from "../ai/generatePlayerReport.js";
import type * as ai_playerAiQueries from "../ai/playerAiQueries.js";
import type * as competitionQueries from "../competitionQueries.js";
import type * as crons from "../crons.js";
import type * as enrichment_enrichActions from "../enrichment/enrichActions.js";
import type * as enrichment_testProviders from "../enrichment/testProviders.js";
import type * as health from "../health.js";
import type * as ingest_apiFootballIngest from "../ingest/apiFootballIngest.js";
import type * as ingest_cronRunner from "../ingest/cronRunner.js";
import type * as lib_metrics from "../lib/metrics.js";
import type * as merge_mergePlayer from "../merge/mergePlayer.js";
import type * as playerQueries from "../playerQueries.js";
import type * as providers_apiFootball from "../providers/apiFootball.js";
import type * as providers_apiFootballClient from "../providers/apiFootballClient.js";
import type * as providers_fetchWrapper from "../providers/fetchWrapper.js";
import type * as providers_fotmob from "../providers/fotmob.js";
import type * as providers_sofascore from "../providers/sofascore.js";
import type * as ratings_aggregate from "../ratings/aggregate.js";
import type * as ratings_compute from "../ratings/compute.js";
import type * as ratings_positionMapping from "../ratings/positionMapping.js";
import type * as ratings_scoring from "../ratings/scoring.js";
import type * as ratings_seed from "../ratings/seed.js";
import type * as resolve_resolvePlayer from "../resolve/resolvePlayer.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  "admin/seedTestData": typeof admin_seedTestData;
  "ai/aiCronRunner": typeof ai_aiCronRunner;
  "ai/batchApi": typeof ai_batchApi;
  "ai/buildPlayerAiInput": typeof ai_buildPlayerAiInput;
  "ai/generatePlayerReport": typeof ai_generatePlayerReport;
  "ai/playerAiQueries": typeof ai_playerAiQueries;
  competitionQueries: typeof competitionQueries;
  crons: typeof crons;
  "enrichment/enrichActions": typeof enrichment_enrichActions;
  "enrichment/testProviders": typeof enrichment_testProviders;
  health: typeof health;
  "ingest/apiFootballIngest": typeof ingest_apiFootballIngest;
  "ingest/cronRunner": typeof ingest_cronRunner;
  "lib/metrics": typeof lib_metrics;
  "merge/mergePlayer": typeof merge_mergePlayer;
  playerQueries: typeof playerQueries;
  "providers/apiFootball": typeof providers_apiFootball;
  "providers/apiFootballClient": typeof providers_apiFootballClient;
  "providers/fetchWrapper": typeof providers_fetchWrapper;
  "providers/fotmob": typeof providers_fotmob;
  "providers/sofascore": typeof providers_sofascore;
  "ratings/aggregate": typeof ratings_aggregate;
  "ratings/compute": typeof ratings_compute;
  "ratings/positionMapping": typeof ratings_positionMapping;
  "ratings/scoring": typeof ratings_scoring;
  "ratings/seed": typeof ratings_seed;
  "resolve/resolvePlayer": typeof resolve_resolvePlayer;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
