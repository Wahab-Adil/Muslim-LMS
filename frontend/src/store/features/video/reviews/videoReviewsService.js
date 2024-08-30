import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `${token}` };

const BACKEND_URL = "http://localhost:3000";

const API_URL = `${BACKEND_URL}/reviews`;

// Video- Create Review
const Video_CreateReview = async (formData) => {
  const response = await axios.post(`${API_URL}/` + formData?.id, formData);
  return response.data;
};

// Video- Delete Review
const Video_DeleteReview = async (reviewId) => {
  const response = await axios.delete(`${API_URL}/delete/` + reviewId);
  return response.data;
};

// Video- GET Review
const Video_GetReview = async (reviewId) => {
  const response = await axios.get(`${API_URL}/` + reviewId);
  return response.data;
};

// Video- GET All Reviews
const Video_AllReviews = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// Video -Update Review
const Video_UpdateReview = async (reviewId, formData) => {
  const response = await axios.put(`${API_URL}/update/${reviewId}`, formData);
  return response.data;
};

const VideoReviewServices = {
  Video_CreateReview,
  Video_AllReviews,
  Video_DeleteReview,
  Video_GetReview,
  Video_UpdateReview,
};

export default VideoReviewServices;
