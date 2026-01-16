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
