
const express = require('express')
const {connection}=require("./Config/db")
const {userRouter} =require("./Routes/User.router")
const {noteRouter}=require("./Routes/Note.router")
const authenticate =require("../Backend/Middleware/authneticate.middleware")
const cors =require("cors")
require('dotenv').config()
const bodyParser = require('body-parser');


 


const app = express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("welcomre to gome page")

})

app.use("/user",userRouter)
app.use(authenticate)
app.use(bodyParser.json());
app.use("/note",noteRouter)


app.listen(process.env.PORT,async()=>{
try {
    await connection
    console.log(`server listening on port ${process.env.PORT}`)
    console.log("Connecting to DB")
} catch (error) {
    console.log(error)
}
})