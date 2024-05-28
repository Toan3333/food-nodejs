import axios from "axios";
const showSp = document.querySelector("#showsp");
const formPost = document.querySelector(".admin-form-post");
async function getData() {
  const response = await axios.get("http://localhost:3000/products");
  const data = response.data.Products;
  console.log(data);

  data.forEach((item) => {
    showProductAdmin(item);
  });
}

const showProductAdmin = (item) => {
  const template = `<tr>
  <td>${item._id}</td>
  <td>${item.name}</td>
  <td class="admin-img">
    <img src="http://localhost:3000/images/${item.image}" alt="" />
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
</tr>`;
  showSp.insertAdjacentHTML("beforeend", template);
};

const addUser = async (newUser) => {
  try {
    const response = await axios.post(this.endPoint + this.collectionName, newUser);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

formPost.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const img = document.querySelector("#img").value;

  try {
    const addProduct = await userApi.addUser({
      id: userId,
      username: username,
      password: password,
      role: role,
    });
    renderUsers(addUsers);
    closeModal();
  } catch (error) {
    console.log(error);
  }
});
getData();
