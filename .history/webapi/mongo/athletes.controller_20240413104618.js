const Athlete = require("./athletes.model");
async function getAll() {
  try {
    const result = await Athlete.find();
    return result;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách vận động viên:", error);
    throw error;
  }
}

async function getAthletesBornBefore(year) {
  try {
    const athletes = await Athlete.find({ yearofbirth: { $lte: year } });
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
