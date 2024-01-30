const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userShema = new Schema({
  email: {
    type: String,
    require: [true, "Email is required"]
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
  }
});
const Users = mongoose.model("Users", userShema);
module.exports = Users;
