# Copilot Instructions - Mythareon

## Product intent
- Build Mythareon Eval as the first sellable product: dataset upload, baseline-vs-candidate evals, scoring, and release verdict.
- Prioritize features that reduce time to first customer value and first paid conversion.

## Architecture boundaries
- Frontend (`frontend/`) owns UX and thin edge integrations.
- Backend (`backend/`) owns domain state and business logic.
- Keep domain workflows (projects, datasets, eval runs, release policies, billing state) in backend APIs.

## Coding rules
- Prefer small vertical slices over broad stubs.
- Every backend API change should include at least one test when feasible.
- Keep backward-compatible API shapes unless migration is intentional and documented.
- Update `.env.example`, docs, and runbook when adding new env vars or operational requirements.

## Release discipline
- Keep changes mergeable in small PRs.
- Ensure tests/build pass before proposing deploy.
- For production-impacting changes, include rollback notes in PR description.

## Obsidian memory workflow
- Mirror durable decisions and operating notes into the Obsidian vault under `.obsidian-vault/`.
- Keep notes concise, dated, and action-oriented.
