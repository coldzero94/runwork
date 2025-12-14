package middleware

import (
	"strings"

	"github.com/coby/runwork/apps/backend/internal/service"
	"github.com/coby/runwork/apps/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

func Auth(authService *service.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			response.Unauthorized(c, "authorization header required")
			c.Abort()
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			response.Unauthorized(c, "invalid authorization header format")
			c.Abort()
			return
		}

		user, err := authService.ValidateToken(authHeader)
		if err != nil {
			response.Unauthorized(c, "invalid token")
			c.Abort()
			return
		}

		c.Set("user", user)
		c.Next()
	}
}
