const { Schema, model } = require("mongoose");
const productSchema = new Schema({
  productname: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: Number, required: false},
  width: { type: Number, required: false},
  weight: { type: Number, required: false},
  drill: { type: Number, required: false},
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});
const Product = model("Product", productSchema);

module.exports = Product;