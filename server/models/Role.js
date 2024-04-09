const { Schema, model } = require("mongoose");

const roleSchema = new Schema(
  {
    name: {
      type: String,
      
      trim: true,
    },
    scope: [
      {
        title: String,
      },
    ],

    // // set this to use virtual below
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
const Role = model("Role", roleSchema);

module.exports = Role;
