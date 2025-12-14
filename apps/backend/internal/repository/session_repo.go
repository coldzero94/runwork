package repository

import (
	"time"

	"github.com/coby/runwork/apps/backend/internal/models"
	"gorm.io/gorm"
)

type SessionRepository struct {
	db *gorm.DB
}

func NewSessionRepository(db *gorm.DB) *SessionRepository {
	return &SessionRepository{db: db}
}

func (r *SessionRepository) FindByID(id string) (*models.Session, error) {
	var session models.Session
	if err := r.db.First(&session, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &session, nil
}

func (r *SessionRepository) FindByIDWithEvents(id string) (*models.Session, error) {
	var session models.Session
	if err := r.db.Preload("Events").First(&session, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &session, nil
}

func (r *SessionRepository) FindCurrentByUserID(userID string) (*models.Session, error) {
	var session models.Session
	err := r.db.Where("user_id = ? AND status IN ?", userID, []models.SessionStatus{
		models.SessionStatusRunning,
		models.SessionStatusIdle,
	}).Order("started_at DESC").First(&session).Error
	if err != nil {
		return nil, err
	}
	return &session, nil
}

func (r *SessionRepository) FindByUserIDAndDate(userID string, date time.Time) ([]models.Session, error) {
	startOfDay := time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, date.Location())
	endOfDay := startOfDay.Add(24 * time.Hour)

	var sessions []models.Session
	err := r.db.Where("user_id = ? AND started_at >= ? AND started_at < ?", userID, startOfDay, endOfDay).
		Order("started_at DESC").
		Find(&sessions).Error
	if err != nil {
		return nil, err
	}
	return sessions, nil
}

func (r *SessionRepository) FindByUserID(userID string, limit int) ([]models.Session, error) {
	var sessions []models.Session
	err := r.db.Where("user_id = ?", userID).
		Order("started_at DESC").
		Limit(limit).
		Find(&sessions).Error
	if err != nil {
		return nil, err
	}
	return sessions, nil
}

func (r *SessionRepository) Create(session *models.Session) error {
	return r.db.Create(session).Error
}

func (r *SessionRepository) Update(session *models.Session) error {
	return r.db.Save(session).Error
}
