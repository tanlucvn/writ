import { create } from "zustand";
import { persist } from "zustand/middleware";

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

  isCollapsedSidebar: boolean;
  toggleCollapsedSidebar: () => void;

  sortOption: string;
  setSortOption: (option: string) => void;

  lastOpenedWriteId: string | null;
  setLastOpenedWriteId: (id: string | null) => void;
}

export const useAppSettingsStore = create<AppSettingsStore>()(
  persist(
    (set, get) => ({
      fontSize: 16,
      setFontSize: (size) =>
        set({ fontSize: Math.min(Math.max(size, 12), 32) }),

      fontFamily: "inter",
      setFontFamily: (family) => set({ fontFamily: family }),

      isZenMode: false,
      toggleZenMode: () => set({ isZenMode: !get().isZenMode }),

      appColor: "default",
      setAppColor: (color) => set({ appColor: color }),

      syncInterval: 5,
      setSyncInterval: (interval) => set({ syncInterval: interval }),

      isAutoSync: false,
      toggleAutoSync: () => set({ isAutoSync: !get().isAutoSync }),

      isCollapsedSidebar: false,
      toggleCollapsedSidebar: () =>
        set({ isCollapsedSidebar: !get().isCollapsedSidebar }),

      sortOption: "updated-desc",
      setSortOption: (option) => set({ sortOption: option }),

      lastOpenedWriteId: null,
      setLastOpenedWriteId: (id) => set({ lastOpenedWriteId: id }),
    }),
    {
      name: "app-settings-store",
    },
  ),
);
