import express from "express";
import cors from "cors";
import { initGraphQL } from "./routes/graphql_route";
import { authMiddleware } from "./middleware/auth_middleware";

export async function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // ✅ Auth0 middleware
  app.use(authMiddleware);

  await initGraphQL(app);

  return app;
}
