const bcrypt = require("bcrypt");
const Users = require("../model/User")
const Qualifications = require("../model/Qualification")
const Addresses = require("../model/address")
const errors = require("../Messages/Error")
const responses = require("../Messages/Response")
const customerrorhandle = require("../controllers/customerror")
class updatecontroller {
  static async updateUserWithQualificationAndAddress(req, res, next) {
    try {
      const { id } = req.params;
      const {
        username,
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
        Address_line1,
        Address_line2,
        city,
        state,
        pincode,
        country,

      } = req.body;

      if(req.body.password){
        const err=new customerrorhandle(400,"you can't able to update password")
        next(err)
      }

      // Find the user by ID
      const user = await Users.findByPk(id);
      if (!user) {
        const err = new customerrorhandle(404, errors.notFound)
        next(err)
      }

      // Update the user
      await user.update({
        username,
        // password: password ? await bcrypt.hash(password, 10) : user.password,
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
        Resume: req.file ? req.file.filename : user.Resume
      });

      // Find the qualification by userId
      const qualification = await Qualifications.findOne({ where: { userId: id } });
      if (!qualification) {
        const err = new customerrorhandle(404, errors.notFound)
        next(err)
      }

      // Update the qualification
      await qualification.update({
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
        const err = new customerrorhandle(404, errors.notFound)
        next(err)
      }

      // Update the address
      await address.update({
        Address_line1,
        Address_line2,
        city,
        state,
        pincode,
        country,
      });


      res.status(200).json({
        status: responses.success,
        message: 'Users data updated successfully',
        data: user, qualification, address

      });
    } catch (error) {
      console.error(error);
      const err = new customerrorhandle(404, error)
      next(err)
    }
  }
}



module.exports = updatecontroller