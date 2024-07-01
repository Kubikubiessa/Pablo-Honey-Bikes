const { Schema, model} = require('mongoose');
const brandSchema = new Schema({
    brandname: { type: String, required: true },
    imageUrl: { type: String, default: '/images/default-brand.jpg' }, 
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  });
  
  const Brand = model('Brand', brandSchema);
  module.exports = Brand;