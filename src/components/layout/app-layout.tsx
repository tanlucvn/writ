"use client";

import { AppInitializer } from "@/components/layout/initialize";
import SyncIndicator from "../sync-indicator";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen max-h-screen w-full items-center justify-center overflow-hidden p-0">
      {children}
      <AppInitializer />
      <SyncIndicator />
    </main>
  );
};

export default AppLayout;
