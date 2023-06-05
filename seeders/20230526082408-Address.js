'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Addresses', [{
        user_address_id:1,

        Address_line1:'344,sonaipatti',
        Address_line2:'keelapongudi,sivagangai',
        city:'sivagangai',
        state:'Tamil nadu',
        pincode:"630552",
        country:'India',
        userId:1
      
        

      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Addresses', null, {});
     
  }
};
