const Users = require("../model/user")
const Qualifications=require("../model/Qualification")
const Addresses=require("../model/address")
class deletecontrol {
    static async deleteUserWithQualificationAndAddress(req, res) {
      try {
        const { id } = req.params;
  
        // Find the user by ID
        const user = await Users.findByPk(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        // Find the qualification by userId
        const qualification = await Qualifications.findOne({ where: { userId: id } });
        if (!qualification) {
          return res.status(404).json({ error: 'Qualification not found' });
        }
  
        // Find the address by userId
        const address = await Addresses.findOne({ where: { userId: id } });
        if (!address) {
          return res.status(404).json({ error: 'Address not found' });
        }
  
        // Delete the user, qualification, and address details of user
        await user.destroy();
        await qualification.destroy();
        await address.destroy();
  
        res.json({ message: "User's data deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  }
  
  module.exports = deletecontrol;