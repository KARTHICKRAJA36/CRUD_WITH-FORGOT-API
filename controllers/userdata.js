const jwt=require("jsonwebtoken")
const Users = require("../model/user")
const Qualifications=require("../model/Qualification")
const Addresses=require("../model/address")
const checkuserToken= async (req,res)=>{
    
        const token = req.headers.authorization;
      
        if (!token) {
          return res.status(401).json({ message: 'Missing token' });
        }
      
        try {
          // token verification
          const decoded = jwt.verify(token, 'secret_key');
          const userId = decoded.userId;
      
          //  user's details retrieve
          const user = await Users.findByPk(userId);
          const qualification = await Qualifications.findOne({ where: { userId: user.id } });
          const address = await Addresses.findOne({ where: { userId: user.id } });
      
          
          res.json({
            user,qualification,address

          });
        } catch (error) {
          console.error(error);
          res.status(401).json({ message: 'Invalid token' });
        }
      
}
module.exports=checkuserToken
