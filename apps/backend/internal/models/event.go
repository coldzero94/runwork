package models

import (
	"time"
)

type EventType string

const (
	EventTypeSessionStart EventType = "SESSION_START"
	EventTypeActionSwitch EventType = "ACTION_SWITCH"
	EventTypeNoteAdd      EventType = "NOTE_ADD"
	EventTypeSessionEnd   EventType = "SESSION_END"
)

type ActionKind string

const (
	ActionKindWork    ActionKind = "work"
	ActionKindBreak   ActionKind = "break"
	ActionKindNeutral ActionKind = "neutral"
)

type Event struct {
	ID        string    `gorm:"primaryKey" json:"id"`
	SessionID string    `gorm:"index" json:"session_id"`
	Type      EventType `json:"type"`
	Kind      *string   `json:"kind,omitempty"`
	Note      *string   `json:"note,omitempty"`
	Timestamp time.Time `json:"timestamp"`
	CreatedAt time.Time `json:"created_at"`

	// Relations
	Session Session `gorm:"foreignKey:SessionID" json:"-"`
}
