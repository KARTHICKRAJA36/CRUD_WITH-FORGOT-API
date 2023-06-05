'use strict';
/** @type {import('sequelize-cli').Migration} */
const Qualifications = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Qualifications', {

    user_qualification_id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },

      SSLC_School:{
        type:Sequelize.STRING,
        allowNull:false
      },
      
     SSLC_MARK:{
      type:Sequelize.INTEGER,
      allowNull:false,
      
      },

      SSLC_PassedOut:{
          type:Sequelize.INTEGER,
          allowNull:false
      },

      HSC_School:{
        type:Sequelize.STRING,
        allowNull:false
      },

     HSC_MARK:{
      type:Sequelize.INTEGER,
      allowNull:false,
     },
     HSC_PassedOut:{
      type:Sequelize.INTEGER,
          allowNull:false
     },

     UG_college_name:{
      type:Sequelize.STRING,
        allowNull:false
     },
     UG_Degree:{
      type:Sequelize.ENUM('B.Tech', 'B.E', 'B.Sc', 'B.Com', 'B.A', 'BBA', 'BCA', 'Other'),
      allowNull:false
     },
     UG_per:{
      type:Sequelize.FLOAT,
      allowNull:false,
      
     },
     PG_college_name:{
      type:Sequelize.STRING,
        allowNull:true
     },
     PG_Degree:{
      type:Sequelize.STRING,
      allowNull:true
     },
     PG_per:{
      type:Sequelize.FLOAT,
      allowNull:true,
      
     }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Qualifications');
  }
};
module.exports=Qualifications