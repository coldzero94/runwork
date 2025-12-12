# System Architecture

## Responsibility Split
- Frontend: 시간 흐름, 상태 머신, 애니메이션
- Backend: 저장, 검증, 요약

## Architecture
graph TD
    U[User] --> FE[Frontend]
    FE -->|Settings| BE[Backend]
    FE -->|Events| BE
    BE --> DB[(Database)]

## Session Lifecycle
sequenceDiagram
    FE->>BE: start_session
    FE->>BE: event_batch
    FE->>BE: end_session
    BE->>FE: summary