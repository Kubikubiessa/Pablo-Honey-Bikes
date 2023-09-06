const { Schema, model } = require("mongoose");
const productSchema = require("./Product");
const orderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true  },
    quantity: { type: Number, required: true },
  });
const OrderItem = model("OrderItem", orderItemSchema);

module.exports = OrderItem;

//question about how reference product from porductSchema