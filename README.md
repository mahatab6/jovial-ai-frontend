# Jovial AI — Frontend

NPM package: `jovial-ai-frontend`

Frontend live: https://jovial-ai-frontend.vercel.app

Backend live: https://jovial-backend-production.up.railway.app

GitHub Repo (frontend): https://github.com/mahatab6/jovial-ai-frontend

GitHub Repo (backend): https://github.com/mahatab6/jovial-backend

## Test Accounts

- **Admin**
  - email: admin@gmail.com
  - pass: password1234
- **Manager**
  - email: manager@gmail.com
  - pass: password1234
- **User**
  - email: user@gmail.com
  - pass: password1234

## Project Overview

Jovial AI is an AI-powered content generation platform that helps users produce blog posts, social content, emails, and product descriptions using modern LLMs and custom prompts. This repository contains the frontend (Next.js + TypeScript) for the SaaS web app.

## Tech Stack

- Frontend: Next.js (App Router), React, TypeScript
- Styling: Tailwind CSS (utility-first) and custom CSS
- State & Data: React Query, Zustand (where applicable)
- UI: Custom components + Lucide icons
- API: Backend (separate repo) provides AI endpoints and auth
- Hosting: Vercel (frontend), Railway (backend)

## AI Features

- Content generation: create blog posts, marketing copy, social captions, and email drafts using AI prompts and templates.
- Regeneration & variations: generate multiple variants for A/B testing and iteratively refine outputs.
- History & results viewer: store and review previously generated outputs with metadata.
- Job tracking: background generation jobs can be monitored and retrieved.

Feature notes: the frontend calls the backend API for AI requests, which in turn calls the LLM provider. The UI includes controls for model options, length, tone, and templates.

## Setup Instructions (Frontend)

Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Access to the backend API (see backend repo)

Clone

```bash
git clone https://github.com/mahatab6/jovial-ai-frontend.git
cd jovial-ai-frontend
```

Install

```bash
npm install
# or
pnpm install
```

Environment

Create a `.env.local` file at the project root and set any required variables. Typical values (check backend README for exact names):

```
NEXT_PUBLIC_API_BASE_URL=https://jovial-backend-production.up.railway.app
# Add any auth or third-party keys here
```

Run (development)

```bash
npm run dev
# open http://localhost:3000
```

Build (production)

```bash
npm run build
npm run start
```

Deployment

Deploy to Vercel by connecting the GitHub repository or use the Vercel CLI. Ensure the environment variables match those used in `.env` and the backend is reachable.

## Backend

See the backend repo for API details, database setup, and environment variables: https://github.com/mahatab6/jovial-backend

## Admin & Developer Notes

- Default test accounts are included above for convenience in staging/demo environments. Rotate these credentials before using in production.
- If you need additional test users or want seeding scripts run, check the backend repo.

## Contact

For questions or issues, open an issue on the frontend or backend GitHub repo.

---

This README was updated to include live links, repos, test accounts, project overview, tech stack, AI feature notes, and setup instructions.
