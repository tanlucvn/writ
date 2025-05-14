import type { Editor } from "@tiptap/react";
import { create } from "zustand";

export type SyncStatus = "idle" | "syncing" | "success" | "error";
export type AppTab = "writes" | "about" | "privacy" | "signin";
export type AppMenu = "none" | "menu" | "writes" | "search";

interface AppStore {
  appTab: AppTab;
  setAppTab: (appTab: AppTab) => void;

  currentMenu: AppMenu;
  setCurrentMenu: (menu: AppMenu) => void;

  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;

  syncStatus: SyncStatus;
  setSyncStatus: (status: SyncStatus) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  appTab: "writes",
  setAppTab: (appTab) => set({ appTab }),

  currentMenu: "menu",
  setCurrentMenu: (menu) => set({ currentMenu: menu }),

  editor: null,
  setEditor: (editor) => set({ editor }),

  syncStatus: "idle",
  setSyncStatus: (syncStatus) => set({ syncStatus }),
}));
