const bcrypt = require("bcrypt");
const Users = require("../model/user")
const Qualifications=require("../model/Qualification")
const Addresses=require("../model/address")
class updatecontroller{
    static async updateUserWithQualificationAndAddress(req, res) {
        try {
          const { id } = req.params;
          const {
            username,
            password,
            firstName,
            lastName,
            email,
            Alternate_email,
            mobile_no,
            Alter_mobile,
            Gender,
            Father_name,
            Blood_group,
            DOB,
            PAN,
            company_name,
            Role,
            Salary,
            Prog_lang_known,
            Area_of_interest,
            user_qualification_id, 
            SSLC_School, 
            SSLC_MARK, 
            SSLC_PassedOut, 
            HSC_School, 
            HSC_MARK, 
            HSC_PassedOut, 
            UG_college_name, 
            UG_Degree, 
            UG_per, 
            PG_college_name, 
            PG_Degree, 
            PG_per,
            user_address_id, 
            Address_line1, 
            Address_line2, 
            city, 
            state, 
            pincode, 
            country,
            
          } = req.body;
          
          
    
          // Find the user by ID
          const user = await Users.findByPk(id);
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          
          // Update the user
          await user.update({
            username,
            password:password ? await bcrypt.hash(password, 10) : user.password ,
            firstName,
            lastName,
            email,
            Alternate_email,
            mobile_no,
            Alter_mobile,
            Gender,
            Father_name,
            Blood_group,
            DOB,
            PAN,
            company_name,
            Role,
            Salary,
            Prog_lang_known,
            Area_of_interest,
            Resume :req.file ? req.file.filename : user.Resume
          });
    
          // Find the qualification by userId
          const qualification = await Qualifications.findOne({ where: { userId: id } });
          if (!qualification) {
            return res.status(404).json({ error: 'Qualification not found' });
          }
    
          // Update the qualification
          await qualification.update({
            user_qualification_id,
            SSLC_School, 
            SSLC_MARK, 
            SSLC_PassedOut, 
            HSC_School, 
            HSC_MARK, 
            HSC_PassedOut, 
            UG_college_name, 
            UG_Degree, 
            UG_per, 
            PG_college_name, 
            PG_Degree, 
            PG_per
            
          });
    
          // Find the address by userId
          const address = await Addresses.findOne({ where: { userId: id } });
          if (!address) {
            return res.status(404).json({ error: 'Address not found' });
          }
    
          // Update the address
          await address.update({
            user_address_id, 
            Address_line1, 
            Address_line2, 
            city, 
            state, 
            pincode, 
            country,
          });
    
          res.json({ message: " User's data updated successfully... " });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server error' });
        }
      }
    }
    
    

module.exports=updatecontroller