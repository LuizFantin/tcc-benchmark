"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matrixMultiply = void 0;
const createMatrix_1 = __importDefault(require("../helpers/createMatrix"));
const multiplyMatrix_1 = __importDefault(require("../helpers/multiplyMatrix"));
const worker_threads_1 = require("worker_threads");
const strassenMultiplyMatrix_1 = __importDefault(require("../helpers/strassenMultiplyMatrix"));
var matrixAlgorithms;
(function (matrixAlgorithms) {
    matrixAlgorithms["STRASSEN"] = "strassen";
    matrixAlgorithms["LINEAR_SINGLE"] = "linear";
    matrixAlgorithms["LINEAR_MULTI"] = "multi";
})(matrixAlgorithms || (matrixAlgorithms = {}));
async function matrixMultiply(req, res) {
    const { algorithm, N } = req.query;
    if (!N) {
        res.status(400).json({ error: "Invalid or missing 'N' paramater" });
        return;
    }
    const numThreads = 16;
    const matrixA = await (0, createMatrix_1.default)(Number(N), Number(N));
    const matrixB = await (0, createMatrix_1.default)(Number(N), Number(N));
    let result;
    switch (algorithm) {
        case matrixAlgorithms.LINEAR_SINGLE:
            result = await (0, multiplyMatrix_1.default)(matrixA, matrixB);
            res.json({ algorithm, result: result[0][0], m1: matrixA[0][0], m2: matrixB[0][0], memoryUsage: `${(process.memoryUsage.rss() / (1024 * 1024)).toFixed(2)} MB` });
            break;
        case matrixAlgorithms.STRASSEN:
            result = await (0, strassenMultiplyMatrix_1.default)(matrixA, matrixB);
            res.json({ algorithm, result: result[0][0], m1: matrixA[0][0], m2: matrixB[0][0], memoryUsage: `${(process.memoryUsage.rss() / (1024 * 1024)).toFixed(2)} MB` });
            break;
        case matrixAlgorithms.LINEAR_MULTI:
            const chunkSize = Math.floor(matrixA.length / numThreads);
            const threads = [];
            for (let i = 0; i < numThreads; i++) {
                const start = i * chunkSize;
                const end = i === numThreads - 1 ? matrixA.length : (i + 1) * chunkSize;
                const matrixASlice = matrixA.slice(start, end);
                const worker = new worker_threads_1.Worker('./src/helpers/multiplyMatrixWorker.ts', {
                    workerData: { matrixASlice, matrixB },
                });
                worker.on('message', (result) => {
                    threads[i] = result;
                    if (threads.filter((thread) => thread !== undefined).length === numThreads) {
                        const combinedResult = threads.flatMap(innerArrays => innerArrays);
                        // console.log(combinedResult)
                        res.json({ algorithm, result: result[0][0], m1: matrixA[0][0], m2: matrixB[0][0], memoryUsage: `${(process.memoryUsage.rss() / (1024 * 1024)).toFixed(2)} MB` });
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
exports.matrixMultiply = matrixMultiply;
