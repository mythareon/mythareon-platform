# Mythareon - Calibrate Every Layer of Your AI

[![Backend Build](https://img.shields.io/github/actions/workflow/status/mythareon/mythareon-platform/ci.yml?branch=main&label=backend%20build)](https://github.com/mythareon/mythareon-platform/actions/workflows/ci.yml)
[![Frontend Build](https://img.shields.io/github/actions/workflow/status/mythareon/mythareon-platform/ci.yml?branch=main&label=frontend%20build)](https://github.com/mythareon/mythareon-platform/actions/workflows/ci.yml)
[![Backend Version](https://img.shields.io/badge/backend-v0.1.0-blue)](https://github.com/mythareon/mythareon-platform)
[![Frontend Version](https://img.shields.io/badge/frontend-v0.1.0-0A7EA4)](https://github.com/mythareon/mythareon-platform)

**Status:** Week 1 Implementation Sprint 🚀

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Python 3.11+
- Node.js 18+
- PostgreSQL 15 (via Docker)
- Redis 7 (via Docker)

### Local Development Setup

```bash
# 1. Start infrastructure
docker-compose up -d

# 2. Create backend .env
cp .env.example .env
# Edit .env with your values

# 3. Install backend dependencies
cd backend
pip install -r requirements.txt

# 4. Run migrations (when ready)
# alembic upgrade head

# 5. Start backend dev server
uvicorn app.main:app --reload --port 8000

# 6. In another terminal, set up frontend
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your values

# 7. Start frontend dev server
npm run dev
```

Frontend: http://localhost:3000
Backend API: http://localhost:8000
API Docs: http://localhost:8000/docs

Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)

## Project Structure

```
mythareon/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── main.py            # FastAPI app initialization
│   │   ├── config.py          # Pydantic settings (env vars)
│   │   ├── db/
│   │   │   ├── models.py      # SQLAlchemy ORM models
│   │   │   └── session.py     # Database session management
│   │   └── api/
│   │       └── routes/        # API endpoints
│   │           ├── auth.py    # Authentication routes
│   │           ├── projects.py
│   │           ├── datasets.py
│   │           ├── eval_runs.py
│   │           └── webhooks.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/                   # Next.js 14 frontend
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── workspaces/
│   ├── styles/globals.css
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env.example
│
├── docker-compose.yml         # PostgreSQL + Redis
└── .gitignore
```

## Technology Stack

### Backend
- **Framework:** FastAPI 0.104+
- **ORM:** SQLAlchemy 2.0 + async
- **Validation:** Pydantic V2
- **Database:** PostgreSQL 15
- **Cache/Queue:** Redis 7 + Celery
- **Authentication:** Clerk (passwordless)
- **Payments:** Stripe (metered billing)

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Auth:** Clerk
- **HTTP:** Axios

## Database Schema

**Core Entities:**
- `users` — Clerk-synced user records
- `workspaces` — Team containers
- `projects` — LLM projects
- `environments` — dev/staging/prod
- `datasets` — Test case collections
- `test_cases` — Individual test inputs
- `prompt_versions` — Prompt variants
- `eval_runs` — Eval execution records
- `eval_results` — Individual test results
- `release_policies` — Release gates
- `released_versions` — Production versions

## API Endpoints (Phase 1)

```
POST   /api/auth/sync-user               # Sync Clerk user
GET    /api/auth/me                      # Get current user

POST   /api/workspaces/{id}/projects     # Create project
GET    /api/workspaces/{id}/projects     # List projects
GET    /api/projects/{id}                # Get project

POST   /api/projects/{id}/datasets       # Create dataset
POST   /api/projects/{id}/datasets/{id}/upload  # Upload test cases
GET    /api/projects/{id}/datasets/{id}  # Get dataset

POST   /api/projects/{id}/eval-runs      # Create eval run
GET    /api/projects/{id}/eval-runs/{id} # Get eval status
GET    /api/projects/{id}/eval-runs      # List eval runs

GET    /api/workspaces?clerk_id=...      # List user workspaces
POST   /api/workspaces?clerk_id=...      # Create workspace

GET    /api/billing/me?clerk_id=...      # Current plan/subscription status
GET    /api/billing/checkout?clerk_id=...# Start Stripe checkout for Pro plan
GET    /api/billing/portal?clerk_id=...  # Open Stripe billing portal

POST   /webhooks/clerk                   # Clerk lifecycle events
POST   /webhooks/github                  # GitHub CI/CD integration
POST   /webhooks/stripe                  # Stripe subscription events
```

## Week 1-4 Roadmap

### Week 1 (This Week)
- [ ] Docker infra running locally
- [ ] Landing page live at `mythareon.vercel.app`
- [ ] 10+ discovery calls booked
- [ ] MVP scaffold complete
- [ ] 3 design partners committed

### Week 2
- [ ] Auth flow (Clerk)
- [ ] Workspace/project CRUD
- [ ] Design partner access

### Week 3
- [ ] Dataset upload
- [ ] Eval runner (async)
- [ ] Results display

### Week 4
- [ ] Release gates (the key feature)
- [ ] CLI tool
- [ ] First 1-2 paying customers

## Development Commands

```bash
# Backend
uvicorn app.main:app --reload              # Dev server with hot reload
python -m pytest                           # Run tests
python -m alembic revision --autogenerate  # Create migration

# Frontend
npm run dev                                # Dev server
npm run build                              # Production build
npm run type-check                         # TypeScript validation
npm run format                             # Code formatting

# Docker
docker-compose up -d                       # Start services
docker-compose down                        # Stop services
docker-compose logs -f postgres            # View logs

# Makefile (recommended)
make install                               # Install backend + frontend deps
make test                                  # Run backend + frontend tests
make build                                 # Build frontend
make migrate-up                            # Apply Alembic migrations
```

## Environment Variables

See `.env.example` file in root directory.

Key variables:
- `DATABASE_URL` — PostgreSQL connection string
- `REDIS_URL` — Redis connection URL
- `CLERK_SECRET_KEY` — Clerk API key
- `STRIPE_SECRET_KEY` — Stripe API key
- `STRIPE_PRICE_ID_PRO` — Stripe recurring price for Pro plan
- `FRONTEND_URL` — Frontend app URL used in billing redirects
- `OPENAI_API_KEY` — Optional, for eval scoring
- `ENVIRONMENT` — dev / staging / prod

## Copilot Workflow Setup

Project-level GitHub Copilot workflows are configured under:
- `.github/copilot-instructions.md`
- `.github/instructions/backend.instructions.md`
- `.github/instructions/frontend.instructions.md`
- `.github/prompts/implement-feature.prompt.md`
- `.github/prompts/api-with-tests.prompt.md`
- `.github/prompts/release-readiness.prompt.md`

Obsidian mirror note:
- `.obsidian-vault/product/copilot-workflow.md`

## Next Steps

1. **Today:**
   - [ ] Run `docker-compose up`
   - [ ] Verify Postgres + Redis connectivity
   - [ ] Copy `.env` files and configure

2. **This Week (Week 1):**
   - [ ] Deploy landing page to `mythareon.vercel.app`
   - [ ] Complete 5+ discovery interviews
   - [ ] Recruit 3 design partners
   - [ ] Push code to GitHub

3. **Next Week (Week 2):**
   - [ ] Build auth flow
   - [ ] Workspace/project management UI
   - [ ] Integrate with design partners

## Support

For questions, check the `/memories/` folder:
- `mythareon-ai-plan.md` — Full 1-year business plan
- `mythareon-architecture.md` — Detailed tech decisions
- `mythareon-weeks1-4.md` — Week-by-week task breakdown
- `mythareon-landing-discovery.md` — Sales script and copy

---

**Built for founders by founders.** Calibrate every layer of your AI. 🎯
