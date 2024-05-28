import axios from "axios";

const formLogin = document.querySelector("#form-login");

// async function loginUser(email, password) {
//   try {
//     // Gửi yêu cầu POST đến endpoint /login với thông tin đăng nhập
//     const response = await axios.post("http://localhost:3000/users/login", {
//       email: email,
//       password: password,
//     });

//     // Trả về dữ liệu phản hồi từ máy chủ
//     const responseData = response.data;

//     // Kiểm tra xem đăng nhập có thành công không
//     if (responseData.success) {
//       // Nếu đăng nhập thành công, kiểm tra vai trò người dùng và chuyển hướng đến trang tương ứng
//       if (responseData.role === "admin") {
//         // Nếu người dùng là admin, chuyển hướng đến trang admin.html
//         window.location.href = "/admin/admin.html";
//       } else {
//         // Nếu không phải là admin, chuyển hướng đến trang index.html
//         window.location.href = "/index.html";
//       }
//     } else {
//       // Nếu đăng nhập không thành công, hiển thị thông báo lỗi
//       alert("Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.");
//     }
//   } catch (error) {
//     // Xử lý lỗi nếu có
//     console.error("Lỗi khi đăng nhập:", error);
//     alert("Đăng nhập không thành công. Vui lòng thử lại sau.");
//   }
// }
async function getLoginData(email, pass) {
  try {
    const response = await axios.post("http://localhost:3000/users/login", { email, pass });
    return response.data;
  } catch (error) {
    console.error("Đã xảy ra lỗi khi đăng nhập:", error);
    throw error;
  }
}

// formLogin.addEventListener("submit", async function (e) {
//   e.preventDefault();
//   const email = document.querySelector("#email").value;
//   const password = document.querySelector("#password").value;
//   try {
//     await getLoginData(email, password);
//     // localStorage.setItem("token", result.token);
//     alert("Đăng nhập thành công");
//     window.location.href = "/admin/admin.html";
//   } catch (error) {
//     // Xử lý lỗi nếu cần
//     alert("Đăng nhập thất bại. Vui lòng thử lại.");
//   }
// });
