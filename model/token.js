const { DataTypes, Model } = require("sequelize")
const sequelize = require("../config/database")
// const Users = require("./user")
class Tokens extends Model { }
Tokens.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
  token:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  userId:{
    type:DataTypes.INTEGER,
    allowNull:false,
  }
}, {
  sequelize,
  modelName: 'Tokens',
  freezeTableName: true,
  timestamps: false,
})


module.exports = Tokens