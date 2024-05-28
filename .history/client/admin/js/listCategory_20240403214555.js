import axios from "axios";
const showCategory = document.querySelector("#showCategory");
const formCategoryPost = document.querySelector(".form-category-post");
async function getDataCategory() {
  const response = await axios.get("http://localhost:3000/categories");
  const data = response.data.Category;
  data.forEach((item) => {
    renderCategory(item);
  });
  console.log(data);
}

const deleteCate = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/categories/${id}`);
    const data = response.data.Category;
    return data;
  } catch (error) {
    console.log("Lỗi không xóa được dữ liệu", error);
  }
};

showCategory.addEventListener("click", async function (e) {
  if (e.target.matches(".delete-btn")) {
    const id = e.target.getAttribute("data-id");
    try {
      await deleteCate(id);
      const cateRow = e.target.closest("tr");
      console.log(cateRow);
      cateRow.remove();
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
      console.log("Lỗi khi chỉnh sửa danh muc:", error);
    }
  }
});
const getProductById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm theo id", error);
    throw error;
  }
};
async function handleEdit(id) {
  currentUser = await getProductById(id); // Lấy thông tin sản phẩm từ id
  // Kiểm tra cate có tồn tại và là một mảng không
  document.getElementById("nameUpdate").value = currentUser.name; // Điền tên sản phẩm vào trường input tương ứng

  showEditForm(); // Hiển thị form chỉnh sửa
}

const createCategory = async (NewCategory) => {
  try {
    const response = await axios.post("http://localhost:3000/categories", NewCategory);
    return response.data.Category; // Trả về dữ liệu từ phản hồi, không cần trích xuất phần NewProduct
  } catch (error) {
    console.log("Lỗi thêm sản phẩm mới", error);
    throw error; // Ném ra lỗi để xử lý ở nơi gọi
  }
};

formCategoryPost.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nameCategory = document.querySelector("#nameCategory").value;
  try {
    const addedCategory = await createCategory({
      name: nameCategory,
    });
    renderCategory(addedCategory);
    closeModal();
    window.location.reload(true);
    // Nếu bạn có một hàm closeModal, hãy gọi nó ở đây
  } catch (error) {
    console.log(error);
  }
});

function renderCategory(item) {
  if (item && item._id) {
    const template = `<tr>
        <td>${item._id}</td>
        <td>${item.name}</td>
        <td>
          <div class="edit-auth">
            <a href="#" class="edit-btn" data-id="${item._id}">Edit</a>
            <a href="#" class="delete-btn" data-id="${item._id}">Delete</a>
          </div>
        </td>
      </tr>`;
    showCategory.insertAdjacentHTML("beforeend", template);
  } else {
    console.log("Không có dữ liệu hoặc thuộc tính '_id' không tồn tại.");
  }
}

getDataCategory();
