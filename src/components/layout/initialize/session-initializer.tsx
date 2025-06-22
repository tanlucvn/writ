"use client";

import { dexie } from "@/services";
import { useActiveSessionStore } from "@/store/use-active-session-store";
import { useSessionStore } from "@/store/use-session-store";
import { useEffect } from "react";

export const SessionInitializer = () => {
  const { loadSessions } = useSessionStore();
  const { start } = useActiveSessionStore();

  useEffect(() => {
    const restore = async () => {
      await loadSessions();
      const id = await dexie.getActiveSessionId();
      const session = useSessionStore
        .getState()
        .sessions.find((s) => s.id === id);
      if (session) {
        start(session.id);
      }
    };

    restore();
  }, [loadSessions, start]);

  return null;
};
