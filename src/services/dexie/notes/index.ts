import { dexie } from "@/services";
import type { Note } from "@/types";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";

export const createNote = (overrides: Partial<Note> = {}): Note => {
  const now = DateTime.utc().toISO();

  return {
    id: uuidv4(),
    title: overrides.title ?? "Untitled",
    content: overrides.content ?? "",
    isPinned: overrides.isPinned ?? false,
    parentId: overrides.parentId ?? "root",
    tagIds: overrides.tagIds ?? [],
    inTrash: overrides.inTrash ?? false,
    createdAt: now,
    updatedAt: now,
  };
};

export const saveNote = async (note: Note): Promise<Note> => {
  const updatedNote = {
    ...note,
    updatedAt: DateTime.utc().toISO(),
  };
  await dexie.db.notes.put(updatedNote);
  return updatedNote;
};

export const getNoteById = (id: string): Promise<Note | undefined> =>
  dexie.db.notes.get(id);

export const getAllNotes = (): Promise<Note[]> =>
  dexie.db.notes.filter((note) => !note.inTrash).toArray();

export const getNotesByParentId = (parentId: string): Promise<Note[]> => {
  return dexie.db.notes
    .where("parentId")
    .equals(parentId)
    .filter((note) => !note.inTrash)
    .toArray();
};

export const getTrashedNotes = (): Promise<Note[]> =>
  dexie.db.notes.filter((note) => note.inTrash).sortBy("updatedAt");

export const moveNoteToTrash = async (id: string): Promise<void> => {
  await dexie.db.notes.update(id, {
    inTrash: true,
    updatedAt: DateTime.utc().toISO(),
  });
};

export const restoreNoteFromTrash = async (id: string): Promise<void> => {
  await dexie.db.notes.update(id, {
    inTrash: false,
    updatedAt: DateTime.utc().toISO(),
  });
};

export const deleteNotePermanently = async (id: string): Promise<void> => {
  await dexie.db.notes.delete(id);
};

export const clearTrash = async (): Promise<void> => {
  const trashedNotes = await getTrashedNotes();
  await Promise.all(trashedNotes.map((note) => deleteNotePermanently(note.id)));
};
