"use client";

import { dexie } from "@/services";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const AppInitializer = () => {
  const {
    createNewWrite,
    initDB,
    setCurrentContent,
    handlePrevWrite,
    handleNextWrite,
  } = useAppStore();
  const { appColor, toggleZenMode } = useAppSettingsStore();
  const { setIsHelpDialogOpen, setMusicPlayerOpen, setSettingsOpen } =
    useDialogStore();
  const { theme } = useTheme();

  const initializeData = useCallback(async () => {
    try {
      await initDB();
      const recent = await dexie.getLatestWrite();
      const write = recent ?? dexie.createWrite();
      if (!recent) await dexie.saveWrite(write);
      setCurrentContent(write);
    } catch (err) {
      console.error("Failed to initialize data:", err);
    }
  }, [initDB, setCurrentContent]);

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
