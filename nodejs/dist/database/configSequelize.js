"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// const dbName = process.env.DB_NAME as string
// const dbUser = process.env.DB_USER as string
// const dbHost = process.env.DB_HOST
// const dbDriver = process.env.DB_DRIVER as Dialect
// const dbPassword = process.env.DB_PASSWORD
const dbName = 'api-multithread';
const dbUser = 'root';
const dbHost = 'localhost';
const dbDriver = 'postgres';
const dbPassword = 'docker';
const dbPort = 5432;
class Database {
    constructor() {
        this.init();
    }
    init() {
        this.connection = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
            host: dbHost,
            dialect: dbDriver,
            port: dbPort
        });
    }
}
const database = new Database();
exports.default = database;
