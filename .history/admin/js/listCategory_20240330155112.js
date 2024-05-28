import axios from "axios";
const showCategory = document.querySelector("#showCategory");
async function getDataCategory() {
  const response = await axios.get("http://localhost:3000/categories");
  const data = response.data.Category;
  console.log(data);
}
function renderCategory(item) {
  const template = `<tr>
  <td>${item.id}</td>
  <td>${item.name}</td>
  <td>
    <div class="edit-auth">
      <a href="#" class="edit-btn" data-id="${item.id}">Edit</a>
      <a href="#" class="delete-btn" data-id="${item.id}">Delete</a>
    </div>
  </td>
</tr>`;
  showCategory.insertAdjacentHTML("beforeend", template);
}
getDataCategory();
