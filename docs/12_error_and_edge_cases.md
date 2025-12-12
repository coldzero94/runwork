# Error & Edge Cases

## Network Failure
- Frontend는 이벤트를 로컬 큐에 저장
- 네트워크 복구 시 batch 전송

## App Closed During Run
- 재접속 시:
  - 세션 상태 RUNNING이면
  - 마지막 이벤트 이후 이어서 Run 화면 복원

## Duplicate Events
- Backend는 idempotency key로 중복 방지

## Invalid Settings
- 서버 검증 실패 시
- 저장 거부 + 명확한 에러 코드 반환