var express = require("express");
var router = express.Router();
const athletesController = require("../mongo/athletes.controller");

// Định nghĩa route để lấy danh sách các vận động viên có năm sinh từ 2000 trở về trước
// API endpoint để lấy danh sách các vận động viên có năm sinh từ 2000 trở về trước
router.get("/list", async (req, res) => {
  try {
    const year = req.query.year || 2000; // Nếu không có năm được cung cấp, mặc định là 2000
    const athletes = await athletesController.find({ yearofbirth: { $lte: year } });
    return res.status(200).json(athletes);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách vận động viên:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
