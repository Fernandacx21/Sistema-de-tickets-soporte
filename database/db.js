const { Sequelize } = require('sequelize');
const  database  = require('./config');

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: database.dialect,
        logging: false,
        port: database.port,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
);

module.exports = sequelize;