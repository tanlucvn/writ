import { safeCall } from "@/lib/utils";
import * as dexie from "@/services/dexie";
import type { Note } from "@/types";
import { create } from "zustand";

interface NoteState {
  notes: Note[];
  trash: Note[];
  loading: boolean;

  loadNotes: () => Promise<void>;
  loadTrash: () => Promise<void>;

  setNotes: (notes: Note[]) => void;

  addNote: (notePartial: Partial<Note>) => Promise<string | undefined>;
  updateNote: (note: Note) => Promise<void>;

  renameNote: (id: string, newTitle: string) => Promise<void>;
  togglePinNote: (id: string) => Promise<void>;

  moveNoteToTrash: (id: string) => Promise<void>;
  restoreNoteFromTrash: (id: string) => Promise<void>;

  deleteNotePermanently: (id: string) => Promise<void>;
  clearTrash: () => Promise<void>;

  importNotes: (notes: Note[]) => Promise<number | undefined>;
}

export const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  trash: [],
  loading: false,

  loadNotes: () =>
    safeCall(async () => {
      set({ loading: true });
      const notes = await dexie.getAllNotes();
      if (notes.length === 0) {
        const newNote = dexie.createNote({ title: "Untitled" });
        await dexie.saveNote(newNote);
        set({ notes: [newNote] });
      } else {
        set({ notes });
      }
      set({ loading: false });
    }),

  loadTrash: () =>
    safeCall(async () => {
      set({ loading: true });
      const trash = await dexie.getTrashedNotes();
      set({ trash });
      set({ loading: false });
    }),

  setNotes: (notes) => set({ notes }),

  addNote: (notePartial) =>
    safeCall(async () => {
      const newNote = dexie.createNote(notePartial);
      await dexie.saveNote(newNote);
      set((state) => ({
        notes: [...state.notes, newNote],
      }));
      return newNote.id;
    }),

  updateNote: (note) =>
    safeCall(async () => {
      await dexie.saveNote(note);
      set((state) => ({
        notes: state.notes.map((n) => (n.id === note.id ? note : n)),
      }));
    }),

  renameNote: (id, newTitle) =>
    safeCall(async () => {
      const note = await dexie.getNoteById(id);
      if (!note) return;
      const updated = { ...note, title: newTitle };
      await dexie.saveNote(updated);
      set((state) => ({
        notes: state.notes.map((n) => (n.id === id ? updated : n)),
      }));
    }),

  togglePinNote: (id: string) =>
    safeCall(async () => {
      const note = await dexie.getNoteById(id);
      if (!note) return;

      const updated = { ...note, isPinned: !note.isPinned };
      await dexie.saveNote(updated);

      set((state) => ({
        notes: state.notes.map((n) => (n.id === id ? updated : n)),
      }));
    }),

  moveNoteToTrash: (id) =>
    safeCall(async () => {
      const note = await dexie.getNoteById(id);
      if (!note) return;

      // Get all child notes (1 level deep)
      const allNotes = await dexie.getAllNotes();
      const childNotes = allNotes.filter((n) => n.parentId === id);

      // Move parent note to trash
      await dexie.moveNoteToTrash(id);

      // Move all child notes to trash
      await Promise.all(childNotes.map((n) => dexie.moveNoteToTrash(n.id)));

      set((state) => ({
        notes: state.notes.filter((n) => n.id !== id && n.parentId !== id),
      }));

      const trash = await dexie.getTrashedNotes();
      set({ trash });
    }),

  restoreNoteFromTrash: (id) =>
    safeCall(async () => {
      await dexie.restoreNoteFromTrash(id);
      let restored = await dexie.getNoteById(id);
      if (!restored) return;

      if (restored.parentId && restored.parentId !== "root") {
        restored = { ...restored, parentId: "root" };
        await dexie.saveNote(restored);
      }

      set((state) => ({
        trash: state.trash.filter((t) => t.id !== id),
        notes: [...state.notes, restored],
      }));
    }),

  deleteNotePermanently: (id) =>
    safeCall(async () => {
      await dexie.deleteNotePermanently(id);
      set((state) => ({
        trash: state.trash.filter((t) => t.id !== id),
      }));
    }),

  clearTrash: () =>
    safeCall(async () => {
      await dexie.clearTrash();
      set({ trash: [] });
    }),

  importNotes: (notesToImport) =>
    safeCall(async () => {
      const existingMap = new Map(get().notes.map((n) => [n.id, n]));

      const updatedNotes: Note[] = [];
      const newNotes: Note[] = [];

      for (const note of notesToImport) {
        if (existingMap.has(note.id)) {
          // If the ID exists, overwrite the existing note
          updatedNotes.push(note);
        } else {
          newNotes.push(note);
        }
      }

      await Promise.all([
        ...updatedNotes.map((n) => dexie.saveNote(n)),
        ...newNotes.map((n) => dexie.saveNote(n)),
      ]);

      set((state) => ({
        notes: [
          ...state.notes.filter(
            (n) => !updatedNotes.some((u) => u.id === n.id),
          ),
          ...updatedNotes,
          ...newNotes,
        ],
      }));

      return updatedNotes.length + newNotes.length;
    }),
}));
