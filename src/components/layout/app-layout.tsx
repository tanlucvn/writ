"use client";

import { useAppStore } from "@/store/app-store";
import { useDialogStore } from "@/store/dialog-store";
import { useHotkeys } from "react-hotkeys-hook";
import { HeaderCard } from "../common/header-card";
import { Sidebar } from "../common/sidebar";
import HelpDialog from "../modals/help-dialog";
import MusicPlayer from "../modals/music-player";
import Settings from "../modals/settings";
import WritesHistory from "../modals/writes-history";
import ScollToTop from "../scroll-to-top";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { toggleZenMode, createNewWrite } = useAppStore();
  const { setIsHelpDialogOpen, setMusicPlayerOpen, setSettingsOpen } =
    useDialogStore();

  useHotkeys("alt+z", toggleZenMode);
  useHotkeys("alt+n", createNewWrite);
  useHotkeys("alt+h", () => setIsHelpDialogOpen(true));
  useHotkeys("alt+m", () => setMusicPlayerOpen(true));
  useHotkeys("alt+s", () => setSettingsOpen(true));

  return (
    <>
      <Sidebar />

      <main className="flex w-screen items-center justify-center">
        <div className="flex min-h-dvh w-full flex-col items-center border-r border-l px-2 py-10 sm:w-[620px]">
          <HeaderCard />
          {children}
        </div>
      </main>

      <div className="fixed right-4 bottom-4 flex items-center justify-center gap-4">
        <ScollToTop />
      </div>

      {/* Dialog, Drawer, Sheet , ... */}
      <Settings />
      <WritesHistory />
      <MusicPlayer />
      <HelpDialog />
    </>
  );
}
