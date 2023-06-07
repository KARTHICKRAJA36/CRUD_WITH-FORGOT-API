const Sequelize = require("sequelize");
const sequelize = new Sequelize('crud_project', 'root', 'Karthick@1601', {
    host: "localhost",
    dialect: "mysql"
});
sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log("error:" + err);
    })


module.exports = sequelize;