import { sortWrites } from "@/lib/utils";
import { dexie } from "@/services";
import type { Tag, Write } from "@/types";
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

  currentContent: Write | null;
  setCurrentContent: (write: Write) => void;

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

  currentContent: null,
  setCurrentContent: (write) => set({ currentContent: write }),

  createNewWrite: async () => {
    const { setCurrentContent, refreshWrites } = useAppStore.getState();
    const newWrite = dexie.createWrite("inter", 16);
    await dexie.saveWrite(newWrite);

    toast.success("New write created successfully!");

    setCurrentContent(newWrite);
    refreshWrites();
  },
  refreshWrites: async () => {
    const allWrites = await dexie.getAllWrites();
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
      const allWrites = await dexie.getAllWrites();
      const allTags = await dexie.getAllTags();

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
      await dexie.clearAll();

      const newWrite = dexie.createWrite("inter", 16);
      await dexie.saveWrite(newWrite);

      set({
        writes: [newWrite],
        currentContent: newWrite,
        tags: [],
      });
    } catch (error) {
      console.error("Failed to clear DB:", error);
    }
  },
}));
