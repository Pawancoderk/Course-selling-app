const {Router} = require("express");
const { userMiddleware } = require("../middlewares/user");
const { purchaseModel, courseModel } = require("../db");
const courseRouter = Router()


courseRouter.post("/purchase",userMiddleware,async function(req,res){

  const userId = req.userId;
  const courseId = req.body.courseId

  try {
    await purchaseModel.create({
      userId,
      courseId
    })
    res.json({
      message:"You have successfully bought the course"
  })
  } catch (error) {
    
  }
   
})

courseRouter.get("/preview",async function(req,res){

 const course = await  courseModel.find({})
    res.json({
      course
  })
})

module.exports = {
    courseRouter:courseRouter
}