# runwork Documentation

> **runwork**는 시간을 관리하는 서비스가 아니라, 오늘 내가 멈추지 않고 달려왔다는 사실을 기록하는 서비스다.

---

## 문서 구조

```
docs/
├── 00_product_overview.md          # 제품 개요 및 비전
├── 01_principles_and_guardrails.md # 설계 원칙 및 가드레일
├── 02_user_experience_flow.md      # 사용자 플로우 및 온보딩
├── 03_screen_specification.md      # 화면별 상세 스펙
├── 04_customization_and_assets.md  # 커스터마이징 및 에셋 카탈로그
├── 05_session_and_state.md         # 세션 및 상태 관리
├── 06_system_architecture.md       # 시스템 아키텍처
├── 07_api_specification.md         # API 명세
├── 08_error_handling.md            # 에러 처리 및 엣지 케이스
├── 09_design_system.md             # 디자인 시스템 및 비주얼 가이드
└── README.md                       # 이 파일
```

---

## 빠른 탐색

### 기획/비전

| 문서 | 내용 |
|------|------|
| [00_product_overview](00_product_overview.md) | 제품 목적, 문제 정의, 성공 기준 |
| [01_principles_and_guardrails](01_principles_and_guardrails.md) | 설계 원칙 4가지, v1 가드레일 |

### 사용자 경험

| 문서 | 내용 |
|------|------|
| [02_user_experience_flow](02_user_experience_flow.md) | 전체 사용자 여정, 온보딩, 플로우 다이어그램 |
| [03_screen_specification](03_screen_specification.md) | Intro/Entry/Run/Finish/History/Settings 화면 스펙 |
| [04_customization_and_assets](04_customization_and_assets.md) | 테마 5종, 캐릭터 11종, 커스터마이징 규칙 |

### 디자인

| 문서 | 내용 |
|------|------|
| [09_design_system](09_design_system.md) | 컬러, 타이포그래피, 픽셀 아트 가이드, 컴포넌트, 애니메이션 |

### 기술 설계

| 문서 | 내용 |
|------|------|
| [05_session_and_state](05_session_and_state.md) | 세션 라이프사이클, 상태 머신, 이벤트 시스템, 오프라인 처리 |
| [06_system_architecture](06_system_architecture.md) | Frontend/Backend 책임 분리, 데이터 흐름 |
| [07_api_specification](07_api_specification.md) | 전체 API 명세 (Auth, Session, History, Recovery) |
| [08_error_handling](08_error_handling.md) | 에러 코드 목록, 엣지 케이스, 클라이언트 처리 가이드 |

---

## 핵심 개념

### 설계 원칙

1. **Zero Friction Start** - 어떤 준비 없이 바로 시작
2. **User Is Always Moving** - 멈춤도 하나의 상태
3. **No Retrospective Editing** - 기록은 수정할 수 없다
4. **Visual First, Numbers Later** - 숫자는 보조 정보

### v1 가드레일

**절대 추가하지 않는 것:**
- 통계 화면
- 사용자 간 비교
- 생산성 점수
- 자동 시작/종료
- 목표 설정

### 핵심 플로우

```
Intro → Entry → RUN → Run 화면 → END → Finish
                ↑                        ↓
                └── History에서 조회 ←───┘
```

---

## 주요 엔티티

### Session 상태

| 상태 | 설명 |
|------|------|
| IDLE | 세션 없음 (Entry) |
| RUNNING | 달리기 진행 중 |
| FINISHING | END 후 애니메이션 |
| FINISHED | 완료 (Finish) |

### 이벤트 타입

| 타입 | 설명 |
|------|------|
| SESSION_START | 세션 시작 |
| ACTION_SWITCH | 상태 전환 |
| NOTE_ADD | 메모 추가 |
| SESSION_END | 수동 종료 |
| SESSION_AUTO_END | 24시간 자동 종료 |

### 테마 (5종)

| ID | 이름 | 분위기 |
|----|------|--------|
| city_day | 도시의 낮 | 활기찬 |
| city_night | 도시의 밤 | 차분한 |
| park_morning | 공원의 아침 | 상쾌한 |
| beach_sunset | 해변의 노을 | 여유로운 |
| mountain_twilight | 산의 황혼 | 고요한 |

### 캐릭터 (11종)

**러너 (3):** runner_default, runner_hoodie, runner_suit

**동물 (8):** cat, dog, rabbit, bear, penguin, fox, hamster

---

## 기술 스택 (권장)

### Frontend
- React / Next.js
- TypeScript
- Zustand (상태 관리)
- IndexedDB (오프라인 큐)
- Canvas / Pixi.js (애니메이션)

### Backend
- Node.js / Express 또는 Fastify
- PostgreSQL
- Redis (캐싱, Rate Limit)
- JWT (인증)

---

## v1 완료 기준

| # | 조건 |
|---|------|
| 1 | RUN 버튼으로 즉시 시작 가능 |
| 2 | 상태 전환이 즉시 시각적으로 반영됨 |
| 3 | 문장 입력으로 로그를 남길 수 있음 |
| 4 | 하루를 명시적으로 종료할 수 있음 |
| 5 | 해당 하루를 다시 볼 수 있음 |

---

## 변경 이력

| 버전 | 날짜 | 내용 |
|------|------|------|
| v1.0 | 2025-12-13 | 초기 문서 작성 |
| v1.1 | 2025-12-13 | 문서 구조 재정비, Mermaid 다이어그램 추가 |
| v1.2 | 2025-12-13 | 디자인 시스템 문서 추가 |
