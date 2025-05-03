"use client";

import { HeaderCard, RightBar, Sidebar } from "@/components/common";
import {
  HelpDialog,
  MusicPlayer,
  Settings,
  WritesHistory,
} from "@/components/modals";
import { dexie } from "@/services";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import { useTabStore } from "@/store/tab-store";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { AutoSyncInitializer } from "../auto-sync-initializer";
import ScollToTop from "../scroll-to-top";
import StatsDashboard from "../statistics";
import { SyncIndicator } from "../sync-indicator";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { createNewWrite, initDB, setCurrentContent } = useAppStore();
  const { appColor, toggleZenMode, fontFamily, fontSize } =
    useAppSettingsStore();
  const { setIsHelpDialogOpen, setMusicPlayerOpen, setSettingsOpen } =
    useDialogStore();
  const { tab } = useTabStore();
  const { theme } = useTheme();

  const initializeData = useCallback(async () => {
    try {
      await initDB();

      const recent = await dexie.getLatestWrite();
      const write = recent ?? dexie.createWrite(fontFamily, fontSize);
      if (!recent) await dexie.saveWrite(write);
      setCurrentContent(write);
    } catch (err) {
      console.error("Failed to initialize data:", err);
    }
  }, [fontFamily, fontSize, initDB, setCurrentContent]);

  useHotkeys("alt+z", toggleZenMode);
  useHotkeys("alt+n", createNewWrite);
  useHotkeys("alt+h", () => setIsHelpDialogOpen(true));
  useHotkeys("alt+m", () => setMusicPlayerOpen(true));
  useHotkeys("alt+s", () => setSettingsOpen(true));

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    document.documentElement.className = `${appColor} ${theme}`;
  }, [appColor, theme]);

  return (
    <>
      <Sidebar />
      {tab === "writes" && <RightBar />}

      <main className="flex w-screen items-center justify-center">
        <div className="flex min-h-dvh w-full flex-col items-center border-r border-l px-2 py-10 sm:w-[620px]">
          <HeaderCard />
          {children}
        </div>
      </main>

      <div className="fixed bottom-4 left-4 flex items-center justify-center gap-4">
        <ScollToTop />
      </div>

      {/* Dialog, Drawer, Sheet , ... */}
      <Settings />
      <WritesHistory />
      <MusicPlayer />
      <HelpDialog />
      <StatsDashboard />

      {/* Auto Sync */}
      <AutoSyncInitializer />
      <SyncIndicator />
    </>
  );
};

export default AppLayout;
