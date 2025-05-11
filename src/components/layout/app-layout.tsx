"use client";

import { HeaderCard, RightBar, Sidebar } from "@/components/common";
import { AppInitializer, AutoSyncInitializer } from "@/components/init";
import { useAppSettingsStore } from "@/store/app-settings-store";
import FloatingMainMenu from "../common/floating-main-menu";
import Footer from "../common/footer";
import {
  HelpDialog,
  MusicPlayer,
  Settings,
  Statistics,
  WritesHistory,
} from "../modals";
import NoteSummary from "../modals/write-summary";
import ScrollToTop from "../scroll-to-top";
import DashedContainer from "../ui/dashed-container";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isZenMode } = useAppSettingsStore();

  return (
    <>
      {/* Layout */}
      <div className="mx-auto flex w-full max-w-5xl gap-4">
        <Sidebar />

        <main className="flex size-full min-h-screen max-w-[620px] flex-col border-x p-1">
          <DashedContainer className="relative flex min-h-screen flex-1 flex-col px-2 pb-6">
            {isZenMode ? <FloatingMainMenu /> : <HeaderCard />}
            {children}
            <Footer />
          </DashedContainer>
        </main>

        <aside className="hidden shrink-0 sm:w-[200px] lg:block">
          <RightBar />
        </aside>
      </div>

      {/* Init */}
      <AutoSyncInitializer />
      <AppInitializer />

      {/* Dialog, Drawer, Sheet , ... */}
      <Settings />
      <WritesHistory />
      <MusicPlayer />
      <HelpDialog />
      <Statistics />
      <NoteSummary />

      {/* Others */}
      <div className="fixed right-4 bottom-12 flex items-center justify-center gap-4 md:bottom-4">
        <ScrollToTop />
      </div>
    </>
  );
};

export default AppLayout;
