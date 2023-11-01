package controllers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	createMatrix "github.com/LuizFantin/tcc-benchmark/golang/api/application/helpers"
	usecases "github.com/LuizFantin/tcc-benchmark/golang/api/application/use-cases"
)

func Multiply(c *gin.Context) {

	N, err := strconv.Atoi(c.Query("N"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID parameter"})
		return
	}

	// algorithm := c.Query("algorithm")

	m1 := createMatrix.GenerateMatrix(N, N, false)
	m2 := createMatrix.GenerateMatrix(N, N, false)

	// result, err := usecases.MatrixMultiply(m1, m2)
	result, err := usecases.MatrixMultiplyMulti(m1, m2)

	log.Print("Multiplication: ", gin.H{"data": result[0][0], "m1": m1[0][0], "m2": m2[0][0]})
	c.JSON(http.StatusOK, gin.H{"data": result[0][0], "m1": m1[0][0], "m2": m2[0][0]})
	// c.JSON(http.StatusOK, gin.H{"data": result, "m1": m1, "m2": m2})

}
