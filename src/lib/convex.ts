import { ConvexQueryClient } from "@convex-dev/react-query";
import { ConvexReactClient } from "convex/react";

// Get Convex URL from environment, with fallback for development
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

if (!CONVEX_URL) {
  console.warn(
    "VITE_CONVEX_URL is not set. Run `npx convex dev` to configure your Convex project."
  );
}

// Create the Convex client - reads from VITE_CONVEX_URL env variable
// Use a placeholder URL if not set (will fail at runtime but allows app to load)
export const convex = new ConvexReactClient(
  CONVEX_URL || "https://placeholder.convex.cloud"
);

// Create the Convex Query Client for TanStack Query integration
export const convexQueryClient = new ConvexQueryClient(convex);
