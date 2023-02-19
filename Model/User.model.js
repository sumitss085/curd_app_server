const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const UserSchema = mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String, required:true},
  pass:{type:String, required:true},
  
})

const Usermodel = mongoose.model("User",UserSchema)

module.exports = {Usermodel}