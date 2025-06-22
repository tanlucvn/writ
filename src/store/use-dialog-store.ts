import { create } from "zustand";

interface DialogStore {
  isSettingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;

  isAllNotesOpen: boolean;
  setIsAllNotesOpen: (open: boolean) => void;

  isEditNoteTitleOpen: boolean;
  setIsEditNoteTitleOpen: (open: boolean) => void;

  isNoteSummaryOpen: boolean;
  setIsNoteSummaryOpen: (open: boolean) => void;

  isKeyboardShortcutsOpen: boolean;
  setIsKeyboardShortcutsOpen: (open: boolean) => void;

  isTrashOpen: boolean;
  setIsTrashOpen: (open: boolean) => void;

  isStatisticsOpen: boolean;
  setIsStatisticsOpen: (open: boolean) => void;

  isNewSessionOpen: boolean;
  setIsNewSessionOpen: (open: boolean) => void;

  isSessionHistoryOpen: boolean;
  setIsSessionHistoryOpen: (open: boolean) => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  isSettingsOpen: false,
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),

  isAllNotesOpen: false,
  setIsAllNotesOpen: (open) => set({ isAllNotesOpen: open }),

  isKeyboardShortcutsOpen: false,
  setIsKeyboardShortcutsOpen: (open) => set({ isKeyboardShortcutsOpen: open }),

  isNoteSummaryOpen: false,
  setIsNoteSummaryOpen: (open) => set({ isNoteSummaryOpen: open }),

  isTrashOpen: false,
  setIsTrashOpen: (open) => set({ isTrashOpen: open }),

  isEditNoteTitleOpen: false,
  setIsEditNoteTitleOpen: (open) => set({ isEditNoteTitleOpen: open }),

  isStatisticsOpen: false,
  setIsStatisticsOpen: (open) => set({ isStatisticsOpen: open }),

  isNewSessionOpen: false,
  setIsNewSessionOpen: (open) => set({ isNewSessionOpen: open }),

  isSessionHistoryOpen: false,
  setIsSessionHistoryOpen: (open) => set({ isSessionHistoryOpen: open }),
}));
