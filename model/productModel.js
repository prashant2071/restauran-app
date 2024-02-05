const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name :{
        type : String,
        required:[true,"product name is required"]
    },
    description : {
        type : String,
        required:[true,"description  is required"]
    },
    stockQty : {
        type : Number,
        required:[true," stockQty is required"]
    },  
      price : {
        type : Number,
        required:[true,"price is required"]
    },
    status : {
       type : String,
       enum : ["available","unavailable"]  
    }
})
const Products = mongoose.model("Products", userShema);
module.exports = Products;