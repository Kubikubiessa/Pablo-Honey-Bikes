const { Schema, model } = require("mongoose");
const productSchema = new Schema({
  productname: {type: String},
  properties: [
    {
      key: String,
      value: String,
    },
  ],
  price: { type: Number, required: true }, 
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});
const Product = model("Product", productSchema);

module.exports = Product;
