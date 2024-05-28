var express = require("express");
var router = express.Router();
const athletesController = require("../mongo/athletes.controller");

router.get("/list", async (req, res) => {
  try {
    const users = await athletesController.getAthletesBornBefore();
    return res.status(200).json({ Users: users });
  } catch (error) {
    console.log("Loi");
    return res.status(500).json({ mess: error });
  }
});
module.exports = router;
