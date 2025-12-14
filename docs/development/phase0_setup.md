# Phase 0: 환경 세팅

## 목표

로컬 개발 환경 구성 및 프로젝트 초기화

## 진행 현황

```text
Progress: ██████████ 100% (13/13)
```

---

## 1. 필수 도구 설치

- [x] **Node.js 설치** (v20+) - v22.14.0 ✓
  - `node -v` 로 확인
- [x] **pnpm 설치** - v10.14.0 ✓
  - `npm install -g pnpm`
- [x] **Go 설치** (v1.21+) - v1.25.4 ✓
  - `go version` 으로 확인
- [x] **Docker 설치** - v28.0.4 ✓
  - `docker -v` 로 확인
- [x] **Fly CLI 설치** - v0.3.231 ✓
  - `brew install flyctl`

---

## 2. Supabase 프로젝트 생성

- [x] **Supabase 계정 생성** ✓
  - https://supabase.com
- [x] **새 프로젝트 생성** ✓
  - 프로젝트명: `runwork`
  - DB 비밀번호 저장 완료
- [x] **API 키 확보** ✓
  - Project Settings > API
  - `SUPABASE_PROJECT_URL` ✓
  - `SUPABASE_API_KEY` (anon) ✓
- [x] **DATABASE_URL 확보** ✓
  - Settings > Database > Connection string
  - Direct connection URL 저장 완료
- [ ] **Google OAuth 설정** (나중에)
  - Authentication > Providers > Google
  - Google Cloud Console에서 OAuth 클라이언트 생성
  - Client ID, Secret 입력

---

## 3. Monorepo 구조 세팅

- [x] **루트 폴더 구조 생성** ✓
  ```bash
  mkdir -p apps/frontend apps/backend packages
  ```
- [x] **루트 .gitignore 업데이트** ✓
- [x] **apps/frontend 초기화** ✓
  - Next.js 16 + TypeScript
  - pnpm build 성공 확인
- [x] **apps/backend 초기화** ✓
  - Go module 생성
  - Gin + godotenv 설치
  - Health check 엔드포인트 구현

---

## 4. 환경 변수 설정

- [x] **apps/frontend/.env 생성** ✓
  ```bash
  NEXT_PUBLIC_SUPABASE_URL=...
  NEXT_PUBLIC_SUPABASE_ANON_KEY=...
  NEXT_PUBLIC_API_URL=http://localhost:7070
  ```
- [x] **apps/backend/.env 생성** ✓
  ```bash
  PORT=7070
  DATABASE_URL=...
  SUPABASE_JWT_SECRET=...
  ```

---

## 5. 로컬 실행 테스트

- [x] **Frontend 실행 확인** ✓
  ```bash
  cd apps/frontend
  pnpm dev --port 2000
  # localhost:2000 접속 확인
  ```
- [x] **Backend 실행 확인** ✓
  ```bash
  cd apps/backend
  go run cmd/server/main.go
  # localhost:7070/health 접속 확인 → {"status":"ok"}
  ```

---

## 완료 기준

- [x] Frontend `localhost:2000` 접속 가능 ✓
- [x] Backend `localhost:7070` 접속 가능 ✓
- [x] Supabase 대시보드에서 프로젝트 확인 가능 ✓

---

## 다음 단계

Phase 0 완료 후 → [Phase 1: Backend 핵심 API](./phase1_backend_core.md)
