import Review from "../../models/videoModels/Review.js";
import Course from "../../models/videoModels/Course.js";
import isAdmin from "../../middlewares/isNotAdmin.js";
import asyncHandler from "express-async-handler";

export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, id } = req.body;

  // find the course and if course finded populate all the reviews
  const courseExist = await Course.findById(req.params.courseId).populate(
    "reviews"
  );
  if (!courseExist) {
    res.status(404);
    throw new Error("Course not found.");
  }

  // one person can add only one review
  const hasReviewed = courseExist?.reviews?.find((review) => {
    return review?.user?.toString() === req?.userAuthId.toString();
  });

  if (hasReviewed) {
    res.status(302);
    throw new Error("You already reviewed Course.");
  }

  const createdReview = await Review.create({
    comment,
    rating,
    course: courseExist?._id,
    user: req?.userAuthId,
  });
  // resave id of the review in this product
  courseExist.reviews.push(createdReview._id);
  await courseExist.save();

  const newCourseExist = await Course.findById(req?.params?.courseId).populate({
    path: "reviews",
    populate: { path: "user" },
  });

  res.status(201).json({
    createdReview,
    newCourseExist,
    message: "review created successfull.",
  });
});

// Delete the review
export const deleteReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const review = await Review.findById(reviewId);
  // check if this is the user who created this review
  if (!review) {
    res.status(404);
    throw new Error("Review not found.");
  }
  const checkIsAdmin = await isAdmin(review?.user);
  if (checkIsAdmin === false) {
    if (review?.user?.toString() !== req?.userAuthId?.toString()) {
      res.status(400);
      throw new Error("You can't delete this review");
    }
  }

  // if this user was a true user then delete the review
  const DeleteReview = await Review.findByIdAndDelete(reviewId);

  return res.status(200).json({
    success: true,
    DeleteReview,
    message: "Review Deleted Successfully.",
  });
});

// update the reviews
export const updateReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const { comment, rating } = req.body;
  const review = await Review.findById(reviewId);
  // check if this is the user who created this review
  if (!review) {
    res.status(404);
    throw new Error("Review not found.");
  }
  if (review?.user?.toString() !== req?.userAuthId?.toString()) {
    res.status(400);
    throw new Error("You can't edit this review");
  }
  // if this user was a true user then delete the review
  const updateReview = await Review.findByIdAndUpdate(
    reviewId,
    {
      comment,
      rating,
    },
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: true,
    updateReview,
    message: "Review Deleted Successfully.",
  });
});

// get the reviews
export const getReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const review = await Review.findById(reviewId).populate("user");
  // check if this is the user who created this review
  if (!review) {
    res.status(404);
    throw new Error("Review not found.");
  }

  return res.status(200).json({
    success: true,
    review,
    message: "Review Deleted Successfully.",
  });
});

export const getAllCourseReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate("user").sort({ createdAt: -1 });

  if (!reviews) {
    res.status(404);
    throw new Error("Reviews not found.");
  }

  return res.status(200).json({
    reviews,
    message: "Reviews Fetched Successfully.",
  });
});
