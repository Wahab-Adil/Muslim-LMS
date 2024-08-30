import mongoose, { mongo } from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter article title"],
      maxLength: [80, "Title can't exceed 80 characters"],
    },
    language: {
      type: String,
      enum: ["pashto", "dari", "english", "arabic"], //enum means it has only these predefined values
      default: "pashto",
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["pashto", "dari", "english", "arabic"], //enum means it has only these predefined values
      default: "pashto",
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sections: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: [true, "Please enter article description"],
        },
      },
    ],
    category: {
      type: String,
      ref: "ArticleCategory",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ArticleReview",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

articleSchema.virtual("totalReviews").get(function () {
  const article = this;
  return article?.reviews?.length;
});
// return all the average ratings
articleSchema.virtual("averageRating").get(function () {
  let ratingsTotal = 0;
  const article = this;
  article?.reviews?.forEach((review) => {
    ratingsTotal += review?.rating;
  });
  //calc average rating
  const averageRating = Number(ratingsTotal / article?.reviews?.length).toFixed(
    1
  );
  return Math.trunc(averageRating);
});

const Article = mongoose.model("Article", articleSchema);
export default Article;
