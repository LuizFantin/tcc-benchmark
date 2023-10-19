import postgresConnection from "../database/configTypeorm";
import { TestData } from "../database/entities/TestData";
import crypto from "crypto"

const testRepository = postgresConnection.getRepository(TestData);

const getAllTestData = () : Promise<TestData[]> => {
    return testRepository.find();
}

const create = (data: Number) : TestData => {
    const testData = new TestData()
    testData.data = data
    testData.id = crypto.randomUUID();
    testRepository.save(testData);
    return testData;
}

export default {getAllTestData, create}