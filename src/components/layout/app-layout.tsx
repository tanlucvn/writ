"use client";

import { RightBar, Sidebar } from "@/components/common";
import AppNavBar from "@/components/common/app-navbar";
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
import DashedContainer from "@/components/ui/dashed-container";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Layout */}
      <div className="mx-auto flex h-screen w-full max-w-5xl gap-4 overflow-y-hidden">
        <Sidebar />

        <main className="flex size-full max-w-[620px] flex-col border-x p-1">
          <DashedContainer className="flex flex-col px-2">
            <div className="scrollable-content size-full overflow-y-auto ">
              {children}
            </div>
            <AppNavBar />
          </DashedContainer>
        </main>

        <RightBar />
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
