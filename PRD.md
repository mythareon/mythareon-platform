
# Product Requirements Document
# Mythareon Eval - Phase 1 MVP

## 1. Product Summary

Mythareon Eval is the first product inside Mythareon. It helps engineering teams compare prompt, model, and agent changes before release using structured eval datasets, automated scoring, and release gates.

## 2. Problem

Teams shipping LLM products regularly change prompts, models, RAG settings, or agent logic. Those changes often improve one metric while silently breaking edge cases, increasing cost, or slowing latency. Most teams still evaluate changes manually or with fragile scripts.

## 3. Goal

Give teams a fast, repeatable way to answer:
- Is this new version better?
- What broke?
- Should we ship it?

## 4. Target Users

### Primary users
- AI engineer
- ML engineer
- platform engineer
- technical product lead

### Buyer / champion
- Eng manager
- Head of AI / platform
- startup founder building AI product

## 5. Core User Stories

1. As an engineer, I want to upload a dataset of test prompts and expected behavior so I can evaluate changes consistently.
2. As an engineer, I want to compare a baseline version and a candidate version so I can see regressions before release.
3. As a lead, I want a simple pass/warn/fail release verdict so I can block risky changes.
4. As a team, I want eval history and sharable reports so we can discuss changes clearly.

## 6. MVP Scope

### In scope
- auth and workspace creation
- project management
- dataset upload and storage
- version registration
- eval run execution
- comparison results
- scoring metrics
- release policy thresholds
- basic alerts or exportable report

### Out of scope
- production observability
- multi-agent orchestration analysis
- dynamic model routing
- enterprise RBAC and SSO
- advanced governance workflows

## 7. Functional Requirements

### Workspace and Projects
- user can create workspace
- user can create one or more projects
- user can define environments like dev, stage, prod

### Dataset Management
- upload CSV or JSON
- dataset row has input, optional expected output, optional metadata
- list and view dataset rows

### Version Management
- create baseline version
- create candidate version
- store prompt text, provider, model, settings

### Eval Execution
- run candidate vs baseline on selected dataset
- async worker executes calls
- system stores outputs, latency, token cost, score

### Scoring
Initial metrics:
- exact match or rule match where applicable
- LLM-as-judge rubric scoring
- latency
- cost estimate

### Results
- overall summary score
- pass/fail deltas
- row-by-row comparison
- highlight regressions

### Release Gate
- define threshold policies
- generate pass / warn / fail verdict
- expose simple API or CLI result for CI integration

## 8. Non-Functional Requirements

- fast first run experience
- reliable background jobs
- secure API key handling
- simple and clean UI
- auditability of eval runs and results

## 9. Success Metrics

### Product metrics
- user reaches first eval run in under 10 minutes
- active teams run evals weekly
- at least 50 percent of active teams compare multiple versions
- design partners report that product catches issues they would have missed

### Business metrics
- 3 to 5 design partners
- first paying team after beta
- at least 10 active teams within first major release cycle

## 10. MVP Screens

- sign in / onboarding
- workspace dashboard
- projects page
- datasets page
- versions page
- run eval page
- eval result compare page
- settings / API keys / release policy page

## 11. API Surface (initial)

- POST /projects
- POST /datasets
- POST /versions
- POST /eval-runs
- GET /eval-runs/{id}
- GET /compare
- POST /release-check

## 12. Risks

- too much scope too early
- weak datasets from users
- unclear scoring quality for subjective tasks
- too many integrations before core value is proven

## 13. MVP Principle

Keep it simple: one sharp workflow that helps teams decide whether an AI change should ship.
