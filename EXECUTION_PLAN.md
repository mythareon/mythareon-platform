
# 12-Week Execution Plan
# Mythareon / Mythareon Eval MVP

## Goal
Build and launch the first usable version of Mythareon Eval as a solo engineer while preparing the business, technical foundation, and vision site for Mythareon.

## Build Strategy
- validate in parallel
- build one focused product
- keep architecture clean but lightweight
- ship fast, then deepen the workflow

## High-Level Architecture

- Frontend: Next.js + TypeScript
- Backend: FastAPI
- Jobs: Celery or Dramatiq + Redis
- Database: PostgreSQL
- Storage: S3-compatible bucket
- Auth: Clerk or Auth.js
- Billing: Stripe later

## Week-by-Week Plan

### Week 1: Foundation
- choose final brand and domain
- set up mono-repo or two-repo structure
- create landing page skeleton
- scaffold Next.js frontend
- scaffold FastAPI backend
- create Postgres database
- define main data models

### Week 2: Core Product Skeleton
- build auth flow
- build workspace and project creation
- create sidebar and basic dashboard UI
- create dataset and version models
- create CRUD endpoints

### Week 3: Dataset Management
- support CSV upload
- support JSON upload
- parse and validate dataset rows
- store metadata in Postgres
- store raw files in object storage
- build dataset table UI

### Week 4: Version Management
- create baseline and candidate version forms
- support model settings and prompt content
- store provider metadata
- build version list page

### Week 5: Eval Execution Engine
- set up async worker infra
- create eval job model
- run test cases against one provider
- save outputs, latency, token counts
- handle retries and error cases

### Week 6: Scoring Layer
- implement exact match / rules scoring
- implement LLM judge scoring
- compute aggregate score summaries
- show quality, latency, and cost metrics

### Week 7: Compare UI
- create compare results page
- show baseline vs candidate outputs
- highlight regressions and improvements
- add pass/fail summary cards

### Week 8: Release Gate
- create policy thresholds
- compute pass / warn / fail verdict
- expose release-check endpoint
- add CLI stub or simple command

### Week 9: Vision Website
- build homepage
- build product pages for all 5 modules
- build architecture / vision page
- add waitlist form
- add design partner CTA

### Week 10: Polish + Demo Readiness
- improve onboarding flow
- seed demo datasets
- create demo project
- write docs and quickstart
- test end-to-end flows

### Week 11: Design Partner Launch
- onboard 3 to 5 design partners manually
- run setup calls
- collect pain points and objections
- fix top friction areas

### Week 12: Public Beta Prep
- tighten messaging
- publish content and launch post
- start founder-led outreach
- define next build priorities from user feedback

## Technical Build Details

### Frontend modules
- auth and onboarding
- projects dashboard
- dataset manager
- version manager
- eval run page
- compare results page
- settings page
- marketing pages

### Backend modules
- auth/session integration
- projects service
- datasets service
- versions service
- eval orchestration service
- scoring service
- release-check service

### Worker modules
- provider caller
- scorer execution
- metrics aggregation
- artifact persistence

## Repo Structure Suggestion

### Option A: Monorepo
- apps/web
- apps/api
- packages/cli
- packages/shared
- infra/

### Option B: Simpler 2-repo
- mythareon-web
- mythareon-api

Use whichever helps you move faster.

## POC To Demo

### Demo scenario
A customer support AI team wants to compare a new prompt and model against the current production baseline.

### POC steps
1. Upload 25 to 50 customer support test cases
2. Define baseline prompt/model
3. Define candidate prompt/model
4. Run eval
5. Show scorecards
6. Highlight failed examples
7. Show release verdict

### Demo outcome
This clearly shows the product catches regressions before release.

## Website Plan

The website should do 3 jobs:
1. explain the category and problem
2. show the long-term 5-product vision
3. convert visitors into waitlist or design partner leads

### Website pages
- Home
- Product / Mythareon Eval
- Platform Vision
- Pricing
- About / Why Mythareon
- Contact / Join waitlist

### Homepage sections
- Hero: Calibrate every layer of your AI
- The problem: AI teams ship blind
- The 5-product vision
- Why start with Mythareon Eval
- Demo workflow
- CTA for design partners

## Design Partner Plan

Ideal first design partners:
- 3 to 5 teams
- already shipping LLM product
- technical decision makers
- willing to try imperfect software

What to offer:
- white-glove onboarding
- discounted or free beta access
- direct feature influence
- fast bug fixes and support

## After MVP

### Next product order
1. Mythareon Observe
2. Mythareon Cost
3. Mythareon Govern
4. Mythareon Vertical

### Expansion principle
Only build the next module once current users repeatedly ask for adjacent workflow support.

## Final Principle
Do not build a giant AI platform first. Build one real workflow, prove value, then expand naturally into the rest of the vision.
