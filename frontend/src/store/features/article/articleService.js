import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `${token}` };

const BACKEND_URL = "http://localhost:3000";

const API_URL = `${BACKEND_URL}/articles`;

// Create Article
const createArticle = async (formData) => {
  const response = await axios.post(`${API_URL}/`, formData);
  return response.data;
};

// Delete a Article
const deleteArticle = async (id) => {
  const response = await axios.delete(`${API_URL}/` + id);
  return response.data;
};

// Get all Articles
const getAllArticles = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data.allArticles;
};

// Article-Details
const ArticleDetails = async (id) => {
  const response = await axios.get(`${API_URL}/` + id);
  return response.data;
};

// Update Articles
const updateArticle = async (formData) => {
  const response = await axios.put(
    `${API_URL}/update/${formData?.id}`,
    formData.formData
  );
  return response.data;
};

// Add Section  To Articals
const AddSectionToArticls = async (id, formData) => {
  const response = await axios.post(`${API_URL}/sections/${id}`, formData);
  return response.data;
};

// Delete Section From Articals
const DeleteSectionFromArticles = async (ArticleId, sectionId, formData) => {
  const response = await axios.delete(
    `${API_URL}/${ArticleId}/sections/${sectionId}`,
    formData
  );
  return response.data;
};

const ArticlesService = {
  createArticle,
  deleteArticle,
  getAllArticles,
  ArticleDetails,
  updateArticle,
  AddSectionToArticls,
  DeleteSectionFromArticles,
};

export default ArticlesService;
