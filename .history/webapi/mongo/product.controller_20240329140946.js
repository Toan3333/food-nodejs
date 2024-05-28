const productModel = require("./product.model");
const categoryModel = require("./category.model");
module.exports = { insert, getAll, getProductById, getHot, getByKey, updateById, remove };

// lấy tất cả sản phẩm

// Viết api xong định nghĩa routing

async function getAll() {
  try {
    const result = await productModel.find();
    // const result = await productModel.find().limit(6).sort({ price: 1 });
    // const result = await productModel.find({}, { name: 1, price: 1, quantity: 1 });

    // select name,price,quantity where price < 3.99 or price > 4.99
    // const result = await productModel.find(
    //   {
    //     $or: [{ price: { $lt: 3.99 } }],
    //     $or: [{ price: { $gt: 4.99 } }],
    //   },
    //   { name: 1, price: 1, quantity: 1 }
    // );

    // const result = await productModel.find(
    //   {
    //     name: { $regex: "b", $options: "i" },
    //     // i không phân biệt hoa thường
    //   },
    //   { name: 1, price: 1, quantity: 1 }
    // );

    return result;
  } catch (error) {
    console.log("Loi", error);
    throw error;
  }
}

async function getProductById(productId) {
  try {
    const products = await productModel.findById(productId);
    if (!products) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    return products;
  } catch (error) {
    console.log("Loi", error);
    throw error;
  }
}

async function getHot() {
  const result = await productModel.find();
  return result;
}
async function insert(body) {
  try {
    const { name, description, image, price, quantity, category } = body;
    // tim id category
    const categoryFind = await categoryModel.findById(category);
    if (!categoryFind) {
      throw new Error("Không tìm thấy");
    }
    const proNew = new productModel({
      name,
      description,
      price,
      image,
      quantity,
      category: {
        category: {
          categoryId: categoryFind._id,
          categoryName: categoryFind.name,
        },
      },
    });
    // luu database
    const result = await proNew.save();
    return result;
  } catch (error) {
    console.log("loi", error);
    throw error;
  }
}

// lấy sản phẩm theo key
async function getByKey(key, value) {
  try {
    let pro = await productModel.findOne({ [key]: value }, "name price quantity");
    pro = {
      Masp: pro._id,
      Ten: pro.name,
      Gia: pro.price,
      Soluong: pro.quantity,
    };
    return pro;
  } catch (error) {
    console.log("Loi lay san pham theo key", error);
    throw error;
  }
}

async function updateById(id, body) {
  try {
    const pro = productModel.findById(id);
    if (!pro) {
      throw new Error("khong tim thay san pham");
    }
    const { name, price, image, quantity, description, category } = body;
    let cateFind = null;
    if (category) {
      cateFind = await categoryModel.findById(category);
      if (!cateFind) {
        throw new Error("khong tim thay danh muc");
      }
    }
    const cateUpdate = cateFind
      ? {
          categoryId: cateFind._id,
          categoryName: cateFind.name,
        }
      : pro.category;
    const result = await productModel.findByIdAndUpdate(
      id,
      { name, price, image, quantity, description, category: cateUpdate },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log("Loi update", error);
    throw error;
  }
}

// xoa sp theo id
async function remove(id) {
  try {
    const result = await productModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("Lỗi xóa sản phẩm", error);
    throw error;
  }
}
