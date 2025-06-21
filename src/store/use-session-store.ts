import { safeCall } from "@/lib/utils";
import { dexie } from "@/services";
import type { Session } from "@/types";
import { DateTime } from "luxon";
import { create } from "zustand";

interface SessionState {
  sessions: Session[];
  loading: boolean;

  loadSessions: () => Promise<void>;
  setSessions: (sessions: Session[]) => void;

  addSession: (sessionPartial: Partial<Session>) => Promise<string | undefined>;
  updateSession: (session: Session) => Promise<void>;
  deleteSession: (id: string) => Promise<void>;

  clearAllSessions: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessions: [],
  loading: false,

  loadSessions: () =>
    safeCall(async () => {
      set({ loading: true });
      const sessions = await dexie.getAllSessions();
      set({ sessions, loading: false });
    }),

  setSessions: (sessions) => set({ sessions }),

  addSession: (sessionPartial) =>
    safeCall(async () => {
      if (!sessionPartial.noteId) return;

      const newSession = dexie.createSession({
        ...sessionPartial,
        noteId: sessionPartial.noteId,
      });

      await dexie.saveSession(newSession);
      set((state) => ({
        sessions: [...state.sessions, newSession],
      }));
      return newSession.id;
    }),

  updateSession: (session) =>
    safeCall(async () => {
      const updated = {
        ...session,
        updatedAt: DateTime.utc().toISO(),
      };
      await dexie.saveSession(updated);
      set((state) => ({
        sessions: state.sessions.map((s) =>
          s.id === updated.id ? updated : s,
        ),
      }));
    }),

  deleteSession: (id) =>
    safeCall(async () => {
      await dexie.deleteSession(id);
      set((state) => ({
        sessions: state.sessions.filter((s) => s.id !== id),
      }));
    }),

  clearAllSessions: () =>
    safeCall(async () => {
      await dexie.clearAllSessions();
      set({ sessions: [] });
    }),
}));
