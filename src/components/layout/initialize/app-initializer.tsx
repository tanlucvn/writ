"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useNoteActions } from "@/hooks/use-note-actions";
import { dexie } from "@/services";
import { useActiveSessionStore } from "@/store/use-active-session-store";
import { useAppSettingsStore } from "@/store/use-app-settings-store";
import { useDialogStore } from "@/store/use-dialog-store";
import { useNoteStore } from "@/store/use-note-store";
import { useSessionStore } from "@/store/use-session-store";
import { useTagStore } from "@/store/use-tags-store";

const AppInitializer = () => {
  const { loadNotes, loadTrash } = useNoteStore();
  const { loadTags } = useTagStore();
  const { loadSessions } = useSessionStore();
  const { start } = useActiveSessionStore();

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
      await loadSessions();

      const id = await dexie.getActiveSessionId();
      if (id) {
        const session = useSessionStore
          .getState()
          .sessions.find((s) => s.id === id);
        if (session) {
          start(session.id);
        }
      }
    };

    init();
  }, [loadNotes, loadTrash, loadTags, loadSessions, start]);

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
