import type { Note, Session, Settings, Tag } from "@/types";
import Dexie, { type Table } from "dexie";

const db = new Dexie("miniwritDB");

db.version(1).stores({
  notes: "id, updatedAt, synced, inTrash, parentId, *tagIds",
  sessions: "id, noteId, startingWordCount, endingWordCount, duration",
  tags: "id, updatedAt",
  settings: "key",
});

interface AppDB extends Dexie {
  notes: Table<Note, string>;
  sessions: Table<Session, string>;
  tags: Table<Tag, string>;
  settings: Table<Settings, string>;
}

const typedDB = db as AppDB;

export { typedDB as db };
