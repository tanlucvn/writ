"use client";

import { dexie } from "@/services";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useDialogStore } from "@/store/dialog-store";
import { useWritesStore } from "@/store/writes-store";
import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const AppInitializer = () => {
  const {
    createNewWrite,
    refreshWrites,
    initDB,
    setCurrentWrite,
    handlePrevWrite,
    handleNextWrite,
  } = useWritesStore();
  const { initSessionsDB } = useWritingSessionsStore();
  const { appColor, toggleZenMode } = useAppSettingsStore();
  const { setIsHelpDialogOpen, setMusicPlayerOpen, setSettingsOpen } =
    useDialogStore();
  const { theme } = useTheme();

  const hasInitialized = useRef(false);

  const initializeData = useCallback(async () => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    try {
      await initDB();
      await initSessionsDB();
      const recent = await dexie.getLatestWrite();
      const write = recent ?? dexie.createWrite();

      if (!recent) {
        await dexie.saveWrite(write);
        await refreshWrites();
      }

      setCurrentWrite(write);
    } catch (err) {
      console.error("Failed to initialize data:", err);
    }
  }, [initDB, initSessionsDB, setCurrentWrite, refreshWrites]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

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
