# Phase 2: Frontend 핵심 화면

## 목표

Next.js로 핵심 화면 구현 (소개, 로그인, Run Screen)

## 진행 현황

```text
Progress: ░░░░░░░░░░ 0% (0/32)
```

---

## 1. 프로젝트 구조 세팅

- [ ] **폴더 구조 생성**
  ```
  apps/frontend/src/
  ├── app/
  ├── components/
  ├── hooks/
  ├── stores/
  ├── lib/
  ├── styles/
  └── types/
  ```
- [ ] **의존성 설치**
  ```bash
  pnpm add @supabase/supabase-js zustand @tanstack/react-query
  pnpm add framer-motion pixi.js @pixi/react
  pnpm add react-hook-form date-fns
  ```
- [ ] **lib/supabase.ts 작성**
  - Supabase 클라이언트 초기화
- [ ] **lib/api.ts 작성**
  - Backend API 호출 함수들
- [ ] **styles/variables.css 작성**
  - 디자인 시스템 CSS 변수 (컬러, 폰트)
- [ ] **styles/globals.css 작성**
  - 전역 스타일, 리셋

---

## 2. 타입 정의

- [ ] **types/user.ts**
  ```typescript
  interface User {
    id: string
    email: string
  }
  ```
- [ ] **types/session.ts**
  ```typescript
  interface Session {
    id: string
    userId: string
    status: 'IDLE' | 'RUNNING' | 'FINISHING' | 'FINISHED'
    startedAt: string
    endedAt?: string
  }
  ```
- [ ] **types/event.ts**
  ```typescript
  interface SessionEvent {
    id: string
    sessionId: string
    type: 'SESSION_START' | 'ACTION_SWITCH' | 'NOTE_ADD' | 'SESSION_END'
    kind?: 'work' | 'break' | 'neutral'
    note?: string
    timestamp: string
  }
  ```

---

## 3. 상태 관리

- [ ] **stores/userStore.ts**
  - `user: User | null`
  - `setUser(user: User)`
  - `clearUser()`

- [ ] **stores/sessionStore.ts**
  - `session: Session | null`
  - `currentKind: string`
  - `setSession(session: Session)`
  - `setCurrentKind(kind: string)`

---

## 4. 인증 훅

- [ ] **hooks/useAuth.ts**
  - `user` - 현재 유저
  - `loading` - 로딩 상태
  - `signInWithEmail(email, password)`
  - `signInWithGoogle()`
  - `signUp(email, password)`
  - `signOut()`

---

## 5. 소개 페이지 (/)

- [ ] **app/page.tsx**
  - SSG로 렌더링
  - Hero 섹션
  - 기능 소개 섹션
  - CTA 버튼 (시작하기)

- [ ] **components/landing/Hero.tsx**
  - 메인 타이틀
  - 간단한 애니메이션 (Framer Motion)

- [ ] **components/landing/Features.tsx**
  - 기능 카드들

- [ ] **app/page.module.css**
  - 소개 페이지 스타일

---

## 6. 로그인/회원가입

- [ ] **app/login/page.tsx**
  - 이메일/비밀번호 폼
  - Google 로그인 버튼
  - 회원가입 링크

- [ ] **app/signup/page.tsx**
  - 이메일/비밀번호 폼
  - 로그인 링크

- [ ] **components/common/Input/**
  - 재사용 가능한 입력 컴포넌트

- [ ] **components/common/Button/**
  - Primary, Secondary 버튼

---

## 7. 앱 레이아웃

- [ ] **app/app/layout.tsx**
  - 인증 체크 (미로그인 시 리다이렉트)
  - 공통 레이아웃 (헤더 등)

---

## 8. Run Screen

- [ ] **app/app/page.tsx**
  - 'use client' (CSR)
  - Run Screen 메인 컴포넌트

- [ ] **components/app/Timer.tsx**
  - 경과 시간 표시
  - `useTimer` 훅 사용

- [ ] **hooks/useTimer.ts**
  - 타이머 로직
  - 시작/정지/리셋

- [ ] **components/app/ActionButtons.tsx**
  - 상태 전환 버튼들 (일, 휴식, 기타...)
  - 현재 선택된 상태 표시

- [ ] **components/app/NoteInput.tsx**
  - 메모 입력 필드
  - 엔터로 전송

- [ ] **components/app/EndButton.tsx**
  - 세션 종료 버튼
  - 확인 모달

---

## 9. PixiJS 게임 영역

- [ ] **components/game/RunCanvas.tsx**
  - PixiJS Application 초기화
  - 화면 리사이즈 대응

- [ ] **components/game/Background.tsx**
  - 패럴랙스 배경 레이어들
  - 스크롤 애니메이션

- [ ] **components/game/Character.tsx**
  - 캐릭터 스프라이트
  - 달리기 애니메이션

- [ ] **임시 에셋 준비**
  - 플레이스홀더 배경 이미지
  - 플레이스홀더 캐릭터 이미지

---

## 10. 테스트

- [ ] **소개 페이지 접속 확인**
- [ ] **로그인/회원가입 동작 확인**
- [ ] **Run Screen 렌더링 확인**
- [ ] **PixiJS 캔버스 동작 확인**

---

## 완료 기준

- [ ] 소개 페이지 표시
- [ ] Supabase로 로그인/회원가입 가능
- [ ] Run Screen에서 타이머 동작
- [ ] PixiJS 캔버스에 캐릭터 표시

---

## 다음 단계

Phase 2 완료 후 → [Phase 3: 통합 및 연동](./phase3_integration.md)
