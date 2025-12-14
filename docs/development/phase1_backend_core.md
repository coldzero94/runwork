# Phase 1: Backend 핵심 API

## 목표

Go + Gin으로 핵심 API 구현

## 진행 현황

```text
Progress: ░░░░░░░░░░ 0% (0/32)
```

---

## 1. 프로젝트 구조 세팅

- [ ] **폴더 구조 생성**

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
- [ ] **의존성 설치**
  ```bash
  go get -u github.com/gin-gonic/gin
  go get -u gorm.io/gorm
  go get -u gorm.io/driver/postgres
  go get -u github.com/joho/godotenv
  ```
- [ ] **golang-migrate CLI 설치**
  ```bash
  # macOS
  brew install golang-migrate

  # 또는 go install
  go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
  ```
- [ ] **config/config.go 작성**
  - 환경 변수 로드
  - DB 연결 설정
- [ ] **main.go 기본 서버 작성**
  - Gin 서버 초기화
  - Health check 엔드포인트

---

## 2. DB 모델 정의

- [ ] **models/user.go**
  ```go
  type User struct {
    ID        string    `gorm:"primaryKey"`
    Email     string    `gorm:"uniqueIndex"`
    CreatedAt time.Time
    UpdatedAt time.Time
  }
  ```
- [ ] **models/session.go**
  ```go
  type Session struct {
    ID        string    `gorm:"primaryKey"`
    UserID    string    `gorm:"index"`
    Status    string    // IDLE, RUNNING, FINISHING, FINISHED
    StartedAt time.Time
    EndedAt   *time.Time
  }
  ```
- [ ] **models/event.go**
  ```go
  type Event struct {
    ID        string    `gorm:"primaryKey"`
    SessionID string    `gorm:"index"`
    Type      string    // SESSION_START, ACTION_SWITCH, NOTE_ADD, SESSION_END
    Kind      *string   // work, break, neutral
    Note      *string
    Timestamp time.Time
  }
  ```
- [ ] **DB 마이그레이션 실행**
  - `db.AutoMigrate(&User{}, &Session{}, &Event{})`

---

## 3. Repository 레이어

- [ ] **repository/user_repo.go**
  - `FindByID(id string) (*User, error)`
  - `FindByEmail(email string) (*User, error)`
  - `Create(user *User) error`

- [ ] **repository/session_repo.go**
  - `FindByID(id string) (*Session, error)`
  - `FindCurrentByUserID(userID string) (*Session, error)`
  - `FindByUserIDAndDate(userID string, date time.Time) ([]Session, error)`
  - `Create(session *Session) error`
  - `Update(session *Session) error`

- [ ] **repository/event_repo.go**
  - `FindBySessionID(sessionID string) ([]Event, error)`
  - `Create(event *Event) error`

---

## 4. Service 레이어

- [ ] **service/auth_service.go**
  - `ValidateToken(token string) (*User, error)`
  - Supabase JWT 검증

- [ ] **service/session_service.go**
  - `StartSession(userID string) (*Session, error)`
  - `GetCurrentSession(userID string) (*Session, error)`
  - `EndSession(sessionID string) (*Session, error)`
  - 24시간 자동 종료 체크 로직

- [ ] **service/event_service.go**
  - `AddEvent(sessionID string, eventType string, kind *string, note *string) (*Event, error)`
  - `GetSessionEvents(sessionID string) ([]Event, error)`

---

## 5. Handler 레이어

- [ ] **handler/auth_handler.go**
  - `GET /auth/me` - 현재 유저 정보

- [ ] **handler/session_handler.go**
  - `POST /sessions` - 세션 시작
  - `GET /sessions/current` - 현재 세션 조회
  - `POST /sessions/:id/end` - 세션 종료
  - `GET /sessions/history` - 히스토리 조회

- [ ] **handler/event_handler.go**
  - `POST /sessions/:id/events` - 이벤트 추가
  - `GET /sessions/:id/events` - 이벤트 목록

---

## 6. Middleware

- [ ] **middleware/auth.go**
  - JWT 토큰 검증
  - Context에 유저 정보 저장

- [ ] **middleware/cors.go**
  - CORS 설정

- [ ] **middleware/logger.go**
  - 요청 로깅

---

## 7. Router 설정

- [ ] **router/router.go**
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

- [ ] **Health check 테스트**
  ```bash
  curl http://localhost:8080/health
  ```
- [ ] **Postman/Insomnia로 API 테스트**
  - Auth 헤더와 함께 각 엔드포인트 테스트

---

## 완료 기준

- [ ] 모든 API 엔드포인트 응답 확인
- [ ] Supabase JWT로 인증 동작 확인
- [ ] DB에 데이터 저장/조회 확인

---

## 다음 단계

Phase 1 완료 후 → [Phase 2: Frontend 핵심 화면](./phase2_frontend_core.md)
