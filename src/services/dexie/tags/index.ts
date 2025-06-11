import { dexie } from "@/services";
import type { Tag } from "@/types";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";

export const createTag = (overrides: Partial<Tag> = {}): Tag => {
  const now = DateTime.utc().toISO();

  return {
    id: uuidv4(),
    name: overrides.name ?? "New Tag",
    createdAt: now,
    updatedAt: now,
  };
};

export const saveTag = async (tag: Tag): Promise<Tag> => {
  const updated = {
    ...tag,
    updatedAt: DateTime.utc().toISO(),
    synced: 0,
  };
  await dexie.db.tags.put(updated);
  return updated;
};

export const getTagById = (id: string): Promise<Tag | undefined> =>
  dexie.db.tags.get(id);

export const getAllTags = (): Promise<Tag[]> =>
  dexie.db.tags.orderBy("updatedAt").reverse().toArray();

export const deleteTag = async (id: string): Promise<void> => {
  await dexie.db.tags.delete(id);
};

export const clearAllTags = async (): Promise<void> => {
  await dexie.db.tags.clear();
};
