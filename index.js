const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config()

const{userRouter} = require("./routes/user.js")
const{courseRouter} = require("./routes/course.js")
const {adminRouter} = require("./routes/admin.js")

app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/admin",adminRouter);


async function main(){
   await mongoose.connect(process.env.MONGODB_URL)
   app.listen(3000)
   console.log("Listening on port 3000")

}

main()