package handler

import (
	"strconv"

	"github.com/coby/runwork/apps/backend/internal/models"
	"github.com/coby/runwork/apps/backend/internal/service"
	"github.com/coby/runwork/apps/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

type SessionHandler struct {
	sessionService *service.SessionService
}

func NewSessionHandler(sessionService *service.SessionService) *SessionHandler {
	return &SessionHandler{sessionService: sessionService}
}

func (h *SessionHandler) StartSession(c *gin.Context) {
	user := c.MustGet("user").(*models.User)

	session, err := h.sessionService.StartSession(user.ID)
	if err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	response.Created(c, session)
}

func (h *SessionHandler) GetCurrentSession(c *gin.Context) {
	user := c.MustGet("user").(*models.User)

	session, err := h.sessionService.GetCurrentSession(user.ID)
	if err != nil {
		response.InternalError(c, err.Error())
		return
	}

	if session == nil {
		response.Success(c, nil)
		return
	}

	response.Success(c, session)
}

func (h *SessionHandler) EndSession(c *gin.Context) {
	user := c.MustGet("user").(*models.User)
	sessionID := c.Param("id")

	session, err := h.sessionService.EndSession(sessionID, user.ID)
	if err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	response.Success(c, session)
}

func (h *SessionHandler) GetHistory(c *gin.Context) {
	user := c.MustGet("user").(*models.User)

	limitStr := c.DefaultQuery("limit", "10")
	limit, _ := strconv.Atoi(limitStr)

	sessions, err := h.sessionService.GetHistory(user.ID, limit)
	if err != nil {
		response.InternalError(c, err.Error())
		return
	}

	response.Success(c, sessions)
}
