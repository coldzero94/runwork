'use client'

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import type { Session } from '@/types'
import styles from './SessionCard.module.css'

interface SessionCardProps {
  session: Session
}

export function SessionCard({ session }: SessionCardProps) {
  const startTime = new Date(session.started_at)
  const endTime = session.ended_at ? new Date(session.ended_at) : null

  const durationMs = endTime
    ? endTime.getTime() - startTime.getTime()
    : Date.now() - startTime.getTime()
  const hours = Math.floor(durationMs / (1000 * 60 * 60))
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))

  // Calculate time segments from events
  const segments = calculateSegments(session)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.time}>
          <span className={styles.startTime}>
            {format(startTime, 'HH:mm', { locale: ko })}
          </span>
          <span className={styles.separator}>→</span>
          <span className={styles.endTime}>
            {endTime ? format(endTime, 'HH:mm', { locale: ko }) : '진행 중'}
          </span>
        </div>
        <div className={styles.duration}>
          {hours > 0 && `${hours}시간 `}
          {minutes}분
        </div>
      </div>

      <div className={styles.timeline}>
        {segments.map((segment, idx) => (
          <div
            key={idx}
            className={styles.segment}
            data-kind={segment.kind}
            style={{ width: `${segment.percentage}%` }}
            title={`${segment.kind}: ${segment.duration}분`}
          />
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} data-kind="work" />
          <span>일</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} data-kind="break" />
          <span>휴식</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} data-kind="neutral" />
          <span>기타</span>
        </div>
      </div>
    </div>
  )
}

interface Segment {
  kind: string
  percentage: number
  duration: number
}

function calculateSegments(session: Session): Segment[] {
  if (!session.events || session.events.length === 0) {
    return [{ kind: 'neutral', percentage: 100, duration: 0 }]
  }

  const startTime = new Date(session.started_at).getTime()
  const endTime = session.ended_at
    ? new Date(session.ended_at).getTime()
    : Date.now()
  const totalDuration = endTime - startTime

  if (totalDuration <= 0) {
    return [{ kind: 'neutral', percentage: 100, duration: 0 }]
  }

  const segments: Segment[] = []
  let currentKind = 'neutral'
  let lastTimestamp = startTime

  // Sort events by timestamp
  const sortedEvents = [...session.events]
    .filter((e) => e.type === 'ACTION_SWITCH')
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  for (const event of sortedEvents) {
    const eventTime = new Date(event.timestamp).getTime()
    const duration = eventTime - lastTimestamp

    if (duration > 0) {
      segments.push({
        kind: currentKind,
        percentage: (duration / totalDuration) * 100,
        duration: Math.round(duration / (1000 * 60)),
      })
    }

    currentKind = event.kind || 'neutral'
    lastTimestamp = eventTime
  }

  // Add remaining segment
  const remainingDuration = endTime - lastTimestamp
  if (remainingDuration > 0) {
    segments.push({
      kind: currentKind,
      percentage: (remainingDuration / totalDuration) * 100,
      duration: Math.round(remainingDuration / (1000 * 60)),
    })
  }

  return segments.length > 0
    ? segments
    : [{ kind: 'neutral', percentage: 100, duration: 0 }]
}
