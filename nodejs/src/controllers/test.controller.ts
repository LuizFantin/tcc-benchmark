import { Request, Response } from "express";
import { TestData } from "../database/entities/TestData";
import testRepository from "../repositories/test.repository";
import createMatrix from "../helpers/createMatrix";
import multiplyMatrix from "../helpers/multiplyMatrix";


async function getTestData (req: Request, res: Response) {
  // TODO
//   const testData = testRepository.create(123);
//   console.log(testData);
  // const testDatas = await testRepository.getAllTestData();
  // res.status(200).json({ data: testDatas});
  
  const m1 = await createMatrix(2000,2000);
  const m2 = await createMatrix(2000,2000);
  const result = await multiplyMatrix(m1, m2);
  res.status(200).json({ data: {
    m1: m1.length,
    m2: m2.length,
    result: result.length
  }});


}

export {getTestData}