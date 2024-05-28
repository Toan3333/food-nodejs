console.log("ok");
import axios from "axios";
async function getDataCategory() {
  const response = await axios.get("http://localhost:3000/categories");
}
