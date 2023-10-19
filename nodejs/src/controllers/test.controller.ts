import { Request, Response } from "express";
import { TestData } from "../database/entities/TestData";
import testRepository from "../repositories/test.repository";


async function getTestData (req: Request, res: Response) {
  // TODO
//   const testData = testRepository.create(123);
//   console.log(testData);
  const testDatas = await testRepository.getAllTestData();
  res.status(200).json({ data: testDatas});
}

export {getTestData}