# Product Roadmap

## MVP (Phase 1) - Weeks 1-4
**Focus:** Core eval workflow for structured comparison testing

### Features
- User authentication (Clerk)
- Project creation and management
- Dataset upload (CSV/JSON)
- Eval configuration (prompt variants, models, metrics)
- Automated evaluation runs (call OpenAI/Anthropic)
- Results comparison view (side-by-side, statistical analysis)
- Release gate (pass/fail based on metrics)
- Webhook integrations (for CI/CD)

### Technical
- Next.js frontend with TypeScript
- FastAPI backend
- PostgreSQL database
- Redis for async jobs (Celery)
- OpenAI/Anthropic API integrations

## Phase 2 (Weeks 5-8) - Observability
- Production monitoring dashboard
- Log ingestion from applications
- Drift detection (quality, latency, cost)
- Alerts and notifications
- Integration with log aggregators

## Phase 3 (Weeks 9-12) - Cost Control
- Token usage tracking
- Model cost comparison
- Automatic routing optimization
- Budget alerts and limits

## Phase 4+ - Governance
- Role-based access control
- Audit logs
- Compliance reports
- Policy enforcement

## Phase 5+ - Vertical Solutions
- Industry-specific templates
- Customer service AI workflows
- Finance AI operations
- Healthcare compliance AI
