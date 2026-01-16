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
