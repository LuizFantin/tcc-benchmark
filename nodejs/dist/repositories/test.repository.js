"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configTypeorm_1 = __importDefault(require("../database/configTypeorm"));
const TestData_1 = require("../database/entities/TestData");
const crypto_1 = __importDefault(require("crypto"));
const testRepository = configTypeorm_1.default.getRepository(TestData_1.TestData);
const getAllTestData = () => {
    return testRepository.find();
};
const create = (data) => {
    const testData = new TestData_1.TestData();
    testData.data = data;
    testData.id = crypto_1.default.randomUUID();
    testRepository.save(testData);
    return testData;
};
exports.default = { getAllTestData, create };
