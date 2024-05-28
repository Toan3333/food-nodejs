var express = require("express");
var router = express.Router();
const athletesController = require("../mongo/athletes.controller");

app.get("/list", (req, res) => {
  const { year } = req.query;

  // Kiểm tra xem năm có được cung cấp không
  if (!year || isNaN(year)) {
    return res.status(400).json({ error: "Invalid year parameter" });
  }

  // Lọc danh sách các vận động viên có năm sinh nhỏ hơn năm cung cấp
  const filteredAthletes = athletes.filter((athlete) => athlete.birthYear <= parseInt(year));

  // Trả về danh sách các vận động viên được lọc
  res.json(filteredAthletes);
});
module.exports = router;
