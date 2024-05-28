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
    return response.data;
  } catch (error) {
    console.log("Lỗi không xóa được dữ liệu", error);
  }
};

showCategory.addEventListener("click", function (e) {
  if (e.target.matches(".delete-btn")) {
    const id = e.target.getAttribute("data-id");
    try {
    } catch (error) {
      console.log(error);
    }
  }
});

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
