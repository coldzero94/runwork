'use client'

import { useState, useEffect, useCallback } from 'react'

export function useTimer(startTime: Date | null) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!startTime) {
      // Reset elapsed via timeout to avoid synchronous setState
      const resetTimeout = setTimeout(() => setElapsed(0), 0)
      return () => clearTimeout(resetTimeout)
    }

    const updateElapsed = () => {
      const now = new Date()
      const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000)
      setElapsed(diff)
    }

    // Initial update via timeout to avoid synchronous setState
    const initialTimeout = setTimeout(updateElapsed, 0)
    const interval = setInterval(updateElapsed, 1000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
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
