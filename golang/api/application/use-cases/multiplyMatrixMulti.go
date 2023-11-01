package usecases

import (
	"errors"
	"sync"
)

func MatrixMultiplyMulti(matrix1 [][]int, matrix2 [][]int) ([][]int, error) {
	rowsA := len(matrix1)
	colsA := len(matrix1[0])
	rowsB := len(matrix2)
	colsB := len(matrix2[0])

	if colsA != rowsB {
		return nil, errors.New("matrix dimensions are not compatible for multiplication")
	}

	result := make([][]int, rowsA)
	for i := range result {
		result[i] = make([]int, colsB)
	}

	var wg sync.WaitGroup
	for i := 0; i < rowsA; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			for j := 0; j < colsB; j++ {
				for k := 0; k < colsA; k++ {
					result[i][j] += matrix1[i][k] * matrix2[k][j]
				}
			}
		}(i)
	}
	wg.Wait()

	return result, nil
}
