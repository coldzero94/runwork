.PHONY: frontend backend lint-frontend lint-backend lint check-frontend check-backend check

# ===========================================
# Development Servers
# ===========================================

# Frontend (localhost:2000)
frontend:
	cd frontend && pnpm dev --port 2000

# Backend (localhost:7070)
backend:
	cd backend && go run cmd/server/main.go

# ===========================================
# Code Quality - Individual
# ===========================================

lint-frontend:
	cd frontend && pnpm lint

lint-backend:
	cd backend && go vet ./...

check-frontend:
	cd frontend && pnpm tsc --noEmit && pnpm lint

check-backend:
	cd backend && go build ./... && go vet ./...

# ===========================================
# Code Quality - All
# ===========================================

lint: lint-frontend lint-backend

check: check-frontend check-backend
