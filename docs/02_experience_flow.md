# Experience Flow

## High-Level User Flow

mermaid
sequenceDiagram
    participant U as User
    participant S as System

    U->>S: Intro 진입
    U->>S: 로그인
    U->>S: RUN 클릭
    S->>S: 달리기 시작
    U->>S: 상태 전환 반복
    U->>S: END 클릭
    S->>S: 하루 요약 생성

## Guardrails
- 하루는 RUN으로만 시작된다
- 하루는 END로만 종료된다
- 자동 시작/종료는 존재하지 않는다