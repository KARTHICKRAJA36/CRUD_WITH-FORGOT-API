const jwt = require("jsonwebtoken")
const Users = require("../model/user")
const Qualifications = require("../model/Qualification")
const Addresses = require("../model/address")
const errors = require("../Messages/Error")
const responses = require("../Messages/Response")
const checkuserToken = async (req, res) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: errors.failure,
      message: errors.Tokenmiss
    });
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
      status: responses.success,
      message: responses.userDataRetrieved,
      data: user, qualification, address

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: errors.failure,
      message: errors.WrongToken,
    });
  }

}
module.exports = checkuserToken
