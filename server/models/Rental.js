const { Schema, model } = require("mongoose");
const rentalSchema = new Schema({
  rentalname: {type: String},
  properties: [
    {
      key: String,
      value: String,
    },
  ],
  price: { type: Number, required: true }, 
  
});
const Rental = model("Rental", rentalSchema);

module.exports = Rental;