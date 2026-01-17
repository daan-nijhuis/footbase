import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const app: any = defineApp();
app.use(betterAuth);

export default app;
