import mongoose from "mongoose";
import enums from "./enum.js";
const Schema = mongoose.Schema;

const quoteSchema = new Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    hashtag: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      default: enums.GUEST,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Quote ||
  mongoose.model("Quote", quoteSchema, "quotes");
