import User from "../models/User.js";
import Course from "../models/videoModels/Course.js";
import dotenv from "dotenv";
dotenv.config();
import sgMail from "@sendgrid/mail";
import bCrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import verifyToken from "../utils/verifyToken.js";
import getTokenFromHeader from "../utils/getTokenFromHeader.js";
import Section from "../models/videoModels/Section.js";
import Article from "../models/articleModels/Article.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import fs from "fs-extra";
import path from "path";
import { dirname } from "path";
import nodemailer from "nodemailer";
import crypto from "crypto";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.muslimlms_email,
    pass: process.env.NodeMailer_App_Password,
  },
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { email, message, name } = req.body;

  let mailOptions = {
    from: email,
    to: process.env.muslimlms_email,
    subject: `SMS From (${name}) To Muslim LMS Support`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).json("Something Went Wrong, Message Not Send");
      return;
    }
    res.status(200).json("Message Sent Successfully");
  });
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const register = asyncHandler(async (req, res) => {
  const avatar = req?.file?.path;
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  //   check if user exist
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // hash the passwords
  const salt = await bCrypt.genSalt(10);
  const hashPassword = await bCrypt.hash(password, salt);
  // save the user

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    avatar: avatar ? avatar : "Avatar",
    role: role ? role : "user",
  });
  res.status(201).json({
    user: newUser,
    message: "User Registered Successfull",
  });
});

// login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user is register in our database
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid login details");
  }
  // check if passwords match

  const isMatch = await bCrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Email and password do not match");
  }

  user.password = undefined;
  res.status(200).json({
    user,
    token: generateToken(user._id),
    message: "Successfull login",
  });
});

// logout
export const logout = asyncHandler(async (req, res) => {});

// get admin profile
export const adminProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuthId)
    .populate({ path: "articles" })
    ?.populate({
      path: "courses",
      populate: { path: "reviews" },
    });

  const users = await User.find({});

  const courses = user?.courses;
  const articles = user?.articles;

  // Rating Section
  const courseTotalRating = courses?.reduce((ratingsTotal, course) => {
    if (course?.rating === undefined || isNaN(course?.rating)) {
      return ratingsTotal;
    }
    return ratingsTotal + Math.trunc(course.rating);
  }, 0);
  const articleTotalRating = articles?.reduce((ratingsTotal, article) => {
    if (article?.averageRating === undefined || isNaN(article?.averageRating)) {
      return ratingsTotal;
    }
    return ratingsTotal + Math.trunc(article?.averageRating);
  }, 0);

  // Review Section
  const coursesTotalReviews = courses?.reduce((totalReviews, course) => {
    if (
      course?.reviews?.length === undefined ||
      isNaN(course?.reviews?.length)
    ) {
      return totalReviews;
    }
    return totalReviews + Math.trunc(course?.reviews?.length);
  }, 0);
  const articleTotalReviews = articles?.reduce((totalReviews, article) => {
    if (
      article?.reviews?.length === undefined ||
      isNaN(article?.reviews?.length)
    ) {
      return totalReviews;
    }
    return totalReviews + Math.trunc(article?.reviews?.length);
  }, 0);

  // user course statics
  user.coursesTotalRatings = courseTotalRating;
  user.coursesTotalComments = coursesTotalReviews;
  // user article statics
  user.articlesTotalRatings = articleTotalRating;
  user.articlesTotalComments = articleTotalReviews;

  // total users
  user.totalUsers = users?.length;
  // save it
  const newUser = await user.save();

  let totalViews = 0;
  user?.courses?.forEach((course) => {
    totalViews += course?.views;
  });

  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }
  res.json({ user: newUser, totalViews });
});

// get admin profile
export const adminPublicDetails = asyncHandler(async (req, res) => {
  const users = await User.find({});
  const admin = users.find((user) => user.role === "admin");
  if (!admin) {
    return;
  }
  const {
    name,
    email,
    avatar,
    landingPagePhoto,
    landingPageHeading,
    landingPageSubtitle,
    address,
    about,
    articles,
    totalUsers,
    courses,
  } = admin;

  const adminPublicDetails = {
    name,
    email,
    avatar,
    landingPagePhoto,
    landingPageHeading,
    landingPageSubtitle,
    address,
    about,
    totalUsers,
    articles: articles?.length,
    courses: courses?.length,
  };

  res.json({ user: adminPublicDetails });
});

// get user profile
export const getMyProfile = asyncHandler(async (req, res) => {
  const token = getTokenFromHeader(req);
  const userId = verifyToken(token);

  let user = await User.findById(userId.id)
    .select({
      password: 0,
      courses: 0,
    })
    ?.populate({ path: "playlist", populate: { path: "instructor" } })
    ?.populate({ path: "articlesPlaylist", populate: { path: "writer" } });
  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }
  const { _id, name, avatar, email, articlesPlaylist, playlist, role } = user;
  user = {
    _id,
    name,
    avatar,
    email,
    role,
    articlesPlaylist,
    playlist,
  };

  res.status(200).json({ user, message: "user profile" });
});

export const instructorProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id)
    .select({
      password: 0,
    })
    ?.populate("courses")
    ?.populate({ path: "playlist", populate: { path: "writer" } })
    ?.populate({ path: "articlesPlaylist", populate: { path: "writer" } });

  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }
  res.status(200).json({ user, message: "Instructor profile" });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const user = await User.findById(req.userAuthId).select("+password");

  if (!user) {
    res.status(400);
    throw new Error("please login first");
  }

  const oldPasswordMatch = await bCrypt.compare(oldPassword, user?.password);

  if (!oldPasswordMatch) {
    res.status(400);
    throw new Error("Incorrect old password");
  }

  const salt = await bCrypt.genSalt(10);
  const hashPassword = await bCrypt.hash(newPassword, salt);
  user.password = hashPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const {
    name,
    address,
    email,
    about,
    landingPageHeading,
    landingPageSubtitle,
  } = req.body;

  const avatar = req?.files["avatar"]?.[0]?.path;
  const landingPagePhoto = req?.files["landingPagePhoto"]?.[0]?.path;

  const user = await User.findById(req.userAuthId);

  if (name) user.name = name;
  if (address) user.address = address;
  if (email) user.email = email;
  if (avatar) user.avatar = avatar;
  if (about) user.about = about;
  if (landingPagePhoto) user.landingPagePhoto = landingPagePhoto;
  if (landingPageHeading) user.landingPageHeading = landingPageHeading;
  if (landingPageSubtitle) user.landingPageSubtitle = landingPageSubtitle;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export const updateProfilePicture = asyncHandler(async (req, res) => {
  const avatar = req?.file?.path;
  if (!avatar) {
    res.status(400);
    throw new Error("Please select an image");
  }
  // find the user that want to update profile pricture
  const user = await User.findById(req.userAuthId);

  user.avatar = avatar;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile picture updated successfully",
    user,
  });
});

let otpStore = {
  email: "wahab.cs238@gmail.com",
  otp: { otpCode: 2343, expires: 1726540074604 },
};
export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  console.log("email", email);
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Email is invalid");
  }
  const otp = crypto.randomInt(1000, 9999).toString();

  // Store OTP and expiry (e.g., 10 minutes)
  otpStore = {
    email,
    otp: { otpCode: otp, expires: Date.now() + 10 * 60 * 1000 },
  };

  // Email content
  const mailOptions = {
    from: process.env.muslimlms_email,
    to: user?.email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`,
  };
  console.log("otpStore", otpStore);

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    // if (error) {
    //   return res
    //     .status(500)
    //     .json({ otpStore, message: "Something went wrong,OTP not Send" });
    // }
    res.status(200).json({ otpStore, message: "OTP sent successfully" });
  });
});

export const checkOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  console.log(email, otp);
  // Check if email and OTP are provided
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  // Retrieve the stored OTP for the email
  const storedOtp = otpStore.otp;
  console.log(Date.now());

  // Check if OTP for the email exists
  if (!storedOtp.otpCode) {
    return res.status(400).json({ message: "OTP not found for this email" });
  }

  if (Date.now() > storedOtp.expires) {
    return res.status(400).json({ message: "OTP has expired" });
  }

  // Check if OTP matches
  if (storedOtp.otpCode !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // If everything is correct, respond with success
  res.status(200).json({ message: "OTP verified successfully" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    res.status(400);
    throw new Error("Email is invalid or Otp has been expired");
  }

  if (!otp) {
    if (expiry > Date.now()) {
      throw new Error("Otp has been expired/Or Invalid");
    }
  }
  if (otpStore?.otp?.otpCode === otp) {
    const salt = await bCrypt.genSalt(12);
    const hashPassword = await bCrypt.hash(req.body.newPassword, salt);
    foundUser.password = hashPassword;
    await foundUser.save();
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
    return;
  }
  res.status(400).json({
    success: true,
    message: "Something Went Wrong, Please Try Again",
  });
});

export const addToPlaylist = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const user = await User.findById(req.userAuthId);
  const course = await Course.findById(courseId);

  if (!user) {
    res.status(404);
    throw new Error("invalid login details. please login first");
  }
  if (!course) {
    res.status(404);
    throw new Error("Invalid course");
  }

  const itemAlreadyExists = user?.playlist?.find((item) => {
    if (item.toString() === course._id.toString()) {
      return true;
    }
  });

  if (itemAlreadyExists) {
    res.status(302);
    throw new Error("Course already added to playlist");
  }

  user.playlist.push(course._id);
  await user.save();

  res.status(200).json({
    success: true,
    user,
    message: "Added to playlist",
  });
});

export const removeFromPlaylist = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const user = await User.findById(req.userAuthId);
  const course = await Course.findById(courseId);
  if (!course) {
    res.status(400);
    throw new Error("Invalid course");
  }
  if (!user) {
    res.status(404);
    throw new Error("please login first");
  }

  const newPlaylist = user.playlist.filter(
    (item) => item.toString() !== course._id.toString()
  );

  user.playlist = newPlaylist;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Course removed from playlist",
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    users,
    success: true,
    users,
  });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (user.role === "admin") {
    user.role = "user";
  } else {
    user.role = "admin";
  }

  await user.save();

  res.status(200).json({
    user,
    success: true,
    message: "Role updated",
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // find the user that we want to delete
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  // delete all courses in user profile
  user.deleteOne();

  const thumbnailPath = path.join(__dirname, "..", "..", user?.avatar);

  if (await fs.pathExists(thumbnailPath)) {
    await fs.unlink(thumbnailPath);
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user,
  });
});

export const deleteMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuthId).populate("courses");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  for (let i = 0; i < user?.courses?.length; i++) {
    for (let j = 0; j < user?.courses[i]?.sections?.length; j++) {
      await Section.findByIdAndDelete(user?.courses[i]?.sections[j]?._id);
    }
    await Course.findByIdAndDelete(user?.courses[i]?._id);
  }

  await user.save();
  await user.deleteOne();
  const thumbnailPath = path.join(__dirname, "..", "..", user?.avatar);

  if (await fs.pathExists(thumbnailPath)) {
    await fs.unlink(thumbnailPath);
  }

  res.status(200).json({
    user,
    success: true,
    message: "User deleted successfully",
  });
});

export const getPlaylist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuthId).populate("playlist");
  if (!user) {
    res.status(404);
    throw new Error("Please login first");
  }
  const playlist = user?.playlist;
  res.status(200).json({
    playlist,
    message: "Play list finded",
  });
});

// =================================================
// =======  articls playlist        ================
// =================================================

export const addArticleToPlaylist = asyncHandler(async (req, res) => {
  const articleId = req.params.articleId;
  const user = await User.findById(req.userAuthId);
  const article = await Article.findById(articleId);

  if (!user) {
    res.status(404);
    throw new Error("invalid login details. please login first");
  }
  if (!article) {
    res.status(404);
    throw new Error("Article Not Found");
  }

  const itemAlreadyExists = user?.articlesPlaylist?.find((item) => {
    if (item.toString() === article._id.toString()) {
      return true;
    }
  });

  if (itemAlreadyExists) {
    res.status(302);
    throw new Error("Article already added to playlist");
  }

  user?.articlesPlaylist?.push(article._id);
  await user.save();

  res.status(200).json({
    success: true,
    user,
    message: "Added to playlist",
  });
});

export const removeArticleFromPlaylist = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const user = await User.findById(req.userAuthId);
  const article = await Article.findById(articleId);
  if (!article) {
    res.status(404);
    throw new Error("Article Not Found");
  }
  if (!user) {
    res.status(400);
    throw new Error("please login first");
  }

  const newPlaylist = user?.articlesPlaylist?.filter(
    (item) => item.toString() !== article._id.toString()
  );

  user.articlesPlaylist = newPlaylist;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Article removed from playlist",
    user,
  });
});

export const getArticlePlaylist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuthId).populate("articlesPlaylist");
  if (!user) {
    res.status(400);
    throw new Error("please login first");
  }
  const articlesPlayList = user?.articlesPlaylist;

  res.status(200).json({
    message: "Play list Founded",
    articlesPlayList,
  });
});

// Get Login Status
export const loginStatus = asyncHandler(async (req, res) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  return jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
    if (err) {
      return res.json(false);
    } else {
      return res.json(true);
    }
  });
});
