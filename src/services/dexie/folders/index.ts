import type { Folders } from "@/types";
import { db } from "../client";

// Get all folders
export const getAllFolders = async (): Promise<Folders[]> => {
  const folders = await db.folders.toArray();
  return folders.sort((a, b) => a.order - b.order);
};

// Create a new folder
export const createFolder = async (folder: Folders): Promise<string> => {
  return await db.folders.add(folder);
};

// Update a folder by full object
export const updateFolder = async (folder: Folders): Promise<number> => {
  return await db.folders.update(folder.id, folder);
};

// Delete a folder
export const deleteFolder = async (id: string): Promise<void> => {
  await db.folders.delete(id);
};

// Update folder order
export const updateFolderOrder = async (
  id: string,
  order: number,
): Promise<number> => {
  return await db.folders.update(id, { order });
};

// Update folder title
export const updateFolderTitle = async (
  id: string,
  title: string,
): Promise<number> => {
  return await db.folders.update(id, { title });
};

// Move writes to a different folder
export const moveWritesToFolder = async (
  writeIds: string[],
  targetFolderId: string,
): Promise<void> => {
  await db.transaction("rw", db.writes, async () => {
    for (const writeId of writeIds) {
      await db.writes.update(writeId, { folderId: targetFolderId });
    }
  });
};

// Delete a folder and move its writes to another folder
export const deleteFolderAndMoveWrites = async (
  folderId: string,
  targetFolderId: string,
): Promise<void> => {
  await db.transaction("rw", db.writes, db.folders, async () => {
    await db.writes
      .where("folderId")
      .equals(folderId)
      .modify({ folderId: targetFolderId });

    await db.folders.delete(folderId);
  });
};
