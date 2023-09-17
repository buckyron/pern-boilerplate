const { Sequelize, Model, DataTypes } = require("sequelize");
const logger = require('../logger/logger');

const connect = () => {

    const hostName = process.env.DB_HOSTNAME;
    const userName = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_DATABASE;
    const dialect = process.env.DB_DIALECT;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect: dialect,
        operatorsAliases: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.company = require("../model/company-model")(sequelize, DataTypes, Model);
    db.user    = require("../model/app-user-model")(sequelize, DataTypes, Model);

    return db;

}

module.exports = {
    connect
}