# Frontend ↔ Backend Contract

본 문서는 runwork에서
Frontend와 Backend의 책임을 명확히 구분하기 위한 계약 문서다.

## Core Principle
- 시간은 Frontend가 관리한다
- Backend는 저장하고 검증한다
- Backend는 Run의 "진행"에 관여하지 않는다

## Frontend Responsibilities
- Run 상태 머신 관리
- 타이머 및 시간 흐름 계산
- 애니메이션 및 화면 전환
- 오프라인 이벤트 큐잉
- Live Preview 렌더링

## Backend Responsibilities
- 사용자 설정 검증 및 저장
- DaySession 생성/종료
- 이벤트 append-only 저장
- 요약 데이터 생성

## Explicit Non-responsibilities (Backend)
- 타이머 실행 ❌
- 자동 종료 ❌
- 상태 판단 ❌

flowchart LR
    FE[Frontend] -->|Events| BE[Backend]
    BE -->|Validation & Save| DB[(DB)]