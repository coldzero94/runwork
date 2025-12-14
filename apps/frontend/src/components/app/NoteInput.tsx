'use client'

import { useState, KeyboardEvent } from 'react'
import styles from './NoteInput.module.css'

interface NoteInputProps {
  onSubmit: (note: string) => void
  disabled?: boolean
}

export function NoteInput({ onSubmit, disabled }: NoteInputProps) {
  const [note, setNote] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && note.trim()) {
      onSubmit(note.trim())
      setNote('')
    }
  }

  const handleClick = () => {
    if (note.trim()) {
      onSubmit(note.trim())
      setNote('')
    }
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="메모를 입력하세요 (Enter로 저장)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        className={styles.button}
        onClick={handleClick}
        disabled={disabled || !note.trim()}
      >
        저장
      </button>
    </div>
  )
}
