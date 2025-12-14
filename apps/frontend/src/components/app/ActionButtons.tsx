'use client'

import type { ActionKind } from '@/types'
import styles from './ActionButtons.module.css'

interface ActionButtonsProps {
  currentKind: ActionKind
  onKindChange: (kind: ActionKind) => void
  disabled?: boolean
}

const actions: { kind: ActionKind; label: string; emoji: string }[] = [
  { kind: 'work', label: '일', emoji: '💼' },
  { kind: 'break', label: '휴식', emoji: '☕' },
  { kind: 'neutral', label: '기타', emoji: '🌿' },
]

export function ActionButtons({
  currentKind,
  onKindChange,
  disabled,
}: ActionButtonsProps) {
  return (
    <div className={styles.container}>
      {actions.map(({ kind, label, emoji }) => (
        <button
          key={kind}
          className={`${styles.button} ${styles[kind]} ${
            currentKind === kind ? styles.active : ''
          }`}
          onClick={() => onKindChange(kind)}
          disabled={disabled}
        >
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </div>
  )
}
