# Backend CLAUDE.md

## Tech Stack

- Go 1.25
- Gin (HTTP framework)
- GORM (ORM, planned)
- golang-migrate (DB migrations, planned)
- godotenv (environment variables)

## Project Structure

```
backend/
├── cmd/
│   └── server/
│       └── main.go    # Entry point
├── .env               # Environment variables (git ignored)
├── .env.example       # Environment template
├── go.mod             # Go module
└── go.sum             # Dependency lock
```

## Planned Structure (Phase 1+)

```
backend/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── config/        # Configuration
│   ├── handler/       # HTTP handlers
│   ├── middleware/    # Auth, CORS, etc.
│   ├── model/         # Domain models
│   ├── repository/    # Database access
│   └── service/       # Business logic
├── migrations/        # SQL migrations
└── pkg/               # Shared utilities
```

## Commands

```bash
go run cmd/server/main.go   # Run server
go build ./...              # Build check
go vet ./...                # Static analysis
go test ./...               # Run tests
```

## Code Quality Rules

Before committing, ensure:

1. **Build succeeds**: `go build ./...`
2. **No vet warnings**: `go vet ./...`
3. **Tests pass**: `go test ./...`

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 7070) |
| DATABASE_URL | PostgreSQL connection string |
| SUPABASE_JWT_SECRET | JWT secret for auth validation |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Health check |

## Conventions

- Use standard Go project layout
- Handlers in `internal/handler/`
- Business logic in `internal/service/`
- Database operations in `internal/repository/`
- Keep handlers thin, logic in services
- Use dependency injection
- Error handling: wrap errors with context
