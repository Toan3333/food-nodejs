import axios from "axios";
let currentUser = null;
let currentCategory = null;
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

formPost.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const image = document.querySelector("#image").files[0]; // Sửa thành .files[0] để lấy hình ảnh
  const quantity = document.querySelector("#quantityNum").value;
  const category = document.querySelector("#category").value;

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("quantity", quantity);
    formData.append("category", category);

    const addedProduct = await createProduct(formData); // Truyền formData vào hàm createProduct
    showProductAdmin(addedProduct);
    closeModal(); // Đảm bảo bạn đã định nghĩa hàm closeModal()
    location.reload(); // Không cần truyền true vào reload để tải lại trang một cách hoàn toàn
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
  }
});

const createProduct = async (NewProduct) => {
  try {
    // Gửi dữ liệu sản phẩm mới lên server
    const response = await axios.post("http://localhost:3000/products", NewProduct);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    console.log("Lỗi thêm sản phẩm mới", error);
    throw error; // Ném ra lỗi để xử lý ở nơi gọi
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
      // Hiển thị dropdown menu categoryUpdate
    } catch (error) {
      console.log("Lỗi khi chỉnh sửa sản phẩm:", error);
    }
  }
});

const getCategory = async () => {
  try {
    const response = await axios.get("http://localhost:3000/categories");
    const data = response.data.Category;
    console.log(data);
  } catch (error) {
    console.log("Lỗi lấy danh mục", error);
    throw error;
  }
};
getCategory();

async function handleEdit(id) {
  try {
    // Lấy thông tin sản phẩm và danh mục hiện tại
    currentUser = await getProductById(id);
    currentCategory = await getCategory();

    // Đặt giá trị của các trường trong form chỉnh sửa
    document.getElementById("nameUpdate").value = currentUser.name;
    document.getElementById("priceUpdate").value = currentUser.price;

    const imageUpdate = document.querySelector("#imageUpdate");
    if (currentUser.image) {
      imageUpdate.src = `http://localhost:3000/images/${currentUser.image}`;
    } else {
      console.log("Không có hình ảnh cho sản phẩm này");
    }

    // Hiển thị danh sách danh mục trong dropdown menu
    const categoryUpdate = document.getElementById("categoryUpdate");
    currentCategory.forEach((item) => {
      const template = `       <option value="65f50bb9d3ae70c03ccc4530">special</option>
      <option value="65f9011c28564c0f6b279700">hot</option> -->`;
    });

    // Đặt giá trị ID của sản phẩm trong form ẩn
    document.getElementById("productId").value = id;

    // Hiển thị form chỉnh sửa
    showEditForm();
  } catch (error) {
    console.log("Lỗi khi xử lý chỉnh sửa sản phẩm:", error);
  }
}

formEdit.addEventListener("submit", async function (e) {
  e.preventDefault();
  const nameUpdate = document.querySelector("#nameUpdate").value;
  const imageUpdate = document.querySelector("#imageUpdate").files[0];
  const categoryUpdate = document.querySelector("#categoryUpdate").value;
  const priceUpdate = document.querySelector("#priceUpdate").value;
  const id = document.querySelector("#productId").value;
  try {
    const updatedProduct = await updateProduct(id, {
      name: nameUpdate,
      image: imageUpdate,
      category: categoryUpdate, // Sửa thành categoryUpdate
      price: priceUpdate,
    });

    showProductAdmin(updatedProduct);
    closeModalUpdate();
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
});

getData();
