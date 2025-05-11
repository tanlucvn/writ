import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
// import * as schema from "./schema";

export const tursoClient = createClient({
  url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL!,
  authToken: process.env.NEXT_PUBLIC_TURSO_DATABASE_AUTH_TOKEN,
});

export const clientDb = drizzle(tursoClient);
