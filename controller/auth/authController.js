const bcrypt = require("bcrypt");
const jwt  = require('jsonwebtoken');
const Users = require("../../model/usermodel");
const sendEmail = require("../../services/sendEmail");
const otpGenerator = require('otp-generator')

//login user
const login = async(req,res) =>{
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
}


//register user
const register = async(req,res) =>{
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
};
 
//forget password
const forgetPassword = async(req,res) =>{
  const {email} = req.body;
  if(!email){
    return res.status(400).json({
      message:"please provide me your email"
    })
  }

  const userExist = await Users.find({email:email})
  if(!userExist[0]){
    return res.status(404).json({
      message:"Email is not registered"
    })
  }
  // send otp in email 
  // const otp = Math.floor(1000 + Math.random() *9999)
  const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false ,digits:true,lowerCaseAlphabets:false});
  userExist[0].otp = otp;
  await userExist[0].save();
  sendEmail({
    email:email,
    subject:"OTP password for your restaurant",
    message:`your otp is ${otp}`
  })
  res.json({message:"otp sent on email successfully"})
} 

const verifyOtp = async(req,res) => {
  const {email,otp} = req.body;
  if(!email||!otp){
    return res.status(400).json({
      message:"please provide email or otp"
    })
  }
  const userExist = await Users.find({email:email})
  if(!userExist[0]){
    return res.status(400).json({
      message:"Email not register"
    })
  }
  if(userExist[0].otp !== otp){
      return res.status(400).json({
        message:"Invalid otp"
      })
  }
  else{
    userExist[0].isOtpVerified= true
    userExist[0].otp = undefined;
    await userExist[0].save();
    res.status(200).json({
      message:"otp verified successfully"
    })
  }

}

const resetPassword = async(req,res) => {
  const {email,newPassword,confirmPassword} = req.body;
  if(!email|| !newPassword||!confirmPassword){
    return res.status(400).json({
      message:"please provide email newpassword or confirm Password are not provided"
    })
  }
  if(newPassword !== confirmPassword){
    return res.status(400).json({
      message:"new password and confirm password are different"
    })
  }
  const userExist = await Users.find({email:email})
  if(!userExist[0]){
    return res.status(400).json({
      message:"Email not register"
    })
  }
  if(userExist[0].isOtpVerified !== true){
    res.status(403).json({
      message:"you are not verified to perform this action"
    })
  }
  userExist[0].password = bcrypt.hashSync(newPassword,10);
  userExist[0].isOtpVerified= false
  await userExist[0].save();
  res.status(200).json({
    message:"password changed successfully"
  })

}


module.exports={
    login,
    register,
    forgetPassword,
    verifyOtp,
    resetPassword

}