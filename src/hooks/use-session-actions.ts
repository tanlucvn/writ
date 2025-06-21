import { useSessionStore } from "@/store/use-session-store";
import type { Session } from "@/types";
import { toast } from "sonner";

export const useSessionActions = () => {
  const { addSession, updateSession, deleteSession, clearAllSessions } =
    useSessionStore();

  const onCreateSession = async (
    sessionData: Partial<Session> & { noteId: string },
  ) => {
    const promise = addSession(sessionData);

    toast.promise(promise, {
      loading: "Saving session...",
      success: "Session saved!",
      error: "Failed to save session.",
    });

    return await promise;
  };

  const onUpdateSession = async (session: Session) => {
    const promise = updateSession(session);
    await toast.promise(promise, {
      loading: "Updating session...",
      success: "Session updated!",
      error: "Failed to update session.",
    });
  };

  const onDeleteSession = async (id: string) => {
    const promise = deleteSession(id);

    toast.promise(promise, {
      loading: "Deleting session...",
      success: "Session deleted!",
      error: "Failed to delete session.",
    });

    await promise;
  };

  const onClearSessions = async () => {
    const promise = clearAllSessions();

    toast.promise(promise, {
      loading: "Clearing all sessions...",
      success: "All sessions cleared!",
      error: "Failed to clear sessions.",
    });

    await promise;
  };

  return {
    onCreateSession,
    onUpdateSession,
    onDeleteSession,
    onClearSessions,
  };
};
