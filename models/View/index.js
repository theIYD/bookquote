import mongoose from "mongoose";
const Schema = mongoose.Schema;

const viewSchema = new Schema(
  {
    quoteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quote",
    },
    userAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.View ||
  mongoose.model("View", viewSchema, "views");
