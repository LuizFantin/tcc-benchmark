import { Request, Response } from "express";
import createMatrix from "../helpers/createMatrix";
import multiplyMatrix from "../helpers/multiplyMatrix";
import copyResultData from "../helpers/copyPartialResultMatrix";

import { Worker, parentPort, workerData } from 'worker_threads';
import strassenMatrixMultiply from "../helpers/strassenMultiplyMatrix";

enum matrixAlgorithms {
  STRASSEN = 'strassen',
  LINEAR_SINGLE = 'linear',
  LINEAR_MULTI = 'multi'
}

async function matrixMultiply (req: Request, res: Response) {
  const {algorithm, N} = req.query;

  if(!N){
    res.status(400).json({ error: "Invalid or missing 'N' paramater" });
    return;
  }

  const numThreads = 16;
  const matrixA = await createMatrix(Number(N),Number(N));
  const matrixB = await createMatrix(Number(N),Number(N));
  let result: number[][]

  switch (algorithm) {

    case matrixAlgorithms.LINEAR_SINGLE:
      result = await multiplyMatrix(matrixA, matrixB);
      res.json({ algorithm, result: result[0][0], m1: matrixA[0][0], m2: matrixB[0][0], memoryUsage: `${(process.memoryUsage.rss() / (1024 * 1024)).toFixed(2)} MB`});
      break;

    case matrixAlgorithms.STRASSEN:
      result = await strassenMatrixMultiply(matrixA, matrixB)
      res.json({ algorithm, result: result[0][0], m1: matrixA[0][0], m2: matrixB[0][0], memoryUsage: `${(process.memoryUsage.rss() / (1024 * 1024)).toFixed(2)} MB`});
      break;

    case matrixAlgorithms.LINEAR_MULTI:
      const chunkSize = Math.floor(matrixA.length / numThreads);
      const threads = [];

      for (let i = 0; i < numThreads; i++) {
        const start = i * chunkSize;
        const end = i === numThreads - 1 ? matrixA.length : (i + 1) * chunkSize;
        const matrixASlice = matrixA.slice(start, end);

        const worker = new Worker('./src/helpers/multiplyMatrixWorker.ts', {
          workerData: { matrixASlice, matrixB },
        });

        worker.on('message', (result) => {
          threads[i] = result;

          if (threads.filter((thread) => thread !== undefined).length === numThreads) {
            const combinedResult = threads.flatMap(innerArrays => innerArrays)
            // console.log(combinedResult)

            res.json({ algorithm, result: result[0][0], m1: matrixA[0][0], m2: matrixB[0][0], memoryUsage: `${(process.memoryUsage.rss() / (1024 * 1024)).toFixed(2)} MB`});
            worker.terminate();
          }
        });
      }
      break;
  
    default:
      res.status(400).json({ error: "Invalid or missing 'algorithm' parameter" });
      break;
  }

  
}

export {matrixMultiply}