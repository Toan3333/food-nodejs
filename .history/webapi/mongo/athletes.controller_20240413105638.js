const athleteModel = require("./athletes.model");
async function getAll() {
  try {
    const result = await athleteModel.find();
    return result;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách vận động viên:", error);
    throw error;
  }
}

async function getAthletesBornBefore() {
  try {
    const athletes = await athleteModel.find({ yearofbirth: { $lte: 2000 } });
    return athletes;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách vận động viên:", error);
    throw error;
  }
}

module.exports = {
  getAthletesBornBefore,
  getAll,
};
