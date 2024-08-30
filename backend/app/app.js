import express from "express";
const router = express.Router();
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import sgMail from "@sendgrid/mail";
import dbConnect from "../config/dbConnection.js";
import errorHandler from "../middlewares/errorHandler.js";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// video courses routes import
import {
  userRoutes,
  courseRoutes,
  categoryRoutes,
  reviewRoutes,
  sectionRoutes,
} from "../routes/videoRoutes/index.js";

// article routes import

import {
  articleRoutes,
  articleCategoryRoutes,
  articleReviewRoutes,
} from "../routes/articleRoutes/index.js";

import advertisementRoutes from "../routes/advertisement/advertisementRoutes.js";
import globalReview from "../routes/globalReview/globalReview.js";

// middlewares
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
// video courses routing part

app.use("/", userRoutes);
app.use("/courses", courseRoutes);
app.use("/categories", categoryRoutes);
app.use("/reviews", reviewRoutes);
app.use("/sections", sectionRoutes);
app.use("/article/categories", articleCategoryRoutes);

// articles routing part
app.use("/articles", articleRoutes);
app.use("/articles/categories/", articleCategoryRoutes);
app.use("/articles/reviews", articleReviewRoutes);

// advertisement routing part
app.use("/advertisement", advertisementRoutes);

// global  review routing part
app.use("/globalreview", globalReview);

// error Handler
app.use(errorHandler);

// Database Connect...
dbConnect();

export default app;
