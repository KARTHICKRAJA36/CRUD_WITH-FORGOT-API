'use strict';
const bcrypt=require("bcrypt")

/** @type {import('sequelize-cli').Migration} */
const Users= {
  async up (queryInterface, Sequelize) {
    
try{
     
     await queryInterface.bulkInsert('Users', [{
      id:1,
      username:'admin',
      password: await bcrypt.hash('Karthick@1601',10),
      firstName:'Karthick',
      lastName:'raja',
      email:'karthick@gmail.com',
      Alternate_email:'krthick36@gmail.com',
      mobile_no:9715976818,
      Alter_mobile:9008709876,
      Gender:'male',
      Father_name:'v.kannan',
      Blood_group:'A+',
      DOB:"2001-01-16",
      PAN:"KNSWB2345J",
      company_name:'novastrid',
      Role:'Admin',
      Salary:8000,
      Prog_lang_known:'js',
      Area_of_interest:'devlopment,testing'
      
     

       
      }], {});
  }catch (error) {
    console.error('Error while seeding Users:', error);
  }
  
    
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
module.exports=Users;
