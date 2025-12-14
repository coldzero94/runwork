# Phase 0: 환경 세팅

## 목표

로컬 개발 환경 구성 및 프로젝트 초기화

## 진행 현황

```text
Progress: ░░░░░░░░░░ 0% (0/12)
```

---

## 1. 필수 도구 설치

- [ ] **Node.js 설치** (v20+)
  - `node -v` 로 확인
- [ ] **pnpm 설치**
  - `npm install -g pnpm`
- [ ] **Go 설치** (v1.21+)
  - `go version` 으로 확인
- [ ] **Docker 설치**
  - `docker -v` 로 확인
- [ ] **Fly CLI 설치**
  - `brew install flyctl`

---

## 2. Supabase 프로젝트 생성

- [ ] **Supabase 계정 생성**
  - https://supabase.com
- [ ] **새 프로젝트 생성**
  - 프로젝트명: `runwork-dev`
  - 리전: `Northeast Asia (Tokyo)`
  - 비밀번호 저장해두기
- [ ] **API 키 확보**
  - Project Settings > API
  - `SUPABASE_URL` 복사
  - `SUPABASE_ANON_KEY` 복사
  - `SUPABASE_SERVICE_ROLE_KEY` 복사
- [ ] **Google OAuth 설정**
  - Authentication > Providers > Google
  - Google Cloud Console에서 OAuth 클라이언트 생성
  - Client ID, Secret 입력

---

## 3. Monorepo 구조 세팅

- [ ] **루트 폴더 구조 생성**
  ```bash
  mkdir -p apps/frontend apps/backend packages
  ```
- [ ] **루트 .gitignore 생성**
  ```
  node_modules/
  .env
  .env.local
  .DS_Store
  ```
- [ ] **apps/frontend 초기화**
  ```bash
  cd apps/frontend
  pnpm create next-app . --typescript --app --tailwind=false
  ```
- [ ] **apps/backend 초기화**
  ```bash
  cd apps/backend
  go mod init github.com/username/runwork/apps/backend
  ```

---

## 4. 환경 변수 설정

- [ ] **apps/frontend/.env.local 생성**
  ```bash
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  NEXT_PUBLIC_API_URL=http://localhost:8080
  ```
- [ ] **apps/backend/.env 생성**
  ```bash
  PORT=8080
  DATABASE_URL=your_supabase_connection_string
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
  ```

---

## 5. 로컬 실행 테스트

- [ ] **Frontend 실행 확인**
  ```bash
  cd apps/frontend
  pnpm dev
  # localhost:3000 접속 확인
  ```
- [ ] **Backend 실행 확인**
  ```bash
  cd apps/backend
  go run cmd/server/main.go
  # localhost:8080 접속 확인
  ```

---

## 완료 기준

- [ ] Frontend `localhost:3000` 접속 가능
- [ ] Backend `localhost:8080` 접속 가능
- [ ] Supabase 대시보드에서 프로젝트 확인 가능

---

## 다음 단계

Phase 0 완료 후 → [Phase 1: Backend 핵심 API](./phase1_backend_core.md)
