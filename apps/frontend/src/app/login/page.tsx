'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import styles from './page.module.css'

export default function LoginPage() {
  const router = useRouter()
  const { signInWithEmail, signInWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmail(email, password)
      router.push('/app')
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google 로그인에 실패했습니다')
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>
            Runwork
          </Link>
          <h1 className={styles.title}>로그인</h1>
          <p className={styles.subtitle}>다시 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <Input
            label="이메일"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="비밀번호"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" fullWidth loading={loading}>
            로그인
          </Button>

          <div className={styles.divider}>
            <span>또는</span>
          </div>

          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={handleGoogleLogin}
          >
            Google로 계속하기
          </Button>
        </form>

        <p className={styles.footer}>
          계정이 없으신가요?{' '}
          <Link href="/signup" className={styles.link}>
            회원가입
          </Link>
        </p>
      </div>
    </main>
  )
}
