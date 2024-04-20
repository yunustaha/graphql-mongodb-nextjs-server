import userSchema from "../../models/users.js";
import graphqlFields from "graphql-fields";

const resolvers = {
  //type Query içerisine tanımladığımız rotalara karşılık gelen fonksiyonları burada oluşturuyoruz.
  //get islemleri icin kullanilir.
  Query: {
    //parent, args, contextValue, info
    getUsers: async (_, __, contextValue, info) => {
      try {
        console.log("contextValue: ", contextValue);
        //Client tarafindan istenen kolonlari bu sekilde degiskene atabilirsin.
        const topLevelFields = Object.keys(graphqlFields(info));
        console.log("topLevelFields: ", topLevelFields);
        const allUsers = await userSchema.find(null, topLevelFields).populate('posts');;
        console.log("allUsers: ", allUsers);
        return allUsers;
      } catch (error) {
        console.log(error);
      }
    },
    //Burada typeDefs'te parametre olarak gonderdigimiz postId'yi bu sekilde kullaniyoruz.
    getUser: async (_, { userId }, __, info) => {
      try {
        const topLevelFields = Object.keys(graphqlFields(info));
        const user = await userSchema.findById(userId, topLevelFields).populate('posts');
        console.log('user: ', user);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
  //type Mutation içerisine tanımladığımız rotalara karşılık gelen fonksiyonları burada oluşturuyoruz.
  //put, post ve delete islemleri icin kullanilir.
  Mutation: {
    //Burada typeDefs'te parametre olarak gonderdigimiz body'i bu sekilde kullaniyoruz.
    createUser: async (_, { body }) => {
      try {
        const user = await userSchema.create(body);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default resolvers;
