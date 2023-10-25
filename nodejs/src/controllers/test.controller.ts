import { Request, Response } from "express";
import { TestData } from "../database/entities/TestData";
import testRepository from "../repositories/test.repository";
import createMatrix from "../helpers/createMatrix";
import multiplyMatrix from "../helpers/multiplyMatrix";
import copyResultData from "../helpers/copyPartialResultMatrix";

import { Worker, parentPort, workerData } from 'worker_threads';


async function getTestData (req: Request, res: Response) {
  //? Database repository use
  //   const testData = testRepository.create(123);
//   console.log(testData);
  // const testDatas = await testRepository.getAllTestData();
  // res.status(200).json({ data: testDatas});

  //? SINGLE THREAD
  // const m1 = await createMatrix(2000,2000);
  // const m2 = await createMatrix(2000,2000);
  // const result = await multiplyMatrix(m1, m2);
  // res.status(200).json({ data: {
  //   m1: m1.length,
  //   m2: m2.length,
  //   result: result.length
  // }});

  const isMultithread = true;

  //? MULTI THREAD
  const numThreads = 4;
  const N = 1000;
  const matrixA = await createMatrix(N,N);
  const matrixB = await createMatrix(N,N);

  if(!isMultithread){
    res.json({ result: await multiplyMatrix(matrixA, matrixB) });
    return
  }
  
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

        res.json({ result: combinedResult[0][0] });
        worker.terminate();
      }
    });
  }
}

export {getTestData}