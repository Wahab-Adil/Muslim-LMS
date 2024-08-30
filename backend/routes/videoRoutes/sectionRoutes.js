import express from "express";
import {
  addVideoToSection,
  createSection,
  deleteSection,
  deleteVideoFromSection,
  SectionDetails,
  previewVideoFromSection,
} from "../../controllers/videoControllers/sectionController.js";

const sectionRoutes = express.Router();

import { isAdmin, isLoggedIn } from "../../middlewares/index.js";
import upload from "../../config/uploadFiles.js";

// Create a section
sectionRoutes.post("/:courseId", isLoggedIn, isAdmin, createSection);
// get a section
sectionRoutes.get("/:section_pr_Id", isLoggedIn, isAdmin, SectionDetails);
// Delete This Section
sectionRoutes.delete("/:sectionId", isLoggedIn, isAdmin, deleteSection);
// Add video to a section
sectionRoutes.post(
  "/videos/:sectionId",
  isLoggedIn,
  isAdmin,
  upload("course").single("video"),
  addVideoToSection
);
sectionRoutes.get(
  "/videos/:sectionId/:videoId",
  isLoggedIn,
  isAdmin,
  previewVideoFromSection
);

sectionRoutes.delete(
  "/videos/:sectionId/:videoId",
  isLoggedIn,
  isAdmin,
  deleteVideoFromSection
);

export default sectionRoutes;
