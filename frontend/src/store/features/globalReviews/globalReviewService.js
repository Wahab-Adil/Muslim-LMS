import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `${token}` };

const BACKEND_URL = "http://localhost:3000";

const API_URL = `${BACKEND_URL}/globalreview`;

//  Create Advertisement
const SelectGlobalReview = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Delete Advertisement
const deleteGlobalReview = async (id) => {
  const response = await axios.delete(`${API_URL}/` + id);
  return response.data;
};

//  All Advertisement
const AllGlobalReviews = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

const GlobalReviewSerivces = {
  SelectGlobalReview,
  AllGlobalReviews,
  deleteGlobalReview,
};

export default GlobalReviewSerivces;
