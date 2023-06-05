'use strict';

/** @type {import('sequelize-cli').Migration} */
const Users=require("./20230522105036-create-user")
const Qualifications=require("./20230522125712-create-qualification")
const Addresses=require("./20230522130639-create-address")
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Qualifications', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  
  
    await queryInterface.addColumn('Addresses', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Qualifications', 'userId');
    await queryInterface.removeColumn('Addresses', 'userId');
    
  },
 
};
