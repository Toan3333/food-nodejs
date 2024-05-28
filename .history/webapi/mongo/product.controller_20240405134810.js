const productModel = require("./product.model");
const categoryModel = require("./category.model");
module.exports = {
  insert,
  getAll,
  getProductById,
  getProductHot,
  getByKey,
  updateById,
  remove,
  getLimitedProductsWithSortedPrice,
  getRelatedProducts,
};

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

// sắp xếp giá tăng dần và giới hạn số lượng
async function getLimitedProductsWithSortedPrice() {
  try {
    const result = await productModel
      .find(
        {
          price: { $gte: 3.99, $lte: 12.99 }, // Lấy các sản phẩm có giá từ $3.99 đến $12.99
        },
        { name: 1, price: 1, quantity: 1 }
      )
      .sort({ price: 1 }) // Sắp xếp theo giá tăng dần
      .limit(8); // Giới hạn số lượng kết quả là 5
    return result;
  } catch (error) {
    console.log(error);
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

async function getProductHot() {
  try {
    const result = await productModel.find({ "category.categoryName": "hot" });
    return result;
  } catch (error) {
    console.log("Loi", error);
    throw error;
  }
}

// thêm sản phẩm

async function insert(body) {
  try {
    const { name, image, price, category } = body;
    // Tìm id của danh mục (category)
    const categoryFind = await categoryModel.findById(category);
    if (!categoryFind) {
      throw new Error("Không tìm thấy danh mục");
    }
    // Tạo sản phẩm mới
    const newProduct = new productModel({
      name,
      price,
      image,
      category: {
        categoryId: categoryFind._id,
        categoryName: categoryFind.name, // Sửa lại thành categoryFind.name nếu trường name của category là name
      },
    });
    // Lưu vào cơ sở dữ liệu
    const result = await newProduct.save();
    return result;
  } catch (error) {
    console.log("Lỗi", error);
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

async function getRelatedProducts(currentProduct) {
  try {
    // Lấy danh mục của sản phẩm hiện đang được hiển thị
    const category = currentProduct.category.categoryName;

    // Lấy danh sách các sản phẩm cùng danh mục với sản phẩm hiện đang được hiển thị,
    // loại trừ sản phẩm hiện đang được hiển thị
    const relatedProducts = await productModel
      .find(
        {
          "category.categoryName": category,
          _id: { $ne: currentProduct._id },
        },
        { name: 1, price: 1, quantity: 1 }
      )
      .limit(5); // Giới hạn số lượng sản phẩm liên quan trả về

    return relatedProducts;
  } catch (error) {
    console.log("Lỗi khi lấy sản phẩm liên quan:", error);
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
