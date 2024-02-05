const bcrypt = require("bcrypt")
const Users = require("./model/usermodel")

const adminSeeder = async()=>{
     // admin seeding

 // check whether admin exists or not
 const isAdminExists = await Users.findOne({email : "admin@gmail.com"}) 
 if(!isAdminExists){
    await Users.create({
        email:"admin@gmail.com",
        username:"admin",
        role:"admin",
        phoneNumber:982344211
    
     })
    
     console.log("Admin seeded successfully")
 }else{
    console.log("Admin already seeded")
 }

}



module.exports = adminSeeder