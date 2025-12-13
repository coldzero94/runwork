# User Experience Flow

## 1. 전체 사용자 여정

```mermaid
flowchart TD
    subgraph 첫방문["첫 방문 (신규 사용자)"]
        A1[앱 진입] --> A2[Intro]
        A2 --> A3[회원가입/로그인]
        A3 --> A4[온보딩]
        A4 --> A5[첫 RUN]
    end

    subgraph 재방문["재방문 (기존 사용자)"]
        B1[앱 진입] --> B2{활성 세션?}
        B2 -->|Yes| B3[Run 화면 복귀]
        B2 -->|No| B4[Entry]
        B4 --> B5[RUN]
    end

    subgraph 일과["하루 일과"]
        C1[Run 화면] --> C2[상태 전환]
        C2 --> C3[메모 작성]
        C3 --> C2
        C2 --> C4[END]
        C4 --> C5[Finish]
    end

    A5 --> 일과
    B3 --> 일과
    B5 --> 일과
```

---

## 2. 화면별 상세 플로우

### 2.1 신규 사용자 플로우

```mermaid
sequenceDiagram
    participant U as User
    participant App as runwork
    participant BE as Backend

    U->>App: 앱 진입
    App->>U: Intro 화면
    U->>App: 시작하기 클릭
    App->>U: 로그인/회원가입 화면

    alt 이메일 가입
        U->>App: 이메일/비밀번호 입력
        App->>BE: POST /auth/signup
        BE->>U: 인증 메일 발송
        U->>BE: 메일 링크 클릭
        BE->>App: 인증 완료
    else Google 로그인
        U->>App: Google 버튼 클릭
        App->>BE: POST /auth/google
        BE->>App: 토큰 발급
    end

    App->>U: 온보딩 시작 (환영 화면)
    U->>App: 캐릭터 선택
    App->>U: 간단한 설명 (1장)
    U->>App: 바로 달리기 클릭
    App->>BE: POST /sessions/today/start
    BE->>App: sessionId
    App->>U: Run 화면 (첫 달리기)
```

### 2.2 기존 사용자 플로우

```mermaid
sequenceDiagram
    participant U as User
    participant App as runwork
    participant BE as Backend

    U->>App: 앱 진입
    App->>BE: GET /sessions/active

    alt 활성 세션 있음
        BE->>App: session 정보

        alt 이탈 시간 < 10시간
            App->>U: Run 화면 복귀
        else 이탈 시간 >= 10시간
            App->>U: 복귀 다이얼로그
            U->>App: 옵션 선택
            App->>BE: POST /sessions/{id}/recovery
            BE->>App: 처리 완료
            App->>U: Run 화면 또는 Entry
        end
    else 활성 세션 없음
        BE->>App: null
        App->>U: Entry 화면
    end
```

### 2.3 Run 세션 플로우

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant BE as Backend

    U->>FE: RUN 클릭
    FE->>BE: POST /sessions/today/start
    BE->>FE: sessionId, startedAt
    FE->>FE: 타이머 시작, 캐릭터 달리기

    loop 하루 동안
        alt 상태 전환
            U->>FE: 버튼 클릭 (일/휴식/etc)
            FE->>FE: 배경 전환, 이벤트 큐잉
            FE-->>BE: POST /events/batch (비동기)
        else 메모 작성
            U->>FE: 메모 입력
            FE->>FE: NOTE_ADD 이벤트 큐잉
            FE-->>BE: POST /events/batch (비동기)
        else 오프라인
            FE->>FE: 로컬 큐에 이벤트 저장
            Note over FE: 온라인 복구 시 배치 전송
        end
    end

    U->>FE: END 클릭
    FE->>BE: POST /sessions/{id}/end
    BE->>BE: 요약 생성
    BE->>FE: endedAt
    FE->>BE: GET /sessions/{id}/summary
    BE->>FE: summary
    FE->>U: Finish 화면
```

---

## 3. 온보딩 상세

### 3.1 온보딩 진입 조건
- 신규 가입 완료 직후
- `isNewUser: true` 상태

### 3.2 온보딩 플로우

```mermaid
flowchart TD
    A[가입 완료] --> B[환영 화면]
    B --> C[캐릭터 선택]
    C --> D[간단한 설명 1장]
    D --> E[즉시 RUN]
    E --> F[첫 달리기 완료]
    F --> G[Entry 화면]

    style B fill:#e1f5fe
    style C fill:#e1f5fe
    style D fill:#e1f5fe
    style E fill:#fff3e0
    style F fill:#e8f5e9
```

### 3.3 온보딩 화면 상세

#### Step 1: 환영 화면
```
┌─────────────────────────────────────────┐
│                                         │
│          runwork에 오신 것을            │
│              환영합니다                 │
│                                         │
│     "오늘도 멈추지 않고 달려봐요"       │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │           시작하기              │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

#### Step 2: 캐릭터 선택
```
┌─────────────────────────────────────────┐
│                                         │
│        함께 달릴 친구를 골라주세요      │
│                                         │
│   [러너] [고양이] [강아지] [토끼]       │
│   [ 곰 ] [펭귄]  [여우]  [햄스터]       │
│                                         │
│        (나중에 언제든 바꿀 수 있어요)   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │             선택 완료           │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

#### Step 3: 간단한 설명
```
┌─────────────────────────────────────────┐
│                                         │
│         버튼을 눌러 상태를 바꾸고       │
│         하루가 끝나면 END를 눌러요      │
│                                         │
│              그게 전부예요!             │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │          바로 달리기!           │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### 3.4 온보딩 규칙

| 규칙 | 설명 |
|------|------|
| 스킵 불가 | 전체 과정이 30초 이내로 설계 |
| 설명 1장 | 텍스트 3줄 이하 |
| 캐릭터 필수 선택 | 기본값: runner_default |
| 첫 RUN 즉시 | 온보딩 완료 후 바로 Run 진입 |

### 3.5 온보딩 가드레일

- 모든 기능 설명 금지
- 통계/분석 언급 금지
- 목표 설정 유도 금지
- "생산성", "효율" 단어 사용 금지

---

## 4. 플로우 가드레일

```mermaid
flowchart TD
    subgraph 허용["허용"]
        A1[RUN으로 시작]
        A2[END로 종료]
        A3[수동 상태 전환]
    end

    subgraph 금지["금지"]
        B1[자동 시작]
        B2[자동 종료*]
        B3[자동 상태 전환]
    end

    style 허용 fill:#e8f5e9
    style 금지 fill:#ffebee
```

**예외**: 24시간 자동 종료는 데이터 무결성을 위해 허용

---

## 5. 화면 전환 맵

```mermaid
stateDiagram-v2
    [*] --> Intro
    Intro --> Auth: 시작하기

    Auth --> Onboarding: 신규 가입
    Auth --> Entry: 기존 로그인

    Onboarding --> Run: 온보딩 완료

    Entry --> Run: RUN 클릭
    Entry --> History: History 메뉴
    Entry --> Settings: Settings 메뉴

    Run --> Finish: END 클릭
    Run --> RecoveryDialog: 장시간 이탈 후 복귀

    RecoveryDialog --> Run: 계속하기
    RecoveryDialog --> Finish: 이탈 시점 종료
    RecoveryDialog --> Entry: 기록 조정 후

    Finish --> Entry: 완료
    Finish --> History: 기록 보기

    History --> Entry: 뒤로
    History --> HistoryDetail: 날짜 선택

    HistoryDetail --> History: 뒤로

    Settings --> Entry: 뒤로
```

---

## 6. API 연동 포인트

| 화면 전환 | API 호출 |
|----------|----------|
| 앱 진입 | `GET /sessions/active` |
| 회원가입 | `POST /auth/signup` |
| 로그인 | `POST /auth/login`, `POST /auth/google` |
| 온보딩 완료 | `POST /me/onboarding/complete` |
| RUN 시작 | `POST /sessions/today/start` |
| 상태 전환 | `POST /sessions/{id}/events/batch` |
| END | `POST /sessions/{id}/end` |
| Finish | `GET /sessions/{id}/summary` |
| 복귀 조정 | `POST /sessions/{id}/recovery` |
| History | `GET /sessions/history` |
