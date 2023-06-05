const Users=require ("../model/user")
const Qualifications=require("../model/Qualification")
const Addresses=require("../model/address")

const userdetail=async(req,res)=>{
    try {
        const users = await Users.findAll({
          include: [
            { model: Qualifications },
            { model: Addresses}
          ]
        });
        res.json(users);
        } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
    };

   module.exports=userdetail;
