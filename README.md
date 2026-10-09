# QueueLess

QueueLess is a production-oriented appointment booking SaaS foundation for small businesses.

Stage 1 establishes the Next.js App Router application, Workers-compatible infrastructure, a server-only Neon/Drizzle boundary, a deferred Better Auth boundary, shadcn/ui primitives, a minimal homepage, and a health-check route. The booking engine and full authentication flow are intentionally deferred to Stage 2.

## Stack

- Next.js App Router, TypeScript, React, Tailwind CSS
- shadcn/ui primitives
- Drizzle ORM with Neon’s serverless HTTP driver
- Better Auth preparation
- Cloudflare Workers with OpenNext and Wrangler

## Local development

Requirements: Node.js 20.9+ and npm.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The health endpoint is available at [http://localhost:3000/api/health](http://localhost:3000/api/health).

For Workers-runtime preview, first add any required local values to `.dev.vars`, then run:

```bash
npm run preview
```

## Checks and database commands

```bash
npm run lint
npm run typecheck
npm run build
npm run build:cloudflare
npm run db:generate
```

`db:generate` is ready for the first domain schema. Stage 1 does not create tables or run database migrations.

## Cloudflare deployment

1. Create a Neon Postgres database and copy its connection string into `DATABASE_URL`.
2. Set `BETTER_AUTH_SECRET` to a high-entropy value of at least 32 characters and set the production `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL`.
3. Authenticate Wrangler with `npx wrangler login`, or provide `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in the deployment environment.
4. Review `wrangler.jsonc`, then deploy:

```bash
npm run deploy
```

`wrangler.jsonc` enables `nodejs_compat` and the OpenNext Worker/assets entry points. R2-backed incremental caching is intentionally not configured until a production bucket is provisioned.

## Environment variables

See [.env.example](.env.example) for the complete list. `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `NEXT_PUBLIC_APP_URL` are the application values. Keep `DATABASE_URL` and `BETTER_AUTH_SECRET` server-side; only variables prefixed with `NEXT_PUBLIC_` may be exposed to browser code. Cloudflare credentials are deployment-only and are optional when using `wrangler login`.

## Project structure

```text
src/
  app/                  Next.js routes, layout, styles, and homepage
    api/health/         Runtime health-check route
  components/ui/       shadcn/ui-compatible reusable UI primitives
  lib/                  Shared client-safe utilities
  server/
    auth/               Better Auth factory boundary (not mounted yet)
    config/             Validated server environment access
    db/                 Neon HTTP + Drizzle client and schema entry point
    health/             Server-side health business logic
components.json         shadcn/ui configuration
drizzle.config.ts       Drizzle Kit configuration
open-next.config.ts     OpenNext Cloudflare adapter configuration
wrangler.jsonc          Cloudflare Worker configuration
```

## Scope boundary

Stage 1 does not implement user registration, login routes, auth tables, services, availability rules, bookings, reminders, payments, or database migrations. Those should be designed and implemented in the next stage.
