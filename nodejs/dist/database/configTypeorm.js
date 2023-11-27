"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnection = exports.postgresConnection = void 0;
const typeorm_1 = require("typeorm");
const _1697724093405_TestDataMigration_1 = require("./migrations/1697724093405-TestDataMigration");
const TestData_1 = require("./entities/TestData");
const postgresConnection = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "tcc",
    entities: [TestData_1.TestData],
    migrations: [_1697724093405_TestDataMigration_1.TestDataMigration1697724093405],
});
exports.postgresConnection = postgresConnection;
const mongoConnection = new typeorm_1.DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "test",
});
exports.mongoConnection = mongoConnection;
