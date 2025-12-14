package service

import (
	"errors"
	"time"

	"github.com/coby/runwork/apps/backend/internal/models"
	"github.com/coby/runwork/apps/backend/internal/repository"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type SessionService struct {
	sessionRepo *repository.SessionRepository
	eventRepo   *repository.EventRepository
}

func NewSessionService(sessionRepo *repository.SessionRepository, eventRepo *repository.EventRepository) *SessionService {
	return &SessionService{
		sessionRepo: sessionRepo,
		eventRepo:   eventRepo,
	}
}

func (s *SessionService) StartSession(userID string) (*models.Session, error) {
	// Check if user already has an active session
	existing, err := s.sessionRepo.FindCurrentByUserID(userID)
	if err == nil && existing != nil {
		return nil, errors.New("active session already exists")
	}

	now := time.Now()
	session := &models.Session{
		ID:        uuid.New().String(),
		UserID:    userID,
		Status:    models.SessionStatusRunning,
		StartedAt: now,
	}

	if err := s.sessionRepo.Create(session); err != nil {
		return nil, err
	}

	// Create SESSION_START event
	event := &models.Event{
		ID:        uuid.New().String(),
		SessionID: session.ID,
		Type:      models.EventTypeSessionStart,
		Timestamp: now,
	}
	if err := s.eventRepo.Create(event); err != nil {
		return nil, err
	}

	return session, nil
}

func (s *SessionService) GetCurrentSession(userID string) (*models.Session, error) {
	session, err := s.sessionRepo.FindCurrentByUserID(userID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	// Check 24 hour auto-end
	if time.Since(session.StartedAt) > 24*time.Hour {
		session, err = s.autoEndSession(session)
		if err != nil {
			return nil, err
		}
	}

	return session, nil
}

func (s *SessionService) GetSessionByID(sessionID string) (*models.Session, error) {
	return s.sessionRepo.FindByIDWithEvents(sessionID)
}

func (s *SessionService) EndSession(sessionID, userID string) (*models.Session, error) {
	session, err := s.sessionRepo.FindByID(sessionID)
	if err != nil {
		return nil, err
	}

	if session.UserID != userID {
		return nil, errors.New("unauthorized")
	}

	if session.Status == models.SessionStatusFinished {
		return nil, errors.New("session already ended")
	}

	now := time.Now()
	session.Status = models.SessionStatusFinished
	session.EndedAt = &now

	if err := s.sessionRepo.Update(session); err != nil {
		return nil, err
	}

	// Create SESSION_END event
	event := &models.Event{
		ID:        uuid.New().String(),
		SessionID: session.ID,
		Type:      models.EventTypeSessionEnd,
		Timestamp: now,
	}
	if err := s.eventRepo.Create(event); err != nil {
		return nil, err
	}

	return session, nil
}

func (s *SessionService) GetHistory(userID string, limit int) ([]models.Session, error) {
	if limit <= 0 {
		limit = 10
	}
	return s.sessionRepo.FindByUserID(userID, limit)
}

func (s *SessionService) autoEndSession(session *models.Session) (*models.Session, error) {
	endTime := session.StartedAt.Add(24 * time.Hour)
	session.Status = models.SessionStatusFinished
	session.EndedAt = &endTime

	if err := s.sessionRepo.Update(session); err != nil {
		return nil, err
	}

	// Create auto SESSION_END event
	event := &models.Event{
		ID:        uuid.New().String(),
		SessionID: session.ID,
		Type:      models.EventTypeSessionEnd,
		Timestamp: endTime,
	}
	s.eventRepo.Create(event)

	return session, nil
}
