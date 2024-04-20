import mongoose from "mongoose";

//yunustaha2
//76qrbBgAiznIzXlv
const db = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("mongoDB connect...");

    })
    .catch((err) => {
      console.log(err);
    });
};

export default db;
