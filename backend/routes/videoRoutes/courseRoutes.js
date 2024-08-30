import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  courseDetails,
  updateCourse,
} from "../../controllers/videoControllers/courseController.js";
import { isLoggedIn, isAdmin } from "../../middlewares/index.js";
import upload from "../../config/uploadFiles.js";

const router = express.Router();

// create new course if your an admin
router.post("/", isLoggedIn, isAdmin, upload('course').single("thumbnail"), createCourse);
router.put(
  "/update/:courseId",
  isLoggedIn,
  isAdmin,
  upload("course").single("thumbnail"),
  updateCourse
);
// get all courses without sections
router.get("/", getAllCourses);
// get course details
router.get("/:id", isLoggedIn, courseDetails);
// delete course
router.delete("/:id", isLoggedIn, isAdmin, deleteCourse);

export default router;
