import asyncHandler from "express-async-handler";
import Category from "../../models/videoModels/Category.js";

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

// delete only one category by id
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("No Category Found.");
  }
  res.json({
    category,
    message: "category deleted successfull.",
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
