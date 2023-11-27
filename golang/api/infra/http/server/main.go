package http

import (
	"log"

	healthController "github.com/LuizFantin/tcc-benchmark/golang/api/infra/http/controllers/health-controller"
	matrixController "github.com/LuizFantin/tcc-benchmark/golang/api/infra/http/controllers/matrix-controller"
	"github.com/gin-gonic/gin"
)

func Init() {
	gin.SetMode(gin.ReleaseMode)

	router := gin.Default()

	router.GET("/health", healthController.Alive)
	router.GET("/matrix", matrixController.Multiply)

	port := "8000"

	log.Println("Running server in port " + port)
	router.Run(":" + port)
}
