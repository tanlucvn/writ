import { v4 as uuidv4 } from "uuid";
import { db } from "./index";

export interface Tag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create a new tag object
export const createTag = (name: string): Tag => ({
  id: uuidv4(),
  name,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Save or update a tag in the database
export const saveTag = async (tag: Tag): Promise<Tag> => {
  const updated = { ...tag, updatedAt: new Date() };
  await db.tags.put(updated);
  return updated;
};

// Delete a tag by ID
export const deleteTag = async (id: string) => {
  await db.tags.delete(id);
};

// Get a single tag by ID
export const getTag = async (id: string): Promise<Tag | undefined> => {
  return await db.tags.get(id);
};

// Get all tags sorted by updatedAt (most recent first)
export const getAllTags = async (): Promise<Tag[]> => {
  return await db.tags.orderBy("updatedAt").reverse().toArray();
};
