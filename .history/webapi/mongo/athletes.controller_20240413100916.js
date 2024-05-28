const athletesModel = require("./athletes.model");
module.exports = { getAthletesBornBefore };

async function getAthletesBornBefore(year) {
  try {
    const athletes = await athletesModel.find({ yearofbirth: { $lte: year } });
    return athletes;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách vận động viên:", error);
    throw error;
  }
}
