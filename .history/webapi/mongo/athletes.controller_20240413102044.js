const Athlete = require("./athletes.model");

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
};
