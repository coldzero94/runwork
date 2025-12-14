'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import styles from './layout.module.css'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useAuth()

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

  const navItems = [
    { href: '/app', label: '홈', icon: '🏃' },
    { href: '/app/history', label: '기록', icon: '📅' },
    { href: '/app/settings', label: '설정', icon: '⚙️' },
  ]

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link href="/app" className={styles.logo}>
          Runwork
        </Link>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navItem}
              data-active={pathname === item.href}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
