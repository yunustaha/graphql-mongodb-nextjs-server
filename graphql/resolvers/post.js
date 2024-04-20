import postSchema from "../../models/post.js";
import graphqlFields from "graphql-fields";

const resolvers = {
  //type Query içerisine tanımladığımız rotalara karşılık gelen fonksiyonları burada oluşturuyoruz.
  //get islemleri icin kullanilir.
  Query: {
    //parent, args, contextValue, info
    getPosts: async (_, __, contextValue, info) => {
      try {
        console.log("contextValue: ", contextValue);
        //Client tarafindan istenen kolonlari bu sekilde degiskene atabilirsin.
        const topLevelFields = Object.keys(graphqlFields(info));
        console.log("topLevelFields: ", topLevelFields);
        const allPosts = await postSchema.find(null, topLevelFields);
        console.log('allPosts: ', allPosts);
        return allPosts;
      } catch (error) {
        console.log(error);
      }
    },
    //Burada typeDefs'te parametre olarak gonderdigimiz postId'yi bu sekilde kullaniyoruz.
    getPost: async (_, { postId }) => {
      try {
        const post = await postSchema.findById(postId);
        return post;
      } catch (error) {
        console.log(error);
      }
    },
  },
  //type Mutation içerisine tanımladığımız rotalara karşılık gelen fonksiyonları burada oluşturuyoruz.
  //put, post ve delete islemleri icin kullanilir.
  Mutation: {
    //Burada typeDefs'te parametre olarak gonderdigimiz body'i bu sekilde kullaniyoruz.
    createPost: async (_, { body }) => {
      try {
        const post = await postSchema.create(body);
        return post;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default resolvers;
