import { create } from "zustand";

interface DialogStore {
  isSettingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;

  isWritesHistoryOpen: boolean;
  setWritesHistoryOpen: (open: boolean) => void;

  isMusicPlayerOpen: boolean;
  setMusicPlayerOpen: (open: boolean) => void;

  isHelpDialogOpen: boolean;
  setIsHelpDialogOpen: (open: boolean) => void;

  isStatisticsOpen: boolean;
  setStatisticsOpen: (open: boolean) => void;

  isWriteSummaryOpen: boolean;
  setIsWriteSummaryOpen: (open: boolean) => void;

  isNewWritingSessionDialogOpen: boolean;
  setIsNewWritingSessionDialogOpen: (open: boolean) => void;

  isWritingSessionHistoryOpen: boolean;
  setWritingSessionHistoryOpen: (open: boolean) => void;

  isWritingSessionSummaryOpen: boolean;
  setIsWritingSessionSummaryOpen: (open: boolean) => void;

  isWritesEditingDialogOpen: boolean;
  setIsWritesEditingDialogOpen: (open: boolean) => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  isSettingsOpen: false,
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),

  isWritesHistoryOpen: false,
  setWritesHistoryOpen: (open) => set({ isWritesHistoryOpen: open }),

  isMusicPlayerOpen: false,
  setMusicPlayerOpen: (open) => set({ isMusicPlayerOpen: open }),

  isHelpDialogOpen: false,
  setIsHelpDialogOpen: (open) => set({ isHelpDialogOpen: open }),

  isStatisticsOpen: false,
  setStatisticsOpen: (open) => set({ isStatisticsOpen: open }),

  isWriteSummaryOpen: false,
  setIsWriteSummaryOpen: (open) => set({ isWriteSummaryOpen: open }),

  isNewWritingSessionDialogOpen: false,
  setIsNewWritingSessionDialogOpen: (open) =>
    set({ isNewWritingSessionDialogOpen: open }),

  isWritingSessionHistoryOpen: false,
  setWritingSessionHistoryOpen: (open) =>
    set({ isWritingSessionHistoryOpen: open }),

  isWritingSessionSummaryOpen: false,
  setIsWritingSessionSummaryOpen: (open) =>
    set({ isWritingSessionSummaryOpen: open }),

  isWritesEditingDialogOpen: false,
  setIsWritesEditingDialogOpen: (open) =>
    set({ isWritesEditingDialogOpen: open }),
}));
