import "server-only";

import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { getServerEnv } from "@/server/config/env";
import { getDatabase } from "@/server/db/client";

/**
 * Stage 1 auth boundary.
 *
 * The handler, client, and Better Auth schema are intentionally not mounted yet.
 * Stage 2 can create the instance from this factory once the auth policy is agreed.
 */
export function createAuth() {
  const { BETTER_AUTH_SECRET, BETTER_AUTH_URL } = getServerEnv();

  if (!BETTER_AUTH_SECRET) {
    throw new Error("BETTER_AUTH_SECRET is required before creating the auth instance.");
  }

  return betterAuth({
    secret: BETTER_AUTH_SECRET,
    baseURL: BETTER_AUTH_URL,
    database: drizzleAdapter(getDatabase(), {
      provider: "pg",
    }),
  });
}
