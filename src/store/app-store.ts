import { clearAll } from "@/services/db/dev";
import { type Tag, getAllTags } from "@/services/db/tags";
import {
  type Write,
  createWrite,
  getAllWrites,
  saveWrite,
} from "@/services/db/writes";
import type { Editor } from "@tiptap/react";
import { create } from "zustand";

interface AppStore {
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
  isZenMode: boolean;
  toggleZenMode: () => void;

  writes: Write[];
  setWrites: (writes: Write[]) => void;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;

  currentWrite: Write | null;
  setCurrentWrite: (write: Write) => void;
  saveCurrentWrite: () => Promise<void>;
  refreshWrites: () => Promise<void>;

  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;

  initDB: () => Promise<void>;
  clearDB: () => Promise<void>;
}

export const useAppStore = create<AppStore>((set) => ({
  fontSize: 16,
  setFontSize: (size) => set({ fontSize: Math.min(Math.max(size, 12), 32) }), // Min 12 - Max 32
  fontFamily: "inter",
  setFontFamily: (family) => set({ fontFamily: family }),
  isZenMode: false,
  toggleZenMode: () => set((state) => ({ isZenMode: !state.isZenMode })),

  writes: [],
  setWrites: (writes) => set({ writes }),
  tags: [],
  setTags: (tags) => set({ tags }),

  currentWrite: null,
  setCurrentWrite: (write) => set({ currentWrite: write }),
  saveCurrentWrite: async () => {
    const { currentWrite, refreshWrites } = useAppStore.getState();
    if (currentWrite) {
      await saveWrite(currentWrite);
      await refreshWrites();
    }
  },
  refreshWrites: async () => {
    const allWrites = await getAllWrites();
    set({ writes: allWrites });
  },

  editor: null,
  setEditor: (editor) => set({ editor }),

  initDB: async () => {
    try {
      const allWrites = await getAllWrites();
      const allTags = await getAllTags();

      const { setWrites, setTags } = useAppStore.getState();
      setWrites(allWrites);
      setTags(allTags);
    } catch (error) {
      console.error("Error initializing the database:", error);
    }
  },
  clearDB: async () => {
    try {
      await clearAll();

      const { fontFamily, fontSize } = useAppStore.getState();
      const newWrite = createWrite(fontFamily, fontSize);
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
