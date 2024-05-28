const usersModel = require("./users.model");
const bcript = require("bcryptjs");
module.exports = { getAllUser, register, getUserByUsername };

async function register(body) {
  try {
    // lay du lieu
    const { name, email, pass, role } = body;
    // kiem tra email da dang ky chua
    let user = await usersModel.findOne({ email: email });
    if (user) {
      throw new Error("Email đã tồn tại");
    }
    // tạo hash pass
    var salt = bcript.genSaltSync(10);
    var hash = bcript.hashSync(pass, salt);
    // tao user moi
    user = new usersModel({ name, email, pass: hash, role: role || 0 });
    //luu db
    const result = await user.save();
    return result;
  } catch (error) {
    console.log("Loi dang ky", error);
    throw error;
  }
}

async function getAllUser() {
  try {
    const result = await usersModel.find();
    return result;
  } catch (error) {
    console.log("Loi lay user", error);
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const user = await usersModel.findOne({ username: username });
    return user;
  } catch (error) {
    console.log("Lỗi lấy người dùng theo username", error);
    throw error;
  }
}

// // xoa danh muc theo id
// async function removeCategory(id) {
//   try {
//     const result = await categoryModel.findByIdAndDelete(id);
//     return result;
//   } catch (error) {
//     console.log("Lỗi xóa danh mục theo id", error);
//     throw error;
//   }
// }

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
