import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { config } from "dotenv";
import lodash from "lodash";
import postTypeDefs from "./graphql/typeDefs/posts.js";
import usersTypeDefs from "./graphql/typeDefs/users.js";
import postsResolver from "./graphql/resolvers/posts.js";
import usersResolver from "./graphql/resolvers/users.js";
import db from "./config/database.js";

config();

const baseTypes = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const server = new ApolloServer({
  typeDefs: [baseTypes, postTypeDefs, usersTypeDefs],
  resolvers: lodash.merge(postsResolver, usersResolver),
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
    value: "context'ten gelen veriler burada.",
  }),
});

console.log(`🚀  Server ready at: ${url}`);
