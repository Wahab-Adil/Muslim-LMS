const backendUrl = "http://localhost:3000";
const baseUrl = (path, sliceValue = 0) => {
  return `${backendUrl}/${path?.slice(sliceValue)}`;
};
export default baseUrl;
