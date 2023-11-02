import "reflect-metadata";

import express from 'express'

import os from "os";
import cluster from "cluster";

import matrixRoutes from './routes/matrix.routes'

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


const PORT = process.env.PORT || 3000

const app = express()

app.use('/matrix', matrixRoutes);

app.listen(PORT, function () {
  console.log(`Express server listening on port http://localhost:${PORT} and worker ${process.pid}`)
})