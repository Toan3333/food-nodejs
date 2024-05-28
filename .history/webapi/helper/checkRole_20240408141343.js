function checkRole(role) {
  return (req, res, next) => {
    // Kiểm tra xem có thông tin về vai trò của người dùng trong yêu cầu không
    if (req.user && req.user.role === role) {
      // Nếu vai trò của người dùng khớp với vai trò được yêu cầu, cho phép tiếp tục
      next();
    } else {
      // Nếu không, trả về lỗi 403 (Forbidden)
      return res.status(403).json({ message: "Bạn không có quyền truy cập vào tài nguyên này." });
    }
  };
}
module.exports = checkRole;
