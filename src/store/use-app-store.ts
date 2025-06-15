import type { Note } from "@/types";
import { create } from "zustand";

export type SyncStatus = "idle" | "syncing" | "success" | "error";

interface AppStore {
  currentEditNote: Note | null;
  setCurrentEditNote: (note: Note | null) => void;

  syncStatus: SyncStatus;
  setSyncStatus: (status: SyncStatus) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentEditNote: null,
  setCurrentEditNote: (note) => set({ currentEditNote: note }),

  syncStatus: "idle",
  setSyncStatus: (syncStatus) => set({ syncStatus }),
}));
