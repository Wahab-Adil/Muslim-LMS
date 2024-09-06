import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `${token}` };
const BACKEND_URL = "http://localhost:3000";

const API_URL = `${BACKEND_URL}/admin`;

// get Admin Profile
const getAdminProfile = async () => {
  const response = await axios.get(`${BACKEND_URL}/users/admin`);
  return response.data;
};

// get Admin Profile
const getAdminPublicProfile = async () => {
  const response = await axios.get(`${BACKEND_URL}/users/admin/public`);
  return response.data;
};

// get All Users
const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

// getting Update User Role
const updateUserRole = async (userId, formData) => {
  const response = await axios.put(`${API_URL}/users/` + userId, formData);
  return response.data;
};

// Article -Update Review
const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/users/` + userId);
  return response.data;
};

const AdminServices = {
  getAdminProfile,
  getAdminPublicProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
};

export default AdminServices;
