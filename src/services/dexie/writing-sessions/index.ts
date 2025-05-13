import type { Write, WritingSessions } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { db } from "../client";

// Create a new writing session
export const createWritingSession = (
  write: Write,
  duration: number,
  startingWordCount: number,
  endingWordCount: number,
): WritingSessions => ({
  id: uuidv4(),
  writeId: write.id,
  duration,
  startingWordCount,
  endingWordCount,
});

// Save a writing session to the database
export const saveWritingSession = async (
  session: WritingSessions,
): Promise<WritingSessions> => {
  const id = await db.writingSessions.put(session); // `put` returns the ID of the saved session
  return { ...session, id }; // Return the session with the ID added from the database
};

// Get all writing sessions for a specific write
export const getWritingSessionsByWriteId = async (
  writeId: string,
): Promise<WritingSessions[]> => {
  return await db.writingSessions.where("contentId").equals(writeId).toArray();
};

// Get a single writing session by ID
export const getWritingSession = async (
  id: string,
): Promise<WritingSessions | undefined> => {
  return await db.writingSessions.get(id);
};

// Delete a writing session by ID
export const deleteWritingSession = async (id: string) => {
  await db.writingSessions.delete(id);
};

// Get all writing sessions
export const getAllWritingSessions = async (): Promise<WritingSessions[]> => {
  return await db.writingSessions.toArray();
};
