import asyncHandler from "express-async-handler";
import Review from "../../models/videoModels/Review.js";
import ArticleReview from "../../models/articleModels/ArticleReview.js";
import GlobalReview from "../../models/globalReviews/globalReviews.js";

// Select Course Review
export const SelectGlobalReview = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const isExistReview = await Review.findById(id);
  const isExistArticleReview = await ArticleReview.findById(id);

  if (!isExistReview && !isExistArticleReview) {
    res.status(404);
    throw new Error("Review Not Found.");
  }
  const globalReview = await GlobalReview.findById(id);
  if (globalReview) {
    res.status(404);
    throw new Error("Review Already Selected.");
  }
  if (isExistReview) {
    await GlobalReview.create({
      _id: isExistReview?._id,
      comment: isExistReview?.comment,
      rating: isExistReview?.rating,
      user: isExistReview?.user,
    });
  }
  if (isExistArticleReview) {
    await GlobalReview.create({
      _id: isExistArticleReview?._id,
      comment: isExistArticleReview?.comment,
      rating: isExistArticleReview?.rating,
    });
  }

  res.status(200).json({
    message: "Review Selected.",
  });
});

// delete global Review
export const deleteGlobalReview = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const isExistReview = await GlobalReview.findByIdAndDelete(id);

  if (!isExistReview && !isExistArticleReview) {
    res.status(404);
    throw new Error("Review Not Found.");
  }

  res.status(200).json({
    message: "Review Deleted.",
  });
});

// get All global Review
export const AllGlobalReviews = asyncHandler(async (req, res) => {
  const AllReviews = await GlobalReview.find({})
    .populate("user")
    .sort({ createdAt: -1 });

  if (!AllReviews) {
    res.status(404);
    throw new Error("Review Not Found.");
  }

  res.status(200).json({
    AllReviews,
    message: "Reviews Fetched.",
  });
});
