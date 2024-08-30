import {
  articleCreateReview,
  articleDeleteReview,
  articleUpdateReview,
  articleAllReviews,
} from "../../controllers/articleControllers/articleReviewController.js";
import isLoggedIn from "../../middlewares/isLoggedIn.js";
import express from "express";
import { isAdmin } from "../../middlewares/index.js";
const reviewRoutes = express.Router();

reviewRoutes.post("/:articleId", isLoggedIn, articleCreateReview);
reviewRoutes.get("/all", isLoggedIn, isAdmin, articleAllReviews);
reviewRoutes.delete("/delete/:reviewId", isLoggedIn, articleDeleteReview);
reviewRoutes.put("/update/:reviewId", isLoggedIn, articleUpdateReview);

export default reviewRoutes;
