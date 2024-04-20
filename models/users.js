import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
});

export default mongoose.model("users", userSchema);
