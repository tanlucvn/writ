import { db } from "./client";

export const clearAll = async () => {
  await db.writes.clear();
  await db.tags.clear();
};
