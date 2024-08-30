import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `${token}` };

const BACKEND_URL = "http://localhost:3000";

const API_URL = `${BACKEND_URL}/users`;

// register User
const registerUser = async (formData) => {
  const response = await axios.post(`${API_URL}/register`, formData);
  return response.data;
};

// LOGIN USER
const loginUser = async (formData) => {
  const response = await axios.post(`${API_URL}/login`, formData);
  console.log("dat", formData);
  return response.data;
};

// LOGIN Status
const LoginStatus = async () => {
  const response = await axios.get(`${API_URL}/login-status`);
  return response.data;
};

// getting User Profile
const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

// getting Instructor Details
const InstructorDetails = async (InstructorId) => {
  const response = await axios.get(`${API_URL}/instructor/` + InstructorId);
  return response.data;
};

// deleting  User Profile
const deleteUserProfile = async () => {
  const response = await axios.delete(`${API_URL}/profile`);
  return response.data;
};

// Changing User Password
const changePassword = async () => {
  const response = await axios.put(`${API_URL}/profile`);
  return response.data;
};

// Update User Profile
const updateUserProfile = async (formData) => {
  console.log("formData", formData);
  const response = await axios.put(`${API_URL}/updateprofile`, formData);
  return response.data;
};

// Update User Profile
const updateUserProfilePicture = async () => {
  const response = await axios.put(`${API_URL}/updateprofilepicture`);
  return response.data;
};

// forgot password
const forgotPassword = async () => {
  const response = await axios.post(`${API_URL}/forgetpassword`);
  return response.data;
};

// reset password
const resetPassword = async (token) => {
  const response = await axios.put(`${API_URL}/resetpassword/` + token);
  return response.data;
};

// Add to Playlist
const addToPlaylist = async (id) => {
  const response = await axios.post(`${API_URL}/addplaylist/` + id);
  return response.data;
};

// remove from Playlist
const RemoveFromPlaylist = async (courseId, formData) => {
  const response = await axios.delete(
    `${API_URL}/removefromplaylist/` + courseId,
    formData
  );
  return response.data;
};

// getting  Playlist
const getPlaylist = async () => {
  const response = await axios.get(`${API_URL}/playlist/`);
  return response.data;
};

// Adding Article To  Playlist
const addArticleToPlayllist = async (articleId) => {
  const response = await axios.post(
    `${API_URL}/articles/addplaylist/` + articleId
  );
  return response.data;
};

// Removing Article From  Playlist
const RemoveArticleFromPlayllist = async (articleId) => {
  const response = await axios.delete(
    `${API_URL}/articles/removefromplaylist/` + articleId
  );
  return response.data;
};

// getting Article Playlist
const getArticlePlayllist = async () => {
  const response = await axios.get(`${API_URL}/articles/playlist`);
  return response.data;
};

const userServices = {
  registerUser,
  loginUser,
  LoginStatus,
  getUserProfile,
  InstructorDetails,
  deleteUserProfile,
  changePassword,
  updateUserProfile,
  updateUserProfilePicture,
  forgotPassword,
  resetPassword,
  addToPlaylist,
  RemoveFromPlaylist,
  getPlaylist,
  addArticleToPlayllist,
  RemoveArticleFromPlayllist,
  getArticlePlayllist,
};

export default userServices;
