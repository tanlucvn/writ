"use client";
import { useNoteActions } from "@/hooks/use-note-actions";
import { useAppSettingsStore } from "@/store/use-app-settings-store";
import { useDialogStore } from "@/store/use-dialog-store";
import { useNoteStore } from "@/store/use-note-store";
import { useTagStore } from "@/store/use-tags-store";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const AppInitializer = () => {
  const { loadNotes, loadTrash } = useNoteStore();
  const { loadTags } = useTagStore();
  const { appColor, toggleZenMode } = useAppSettingsStore();
  const { setIsKeyboardShortcutsOpen, setSettingsOpen } = useDialogStore();

  const { onCreate } = useNoteActions();
  const { theme } = useTheme();

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const init = async () => {
      await loadNotes();
      await loadTrash();
      await loadTags();
    };

    init();
  }, [loadNotes, loadTrash, loadTags]);

  useEffect(() => {
    document.documentElement.className = `${appColor} ${theme}`;
  }, [appColor, theme]);

  useHotkeys("alt+z", toggleZenMode);
  useHotkeys("alt+n", () => onCreate());
  useHotkeys("alt+h", () => setIsKeyboardShortcutsOpen(true));
  useHotkeys("alt+s", () => setSettingsOpen(true));

  return null;
};

export default AppInitializer;
