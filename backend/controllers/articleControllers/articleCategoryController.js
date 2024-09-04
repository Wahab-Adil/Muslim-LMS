import asyncHandler from "express-async-handler";
import ArticleCategory from "../../models/articleModels/articleCategory.js";
import fs from "fs-extra";
import path from "path";
import { dirname } from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// create a category
export const articleCreateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const image = req?.file?.path;
  // check if category exist or not
  const categoryExist = await ArticleCategory.findOne({ name });
  if (categoryExist) {
    res.status(400);
    throw new Error("Category already exist");
  }
  const category = await ArticleCategory.create({
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
export const articleGetAllCategories = asyncHandler(async (req, res) => {
  // check if category exist or not
  const allCategoreis = await ArticleCategory.find()
    .populate("user")
    .sort({ createdAt: -1 });
  if (!allCategoreis) {
    res.status(400);
    throw new Error("no category exist.");
  }
  res.status(201).json({
    message: "all categories fetched successfully.",
    allCategoreis,
  });
});

// get single category by id
export const articleGetSingleCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await ArticleCategory.findById(id).populate({
    path: "articles",
    populate: { path: "writer" },
  });

  // check if category not found
  if (!category) {
    res.status(404);
    throw new Error("Category don't exist. please add first.");
  }

  // if category founded then return it

  res.status(200).json({
    message: "Category found.",
    category,
  });
});

// delete only one category by id
export const articleDeleteCategory = asyncHandler(async (req, res) => {
  const category = await ArticleCategory.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category desnt exist");
  }
  await ArticleCategory.findByIdAndDelete(req.params.id);

  const thumbnailPath = path.join(__dirname, "..", "..", category?.image);

  if (await fs.pathExists(thumbnailPath)) {
    await fs.unlink(thumbnailPath);
  }

  res.status(200).send("category deleted successfull");
});
// update only one category by id
export const articleUpdateCategory = asyncHandler(async (req, res) => {
  const category = await ArticleCategory.findOne({ name: req.body.name });
  //
  if (category) {
    res.status(302);
    throw new Error("Category already exist.");
  }

  const updateCategory = await ArticleCategory.findByIdAndUpdate(
    req.params.id,
    { name: req?.body?.name?.toLowerCase(), image: req?.file?.path },
    { new: true }
  );

  if (!updateCategory) {
    res.status(404);
    throw new Error("Category not found.");
  }

  res.status(201).json({
    message: "category updated successfully.",
    updateCategory,
  });
});
