const athletesModel = require("./athletes.model");
module.exports = { getAll };

async function getAll(year) {
  try {
    // Lấy tất cả các vận động viên từ cơ sở dữ liệu
    const allAthletes = await athletesModel.find();

    // Lọc ra các vận động viên có năm sinh từ 2000 trở về trước
    const filteredAthletes = allAthletes.filter((athlete) => athlete.birthYear <= 2000);

    return filteredAthletes;
  } catch (error) {
    console.log("Lỗi:", error);
    throw error;
  }
}
