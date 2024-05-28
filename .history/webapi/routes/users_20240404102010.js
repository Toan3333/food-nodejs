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
    return res.status(200).json({ NewUser: result });
  } catch (error) {
    console.log("Loi them user moi", error);
    res.status(500).json({ mess: "loi" });
  }
});
module.exports = router;
