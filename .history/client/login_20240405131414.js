import axios from "axios";

const formLogin = document.querySelector("#form-login");

async function loginUser(email, password, role) {
  try {
    // Gửi yêu cầu POST đến endpoint /login với thông tin đăng nhập
    const response = await axios.post("http://localhost:3000/users/login", {
      email: email,
      password: password,
      role: role, // Thêm trường role vào dữ liệu gửi đi
    });

    // Nếu đăng nhập thành công, chuyển hướng đến trang sau đăng nhập
    window.location.href = "/index.html";

    // Trả về dữ liệu phản hồi từ máy chủ (không cần thiết trong trường hợp này)
    return response.data;
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

  // Gọi hàm loginUser để thực hiện đăng nhập, truyền vào vai trò mặc định là 0 (user)
  await loginUser(email, password, 0);
});
