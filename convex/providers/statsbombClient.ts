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
