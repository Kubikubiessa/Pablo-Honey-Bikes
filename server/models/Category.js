const { Schema, model} = require('mongoose');
const categorySchema = new Schema({
    categoryname: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  });
  
  const Category = model('Category', categorySchema);
  module.exports = Category;