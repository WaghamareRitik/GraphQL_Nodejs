import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "../graphql/schema";
import { resolvers } from "../graphql/resolvers";
import express from "express";

export async function initGraphQL(app: express.Application) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", express.json(), expressMiddleware(server));
}
