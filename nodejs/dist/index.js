"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const matrix_routes_1 = __importDefault(require("./routes/matrix.routes"));
// import {postgresConnection, mongoConnection} from "./database/configTypeorm";
// postgresConnection.initialize()
//     .then(() => {
//         console.log("Postgree Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })
// mongoConnection.initialize()
//     .then(() => {
//         console.log("Mongodb Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use('/matrix', matrix_routes_1.default);
app.listen(PORT, function () {
    console.log(`Express server listening on port http://localhost:${PORT} and worker ${process.pid}`);
});
