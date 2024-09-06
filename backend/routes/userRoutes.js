import express from "express";
const router = express.Router();

import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  getPlaylist,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
  addArticleToPlaylist,
  removeArticleFromPlaylist,
  getArticlePlaylist,
  instructorProfile,
  adminProfile,
  sendMessage,
  loginStatus,
  adminPublicDetails,
} from "../controllers/userController.js";
import isAdmin from "../middlewares/isAdmin.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/validator.js";
import { runValidation } from "../validators/index.js";
import upload from "../config/uploadFiles.js";

//to regiter
router.post(
  "/users/register",
  // userRegisterValidator,
  // runValidation,
  upload("User").single("avatar"),
  register
);

//to login
router.post("/users/login", userLoginValidator, runValidation, login);
router.get("/users/login-status", loginStatus);

//get my profile
router.get("/users/profile", isLoggedIn, getMyProfile);
// admin profile
router.get("/users/admin", isLoggedIn, isAdmin, adminProfile);
router.get("/users/admin/public", adminPublicDetails);

// get instrucotr profile
router.get("/users/instructor/:id", instructorProfile);
//

//delete my profile
router.delete("/users/profile", isLoggedIn, deleteMyProfile);

//changePassword
router.put("/users/changepassword", isLoggedIn, changePassword);

//update profile
router.put(
  "/users/updateprofile",
  isLoggedIn,
  upload("admin").fields([
    { name: "avatar", maxCount: 1 },
    { name: "landingPagePhoto", maxCount: 1 },
  ]),
  updateProfile
);

//update profile picture
router.put(
  "/users/updateprofilepicture",
  isLoggedIn,
  upload("User").single("avatar"),
  updateProfilePicture
);

//forget password
router.post("/users/forgetpassword", forgetPassword);

//reset password
router.put("/users/resetpassword/:token", resetPassword);

//add to playlist
router.post("/users/addplaylist/:courseId", isLoggedIn, addToPlaylist);
//remove from playlist
router.delete(
  "/users/removefromplaylist/:courseId",
  isLoggedIn,
  removeFromPlaylist
);

router.get("/users/playlist", isLoggedIn, getPlaylist);

// =================================================
// =======  articls playlist routes ================
// =================================================
router.post(
  "/users/articles/addplaylist/:articleId",
  isLoggedIn,
  addArticleToPlaylist
);
//remove from playlist
router.delete(
  "/users/articles/removefromplaylist/:articleId",
  isLoggedIn,
  removeArticleFromPlaylist
);
//
router.get("/users/articles/playlist", isLoggedIn, getArticlePlaylist);

// =================================================
// ===============  Admin Routes ===================
// =================================================
//get all users
router.get("/admin/users", isLoggedIn, isAdmin, getAllUsers);
//update user role
router.put("/admin/users/:id", isLoggedIn, isAdmin, updateUserRole);
router.delete("/admin/users/:userId", isLoggedIn, isAdmin, deleteUser);

// send message
router.post("/send-message", sendMessage);

export default router;
