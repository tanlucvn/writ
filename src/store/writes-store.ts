import { sortWrites } from "@/lib/utils";
import { dexie } from "@/services";
import type { Tag, Write } from "@/types";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { useAppSettingsStore } from "./app-settings-store";

interface WritesStore {
  writes: Write[];
  setWrites: (writes: Write[]) => void;

  tags: Tag[];
  setTags: (tags: Tag[]) => void;

  currentWrite: Write | null;
  setCurrentWrite: (write: Write) => void;

  currentEditWrite: Write | null;
  setCurrentEditWrite: (write: Write | null) => void;

  handlePrevWrite: () => void;
  handleNextWrite: () => void;

  createNewWrite: () => Promise<void>;
  refreshWrites: () => Promise<void>;
  importWrites: (writes: Write[]) => void;

  initDB: () => Promise<void>;
  clearDB: () => Promise<void>;
}

export const useWritesStore = create<WritesStore>((set) => ({
  writes: [],
  setWrites: (writes) => set({ writes }),

  tags: [],
  setTags: (tags) => set({ tags }),

  currentWrite: null,
  setCurrentWrite: (write) => set({ currentWrite: write }),

  currentEditWrite: null,
  setCurrentEditWrite: (write) => set({ currentEditWrite: write }),

  handlePrevWrite: () => {
    const { currentWrite, writes, setCurrentWrite } = useWritesStore.getState();
    if (!currentWrite || writes.length === 0) return;
    const index = writes.findIndex((w) => w.id === currentWrite.id);
    if (index > 0) {
      setCurrentWrite(writes[index - 1]);
    }
  },

  handleNextWrite: () => {
    const { currentWrite, writes, setCurrentWrite } = useWritesStore.getState();
    if (!currentWrite || writes.length === 0) return;
    const index = writes.findIndex((w) => w.id === currentWrite.id);
    if (index < writes.length - 1) {
      setCurrentWrite(writes[index + 1]);
    }
  },

  createNewWrite: async () => {
    const { setCurrentWrite, refreshWrites } = useWritesStore.getState();
    const newWrite = dexie.createWrite();
    await dexie.saveWrite(newWrite);
    toast.success("New write created successfully!");
    setCurrentWrite(newWrite);
    refreshWrites();
  },

  refreshWrites: async () => {
    const allWrites = await dexie.getAllWrites();
    const sortOption = useAppSettingsStore.getState().sortOption;
    const sortedWrites = sortWrites(allWrites, sortOption);
    set({ writes: sortedWrites });
  },

  importWrites: async (writesToImport) => {
    const existingIds = new Set((await dexie.getAllWrites()).map((w) => w.id));
    const newWrites = writesToImport.map((write) => {
      if (existingIds.has(write.id)) {
        return { ...write, id: uuidv4() }; // regenerate new ID
      }
      return write;
    });

    await Promise.all(newWrites.map((w) => dexie.saveWrite(w)));
    useWritesStore.getState().refreshWrites();
  },

  initDB: async () => {
    try {
      const allWrites = await dexie.getAllWrites();
      const allTags = await dexie.getAllTags();
      const sortOption = useAppSettingsStore.getState().sortOption;
      const sortedWrites = sortWrites(allWrites, sortOption);

      set({ writes: sortedWrites, tags: allTags });

      const { setCurrentWrite } = useWritesStore.getState();
      const { lastOpenedWriteId, setLastOpenedWriteId } =
        useAppSettingsStore.getState();

      let write: Write | undefined;

      // 1. Last open
      if (lastOpenedWriteId) {
        write = await dexie.getWrite(lastOpenedWriteId);
      }

      // 2. If no last opened. Get the most recent one
      if (!write && lastOpenedWriteId !== null) {
        write = await dexie.getLatestWrite();
      }

      // 3. If no write exists, create a new one
      if (!write) {
        write = dexie.createWrite();
        await dexie.saveWrite(write);
      }

      setCurrentWrite(write);
      setLastOpenedWriteId(write.id);
    } catch (error) {
      console.error("Error initializing DB:", error);
    }
  },

  clearDB: async () => {
    try {
      await dexie.clearAll();
      const newWrite = dexie.createWrite();
      await dexie.saveWrite(newWrite);
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
