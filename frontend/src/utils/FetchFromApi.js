import axios from "axios";

const BASE_URL = "http://localhost:3000";

const FetchFromApi = async (query) => {
  const { data } = await axios.get(`${BASE_URL}/${query}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  return data;
};

export default FetchFromApi;
