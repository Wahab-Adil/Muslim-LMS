import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `${token}` };

const BACKEND_URL = "http://localhost:3000";

const API_URL = `${BACKEND_URL}/articles/reviews/`;

// Article- Create Review
const ArticleCreateReview = async (data) => {
  const response = await axios.post(`${API_URL}/` + data?.id, data);
  return response.data;
};

// Article- Delete Review
const ArticleDeleteReview = async (reviewId) => {
  const response = await axios.delete(`${API_URL}delete/` + reviewId);
  return response.data;
};

// Article -Update Review
const ArticleUpdateReview = async (reviewId, formData) => {
  const response = await axios.put(`${API_URL}/update/${reviewId}`, formData);
  return response.data;
};
// Article -Update Review
const ArticleAllReviews = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

const ArticleReviewService = {
  ArticleCreateReview,
  ArticleAllReviews,
  ArticleDeleteReview,
  ArticleUpdateReview,
};

export default ArticleReviewService;
