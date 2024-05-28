var express = require("express");
var router = express.Router();
const athletesController = require("../mongo/athletes.controller");

router.get("/list", async (req, res) => {
  try {
    const year = req.query.year; // Lấy năm từ tham số truy vấn
    if (!year || isNaN(year)) {
      return res.status(400).json({ error: "Invalid year parameter" });
    }

    const athletes = await athletesController.getAthletesBornBefore(parseInt(year)); // Truyền năm vào hàm controller
    return res.status(200).json({ Athletes: athletes });
  } catch (error) {
    console.error("Lỗi:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
