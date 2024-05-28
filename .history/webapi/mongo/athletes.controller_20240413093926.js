const athletesModel = require("./athletes.model");
module.exports = { getAllCategory, insertCategory, removeCategory, updateById, getCateById };
async function getAllCategory() {
  try {
    const result = await categoryModel.find();
    return result;
  } catch (error) {
    console.log("Loi lay danh muc", error);
    throw error;
  }
}
async function insertCategory(body) {
  try {
    const { name } = body;
    const categoryNew = new categoryModel({
      name,
    });
    const result = await categoryNew.save();
    return result;
  } catch (error) {
    console.log("Lỗi thêm danh mục", error);
    throw error;
  }
}

// xoa danh muc theo id
async function removeCategory(id) {
  try {
    const result = await categoryModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("Lỗi xóa danh mục theo id", error);
    throw error;
  }
}

async function getCateById(id) {
  try {
    const category = await categoryModel.findById(id);
    if (!category) {
      throw new Error("Không tìm thấy danh muc");
    }
    return category;
  } catch (error) {
    console.log("Loi", error);
    throw error;
  }
}

// // Cập nhật danh mục
// async function updateById(id, body) {
//   try {
//     const cate = categoryModel.findById(id);
//     if (!cate) {
//       throw new Error("không tìm thấy danh mục");
//     }
//     const { name, description } = body;
//     const result = await categoryModel.findByIdAndUpdate(id, { name, description }, { new: true });
//     return result;
//   } catch (error) {
//     console.log("Loi update", error);
//     throw error;
//   }
// }

// Cập nhật danh mục
async function updateById(id, body) {
  try {
    // Đảm bảo rằng đã import hoặc khởi tạo categoryModel một cách đúng đắn từ Mongoose

    // Sử dụng await để đợi kết quả truy vấn
    const cate = await categoryModel.findById(id);

    // Kiểm tra xem cate có tồn tại hay không
    if (!cate) {
      throw new Error("Không tìm thấy danh mục");
    }

    const { name, description } = body;

    // Sử dụng await để đợi kết quả truy vấn cập nhật và trả về document mới
    const result = await categoryModel.findByIdAndUpdate(id, { name, description }, { new: true });

    return result;
  } catch (error) {
    console.log("Lỗi cập nhật danh mục:", error);
    throw error;
  }
}
