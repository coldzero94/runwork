# Day Session Lifecycle

## Lifecycle Definition
하루의 Session은 명시적으로 시작되고,
명시적으로 종료되어야만 완료된다.

## States
- CREATED
- RUNNING
- FINISHED

## Rules
- 하루에 Session은 하나만 존재 가능
- FINISHED 이후 이벤트 수신 불가
- 자정 자동 종료 없음