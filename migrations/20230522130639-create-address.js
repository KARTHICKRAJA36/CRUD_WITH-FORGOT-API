'use strict';
/** @type {import('sequelize-cli').Migration} */
const Addresses = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      user_address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      Address_line1: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      Address_line2: {
        type: Sequelize.STRING,
        allowNull: false,


      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      pincode: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      country: {
        type: Sequelize.ENUM('India', 'US', 'UK'),
        allowNull: false,


      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};
module.exports = Addresses