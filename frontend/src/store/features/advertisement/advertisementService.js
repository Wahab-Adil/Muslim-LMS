import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common = { Authorization: `${token}` };

const BACKEND_URL = "http://localhost:3000";

const API_URL = `${BACKEND_URL}/advertisement`;

//  Create Advertisement
const createAdvertisement = async (advertisement) => {
  const response = await axios.post(`${API_URL}/`, advertisement);
  return response.data;
};

// Delete Advertisement
const deleteAdvertisement = async (advertisementId) => {
  const response = await axios.delete(`${API_URL}/` + advertisementId);
  return response.data;
};

// Delete Advertisement
const deleteSelectedAdvertisement = async (advertisementId) => {
  const response = await axios.delete(`${API_URL}/selected/` + advertisementId);
  return response.data;
};

//  All Advertisement
const getAllAdvertisement = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};
//  All Advertisement
const getSelectedAdvertisements = async () => {
  const response = await axios.get(`${API_URL}/show`);
  return response.data;
};

//  Single Advertisemnet
const getSingleAdvertisement = async (id) => {
  const response = await axios.get(`${API_URL}/` + id);
  return response.data;
};

// select Advertisement
const selectAdvertisement = async (advertisement) => {
  const response = await axios.get(`${API_URL}/select/${advertisement}`);
  return response.data;
};

const AdvertisementService = {
  createAdvertisement,
  deleteAdvertisement,
  deleteSelectedAdvertisement,
  getAllAdvertisement,
  getSelectedAdvertisements,
  getSingleAdvertisement,
  selectAdvertisement,
};

export default AdvertisementService;
