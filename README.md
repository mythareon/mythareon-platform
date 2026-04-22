# Mythareon - Calibrate Every Layer of Your AI

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

POST   /webhooks/clerk                   # Clerk lifecycle events
POST   /webhooks/github                  # GitHub CI/CD integration
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
```

## Environment Variables

See `.env.example` file in root directory.

Key variables:
- `DATABASE_URL` — PostgreSQL connection string
- `REDIS_URL` — Redis connection URL
- `CLERK_SECRET_KEY` — Clerk API key
- `STRIPE_SECRET_KEY` — Stripe API key
- `OPENAI_API_KEY` — Optional, for eval scoring
- `ENVIRONMENT` — dev / staging / prod

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
