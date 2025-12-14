'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import styles from '../login/page.module.css'

export default function SignupPage() {
  const router = useRouter()
  const { signUp, signInWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다')
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다')
      return
    }

    setLoading(true)

    try {
      await signUp(email, password)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다')
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

  if (success) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Link href="/" className={styles.logo}>
              Runwork
            </Link>
            <h1 className={styles.title}>이메일을 확인해주세요</h1>
            <p className={styles.subtitle}>
              {email}로 인증 메일을 보냈습니다.
              <br />
              메일의 링크를 클릭하여 가입을 완료해주세요.
            </p>
          </div>
          <Link href="/login">
            <Button fullWidth variant="outline">
              로그인 페이지로 돌아가기
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>
            Runwork
          </Link>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>새로운 여정을 시작해보세요</p>
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
            placeholder="6자 이상"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" fullWidth loading={loading}>
            회원가입
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
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className={styles.link}>
            로그인
          </Link>
        </p>
      </div>
    </main>
  )
}
