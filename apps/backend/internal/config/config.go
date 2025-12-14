package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type Config struct {
	Port             string
	DatabaseURL      string
	SupabaseJWTSecret string
	DB               *gorm.DB
}

var AppConfig *Config

func Load() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		// .env file not found is ok in production
	}

	config := &Config{
		Port:             getEnv("PORT", "7070"),
		DatabaseURL:      os.Getenv("DATABASE_URL"),
		SupabaseJWTSecret: os.Getenv("SUPABASE_JWT_SECRET"),
	}

	if config.DatabaseURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is required")
	}

	if config.SupabaseJWTSecret == "" {
		return nil, fmt.Errorf("SUPABASE_JWT_SECRET is required")
	}

	AppConfig = config
	return config, nil
}

func (c *Config) ConnectDB() error {
	db, err := gorm.Open(postgres.Open(c.DatabaseURL), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	c.DB = db
	return nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
