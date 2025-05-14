"use client";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useDialogStore } from "@/store/dialog-store";
import { useWritesStore } from "@/store/writes-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const AppInitializer = () => {
  const { createNewWrite, initDB, handlePrevWrite, handleNextWrite } =
    useWritesStore();
  const { initSessionsDB } = useWritingSessionsStore();
  const { appColor, toggleZenMode } = useAppSettingsStore();
  const { setIsHelpDialogOpen, setMusicPlayerOpen, setSettingsOpen } =
    useDialogStore();
  const { theme } = useTheme();

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const init = async () => {
      await initDB();
      await initSessionsDB();
    };

    init();
  }, [initDB, initSessionsDB]);

  useEffect(() => {
    document.documentElement.className = `${appColor} ${theme}`;
  }, [appColor, theme]);

  useHotkeys("alt+z", toggleZenMode);
  useHotkeys("alt+n", createNewWrite);
  useHotkeys("alt+h", () => setIsHelpDialogOpen(true));
  useHotkeys("alt+m", () => setMusicPlayerOpen(true));
  useHotkeys("alt+s", () => setSettingsOpen(true));
  useHotkeys("alt+left", handlePrevWrite);
  useHotkeys("alt+right", handleNextWrite);

  return null;
};

export default AppInitializer;
