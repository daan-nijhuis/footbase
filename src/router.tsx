import { createRouter } from "@tanstack/react-router";
import { createConvexClients } from "./lib/convex";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance with per-request clients
export const getRouter = () => {
  const { queryClient, convexQueryClient } = createConvexClients();

  const router = createRouter({
    routeTree,
    context: { queryClient, convexQueryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

// Type registration for router context
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
