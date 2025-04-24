import { db } from "./index";

export const clearAll = async () => {
  await db.writes.clear();
  await db.tags.clear();
};
