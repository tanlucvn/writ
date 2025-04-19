import { create } from "zustand";

interface AppStore {
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
  isZenMode: boolean;
  toggleZenMode: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  fontSize: 16,
  setFontSize: (size) => set({ fontSize: Math.min(Math.max(size, 12), 32) }), // Min 12 - Max 32
  fontFamily: "inter",
  setFontFamily: (family) => set({ fontFamily: family }),
  isZenMode: false,
  toggleZenMode: () => set((state) => ({ isZenMode: !state.isZenMode })),
}));
