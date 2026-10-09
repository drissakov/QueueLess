# QueueLess

🌐 **Live application:** [queueless.queueless.workers.dev](https://queueless.queueless.workers.dev) · [Health check](https://queueless.queueless.workers.dev/api/health)

<p align="center">
  <strong>Appointments without the wait.</strong><br />
  A calm, focused booking foundation for small businesses.
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.3.8-111827?logo=next.js&logoColor=white" alt="Next.js 16.3.8" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://workers.cloudflare.com/"><img src="https://img.shields.io/badge/Cloudflare_Workers-Ready-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Workers ready" /></a>
  <a href="https://orm.drizzle.team/"><img src="https://img.shields.io/badge/Drizzle_ORM-Configured-C5F74F?logo=drizzle&logoColor=111827" alt="Drizzle ORM" /></a>
  <a href="https://neon.tech/"><img src="https://img.shields.io/badge/Neon-Postgres-00E5A0?logo=postgresql&logoColor=111827" alt="Neon Postgres" /></a>
</p>

> 🚧 **Current status: Stage 1 foundation** — the infrastructure and application shell are ready. Authentication, scheduling, and booking workflows are intentionally coming next.

## ✨ What QueueLess is

QueueLess is a production-oriented online appointment booking SaaS for small businesses. The product direction is deliberately simple:

- 🗓️ customers find an available time without a phone call;
- 🧭 businesses manage their working calendar from one focused workspace;
- 🔒 secrets and database access stay on the server;
- ⚡ the application runs on Cloudflare Workers with a serverless-friendly data layer.

This repository currently contains the platform foundation, not the booking engine.

## 🧱 Stage 1 includes

| Area | Included |
| --- | --- |
| Web application | Next.js App Router, TypeScript, Tailwind CSS, responsive homepage |
| UI foundation | shadcn/ui configuration and reusable Button primitive |
| Data layer | Drizzle ORM + Neon serverless HTTP driver boundary |
| Authentication | Better Auth server factory prepared, routes intentionally not mounted |
| Edge hosting | OpenNext Cloudflare adapter and Wrangler configuration |
| Operations | Health endpoint, environment examples, lint/type/build scripts |
| Database state | No tables or migrations created yet |

## 🏗️ Architecture

```text
Browser
  │
  ▼
Next.js App Router ──► UI components / Tailwind / shadcn/ui
  │
  ├──► Server business logic ──► Drizzle ORM ──► Neon Postgres
  │
  └──► Better Auth boundary ──► Drizzle adapter

OpenNext ──► Cloudflare Worker + static assets
```

The code is organized around clear boundaries:

```text
src/
  app/                  Routes, layout, styles, and product pages
  components/ui/        Reusable UI primitives
  lib/                  Shared client-safe utilities
  server/
    auth/               Better Auth factory boundary
    config/             Validated server environment access
    db/                 Neon + Drizzle client and schema entry point
    health/             Server-side health business logic
```

Database credentials are accessed only from `src/server/`, guarded with `server-only`, and never exposed as `NEXT_PUBLIC_*` values.

## 🧰 Technology stack

- **Frontend:** Next.js App Router, React, TypeScript, Tailwind CSS
- **Components:** shadcn/ui conventions, Radix Slot, class-variance-authority
- **Validation:** Zod
- **Authentication:** Better Auth preparation
- **Database:** Neon PostgreSQL, `@neondatabase/serverless`, Drizzle ORM
- **Hosting:** Cloudflare Workers, OpenNext, Wrangler
- **Package manager:** npm

## 🚀 Quick start

### Requirements

- Node.js **20.9 or newer**
- npm
- A Neon PostgreSQL database for database-backed development

### Install and run the Next.js dev server

```bash
npm install
copy .env.example .env.local
npm run dev
```

On PowerShell, the equivalent environment-file command is:

```powershell
Copy-Item .env.example .env.local
```

Open [http://localhost:3000](http://localhost:3000).

### Run in the Workers runtime

For an OpenNext/Wrangler preview, copy the local Workers variables file and add any values needed by your environment:

```powershell
Copy-Item .dev.vars.example .dev.vars
npm run preview
```

`.dev.vars` is ignored by Git because it may contain local secrets. Do not commit it.

## 🔐 Environment variables

Copy [.env.example](.env.example) to `.env.local` and replace the placeholders.

| Variable | Required for | Description |
| --- | --- | --- |
| `DATABASE_URL` | Database/auth work | Server-only Neon PostgreSQL connection string. |
| `BETTER_AUTH_SECRET` | Auth work | High-entropy secret with at least 32 characters. |
| `BETTER_AUTH_URL` | Auth work | Canonical URL used by Better Auth. |
| `NEXT_PUBLIC_APP_URL` | Public links | Canonical application URL for future client-facing links. |
| `NEXTJS_ENV` | Workers preview | Set to `development` in `.dev.vars` for local OpenNext development. |
| `CLOUDFLARE_ACCOUNT_ID` | Token-based deploys | Cloudflare account ID; optional when using `wrangler login`. |
| `CLOUDFLARE_API_TOKEN` | Token-based deploys | Cloudflare API token; optional when using `wrangler login`. |

Keep `DATABASE_URL`, `BETTER_AUTH_SECRET`, and Cloudflare credentials server-side. Only variables intentionally prefixed with `NEXT_PUBLIC_` can be exposed to browser code.

### Neon project wiring

The repository is configured for the linked Neon project and `production` branch. The local `.neon` link file and `.env.local` values are ignored by Git; only the declarative [`neon.ts`](neon.ts) policy belongs in the repository.

For a fresh checkout:

```bash
npm i -g neon@latest
neon login
neon link --project-id lingering-shadow-40891188 --branch production -y
neon config plan
neon deploy
```

The current policy declares Postgres only with `defineConfig({})`. This preserves QueueLess's existing self-managed Better Auth design and does not provision Neon Auth, Data API, Functions, Object Storage, or AI Gateway.

## 🩺 Health check

The minimal health endpoint is available at [`/api/health`](http://localhost:3000/api/health):

```json
{
  "status": "ok",
  "service": "queueless",
  "timestamp": "2026-10-09T05:39:25.079Z"
}
```

The timestamp is generated at request time. The endpoint does not query the database yet, so it verifies application availability without requiring database credentials.

## 🧪 Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run lint` | Run ESLint against source files. |
| `npm run typecheck` | Run TypeScript without emitting files. |
| `npm run build` | Create the standard Next.js production build. |
| `npm run build:cloudflare` | Build the OpenNext Worker bundle. |
| `npm run preview` | Build and preview through Wrangler. |
| `npm run cf-typegen` | Generate Wrangler binding types. |
| `npm run db:generate` | Generate Drizzle migration metadata after schema changes. |
| `npm run db:migrate` | Apply migrations when database schema work begins. |
| `npm run deploy` | Build and deploy through OpenNext. |
| `npm run upload` | Upload a Worker version without promoting it. |

Stage 1 intentionally has zero application tables, so `npm run db:generate` currently reports that there are no schema changes.

## ☁️ Cloudflare deployment

QueueLess uses the OpenNext Cloudflare adapter with these important settings in [`wrangler.jsonc`](wrangler.jsonc):

- Worker name: `queueless`, published at `https://queueless.queueless.workers.dev`.
- Account ID is configured for this project's Cloudflare account.
- `workers_dev: true` enables the public address; `keep_vars: true` preserves existing dashboard variables.
- Production application and auth URLs are configured as non-secret variables.
- `main`: `.open-next/worker.js`
- static assets: `.open-next/assets`
- `nodejs_compat` for the OpenNext runtime
- `global_fetch_strictly_public` for public fetch behavior
- a self-reference service binding for the Worker

### Deploy from a local machine

1. Create a Neon database and set `DATABASE_URL`.
2. Set production values for `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `NEXT_PUBLIC_APP_URL`.
3. Authenticate Wrangler:

   ```bash
   npx wrangler login
   ```

4. Validate locally:

   ```bash
   npm run lint
   npm run typecheck
   npm run build
   npm run build:cloudflare
   ```

5. Deploy:

   ```bash
   npm run deploy
   ```

R2-backed incremental caching is not configured yet. It can be added once a production R2 bucket and cache policy are defined.

Next.js and `eslint-config-next` are pinned to 16.3.8 for compatibility with OpenNext Cloudflare 1.20.9. Next.js 16.4 introduces `preview-props.json`, which this adapter release does not yet inline and causes a Worker startup exception. Validate framework upgrades with `npm run preview` as well as production builds.

The deployed Worker stores the existing Neon `DATABASE_URL` as an encrypted Cloudflare secret. Application authentication remains deferred until the next development stage.

The project-level Neon MCP configuration is stored in `.codex/config.toml` using the OAuth server URL only. No Neon API key is committed to the repository. Project agent skills are pinned in `skills-lock.json` and stored under `.agents/skills/`.

## 🛡️ Engineering guardrails

- No Node.js-only database client such as `pg` is used in application runtime code.
- No database credentials are bundled into client components.
- No real secrets are stored in the repository.
- No destructive database commands are part of Stage 1.
- OpenNext output and generated Wrangler types are ignored by Git.
- Authentication and booking rules are kept behind server-side boundaries.

## 🛣️ Roadmap

### Stage 2 — identity and tenancy

- finalize Better Auth schema and route mounting;
- add businesses, memberships, roles, and account ownership;
- add the first Drizzle migrations;
- add protected dashboard layout and session handling.

### Stage 3 — scheduling and booking

- services, staff, locations, and working hours;
- availability calculation with timezone-safe rules;
- customer booking and cancellation flows;
- transactional conflict prevention for overlapping appointments.

### Stage 4 — operations

- reminders and notifications;
- payments and plan limits;
- audit logs, analytics, rate limiting, and production observability.

## 📚 Useful links

- [Next.js documentation](https://nextjs.org/docs)
- [OpenNext Cloudflare guide](https://opennext.js.org/cloudflare/get-started)
- [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
- [Drizzle Neon integration](https://orm.drizzle.team/docs/connect-neon)
- [Better Auth documentation](https://better-auth.com/docs/installation)
- [shadcn/ui documentation](https://ui.shadcn.com/docs)

## 📄 Scope boundary

Stage 1 does **not** implement user registration, login routes, auth tables, businesses, services, availability rules, bookings, reminders, payments, or database migrations. Those features should be designed and implemented in the next instructed stage.
