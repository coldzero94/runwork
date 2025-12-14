package router

import (
	"net/http"

	"github.com/coby/runwork/apps/backend/internal/handler"
	"github.com/coby/runwork/apps/backend/internal/middleware"
	"github.com/coby/runwork/apps/backend/internal/repository"
	"github.com/coby/runwork/apps/backend/internal/service"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(db *gorm.DB) *gin.Engine {
	r := gin.New()

	// Global middleware
	r.Use(gin.Recovery())
	r.Use(middleware.Logger())
	r.Use(middleware.CORS())

	// Initialize repositories
	userRepo := repository.NewUserRepository(db)
	sessionRepo := repository.NewSessionRepository(db)
	eventRepo := repository.NewEventRepository(db)

	// Initialize services
	authService := service.NewAuthService(userRepo)
	sessionService := service.NewSessionService(sessionRepo, eventRepo)
	eventService := service.NewEventService(eventRepo, sessionRepo)

	// Initialize handlers
	authHandler := handler.NewAuthHandler()
	sessionHandler := handler.NewSessionHandler(sessionService)
	eventHandler := handler.NewEventHandler(eventService)

	// Public routes
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// Protected routes
	protected := r.Group("/")
	protected.Use(middleware.Auth(authService))
	{
		// Auth
		protected.GET("/auth/me", authHandler.GetMe)

		// Sessions
		protected.POST("/sessions", sessionHandler.StartSession)
		protected.GET("/sessions/current", sessionHandler.GetCurrentSession)
		protected.POST("/sessions/:id/end", sessionHandler.EndSession)
		protected.GET("/sessions/history", sessionHandler.GetHistory)

		// Events
		protected.GET("/sessions/:id/events", eventHandler.GetEvents)
		protected.POST("/sessions/:id/events", eventHandler.AddEvent)
	}

	return r
}
