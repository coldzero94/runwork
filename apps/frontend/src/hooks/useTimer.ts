'use client'

import { useState, useEffect, useCallback } from 'react'

export function useTimer(startTime: Date | null) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!startTime) {
      setElapsed(0)
      return
    }

    const updateElapsed = () => {
      const now = new Date()
      const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000)
      setElapsed(diff)
    }

    updateElapsed()
    const interval = setInterval(updateElapsed, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
      formatted: `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`,
    }
  }, [])

  return {
    elapsed,
    ...formatTime(elapsed),
  }
}
