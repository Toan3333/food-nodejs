const athletesModel = require("./athletes.model");
module.exports = { getAll };

async function getAll() {
  try {
    const result = await productModel.find();
    return result;
  } catch (error) {
    console.log("Loi", error);
    throw error;
  }
}