# System Architecture

## High-Level Design

```
Frontend (Next.js)
    ↓
API Gateway / Auth (Clerk)
    ↓
Backend API (FastAPI)
    ↓
Database (PostgreSQL) + Cache (Redis)
    ↓
LLM Integrations (OpenAI, Anthropic)
Event Queue (Celery + Redis)
```

## Components

### Frontend Layer
- **Dashboard** — Projects, datasets, eval runs, results comparison
- **Management** — Settings, users (orgs), billing
- **Auth** — Clerk passwordless authentication
- **Stack:** Next.js 14, TypeScript, Tailwind CSS, React Hook Form, Zustand

### API Layer
- **REST API** — All operations (CRUD for projects, evals, runs, results)
- **WebSocket** — Real-time eval status updates
- **Auth** — Clerk JWT verification
- **Stack:** FastAPI, Pydantic, SQLAlchemy ORM

### Data Layer
- **PostgreSQL** — Projects, datasets, eval configs, runs, results, users
- **Redis** — Session cache, job queue, real-time notifications
- **Schema:** 11 core models (Project, Dataset, TestCase, EvalConfig, EvalRun, Result, etc.)

### Integration Layer
- **LLM APIs** — OpenAI (GPT-4, GPT-3.5), Anthropic (Claude)
- **Task Queue** — Celery workers for async eval runs
- **Webhooks** — Outbound webhooks for CI/CD integration

## Data Models

**Core Entities:**
- `User` — Authenticated user (via Clerk)
- `Organization` — User belongs to org
- `Project` — Container for datasets and evals
- `Dataset` — Collection of test cases
- `TestCase` — Single eval test (input + expected output)
- `EvalConfig` — Eval specification (models, prompts, metrics)
- `EvalRun` — Execution of an eval config
- `Result` — Output of a single test case in a run
- `EvalMetric` — Scoring function (exactMatch, similarity, custom)

## Deployment
- **Development:** Docker Compose (PostgreSQL 15 + Redis 7 locally)
- **Production:** Vercel (frontend) + Cloud Run/App Service (backend) + Managed PostgreSQL
- **CI/CD:** GitHub Actions (lint, test, deploy on push to main)

## Security
- Passwordless auth via Clerk
- JWT tokens in headers
- CORS configured for production domains
- Database credentials in environment variables
- Stripe webhook verification for billing

## Scalability Considerations
- Eval runs are async (Celery workers)
- Results are paginated
- Database indexes on frequently queried columns
- Redis caching for read-heavy operations
- Horizontal scaling of API via containers
