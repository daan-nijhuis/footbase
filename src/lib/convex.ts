import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";

// Factory function to create per-request Convex clients for SSR
export function createConvexClients() {
  const convexUrl =
    process.env.VITE_CONVEX_URL ?? import.meta.env.VITE_CONVEX_URL;

  if (!convexUrl) {
    console.warn(
      "VITE_CONVEX_URL is not set. Run `npx convex dev` to configure your Convex project."
    );
  }

  const convexQueryClient = new ConvexQueryClient(
    convexUrl || "https://placeholder.convex.cloud"
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  });

  // Connect the Convex query client to the QueryClient
  convexQueryClient.connect(queryClient);

  return { convexQueryClient, queryClient };
}

// Export type for router context
export type ConvexClients = ReturnType<typeof createConvexClients>;
