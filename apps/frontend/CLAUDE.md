# Frontend CLAUDE.md

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 5.9
- CSS Modules (planned)
- Framer Motion (planned)
- PixiJS (planned)
- Zustand (planned)
- TanStack Query (planned)

## Project Structure

```
frontend/
├── src/
│   └── app/           # Next.js App Router
│       ├── layout.tsx # Root layout
│       └── page.tsx   # Home page
├── .env               # Environment variables (git ignored)
├── .env.example       # Environment template
├── next.config.ts     # Next.js config
├── tsconfig.json      # TypeScript config
└── package.json
```

## Planned Structure (Phase 2+)

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/        # Auth pages (login, signup)
│   │   ├── (marketing)/   # Landing page
│   │   └── app/           # Main app pages
│   ├── components/
│   │   ├── ui/            # Reusable UI components
│   │   └── game/          # PixiJS game components
│   ├── hooks/             # Custom React hooks
│   ├── stores/            # Zustand stores
│   ├── lib/               # Utilities
│   └── styles/            # Global styles, CSS variables
```

## Commands

```bash
pnpm dev --port 2000   # Dev server
pnpm build             # Production build
pnpm lint              # ESLint check
pnpm tsc --noEmit      # TypeScript check
```

## Code Quality Rules

Before committing, ensure:

1. **No TypeScript errors**: `pnpm tsc --noEmit`
2. **No ESLint errors/warnings**: `pnpm lint`
3. **Build succeeds**: `pnpm build`

## Environment Variables

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anonymous key |
| NEXT_PUBLIC_API_URL | Backend API URL (default: http://localhost:7070) |

## Conventions

- Use CSS Modules for styling (`.module.css`)
- Components use PascalCase: `MyComponent.tsx`
- Hooks use camelCase with `use` prefix: `useAuth.ts`
- Keep components small and focused
- Colocate related files (component + styles + tests)
