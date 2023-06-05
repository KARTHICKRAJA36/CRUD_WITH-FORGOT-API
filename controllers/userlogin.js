const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const Users = require("../model/user")
const Qualifications=require("../model/Qualification")
const Addresses=require("../model/address")
const userlogin= async (req,res)=>{
    const{username,password}=req.body;
        try{
        const user=await Users.findOne({ where: { username } })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
          }
          const token = jwt.sign({ userId: user.id }, 'secret_key');

          res.json(token);

    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports=userlogin