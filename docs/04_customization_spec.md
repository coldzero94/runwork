# Customization Specification

## Purpose
커스터마이징은 자유도가 아니라 안정성을 위한 기능이다.

## Allowed Customization
- 버튼 이름
- 버튼 개수 (최대 5)
- 버튼별 배경 테마
- 캐릭터 선택

## Forbidden
- 버튼 위치 변경
- 사용자 에셋 업로드
- 무제한 상태 생성

## Live Preview Rule
- Preview는 실제 Run 화면과 동일해야 한다
- Preview와 Run 간 시각 차이는 허용되지 않는다

mermaid
graph LR
    Settings --> Preview
    Preview --> Confidence[신뢰]