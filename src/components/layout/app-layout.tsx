"use client";

import {
  AppInitializer,
  AutoSyncInitializer,
} from "@/components/layout/initialize";
import SyncIndicator from "../sync-indicator";
import { ModalInitializer } from "./initialize/modal-initializer";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen max-h-screen w-full items-center justify-center overflow-hidden p-0">
      {children}

      <AutoSyncInitializer />
      <AppInitializer />
      <ModalInitializer />

      <SyncIndicator />
    </main>
  );
};

export default AppLayout;
