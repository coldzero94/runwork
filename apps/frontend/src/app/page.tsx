import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            하루를 <span className={styles.highlight}>달리듯</span> 기록하세요
          </h1>
          <p className={styles.subtitle}>
            Runwork는 달리기를 메타포로 한 데일리 로그 서비스입니다.
            <br />
            일, 휴식, 기타 상태를 전환하며 하루의 흐름을 기록해보세요.
          </p>
          <div className={styles.cta}>
            <Link href="/login" className={styles.primaryButton}>
              시작하기
            </Link>
            <Link href="#features" className={styles.secondaryButton}>
              더 알아보기
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏃</div>
              <h3>달리기 메타포</h3>
              <p>하루를 시작하고 끝내는 것을 달리기처럼 표현해요</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎯</div>
              <h3>상태 전환</h3>
              <p>일, 휴식, 기타 상태를 쉽게 전환하며 기록해요</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📝</div>
              <h3>메모 기능</h3>
              <p>중요한 순간에 간단한 메모를 남길 수 있어요</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3>히스토리</h3>
              <p>지난 기록을 돌아보며 패턴을 파악해요</p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2024 Runwork. Built with Next.js</p>
      </footer>
    </main>
  )
}
