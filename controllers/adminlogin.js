const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require("../model/User")
const Qualifications = require("../model/Qualification")
const Addresses = require("../model/address")
const errors = require("../Messages/Error")
const responses = require("../Messages/Response")
const customerrorhandle = require("../controllers/customerror")

const admindetail = async (req, res, next) => {
  const { username, password } = req.body;

  try {

    const admin = await Users.findOne({
      where: { username },
      include: [
        {
          model: Qualifications,
          attributes: ['user_qualification_id'],
        },
        {
          model: Addresses,
          attributes: ['user_address_id'],
        },
      ],
    });
    console.log(admin);

    if (!admin) {
      // return res.status(404).json({ 
      //   status:errors.failure,
      //   message:errors.notFound
      //  });
      const err = new customerrorhandle(404, errors.notFound)
      next(err)
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      // return res.status(401).json({ 
      //   status:errors.failure,
      //   message:errors.wrongpassword
      //  });
      const err = new customerrorhandle(401, errors.wrongpassword)
      next(err)
    }


    const token = jwt.sign({ adminId: admin.id }, 'your_secret_key');

    res.status(200).json({
      status: responses.success,
      message: responses.adminlog,
      data: token,
    })
  } catch (error) {
    console.error(error);
    // res.status(500).json({
    //   status:errors.failure,
    //   message:errors.adminlog,
    //   data:error.message
    // })
    const err = new customerrorhandle(500, errors.adminlog)
    next()
  }
};
module.exports = admindetail