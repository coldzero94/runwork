# Phase 4: 완성도 높이기

## 목표

나머지 화면 구현, 디자인 완성, 배포

## 진행 현황

```text
Progress: ░░░░░░░░░░ 0% (0/24)
```

---

## 1. History 화면

- [ ] **app/app/history/page.tsx**
  - 달력 뷰
  - 날짜별 세션 목록

- [ ] **components/app/Calendar.tsx**
  - 월간 달력
  - 세션 있는 날짜 표시 (동그라미)
  - 날짜 선택 기능

- [ ] **components/app/SessionCard.tsx**
  - 개별 세션 카드
  - 시작/종료 시간
  - 타임라인 바

- [ ] **hooks/useHistory.ts**
  - `GET /sessions/history` 호출
  - 날짜별 필터링

---

## 2. Settings 화면

- [ ] **app/app/settings/page.tsx**
  - 설정 목록

- [ ] **캐릭터 선택**
  - 캐릭터 목록 표시
  - 선택한 캐릭터 저장

- [ ] **테마 선택**
  - 테마 목록 표시
  - 선택한 테마 저장

- [ ] **계정 정보**
  - 이메일 표시
  - 로그아웃 버튼

---

## 3. 디자인 완성

- [ ] **소개 페이지 디자인**
  - Hero 애니메이션
  - 스크롤 효과

- [ ] **Run Screen 디자인**
  - 버튼 스타일링
  - 타이머 스타일링
  - 반응형 레이아웃

- [ ] **PixiJS 완성**
  - 실제 캐릭터 스프라이트
  - 실제 배경 이미지
  - 파티클 효과 (바람, 먼지)
  - 시간대별 배경 변화

- [ ] **애니메이션 추가**
  - 페이지 전환 애니메이션
  - 버튼 호버/클릭 효과
  - 상태 전환 애니메이션

---

## 4. 세션 복구 (Recovery)

- [ ] **10시간 이상 부재 감지**
  - 마지막 활동 시간 체크
  - 복구 다이얼로그 표시

- [ ] **components/app/RecoveryDialog.tsx**
  - "계속 진행" 옵션
  - "마지막 활동 시점에 종료" 옵션
  - "기록 조정" 옵션

- [ ] **Backend 복구 API 연동**
  - `POST /sessions/:id/recover`

---

## 5. 24시간 자동 종료

- [ ] **앱 접속 시 체크**
  - 24시간 지난 세션 감지
  - 자동 종료 처리

- [ ] **종료 알림**
  - "어제 세션이 자동 종료되었습니다" 표시

---

## 6. 반응형 대응

- [ ] **모바일 레이아웃**
  - Run Screen 모바일 뷰
  - 버튼 크기 조정
  - 터치 영역 확보

- [ ] **태블릿 레이아웃**
  - 중간 크기 대응

---

## 7. 배포

- [ ] **Backend 배포 (Fly.io)**
  ```bash
  cd apps/backend
  fly launch
  fly deploy
  fly secrets set DATABASE_URL=...
  ```

- [ ] **Frontend 배포 (Vercel)**
  - GitHub 연동
  - Root Directory: `apps/frontend`
  - 환경 변수 설정

- [ ] **도메인 연결**
  - 커스텀 도메인 설정 (선택)

- [ ] **배포 후 테스트**
  - Production 환경에서 전체 플로우 테스트

---

## 8. 최종 점검

- [ ] **접근성 체크**
  - 터치 타겟 크기 (44x44px 이상)
  - 컬러 대비

- [ ] **성능 체크**
  - Lighthouse 점수
  - 번들 사이즈

- [ ] **에러 모니터링 (선택)**
  - Sentry 연동

---

## 완료 기준

- [ ] 모든 화면 구현 완료
- [ ] Production 배포 완료
- [ ] 실제 사용 가능한 상태

---

## MVP 완료!

Phase 4 완료 = **MVP 출시 준비 완료**
