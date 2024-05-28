// ket noi collection users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new Schema({
  name: { type: String, require: true },
  yearofbirth: { type: Number, require: true },
  competition: { type: String, require: true },
});
module.exports = mongoose.models.Athletes || mongoose.model("Athletes", userSchema);
