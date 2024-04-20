const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Post {
    id: ID!
    title: String!
    description: String!
    url: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  #Client'in istek atacagi rotalari ve bu rotaların donderecegi veri tiplerini Query icerisine tanimliyoruz.
  extend type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  input PostInput {
    title: String!
    description: String!
    url: String!
  }

  extend type Mutation {
    createPost(body: PostInput!): Post!
  }
`;

export default typeDefs;
