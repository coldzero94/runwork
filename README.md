# runwork

> 시간을 관리하는 서비스가 아니라, 오늘 내가 멈추지 않고 달려왔다는 사실을 기록하는 서비스

## What is runwork?

runwork는 "달리기"를 은유로 사용하는 데일리 로그 서비스입니다.

하루를 달리기처럼 시작하고, 일/휴식/중립 상태를 전환하며, 끝나면 종료합니다. 달리는 캐릭터 애니메이션과 함께 **"오늘도 나는 멈추지 않았다"**는 완주의 감각을 제공합니다.

### 제품의 목표

runwork는 하루를 관리하거나 평가하지 않습니다. 대신:

- 완벽하지 않아도 된다
- 중간에 쉬어도 된다
- 계획과 달라도 된다

중요한 것은 **하루를 완주했다는 감각**입니다.

## Features

- **Session Management**: 하루를 달리기처럼 시작/일시정지/종료
- **State Tracking**: Work, Break, Neutral 상태 전환
- **Animated Runner**: PixiJS로 구현된 실시간 러닝 캐릭터
- **Session History**: 지난 세션 기록 조회
- **Cozy Design**: 따뜻하고 부드러운 "Cozy Runner" 스타일

## Tech Stack

### Frontend
- **Next.js 14+** (App Router) + TypeScript
- **PixiJS** - 러닝 캐릭터 애니메이션
- **Framer Motion** - UI 애니메이션
- **Zustand** - 상태 관리
- **TanStack Query** - 데이터 페칭
- **CSS Modules** - 스타일링

### Backend
- **Go 1.21+** + Gin
- **GORM** - ORM
- **JWT** - 인증
- **golang-migrate** - DB 마이그레이션

### Infrastructure
- **Vercel** - 프론트엔드 호스팅
- **Fly.io** - 백엔드 호스팅
- **Supabase** - PostgreSQL + Auth

*모든 인프라는 free tier 사용*

## Getting Started

### Prerequisites
- Node.js 18+
- Go 1.21+
- pnpm

### Development

```bash
# 저장소 클론
git clone https://github.com/yourusername/runwork.git
cd runwork

# 프론트엔드 의존성 설치
cd apps/frontend
pnpm install

# 개발 서버 실행
cd apps
make frontend  # localhost:2000
make backend   # localhost:7070
```

### Code Quality

```bash
cd apps
make check  # TypeScript + ESLint + Go build + vet
make lint   # Lint만 실행
```

## Project Structure

```
runwork/
├── apps/
│   ├── frontend/    # Next.js 앱
│   └── backend/     # Go + Gin API
├── docs/            # 프로젝트 문서
└── packages/        # 공유 패키지 (향후)
```

## Documentation

- [CLAUDE.md](CLAUDE.md) - 개발 워크플로우 및 현재 상태
- [Product Overview](docs/00_product_overview.md) - 제품 철학 및 목표
- [Tech Stack](docs/10_tech_stack.md) - 아키텍처 및 기술 결정
- [Design System](docs/09_design_system.md) - 디자인 가이드라인