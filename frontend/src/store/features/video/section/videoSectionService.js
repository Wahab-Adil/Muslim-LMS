import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `${token}` };

const BACKEND_URL = "http://localhost:3000";

const API_URL = `${BACKEND_URL}/sections/`;

// Video- Create Section
const Video_CreateSection = async (formData) => {
  const { title, description } = formData;
  const response = await axios.post(`${API_URL}/` + formData.courseId, {
    title,
    description,
  });
  return response.data;
};

// Video- get Section
const Video_get_Section = async (sectionId) => {
  const response = await axios.get(`${API_URL}` + sectionId);
  return response.data;
};

// Video- Delete Section
const Video_DeleteSection = async (sectionId) => {
  const response = await axios.delete(`${API_URL}` + sectionId);
  return response.data;
};

// Video- Add To Section
const Video_AddToSection = async (section) => {
  const response = await axios.post(
    `${API_URL}/videos/` + section?.id,
    section?.formData
  );
  return response.data;
};

// Video- Preview From Section
const PreviewVideoFromSection = async (Ids) => {
  console.log("pro", Ids);
  const response = await axios.get(
    `${API_URL}videos/` + Ids?.courseId + "/" + Ids?.videoId + "/" + Ids?.idx
  );
  return response.data;
};

// Video- Deltete From Section
const Video_DeleteFromSection = async (Ids) => {
  const response = await axios.delete(
    `${API_URL}videos/` + Ids?.section_pre_Id + "/" + Ids?.DeleteSectionId
  );
  return response.data;
};

const Video_SectionServices = {
  Video_CreateSection,
  Video_get_Section,
  Video_DeleteSection,
  Video_AddToSection,
  PreviewVideoFromSection,
  Video_DeleteFromSection,
};

export default Video_SectionServices;
