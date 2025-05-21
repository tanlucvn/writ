import type { Write } from "@/types";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { db } from "../client";

export const createWrite = (options?: Partial<Write>): Write => ({
  id: uuidv4(),
  title: "Untitled",
  content: "",
  pinned: false,
  archived: false,
  color: options?.color ?? "default",
  folderId: options?.folderId ?? undefined,
  tagIds: [],
  createdAt: DateTime.utc().toISO(),
  updatedAt: DateTime.utc().toISO(),
  removedAt: null,
  syncedAt: null,
  synced: 0,
});

// Save or update a write in the database
export const saveWrite = async (write: Write): Promise<Write> => {
  const updated = {
    ...write,
    updatedAt: DateTime.utc().toISO(),
    removedAt: write.removedAt ?? null,
    synced: 0,
  };
  await db.writes.put(updated);
  return updated;
};

// Remove to trash
export const removeWrite = async (id: string) => {
  await db.writes.update(id, {
    removedAt: DateTime.utc().toISO(),
    updatedAt: DateTime.utc().toISO(),
    synced: 0,
  });
};

// Remove to trash
export const restoreWrite = async (id: string) => {
  await db.writes.update(id, {
    removedAt: null,
    updatedAt: DateTime.utc().toISO(),
    synced: 0,
  });
};

// Delete a write permanently
export const deleteWrite = async (id: string) => {
  await db.writes.delete(id);
};

// Get a single write by ID
export const getWrite = async (id: string): Promise<Write | undefined> => {
  return await db.writes.get(id);
};

// Get all writes
export const getAllWrites = async (): Promise<Write[]> => {
  return await db.writes.filter((w) => !w.removedAt).toArray();
};

// Get the most recently updated write
export const getLatestWrite = async (): Promise<Write | undefined> => {
  return (await getAllWrites())[0];
};

// Get all removed writes
export const getAllRemovedWrites = async (): Promise<Write[]> => {
  return await db.writes.filter((w) => !!w.removedAt).toArray();
};

// Get all writes from tab id
export const getWritesByTabId = async (tabId: string): Promise<Write[]> => {
  return await db.writes.where("tabId").equals(tabId).toArray();
};
