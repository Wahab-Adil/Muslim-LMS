import Course from "../../models/videoModels/Course.js";
import Category from "../../models/videoModels/Category.js";
import Section from "../../models/videoModels/Section.js";
import User from "../../models/User.js";
import Reivew from "../../models/videoModels/Review.js";
import isNotAdmin from "../../middlewares/isNotAdmin.js";
import asyncHandler from "express-async-handler";
import fs from "fs-extra";
import path from "path";
import { dirname } from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createCourse = asyncHandler(async (req, res) => {
  const thumbnail = req?.file?.path;
  const { title, subtitle, language, description, category } = req.body;

  const user = await User.findById(req.userAuthId);
  // give error if one of the field is empty
  if (
    !title ||
    !subtitle ||
    !language ||
    !description ||
    !category ||
    !thumbnail
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // check if category exist in our databse
  const categoryExist = await Category.findOne({ name: category });

  if (!categoryExist) {
    res.status(404);
    throw new Error("this category don't exist please add category first.");
  }

  // create a new course
  const course = await Course.create({
    title,
    subtitle,
    language,
    description,
    category,
    instructor: req.userAuthId,
    thumbnail,
  });

  // add course in user courses array

  user?.courses?.push(course._id);
  await user.save();

  categoryExist?.courses?.push(course._id);
  await categoryExist.save();

  res.status(201).json({
    success: true,
    course,
    message: "Course created successfully. You can add Sections now.",
  });
});

export const getAllCourses = asyncHandler(async (req, res, next) => {
  let coursesQuery = Course.find({}).sort({ createdAt: -1 });
  if (req.query.title) {
    coursesQuery = coursesQuery.find({
      title: { $regex: req.query.title, $options: "i" },
    });
  }
  if (req.query.category) {
    coursesQuery = coursesQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  const allCourses = await coursesQuery
    .select("-sections")
    .populate("instructor")
    .populate("reviews");

  res.status(200).json({
    success: true,
    allCourses,
  });
});

export const courseDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const course = await Course.findById(id)
    .populate("sections")
    .populate({
      path: "reviews", // Populate the reviews field
      populate: {
        path: "user", // Populate the user field within comments
      },
    })
    .populate({
      path: "instructor",
      populate: {
        path: "courses",
        populate: {
          path: "reviews",
        },
      },
    });

  let uniqueUserIds = new Set(
    course?.reviews
      .filter((review) => review && review._id)
      .map((review) => review?.user?._id?.toString())
  );

  const HasReviewed = uniqueUserIds.has(req?.userAuthId?.toString());

  // count the average rating for instructor courses
  let totalRating = 0;

  course?.instructor?.courses?.forEach((course) => {
    course?.reviews?.forEach((review) => {
      totalRating += review?.rating;
    });
  });

  // total views
  let totalViews = 0;

  course?.instructor?.courses?.forEach((course) => {
    totalViews += course?.views;
  });

  if (!course) {
    res.status(404);
    throw new Error("Course not found.");
  }

  let relatedCourses = await Course.find({
    category: course?.category,
  });

  let newRelatedCourses = relatedCourses?.filter((relateCourse) => {
    return relateCourse?.id !== course?.id;
  });

  // add veiws when a user request for course details page but when admin request for course details page views can't be added to the course
  if (await isNotAdmin(req)) {
    course.views += 1;
    await course.save();
  }

  res.status(200).json({
    course,
    totalViews,
    HasReviewed,
    totalRating,
    newRelatedCourses,
  });
});

// export const deleteCourse = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const course = await Course.findById(id);
//   if (!course) {
//     res.status(404);
//     throw new Error("Course not found.");
//   }

//   // delete all the sections in the course
//   for (let i = 0; i < course?.sections?.length; i++) {
//     await Section.findByIdAndDelete(course?.sections[i]?._id);
//   }
//   // delete all the reviews of this course
//   for (let i = 0; i < course?.reviews?.length; i++) {
//     await Reivew.findByIdAndDelete(course?.reviews[i]?._id);
//   }

//   // find this course in users courses array
//   const user = await User.findById(course?.instructor);

//   //  in this line we finded the user to who this course belongs now we well delete this course
//   const newCourses = user?.courses?.filter(
//     (courseId) => courseId?.toString() !== course?._id.toString()
//   );

//   user.courses = newCourses;
//   await user.save();

//   await course.deleteOne();

//   const thumbnailPath = path.join(__dirname, "..", "..", course?.thumbnail);

//   if (await fs.pathExists(thumbnailPath)) {
//     await fs.unlink(thumbnailPath);
//   }

//   res.status(200).json({
//     success: true,
//     course,
//     message: "Course deleted successfully.",
//   });
// });

// update Course

export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the course by ID
  const course = await Course.findById(id);
  if (!course) {
    res.status(404);
    throw new Error("Course not found.");
  }

  // Delete all sections in the course
  for (const sectionId of course?.sections || []) {
    await Section.findByIdAndDelete(sectionId);
  }

  // Delete all reviews of this course
  for (const reviewId of course?.reviews || []) {
    await Review.findByIdAndDelete(reviewId); // fixed spelling
  }

  // Find the user who is the instructor of this course
  const user = await User.findById(course?.instructor);
  if (!user) {
    res.status(404);
    throw new Error("Instructor not found.");
  }

  // Remove this course from the user's courses array
  user.courses = user.courses.filter(
    (courseId) => courseId?.toString() !== course._id.toString()
  );

  await user.save();

  // Delete the course itself
  await course.deleteOne();

  // Handle the thumbnail deletion
  const thumbnailPath = path.join(__dirname, "..", "..", course?.thumbnail);
  if (await fs.pathExists(thumbnailPath)) {
    await fs.unlink(thumbnailPath);
  }

  res.status(200).json({
    success: true,
    message: "Course deleted successfully.",
  });
});

export const updateCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const thumbnail = req?.file?.path;
  const { title, subtitle, language, description, category } = req.body;

  const course = await Course.findById(courseId);
  // check if category exist in our databse
  let newCategoryExist;
  if (category) {
    newCategoryExist = await Category.findOne({ name: category });

    if (!newCategoryExist) {
      res.status(404);
      throw new Error("category don't exist please add category first.");
    }
  }

  // check if we have the course in our database
  if (!course) {
    res.status(404);
    throw new Error("Course Not Found.");
  }

  // first we should delete this course from the old category
  const oldCategoryExist = await Category.findOne({
    name: course?.category,
  });

  const newCategories = oldCategoryExist?.courses?.filter(
    (courseId) => courseId?.toString() !== course?._id?.toString()
  );

  oldCategoryExist.courses = newCategories;

  await oldCategoryExist.save();

  // then we shound enter this course to the new cateogry course array
  newCategoryExist?.courses?.push(course?._id);
  await newCategoryExist?.save();

  if (title) {
    course.title = title;
  }
  if (subtitle) {
    course.subtitle = subtitle;
  }
  if (language) {
    course.language = language;
  }
  if (description) {
    course.description = description;
  }
  if (category) {
    course.category = category;
  }
  if (thumbnail) {
    course.thumbnail = thumbnail;
  }
  await course.save();

  res.status(200).json({
    success: "Course Updated.",
    course,
  });
});
