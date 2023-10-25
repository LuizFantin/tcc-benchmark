// Custom function to copy the result data into the main result matrix C
export default function copyResultData(result: number[][], C: number[], startRow: number, N: number) : void {
    for (let row = 0; row < result.length; row++) {
      for (let col = 0; col < N; col++) {
        C[(startRow + row) * N + col] = result[row][col];
      }
    }
  }
  
  