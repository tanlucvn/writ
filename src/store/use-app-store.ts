import type { Note } from "@/types";
import type { Editor } from "@tiptap/react";
import { create } from "zustand";

export type SyncStatus = "idle" | "syncing" | "success" | "error";

interface AppStore {
  currentEditNote: Note | null;
  setCurrentEditNote: (note: Note | null) => void;

  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;

  syncStatus: SyncStatus;
  setSyncStatus: (status: SyncStatus) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentEditNote: null,
  setCurrentEditNote: (note) => set({ currentEditNote: note }),

  editor: null,
  setEditor: (editor) => set({ editor }),

  syncStatus: "idle",
  setSyncStatus: (syncStatus) => set({ syncStatus }),
}));
