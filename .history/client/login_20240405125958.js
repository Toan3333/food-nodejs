import axios from "axios";
const formLogin = document.querySelector("#form-login");
async function loginUser(email, password) {
  try {
    // Gửi yêu cầu POST đến endpoint /login với thông tin đăng nhập
    const response = await axios.post("http://localhost:3000/users/login", {
      email: email, // Sử dụng "email" thay vì "username"
      password: password,
    });

    // Nếu đăng nhập thành công, chuyển hướng đến trang sau đăng nhập
    window.location.href = "./admin.html";

    // Trả về dữ liệu phản hồi từ máy chủ (không cần thiết trong trường hợp này)
  } catch (error) {
    // Nếu phản hồi không có dữ liệu, hiển thị thông báo lỗi cho người dùng
    if (!error.response || !error.response.data) {
      console.error("Đăng nhập không thành công:", error);
      alert("Đăng nhập không thành công. Vui lòng thử lại sau.");
      return;
    }

    // Nếu đăng nhập không thành công, hiển thị thông báo lỗi từ phản hồi của server
    console.error("Đăng nhập không thành công:", error.response.data);
    alert("Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.");
  }
}

formLogin.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Lấy giá trị email và password từ form đăng nhập
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // Gọi hàm loginUser để thực hiện đăng nhập
  await loginUser(email, password);
});
