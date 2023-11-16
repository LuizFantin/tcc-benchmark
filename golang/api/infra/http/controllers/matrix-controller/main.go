package controllers

import (
	"fmt"
	"log"
	"net/http"
	"runtime"
	"strconv"

	"github.com/gin-gonic/gin"

	helpers "github.com/LuizFantin/tcc-benchmark/golang/api/application/helpers"
	usecases "github.com/LuizFantin/tcc-benchmark/golang/api/application/use-cases"
)

func bToMb(b uint64) uint64 {
	return b / 1024 / 1024
}

func Multiply(c *gin.Context) {

	N, err1 := strconv.Atoi(c.Query("N"))
	if err1 != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid N parameter"})
		return
	}

	algorithm := c.Query("algorithm")

	m1 := helpers.GenerateMatrix(N, N, false)
	m2 := helpers.GenerateMatrix(N, N, false)

	var result [][]int
	var err error

	switch algorithm {
	case "linear":
		result, err = usecases.MatrixMultiply(m1, m2)
	case "multi":
		result, err = usecases.MatrixMultiplyMulti(m1, m2)
	case "strassen":
		result, err = usecases.StrassenMatrixMultiply(m1, m2)
	default:
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid algorithm parameter"})
		return
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Matrix multiplication failed"})
		return
	}

	var m runtime.MemStats
	runtime.ReadMemStats(&m)

	log.Print("Multiplication: ", gin.H{"algorith": algorithm, "result": result[0][0], "m1": m1[0][0], "m2": m2[0][0], "memoryUsage": fmt.Sprintf("%d MB", bToMb(m.Alloc))})
	c.JSON(http.StatusOK, gin.H{"algorith": algorithm, "result": result[0][0], "m1": m1[0][0], "m2": m2[0][0], "memoryUsage": fmt.Sprintf("%d MB", bToMb(m.Alloc))})
}
