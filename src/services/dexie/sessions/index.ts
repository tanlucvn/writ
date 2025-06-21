import { dexie } from "@/services";
import type { Session } from "@/types";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";

export const createSession = (
  overrides: Partial<Session> & { noteId: string },
): Session => {
  const now = DateTime.utc().toISO();

  return {
    id: uuidv4(),
    noteId: overrides.noteId,
    duration: overrides.duration ?? 0,
    startingWordCount: overrides.startingWordCount ?? 0,
    endingWordCount: overrides.endingWordCount ?? 0,
    createdAt: overrides.createdAt ?? now,
    updatedAt: overrides.updatedAt ?? now,

    goalType: overrides.goalType,
    goalValue: overrides.goalValue,
    label: overrides.label,
  };
};

export const saveSession = async (session: Session): Promise<Session> => {
  const updatedSession = {
    ...session,
    updatedAt: DateTime.utc().toISO(),
  };
  await dexie.db.sessions.put(updatedSession);
  return updatedSession;
};

export const getSessionById = (id: string): Promise<Session | undefined> =>
  dexie.db.sessions.get(id);

export const getAllSessions = (): Promise<Session[]> =>
  dexie.db.sessions.toArray();

export const getSessionsByNoteId = (noteId: string): Promise<Session[]> =>
  dexie.db.sessions.where("noteId").equals(noteId).toArray();

export const deleteSession = (id: string): Promise<void> =>
  dexie.db.sessions.delete(id);

export const clearAllSessions = async (): Promise<void> => {
  const all = await getAllSessions();
  await Promise.all(all.map((s) => dexie.db.sessions.delete(s.id)));
};
