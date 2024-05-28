import axios from "axios";
let currentUser = null;
const showSp = document.querySelector("#showsp");
const formPost = document.querySelector(".admin-form-post");
const formEdit = document.querySelector("#formEdit");
let stt = 1; // Di chuyển khai báo của biến stt ra ngoài hàm

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
const getProductById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm theo id", error);
    throw error;
  }
};

const showProductAdmin = (item) => {
  if (item && item._id && item.category && item.category.categoryId && item.category.categoryName) {
    const template = `
    <tr>
      <td>${stt}</td> <!-- Thay đổi từ item.id thành item._id -->
      <td>${item.name}</td>
      <td class="admin-img">
        <img src="http://localhost:3000/images/${item.image}" alt="" />
      </td>
      <td>$ ${item.price}</td>
      <td>${item.category.categoryName}</td>
      <td>
        <div class="edit-auth">
          <a href="#" class="edit-btn" data-id="${item._id}">Edit</a> <!-- Thay đổi từ item.id thành item._id -->
          <a href="#" class="delete-btn" data-id="${item._id}">Delete</a> <!-- Thay đổi từ item.id thành item._id -->
        </div>
      </td>
    </tr>
  `;
    stt++; // Tăng biến stt sau mỗi lần gọi hàm
    showSp.insertAdjacentHTML("beforeend", template);
  } else {
    console.log("Dữ liệu không hợp lệ hoặc thiếu thông tin '_id' hoặc 'category'");
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/products/${id}`);
    const data = response.data.Products;
    return data; // Trả về dữ liệu sản phẩm đã được xóa
  } catch (error) {
    console.log("Lỗi xóa sản phẩm", error);
    throw error; // Ném ra lỗi để xử lý ở nơi gọi
  }
};

const updateProduct = async (id, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:3000/products/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.log("Lỗi cập nhật sản phẩm", error);
    throw error;
  }
};
showSp.addEventListener("click", async function (e) {
  e.preventDefault();
  if (e.target.matches(".delete-btn")) {
    const id = e.target.getAttribute("data-id");
    try {
      await deleteProduct(id);
      const productRow = e.target.closest("tr");
      console.log(productRow);
      productRow.remove();
    } catch (error) {
      console.log(error);
    }
  } else if (e.target.matches(".edit-btn")) {
    const id = e.target.getAttribute("data-id");
    console.log(id);
    try {
      await handleEdit(id);
    } catch (error) {
      console.log("Lỗi khi chỉnh sửa sản phẩm:", error);
    }
  }
});

async function handleEdit(id) {
  currentUser = await getProductById(id);
  document.getElementById("nameUpdate").value = currentUser.name;
  document.getElementById("imageUpdate").value = currentUser.image;
  document.getElementById("categoryUpdate").value = currentUser.category.categoryName;
  document.getElementById("productId").value = id;
  document.getElementById("priceUpdate").value = currentUser.price;
  showEditForm();
}

formEdit.addEventListener("submit", async function (e) {
  e.preventDefault();
  const nameUpdate = document.querySelector("#nameUpdate").value;
  const imageUpdate = document.querySelector("#imageUpdate").value;
  const categoryUpdate = document.querySelector("#categoryUpdate").value;
  const priceUpdate = document.querySelector("#priceUpdate").value;
  const id = document.querySelector("#productId").value;
  try {
    const updatedProduct = await updateProduct(id, {
      name: nameUpdate,
      image: imageUpdate,
      price: priceUpdate,
      category: categoryUpdate,
    });
    closeModalUpdate();
    showProductAdmin(updatedProduct);
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
});

getData();
