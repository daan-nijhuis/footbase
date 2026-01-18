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
