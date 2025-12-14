package main

import (
	"log"

	"github.com/coby/runwork/apps/backend/internal/config"
	"github.com/coby/runwork/apps/backend/internal/models"
	"github.com/coby/runwork/apps/backend/internal/router"
)

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatal("Failed to load config:", err)
	}

	// Connect to database
	if err := cfg.ConnectDB(); err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate models
	if err := cfg.DB.AutoMigrate(&models.User{}, &models.Session{}, &models.Event{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Setup router
	r := router.Setup(cfg.DB)

	// Start server
	log.Printf("Server starting on port %s", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
