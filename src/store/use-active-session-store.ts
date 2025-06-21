import { create } from "zustand";

export type SessionStatus = "idle" | "running" | "paused";

interface ActiveSessionState {
  sessionId: string | null;
  status: SessionStatus;
  start: (id: string) => void;
  pause: () => void;
  resume: () => void;
  end: () => void;
}

export const useActiveSessionStore = create<ActiveSessionState>((set) => ({
  sessionId: null,
  status: "idle",
  start: (id) => set({ sessionId: id, status: "running" }),
  pause: () => set({ status: "paused" }),
  resume: () => set({ status: "running" }),
  end: () => set({ sessionId: null, status: "idle" }),
}));
