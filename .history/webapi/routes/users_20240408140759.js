var express = require("express");
var router = express.Router();
const userController = require("../mongo/users.controller");
const checkRole = require("../helper/checkRole");
const bcrypt = require("bcryptjs"); //
// http://localhost:3000/users

router.get("/", async (req, res) => {
  try {
    const users = await userController.getAllUser();
    return res.status(200).json({ Users: users });
  } catch (error) {
    console.log("Loi");
    return res.status(500).json({ mess: error });
  }
});

// http://localhost:3000/users/register

router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const result = await userController.register(body);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi thêm người dùng mới", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
});
// http://localhost:3000/users/login
// api dang nhap
router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const result = await userController.login(body);
    return res.status(200).json(result);
  } catch (error) {
    console.log("loi dang nhap", error);
    return res.status(500).json({ mess: error });
  }
});

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Lấy thông tin người dùng từ email
//     const user = await userController.getUserByEmail(email);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
//     }
//     // Kiểm tra mật khẩu
//     const validPassword = await bcrypt.compare(password, user.pass);
//     if (!validPassword) {
//       return res.status(400).json({ success: false, message: "Mật khẩu không chính xác" });
//     }
//     // Đăng nhập thành công, trả về vai trò của người dùng
//     const role = user.role === 1 ? "admin" : "user";
//     return res.status(200).json({ success: true, message: "Đăng nhập thành công", role: role });
//   } catch (error) {
//     console.log("Lỗi đăng nhập", error);
//     return res.status(500).json({ success: false, message: "Lỗi server" });
//   }
// });

module.exports = router;
