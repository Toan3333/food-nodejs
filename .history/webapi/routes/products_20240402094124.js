var express = require("express");
var router = express.Router();
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
  if (!file.originalname.match(/\.(png|jpg|webp|gif)$/)) {
    return cb(new Error("Vui lòng tải lên một hình ảnh"));
  }
  cb(null, true);
};

// Tạo instance của multer với cấu hình đã thiết lập
const upload = multer({ storage: storage, fileFilter: checkFile });

const productController = require("../mongo/product.controller");

// http://localhost:3000/products

router.get("/", async (req, res) => {
  try {
    const products = await productController.getAll();
    return res.status(200).json({ Products: products });
  } catch (error) {
    console.log("Loi");
    return res.status(500).json({ mess: error });
  }
});

// http://localhost:3000/products/hot

router.get("/hot", async (req, res) => {
  try {
    const products = await productController.getProductHot();
    return res.status(200).json({ products });
  } catch (error) {
    console.log("Loi");
    return res.status(500).json({ mess: error });
  }
});

// thêm sản phẩm mới
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const body = req.body;
    const result = await productController.insert(body);
    return res.status(200).json({ NewProduct: result });
  } catch (error) {
    console.log("Loi them san pham moi", error);
    res.status(500).json({ mess: "loi" });
  }
});

// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     console.log("Request received:", req.body, req.file); // Log yêu cầu để xem dữ liệu nhận được từ client
//     if (!req.file) {
//       throw new Error("Vui lòng chọn một tệp tin hình ảnh");
//     }
//     const { filename } = req.file;
//     const { name, price, category } = req.body; // Lấy thông tin tên, giá và danh mục từ req.body
//     console.log("Data to insert:", { name, price, image: filename, category }); // Log dữ liệu để kiểm tra xem liệu có đúng không
//     const result = await productController.insert({ name, price, image: filename, category }); // Sử dụng tên file để lưu vào database
//     console.log("New product inserted:", result); // Log kết quả để kiểm tra xem liệu có thành công không
//     return res.status(200).json({ NewProduct: result });
//   } catch (error) {
//     console.log("Error when adding new product:", error); // Log lỗi để xác định nguyên nhân
//     res.status(500).json({ mess: "loi" });
//   }
// });

// lay san pham theo key
// http://localhost:3000/products/key/value
router.get("/:key/:value", async (req, res) => {
  try {
    const { key, value } = req.params;
    const pro = await productController.getByKey(key, value);
    return res.status(200).json({ ProductKey: pro });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mess: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productController.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// sửa sản phẩm

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const proUpdate = await productController.updateById(id, body);
    return res.status(200).json({ ProductUpdate: proUpdate });
  } catch (error) {
    console.log("loi cap nhat sp theo id", error);
    return res.status(500).json({ mess: error });
  }
});

// xoa sp theo id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const proDel = await productController.remove(id);
    return res.status(200).json({ ProductDelete: proDel });
  } catch (error) {
    console.log("loi xoa sp theo id", error);
    return res.status(500).json({ mess: error });
  }
});
module.exports = router;
