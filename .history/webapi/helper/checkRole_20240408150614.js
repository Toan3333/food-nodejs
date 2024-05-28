// helper/checkRole.js

const checkRole = (role) => {
  return (req, res, next) => {
    // Kiểm tra xem vai trò của người dùng có phù hợp không
    if (req.user && req.user.role === role) {
      // Nếu phù hợp, cho phép tiếp tục
      next();
    } else {
      // Nếu không, trả về lỗi 403 (Forbidden)
      return res.status(403).json({ message: "Bạn không có quyền truy cập vào tài nguyên này." });
    }
  };
};

module.exports = checkRole;
