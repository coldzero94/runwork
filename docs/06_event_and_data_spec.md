# Event & Data Specification

## Event Philosophy
- Event는 사실이다
- 해석은 나중에 한다

## Event Types
- SESSION_START
- ACTION_SWITCH
- NOTE_ADD
- SESSION_END

## Data Rules
- 이벤트는 append-only
- 삭제/수정 API 없음


mermaid
graph TD
    EventLog --> Summary
    EventLog --> Timeline