import { create } from 'zustand'
import type { Session, ActionKind } from '@/types'

interface SessionState {
  session: Session | null
  currentKind: ActionKind
  setSession: (session: Session | null) => void
  setCurrentKind: (kind: ActionKind) => void
  clearSession: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  currentKind: 'neutral',
  setSession: (session) => set({ session }),
  setCurrentKind: (kind) => set({ currentKind: kind }),
  clearSession: () => set({ session: null, currentKind: 'neutral' }),
}))
