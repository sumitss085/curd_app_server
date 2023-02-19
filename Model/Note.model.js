const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


const NoteSchema = mongoose.Schema({
  title:{type:String, required:true},
  body:{type:String, required:true},
  user:{type:String, required:true},
  
})

const Notemodel = mongoose.model("Note",NoteSchema)

module.exports = {Notemodel}