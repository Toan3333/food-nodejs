var express = require("express");
var router = express.Router();
const userController = require("../mongo/users.controller");
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
// thêm user mới
router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const result = await userController.register(body);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Loi them user moi", error);
    res.status(500).json({ mess: "loi" });
  }
});
// đăng nhập
router.get("/", async (req, res) => {
  try {
    const users = await userController.getAllUser();
    return res.status(200).json({ Users: users });
  } catch (error) {
    console.log("Lỗi", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
});

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Lấy thông tin người dùng từ username
    const user = await userController.getUserByUsername(username);
    if (!user) {
      return res.status(404).send("Người dùng không tồn tại");
    }
    // Kiểm tra mật khẩu
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Mật khẩu không chính xác");
    }
    // Đăng nhập thành công
    res.send("Đăng nhập thành công");
  } catch (error) {
    console.log("Lỗi đăng nhập", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
});
module.exports = router;
