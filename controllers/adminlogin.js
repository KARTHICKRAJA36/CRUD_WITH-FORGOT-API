const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users=require("../model/user")
const Qualifications=require("../model/Qualification")
const Addresses=require("../model/address")
const errors=require("../Messages/Error")
const responses=require("../Messages/Response")

const admindetail=async (req, res) => {
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
        return res.status(404).json({ 
          status:errors.failure,
          message:errors.notFound
         });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ 
          status:errors.failure,
          message:errors.wrongpassword
         });
      }
  
      
      const token = jwt.sign({ adminId: admin.id }, 'your_secret_key'); 

      res.status(200).json({
        status:responses.success,
        message:responses.adminlog,
        data: token,
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status:errors.failure,
        message:errors.adminlog,
        data:error.message
      })
    }
  };
  module.exports=admindetail