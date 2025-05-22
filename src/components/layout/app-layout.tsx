"use client";

import { RightBar, Sidebar } from "@/components/common";
import Navbar from "@/components/common/navbar";
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
import FolderDeleteConfirmDialog from "../modals/folders/folder-delete-confirm-dialog";
import FolderEditDialog from "../modals/folders/folder-edit-dialog";
import WriteCreatorDialog from "../modals/writes/write-creator";
import WriteEditDialog from "../modals/writes/writes-edit-dialog";
import WritesTrashView from "../modals/writes/writes-trash-view";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/*----------------- Layout -----------------*/}
      <div className="mx-auto flex size-full max-h-screen max-w-5xl gap-4">
        <Sidebar />

        <main className="flex size-full max-w-[620px] flex-col border-x p-1">
          <DashedContainer className="flex flex-col">
            <div className="scrollable-content size-full overflow-y-auto">
              {children}
            </div>
            <Navbar />
          </DashedContainer>
        </main>

        <RightBar />
      </div>

      {/*----------------- Init  -----------------*/}
      <AutoSyncInitializer />
      <AppInitializer />

      {/*----------------- Dialog, Drawer, Sheet , ...  -----------------*/}
      {/* App */}
      <Settings />
      <WritesHistory />
      <MusicPlayer />
      <HelpDialog />
      <Statistics />

      {/* Writes */}
      <WriteCreatorDialog />
      <WritesSummary />
      <WriteEditDialog />
      <WritesTrashView />

      {/* Writing Sessions */}
      <WritingSessionsCreator />
      <WritingSessionsHistory />
      <WritingSessionsSummary />

      {/* Folder */}
      <FolderEditDialog />
      <FolderDeleteConfirmDialog />
    </>
  );
};

export default AppLayout;
