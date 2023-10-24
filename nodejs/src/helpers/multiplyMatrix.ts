
export default async (matrix1: number[][], matrix2: number[][]) : Promise<number[][]> => {

    const rowsA = matrix1.length;
    const colsA = matrix1[0].length;
    const rowsB = matrix2.length;
    const colsB = matrix2[0].length;

    if (colsA !== rowsB) {
        throw new Error("Matrix dimensions are not compatible for multiplication.");
    }

    const result = new Array(rowsA);

    for (let i = 0; i < rowsA; i++) {
        result[i] = new Array(colsB);
        for (let j = 0; j < colsB; j++) {
        result[i][j] = 0;
        for (let k = 0; k < colsA; k++) {
            result[i][j] += matrix1[i][k] * matrix2[k][j];
        }
        }
    }

    return result;
}