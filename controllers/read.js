const Users = require("../model/user")
const Qualifications = require("../model/Qualification")
const Addresses = require("../model/address")
const errors = require("../Messages/Error")
const responses = require("../Messages/Response")

const userdetail = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [
        { model: Qualifications },
        { model: Addresses }
      ]
    });

    res.status(200).json({
      status: responses.success,
      message: responses.usersRetrieved,
      data: users,
    });
  }
  catch (error) {
    console.error(error);

    res.status(500).json({
      status: errors.serverError,
      message: error,
    });
  }
};

module.exports = userdetail;
