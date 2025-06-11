import { db } from "./client";

export const clearAll = async () => {
  await db.notes.clear();
  await db.tags.clear();
  await db.sessions.clear();
  await db.settings.clear();
};
