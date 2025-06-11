"use client";

import { setupAutoSync } from "@/hooks/setup-auto-sync";
import { useAppSettingsStore } from "@/store/use-app-settings-store";
import { useAppStore } from "@/store/use-app-store";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

const AutoSyncInitializer = () => {
  const { user } = useUser();
  const { setSyncStatus } = useAppStore();
  const { isAutoSync } = useAppSettingsStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!user?.id) return;
    if (!isAutoSync) return;
    if (hasInitialized.current) return;

    hasInitialized.current = true;

    const cleanup = setupAutoSync({
      userId: user.id,
      onStart: () => setSyncStatus("syncing"),
      onSuccess: () => setSyncStatus("success"),
      onError: () => setSyncStatus("error"),
    });

    return () => {
      cleanup();
      hasInitialized.current = false;
    };
  }, [user?.id, isAutoSync, setSyncStatus]);

  return null;
};

export default AutoSyncInitializer;
