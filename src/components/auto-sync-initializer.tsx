"use client";

import { setupAutoSync } from "@/lib/setup-auto-sync";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useRef } from "react";

export function AutoSyncInitializer() {
  const { user } = useAuthStore();
  const { setSyncStatus } = useAppStore();
  const { isAutoSync } = useAppSettingsStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!user) return;
    if (!isAutoSync) return;
    if (hasInitialized.current) return;

    hasInitialized.current = true;
    const cleanup = setupAutoSync({
      onStart: () => setSyncStatus("syncing"),
      onSuccess: () => setSyncStatus("success"),
      onError: () => setSyncStatus("error"),
    });

    return () => {
      cleanup();
      hasInitialized.current = false;
    };
  }, [user, isAutoSync, setSyncStatus]);

  return null;
}
