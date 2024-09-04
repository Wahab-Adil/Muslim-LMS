import asyncHandler from "express-async-handler";
import Article from "../../models/articleModels/Article.js";
import ArticleCategory from "../../models/articleModels/articleCategory.js";
import ArticleReview from "../../models/articleModels/ArticleReview.js";
import User from "../../models/User.js";
import isNotAdmin from "../../middlewares/isNotAdmin.js";
import fs from "fs-extra";
import path from "path";
import { dirname } from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createArticle = asyncHandler(async (req, res) => {
  const thumbnail = req?.file?.path;
  const { title, description, category, language } = req.body;
  const user = await User.findById(req.userAuthId);
  // give error if one of the field is empty
  if (!title || !language || !description || !category || !thumbnail) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const IsArticleExist = await Article.find({ name: title });
  if (!IsArticleExist?.length === 0) {
    res.status(302);
    throw new Error("Article Already Exist.");
  }
  // check if category exist in our databse
  const categoryExist = await ArticleCategory.findOne({ name: category });

  if (!categoryExist) {
    res.status(400);
    throw new Error("this category don't exist please add category first.");
  }

  // create a new article
  const article = await Article.create({
    title,
    language,
    description,
    category,
    writer: req.userAuthId,
    thumbnail,
  });

  // add article in user articles array

  user?.articles?.push(article._id);
  await user.save();

  categoryExist?.articles?.push(article._id);
  await categoryExist.save();

  res.status(201).json({
    success: true,
    article,
    message: "Article created successfully. You can add Sections now.",
  });
});

// get all articles
export const getAllArticles = asyncHandler(async (req, res, next) => {
  let articleQuery = Article.find({}).sort({ createdAt: -1 });
  if (req.query.title) {
    articleQuery = articleQuery.find({
      title: { $regex: req.query.title, $options: "i" },
    });
  }
  if (req.query.category) {
    articleQuery = articleQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }
  const allArticles = await articleQuery
    .select("-sections")
    .populate("writer")
    .populate("reviews");

  res.status(200).json({
    success: true,
    message: "Article Fetched",
    allArticles,
  });
});

export const articleDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id)
    ?.populate({ path: "reviews", populate: { path: "user" } })
    ?.populate("writer");

  if (!article) {
    res.status(404);
    throw new Error("article not found.");
  }

  let uniqueUserIds = new Set(
    article?.reviews
      .filter((review) => review && review._id)
      .map((review) => review?.user?._id?.toString())
  );

  const HasReviewed = uniqueUserIds.has(req?.userAuthId?.toString());

  let relatedArticle = await Article.find({
    category: article?.category,
  }).populate("writer");

  let newRelatedArticle = relatedArticle?.filter((relatedArticle) => {
    return relatedArticle?.id !== article?.id;
  });

  // add veiws when a user request for article details page but when admin request for article details page views can't be added to the article
  if (await isNotAdmin(req)) {
    article.views += 1;
    await article.save();
  }

  res.status(200).json({
    HasReviewed,
    article,
    newRelatedArticle,
  });
});

export const deleteArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const article = await Article.findById(id);
  if (!article) {
    res.status(404);
    throw new Error("article not found.");
  }
  // delete all the reviews of this article
  for (let i = 0; i < article?.reviews?.length; i++) {
    await ArticleReview.findByIdAndDelete(article?.reviews[i]?._id);
  }

  // find this article in users articles array
  const user = await User.findById(article?.writer);

  //  in this line we finded the user to who this article belongs now we well delete this article
  const newArticles = user?.articles?.filter(
    (articleId) => articleId?.toString() !== article?._id.toString()
  );

  user.articles = newArticles;
  await user.save();
  await article.deleteOne();
  const thumbnailPath = path.join(__dirname, "..", "..", article?.thumbnail);

  if (await fs.pathExists(thumbnailPath)) {
    await fs.unlink(thumbnailPath);
  }

  res.status(200).json({
    success: true,
    article,
    message: "article deleted successfully.",
  });
});

// update article
export const updateArticle = asyncHandler(async (req, res) => {
  const articleId = req.params.articleId;
  const thumbnail = req?.file?.path;
  const { title, description, category, language } = req.body;

  const article = await Article.findById(articleId);
  // check if category exist in our databse
  const newCategoryExist = await ArticleCategory.findOne({ name: category });

  if (!newCategoryExist) {
    res.status(400);
    throw new Error("please add category first/Or Select Category.");
  }
  // check if we have the article in our database
  if (!article) {
    res.status(400);
    throw new Error("Article Not Found.");
  }

  // first we should delete this article from the old category
  const oldCategoryExist = await ArticleCategory.findOne({
    name: article?.category,
  });

  const newCategories = oldCategoryExist?.articles?.filter(
    (articleId) => articleId?.toString() !== article?._id?.toString()
  );

  oldCategoryExist.articles = newCategories;

  await oldCategoryExist.save();

  // then we shound enter this artilce to the new cateogry articles array
  newCategoryExist?.articles?.push(article?._id);
  await newCategoryExist?.save();

  if (title) {
    article.title = title;
  }
  if (language) {
    article.language = language;
  }
  if (description) {
    article.description = description;
  }
  if (category) {
    article.category = category;
  }
  if (thumbnail) {
    article.thumbnail = thumbnail;
  }
  await article.save();

  return res.json({
    success: "Article Updated.",
    article,
  });
});

// add section to the article
export const addSectionsToArticle = asyncHandler(async (req, res) => {
  const articleId = req.params.articleId;
  const { title, description } = req.body;

  const article = await Article.findById(articleId);
  if (!article) {
    res.status(404);
    throw new Error("Article not found. try again.");
  }

  article?.sections?.push({ title, description });

  await article.save();

  return res.json({
    success: true,
    message: "Section Added to this Article",
    article,
  });
});

// delete section from an article
export const deleteSectionFromArticle = asyncHandler(async (req, res) => {
  const { articleId, sectionId } = req.params;
  const article = await Article.findById(articleId);
  if (!article) {
    res.status(404);
    throw new Error("Article not found. try again.");
  }

  article.sections = article?.sections?.filter(
    (sectionID) => sectionID?._id?.toString() !== sectionId?.toString()
  );

  await article.save();

  return res.json({
    success: true,
    message: "Section Added to this Article",
    article,
  });
});
