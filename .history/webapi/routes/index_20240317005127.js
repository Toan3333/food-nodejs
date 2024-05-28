var express = require("express");
var router = express.Router();

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;

/* GET home page. */
// router.get("/", async (req, res) => {
//   try {
//     // const products = await Product.find();
//     // // Lấy sản phẩm hot
//     // const hotProducts = await Product.find({ categoryName: "hot" });

//     res.render("index", { products, hotProducts });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// router.get("/", async (req, res) => {
//   try {
//     const specialProducts = await Product.find({ "category.categoryName": "special" });
//     const hotProducts = await Product.find({ "category.categoryName": "hot" });
//     res.render("index", { specialProducts, hotProducts });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// router.get("/product-detail/:id", async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.render("product-detail", { product });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;
