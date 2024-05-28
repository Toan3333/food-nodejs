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

  // Kiểm tra xem email và mật khẩu có được nhập vào không
  if (!email || !password) {
    alert("Vui lòng nhập đầy đủ email và mật khẩu.");
    return;
  }

  try {
    const responseData = await getLoginData(email, password);
    if (responseData.role === 1) {
      // Nếu vai trò là 1 (admin), chuyển hướng đến trang admin.html
      window.location.href = "/admin/admin.html";
    } else {
      // Nếu không phải là admin, chuyển hướng đến trang index.html hoặc trang khác tùy thuộc vào logic của bạn
      window.location.href = "/index.html";
    }
  } catch (error) {
    // Nếu có lỗi từ phía máy chủ, hoặc thông tin đăng nhập không chính xác, xử lý lỗi ở đây
    if (error.response && error.response.status === 401) {
      // Nếu lỗi là lỗi xác thực (401 Unauthorized), thông báo lỗi
      alert("Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.");
    } else {
      // Nếu có lỗi khác từ phía máy chủ, hoặc lỗi không mong muốn, thông báo lỗi chung
      console.error("Đã xảy ra lỗi khi đăng nhập:", error);
      alert("Đăng nhập không thành công. Vui lòng thử lại sau.");
    }
  }
});

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
// async function getLoginData(email, pass) {
//   try {
//     const response = await axios.post("http://localhost:3000/users/login", { email, pass });
//     return response.data;
//   } catch (error) {
//     console.error("Đã xảy ra lỗi khi đăng nhập:", error);
//     throw error;
//   }
// }

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
