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
  if (item && item._id && item.category && item.category.categoryId && item.category.categoryName) {
    const template = `
    <tr>
      <td>${item._id}</td>
      <td>${item.name}</td>
      <td class="admin-img">
        <img src="http://localhost:3000/images/${item.image}" alt="" />
      </td>
      <td>$ ${item.price}</td>
      <td>${item.category.categoryName</td>
      <td>
        <div class="edit-auth">
          <a href="#" class="edit-btn" data-id="${item._id}">Edit</a>
          <a href="#" class="delete-btn" data-id="${item._id}">Delete</a>
        </div>
      </td>
    </tr>
  `;
    showSp.insertAdjacentHTML("beforeend", template);
  } else {
    console.log("Dữ liệu không hợp lệ hoặc thiếu thông tin '_id' hoặc 'category'");
  }
};

const createProduct = async (NewProduct) => {
  try {
    // Kiểm tra nếu category không được cung cấp trong NewProduct, thêm một category mặc định
    if (!NewProduct.category) {
      NewProduct.category = {
        categoryName: "default", // Đặt tên danh mục mặc định tại đây
      };
    }
    const response = await axios.post("http://localhost:3000/products", NewProduct);
    return response.data.Products; // Trả về dữ liệu từ phản hồi, không cần trích xuất phần NewProduct
  } catch (error) {
    console.log("Lỗi thêm sản phẩm mới", error);
    throw error; // Ném ra lỗi để xử lý ở nơi gọi
  }
};

formPost.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const image = document.querySelector("#image").value;
  const categoryId = document.querySelector("#category").value; // Lấy giá trị categoryId từ dropdown menu
  const categoryName = document.querySelector("#category option:checked").textContent; // Lấy giá trị categoryName từ dropdown menu

  try {
    const addedProduct = await createProduct({
      name: name,
      price: price,
      image: image,
      category: {
        // Truyền cả category vào hàm createProduct
        categoryId: categoryId,
        categoryName: categoryName,
      },
    });
    showProductAdmin(addedProduct);
    closeModal(); // Đảm bảo bạn đã định nghĩa hàm closeModal()
  } catch (error) {
    console.log(error);
  }
});

getData();
