const jwt = require("jsonwebtoken");
const Users = require("../model/usermodel");

const isAuthenticated = async(req, res, next) => {
  console.log("hello this is from authenticated");
  const token = req.headers.authorization;
  console.log(req.headers)
  console.log("toke is ",token)
  if (!token) {
      return res.status(400).json({
      message: "please send token",
    });
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(400).json({
        message: "Invalid token",
    });
}
else{
    try{
        const userExist = await Users.findOne({_id:user.id})
        if(!userExist){
            return res.status(400).json({
                message : "User doesn't exist with that token/id"
            })
        }
            req.user = userExist;
            next()
    }
    catch(err){
        console.log("the error is ",err)
    }

    }
  });
  
//   const result = await promisify()
//   next();
};
module.exports = isAuthenticated;
