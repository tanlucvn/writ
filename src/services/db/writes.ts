import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { db } from "./index";

export interface Write {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  fontFamily?: string;
  fontSize?: number;
  tagIds?: string[];
  synced: number;
}

// Create a new write object
export const createWrite = (fontFamily = "inter", fontSize = 16): Write => ({
  id: uuidv4(),
  title: "Untitled",
  content: "",
  createdAt: DateTime.utc().toISO(),
  updatedAt: DateTime.utc().toISO(),
  fontFamily,
  fontSize,
  tagIds: [],
  synced: 0,
});

// Save or update a write in the database
export const saveWrite = async (write: Write): Promise<Write> => {
  const updated = { ...write, updatedAt: DateTime.utc().toISO(), synced: 0 };
  await db.writes.put(updated);
  return updated;
};

// Delete a write by ID
export const deleteWrite = async (id: string) => {
  await db.writes.delete(id);
};

// Get a single write by ID
export const getWrite = async (id: string): Promise<Write | undefined> => {
  return await db.writes.get(id);
};

// Get all writes
export const getAllWrites = async (): Promise<Write[]> => {
  return await db.writes.toArray();
};

// Get the most recently updated write
export const getLatestWrite = async (): Promise<Write | undefined> => {
  return (await getAllWrites())[0];
};
