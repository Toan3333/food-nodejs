import axios from "axios";

const showCategory = document.querySelector("#showCategory");
const formCategoryPost = document.querySelector(".form-category-post");
const formCategoryEdit = document.querySelector("#formEdit");
let currentCategory = null;

async function getDataCategory() {
  try {
    const response = await axios.get("http://localhost:3000/categories");
    const data = response.data.Category;
    data.forEach((item) => {
      renderCategory(item);
    });
    console.log(data);
  } catch (error) {
    console.log("Lỗi lấy danh mục", error);
  }
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
      cateRow.remove();
    } catch (error) {
      console.log(error);
    }
  } else if (e.target.matches(".edit-btn")) {
    const id = e.target.getAttribute("data-id");
    try {
      await handleEdit(id);
    } catch (error) {
      console.log("Lỗi khi chỉnh sửa danh mục:", error);
    }
  }
});

const getCateById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/categories/${id}`);
    return response.data;
  } catch (error) {
    console.log("Lỗi lấy danh mục theo id", error);
  }
};

async function handleEdit(id) {
  try {
    currentCategory = await getCateById(id);
    document.getElementById("nameUpdate").value = currentCategory.name;
    showEditForm();
  } catch (error) {
    console.log("Lỗi khi chỉnh sửa danh mục:", error);
  }
}

const createCategory = async (newCategory) => {
  try {
    const response = await axios.post("http://localhost:3000/categories", newCategory);
    return response.data.Category;
  } catch (error) {
    console.log("Lỗi thêm danh mục mới", error);
  }
};

formCategoryPost.addEventListener("submit", async function (e) {
  e.preventDefault();
  const nameCategory = document.querySelector("#nameCategory").value;
  try {
    const addedCategory = await createCategory({ name: nameCategory });
    renderCategory(addedCategory);
    closeModal();
    window.location.reload(true);
  } catch (error) {
    console.log(error);
  }
});

const updateCate = async (id, newUpdateCate) => {
  try {
    const response = await axios.put(`http://localhost:3000/categories/${id}`, newUpdateCate);
    return response.data;
  } catch (error) {
    console.log("Lỗi cập nhật danh mục", error);
  }
};

formCategoryEdit.addEventListener("submit", async function (e) {
  e.preventDefault();
  const nameUpdate = document.querySelector("#nameUpdate").value;
  const id = document.querySelector("#categoryId").value;
  try {
    const updatedCate = await updateCate(id, { name: nameUpdate });
    const updatedRow = document.querySelector(`tr[data-id="${id}"]`);
    updatedRow.querySelector(".name").textContent = nameUpdate;
    closeModalUpdate();
  } catch (error) {
    console.log(error);
  }
});

function renderCategory(item) {
  if (item && item._id) {
    const template = `<tr data-id="${item._id}">
        <td>${item._id}</td>
        <td class="name">${item.name}</td>
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
