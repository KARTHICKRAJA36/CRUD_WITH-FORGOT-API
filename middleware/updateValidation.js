const Joi = require("joi")

const userUpdateSchema = Joi.object({
  username: Joi.string().label('Username'),
  password: Joi.string().min(8).label('Password'),
  firstName: Joi.string().max(50).label('First Name'),
  lastName: Joi.string().max(50).label('Last Name'),
  email: Joi.string().email().regex(/^[^\s@]+@(gmail\.com|yahoo\.com)$/).label('Email'),
  Alternate_email: Joi.string().email().regex(/^[^\s@]+@(gmail\.com|yahoo\.com)$/).label('Alternate_email'),
  mobile_no: Joi.string().pattern(/^\d{10}$/).label('Mobile Number'),
  Alter_mobile: Joi.string().pattern(/^\d{10}$/).label('Alternate Mobile Number'),
  Gender: Joi.string().valid('Male', 'Female', 'Other').label('Gender'),
  Father_name: Joi.string().max(100).label('Father Name'),
  Blood_group: Joi.string().pattern(/^([ABO][+-])$/).label('Blood Group'),
  DOB: Joi.date().iso().max('now').label('Date of Birth'),
  PAN: Joi.string().pattern(/^[A-Z]{5}\d{4}[A-Z]$/).label('PAN Number'),
  company_name: Joi.string().max(100).label('Company Name'),
  Role: Joi.string().valid('Admin', 'User', 'Manager', 'Employee').label('Role'),
  Salary: Joi.number().min(0).label('Salary'),
  Prog_lang_known: Joi.string().valid('js', 'java', 'phython', 'c', 'c++').label('Prog_lang_known'),
  Area_of_interest: Joi.array().items(Joi.string()),
  SSLC_School: Joi.string().max(100).label('SSLC_School Name'),
  SSLC_MARK: Joi.number().integer().positive().max(500).label('SSLC_MARK'),
  SSLC_PassedOut: Joi.number().integer().positive().label('SSLC_PassedOut year'),
  HSC_School: Joi.string().max(100).label('HSC_School Name'),
  HSC_MARK: Joi.number().integer().positive().max(1200).label('HSC_MARK'),
  HSC_PassedOut: Joi.number().integer().positive().label('HSC_PassedOut year'),
  UG_college_name: Joi.string().max(100).label('UG college Name'),
  UG_Degree: Joi.string().valid('B.Tech', 'B.E', 'B.Sc', 'B.Com', 'B.A', 'BBA', 'BCA', 'Other').label('UG degree'),
  UG_per: Joi.number().positive().max(100).label('UG per'),
  PG_college_name: Joi.string().max(100).label('PG college Name'),
  PG_Degree: Joi.string().valid('M.Tech', 'M.E', 'M.Sc', 'M.Com', 'M.A', 'MBA', 'MCA', 'Other').label('PG degree'),
  PG_per: Joi.number().positive().max(100).optional().label('PG per'),
  Address_line1: Joi.string().max(100).label('Address Line 1'),
  Address_line2: Joi.string().max(100).label('Address Line 2'),
  city: Joi.string().max(50).label('City'),
  state: Joi.string().max(50).label('State'),
  pincode: Joi.string().pattern(/^\d{6}$/).label('Pincode'),
  country: Joi.string().max(50).label('Country')
});




function validateUserUpdate(req, res, next) {
  const { error } = userUpdateSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message });

  }
  next();
}

module.exports = {
  validateUserUpdate,

}
