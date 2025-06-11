import { create } from "zustand";

interface DialogStore {
  isSettingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;

  isAllNotesModalOpen: boolean;
  setIsAllNotesModalOpen: (open: boolean) => void;

  isShortcutsModalOpen: boolean;
  setIsShortcutsModalOpen: (open: boolean) => void;

  isStatisticsOpen: boolean;
  setStatisticsOpen: (open: boolean) => void;

  isWriteSummaryOpen: boolean;
  setIsWriteSummaryOpen: (open: boolean) => void;

  isSaveNoteModalOpen: boolean;
  setIsSaveNoteModalOpen: (open: boolean) => void;

  isWritingSessionHistoryOpen: boolean;
  setWritingSessionHistoryOpen: (open: boolean) => void;

  isWritingSessionSummaryOpen: boolean;
  setIsWritingSessionSummaryOpen: (open: boolean) => void;

  isWritesEditingDialogOpen: boolean;
  setIsWritesEditingDialogOpen: (open: boolean) => void;

  isTrashModalOpen: boolean;
  setIsTrashModalOpen: (open: boolean) => void;

  isFolderEditingDialogOpen: boolean;
  setIsFolderEditingDialogOpen: (open: boolean) => void;

  isFolderDeleteDialogOpen: boolean;
  setIsFolderDeleteDialogOpen: (open: boolean) => void;

  isNewWriteDialogOpen: boolean;
  setIsNewWriteDialogOpen: (open: boolean) => void;

  isEditTitleModalOpen: boolean;
  setIsEditTitleModalOpen: (open: boolean) => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  isSettingsOpen: false,
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),

  isAllNotesModalOpen: false,
  setIsAllNotesModalOpen: (open) => set({ isAllNotesModalOpen: open }),

  isShortcutsModalOpen: false,
  setIsShortcutsModalOpen: (open) => set({ isShortcutsModalOpen: open }),

  isStatisticsOpen: false,
  setStatisticsOpen: (open) => set({ isStatisticsOpen: open }),

  isWriteSummaryOpen: false,
  setIsWriteSummaryOpen: (open) => set({ isWriteSummaryOpen: open }),

  isSaveNoteModalOpen: false,
  setIsSaveNoteModalOpen: (open) => set({ isSaveNoteModalOpen: open }),

  isWritingSessionHistoryOpen: false,
  setWritingSessionHistoryOpen: (open) =>
    set({ isWritingSessionHistoryOpen: open }),

  isWritingSessionSummaryOpen: false,
  setIsWritingSessionSummaryOpen: (open) =>
    set({ isWritingSessionSummaryOpen: open }),

  isWritesEditingDialogOpen: false,
  setIsWritesEditingDialogOpen: (open) =>
    set({ isWritesEditingDialogOpen: open }),

  isTrashModalOpen: false,
  setIsTrashModalOpen: (open) => set({ isTrashModalOpen: open }),

  isFolderEditingDialogOpen: false,
  setIsFolderEditingDialogOpen: (open) =>
    set({ isFolderEditingDialogOpen: open }),

  isFolderDeleteDialogOpen: false,
  setIsFolderDeleteDialogOpen: (open) =>
    set({ isFolderDeleteDialogOpen: open }),

  isNewWriteDialogOpen: false,
  setIsNewWriteDialogOpen: (open) => set({ isNewWriteDialogOpen: open }),

  isEditTitleModalOpen: false,
  setIsEditTitleModalOpen: (open) => set({ isEditTitleModalOpen: open }),
}));
