import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { config } from "dotenv";
import typeDefs from "./graphql/typeDefs/typeDefs.js";
import resolvers from "./graphql/resolvers/post.js";
import db from "./config/database.js";

config();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
db();
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => ({
    // token: getToken(req.headers.authentication),
    // dataSources: {
    //   userApi: new UserAPI(),
    // },
    value: "context'ten gelen veriler burada."
  }),
});

console.log(`🚀  Server ready at: ${url}`);
