'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import styles from './page.module.css'

export default function SettingsPage() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      await signOut()
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>설정</h1>

      <div className={styles.sections}>
        {/* Account Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>계정</h2>
          <div className={styles.card}>
            <div className={styles.row}>
              <span className={styles.label}>이메일</span>
              <span className={styles.value}>{user?.email || '-'}</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.row}>
              <span className={styles.label}>로그아웃</span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                로그아웃
              </Button>
            </div>
          </div>
        </section>

        {/* App Info Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>앱 정보</h2>
          <div className={styles.card}>
            <div className={styles.row}>
              <span className={styles.label}>버전</span>
              <span className={styles.value}>1.0.0</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.row}>
              <span className={styles.label}>개발자</span>
              <span className={styles.value}>Runwork Team</span>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>준비 중</h2>
          <div className={styles.card}>
            <div className={styles.comingSoon}>
              <span className={styles.comingSoonIcon}>🎨</span>
              <p className={styles.comingSoonText}>
                캐릭터 선택, 테마 설정 등 더 많은 기능이 준비 중입니다!
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
