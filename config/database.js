const Sequelize = require("sequelize")

const database = new Sequelize(process.env.MYSQL_URL, {
    dialect: "mysql"
})

module.exports = database