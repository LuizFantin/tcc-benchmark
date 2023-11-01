package usecases

import "errors"

func MatrixMultiply(matrix1 [][]int, matrix2 [][]int) ([][]int, error) {
	rowsA := len(matrix1)
	colsA := len(matrix1[0])
	rowsB := len(matrix2)
	colsB := len(matrix2[0])

	if colsA != rowsB {
		return nil, errors.New("Matrix dimensions are not compatible for multiplication.")
	}

	result := make([][]int, rowsA)

	for i := 0; i < rowsA; i++ {
		result[i] = make([]int, colsB)
		for j := 0; j < colsB; j++ {
			result[i][j] = 0
			for k := 0; k < colsA; k++ {
				result[i][j] += matrix1[i][k] * matrix2[k][j]
			}
		}
	}

	return result, nil
}
