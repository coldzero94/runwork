'use client'

import dynamic from 'next/dynamic'
import { useSessionStore } from '@/stores/sessionStore'
import { toast } from '@/stores/toastStore'
import { Timer } from '@/components/app/Timer'
import { ActionButtons } from '@/components/app/ActionButtons'
import { NoteInput } from '@/components/app/NoteInput'
import { Button } from '@/components/common/Button'
import {
  useCurrentSession,
  useStartSession,
  useEndSession,
  useAddEvent,
} from '@/hooks'
import type { ActionKind } from '@/types'
import styles from './page.module.css'

// Dynamic import for PixiJS (client-side only)
const RunCanvas = dynamic(
  () => import('@/components/game/RunCanvas').then((mod) => mod.RunCanvas),
  { ssr: false }
)

export default function AppPage() {
  const { session, currentKind } = useSessionStore()

  const { isLoading: sessionLoading } = useCurrentSession()
  const startSession = useStartSession()
  const endSession = useEndSession()
  const addEvent = useAddEvent()

  const isLoading =
    startSession.isPending || endSession.isPending || addEvent.isPending

  const handleStartSession = () => {
    startSession.mutate(undefined, {
      onSuccess: () => {
        toast.success('런을 시작했습니다!')
      },
      onError: (error) => {
        console.error('Failed to start session:', error)
        toast.error(error instanceof Error ? error.message : '세션 시작에 실패했습니다')
      },
    })
  }

  const handleEndSession = () => {
    if (!session) return
    if (!confirm('정말 오늘의 런을 종료하시겠습니까?')) return

    endSession.mutate(session.id, {
      onSuccess: () => {
        toast.success('오늘의 런을 종료했습니다!')
      },
      onError: (error) => {
        console.error('Failed to end session:', error)
        toast.error(error instanceof Error ? error.message : '세션 종료에 실패했습니다')
      },
    })
  }

  const handleKindChange = (kind: ActionKind) => {
    if (!session || kind === currentKind) return

    addEvent.mutate(
      { sessionId: session.id, type: 'ACTION_SWITCH', kind },
      {
        onError: (error) => {
          console.error('Failed to switch action:', error)
          toast.error(error instanceof Error ? error.message : '상태 변경에 실패했습니다')
        },
      }
    )
  }

  const handleAddNote = (note: string) => {
    if (!session) return

    addEvent.mutate(
      { sessionId: session.id, type: 'NOTE_ADD', note },
      {
        onSuccess: () => {
          toast.success('메모가 저장되었습니다')
        },
        onError: (error) => {
          console.error('Failed to add note:', error)
          toast.error(error instanceof Error ? error.message : '메모 저장에 실패했습니다')
        },
      }
    )
  }

  if (sessionLoading) {
    return (
      <div className={styles.loading}>
        <p>세션 불러오는 중...</p>
      </div>
    )
  }

  // No active session - show start button
  if (!session) {
    return (
      <div className={styles.container}>
        <div className={styles.idle}>
          <div className={styles.idleEmoji}>🏃</div>
          <h1 className={styles.idleTitle}>오늘의 런을 시작해보세요</h1>
          <p className={styles.idleSubtitle}>
            하루를 시작하고 일, 휴식, 기타 상태를 전환하며 기록해보세요
          </p>
          <Button
            size="lg"
            onClick={handleStartSession}
            loading={startSession.isPending}
          >
            런 시작하기
          </Button>
        </div>
      </div>
    )
  }

  // Active session - show run screen
  const startTime = new Date(session.started_at)

  return (
    <div className={styles.container}>
      <div className={styles.runScreen}>
        <div className={styles.statusBadge} data-kind={currentKind}>
          {currentKind === 'work' && '💼 일하는 중'}
          {currentKind === 'break' && '☕ 휴식 중'}
          {currentKind === 'neutral' && '🌿 기타'}
        </div>

        <RunCanvas currentKind={currentKind} />

        <Timer startTime={startTime} />

        <ActionButtons
          currentKind={currentKind}
          onKindChange={handleKindChange}
          disabled={isLoading}
        />

        <NoteInput onSubmit={handleAddNote} disabled={isLoading} />

        <div className={styles.endSection}>
          <Button
            variant="outline"
            onClick={handleEndSession}
            loading={endSession.isPending}
          >
            오늘의 런 종료하기
          </Button>
        </div>
      </div>
    </div>
  )
}
