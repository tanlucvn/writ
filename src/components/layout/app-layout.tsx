"use client";

import {
  AppInitializer,
  AutoSyncInitializer,
} from "@/components/layout/initialize";
import {
  AllNotesModal,
  EditNoteTitleModal,
  KeyboardShortcutsModal,
  NoteSummaryModal,
  SettingsModal,
  TrashModal,
} from "@/components/modals";
import { SaveNoteModal } from "../modals/writes/save-note";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      {/*----------------- Init  -----------------*/}
      <AutoSyncInitializer />
      <AppInitializer />

      {/*----------------- Dialog, Drawer, Sheet , ...  -----------------*/}
      {/* App */}
      <SettingsModal />
      <AllNotesModal />
      <KeyboardShortcutsModal />

      {/* Writes */}
      {/* <WriteCreatorDialog /> */}
      <NoteSummaryModal />
      <EditNoteTitleModal />
      <TrashModal />
      <SaveNoteModal />
    </>
  );
};

export default AppLayout;
