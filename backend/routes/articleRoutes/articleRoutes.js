import express from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  articleDetails,
  updateArticle,
  addSectionsToArticle,
  deleteSectionFromArticle,
} from "../../controllers/articleControllers/articleController.js";
import { isLoggedIn, isAdmin } from "../../middlewares/index.js";
import upload from "../../config/uploadFiles.js";

const router = express.Router();

// create new course if your an admin
router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload("article").single("thumbnail"),
  createArticle
);
// get all courses without sections
router.get("/all", isLoggedIn, getAllArticles);
// get course details
router.get("/:id", isLoggedIn, articleDetails);
// delete course
router.delete("/:id", isLoggedIn, isAdmin, deleteArticle);
// update articles title, desc, or thumbanil
router.put(
  "/update/:articleId",
  isLoggedIn,
  isAdmin,
  upload("article").single("thumbnail"),
  updateArticle
);
// add sections to an specific article
router.post("/sections/:articleId", isLoggedIn, isAdmin, addSectionsToArticle);
// delete sections to an specific article
router.delete(
  "/:articleId/sections/:sectionId",
  isLoggedIn,
  isAdmin,
  deleteSectionFromArticle
);

export default router;
