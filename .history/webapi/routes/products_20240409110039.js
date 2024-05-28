var express = require("express");
var router = express.Router();
const upload = require("../helper/upload");
const checktoken = require("../helper/checktoken");
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

// http://localhost:3000/products/related/id
//  sản phẩm liên quan
router.get("/related/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    // Lấy thông tin của sản phẩm hiện đang được hiển thị
    const currentProduct = await productController.getProductById(productId);
    // Kiểm tra xem sản phẩm hiện đang được hiển thị có tồn tại không
    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Lấy danh sách các sản phẩm liên quan
    const relatedProducts = await productController.getRelatedProducts(currentProduct);

    // Trả về kết quả
    return res.status(200).json({ RelatedProducts: relatedProducts });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/sort-price", async (req, res) => {
  try {
    const result = await productController.getLimitedProductsWithSortedPrice();
    return res.status(200).json(result);
  } catch (error) {
    console.log("Loi");
  }
});

// http://localhost:3000/products/hot

router.get("/hot", , async (req, res) => {
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
    body.image = req.file.originalname;
    const result = await productController.insert(body);
    return res.status(200).json({ NewProduct: result });
  } catch (error) {
    console.log("Loi them san pham moi", error);
    res.status(500).json({ mess: "loi" });
  }
});

// Định nghĩa route API để tìm kiếm sản phẩm dựa trên từ khóa
// http://localhost:3000/products/search?keyword=bbq
router.get("/search", async (req, res) => {
  try {
    // Lấy từ khóa tìm kiếm từ query string
    const keyword = req.query.keyword;
    // Kiểm tra xem từ khóa có tồn tại không
    if (!keyword) {
      return res.status(400).json({ message: "Missing keyword parameter" });
    }

    // Gọi hàm tìm kiếm sản phẩm từ controller
    const searchResults = await productController.searchProducts(keyword);

    // Trả về kết quả tìm kiếm
    return res.status(200).json(searchResults);
  } catch (error) {
    console.log("Error searching products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
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

// Trong router.put("/:id", upload.single("image"), ...) của bạn
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    body.image = req.file.originalname;

    // Gọi hàm cập nhật sản phẩm từ controller và truyền vào id và body
    const proUpdate = await productController.updateById(id, body);
    // Trả về kết quả cập nhật sản phẩm
    return res.status(200).json({ ProductUpdate: proUpdate });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.log("Lỗi cập nhật sản phẩm theo id", error);
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
