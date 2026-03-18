import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs } from "../graphql/schema";
import { resolvers } from "../graphql/resolvers";
import express from "express";
import { UserModel } from "../models/user_model";
import axios from "axios"; // ✅ ADD THIS

export async function initGraphQL(app: express.Application) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        console.log("AUTH HEADER:", req.headers.authorization);

        const authUser = (req as any).auth;

        // ❌ No token
        if (!authUser) {
          return { user: null };
        }

        try {
          // ✅ Extract token
          const token = req.headers.authorization?.split(" ")[1];

          // ✅ Fetch full user profile from Auth0
          const userInfoRes = await axios.get(
            `https://dev-4t0dh42mxpgd2z77.us.auth0.com/userinfo`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const { email, name, sub } = userInfoRes.data;

          // ✅ Check if user exists
          let user = await UserModel.findByAuth0Id(sub);

          // ✅ Create user if not exists
          if (!user) {
            user = await UserModel.createFromAuth0({
              auth0_id: sub,
              email,
              name,
            });

            console.log("✅ NEW USER CREATED:", user);
          }

          return { user };
        } catch (error) {
          console.error("❌ Error fetching Auth0 user:", error);
          return { user: null };
        }
      },
    }),
  );
}
