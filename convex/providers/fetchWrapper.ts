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
        "User-Agent": "Footbase-Scouting/1.0 (contact@footbase.app)",
        Accept: "application/json",
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
