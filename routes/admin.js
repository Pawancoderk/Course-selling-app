const {Router} =  require("express")
const adminRouter = Router();
const{adminModel} = require("../db.js");
const {adminMiddleware} = require("../middlewares/admin.js")
const {z} = require("zod")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const bcrypt = require("bcrypt");

adminRouter.post("/signup",async function(req,res){
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

 await adminModel.create({
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

adminRouter.post("/signin",async function(req,res){
  const {email,password} = req.body

  try {
    const admin = await adminModel.findOne({
      email
    })
  
    if(!admin){
      res.status(403).json({
        message:"User not exists in db"
      })
      return
    }
    const isPasswordCorrect = bcrypt.compare(password,admin.password);
    if(isPasswordCorrect){
      const token = jwt.sign({
        id:admin._id
      },process.env.JWT_ADMIN_PASSWORD)
  
      res.json({
        token,
        message:"Admin Signin successfully"
      })
    }else{
      res.status(403).json({
        message:"Incorrect credintals"
      })
    }
  } catch (error) {
    
  }
})

adminRouter.post("/course",adminMiddleware,async function(req,res){

  const adminId = req.userId;
  const {title,desc,price,imageUrl}= req.body;
  
  try {
    const course = await adminModel.create({
      title:title,
      desc:desc,
      price:price,
      imageUrl:imageUrl,
      createrId:adminId
    })
    res.json({
      message:"Course created",
      courseId:course._id
  })

  } catch (error) {
    
  }

  
})

adminRouter.put("/",function(req,res){
    res.json({
      message:"Signup endpoint"
  })
})

adminRouter.get("/bulk",function(req,res){
    res.json({
      message:"Signup endpoint"
  })
})

module.exports = {
    adminRouter:adminRouter
}