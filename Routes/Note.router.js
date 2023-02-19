const express = require('express')
const {Notemodel}=require("../Model/Note.model")
const noteRouter =express.Router()
const jwt=require("jsonwebtoken")
const bodyParser = require('body-parser')
noteRouter.use(bodyParser.json())
noteRouter.get("/",async(req,res)=>{
    
try {
    const token=req.headers.authorization
    jwt.verify(token, 'masai', async(err, decoded)=> {
        // console.log("sumit",decoded) 
        if(decoded){
            const notes=await Notemodel.find({user:decoded.userID})
            res.send(notes)
        }
      }); 
       
          
    
} catch (error) {
    res.send(error.Notemodel) 
}
    
})

noteRouter.post("/create",async(req,res)=>{
    const payload = req.body
    try {
        const note= new Notemodel(payload)
        await note.save()
        res.send("note creted successfully")  
    } catch (error) {
        res.send({"msg": error.message})
    }
    
  })

  noteRouter.delete("/delete/:note_id",async(req,res)=>{
    const id =req.params.note_id
    console.log(id)
    try {
       await  Notemodel.findByIdAndDelete(id)
       res.send("note delete successfully")  
    } catch (error) {
        res.send(error.message)  
    }
    
  })

  noteRouter.patch("/update/:noteid",async(req,res)=>{
    const id =req.params.noteid
    
    console.log("sumit",req.body)
    try {
       await  Notemodel.findByIdAndUpdate(id,req.body)
       res.send("note update successfully")  
    } catch (error) {
        res.send(error.message)  
    }  
  })

  module.exports ={noteRouter}