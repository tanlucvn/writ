"use client";

import { useDialogStore } from "@/store/use-dialog-store";
import dynamic from "next/dynamic";

const SettingsModal = dynamic(() => import("@/components/modals/settings"));
const TrashModal = dynamic(
  () => import("@/components/modals/notes/trash-notes"),
);
const AllNotesModal = dynamic(
  () => import("@/components/modals/notes/all-notes"),
);
const EditNoteTitleModal = dynamic(
  () => import("@/components/modals/notes/edit-note-title"),
);
const NoteSummaryModal = dynamic(
  () => import("@/components/modals/notes/note-summary"),
);
const KeyboardShortcutsModal = dynamic(
  () => import("@/components/modals/keyboard-shortcuts"),
);
const Statistics = dynamic(
  () => import("@/components/modals/notes/statistics"),
);
const NewSessionModal = dynamic(
  () => import("@/components/modals/sessions/new-session"),
);

export const ModalInitializer = () => {
  const {
    isSettingsOpen,
    isTrashOpen,
    isAllNotesOpen,
    isEditNoteTitleOpen,
    isNoteSummaryOpen,
    isKeyboardShortcutsOpen,
    isStatisticsOpen,
    isNewSessionOpen,
  } = useDialogStore();

  const modals = [
    { open: isSettingsOpen, Component: SettingsModal },
    { open: isTrashOpen, Component: TrashModal },
    { open: isAllNotesOpen, Component: AllNotesModal },
    { open: isEditNoteTitleOpen, Component: EditNoteTitleModal },
    { open: isNoteSummaryOpen, Component: NoteSummaryModal },
    { open: isKeyboardShortcutsOpen, Component: KeyboardShortcutsModal },
    { open: isStatisticsOpen, Component: Statistics },
    { open: isNewSessionOpen, Component: NewSessionModal },
  ];

  return (
    <>
      {modals.map(
        ({ open, Component }, idx) => open && <Component key={idx} />,
      )}
    </>
  );
};
