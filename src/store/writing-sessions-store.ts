import { countWords } from "@/lib/word-count";
import { dexie } from "@/services";
import type { WritingSessions } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAppStore } from "./app-store";
import { useWritesStore } from "./writes-store";

let intervalId: ReturnType<typeof setInterval> | null = null;

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
      setRemainingTime: (time) => set({ remainingTime: time }),

      startSession: (duration) => {
        const { currentWrite } = useWritesStore.getState();
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

        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(() => {
          get().tick();
        }, 1000);
      },

      pauseSession: () => {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        set({ isRunning: false });
      },

      resumeSession: () => {
        if (!get().currentSession || get().remainingTime <= 0) return;

        set({ isRunning: true });
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(() => {
          get().tick();
        }, 1000);
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

        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }

        set({
          currentSession: updatedSession,
          isRunning: false,
          remainingTime: 0,
        });
      },

      tick: () => {
        if (!get().isRunning) return;
        const currentTime = get().remainingTime;
        if (currentTime <= 1) {
          get().stopSession(); // stop when time reaches 0
        } else {
          set({ remainingTime: currentTime - 1 });
        }
      },

      initSessionsDB: async () => {
        try {
          const allSessions = await dexie.getAllWritingSessions();
          set({ sessions: allSessions });
        } catch (error) {
          console.error("Error initializing sessions:", error);
        }
      },
    }),
    { name: "writing-session-store" },
  ),
);
