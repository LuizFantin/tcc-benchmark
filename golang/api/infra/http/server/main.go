package http

import (
	"log"
	"os"

	healthController "github.com/LuizFantin/tcc-benchmark/golang/api/infra/http/controllers/health-controller"
	matrixController "github.com/LuizFantin/tcc-benchmark/golang/api/infra/http/controllers/matrix-controller"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func Init() {
	gin.SetMode(gin.ReleaseMode)

	router := gin.Default()

	router.GET("/health", healthController.Alive)
	router.GET("/matrix", matrixController.Multiply)
	// router.POST("/lead", leadhController.RegisterLead)

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	port := os.Getenv("PORT")

	log.Println("Running server in port " + port)
	router.Run(":" + port)
}
