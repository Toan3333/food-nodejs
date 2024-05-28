const jwt = require("jsonwebtoken");

// Hàm middleware để kiểm tra vai trò của người dùng
const checkRole = () => {
  return (req, res, next) => {
    try {
      // Lấy thông tin người dùng từ đối tượng req đã được thiết lập từ middleware checkToken
      const user = req.user;

      // Kiểm tra xem người dùng có tồn tại và có vai trò phù hợp không
      if (!user || !user.role || user.role !== 1) {
        throw new Error("Không có quyền truy cập");
      } else {
        // Tiếp tục xử lý yêu cầu
        next();
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra vai trò:", error.message);
      return res.status(403).json({ status: false, message: "Không có quyền truy cập" });
    }
  };
};

module.exports = checkRole;
