var express = require("express");
var router = express.Router();
const productController = require("../mongo/product.controller");
const productModel = require("../mongo/product.model");

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
    const products = await productController.getHot();
    return res.status(200).json({ products });
  } catch (error) {
    console.log("Loi");
    return res.status(500).json({ mess: error });
  }
});

// thêm sản phẩm mới
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const result = await productController.insert(body);
    return res.status(200).json({ NewProduct: result });
  } catch (error) {
    console.log("Loi them san pham moi", error);
    res.status(500).json({ mess: "loi" });
  }
});

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

router.get("/product-detail/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productController.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product });
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
