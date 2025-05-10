"use client";

import { HeaderCard, RightBar, Sidebar } from "@/components/common";
import { AppInitializer, AutoSyncInitializer } from "@/components/init";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useTabStore } from "@/store/tab-store";
import FloatingMainMenu from "../common/floating-main-menu";
import {
  HelpDialog,
  MusicPlayer,
  Settings,
  Statistics,
  WritesHistory,
} from "../modals";
import ScrollToTop from "../scroll-to-top";
import SyncIndicator from "../sync-indicator";
import DashedContainer from "../ui/dashed-container";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isZenMode } = useAppSettingsStore();
  const { tab } = useTabStore();

  return (
    <>
      <Sidebar />
      {tab === "writes" && !isZenMode && <RightBar />}

      <main className="flex w-screen items-center justify-center">
        <div className="h-full w-full items-center border-r border-l p-1 sm:w-[620px]">
          <DashedContainer className="flex min-h-dvh flex-col px-2">
            {isZenMode ? <FloatingMainMenu /> : <HeaderCard />}
            {children}
          </DashedContainer>
        </div>
      </main>

      {/* Init */}
      <AutoSyncInitializer />
      <AppInitializer />

      {/* Dialog, Drawer, Sheet , ... */}
      <Settings />
      <WritesHistory />
      <MusicPlayer />
      <HelpDialog />
      <Statistics />

      {/* Others */}
      <div className="fixed right-4 bottom-12 flex items-center justify-center gap-4 md:bottom-4">
        <SyncIndicator />
        <ScrollToTop />
      </div>
    </>
  );
};

export default AppLayout;
