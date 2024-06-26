import axios from "axios";

const showSp = document.querySelector("#showsp");
const formPost = document.querySelector(".admin-form-post");

async function getData() {
  try {
    const response = await axios.get("http://localhost:3000/products");
    const data = response.data.Products;
    console.log(data);
    data.forEach((item) => {
      showProductAdmin(item);
    });
  } catch (error) {
    console.log(error);
  }
}

const showProductAdmin = (item) => {
  const template = `
    <tr>
      <td>${item._id}</td>
      <td>${item.name}</td>
      <td class="admin-img">
        <img src="http://localhost:3000/images/${item.image}" alt="" />
      </td>
      <td>$ ${item.price}</td>
      <td>${item.category.categoryName}</td>
      <td>
        <div class="edit-auth">
          <a href="#" class="edit-btn" data-id="${item._id}">Edit</a>
          <a href="#" class="delete-btn" data-id="${item._id}">Delete</a>
        </div>
      </td>
    </tr>
  `;
  showSp.insertAdjacentHTML("beforeend", template);
};

const createProduct = async (newProduct) => {
  try {
    const response = await axios.post("http://localhost:3000/products", newProduct);
    const addedProduct = response.data.NewProduct; // Lấy thông tin sản phẩm từ phản hồi
    return addedProduct;
  } catch (error) {
    console.log("Loi them san pham moi", error);
    throw error; // Ném ra lỗi để xử lý ở nơi gọi
  }
};

formPost.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const image = document.querySelector("#image").value;
  const category = document.querySelector("#category").value;
  try {
    const addedProduct = await createProduct({
      name: name,
      price: price,
      image: image,
      category: category,
    });
    showProductAdmin(addedProduct);
    // Nếu bạn có một hàm closeModal, hãy gọi nó ở đây
  } catch (error) {
    console.log(error);
  }
});

getData();
