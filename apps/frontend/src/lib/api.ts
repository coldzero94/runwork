import { supabase } from './supabase'
import type { User, Session, SessionEvent } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7070'

async function getAuthHeaders(): Promise<HeadersInit> {
  const { data: { session } } = await supabase.auth.getSession()

  return {
    'Content-Type': 'application/json',
    ...(session?.access_token && {
      Authorization: `Bearer ${session.access_token}`,
    }),
  }
}

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = await getAuthHeaders()

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'API request failed')
  }

  return data.data
}

// Auth
export async function getMe(): Promise<User> {
  return fetchAPI<User>('/auth/me')
}

// Sessions
export async function startSession(): Promise<Session> {
  return fetchAPI<Session>('/sessions', { method: 'POST' })
}

export async function getCurrentSession(): Promise<Session | null> {
  return fetchAPI<Session | null>('/sessions/current')
}

export async function endSession(sessionId: string): Promise<Session> {
  return fetchAPI<Session>(`/sessions/${sessionId}/end`, { method: 'POST' })
}

export async function getSessionHistory(limit = 10): Promise<Session[]> {
  return fetchAPI<Session[]>(`/sessions/history?limit=${limit}`)
}

// Events
export async function addEvent(
  sessionId: string,
  type: string,
  kind?: string,
  note?: string
): Promise<SessionEvent> {
  return fetchAPI<SessionEvent>(`/sessions/${sessionId}/events`, {
    method: 'POST',
    body: JSON.stringify({ type, kind, note }),
  })
}

export async function getSessionEvents(sessionId: string): Promise<SessionEvent[]> {
  return fetchAPI<SessionEvent[]>(`/sessions/${sessionId}/events`)
}
