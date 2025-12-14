'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import styles from './layout.module.css'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo}>Runwork</div>
        <div className={styles.userInfo}>
          <span className={styles.email}>{user.email}</span>
          <button onClick={signOut} className={styles.logoutButton}>
            로그아웃
          </button>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
