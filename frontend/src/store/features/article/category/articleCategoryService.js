import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `${token}` };

const BACKEND_URL = "http://localhost:3000";

const API_URL = `${BACKEND_URL}/article/categories`;

// Article- Create Category
const ArticleCreateCategory = async (formData) => {
  const response = await axios.post(`${API_URL}/add`, formData);
  return response.data;
};

// Article- Delete Category
const ArticleDeleteCategory = async (categoryId) => {
  const response = await axios.delete(`${API_URL}/delete/` + categoryId);
  return response.data;
};

// Article- All Category
const ArticleAllCategory = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// Article- Single Category
const ArticleSingleCategory = async (id) => {
  const response = await axios.get(`${API_URL}/getsingle/` + id);
  return response.data;
};

// Article -Update Category
const ArticleUpdateCategory = async (data) => {
  const response = await axios.put(
    `${API_URL}/update/${data?.id}`,
    data?.formData
  );
  return response.data;
};

const ArticleCategoryService = {
  ArticleCreateCategory,
  ArticleDeleteCategory,
  ArticleAllCategory,
  ArticleSingleCategory,
  ArticleUpdateCategory,
};

export default ArticleCategoryService;
