package usecases

func nextPowerOfTwo(n int) int {
	newSize := 1
	for newSize < n {
		newSize *= 2
	}
	return newSize
}

func StrassenMatrixMultiply(A [][]int, B [][]int) ([][]int, error) {
	n := len(A)

	if n <= 2 {
		return standardMatrixMultiply(A, B), nil
	}

	// Ensure that n is a power of 2 by padding the matrices if necessary
	newSize := nextPowerOfTwo(n)
	paddedA := padMatrix(A, newSize)
	paddedB := padMatrix(B, newSize)

	// Continue with the algorithm using padded matrices
	C := strassenRecursive(paddedA, paddedB)

	// Remove any extra padding to get the final result
	return trimMatrix(C, n), nil
}

func strassenRecursive(A [][]int, B [][]int) [][]int {
	n := len(A)

	if n <= 2 {
		return standardMatrixMultiply(A, B)
	}

	newSize := n / 2

	A11 := submatrix(A, 0, 0, newSize)
	A12 := submatrix(A, 0, newSize, newSize)
	A21 := submatrix(A, newSize, 0, newSize)
	A22 := submatrix(A, newSize, newSize, newSize)

	B11 := submatrix(B, 0, 0, newSize)
	B12 := submatrix(B, 0, newSize, newSize)
	B21 := submatrix(B, newSize, 0, newSize)
	B22 := submatrix(B, newSize, newSize, newSize)

	P1 := strassenRecursive(A11, matrixSubtraction(B12, B22))
	P2 := strassenRecursive(matrixAddition(A11, A12), B22)
	P3 := strassenRecursive(matrixAddition(A21, A22), B11)
	P4 := strassenRecursive(A22, matrixSubtraction(B21, B11))
	P5 := strassenRecursive(matrixAddition(A11, A22), matrixAddition(B11, B22))
	P6 := strassenRecursive(matrixSubtraction(A12, A22), matrixAddition(B21, B22))
	P7 := strassenRecursive(matrixSubtraction(A11, A21), matrixAddition(B11, B12))

	C11 := matrixAddition(matrixSubtraction(matrixAddition(P5, P4), P2), P6)
	C12 := matrixAddition(P1, P2)
	C21 := matrixAddition(P3, P4)
	C22 := matrixSubtraction(matrixSubtraction(matrixAddition(P5, P1), P3), P7)

	result := make([][]int, n)
	for i := 0; i < newSize; i++ {
		result[i] = append(C11[i], C12[i]...)
		result[i+newSize] = append(C21[i], C22[i]...)
	}

	return result
}

func submatrix(matrix [][]int, rowStart int, colStart int, size int) [][]int {
	submat := make([][]int, size)
	for i := 0; i < size; i++ {
		submat[i] = make([]int, size)
		copy(submat[i], matrix[rowStart+i][colStart:colStart+size])
	}
	return submat
}

func padMatrix(matrix [][]int, size int) [][]int {
	paddedMatrix := make([][]int, size)
	for i := 0; i < size; i++ {
		paddedMatrix[i] = make([]int, size)
	}

	for i := 0; i < len(matrix); i++ {
		copy(paddedMatrix[i], matrix[i])
	}

	return paddedMatrix
}

func trimMatrix(matrix [][]int, size int) [][]int {
	trimmedMatrix := make([][]int, size)
	for i := 0; i < size; i++ {
		trimmedMatrix[i] = matrix[i][:size]
	}
	return trimmedMatrix
}

func standardMatrixMultiply(A [][]int, B [][]int) [][]int {
	n := len(A)
	C := make([][]int, n)
	for i := 0; i < n; i++ {
		C[i] = make([]int, n)
		for j := 0; j < n; j++ {
			C[i][j] = 0
			for k := 0; k < n; k++ {
				C[i][j] += A[i][k] * B[k][j]
			}
		}
	}
	return C
}

func matrixAddition(A [][]int, B [][]int) [][]int {
	n := len(A)
	C := make([][]int, n)
	for i := 0; i < n; i++ {
		C[i] = make([]int, n)
		for j := 0; j < n; j++ {
			C[i][j] = A[i][j] + B[i][j]
		}
	}
	return C
}

func matrixSubtraction(A [][]int, B [][]int) [][]int {
	n := len(A)
	C := make([][]int, n)
	for i := 0; i < n; i++ {
		C[i] = make([]int, n)
		for j := 0; j < n; j++ {
			C[i][j] = A[i][j] - B[i][j]
		}
	}
	return C
}
