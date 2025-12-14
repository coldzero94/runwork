import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as api from '@/lib/api'
import { useSessionStore } from '@/stores/sessionStore'
import type { Session } from '@/types'

export const sessionKeys = {
  all: ['sessions'] as const,
  current: () => [...sessionKeys.all, 'current'] as const,
  history: () => [...sessionKeys.all, 'history'] as const,
}

export function useCurrentSession() {
  const { setSession, setCurrentKind } = useSessionStore()

  return useQuery({
    queryKey: sessionKeys.current(),
    queryFn: async () => {
      const session = await api.getCurrentSession()
      if (session) {
        setSession(session)
        // Get last action kind from events
        if (session.events && session.events.length > 0) {
          const lastActionEvent = [...session.events]
            .reverse()
            .find((e) => e.type === 'ACTION_SWITCH')
          if (lastActionEvent?.kind) {
            setCurrentKind(lastActionEvent.kind)
          }
        }
      }
      return session
    },
  })
}

export function useStartSession() {
  const queryClient = useQueryClient()
  const { setSession, setCurrentKind } = useSessionStore()

  return useMutation({
    mutationFn: api.startSession,
    onSuccess: (session: Session) => {
      setSession(session)
      setCurrentKind('neutral')
      queryClient.setQueryData(sessionKeys.current(), session)
    },
  })
}

export function useEndSession() {
  const queryClient = useQueryClient()
  const { clearSession } = useSessionStore()

  return useMutation({
    mutationFn: (sessionId: string) => api.endSession(sessionId),
    onSuccess: () => {
      clearSession()
      queryClient.setQueryData(sessionKeys.current(), null)
      queryClient.invalidateQueries({ queryKey: sessionKeys.history() })
    },
  })
}

export function useSessionHistory() {
  return useQuery({
    queryKey: sessionKeys.history(),
    queryFn: () => api.getSessionHistory(),
  })
}
