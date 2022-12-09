const express = require('express')
const app = express()
const jwt = require("jsonwebtoken")
const secretkey = "secretkey";
app.get('/',(req,res)=>{
    res.send("welcome to jwt web token tutorial basic")
})
//login api
app.post("/login",(req,res)=>{
    const user = {
        id:1,
        username:"apple",
        email:"ab@c.com"
    }
    jwt.sign({user},secretkey,{expiresIn:'500s'},(err,token)=>{ //syntax line
res.json({
    token
})
    })
})
app.post("/profile",verifyToken,(req,res)=>{
//verify token
jwt.verify(req.token,secretkey,(err,authdata)=>{
    if (err) {
        res.send({result:"invalid token"})
    } else {
        res.json({message:"profile accessed",
    authdata
    })
    }
})
})
function verifyToken(req,res,next){
    //to get token
   const bearerheader = req.headers['authorization'];
   if(typeof bearerHeader !== 'undefined'){
const  bearer = bearerheader.split(" ");
const token = bearer[1];
req.token= token;
next();
   }else{
    res.send({result:"Token is not valid"})
   }
}
app.listen(3001,()=>{
    console.log('running at port 3001')
});