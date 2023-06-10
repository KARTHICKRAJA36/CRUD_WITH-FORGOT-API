const { DataTypes, Model } = require("sequelize")
const sequelize = require("../config/database")
const Users = require("./User")
class Addresses extends Model { }
Addresses.init({
  user_address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  Address_line1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Address_line2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: "id"
    }
  }
}, {
  sequelize,
  modelName: 'Addresses',
  freezeTableName: true,
  timestamps: false,
})
Addresses.belongsTo(Users, { foreignKey: 'userId' })
Users.hasOne(Addresses, { foreignKey: 'userId' })

module.exports = Addresses