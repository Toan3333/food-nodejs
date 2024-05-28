import axios from "axios";
const getAll = async () => {
  const response = await axios.get("http://localhost:3000/products");
  const data = await response.json();
  console.log(data);
};
getAll();
