import type { Folders, Tag, Write } from "@/types";
import type { Settings } from "@/types/settings";
import type { WritingSessions } from "@/types/writing-sessions";
import Dexie, { type Table } from "dexie";

// Define database instance
const db = new Dexie("miniwritDB");

// Define schema and tables
db.version(1).stores({
  writes: "id, updatedAt, synced, *tagIds, folderId",
  writingSessions: "id, writeId, startingWordCount, endingWordCount, duration",
  tags: "id, updatedAt",
  settings: "key",
  folders: "id, title, order",
});

// Define types for tables
interface AppDB extends Dexie {
  writes: Table<Write, string>;
  writingSessions: Table<WritingSessions, string>;
  tags: Table<Tag, string>;
  settings: Table<Settings, string>;
  folders: Table<Folders, string>;
}

// Cast db to include our tables with correct types
const typedDB = db as AppDB;

export { typedDB as db };
