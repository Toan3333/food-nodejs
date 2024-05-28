import axios from "axios";

const formLogin = document.querySelector("#form-login");

async function loginUser(name, password) {
  try {
    // Gửi yêu cầu POST đến endpoint /login với thông tin đăng nhập
    const response = await axios.post("http://localhost:3000/users/login", {
      name: name,
      password: password,
    });

    // Nếu đăng nhập thành công, chuyển hướng đến trang sau đăng nhập
    window.location.href = "./admin.html";

    // Trả về dữ liệu phản hồi từ máy chủ (không cần thiết trong trường hợp này)
    return response.data;
  } catch (error) {
    // Nếu đăng nhập không thành công, hiển thị thông báo lỗi cho người dùng
    console.error("Đăng nhập không thành công:", error.response.data);
    alert("Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.");
  }
}

formLogin.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Lấy giá trị email và password từ form đăng nhập
  const email = document.querySelector("#name").value;
  const password = document.querySelector("#password").value;

  // Gọi hàm loginUser để thực hiện đăng nhập
  await loginUser(email, password);
});
