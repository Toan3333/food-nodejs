function checkRole(role) {
  return (req, res, next) => {
    try {
      // Kiểm tra vai trò của người dùng từ req.user (giả sử người dùng đã được xác thực và thông tin của họ được lưu trong req.user)
      const userRole = req.user.role;

      // Kiểm tra xem vai trò của người dùng có khớp với vai trò được yêu cầu không
      if (userRole === role) {
        // Nếu khớp, cho phép tiếp tục xử lý yêu cầu
        next();
      } else {
        // Nếu không khớp, trả về lỗi 403 (Forbidden)
        return res.status(403).json({ message: "Bạn không có quyền truy cập vào tài nguyên này." });
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Lỗi xác thực vai trò người dùng:", error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  };
}

module.exports = checkRole;
