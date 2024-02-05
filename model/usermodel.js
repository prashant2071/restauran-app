const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userShema = new Schema({
  email: {
    type: String,
    require: [true, "Email is required"],
    unique:true
  },
  username: {
    type: String,
    require: [true, "username is required"]
  },

  phoneNumber: {
    type: Number,
    require: [true, "phone Number is required"]
  },
  password: {
    type: String,
    require: [true, "password is required"]
  },
  role: {
    type: String,
    enum: ["custumer", "admin"],
    default: "custumer"
  },
  otp : {
    type :  Number
  },
  isOtpVerified : {
    type : Boolean,
    default : false
  }

});
const Users = mongoose.model("Users", userShema);
module.exports = Users;
