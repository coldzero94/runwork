import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as api from '@/lib/api'
import { useSessionStore } from '@/stores/sessionStore'
import type { ActionKind, EventType } from '@/types'
import { sessionKeys } from './useSession'

export const eventKeys = {
  all: ['events'] as const,
  bySession: (sessionId: string) => [...eventKeys.all, sessionId] as const,
}

export function useSessionEvents(sessionId: string | undefined) {
  return useQuery({
    queryKey: eventKeys.bySession(sessionId || ''),
    queryFn: () => (sessionId ? api.getSessionEvents(sessionId) : Promise.resolve([])),
    enabled: !!sessionId,
  })
}

export function useAddEvent() {
  const queryClient = useQueryClient()
  const { setCurrentKind } = useSessionStore()

  return useMutation({
    mutationFn: ({
      sessionId,
      type,
      kind,
      note,
    }: {
      sessionId: string
      type: EventType
      kind?: ActionKind
      note?: string
    }) => api.addEvent(sessionId, type, kind, note),
    onSuccess: (event, variables) => {
      // Update current kind if it was an action switch
      if (variables.type === 'ACTION_SWITCH' && variables.kind) {
        setCurrentKind(variables.kind)
      }
      // Invalidate events query
      queryClient.invalidateQueries({
        queryKey: eventKeys.bySession(variables.sessionId),
      })
      // Also invalidate current session to get updated events
      queryClient.invalidateQueries({ queryKey: sessionKeys.current() })
    },
  })
}

export function useSwitchAction() {
  const addEventMutation = useAddEvent()

  return {
    ...addEventMutation,
    mutate: (sessionId: string, kind: ActionKind) => {
      addEventMutation.mutate({ sessionId, type: 'ACTION_SWITCH', kind })
    },
    mutateAsync: (sessionId: string, kind: ActionKind) => {
      return addEventMutation.mutateAsync({
        sessionId,
        type: 'ACTION_SWITCH',
        kind,
      })
    },
  }
}

export function useAddNote() {
  const addEventMutation = useAddEvent()

  return {
    ...addEventMutation,
    mutate: (sessionId: string, note: string) => {
      addEventMutation.mutate({ sessionId, type: 'NOTE_ADD', note })
    },
    mutateAsync: (sessionId: string, note: string) => {
      return addEventMutation.mutateAsync({ sessionId, type: 'NOTE_ADD', note })
    },
  }
}
