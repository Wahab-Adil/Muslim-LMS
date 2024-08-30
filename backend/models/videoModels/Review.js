import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Review must belong to a user"],
      ref: "User",
    },
    course: {
      type: String,
      required: [true, "Review must belong to a course"],
      ref: "Course",
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

const Review = mongoose.model("Review", reviewSchema);
export default Review;
