const express=require("express")
const app=express()
const Database=require("./config/database")
//const user=require("./model/user")
const bodyParser=require("body-parser")

app.use(express.json());
app.use(bodyParser.json());

const router=require("./router/router")

app.use(router)

app.listen(3300,()=>{
    console.log("port running at 3300...");
})
