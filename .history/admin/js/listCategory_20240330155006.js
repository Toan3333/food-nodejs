import axios from "axios";
const showCategory = document.querySelector("#showCategory");
async function getDataCategory() {
  const response = await axios.get("http://localhost:3000/categories");
  const data = response.data.Category;
  console.log(data);
}
function showCategory(item) {
  const template = ``;
}
getDataCategory();