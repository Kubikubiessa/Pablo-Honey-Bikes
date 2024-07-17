const { Schema, model} = require('mongoose');
const categorySchema = new Schema({
    categoryname: { type: String, required: true },
    slug: { type: String, required: true},
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    brands: [{ type: Schema.Types.ObjectId, ref: 'Brand' }],
  });
  
  const Category = model('Category', categorySchema);
  module.exports = Category;