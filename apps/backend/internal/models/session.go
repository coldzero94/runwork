package models

import (
	"time"
)

type SessionStatus string

const (
	SessionStatusIdle      SessionStatus = "IDLE"
	SessionStatusRunning   SessionStatus = "RUNNING"
	SessionStatusFinishing SessionStatus = "FINISHING"
	SessionStatusFinished  SessionStatus = "FINISHED"
)

type Session struct {
	ID        string        `gorm:"primaryKey" json:"id"`
	UserID    string        `gorm:"index" json:"user_id"`
	Status    SessionStatus `json:"status"`
	StartedAt time.Time     `json:"started_at"`
	EndedAt   *time.Time    `json:"ended_at,omitempty"`
	CreatedAt time.Time     `json:"created_at"`
	UpdatedAt time.Time     `json:"updated_at"`

	// Relations
	User   User    `gorm:"foreignKey:UserID" json:"-"`
	Events []Event `gorm:"foreignKey:SessionID" json:"events,omitempty"`
}
