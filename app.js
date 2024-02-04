const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const { connectDatabase } = require("./database/database");
const Users = require("./model/usermodel");
const morgan = require("morgan");
const  path = require("path");
const authRoute = require('./routes/authRoute') 
connectDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

// setup the logger
//   app.use(morgan('combined'))
app.get("/", (req, res) => {
  res.status(200).json({
    message: "form server",
  });
});

// auth route
app.use("/api",authRoute)

//listening server
app.listen(PORT, (err, done) => {
  if (err) {
    console.log("error listening at port 8080");
  } else {
    console.log("server listening at port 8080  ");
  }
});
