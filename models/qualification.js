'use strict';
const {
  Model
} = require("sequelize");
const Qualifications = (sequelize, DataTypes) => {
  class Qualifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Qualifications.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  });
  Qualifications.associate = (models) => {
    Qualifications.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Qualifications;
};

module.exports = Qualifications



