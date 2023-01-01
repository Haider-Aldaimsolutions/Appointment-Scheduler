const jwt = require('jsonwebtoken');
require("dotenv").config();


const authMiddleware = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.JWTSECRET,(err,decodedToken)=>{
            if(err){
                res.status(400).json({error:"Token not valid"})
            }
            else{
                console.log(decodedToken,"docodedToken");
                next();
            }
        })
    }
    else{
        res.status(400).json({error:'Unauthorized attempt'})
    }
}
module.exports = {authMiddleware};