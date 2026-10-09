import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { getServerEnv } from "@/server/config/env";

let database: ReturnType<typeof createDatabase> | undefined;

function createDatabase() {
  const { DATABASE_URL } = getServerEnv();

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is required before using the database client.");
  }

  const sql = neon(DATABASE_URL);

  return drizzle({ client: sql });
}

export function getDatabase() {
  database ??= createDatabase();
  return database;
}
