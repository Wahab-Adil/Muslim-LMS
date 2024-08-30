import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../../controllers/videoControllers/categoryController.js";
import isLoggedIn from "../../middlewares/isLoggedIn.js";
import isAdmin from "../../middlewares/isAdmin.js";
import upload from "../../config/uploadFiles.js";
const categoryRouter = express.Router();

categoryRouter.post(
  "/add",
  isLoggedIn,
  isAdmin,
  upload("course/category").single("image"),
  createCategory
);
categoryRouter.get("/all", isLoggedIn, getAllCategories);
categoryRouter.get("/getsingle/:id", isLoggedIn, getSingleCategory);
categoryRouter.put(
  "/update/:id",
  isLoggedIn,
  isAdmin,
  upload("course/category").single("image"),
  updateCategory
);
categoryRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteCategory);

export default categoryRouter;
