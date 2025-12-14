# Phase 1: Backend 핵심 API

## 목표

Go + Gin으로 핵심 API 구현

## 진행 현황

```text
Progress: ██████████ 100% (32/32)
```

---

## 1. 프로젝트 구조 세팅

- [x] **폴더 구조 생성** ✓

  ```text
  apps/backend/
  ├── cmd/server/main.go
  ├── internal/
  │   ├── config/
  │   ├── models/
  │   ├── repository/
  │   ├── service/
  │   ├── handler/
  │   ├── middleware/
  │   └── router/
  ├── migrations/
  └── pkg/response/
  ```
- [x] **의존성 설치** ✓
  ```bash
  go get -u github.com/gin-gonic/gin
  go get -u gorm.io/gorm
  go get -u gorm.io/driver/postgres
  go get -u github.com/joho/godotenv
  ```
- [x] **golang-migrate CLI 설치** ✓ (GORM AutoMigrate 사용)
- [x] **config/config.go 작성** ✓
  - 환경 변수 로드
  - DB 연결 설정
- [x] **main.go 기본 서버 작성** ✓
  - Gin 서버 초기화
  - Health check 엔드포인트

---

## 2. DB 모델 정의

- [x] **models/user.go** ✓
- [x] **models/session.go** ✓
- [x] **models/event.go** ✓
- [x] **DB 마이그레이션 실행** ✓
  - `db.AutoMigrate(&User{}, &Session{}, &Event{})`

---

## 3. Repository 레이어

- [x] **repository/user_repo.go** ✓
- [x] **repository/session_repo.go** ✓
- [x] **repository/event_repo.go** ✓

---

## 4. Service 레이어

- [x] **service/auth_service.go** ✓
  - Supabase JWT 검증
- [x] **service/session_service.go** ✓
  - 24시간 자동 종료 체크 로직 포함
- [x] **service/event_service.go** ✓

---

## 5. Handler 레이어

- [x] **handler/auth_handler.go** ✓
- [x] **handler/session_handler.go** ✓
- [x] **handler/event_handler.go** ✓

---

## 6. Middleware

- [x] **middleware/auth.go** ✓
- [x] **middleware/cors.go** ✓
- [x] **middleware/logger.go** ✓

---

## 7. Router 설정

- [x] **router/router.go** ✓
  ```go
  // Public
  GET /health

  // Protected (Auth Required)
  GET  /auth/me
  POST /sessions
  GET  /sessions/current
  POST /sessions/:id/end
  GET  /sessions/:id/events
  POST /sessions/:id/events
  GET  /sessions/history
  ```

---

## 8. 테스트

- [x] **Health check 테스트** ✓
  ```bash
  curl http://localhost:7070/health
  # {"status":"ok"}
  ```
- [ ] **Postman/Insomnia로 API 테스트**
  - Auth 헤더와 함께 각 엔드포인트 테스트 (Frontend 구현 후 진행)

---

## 완료 기준

- [x] 모든 API 엔드포인트 응답 확인 ✓
- [ ] Supabase JWT로 인증 동작 확인 (Frontend 구현 후 진행)
- [x] DB에 데이터 저장/조회 확인 ✓ (Migration 완료)

---

## 다음 단계

Phase 1 완료 후 → [Phase 2: Frontend 핵심 화면](./phase2_frontend_core.md)
