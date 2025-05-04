const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token,process.env.JWT_USER_PASSWORD)

    if(decoded){
        req.uesrId = decoded.id;
        next();
    }else{
        res.status(403).json({
            message:"You are not sign in "
        })
    }

}

module.exports = {
    userMiddleware:userMiddleware
}