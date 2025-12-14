'use client'

import { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from 'date-fns'
import { ko } from 'date-fns/locale'
import styles from './Calendar.module.css'

interface CalendarProps {
  selectedDate: Date
  onSelectDate: (date: Date) => void
  sessionDates?: string[] // ISO date strings (YYYY-MM-DD)
}

export function Calendar({
  selectedDate,
  onSelectDate,
  sessionDates = [],
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

  const days: Date[] = []
  let day = calendarStart
  while (day <= calendarEnd) {
    days.push(day)
    day = addDays(day, 1)
  }

  const hasSession = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return sessionDates.includes(dateStr)
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button className={styles.navButton} onClick={handlePrevMonth}>
          ‹
        </button>
        <span className={styles.monthTitle}>
          {format(currentMonth, 'yyyy년 M월', { locale: ko })}
        </span>
        <button className={styles.navButton} onClick={handleNextMonth}>
          ›
        </button>
      </div>

      <div className={styles.weekdays}>
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.days}>
        {days.map((date, idx) => {
          const isCurrentMonth = isSameMonth(date, currentMonth)
          const isSelected = isSameDay(date, selectedDate)
          const isToday = isSameDay(date, new Date())
          const hasSessionOnDay = hasSession(date)

          return (
            <button
              key={idx}
              className={styles.day}
              data-current-month={isCurrentMonth}
              data-selected={isSelected}
              data-today={isToday}
              onClick={() => onSelectDate(date)}
            >
              <span className={styles.dayNumber}>{format(date, 'd')}</span>
              {hasSessionOnDay && <span className={styles.sessionDot} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
