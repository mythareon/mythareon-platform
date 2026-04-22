# Copilot Workflow - Mythareon

Updated: 2026-04-22

## Why
Use consistent AI-assisted workflows to ship faster with fewer regressions.

## Active setup
- Workspace instructions: `.github/copilot-instructions.md`
- Backend instruction scope: `.github/instructions/backend.instructions.md`
- Frontend instruction scope: `.github/instructions/frontend.instructions.md`
- Prompt templates:
  - `.github/prompts/implement-feature.prompt.md`
  - `.github/prompts/api-with-tests.prompt.md`
  - `.github/prompts/release-readiness.prompt.md`

## Daily execution loop
1. Pick one vertical slice (feature/API flow).
2. Use `implement-feature` prompt.
3. Validate with tests/build.
4. Use `release-readiness` prompt.
5. Push checkpoint and open PR.

## Guardrails
- Keep backend as domain source of truth.
- Keep frontend focused on UX and orchestration.
- Any schema change must include migration.
- Update env docs when adding integration keys.
