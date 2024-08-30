import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `${token}` };

const BACKEND_URL = "http://localhost:3000";

const API_URL = `${BACKEND_URL}/categories`;

// video- Create Category
const Video_CreateCategory = async (category) => {
  const response = await axios.post(`${API_URL}/add`, category);
  return response.data;
};

// Video- Delete Category
const Video_DeleteCategory = async (categoryId) => {
  const response = await axios.delete(`${API_URL}/delete/` + categoryId);
  return response.data;
};

// Video- All Category
const Video_AllCategories = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// Video- Single Category
const Video_SingleCategory = async (id) => {
  const response = await axios.get(`${API_URL}/getsingle/` + id);
  return response.data;
};

// Article -Update Category
const Video_UpdateCategory = async (categoryId, formData) => {
  const response = await axios.put(`${API_URL}/update/${categoryId}`, formData);
  return response.data;
};

const VideoCategoryService = {
  Video_CreateCategory,
  Video_DeleteCategory,
  Video_AllCategories,
  Video_SingleCategory,
  Video_UpdateCategory,
};

export default VideoCategoryService;
