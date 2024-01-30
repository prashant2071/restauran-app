const mongoose = require("mongoose")
const MONGO_URI = process.env.MONGO_URI 

 exports.connectDatabase = async () =>{
  try{
    await mongoose.connect("mongodb+srv://restaurant:restaurant@cluster0.nvhwvss.mongodb.net/?retryWrites=true&w=majority").then(()=>{
      console.log("databse connected successfully")
    })
  }
  catch(err){
    console.log("failed to connect to database ",err)
  }
}
