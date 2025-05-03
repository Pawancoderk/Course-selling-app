const  mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const Schema  = mongoose.Schema;
const ObjectId  = mongoose.Types.ObjectId


const userSchema = new  Schema({
    email: {
        type: String,
        unique: true,
    },
    passsword: String,
    firstName: String,
    lastName: String
})

const adminSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    passsword: String,
    firstName: String,
    lastName: String
})

const courseSchema = new Schema({
title:String,
desc:String,
price:Number,
imageUrl:String,
createrId:ObjectId

})
const purchaseSchema = new Schema({
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