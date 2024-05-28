// Middleware để kiểm tra vai trò của người dùng
const checkAdminRole = (req, res, next) => {
  // Kiểm tra xem vai trò của người dùng có phải là admin không
  if (req.user && req.user.role === 1) {
    // Nếu vai trò của người dùng là admin, cho phép tiếp tục
    next();
  } else {
    // Nếu không phải admin, trả về lỗi 403 (Forbidden)
    return res.status(403).json({ message: "Bạn không có quyền truy cập vào tài nguyên này." });
  }
};

module.exports = checkAdminRole;
