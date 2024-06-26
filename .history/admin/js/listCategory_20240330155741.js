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
    // Nếu bạn có một hàm closeModal, hãy gọi nó ở đây
  } catch (error) {
    console.log(error);
  }
});

function renderCategory(item) {
  const template = `<tr>
  <td>${item._id}</td>
  <td>${item.name}</td>
  <td>
    <div class="edit-auth">
      <a href="#" class="edit-btn" data-id="${item.id}">Edit</a>
      <a href="#" class="delete-btn" data-id="${item.id}">Delete</a>
    </div>
  </td>
</tr>`;
  showCategory.insertAdjacentHTML("beforeend", template);
}
getDataCategory();
