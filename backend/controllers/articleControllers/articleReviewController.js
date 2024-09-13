import ArticleReview from "../../models/articleModels/ArticleReview.js";
import Article from "../../models/articleModels/Article.js";
import isAdmin from "../../middlewares/isNotAdmin.js";
import expressAsyncHandler from "express-async-handler";

export const articleCreateReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  // find the course and if course finded populate all the reviews
  const articleExist = await Article.findById(req.params.articleId).populate(
    "reviews"
  );
  if (!articleExist) {
    res.status(404);
    throw new Error("Article not found.");
  }

  // one person can add only one review
  const hasReviewed = articleExist?.reviews?.find((review) => {
    return review?.user.toString() === req?.userAuthId.toString();
  });

  if (hasReviewed) {
    res.status(302);
    throw new Error("You Have already reviewed");
  }

  const createdReview = await ArticleReview.create({
    comment,
    rating,
    article: articleExist._id,
    user: req.userAuthId,
  });
  // resave id of the review in this product
  articleExist.reviews.push(createdReview._id);
  await articleExist.save();

  const newArticleExist = await Article.findById(req.params.articleId).populate(
    "reviews"
  );

  res.status(201).json({
    success: true,
    createdReview,
    newArticleExist,
    message: "review created successfull.",
  });
});

// Delete the review
export const articleDeleteReview = expressAsyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const review = await ArticleReview.findById(reviewId);
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
  const DeleteReview = await ArticleReview.findByIdAndDelete(reviewId);

  return res.status(200).json({
    success: true,
    DeleteReview,
    message: "Review Deleted Successfully.",
  });
});

// update the reviews
export const articleUpdateReview = expressAsyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const { comment, rating } = req.body;
  const review = await ArticleReview.findById(reviewId);
  // check if this is the user who created this review
  if (!review) {
    res.status(404);
    throw new Error("Review not found.");
  }
  if (review?.user?.toString() !== req?.userAuthId?.toString()) {
    res.status(404);
    throw new Error("You can't edit this review");
  }
  // if this user was a true user then delete the review
  const updateReview = await ArticleReview.findByIdAndUpdate(
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
    message: "Review Updated Successfully.",
  });
});

// all  reviews
export const articleAllReviews = expressAsyncHandler(async (req, res) => {
  const reviews = await ArticleReview.find()
    .populate("user")
    .sort({ createdAt: -1 });

  if (!reviews) {
    res.status(404);
    throw new Error("Review not found.");
  }

  return res.status(200).json({
    reviews,
    message: "Reviews Feachted Successfully.",
  });
});
