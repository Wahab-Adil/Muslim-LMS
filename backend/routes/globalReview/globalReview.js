import express from "express";
import {
  SelectGlobalReview,
  deleteGlobalReview,
  AllGlobalReviews,
} from "../../controllers/globalReviews/globalReview.js";
import isLoggedIn from "../../middlewares/isLoggedIn.js";
import isAdmin from "../../middlewares/isAdmin.js";
const globalReviewRouter = express.Router();
globalReviewRouter.get("/all", isLoggedIn, isAdmin, AllGlobalReviews);
globalReviewRouter.get("/:id", isLoggedIn, isAdmin, SelectGlobalReview);
globalReviewRouter.delete(
  "/:id",
  isLoggedIn,
  isAdmin,
  deleteGlobalReview
);

export default globalReviewRouter;
