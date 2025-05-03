const  mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const Schema  = mongoose.Schema;
const ObjectId  = mongoose.Types.ObjectId
mongoose.connect(process.env.MONGODB_URL);
console.log("connected to db")

const userSchema = Schema({
    email: {
        type: String,
        unique: true,
    },
    passsword: String,
    firstName: String,
    lastName: String
})

const adminSchema = Schema({
    email: {
        type: String,
        unique: true,
    },
    passsword: String,
    firstName: String,
    lastName: String
})

const courseSchema = Schema({
title:String,
desc:String,
price:Number,
imageUrl:String,
createrId:ObjectId

})
const purchaseSchema = Schema({
userId:ObjectId,
courseId:ObjectId,

})

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,adminModel,courseModel,purchaseModel
}