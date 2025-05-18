import "./env-config";

import { defineConfig } from "drizzle-kit";

if (!process.env.TURSO_DATABASE_NAME) {
  throw new Error("TURSO_DATABASE_NAME is missing");
}

if (!process.env.TURSO_DATABASE_URL) {
  throw new Error("TURSO_DATABASE_URL is missing");
}

if (!process.env.TURSO_DATABASE_AUTH_TOKEN) {
  throw new Error("TURSO_DATABASE_AUTH_TOKEN is missing");
}

export default defineConfig({
  schema: "./src/services/turso/schema.ts",
  out: "./src/services/turso/migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_DATABASE_AUTH_TOKEN,
  },
});
