import { create } from "zustand";

export type Tab = "writes" | "about" | "privacy";

interface TabStore {
  tab: Tab;
  setTab: (tab: Tab) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  tab: "writes",
  setTab: (tab) => set({ tab }),
}));
