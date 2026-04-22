---
applyTo: "frontend/**/*.{ts,tsx}"
description: "Use when implementing or updating Next.js UI, auth pages, workspace UX, billing UX, and API consumption."
---

# Frontend Implementation Rules

## UX priorities
- Optimize for first-time user success: clear empty states, guided next actions, and explicit CTA hierarchy.
- Keep customer-facing copy concise and conversion-oriented.

## API usage
- Consume backend APIs as source of truth for domain state (workspaces, plan, subscription status).
- Surface actionable errors and avoid silent failures.

## Auth and gating
- Use Clerk session/user identity when available.
- Redirect unauthenticated users to landing/login entry points.
- Keep free vs paid UX state visible in workspace console.

## Performance
- Prefer server rendering for initial data hydration where possible.
- Keep client components focused on interactivity.
