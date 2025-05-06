"use client";

import { HeaderCard, RightBar, Sidebar } from "@/components/common";
import { AppInitializer, AutoSyncInitializer } from "@/components/init";
import { cn } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useTabStore } from "@/store/tab-store";
import dynamic from "next/dynamic";
import FloatingMainMenu from "../common/floating-main-menu";
import DashedContainer from "../ui/dashed-container";

const Settings = dynamic(() => import("@/components/modals/settings"), {
  ssr: false,
});
const WritesHistory = dynamic(
  () => import("@/components/modals/writes-history"),
  { ssr: false },
);
const HelpDialog = dynamic(() => import("@/components/modals/help-dialog"), {
  ssr: false,
});
const Statistics = dynamic(() => import("@/components/modals/statistics"), {
  ssr: false,
});
const MusicPlayer = dynamic(() => import("@/components/modals/music-player"), {
  ssr: false,
});

const ScrollToTop = dynamic(() => import("@/components/scroll-to-top"), {
  ssr: false,
});
const SyncIndicator = dynamic(() => import("@/components/sync-indicator"), {
  ssr: false,
});

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isZenMode } = useAppSettingsStore();
  const { tab } = useTabStore();

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
