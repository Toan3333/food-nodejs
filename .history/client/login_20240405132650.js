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

    // Trả về dữ liệu phản hồi từ máy chủ
    const responseData = response.data;

    // Kiểm tra xem đăng nhập có thành công không
    if (responseData.success) {
      // Nếu đăng nhập thành công, kiểm tra vai trò người dùng và chuyển hướng đến trang tương ứng
      if (role === 1) {
        // Nếu người dùng là admin, chuyển hướng đến trang admin.html
        window.location.href = "/admin/admin.html";
      } else {
        // Nếu không phải là admin, chuyển hướng đến trang index.html
        window.location.href = "/index.html";
      }
    } else {
      // Nếu đăng nhập không thành công, hiển thị thông báo lỗi
      alert("Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.");
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Lỗi khi đăng nhập:", error);
    alert("Đăng nhập không thành công. Vui lòng thử lại sau.");
  }
}

formLogin.addEventListener("submit", async function (e) {
  e.preventDefault();
  // Lấy giá trị email và password từ form đăng nhập
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // Kiểm tra xem người dùng có phải là admin hay không
  const isAdmin = await checkIfAdmin(email);

  // Gọi hàm loginUser để thực hiện đăng nhập, với vai trò tương ứng
  if (isAdmin) {
    await loginUser(email, password, 1);
  } else {
    await loginUser(email, password, 0);
  }
});

async function checkIfAdmin(email) {
  try {
    // Gửi yêu cầu GET để kiểm tra vai trò của người dùng dựa trên email
    const response = await axios.get(`http://localhost:3000/users/${email}`);

    // Lấy dữ liệu từ phản hồi
    const role = response.data.role;

    // Kiểm tra vai trò của người dùng
    return role === 1;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Lỗi khi kiểm tra vai trò của người dùng:", error);
    return false; // Trả về false nếu có lỗi
  }
}
