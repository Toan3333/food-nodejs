const jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
  try {
    // doc token tu header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Token khong hop le");
    } else {
      // giai ma token
      // sai token, sai key, token het han
      jwt.verify(token, "anhtoan", (error, decode) => {
        if (error) {
          throw new Error("Token khong hop le");
        } else {
          //luu thong tin giai ma vao req
          req.user = decode;
          console.log("decode", decode);
          next();
        }
      });
    }
  } catch (error) {
    console.log("loi check token", error);
    return res.status(500).json({ status: false, mess: error });
  }
};
module.exports = checkToken;
