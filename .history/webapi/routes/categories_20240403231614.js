var express = require("express");
var router = express.Router();
const categoryController = require("../mongo/category.controller");

// http://localhost:3000/categories

router.get("/", async (req, res) => {
  try {
    const category = await categoryController.getAllCategory();
    return res.status(200).json({ Category: category });
  } catch (error) {
    console.log("Loi");
    return res.status(500).json({ mess: error });
  }
});

// thêm danh mục mới
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const result = await categoryController.insertCategory(body);
    return res.status(200).json({ NewCategory: result });
  } catch (error) {
    console.log("Loi them san pham moi", error);
    res.status(500).json({ mess: "loi" });
  }
});

// Xóa danh mục theo _id

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const categoryDel = await categoryController.removeCategory(id);
    return res.status(200).json({ CategoryDelete: categoryDel });
  } catch (error) {
    console.log("Lỗi xóa danh mục", error);
    res.status(500).json({ mess: "loi" });
  }
});

// sửa danh mục
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const cateUpdate = await categoryController.updateById(id, body);
    return res.status(200).json({ CateUpdate: cateUpdate });
  } catch (error) {
    console.log("loi cap nhat sp theo id", error);
    return res.status(500).json({ mess: error });
  }
});

module.exports = router;
