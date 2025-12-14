# Phase 4: 완성도 높이기

## 목표

나머지 화면 구현, 디자인 완성, 배포

## 진행 현황

```text
Progress: █████░░░░░ 50% (12/24)
```

---

## 1. History 화면

- [x] **app/app/history/page.tsx**
  - 달력 뷰
  - 날짜별 세션 목록

- [x] **components/app/Calendar.tsx**
  - 월간 달력
  - 세션 있는 날짜 표시 (동그라미)
  - 날짜 선택 기능

- [x] **components/app/SessionCard.tsx**
  - 개별 세션 카드
  - 시작/종료 시간
  - 타임라인 바

- [x] **hooks/useHistory.ts**
  - `useSessionHistory` 훅 (hooks/useSession.ts에 구현)
  - 날짜별 필터링

---

## 2. Settings 화면

- [x] **app/app/settings/page.tsx**
  - 설정 목록

- [ ] **캐릭터 선택** (MVP 이후)
  - 캐릭터 목록 표시
  - 선택한 캐릭터 저장

- [ ] **테마 선택** (MVP 이후)
  - 테마 목록 표시
  - 선택한 테마 저장

- [x] **계정 정보**
  - 이메일 표시
  - 로그아웃 버튼

---

## 3. 디자인 완성

- [x] **소개 페이지 디자인**
  - Hero 섹션
  - 기능 카드

- [x] **Run Screen 디자인**
  - 버튼 스타일링
  - 타이머 스타일링
  - 반응형 레이아웃

- [x] **PixiJS 완성** (기본 구현)
  - Graphics API로 캐릭터 구현
  - 패럴랙스 배경
  - 상태별 애니메이션 속도 변경

- [ ] **애니메이션 추가** (MVP 이후)
  - 페이지 전환 애니메이션
  - 버튼 호버/클릭 효과
  - 상태 전환 애니메이션

---

## 4. 세션 복구 (Recovery)

> MVP 이후 구현

- [ ] **10시간 이상 부재 감지**
- [ ] **components/app/RecoveryDialog.tsx**
- [ ] **Backend 복구 API 연동**

---

## 5. 24시간 자동 종료

> MVP 이후 구현

- [ ] **앱 접속 시 체크**
- [ ] **종료 알림**

---

## 6. 반응형 대응

- [x] **모바일 레이아웃**
  - 네비게이션 아이콘만 표시
  - History 페이지 스택 레이아웃

- [x] **태블릿 레이아웃**
  - 중간 크기 대응

---

## 7. 배포

- [x] **Backend 배포 설정 (Fly.io)**
  - Dockerfile 생성
  - fly.toml 생성
  ```bash
  cd apps/backend
  fly launch
  fly deploy
  fly secrets set DATABASE_URL=...
  fly secrets set SUPABASE_JWT_SECRET=...
  ```

- [ ] **Frontend 배포 (Vercel)**
  - GitHub 연동
  - Root Directory: `apps/frontend`
  - 환경 변수 설정

- [ ] **도메인 연결** (선택)
  - 커스텀 도메인 설정

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

- [x] 모든 화면 구현 완료
- [ ] Production 배포 완료
- [ ] 실제 사용 가능한 상태

---

## MVP 완료!

Phase 4 완료 = **MVP 출시 준비 완료**
