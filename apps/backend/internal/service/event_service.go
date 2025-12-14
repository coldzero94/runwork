package service

import (
	"errors"
	"time"

	"github.com/coby/runwork/apps/backend/internal/models"
	"github.com/coby/runwork/apps/backend/internal/repository"
	"github.com/google/uuid"
)

type EventService struct {
	eventRepo   *repository.EventRepository
	sessionRepo *repository.SessionRepository
}

func NewEventService(eventRepo *repository.EventRepository, sessionRepo *repository.SessionRepository) *EventService {
	return &EventService{
		eventRepo:   eventRepo,
		sessionRepo: sessionRepo,
	}
}

func (s *EventService) AddEvent(sessionID, userID string, eventType models.EventType, kind *string, note *string) (*models.Event, error) {
	// Verify session ownership
	session, err := s.sessionRepo.FindByID(sessionID)
	if err != nil {
		return nil, err
	}

	if session.UserID != userID {
		return nil, errors.New("unauthorized")
	}

	if session.Status == models.SessionStatusFinished {
		return nil, errors.New("cannot add event to finished session")
	}

	// Validate event type and required fields
	switch eventType {
	case models.EventTypeActionSwitch:
		if kind == nil {
			return nil, errors.New("kind is required for ACTION_SWITCH event")
		}
		// Validate kind value
		validKinds := map[string]bool{"work": true, "break": true, "neutral": true}
		if !validKinds[*kind] {
			return nil, errors.New("invalid kind value")
		}
	case models.EventTypeNoteAdd:
		if note == nil || *note == "" {
			return nil, errors.New("note is required for NOTE_ADD event")
		}
	}

	event := &models.Event{
		ID:        uuid.New().String(),
		SessionID: sessionID,
		Type:      eventType,
		Kind:      kind,
		Note:      note,
		Timestamp: time.Now(),
	}

	if err := s.eventRepo.Create(event); err != nil {
		return nil, err
	}

	return event, nil
}

func (s *EventService) GetSessionEvents(sessionID, userID string) ([]models.Event, error) {
	// Verify session ownership
	session, err := s.sessionRepo.FindByID(sessionID)
	if err != nil {
		return nil, err
	}

	if session.UserID != userID {
		return nil, errors.New("unauthorized")
	}

	return s.eventRepo.FindBySessionID(sessionID)
}
