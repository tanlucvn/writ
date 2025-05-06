"use client";

import { HeaderCard, RightBar, Sidebar } from "@/components/common";
import {
  HelpDialog,
  Settings,
  Statistics,
  WritesHistory,
} from "@/components/modals";
import { cn } from "@/lib/utils";
import { dexie } from "@/services";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import { useTabStore } from "@/store/tab-store";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useCallback, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { AutoSyncInitializer } from "../auto-sync-initializer";
import FloatingMainMenu from "../common/floating-main-menu";
import ScrollToTop from "../scroll-to-top";
import { SyncIndicator } from "../sync-indicator";
import DashedContainer from "../ui/dashed-container";
const MusicPlayer = dynamic(
  () => import("../../components/modals/music-player"),
);

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    createNewWrite,
    initDB,
    setCurrentContent,
    handlePrevWrite,
    handleNextWrite,
  } = useAppStore();
  const { appColor, toggleZenMode, isZenMode } = useAppSettingsStore();
  const { setIsHelpDialogOpen, setMusicPlayerOpen, setSettingsOpen } =
    useDialogStore();
  const { tab } = useTabStore();
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

  useHotkeys("alt+z", toggleZenMode);
  useHotkeys("alt+n", createNewWrite);
  useHotkeys("alt+h", () => setIsHelpDialogOpen(true));
  useHotkeys("alt+m", () => setMusicPlayerOpen(true));
  useHotkeys("alt+s", () => setSettingsOpen(true));
  useHotkeys("alt+left", handlePrevWrite);
  useHotkeys("alt+right", handleNextWrite);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    document.documentElement.className = `${appColor} ${theme}`;
  }, [appColor, theme]);

  return (
    <>
      <Sidebar />
      {tab === "writes" && !isZenMode && <RightBar />}

      <main className="flex w-screen items-center justify-center">
        <div className="h-full w-full items-center border-r border-l p-1 sm:w-[620px]">
          <DashedContainer
            className={cn(
              "flex min-h-dvh flex-col px-2",
              isZenMode ? "py-4" : "py-10",
            )}
          >
            {isZenMode ? <FloatingMainMenu /> : <HeaderCard />}
            {children}
          </DashedContainer>
        </div>
      </main>

      {/* Dialog, Drawer, Sheet , ... */}
      <Settings />
      <WritesHistory />
      <MusicPlayer />
      <HelpDialog />
      <Statistics />

      {/* Auto Sync */}
      <AutoSyncInitializer />

      {/* Others */}
      <div className="fixed right-4 bottom-12 flex items-center justify-center gap-4 md:bottom-4">
        <SyncIndicator />
        <ScrollToTop />
      </div>
    </>
  );
};

export default AppLayout;
