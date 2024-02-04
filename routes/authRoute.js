const { login, register, forgetPassword, verifyOtp, resetPassword } = require("../controller/auth/authController");
const router  = require("express").Router();

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/forgetpassword").post(forgetPassword)
router.route("/verifyotp").post(verifyOtp)
router.route("/resetpassword").post(resetPassword)




module.exports = router;