const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const Users = require("../model/user")
const Qualifications = require("../model/Qualification")
const Addresses = require("../model/address")
const errors = require("../Messages/Error")
const responses = require("../Messages/Response")
const userlogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username } })
    if (!user) {
      return res.status(404).json({
        status: errors.serverError,
        message: errors.notFound,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        status: errors.failure,
        message: errors.wrongpassword
      });
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
    res.status(500).json({
      status: errors.failure,
      message: error.message,
    });
  }
}
module.exports = userlogin