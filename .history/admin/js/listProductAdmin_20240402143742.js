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
async function getCate() {
  try {
    const response = await axios.get("http://localhost:3000/categories");
    const data = response.data.Category;
    console.log(data);
    return data; // Trả về dữ liệu danh mục sản phẩm
  } catch (error) {
    console.error("Lỗi khi lấy danh mục sản phẩm:", error);
    throw error;
  }
}

// // Định nghĩa hàm handleEdit để điền thông tin sản phẩm vào form chỉnh sửa
async function handleEdit(id) {
  currentUser = await getProductById(id); // Lấy thông tin sản phẩm từ id
  const cate = await getCate();
  // Kiểm tra cate có tồn tại và là một mảng không
  document.getElementById("nameUpdate").value = currentUser.name; // Điền tên sản phẩm vào trường input tương ứng
  document.getElementById("priceUpdate").value = currentUser.price; // Điền giá sản phẩm vào trường input tương ứng
  document.getElementById("productId").value = id; // Đặt giá trị của productId để biết sản phẩm nào đang được chỉnh sửa
  // Hiển thị hình ảnh hiện tại của sản phẩm trong trình xem trước

  const imageUpdateInput = document.querySelector("#imageUpdate");

  imageUpdateInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        imagePreview.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // Nếu không có hình ảnh mới được chọn, bạn có thể giữ nguyên hoặc xóa `src`
      // imagePreview.src = ''; // Xóa `src`
    }
  });

  const imagePreview = document.getElementById("imagePreview");
  imagePreview.src = `http://localhost:3000/images/${currentUser.image}`;
  if (cate && Array.isArray(cate)) {
    const categoryUpdateDropdown = document.getElementById("categoryUpdate");
    categoryUpdateDropdown.innerHTML = ""; // Xóa bỏ các tùy chọn hiện có trong dropdown menu
    console.log(cate);
    let proupdate = "";
    cate.forEach((item) => {
      if (item._id == currentUser.category.categoryId) {
        proupdate += `<option value="${item._id}" selected>${item.name}</option>`;
      } else {
        proupdate += `<option value="${item._id}">${item.name}</option>`;
      }
    });

    categoryUpdateDropdown.insertAdjacentHTML("beforeend", proupdate);
  } else {
    console.log("Không thể lấy danh sách danh mục sản phẩm.");
  }

  showEditForm(); // Hiển thị form chỉnh sửa
}

formEdit.addEventListener("submit", async function (e) {
  e.preventDefault();
  const nameUpdate = document.querySelector("#nameUpdate").value;
  const priceUpdate = document.querySelector("#priceUpdate").value;
  const categoryUpdate = document.querySelector("#categoryUpdate").value;
  const id = document.querySelector("#productId").value;

  const formData = new FormData();
  formData.append("name", nameUpdate);
  formData.append("price", priceUpdate);
  formData.append("category", categoryUpdate);
  formData.append("productId", id);

  const imageUpdate = document.querySelector("#imageUpdate").files[0];
  if (imageUpdate) {
    formData.append("image", imageUpdate);

    // Cập nhật hình ảnh trình xem trước nếu người dùng chọn hình ảnh mới
    const imagePreview = document.getElementById("imagePreview");
    const reader = new FileReader();
    reader.onload = function (event) {
      imagePreview.src = event.target.result;

      // Sau khi hình ảnh được chọn và xem trước, thực hiện lưu dữ liệu
      saveUpdatedData(id, formData);
    };
    reader.readAsDataURL(imageUpdate);
  } else {
    // Nếu không có hình ảnh mới được chọn, chỉ cần lưu dữ liệu hiện tại
    saveUpdatedData(id, formData);
  }
});

async function saveUpdatedData(id, formData) {
  try {
    const updatedProduct = await updateProduct(id, formData);
    showProductAdmin(updatedProduct);
    closeModalUpdate();
    location.reload(true);
  } catch (error) {
    console.log(error);
  }
}

// formEdit.addEventListener("submit", async function (e) {
//   e.preventDefault();
//   const nameUpdate = document.querySelector("#nameUpdate").value;
//   const priceUpdate = document.querySelector("#priceUpdate").value;
//   const categoryUpdate = document.querySelector("#categoryUpdate").value;
//   const id = document.querySelector("#productId").value;

//   const formData = new FormData();
//   formData.append("name", nameUpdate);
//   formData.append("price", priceUpdate);
//   formData.append("category", categoryUpdate);
//   formData.append("productId", id);

//   const imageUpdate = document.querySelector("#imageUpdate").files[0];
//   if (imageUpdate) {
//     formData.append("image", imageUpdate);
//   }

//   try {
//     const updatedProduct = await updateProduct(id, formData);
//     showProductAdmin(updatedProduct);
//     closeModalUpdate();
//     location.reload(true);
//   } catch (error) {
//     console.log(error);
//   }
// });

getData();
