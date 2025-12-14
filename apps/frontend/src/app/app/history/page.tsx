'use client'

import { useState, useMemo } from 'react'
import { format, isSameDay } from 'date-fns'
import { Calendar } from '@/components/app/Calendar'
import { SessionCard } from '@/components/app/SessionCard'
import { useSessionHistory } from '@/hooks'
import styles from './page.module.css'

export default function HistoryPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { data: sessions = [], isLoading } = useSessionHistory()

  // Get dates that have sessions
  const sessionDates = useMemo(() => {
    return sessions.map((session) =>
      format(new Date(session.started_at), 'yyyy-MM-dd')
    )
  }, [sessions])

  // Filter sessions for selected date
  const selectedSessions = useMemo(() => {
    return sessions.filter((session) =>
      isSameDay(new Date(session.started_at), selectedDate)
    )
  }, [sessions, selectedDate])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>기록</h1>

      <div className={styles.content}>
        <div className={styles.calendarSection}>
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            sessionDates={sessionDates}
          />
        </div>

        <div className={styles.sessionsSection}>
          <h2 className={styles.dateTitle}>
            {format(selectedDate, 'M월 d일')}
          </h2>

          {isLoading ? (
            <div className={styles.loading}>불러오는 중...</div>
          ) : selectedSessions.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>📅</span>
              <p>이 날의 기록이 없습니다</p>
            </div>
          ) : (
            <div className={styles.sessionList}>
              {selectedSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
