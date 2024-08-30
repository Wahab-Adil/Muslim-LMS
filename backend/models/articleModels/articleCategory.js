import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const articleCategorySchem = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  { timestamps: true }
);

const ArticleCategory = mongoose.model("ArticleCategory", articleCategorySchem);

export default ArticleCategory;
