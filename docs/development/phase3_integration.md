# Phase 3: 통합 및 연동

## 목표

Frontend ↔ Backend 연동, 실제 데이터 흐름 완성

## 진행 현황

```text
Progress: ░░░░░░░░░░ 0% (0/18)
```

---

## 1. API 연동

- [ ] **TanStack Query 설정**
  - `app/providers.tsx` - QueryClientProvider
  - 에러 핸들링 설정

- [ ] **hooks/useSession.ts**
  - `useQuery`로 현재 세션 조회
  - `useMutation`으로 세션 시작/종료

- [ ] **hooks/useEvents.ts**
  - `useQuery`로 이벤트 목록 조회
  - `useMutation`으로 이벤트 추가

- [ ] **Run Screen API 연동**
  - 세션 시작 시 `POST /sessions`
  - 상태 변경 시 `POST /sessions/:id/events`
  - 메모 추가 시 `POST /sessions/:id/events`
  - 종료 시 `POST /sessions/:id/end`

---

## 2. 인증 플로우

- [ ] **로그인 후 리다이렉트**
  - 로그인 성공 → `/app`으로 이동
  - 토큰 저장 확인

- [ ] **인증 상태 유지**
  - 페이지 새로고침 시에도 로그인 유지
  - Supabase `onAuthStateChange` 리스너

- [ ] **로그아웃 처리**
  - 토큰 삭제
  - `/` 로 리다이렉트

- [ ] **Protected Route**
  - `/app/*` 경로 미인증 시 `/login`으로 리다이렉트

---

## 3. 실시간 상태 동기화

- [ ] **세션 상태와 UI 동기화**
  - API 응답에 따라 UI 업데이트
  - 낙관적 업데이트 (Optimistic Update)

- [ ] **타이머와 세션 연동**
  - 세션 시작 시간 기준 타이머 계산
  - 페이지 새로고침해도 타이머 유지

- [ ] **게임 영역 상태 연동**
  - `currentKind`에 따라 캐릭터 속도 변경
  - `currentKind`에 따라 배경 속도 변경

---

## 4. 오프라인 처리 (기본)

- [ ] **네트워크 상태 감지**
  - `navigator.onLine` 체크
  - 오프라인 시 UI 표시

- [ ] **로컬 저장**
  - 오프라인 시 이벤트 localStorage에 저장
  - 온라인 복귀 시 서버에 동기화

- [ ] **동기화 큐**
  - 대기 중인 이벤트 목록 관리
  - 순차적으로 서버에 전송

---

## 5. 에러 처리

- [ ] **API 에러 핸들링**
  - 네트워크 에러
  - 인증 에러 (401)
  - 서버 에러 (500)

- [ ] **에러 UI**
  - Toast 알림
  - 재시도 버튼

- [ ] **폼 에러 표시**
  - 로그인/회원가입 실패 메시지

---

## 6. 테스트

- [ ] **E2E 시나리오 테스트**
  1. 회원가입
  2. 로그인
  3. 세션 시작
  4. 상태 변경 (work → break)
  5. 메모 추가
  6. 세션 종료
  7. 로그아웃

- [ ] **오프라인 테스트**
  - 네트워크 끊고 이벤트 추가
  - 네트워크 복구 후 동기화 확인

---

## 완료 기준

- [ ] 전체 플로우 동작 (회원가입 → 세션 → 종료)
- [ ] 새로고침해도 세션 유지
- [ ] 오프라인에서 이벤트 저장 → 온라인 시 동기화

---

## 다음 단계

Phase 3 완료 후 → [Phase 4: 완성도 높이기](./phase4_polish.md)
