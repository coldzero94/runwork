# API Specification (v1)

## Authentication
- 모든 API는 인증 필요
- Authorization: Bearer <token>

---

## Settings API

### GET /me/settings
현재 활성화된 커스터마이징 설정 조회

Response:
{
  "version": 3,
  "characterId": "runner_02",
  "actions": [
    {
      "slot": 0,
      "label": "일",
      "kind": "work",
      "themeId": "city_day",
      "pace": "fast"
    }
  ]
}

---

### PUT /me/settings
커스터마이징 설정 저장

Validation:
- actions.length ≤ 5
- slot은 0~4, 중복 불가
- themeId / characterId는 제공 목록 내 값만 허용

---

## Session API

### POST /sessions/today/start
오늘의 Run 시작

Response:
{
  "sessionId": "sess_123",
  "startedAt": "2025-12-13T09:01:00Z",
  "settingsVersion": 3
}

---

### POST /sessions/{sessionId}/events/batch
이벤트 배치 전송

Request:
[
  {
    "ts": "2025-12-13T09:10:00Z",
    "type": "ACTION_SWITCH",
    "payload": {
      "actionSlot": 1,
      "label": "휴식"
    }
  }
]

Rules:
- ts는 start 이후여야 함
- 이벤트는 시간순 정렬 필요 없음 (서버에서 정렬)

---

### POST /sessions/{sessionId}/end
하루 종료

Response:
{
  "endedAt": "2025-12-13T22:40:00Z"
}

---

### GET /sessions/{sessionId}/summary
하루 요약 조회