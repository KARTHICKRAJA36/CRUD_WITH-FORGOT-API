'use strict';
const {
  Model
} = require('sequelize');
const address=require("./address")
const Qualification = require('./qualification');
const Users = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      
    }
  });
  Users.associate = (models) => {
    Users.hasMany(models.Qualification, { foreignKey: 'userId' });
  };
  Users.associate = (models) => {
    Users.hasMany(models.Address, { foreignKey: 'userId' });
  };


  return User;

};
module.exports=Users
