"use client";

import { HeaderCard, RightBar, Sidebar } from "@/components/common";
import { AppInitializer, AutoSyncInitializer } from "@/components/init";
import {
  HelpDialog,
  MusicPlayer,
  Settings,
  Statistics,
  WritesHistory,
  WritesSummary,
  WritingSessionsCreator,
  WritingSessionsHistory,
  WritingSessionsSummary,
} from "@/components/modals";
import { useAppSettingsStore } from "@/store/app-settings-store";
import FloatingMainMenu from "../common/floating-main-menu";
import Footer from "../common/footer";
import DashedContainer from "../ui/dashed-container";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isZenMode } = useAppSettingsStore();

  return (
    <>
      {/* Layout */}
      <div className="mx-auto flex h-screen w-full max-w-5xl gap-4 overflow-y-hidden">
        <Sidebar />

        <main className="relative flex size-full max-w-[620px] flex-col border-x p-1">
          <DashedContainer className="scrollable-content min-h-full overflow-y-auto px-2">
            {isZenMode ? <FloatingMainMenu /> : <HeaderCard />}
            {children}
          </DashedContainer>
          <Footer />
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
      <WritesSummary />
      <WritingSessionsCreator />
      <WritingSessionsHistory />
      <WritingSessionsSummary />
    </>
  );
};

export default AppLayout;
