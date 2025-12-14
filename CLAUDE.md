# CLAUDE.md

## Project Overview

**runwork** - A daily log service using "running" as a metaphor.

- Start the day like a run, switch between work/break/neutral states, end when done
- PixiJS for running character animation
- "Cozy Runner" style (warm and soft feeling)

## Architecture

```
Vercel (Frontend) ─── Fly.io (Backend) ─── Supabase (DB + Auth)
     Next.js              Go + Gin           PostgreSQL
```

## Tech Stack

### Frontend

- Next.js 14+ (App Router), TypeScript, CSS Modules
- Framer Motion (UI animation), PixiJS (game canvas)
- Zustand (state), TanStack Query (data fetching)

### Backend

- Go 1.21+, Gin, GORM, golang-migrate

### Infrastructure

- Vercel (Frontend), Fly.io (Backend), Supabase (DB + Auth)
- All free tier

## Project Structure

```text
runwork/
├── apps/
│   ├── frontend/    # Next.js app
│   └── backend/     # Go + Gin API
├── docs/
│   ├── 00-09_*.md   # Planning & design docs
│   ├── 10_tech_stack.md
│   └── development/ # Phase-based checklists
└── packages/        # Shared packages (future)
```

## Development Workflow

### Phase-Based Development

Development follows phases defined in `docs/development/`:

1. **Phase 0**: Environment setup
2. **Phase 1**: Backend core API
3. **Phase 2**: Frontend core screens
4. **Phase 3**: Integration
5. **Phase 4**: Polish & deploy

### Progress Tracking Rules

1. **Each phase document tracks its own progress**
   - Update checkboxes in `docs/development/phase*.md` as tasks complete
   - Update the progress bar at the top of each phase document

2. **Update documents on every change**
   - When completing a task: mark checkbox in phase doc
   - When architecture changes: update `docs/10_tech_stack.md`
   - When adding new features: update relevant planning docs

3. **Keep CLAUDE.md updated**
   - Update current phase status below
   - Update if project structure or workflow changes

## Current Status

| Phase | Document | Status |
|-------|----------|--------|
| 0 | [phase0_setup.md](docs/development/phase0_setup.md) | ✅ Complete |
| 1 | [phase1_backend_core.md](docs/development/phase1_backend_core.md) | Not Started |
| 2 | [phase2_frontend_core.md](docs/development/phase2_frontend_core.md) | Not Started |
| 3 | [phase3_integration.md](docs/development/phase3_integration.md) | Not Started |
| 4 | [phase4_polish.md](docs/development/phase4_polish.md) | Not Started |

## Key Documents

- [Tech Stack](docs/10_tech_stack.md) - Full architecture & tech decisions
- [Development Roadmap](docs/development/README.md) - Phase index
- [Design System](docs/09_design_system.md) - Visual design guidelines

## Commands

```bash
cd apps

# Development servers
make frontend          # localhost:2000
make backend           # localhost:7070

# Code quality
make check             # Full check (TypeScript + ESLint + Go build + vet)
make lint              # Lint only
```

## Notes

- All infrastructure uses free tier
- SSG: Landing, Login, Signup pages
- CSR: /app/* pages (PixiJS, real-time state)
