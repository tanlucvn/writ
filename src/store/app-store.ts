import { sortWrites } from "@/lib/utils";
import { clearAll } from "@/services/db/dev";
import { type Tag, getAllTags } from "@/services/db/tags";
import {
  type Write,
  createWrite,
  getAllWrites,
  saveWrite,
} from "@/services/db/writes";
import type { Editor } from "@tiptap/react";
import { toast } from "sonner";
import { create } from "zustand";
import { useAppSettingsStore } from "./app-settings-store";

export type SyncStatus = "idle" | "syncing" | "success" | "error";

interface AppStore {
  writes: Write[];
  setWrites: (writes: Write[]) => void;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;

  currentWrite: Write | null;
  setCurrentWrite: (write: Write) => void;

  createNewWrite: () => Promise<void>;
  refreshWrites: () => Promise<void>;

  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
  editorMode: "floating" | "bubble";
  setEditorMode: (mode: "floating" | "bubble") => void;

  syncStatus: SyncStatus;
  setSyncStatus: (status: SyncStatus) => void;

  initDB: () => Promise<void>;
  clearDB: () => Promise<void>;
}

export const useAppStore = create<AppStore>((set) => ({
  writes: [],
  setWrites: (writes) => set({ writes }),
  tags: [],
  setTags: (tags) => set({ tags }),

  currentWrite: null,
  setCurrentWrite: (write) => set({ currentWrite: write }),

  createNewWrite: async () => {
    const { setCurrentWrite, refreshWrites } = useAppStore.getState();
    const newWrite = createWrite("inter", 16);
    await saveWrite(newWrite);

    toast.success("New write created successfully!");

    setCurrentWrite(newWrite);
    refreshWrites();
  },
  refreshWrites: async () => {
    const allWrites = await getAllWrites();
    const sortOption = useAppSettingsStore.getState().sortOption;
    const sortedWrites = sortWrites(allWrites, sortOption);
    set({ writes: sortedWrites });
  },

  editor: null,
  setEditor: (editor) => set({ editor }),
  editorMode: "floating",
  setEditorMode: (mode) => set({ editorMode: mode }),

  syncStatus: "idle",
  setSyncStatus: (syncStatus) => set({ syncStatus }),

  initDB: async () => {
    try {
      const allWrites = await getAllWrites();
      const allTags = await getAllTags();

      const sortOption = useAppSettingsStore.getState().sortOption;
      const sortedWrites = sortWrites(allWrites, sortOption);

      const { setWrites, setTags } = useAppStore.getState();
      setWrites(sortedWrites);
      setTags(allTags);
    } catch (error) {
      console.error("Error initializing the database:", error);
    }
  },

  clearDB: async () => {
    try {
      await clearAll();

      const newWrite = createWrite("inter", 16);
      await saveWrite(newWrite);

      set({
        writes: [newWrite],
        currentWrite: newWrite,
        tags: [],
      });
    } catch (error) {
      console.error("Failed to clear DB:", error);
    }
  },
}));
