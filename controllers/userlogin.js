const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const Users = require("../model/user")
const Qualifications = require("../model/Qualification")
const Addresses = require("../model/address")
const errors = require("../Messages/Error")
const responses = require("../Messages/Response")
const customerrorhandle = require('../controllers/customerror')
const userlogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username } })
    if (!user) {
      // return res.status(404).json({
      //   status: errors.serverError,
      //   message: errors.notFound,
      // });
      const err = new customerrorhandle(404, errors.notFound)
      next(err)
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // return res.status(401).json({
      //   status: errors.failure,
      //   message: errors.wrongpassword
      // });
      const err = new customerrorhandle(401, errors.wrongpassword)
      next(err)
    }
    const token = jwt.sign({ userId: user.id }, 'secret_key');

    res.status(200).json({
      status: responses.success,
      message: responses.login,
      data: token,
    })

  }
  catch (error) {
    console.error(error);
    // res.status(500).json({
    //   status: errors.failure,
    //   message: error.message,
    // });
    const err = new customerrorhandle(500, error)
    next(err)
  }
}
module.exports = userlogin