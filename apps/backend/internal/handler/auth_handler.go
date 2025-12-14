package handler

import (
	"github.com/coby/runwork/apps/backend/internal/models"
	"github.com/coby/runwork/apps/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

type AuthHandler struct{}

func NewAuthHandler() *AuthHandler {
	return &AuthHandler{}
}

func (h *AuthHandler) GetMe(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		response.Unauthorized(c, "user not found in context")
		return
	}

	response.Success(c, user.(*models.User))
}
