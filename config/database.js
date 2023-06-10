const Sequelize = require("sequelize");
const sequelize = new Sequelize('crud_project', 'root', 'Karthick@1601', {
    host: "localhost",
    dialect: "mysql"
});


module.exports = sequelize;