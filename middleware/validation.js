const Joi=require("joi")

const userRegistrationSchema = Joi.object({
  id: Joi.number().integer().positive().required().label('ID'),
  username: Joi.string().required().label('Username'),
  password: Joi.string().required().min(8).label('Password'), 
  firstName: Joi.string().required().max(50).label('First Name'), 
  lastName: Joi.string().required().max(50).label('Last Name'), 
  email: Joi.string().email().regex(/^[^\s@]+@(gmail\.com|yahoo\.com)$/).required().label('Email'),
  Alternate_email:Joi.string().email().regex(/^[^\s@]+@(gmail\.com|yahoo\.com)$/).required().label('Alternate_email'),
  mobile_no: Joi.string().required().pattern(/^\d{10}$/).label('Mobile Number'), 
  Alter_mobile: Joi.string().required().pattern(/^\d{10}$/).label('Alternate Mobile Number'), 
  Gender: Joi.string().valid('Male', 'Female', 'Other').required().label('Gender'),
  Father_name: Joi.string().required().max(100).label('Father Name'), 
  Blood_group: Joi.string().required().pattern(/^([ABO][+-])$/).label('Blood Group'), 
  DOB: Joi.date().iso().max('now').required().label('Date of Birth'), 
  PAN: Joi.string().required().pattern(/^[A-Z]{5}\d{4}[A-Z]$/).label('PAN Number'), 
  company_name: Joi.string().required().max(100).label('Company Name'), 
  Role: Joi.string().required().valid('Admin', 'User', 'Manager', 'Employee').label('Role'), 
  Salary: Joi.number().required().min(0).label('Salary'), 
  Prog_lang_known:Joi.string().required().valid('js', 'java', 'phython','c','c++').label('Prog_lang_known'),
  Area_of_interest:Joi.array().items(Joi.string()).required(),
  user_qualification_id: Joi.number().integer().positive().required().label('User Qualification ID'),
  SSLC_School:Joi.string().required().max(100).label('SSLC_School Name'),
  SSLC_MARK: Joi.number().integer().positive().required().label('SSLC_MARK'),
  SSLC_PassedOut:Joi.number().integer().positive().required().label('SSLC_PassedOut year'),
  HSC_School:Joi.string().required().max(100).label('HSC_School Name'),
  HSC_MARK: Joi.number().integer().positive().required().label('HSC_MARK'),
  HSC_PassedOut:Joi.number().integer().positive().required().label('HSC_PassedOut year'),
  UG_college_name:Joi.string().required().max(100).label('UG college Name'),
  UG_Degree:Joi.string().valid('B.Tech', 'B.E', 'B.Sc', 'B.Com', 'B.A', 'BBA', 'BCA', 'Other').required().label('UG degree'),
  UG_per: Joi.number().positive().max(100).required().label('UG'), 
  PG_college_name:Joi.string().max(100).label('PG college Name'),
  PG_Degree:Joi.string().valid('M.Tech', 'M.E', 'M.Sc', 'M.Com', 'M.A', 'MBA', 'MCA', 'Other').label('UG degree'),
  PG_per: Joi.number().positive().max(100).optional().label('PG'), 
  user_address_id: Joi.number().integer().positive().required().label('User Address ID'),
  Address_line1: Joi.string().required().max(100).label('Address Line 1'), 
  Address_line2: Joi.string().required().max(100).label('Address Line 2'), 
  city: Joi.string().required().max(50).label('City'), 
  state: Joi.string().required().max(50).label('State'), 
  pincode: Joi.string().required().pattern(/^\d{6}$/).label('Pincode'), 
  country: Joi.string().required().max(50).label('Country')
});




  
function validateUserRegistration(req, res, next) {
    const { error } = userRegistrationSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
      
    }
    next();
  }

module.exports={
validateUserRegistration,

}
