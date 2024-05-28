const express = require("express");
const router = express.Router();
const athletesController = require("../mongo/athletes.controller");

// Định nghĩa route để lấy danh sách các vận động viên có năm sinh từ 2000 trở về trước
// Route để lấy danh sách các vận động viên có năm sinh từ 2000 trở về trước
router.get("/list", async (req, res) => {
  try {
    const year = req.query.year || 2000;
    const athletes = await Athlete.find({ yearofbirth: { $lte: year } });
    res.json(athletes);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách vận động viên:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
});

module.exports = router;
