package repository

import (
	"github.com/coby/runwork/apps/backend/internal/models"
	"gorm.io/gorm"
)

type EventRepository struct {
	db *gorm.DB
}

func NewEventRepository(db *gorm.DB) *EventRepository {
	return &EventRepository{db: db}
}

func (r *EventRepository) FindBySessionID(sessionID string) ([]models.Event, error) {
	var events []models.Event
	err := r.db.Where("session_id = ?", sessionID).
		Order("timestamp ASC").
		Find(&events).Error
	if err != nil {
		return nil, err
	}
	return events, nil
}

func (r *EventRepository) Create(event *models.Event) error {
	return r.db.Create(event).Error
}

func (r *EventRepository) FindLastBySessionID(sessionID string) (*models.Event, error) {
	var event models.Event
	err := r.db.Where("session_id = ?", sessionID).
		Order("timestamp DESC").
		First(&event).Error
	if err != nil {
		return nil, err
	}
	return &event, nil
}
