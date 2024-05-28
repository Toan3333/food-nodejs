import axios from "axios";
const showSp = document.querySelector("#showsp");
async function getData() {
  const response = await axios.get("http://localhost:3000/products");
  const data = response.data.Products;
  console.log(data);
}

const showProductAdmin = (item) => {
  const template = `<tr>
  <td>${item.id}</td>
  <td>${item.name}</td>
  <td class="admin-img">
    <img src="${item.image}" alt="" />
  </td>
  <td>$ ${item.price}</td>
  <td>${item.category.categoryName}</td>
  <td>
    <div class="edit-auth">
      <a href="#" class="edit-btn" data-id="${item.id}">
        Edit
      </a>
      <a href="#" class="delete-btn" data-id="${item.id}">
        Delete
      </a>
    </div>
  </td>
</tr>;`;
};
