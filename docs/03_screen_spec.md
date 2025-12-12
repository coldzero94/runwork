# Screen Specification

## Screens
1. Intro
2. Entry
3. Run
4. Finish

## Screen Responsibility
- Intro: 감정 유입
- Entry: 선택 최소화
- Run: 몰입과 기록
- Finish: 정서적 종결

## Hard Rules
- Run 화면에서 설정 변경 불가
- Finish 화면은 분석 UI 금지

mermaid
stateDiagram-v2
    Intro --> Entry
    Entry --> Run
    Run --> Finish