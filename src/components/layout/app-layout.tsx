"use client";

import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { AutoSyncInitializer } from "../auto-sync-initializer";
import { HeaderCard } from "../common/header-card";
import { Sidebar } from "../common/sidebar";
import HelpDialog from "../modals/help-dialog";
import MusicPlayer from "../modals/music-player";
import Settings from "../modals/settings";
import WritesHistory from "../modals/writes-history";
import ScollToTop from "../scroll-to-top";
import StatsDashboard from "../statistics";
import { SyncIndicator } from "../sync-indicator";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { createNewWrite } = useAppStore();
  const { appColor, toggleZenMode } = useAppSettingsStore();
  const { setIsHelpDialogOpen, setMusicPlayerOpen, setSettingsOpen } =
    useDialogStore();
  const { theme } = useTheme();

  useHotkeys("alt+z", toggleZenMode);
  useHotkeys("alt+n", createNewWrite);
  useHotkeys("alt+h", () => setIsHelpDialogOpen(true));
  useHotkeys("alt+m", () => setMusicPlayerOpen(true));
  useHotkeys("alt+s", () => setSettingsOpen(true));

  useEffect(() => {
    document.documentElement.className = `${appColor} ${theme}`;
  }, [appColor, theme]);

  return (
    <>
      <Sidebar />

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
}
