
export default async (numRows: number, numCols: number, fillZeros: boolean = false) : Promise<number[][]> => {

    const matriz :number[][] = [];
    for (let i = 0; i < numRows; i++) {
        const linha = [];
        for (let j = 0; j < numCols; j++) linha.push(fillZeros ? 0 : Math.floor(Math.random() * 10));
        matriz.push(linha);
    }
    return matriz;
}