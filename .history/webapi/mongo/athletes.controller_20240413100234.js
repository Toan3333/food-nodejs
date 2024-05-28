const athletesModel = require("./athletes.model");
module.exports = { getAthletesBornBefore };

async function getAthletesBornBefore(year) {
  try {
    // Tìm các vận động viên có năm sinh nhỏ hơn hoặc bằng năm được cung cấp
    const athletes = await athletesModel.find({ birthYear: { $lte: year } });
    return athletes;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách vận động viên:", error);
    throw error;
  }
}
