import "reflect-metadata";

import express from 'express'

import os from "os";
import cluster from "cluster";

import testRoutes from './routes/test.routes'

import {postgresConnection, mongoConnection} from "./database/configTypeorm";

postgresConnection.initialize()
    .then(() => {
        console.log("Postgree Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

mongoConnection.initialize()
    .then(() => {
        console.log("Mongodb Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


const PORT = process.env.PORT || 3000

const app = express()

app.use('/test', testRoutes);

app.listen(PORT, function () {
  console.log(`Express server listening on port http://localhost:${PORT} and worker ${process.pid}`)
})

// const clusterWorkerSize = os.cpus().length

// if (clusterWorkerSize > 1) {
//   if (cluster.isPrimary) {
//     for (let i=0; i < clusterWorkerSize; i++) {
//       cluster.fork()
//     }

//     cluster.on("exit", function(worker) {
//       console.log("Worker", worker.id, " has exitted.")
//     })
//   } else {
//     const app = express()

//     app.listen(PORT, function () {
//       console.log(`Express server listening on port ${PORT} and worker ${process.pid}`)
//     })
//   }
// } else {
//   const app = express()

//   app.listen(PORT, function () {
//     console.log(`Express server listening on port ${PORT} with the single worker ${process.pid}`)
//   })
// }