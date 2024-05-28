// ket noi collection products
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const productSchema = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: String, require: true },
  quantity: { type: Number, require: true },
  description: { type: String, require: true },
  category: {
    type: {
      categoryId: { type: ObjectId, require: true },
      categoryName: { type: String, require: true },
    },
    require: true,
  },
});

module.exports = mongoose.models.products || mongoose.model("products", productSchema);
// Tạo model từ schema và xuất nó ra ngoài
// const Product = mongoose.model("Product", productSchema);
// module.exports = Product;
