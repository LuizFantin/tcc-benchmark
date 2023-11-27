const { parentPort, workerData } = require('worker_threads');
function multiplyMatrix(A, B) {
    const rowsA = A.length;
    const colsA = A[0].length;
    const colsB = B[0].length;
    const result = new Array(rowsA);
    for (let i = 0; i < rowsA; i++) {
        result[i] = new Array(colsB);
        for (let j = 0; j < colsB; j++) {
            result[i][j] = 0;
            for (let k = 0; k < colsA; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
}
// Worker thread
const { matrixASlice, matrixB } = workerData;
const resultSlice = multiplyMatrix(matrixASlice, matrixB);
parentPort.postMessage(resultSlice);
