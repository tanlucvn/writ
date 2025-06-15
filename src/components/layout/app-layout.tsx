"use client";

import {
  AppInitializer,
  AutoSyncInitializer,
} from "@/components/layout/initialize";
import { ModalInitializer } from "./initialize/modal-initializer";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen max-h-screen w-full items-center justify-center overflow-hidden p-0">
      {children}

      <AutoSyncInitializer />
      <AppInitializer />
      <ModalInitializer />
    </main>
  );
};

export default AppLayout;
