// ket noi collection users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new Schema({
  name: { type: String, require: true },
  yearofbirth: { type: String, require: true },
  pass: { type: String, require: true },
  phone: { type: Number, require: true },
  role: { type: Number, require: true, default: 0 },
});
module.exports = mongoose.models.users || mongoose.model("users", userSchema);
