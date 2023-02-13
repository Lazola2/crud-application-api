// configure MySQL database
require("dotenv").config()
module.exports = {
    HOST: 'btonkdomiqqxrinlfjgs-mysql.services.clever-cloud.com',
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};