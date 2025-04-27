import Dexie, { type Table } from "dexie";
import type { Tag } from "./tags";
import type { Write } from "./writes";

// Define database instance
const db = new Dexie("miniwritDB");

// Define schema and tables
db.version(1).stores({
  writes: "id, updatedAt, synced, *tagIds", // *tagIds enables multiEntry indexing
  tags: "id, updatedAt",
});

// Define types for tables
interface AppDB extends Dexie {
  writes: Table<Write, string>;
  tags: Table<Tag, string>;
}

// Cast db to include our tables with correct types
const typedDB = db as AppDB;

export { typedDB as db };
