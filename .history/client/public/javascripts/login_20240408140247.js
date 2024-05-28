import axios from "axios";

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
    const result = await getLoginData(email, password);
    localStorage.setItem("token", result.token);
    alert("Đăng nhập thành công");
    window.location.href = "/admin/admin.html";
  } catch (error) {
    // Xử lý lỗi nếu cần
    alert("Đăng nhập thất bại. Vui lòng thử lại.");
  }
});
