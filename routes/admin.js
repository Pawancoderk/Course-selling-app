const {Router} =  require("express")
const adminRouter = Router();
const{adminModel} = require("../db.js")

adminRouter.post("/signup",function(req,res){
    res.json({
      message:"Signup endpoint"
  })
})

adminRouter.post("/signin",function(req,res){
  res.json({
    message:"Signup endpoint"
})
})

adminRouter.post("/",function(req,res){
    res.json({
      message:"Signup endpoint"
  })
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