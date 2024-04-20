const postsTypeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    id: ID!
    name: String!
    password: String!
    date: String
    posts: [Post]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  #Client'in istek atacagi rotalari ve bu rotaların donderecegi veri tiplerini Query icerisine tanimliyoruz.
  extend type Query {
    getUsers: [User]
    getUser(userId: ID!): User
  }

  input UserInput {
    name: String!
    password: String!
    date: String
    posts: [ID!]
  }

  extend type Mutation {
    createUser(body: UserInput!): User!
  }
`;

export default postsTypeDefs;
