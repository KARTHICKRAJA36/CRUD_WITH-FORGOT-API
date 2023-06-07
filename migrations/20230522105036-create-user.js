'use strict';
/** @type {import('sequelize-cli').Migration} */
const qualification = require("./20230522125712-create-qualification")
const address = require("./20230522130639-create-address")

const Users = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,



      },
      Alternate_email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true,
        unique: true


      },
      mobile_no: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true

      },
      Alter_mobile: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true

      },
      Gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other'),
        allowNull: false,


      },
      Father_name: {
        type: Sequelize.STRING,
        allowNull: false,


      },
      Blood_group: {
        type: Sequelize.ENUM('A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'),
        allowNull: false,


      },
      DOB: {
        type: Sequelize.DATE,
        allowNull: false,


      },
      PAN: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true

      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      Role: {
        type: Sequelize.STRING,
        allowNull: false,


      },
      Salary: {
        type: Sequelize.FLOAT,
        allowNull: false,

      },

      Prog_lang_known: {
        type: Sequelize.ENUM('js', 'java', 'phython', 'c', 'c++'),
        allowNull: true,
        defaultValue: null,
      },

      Area_of_interest: {
        type: Sequelize.STRING, // Multiselect field
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('Area_of_interest');
          return rawValue ? rawValue.split(',') : [];
        },
        set(value) {
          this.setDataValue('Area_of_interest', value.join(','));
        },
      },


      Resume: {
        type: Sequelize.STRING,
        allowNull: true,
      }



    })

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};

module.exports = Users;
