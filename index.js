const express = require("express");
const app = express();

const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config()
const port = process.env.PORT || 4000;


const{userRouter} = require("./routes/user.js")
const{courseRouter} = require("./routes/course.js")
const {adminRouter} = require("./routes/admin.js")
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/admin",adminRouter);

async function main(){
   await mongoose.connect(process.env.MONGODB_URL)
   app.listen(port,()=>{

      console.log(`App listening on ${port}`)
   })
}

main()