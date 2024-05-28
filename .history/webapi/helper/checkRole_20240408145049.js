function checkRole(req, res, next) {
  // Kiểm tra xem có thông tin về vai trò của người dùng trong yêu cầu không
  if (req.user && req.user.role === 1) {
    // Nếu vai trò của người dùng là admin (role === 1), cho phép tiếp tục
    next();
  } else {
    // Nếu không, trả về lỗi 403 (Forbidden)
    return res.status(403).json({ message: "Bạn không có quyền truy cập vào tài nguyên này." });
  }
}

module.exports = checkRole;
