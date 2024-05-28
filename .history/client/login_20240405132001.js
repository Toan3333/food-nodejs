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

  // Kiểm tra xem người dùng có phải là admin hay không
  const isAdmin = checkIfAdmin(email); // Hàm này cần phải được xác định
  // Nếu người dùng là admin, chuyển hướng đến trang admin.html
  if (isAdmin) {
    window.location.href = "/admin/admin.html";
  } else {
    // Nếu đăng nhập thành công, chuyển hướng đến trang sau đăng nhập
    window.location.href = "/index.html";
    // Nếu không phải là admin, có thể xử lý theo ý của bạn, ví dụ: hiển thị thông báo lỗi
    alert("Bạn không có quyền truy cập trang admin.");
  }
  // Gọi hàm loginUser để thực hiện đăng nhập, với vai trò tương ứng
  await loginUser(email, password, isAdmin ? 1 : 0);
});
async function checkIfAdmin(email) {
  try {
    // Gửi yêu cầu GET để kiểm tra vai trò của người dùng dựa trên email
    const response = await axios.get(`http://localhost:3000/users/role/${email}`);

    // Lấy dữ liệu từ phản hồi
    const role = response.data.role;

    // Kiểm tra vai trò của người dùng
    if (role === 1) {
      // Người dùng có vai trò là admin
      return true;
    } else {
      // Người dùng không phải là admin
      return false;
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Lỗi khi kiểm tra vai trò của người dùng:", error);
    return false; // Trả về false nếu có lỗi
  }
}
