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

