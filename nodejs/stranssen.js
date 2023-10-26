
function strassenMatrixMultiply(A, B) {
    const n = A.length;
  
    if (n <= 2) {
      return standardMatrixMultiply(A, B);
    }
  
    // Ensure that n is a power of 2 by padding the matrices if necessary
    const newSize = Math.pow(2, Math.ceil(Math.log2(n)));
    const paddedA = padMatrix(A, newSize);
    const paddedB = padMatrix(B, newSize);
  
    // Continue with the algorithm using padded matrices
    const C = strassenRecursive(paddedA, paddedB);
  
    // Remove any extra padding to get the final result
    return trimMatrix(C, n);
  }

  function strassenRecursive(A, B) {
    const n = A.length;
  
    if (n <= 2) {
      return standardMatrixMultiply(A, B);
    }
  
    const newSize = n / 2;
  
    const A11 = submatrix(A, 0, 0, newSize);
    const A12 = submatrix(A, 0, newSize, newSize);
    const A21 = submatrix(A, newSize, 0, newSize);
    const A22 = submatrix(A, newSize, newSize, newSize);
  
    const B11 = submatrix(B, 0, 0, newSize);
    const B12 = submatrix(B, 0, newSize, newSize);
    const B21 = submatrix(B, newSize, 0, newSize);
    const B22 = submatrix(B, newSize, newSize, newSize);
  
    const P1 = strassenRecursive(A11, matrixSubtraction(B12, B22));
    const P2 = strassenRecursive(matrixAddition(A11, A12), B22);
    const P3 = strassenRecursive(matrixAddition(A21, A22), B11);
    const P4 = strassenRecursive(A22, matrixSubtraction(B21, B11));
    const P5 = strassenRecursive(matrixAddition(A11, A22), matrixAddition(B11, B22));
    const P6 = strassenRecursive(matrixSubtraction(A12, A22), matrixAddition(B21, B22));
    const P7 = strassenRecursive(matrixSubtraction(A11, A21), matrixAddition(B11, B12));
  
    const C11 = matrixAddition(matrixSubtraction(matrixAddition(P5, P4), P2), P6);
    const C12 = matrixAddition(P1, P2);
    const C21 = matrixAddition(P3, P4);
    const C22 = matrixSubtraction(matrixSubtraction(matrixAddition(P5, P1), P3), P7);
  
    const result = new Array(n);
    for (let i = 0; i < newSize; i++) {
      result[i] = C11[i].concat(C12[i]);
      result[i + newSize] = C21[i].concat(C22[i]);
    }
  
    return result;
  }

  function submatrix(matrix, rowStart, colStart, size) {
    const submat = new Array(size);
    for (let i = 0; i < size; i++) {
      submat[i] = matrix[rowStart + i].slice(colStart, colStart + size);
    }
    return submat;
  }
  
  function padMatrix(matrix, size) {
    const paddedMatrix = new Array(size);
    for (let i = 0; i < size; i++) {
      paddedMatrix[i] = new Array(size).fill(0);
    }
  
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        paddedMatrix[i][j] = matrix[i][j];
      }
    }
  
    return paddedMatrix;
  }
  
  function trimMatrix(matrix, size) {
    const trimmedMatrix = new Array(size);
    for (let i = 0; i < size; i++) {
      trimmedMatrix[i] = matrix[i].slice(0, size);
    }
    return trimmedMatrix;
  }
  
  function standardMatrixMultiply(A, B) {
    const n = A.length;
    const C = new Array(n);
    for (let i = 0; i < n; i++) {
      C[i] = new Array(n);
      for (let j = 0; j < n; j++) {
        C[i][j] = 0;
        for (let k = 0; k < n; k++) {
          C[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return C;
  }
  
  function matrixAddition(A, B) {
    const n = A.length;
    const C = new Array(n);
    for (let i = 0; i < n; i++) {
      C[i] = new Array(n);
      for (let j = 0; j < n; j++) {
        C[i][j] = A[i][j] + B[i][j];
      }
    }
    return C;
  }
  
  function matrixSubtraction(A, B) {
    const n = A.length;
    const C = new Array(n);
    for (let i = 0; i < n; i++) {
      C[i] = new Array(n);
      for (let j = 0; j < n; j++) {
        C[i][j] = A[i][j] - B[i][j];
      }
    }
    return C;
  }
  
  // Example usage
  const A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const B = [[9, 8, 7], [6, 5, 4], [3, 2, 1]];
  const result = strassenMatrixMultiply(A, B);
  console.log(result);