import axios from "axios";

async function getData() {
  const response = await axios.get("http://localhost:3000/products");
}
function showProductAdmin(item) {}
{
  /* <tr>
  <td>${item.id}</td>
  <td>${item.name}</td>
  <td class="admin-img">
    <img src="${item.image}" alt="" />
  </td>
  <td>$ ${item.price}</td>
  <td>${item.category}</td>
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
</tr>; */
}