const jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
  try {
    // doc token tu header
    const token = req.headers.authoriation.spilt(" ")[1];
  } catch (error) {
    console.log("loi check token", error);
    return res.status(500).json({ status: false, mess: error });
  }
};
