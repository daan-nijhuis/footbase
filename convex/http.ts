import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

// Register Better Auth routes with CORS enabled
authComponent.registerRoutes(http, createAuth, {
  cors: {
    allowedOrigins: [
      "http://localhost:3000",
      "https://footbase.app",
      "https://www.footbase.app",
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

export default http;
