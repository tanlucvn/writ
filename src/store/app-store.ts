import { type Write, getAllWrites, saveWrite } from "@/services/indexedDB";
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

  currentWrite: Write | null;
  setCurrentWrite: (write: Write) => void;
  saveCurrentWrite: () => Promise<void>;
  refreshWrites: () => Promise<void>;
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
}));
