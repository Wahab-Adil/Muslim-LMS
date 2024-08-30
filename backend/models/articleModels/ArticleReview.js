import mongoose from "mongoose";
const articleReviewSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Review must belong to a user"],
      ref: "User",
    },
    article: {
      type: String,
      required: [true, "Review must belong to a course"],
      ref: "Article",
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

const ArticleReview = mongoose.model("ArticleReview", articleReviewSchema);
export default ArticleReview;
