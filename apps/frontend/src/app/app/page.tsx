'use client'

import { useEffect, useState } from 'react'
import { useSessionStore } from '@/stores/sessionStore'
import { Timer } from '@/components/app/Timer'
import { ActionButtons } from '@/components/app/ActionButtons'
import { NoteInput } from '@/components/app/NoteInput'
import { Button } from '@/components/common/Button'
import * as api from '@/lib/api'
import type { ActionKind } from '@/types'
import styles from './page.module.css'

export default function AppPage() {
  const { session, currentKind, setSession, setCurrentKind, clearSession } =
    useSessionStore()
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    loadCurrentSession()
  }, [])

  const loadCurrentSession = async () => {
    try {
      const currentSession = await api.getCurrentSession()
      if (currentSession) {
        setSession(currentSession)
        // Get last action kind from events if available
        if (currentSession.events && currentSession.events.length > 0) {
          const lastActionEvent = [...currentSession.events]
            .reverse()
            .find((e) => e.type === 'ACTION_SWITCH')
          if (lastActionEvent?.kind) {
            setCurrentKind(lastActionEvent.kind)
          }
        }
      }
    } catch (error) {
      console.error('Failed to load session:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartSession = async () => {
    setActionLoading(true)
    try {
      const newSession = await api.startSession()
      setSession(newSession)
      setCurrentKind('neutral')
    } catch (error) {
      console.error('Failed to start session:', error)
      alert(error instanceof Error ? error.message : '세션 시작에 실패했습니다')
    } finally {
      setActionLoading(false)
    }
  }

  const handleEndSession = async () => {
    if (!session) return

    if (!confirm('정말 오늘의 런을 종료하시겠습니까?')) return

    setActionLoading(true)
    try {
      await api.endSession(session.id)
      clearSession()
    } catch (error) {
      console.error('Failed to end session:', error)
      alert(error instanceof Error ? error.message : '세션 종료에 실패했습니다')
    } finally {
      setActionLoading(false)
    }
  }

  const handleKindChange = async (kind: ActionKind) => {
    if (!session || kind === currentKind) return

    setActionLoading(true)
    try {
      await api.addEvent(session.id, 'ACTION_SWITCH', kind)
      setCurrentKind(kind)
    } catch (error) {
      console.error('Failed to switch action:', error)
      alert(error instanceof Error ? error.message : '상태 변경에 실패했습니다')
    } finally {
      setActionLoading(false)
    }
  }

  const handleAddNote = async (note: string) => {
    if (!session) return

    try {
      await api.addEvent(session.id, 'NOTE_ADD', undefined, note)
    } catch (error) {
      console.error('Failed to add note:', error)
      alert(error instanceof Error ? error.message : '메모 저장에 실패했습니다')
    }
  }

  if (loading) {
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
            loading={actionLoading}
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

        <Timer startTime={startTime} />

        <ActionButtons
          currentKind={currentKind}
          onKindChange={handleKindChange}
          disabled={actionLoading}
        />

        <NoteInput onSubmit={handleAddNote} disabled={actionLoading} />

        <div className={styles.endSection}>
          <Button
            variant="outline"
            onClick={handleEndSession}
            loading={actionLoading}
          >
            오늘의 런 종료하기
          </Button>
        </div>
      </div>
    </div>
  )
}
