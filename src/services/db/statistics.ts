import { getAllWrites } from "./writes";

// Get writes count for each day within the last 30 days
export const getWritesCountByDay = async (): Promise<Map<string, number>> => {
  const writes = await getAllWrites();
  const writesByDay = new Map<string, number>();

  // Get today and repeat in 30 days
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split("T")[0]; // Format yyyy-mm-dd

    // Filter write each days
    const writesOnThisDay = writes.filter((write) => {
      const writeDate = new Date(write.createdAt).toISOString().split("T")[0];
      return writeDate === formattedDate;
    });

    writesByDay.set(formattedDate, writesOnThisDay.length);
  }

  return writesByDay;
};

// Get the total count of writes
export const getWritesCount = async (): Promise<number> => {
  const writes = await getAllWrites();
  return writes.length;
};

// Get the count of synced writes
export const getSyncedWritesCount = async (): Promise<number> => {
  const writes = await getAllWrites();
  return writes.filter((write) => write.synced === 1).length;
};

// Get the count of unsynced writes
export const getUnsyncedWritesCount = async (): Promise<number> => {
  const writes = await getAllWrites();
  return writes.filter((write) => write.synced === 0).length;
};

// Get the most frequent tags used in the writes
export const getMostFrequentTags = async (): Promise<Map<string, number>> => {
  const writes = await getAllWrites();
  const tagCounts = new Map<string, number>();

  for (const write of writes) {
    if (write.tagIds) {
      for (const tag of write.tagIds) {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      }
    }
  }

  return tagCounts;
};
