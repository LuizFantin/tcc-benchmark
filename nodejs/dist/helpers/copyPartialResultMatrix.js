"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Custom function to copy the result data into the main result matrix C
function copyResultData(result, C, startRow, N) {
    for (let row = 0; row < result.length; row++) {
        for (let col = 0; col < N; col++) {
            C[(startRow + row) * N + col] = result[row][col];
        }
    }
}
exports.default = copyResultData;
