var express = require("express");
var router = express.Router();
const userController = require("../mongo/users.controller");
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

// đăng nhập

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

module.exports = router;
