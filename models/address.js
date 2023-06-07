'use strict';
const {
  Model
} = require('sequelize');
const Addresses = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Addresses.init({
    Address_line1: DataTypes.STRING,
    Address_line2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    pincode: DataTypes.INTEGER,
    country: DataTypes.STRING
  });
  Addresses.associate = (models) => {
    Addresses.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Addresses;
};


module.exports = Address