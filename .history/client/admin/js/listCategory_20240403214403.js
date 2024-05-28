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
