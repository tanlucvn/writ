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

  syncInterval: number; // minutes
  setSyncInterval: (interval: number) => void;

  isAutoSync: boolean;
  toggleAutoSync: () => void;

  sortOption: string;
  setSortOption: (option: string) => void;
}

export const useAppSettingsStore = create<AppSettingsStore>((set) => {
  const savedFontSize = loadFromLocalStorage("fontSize", 16);
  const savedFontFamily = loadFromLocalStorage("fontFamily", "inter");
  const savedZenMode = loadFromLocalStorage("isZenMode", false);
  const savedAppColor = loadFromLocalStorage("appColor", "default");
  const savedSyncInterval = loadFromLocalStorage("syncInterval", 5); // Default 5 minutes
  const savedIsAutoSync = loadFromLocalStorage("isAutoSync", false);
  const savedSortOption = loadFromLocalStorage("sortOption", "updated-desc");

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

    syncInterval: savedSyncInterval,
    setSyncInterval: (interval) => {
      set({ syncInterval: interval });
      saveToLocalStorage("syncInterval", interval);
    },

    isAutoSync: savedIsAutoSync,
    toggleAutoSync: () => {
      set((state) => {
        const newAutoSync = !state.isAutoSync;
        saveToLocalStorage("isAutoSync", newAutoSync);
        return { isAutoSync: newAutoSync };
      });
    },

    sortOption: savedSortOption,
    setSortOption: (option) => {
      set({ sortOption: option });
      saveToLocalStorage("sortOption", option);
    },
  };
});
