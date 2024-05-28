import axios from "axios";
import checkRole from "./checkRole"; // Import hàm checkRole

const formLogin = document.querySelector("#form-login");

async function getLoginData(email, pass) {
  try {
    const response = await axios.post("http://localhost:3000/users/login", { email, pass });
    return response.data;
  } catch (error) {
    console.error("Đã xảy ra lỗi khi đăng nhập:", error);
    throw error;
  }
}

formLogin.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    // Gửi yêu cầu đăng nhập và nhận kết quả
    const result = await getLoginData(email, password);

    // Lưu token vào local storage
    localStorage.setItem("token", result.token);

    // Kiểm tra vai trò của người dùng và chuyển hướng đến trang tương ứng
    if (result.role === "admin") {
      window.location.href = "/admin/admin.html";
    } else {
      window.location.href = "/index.html";
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    alert("Đăng nhập thất bại. Vui lòng thử lại.");
  }
});
