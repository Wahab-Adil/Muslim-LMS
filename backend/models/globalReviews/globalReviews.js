import mongoose from "mongoose";
const GlobalReviewtSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
    },
    comment: {
      type: String,
      required: [true, "Please add a comment"],
    },
    rating: {
      type: Number,
      required: [true, "Please add ratings"],
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

//we are creating a all user methods below
const GlobalReview = mongoose.model("GlobalReview", GlobalReviewtSchema);
export default GlobalReview;
