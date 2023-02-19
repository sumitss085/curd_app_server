const express =require('express');
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');
const {Usermodel}=require ("../Model/User.model")
const userRouter =express.Router()

userRouter.post("/register",async (req, res)=>{
  const {name,email,pass} = req.body
  console.log(req.body)
  try {
    bcrypt.hash(pass, 5, async(err, hash) =>{
        // Store hash in your password DB.
        if(err){
            res.send({"msg":"something went wrong","err": err})
        }
        else{
            const user =new Usermodel({name,email,pass:hash})
            await user.save()
            res.send({"msg":"new user has been registered"})
        }
    });
      
  } catch (error) {
    res.send({"msg":"something went wrong","err": error.message})
  }
 
})

userRouter.post("/login", async(req, res)=>{
    const {email,pass} = req.body
    try {
        const user =await Usermodel.find({email})
        
        if(user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) =>{
              if(result){
                const token=jwt.sign({userID:user[0]._id},"masai")
                
                res.send({"msg":"logged in","token":token})
              }
              else{
                res.send({"msg":"something went wrong","err": err})
              }
            });
            
            
        }
        else{
            res.send({"msg":"wrong credential"})
        }
    } catch (error) {
        res.send({"msg":"something went wrong","err": error.message})
    }
   
  })

  module.exports = {userRouter}