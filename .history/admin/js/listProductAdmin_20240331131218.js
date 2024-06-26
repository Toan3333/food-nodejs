import axios from "axios";

const showSp = document.querySelector("#showsp");
const formPost = document.querySelector(".admin-form-post");
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

const deleteProduct = async (_id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/products/${id}`);
    const data = response.data.ProductDelete;
    return data;
  } catch (error) {
    console.log("Lỗi xóa sản phẩm", error);
    throw error; // Ném ra lỗi để xử lý ở nơi gọi
  }
};

const handleDeleteProduct = async (_id) => {
  try {
    await deleteProduct(_id);
    // Xóa sản phẩm khỏi giao diện người dùng sau khi đã xóa thành công trên máy chủ
    const productRow = document.querySelector(`tr[data-id="${_id}"]`);
    if (productRow) {
      productRow.remove();
      console.log("Sản phẩm đã được xóa thành công!");
      window.location.reload(true); // Tải lại trang mới, không sử dụng cache
    } else {
      console.log("Không tìm thấy sản phẩm để xóa!");
    }
  } catch (error) {
    console.log("Đã xảy ra lỗi khi xóa sản phẩm:", error);
  }
};

showSp.addEventListener("click", async function (e) {
  e.preventDefault();
  if (e.target.matches(".delete-btn")) {
    const id = e.target.getAttribute("data-id");
    console.log(id);
    await handleDeleteProduct(id);
  } else if (e.target.matches(".edit-btn")) {
    const id = e.target.getAttribute("data-id");
    try {
      await handleEdit(id);
    } catch (error) {
      console.log("Lỗi khi chỉnh sửa sản phẩm:", error);
    }
  }
});

const createProduct = async (NewProduct) => {
  try {
    // Gửi dữ liệu sản phẩm mới lên server
    const response = await axios.post("http://localhost:3000/products", NewProduct);
    return response.data.Products; // Trả về dữ liệu từ phản hồi
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
  const category = document.querySelector("#category").value; // Lấy giá trị categoryId từ dropdown menu
  try {
    const addedProduct = await createProduct({
      name: name,
      price: price,
      image: image,
      category: category,
    });
    showProductAdmin(addedProduct);
    closeModal(); // Đảm bảo bạn đã định nghĩa hàm closeModal()
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
});

getData();
