---
mode: ask
description: "Run a release readiness pass for merge-to-main and production deploy decisions."
---

Prepare a release readiness report for this change:
${input:Change summary}

Include:
1. Risks and regressions by severity.
2. Test/build status and any gaps.
3. Env var and migration impact.
4. Rollback strategy.
5. Go/No-Go recommendation.
