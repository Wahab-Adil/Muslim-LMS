import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `${token}` };

const BACKEND_URL = "http://localhost:3000";

const API_URL = `${BACKEND_URL}/courses/`;

// Article- Create Category
const Video_CreateCourse = async (course) => {
  const response = await axios.post(`${API_URL}`, course);
  return response.data;
};

// Article- Delete Category
const Video_DeleteCourse = async (courseId) => {
  const response = await axios.delete(`${API_URL}` + courseId);
  return response.data;
};

// Article- All Category
const Video_AllCourse = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Article- Single Category
const Video_CourseDetails = async (id) => {
  console.log("id ", id);
  const response = await axios.get(`${API_URL}` + id);
  return response.data;
};

// Article -Update Category
const Video_UpdateCourse = async (data) => {
  const response = await axios.put(
    `${API_URL}/update/${data?.id}`,
    data.formData
  );
  return response.data;
};

const Video_CourseServies = {
  Video_CreateCourse,
  Video_DeleteCourse,
  Video_AllCourse,
  Video_CourseDetails,
  Video_UpdateCourse,
};

export default Video_CourseServies;
