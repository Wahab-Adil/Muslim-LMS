import express from "express";
import {
  articleCreateCategory,
  articleDeleteCategory,
  articleGetAllCategories,
  articleGetSingleCategory,
  articleUpdateCategory,
} from "../../controllers/articleControllers/articleCategoryController.js";
import isLoggedIn from "../../middlewares/isLoggedIn.js";
import isAdmin from "../../middlewares/isAdmin.js";
import upload from "../../config/uploadFiles.js";
const articleCategoryRouter = express.Router();

articleCategoryRouter.post(
  "/add",
  isLoggedIn,
  isAdmin,
  upload("/article/category").single("image"),
  articleCreateCategory
);
articleCategoryRouter.get("/all", isLoggedIn, articleGetAllCategories);
articleCategoryRouter.get(
  "/getsingle/:id",
  isLoggedIn,
  articleGetSingleCategory
);
articleCategoryRouter.put(
  "/update/:id",
  isLoggedIn,
  isAdmin,
  upload("/article/category").single("image"),
  articleUpdateCategory
);
articleCategoryRouter.delete(
  "/delete/:id",
  isLoggedIn,
  isAdmin,
  articleDeleteCategory
);

export default articleCategoryRouter;
