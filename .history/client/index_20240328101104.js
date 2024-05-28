import axios from "axios";
const getAll = async () => {
  const response = await axios.get("http://localhost:3000/products");
  return response.data;
};
getAll();
