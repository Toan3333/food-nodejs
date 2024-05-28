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
    const responseData = await getLoginData(email, password);
    if (responseData.success) {
      if (responseData.role === "admin") {
        window.location.href = "/admin/admin.html";
      } else {
        window.location.href = "/index.html";
      }
    } else {
      alert("Đăng nhập không thành công. Vui lòng
