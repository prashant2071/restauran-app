const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const { connectDatabase } = require("./database/database");
const Users = require("./model/usermodel");
var morgan = require("morgan");
var path = require("path");
const bcrypt = require("bcrypt");
const jwt  = require('jsonwebtoken')
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// create a rotating write stream

// setup the logger
//   app.use(morgan('combined'))
app.get("/", (req, res) => {
  res.status(200).json({
    message: "form server",
  });
});
// login user
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({
            message:"please provide email and password"
        })
    }
    const user = await Users.find({email:email})
    if(!user[0]){
      return res.status(400).json({
          message:"Email or Password doesn't match"
      })
    }
    // password check
    const isMatched = bcrypt.compareSync(password,user[0].password)
    if(isMatched){
        const token = jwt.sign({id:user[0]._id},process.env.SECRET_KEY,{
            expiresIn:"120d"
        })
        res.status(200).json({
            token,
            message:'User loggin successfully'
        })
    }
    else{
        return res.status(400).json({
            message:"Email or Password doesn't match"
        })
    }
})
//create post request
app.post("/register", async (req, res) => {
  const { email, password, phoneNumber, username } = req.body;
  console.log(email, password, phoneNumber, username);
  if (!email || !password || !phoneNumber || !username) {
    return res.status(400).json({
      message: "please provide email password and phone number",
    });
  }
  const user = await Users.find({email:email})
  if(user[0]){
    return res.status(400).json({
        message:"user with email already exit"
    })
  }
  console.log(
    "=======================================",
    email,
    password,
    phoneNumber
  );
  const register = await Users.create({
    email,
    password:bcrypt.hashSync(password,10),
    phoneNumber,
    username,
  });
  res.status(201).json({
    data: register,
    message: "user create successfully",
  });
});
//listening server
app.listen(PORT, (err, done) => {
  if (err) {
    console.log("error listening at port 8080");
  } else {
    console.log("server listening at port 8080  ");
  }
});
