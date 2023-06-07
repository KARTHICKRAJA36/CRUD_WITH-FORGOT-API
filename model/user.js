const { DataTypes, Model } = require("sequelize")
const sequelize = require("../config/database")
class Users extends Model { }
Users.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Alternate_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  mobile_no: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  Alter_mobile: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  Gender: {
    type: DataTypes.ENUM('A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'),
    allowNull: false,
  },
  Father_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Blood_group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DOB: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  PAN: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Salary: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Prog_lang_known: {
    type: DataTypes.ENUM('js', 'java', 'phython', 'c', 'c++'),
    allowNull: true,
    defaultValue: null,
  },

  Area_of_interest: {
    type: DataTypes.STRING, // Multiselect field
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
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Users',
  freezeTableName: true,
  timestamps: false,
})
module.exports = Users;
