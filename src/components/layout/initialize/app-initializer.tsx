"use client";

import { useNoteActions } from "@/hooks/use-note-actions";
import { useAppSettingsStore } from "@/store/use-app-settings-store";
import { useDialogStore } from "@/store/use-dialog-store";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { AutoSyncInitializer } from "./auto-sync-initializer";
import { ModalInitializer } from "./modal-initializer";
import { NoteDataInitializer } from "./note-data-initializer";
import { SessionInitializer } from "./session-initializer";
import { TagDataInitializer } from "./tag-data-initializer";

const AppInitializer = () => {
  const { appColor, toggleZenMode } = useAppSettingsStore();
  const { setIsKeyboardShortcutsOpen, setSettingsOpen } = useDialogStore();
  const { onCreate } = useNoteActions();
  const { theme } = useTheme();

  // Apply theme
  useEffect(() => {
    document.documentElement.className = `${appColor} ${theme}`;
  }, [appColor, theme]);

  // Hotkeys
  useHotkeys("alt+z", toggleZenMode);
  useHotkeys("alt+n", () => onCreate());
  useHotkeys("alt+h", () => setIsKeyboardShortcutsOpen(true));
  useHotkeys("alt+s", () => setSettingsOpen(true));

  return (
    <>
      <NoteDataInitializer />
      <TagDataInitializer />
      <SessionInitializer />

      <AutoSyncInitializer />
      <ModalInitializer />
    </>
  );
};

export default AppInitializer;
