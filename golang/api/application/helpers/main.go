package helpers

import (
	"math/rand"
	"time"
)

func GenerateMatrix(numRows, numCols int, fillZeros bool) [][]int {
	matriz := make([][]int, numRows)
	source := rand.NewSource(time.Now().UnixNano())
	rng := rand.New(source)

	for i := 0; i < numRows; i++ {
		linha := make([]int, numCols)
		for j := 0; j < numCols; j++ {
			if fillZeros {
				linha[j] = 0
			} else {
				linha[j] = rng.Intn(10)
			}
		}
		matriz[i] = linha
	}
	return matriz
}
