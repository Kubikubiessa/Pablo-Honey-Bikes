const { Schema, model } = require("mongoose");
const OrderItem = require("./OrderItem"); // Import the OrderItem model/schema


const orderSchema = new Schema({
    items: [
        {
          product: { type: Schema.Types.ObjectId, ref: 'OrderItem', required: true },
          productname: String,
          quantity: { type: Number, required: true }
        }
      ],
     
    total: { type: Number, required: true },
    status: { type: String, enum: ['CREATED', 'PROCESSING', 'COMPLETED', 'CANCELLED'], default: 'CREATED' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
const Order = model("Order", orderSchema);

module.exports = Order;