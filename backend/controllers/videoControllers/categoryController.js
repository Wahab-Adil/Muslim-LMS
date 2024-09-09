import asyncHandler from "express-async-handler";
import Category from "../../models/videoModels/Category.js";
import Course from "../../models/videoModels/Course.js";
import fs from "fs-extra";
import path from "path";
import { dirname } from "path";

import { fileURLToPath } from "url";
import Section from "../../models/videoModels/Section.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// create a category
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const image = req?.file?.path;
  // check if category exist or not
  const categoryExist = await Category.findOne({ name });
  if (categoryExist) {
    res.status(302);
    throw new Error("Category already exist");
  }
  const category = await Category.create({
    name: name?.toLowerCase(),
    user: req.userAuthId,
    image,
  });

  res.status(201).json({
    message: "category created successfully.",
    category,
  });
});

// get all the categories
export const getAllCategories = asyncHandler(async (req, res) => {
  // check if category exist or not
  const allCategoreis = await Category.find()
    .populate("user")
    .sort({ createdAt: -1 });
  if (!allCategoreis) {
    res.status(404);
    throw new Error("No Category Found.");
  }
  res.status(201).json({
    message: "all categories fetched successfully.",
    allCategoreis,
  });
});

// get single category by id
export const getSingleCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id).populate("courses");

  // check if category not found
  if (!category) {
    res.status(404);
    throw new Error("No Category Found.");
  }

  // if category founded then return it G
  res.status(200).json({
    message: "Category found.",
    category,
  });
});

// export const deleteCategory = asyncHandler(async (req, res) => {
//   const categoryId = req.params.id;
//   console.log("called");

//   // Find the category
//   const category = await Category.findById(categoryId).populate("courses");
//   if (!category) {
//     res.status(404);
//     throw new Error("No Category Found.");
//   }

//   // Delete related courses
//   if (category.courses.length > 0) {
//     await Course.deleteMany({ _id: { $in: category.courses } });
//   }

//   // Delete the category
//   await Category.findByIdAndDelete(categoryId);

//   // Delete category image if it exists
//   const thumbnailPath = path.join(__dirname, "..", "..", category?.image);

//   if (await fs.pathExists(thumbnailPath)) {
//     await fs.unlink(thumbnailPath);
//   }

//   res.status(200).json({
//     message: "Category and associated courses deleted successfully.",
//   });
// });

export const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  // Find the category and populate the courses
  const category = await Category.findById(categoryId).populate({
    path: "courses",
    populate: {
      path: "sections",
      populate: {
        path: "videos",
      },
    },
  });

  if (!category) {
    res.status(404);
    throw new Error("No Category Found.");
  }

  // Delete related courses
  if (category.courses.length > 0) {
    for (const course of category.courses) {
      // Delete associated thumbnail image if it exists
      if (course.thumbnail) {
        const thumbnailPath = path.join(
          __dirname,
          "..",
          "..",
          course.thumbnail
        );
        if (await fs.pathExists(thumbnailPath)) {
          await fs.unlink(thumbnailPath);
        }
      }

      // Delete related sections and their videos
      if (course.sections.length > 0) {
        for (const section of course.sections) {
          // Delete section videos
          if (section.videos.length > 0) {
            const deletePromises = section.videos.map(async (videoList) => {
              const videoPath = path.join(
                __dirname,
                "..",
                "..",
                videoList.video.url
              ); // Adjust path if needed
              if (await fs.pathExists(videoPath)) {
                await fs.unlink(videoPath);
                console.log(`Deleted: ${videoPath}`);
              }
            });

            // Wait for all deletions to complete
            await Promise.all(deletePromises);
          }
        }

        // Delete all related sections
        await Section.deleteMany({
          _id: { $in: course.sections.map((section) => section._id) },
        });
      }

      // Delete the course
      await Course.findByIdAndDelete(course._id);
    }
  }

  // Delete the category image if it exists
  if (category.image) {
    const categoryImagePath = path.join(__dirname, "..", "..", category.image);
    if (await fs.pathExists(categoryImagePath)) {
      await fs.unlink(categoryImagePath);
    }
  }

  // Delete the category itself
  await Category.findByIdAndDelete(categoryId);

  res.json({
    message:
      "Category and associated courses, sections, and media deleted successfully.",
  });
});

// update only one category by id
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req?.body?.name?.toLowerCase(), image: req?.file?.path },
    { new: true }
  );

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  res.status(201).json({
    message: "category updated successfully.",
    category,
  });
});
