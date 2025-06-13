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
    <main className="flex h-screen max-h-screen w-full items-center justify-center overflow-hidden p-0">
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
    </main>
  );
};

export default AppLayout;
