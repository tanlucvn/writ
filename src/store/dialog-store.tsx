import { create } from "zustand";

interface DialogStore {
  isSettingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;

  isWritesHistoryOpen: boolean;
  setWritesHistoryOpen: (open: boolean) => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  isSettingsOpen: false,
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),

  isWritesHistoryOpen: false,
  setWritesHistoryOpen: (open) => set({ isWritesHistoryOpen: open }),
}));
