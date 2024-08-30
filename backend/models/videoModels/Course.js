import mongoose, { mongo } from "mongoose";
import Review from "./Review.js";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter course title"],
      maxLength: [80, "Title can't exceed 80 characters"],
    },
    subtitle: {
      type: String,
      required: [true, "Please enter subtitle title"],
      maxLength: [80, "Title can't exceed 80 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter course title"],
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
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    courseRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

courseSchema.virtual("totalReviews").get(function () {
  const course = this;
  return course?.reviews?.length;
});

// return all the average ratings
courseSchema.virtual("rating").get(function () {
  let ratingsTotal = 0;
  const course = this;
  course?.reviews?.forEach((review) => {
    ratingsTotal += review?.rating;
  });
  //calc average rating
  const averageRating = Number(ratingsTotal / course?.reviews?.length).toFixed(
    1
  );
  return averageRating;
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
