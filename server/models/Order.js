const { Schema, model } = require("mongoose");
const orderSchema = new Schema({
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: ['CREATED', 'PROCESSING', 'COMPLETED', 'CANCELLED'], default: 'CREATED' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
const Order = model("Order", orderSchema);

module.exports = Order;