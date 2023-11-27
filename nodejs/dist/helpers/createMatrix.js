"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (numRows, numCols, fillZeros = false) => {
    const matriz = [];
    for (let i = 0; i < numRows; i++) {
        const linha = [];
        for (let j = 0; j < numCols; j++)
            linha.push(fillZeros ? 0 : Math.floor(Math.random() * 10));
        matriz.push(linha);
    }
    return matriz;
};
