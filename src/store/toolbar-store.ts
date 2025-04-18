import { create } from "zustand";

interface ToolbarStore {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
}

export const useToolbarStore = create<ToolbarStore>((set) => ({
  fontSize: 16,
  increaseFontSize: () =>
    set((state) => ({
      fontSize: Math.min(state.fontSize + 1, 32), // Max 32px
    })),
  decreaseFontSize: () =>
    set((state) => ({
      fontSize: Math.max(state.fontSize - 1, 12), // Min 12px
    })),
  fontFamily: "inter",
  setFontFamily: (family) => set({ fontFamily: family }),
}));
