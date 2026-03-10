import express from "express";
import cors from "cors";
import { initGraphQL } from "./routes/graphql_route";

export async function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  await initGraphQL(app);

  return app;
}
