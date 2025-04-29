import { loadFromLocalStorage, saveToLocalStorage } from "@/lib/local-storage";
import { create } from "zustand";

export type AppColor = "default" | "beige" | "olive" | "ash" | "fog" | "mono";

interface AppSettingsStore {
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
  isZenMode: boolean;
  toggleZenMode: () => void;
  appColor: AppColor;
  setAppColor: (color: AppColor) => void;
}

export const useAppSettingsStore = create<AppSettingsStore>((set) => {
  const savedFontSize = loadFromLocalStorage("fontSize", 16);
  const savedFontFamily = loadFromLocalStorage("fontFamily", "inter");
  const savedZenMode = loadFromLocalStorage("isZenMode", false);
  const savedAppColor = loadFromLocalStorage("appColor", "default");

  return {
    fontSize: savedFontSize,
    setFontSize: (size) => {
      set({ fontSize: Math.min(Math.max(size, 12), 32) });
      saveToLocalStorage("fontSize", size);
    },
    fontFamily: savedFontFamily,
    setFontFamily: (family) => {
      set({ fontFamily: family });
      saveToLocalStorage("fontFamily", family);
    },
    isZenMode: savedZenMode,
    toggleZenMode: () => {
      set((state) => {
        const newZenMode = !state.isZenMode;
        saveToLocalStorage("isZenMode", newZenMode);
        return { isZenMode: newZenMode };
      });
    },
    appColor: savedAppColor,
    setAppColor: (color) => {
      set({ appColor: color });
      saveToLocalStorage("appColor", color);
    },
  };
});
