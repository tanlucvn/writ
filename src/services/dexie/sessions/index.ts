import { dexie } from "@/services";
import type { Note, Session } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Create a new session
export const createSession = (
  note: Note,
  duration: number,
  startingWordCount: number,
  endingWordCount: number,
): Session => ({
  id: uuidv4(),
  noteId: note.id,
  duration,
  startingWordCount,
  endingWordCount,
});

// Save a session to the database
export const saveSession = async (session: Session): Promise<Session> => {
  await dexie.db.sessions.put(session);
  return session;
};

// Get a session by ID
export const getSessionById = async (
  id: string,
): Promise<Session | undefined> => {
  return dexie.db.sessions.get(id);
};

// Get all sessions
export const getAllSessions = async (): Promise<Session[]> => {
  return dexie.db.sessions.toArray();
};

// Get all sessions linked to a specific note
export const getSessionsByNoteId = async (
  noteId: string,
): Promise<Session[]> => {
  return dexie.db.sessions.where("noteId").equals(noteId).toArray();
};

// Delete a session by ID
export const deleteSession = async (id: string): Promise<void> => {
  await dexie.db.sessions.delete(id);
};
