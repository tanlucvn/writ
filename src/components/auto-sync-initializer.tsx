"use client";

import { setupAutoSync } from "@/lib/setup-auto-sync";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";
import { toast } from "sonner";

export function AutoSyncInitializer() {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    setupAutoSync({
      onSuccess: () => toast.success("Auto sync successful!"),
      onError: () => toast.error("Auto sync failed."),
    });
  }, [user]);

  return null;
}
