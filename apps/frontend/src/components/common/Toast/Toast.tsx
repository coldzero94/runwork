'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Toast.module.css'

export interface ToastProps {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose: (id: string) => void
}

export function Toast({
  id,
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  return (
    <motion.div
      className={styles.toast}
      data-type={type}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <span className={styles.icon}>
        {type === 'success' && '✓'}
        {type === 'error' && '✕'}
        {type === 'info' && 'ℹ'}
      </span>
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={() => onClose(id)}>
        ×
      </button>
    </motion.div>
  )
}

interface ToastContainerProps {
  toasts: Array<{
    id: string
    message: string
    type?: 'success' | 'error' | 'info'
  }>
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className={styles.container}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  )
}
