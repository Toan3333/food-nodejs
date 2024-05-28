const multer = require("multer");
// Thiết lập storage engine cho multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images"); // Thư mục lưu trữ hình ảnh
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Sử dụng tên gốc của file
  },
});

// Middleware để kiểm tra loại file
const checkFile = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg|webp|gif|jpeg)$/)) {
    return cb(new Error("Vui lòng tải lên một hình ảnh"));
  }
  cb(null, true);
};

// Tạo instance của multer với cấu hình đã thiết lập
module.exports = multer({ storage: storage, fileFilter: checkFile });
