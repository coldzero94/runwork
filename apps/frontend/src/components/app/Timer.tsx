'use client'

import { useTimer } from '@/hooks/useTimer'
import styles from './Timer.module.css'

interface TimerProps {
  startTime: Date | null
}

export function Timer({ startTime }: TimerProps) {
  const { hours, minutes, seconds } = useTimer(startTime)

  return (
    <div className={styles.timer}>
      <span className={styles.digit}>{hours}</span>
      <span className={styles.separator}>:</span>
      <span className={styles.digit}>{minutes}</span>
      <span className={styles.separator}>:</span>
      <span className={styles.digit}>{seconds}</span>
    </div>
  )
}
