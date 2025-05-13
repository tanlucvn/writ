import { countWords } from "@/lib/word-count";
import { dexie } from "@/services";
import type { WritingSessions } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAppStore } from "./app-store";

interface WritingSessionsState {
  sessions: WritingSessions[];
  setSessions: (sessions: WritingSessions[]) => void;
  refreshSessions: () => Promise<void>;

  currentSession: WritingSessions | null;

  isRunning: boolean;

  remainingTime: number;
  setRemainingTime: (time: number) => void;

  startSession: (duration: number) => void;
  pauseSession: () => void;
  stopSession: () => void;
  resumeSession: () => void;

  tick: () => void;

  initSessionsDB: () => Promise<void>;
}

export const useWritingSessionsStore = create<WritingSessionsState>()(
  persist(
    (set, get) => ({
      sessions: [],
      setSessions: (sessions) => set({ sessions }),
      refreshSessions: async () => {
        const sessions = await dexie.getAllWritingSessions();
        set({ sessions });
      },

      currentSession: null,

      isRunning: false,

      remainingTime: 0,
      setRemainingTime: (time: number) => {
        set({ remainingTime: time });
      },

      startSession: (duration) => {
        const { currentWrite } = useAppStore.getState();
        if (!currentWrite) return;

        const startingWordCount = countWords(currentWrite.content);

        const newSession: WritingSessions = {
          id: `session-${Date.now()}`,
          writeId: currentWrite.id,
          duration,
          startingWordCount,
          endingWordCount: startingWordCount,
        };

        set({
          currentSession: newSession,
          isRunning: true,
          remainingTime: duration * 60,
        });
      },
      pauseSession: () => {
        const session = get().currentSession;
        if (session) {
          set({ isRunning: false });
        }
      },
      stopSession: async () => {
        const session = get().currentSession;
        if (!session) return;

        const { editor } = useAppStore.getState();
        if (!editor) return;

        const endingText = editor.getText();
        const endingWordCount = countWords(endingText);

        const updatedSession: WritingSessions = {
          ...session,
          endingWordCount,
        };

        await dexie.saveWritingSession(updatedSession);

        set({
          currentSession: updatedSession,
          isRunning: false,
          remainingTime: 0,
        });
      },
      resumeSession: () => {
        const session = get().currentSession;
        if (session && get().remainingTime > 0) {
          set({ isRunning: true });
        }
      },

      tick: () => {
        if (!get().isRunning) return;
        set((state) => ({
          remainingTime: Math.max(0, state.remainingTime - 1),
        }));
      },

      initSessionsDB: async () => {
        try {
          const allSessions = await dexie.getAllWritingSessions();
          set({ sessions: allSessions });
        } catch (error) {
          console.error("Error initializing session history:", error);
        }
      },
    }),
    {
      name: "writing-session-store",
    },
  ),
);
