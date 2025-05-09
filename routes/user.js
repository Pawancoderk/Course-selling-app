const { Router } = require("express");
const { userModel } = require("../db.js")
const dotenv = require("dotenv")
dotenv.config()
const {z} = require("zod")
const bcrypt = require("bcrypt")
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user.js");
userRouter.post("/signup", async function (req, res) {

  const { email, password, firstName, lastName } = req.body;
   const requiredBody = z.object({
    email: z.string().min(3).max(20).email(),
    password: z.string(),
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20)

  })
  const parseDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parseDataWithSuccess.success) {
    res.json({
      message: "Incorrect format",
      error: parseDataWithSuccess.error
    })
    return
  }
    
  try {
   const hashedpassword = await bcrypt.hash(String(password),10)
   console.log("Hashed password:",hashedpassword );

  await userModel.create({
    email,
    password:hashedpassword,
    firstName,
    lastName
   })
   res.json({
    message: "Signup successfully"
  })
 } catch (error) {
  console.log(error)
  res.status(500).json({ message: "Signup failed", error });
 }
 
})

userRouter.post("/signin",async function (req, res) {
  const {email,password} = req.body;
 try {
  const user = await userModel.findOne({
    email,
    
  })
  console.log("done")
  if(!user){
    console.log("user")
    res.status(403).json({
      message:"User does not exist in our db"
    })
    return
  }
  const isPasswordCorrect = await bcrypt.compare(password,user.password)
  console.log(isPasswordCorrect)
  if(isPasswordCorrect){
   const token =  jwt.sign({
      id:user._id
    },process.env.JWT_USER_PASSWORD)

    res.json({
      token:token,
       message:" User Signin successfully"
    })
  }
  else{
    res.status(403).json({
      message:"Incorrect credintials"
    })
  }
 } catch (error) {
  console.error("Signin error:", error);
  res.status(500).json({ message: "Signin failed", error });
 }
  
})

userRouter.get("/purchases", userMiddleware,async function (req, res) {

  const userId = req.userId;
  const purchase = await purchaseModel.find({
    userId
  })
  res.json({
    purchase
  })
})

module.exports = {
  userRouter: userRouter
}