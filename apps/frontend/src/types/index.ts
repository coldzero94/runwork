export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export type SessionStatus = 'IDLE' | 'RUNNING' | 'FINISHING' | 'FINISHED'

export interface Session {
  id: string
  user_id: string
  status: SessionStatus
  started_at: string
  ended_at?: string
  created_at: string
  updated_at: string
  events?: SessionEvent[]
}

export type EventType = 'SESSION_START' | 'ACTION_SWITCH' | 'NOTE_ADD' | 'SESSION_END'
export type ActionKind = 'work' | 'break' | 'neutral'

export interface SessionEvent {
  id: string
  session_id: string
  type: EventType
  kind?: ActionKind
  note?: string
  timestamp: string
  created_at: string
}
