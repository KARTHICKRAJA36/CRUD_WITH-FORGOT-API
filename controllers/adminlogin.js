const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users=require("../model/user")
const Qualifications=require("../model/Qualification")
const Addresses=require("../model/address")
const admindetail=async (req, res) => {
    const { email, password } = req.body;
  
    try {
      
      const admin = await Users.findOne({
        where: { email },
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
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      
      const token = jwt.sign({ adminId: admin.id }, 'your_secret_key'); 
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  module.exports=admindetail