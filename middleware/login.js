const jswn=require("jsonwebtoken");
let checktoken =(req,res,next)=>{
    const token=req.headers["authorization"];
    if(token){
        jswn.verify(token,'your_secret_key',(err,decoded)=>{
            if(err){
                res.status(401).send({message:"Wrongtoken"});
                return;
            }
            else{
                req.id=decoded.id
                next();
            }
            
            
        })
        
    }
}
module.exports=checktoken;
