import {
  createReview,
  deleteReview,
  getReview,
  updateReview,
  getAllCourseReviews,
} from "../../controllers/videoControllers/reviewController.js";
import isLoggedIn from "../../middlewares/isLoggedIn.js";
import express from "express";
const reviewRoutes = express.Router();

reviewRoutes.post("/:courseId", isLoggedIn, createReview);
reviewRoutes.get("/all", getAllCourseReviews);
reviewRoutes.delete("/delete/:reviewId", isLoggedIn, deleteReview);
reviewRoutes.put("/update/:reviewId", isLoggedIn, updateReview);
reviewRoutes.get("/:reviewId", getReview);

export default reviewRoutes;
