import { authComponent } from "../auth";
import type { QueryCtx, MutationCtx } from "../_generated/server";

/**
 * Require authentication for a query/mutation.
 * Throws if user is not authenticated.
 * @returns The authenticated user
 */
export async function requireAuth(ctx: QueryCtx | MutationCtx) {
  const user = await authComponent.getAuthUser(ctx);
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

/**
 * Get current user if authenticated (doesn't throw).
 * @returns The user or null if not authenticated
 */
export async function getUser(ctx: QueryCtx | MutationCtx) {
  return await authComponent.getAuthUser(ctx);
}
