const bcrypt = require("bcrypt");
const Users = require("../model/User")
const Qualifications = require("../model/Qualification")
const Addresses = require("../model/address")
const errors = require("../Messages/Error")
const responses = require("../Messages/Response")
const customerrorhandle = require('../controllers/customerror')
class usercontrol {
  static async createUserWithQualificationAndAddress(req, res, next) {
    try {
      const {
        id,
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

      console.log(req.file);



      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await Users.create({
        id,
        username,
        password: hashedPassword,
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
        Salary: parseFloat(Salary),
        Prog_lang_known,
        Area_of_interest,
        Resume: req.file ? req.file.filename : null,
      });

      const createdQualification = await Qualifications.create({
        userId: createdUser.id,
        SSLC_School,
        SSLC_MARK,
        SSLC_PassedOut,
        HSC_School,
        HSC_MARK,
        HSC_PassedOut,
        UG_college_name,
        UG_Degree,
        UG_per: parseFloat(UG_per),
        PG_college_name,
        PG_Degree,
        PG_per: parseFloat(PG_per),
      });

      const createdAddress = await Addresses.create({
        userId: createdUser.id,
        Address_line1,
        Address_line2,
        city,
        state,
        pincode,
        country
      });

      res.status(200).json({
        status: responses.success,
        message: responses.useradd,
        data: createdUser, createdQualification, createdAddress
      });
    } catch (error) {
      console.error(error);
      // res.status(500).json({
      //   status: errors.failure,
      //   message: error.message,
      // });
      const err = new customerrorhandle(500, error)
      next(err)
    }
  }
}

module.exports = usercontrol