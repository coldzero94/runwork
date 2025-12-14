package handler

import (
	"github.com/coby/runwork/apps/backend/internal/models"
	"github.com/coby/runwork/apps/backend/internal/service"
	"github.com/coby/runwork/apps/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

type EventHandler struct {
	eventService *service.EventService
}

func NewEventHandler(eventService *service.EventService) *EventHandler {
	return &EventHandler{eventService: eventService}
}

type AddEventRequest struct {
	Type string  `json:"type" binding:"required"`
	Kind *string `json:"kind"`
	Note *string `json:"note"`
}

func (h *EventHandler) AddEvent(c *gin.Context) {
	user := c.MustGet("user").(*models.User)
	sessionID := c.Param("id")

	var req AddEventRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "invalid request body")
		return
	}

	// Validate event type
	eventType := models.EventType(req.Type)
	validTypes := map[models.EventType]bool{
		models.EventTypeActionSwitch: true,
		models.EventTypeNoteAdd:      true,
	}
	if !validTypes[eventType] {
		response.BadRequest(c, "invalid event type")
		return
	}

	event, err := h.eventService.AddEvent(sessionID, user.ID, eventType, req.Kind, req.Note)
	if err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	response.Created(c, event)
}

func (h *EventHandler) GetEvents(c *gin.Context) {
	user := c.MustGet("user").(*models.User)
	sessionID := c.Param("id")

	events, err := h.eventService.GetSessionEvents(sessionID, user.ID)
	if err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	response.Success(c, events)
}
