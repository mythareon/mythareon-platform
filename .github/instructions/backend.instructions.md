---
applyTo: "backend/**/*.py"
description: "Use when implementing or updating FastAPI, SQLAlchemy, migrations, billing, eval logic, routes, and backend tests."
---

# Backend Implementation Rules

## API design
- Validate inputs with Pydantic models when request shapes are non-trivial.
- Return stable JSON structures for frontend consumption.
- Use clear HTTP status codes and actionable error messages.

## Data and migrations
- Any model/schema change must include Alembic migration updates.
- Avoid destructive migration behavior unless explicitly required.

## Billing and auth
- Treat plan state as backend source of truth.
- Never trust frontend-only plan checks.
- Webhooks must verify signature before mutating subscription state.

## Reliability
- Keep startup resilient (do not hard-crash on transient dependencies).
- Add logging around external integrations (Stripe, provider APIs).
