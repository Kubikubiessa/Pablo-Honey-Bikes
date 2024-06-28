const { Schema, model } = require("mongoose");

const propertySchema = new Schema({
  key: String,
  value: String,
  type: { type: String, enum: ['text', 'number', 'options'] }, // 'options' could be for dropdowns
  options: [String], // For dropdowns or similar inputs
});

const productSchema = new Schema({
  productname: String,
  price: Number,
  properties: [propertySchema],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
});

const Product = model("Product", productSchema);
module.exports = Product;



// const { Schema, model } = require("mongoose");
// const productSchema = new Schema({
//   productname: {type: String},
//   description: {type: String},
//   properties: [
//     {
//       key: String,
//       value: String,
//     },
//   ],
//   price: { type: Number, required: true }, 
//   category: { type: Schema.Types.ObjectId, ref: "Category" },
// });
// const Product = model("Product", productSchema);

// module.exports = Product;
