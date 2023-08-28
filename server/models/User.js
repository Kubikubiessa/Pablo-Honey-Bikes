const { Schema, model } = require("mongoose");
const roleSchema = require("./Role").schema;
 
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    role: 
      {
        type: Schema.Types.ObjectId,
        ref: 'Role',
      },
    
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
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
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
   
  }

  next();
 
});

 
 
userSchema.methods.isCorrectPassword = async function (password) {
  console.log('comparing passwords:', password, this.password);
  const result = await bcrypt.compare(password.trim(), this.password);
  console.log('comparing bcrypt.compared passwords:', password, this.password)
  console.log('password comparison result:', result);
  return result;
};

 
const User = model("User", userSchema);

module.exports = User;
