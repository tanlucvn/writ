"use client";

import { setupAutoSync } from "@/lib/setup-auto-sync";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function AutoSyncInitializer() {
  const { user } = useAuthStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!user || hasInitialized.current) return;

    hasInitialized.current = true;

    setupAutoSync({
      onSuccess: () => toast.success("Auto sync successful!"),
      onError: () => toast.error("Auto sync failed."),
    });
  }, [user]);

  return null;
}
