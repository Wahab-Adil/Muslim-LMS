import asyncHandler from "express-async-handler";
import ArticleCategory from "../../models/articleModels/articleCategory.js";
import fs from "fs-extra";
import path from "path";
import { dirname } from "path";

import { fileURLToPath } from "url";
import Article from "../../models/articleModels/Article.js";
import User from "../../models/User.js";

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

// // delete only one category by id
// export const articleDeleteCategory = asyncHandler(async (req, res) => {
//   const category = await ArticleCategory.findById(req.params.id).populate(
//     "articles"
//   );
//   if (!category) {
//     res.status(404);
//     throw new Error("Category desnt exist");
//   }

//   if (category.articles.length > 0) {
//     for (const article of category.articles) {
//       // Delete associated thumbnail image if it exists
//       if (article.thumbnail) {
//         const thumbnailPath = path.join(
//           __dirname,
//           "..",
//           "..",
//           article.thumbnail
//         );
//         if (await fs.pathExists(thumbnailPath)) {
//           await fs.unlink(thumbnailPath);
//         }
//       }
//       await Article.findByIdAndDelete(article._id);
//     }
//   }

//   await ArticleCategory.findByIdAndDelete(req.params.id);

//   const thumbnailPath = path.join(__dirname, "..", "..", category?.image);

//   if (await fs.pathExists(thumbnailPath)) {
//     await fs.unlink(thumbnailPath);
//   }

//   res
//     .status(200)
//     .send("Category and associated articles,deleted successfully.");
// });

export const articleDeleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  // Find the category and populate articles
  const category = await ArticleCategory.findById(categoryId).populate(
    "articles"
  );
  if (!category) {
    res.status(404);
    throw new Error("Category doesn't exist.");
  }

  if (category.articles.length > 0) {
    for (const article of category.articles) {
      // Delete associated thumbnail image if it exists
      if (article.thumbnail) {
        const thumbnailPath = path.join(
          __dirname,
          "..",
          "..",
          article.thumbnail
        );
        if (await fs.pathExists(thumbnailPath)) {
          await fs.unlink(thumbnailPath);
        }
      }

      // Find the writer of the article
      const writer = await User.findById(article.writer);
      if (writer) {
        // Remove article ID from writer's articles array
        writer.articles = writer.articles.filter(
          (articleId) => articleId.toString() !== article._id.toString()
        );
        await writer.save();
      }

      // Delete the article
      await Article.findByIdAndDelete(article._id);
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
  await ArticleCategory.findByIdAndDelete(categoryId);

  res
    .status(200)
    .send("Category and associated articles deleted successfully.");
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
