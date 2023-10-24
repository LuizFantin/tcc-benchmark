import { DataSource } from "typeorm"
import { TestDataMigration1697724093405 } from "./migrations/1697724093405-TestDataMigration";
import { TestData } from "./entities/TestData";

const postgresConnection = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "tcc",
    entities: [TestData],
    migrations: [TestDataMigration1697724093405],
})

const mongoConnection = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "test",
})

export {postgresConnection, mongoConnection};