const express = require("express");
const router = express.Router();
const athletesController = require("../mongo/athletes.controller");

router.get("/", async (req, res) => {
  try {
    const result = await athletesController.getAll();
    return res.status(200).json({ Products: products });
  } catch (error) {
    console.log("Loi");
    return res.status(500).json({ mess: error });
  }
});
// Định nghĩa route để lấy danh sách các vận động viên có năm sinh từ 2000 trở về trước
router.get("/list", async (req, res) => {
  try {
    const year = req.query.year || 2000; // Nếu không có năm được cung cấp, mặc định là 2000
    const athletes = await athletesController.getAthletesBornBefore(year);
    return res.status(200).json(athletes);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách vận động viên:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
