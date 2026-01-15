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
