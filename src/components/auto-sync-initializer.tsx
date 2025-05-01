"use client";

import { setupAutoSync } from "@/lib/setup-auto-sync";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function AutoSyncInitializer() {
  const { user } = useAuthStore();
  const { isAutoSync } = useAppSettingsStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!user) return;
    if (!isAutoSync) return;
    if (hasInitialized.current) return;

    hasInitialized.current = true;
    const cleanup = setupAutoSync({
      onSuccess: () => toast.success("Auto sync successful!"),
      onError: () => toast.error("Auto sync failed."),
    });

    return () => {
      cleanup();
      hasInitialized.current = false;
    };
  }, [user, isAutoSync]);

  return null;
}
