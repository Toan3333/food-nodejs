// ket noi collection users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const athleteSchema = new Schema({
  name: { type: String, required: true },
  yearofbirth: { type: Number, required: true },
  competition: { type: String, required: true },
});
module.exports = mongoose.models.athletes || mongoose.model("athletes", athleteSchema);
