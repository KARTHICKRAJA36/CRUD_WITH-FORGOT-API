const {DataTypes,Model}= require("sequelize")
const sequelize=require("../config/database")
const Users=require("./user")
class Qualifications extends Model{}
 Qualifications.init({
    user_qualification_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
      },
      SSLC_School:{
        type:DataTypes.STRING,
        allowNull:false
      },
       SSLC_MARK:{
        type:DataTypes.INTEGER,
        allowNull:false,
        },
        SSLC_PassedOut:{
          type:DataTypes.INTEGER,
          allowNull:false
      },
      HSC_School:{
        type:DataTypes.STRING,
        allowNull:false
      },
       HSC_MARK:{
        type:DataTypes.INTEGER,
        allowNull:false, 
       },
       HSC_PassedOut:{
        type:DataTypes.INTEGER,
            allowNull:false
       },
       UG_college_name:{
        type:DataTypes.STRING,
          allowNull:false
       },
       UG_Degree:{
        type:DataTypes.ENUM('B.Tech', 'B.E', 'B.Sc', 'B.Com', 'B.A', 'BBA', 'BCA', 'Other'),
        allowNull:false
       },
       UG_per:{
        type:DataTypes.FLOAT,
        allowNull:false,
       },
       PG_college_name:{
        type:DataTypes.STRING,
          allowNull:true
       },
       PG_Degree:{
        type:DataTypes.STRING,
        allowNull:true
       },
       PG_per:{
        type:DataTypes.FLOAT,
        allowNull:true,
       },
       userId:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references:{
            model:'Users',
            key:"id"
        }
    }

  
 },
 {
    sequelize,
    modelName: 'Qualifications',
    freezeTableName: true,
    timestamps: false,
  })
Qualifications.belongsTo(Users,{ foreignKey: 'userId' })
Users.hasOne(Qualifications,{ foreignKey: 'userId' })

 module.exports=Qualifications