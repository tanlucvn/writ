import * as schema from "@/db/schema";
import { createClient as createLibsqlClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const getDatabaseUrl = () => {
  return process.env.TURSO_DATABASE_URL!;
};

export const getDatabaseClient = async () => {
  const url = getDatabaseUrl();

  if (!url) {
    console.error("Database URL is missing");
    return null;
  }

  const client = createLibsqlClient({
    url,
    authToken: process.env.TURSO_API_TOKEN!,
  });

  return drizzle(client, { schema });
};

export const fetchWrites = async () => {
  const db = await getDatabaseClient();
  if (!db) {
    console.error("Failed to connect to database");
    return;
  }

  try {
    const result = await db.select().from(schema.writes);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Turso:", error);
  }
};
