import { getAllNotes } from "./notes";

type Write = {
  createdAt: string;
  synced: number;
  tagIds?: string[];
};

type FilterFn = (write: Write) => boolean;

/**
 * Returns an array of the last `n` dates formatted as yyyy-mm-dd
 */
const getLastNDates = (days: number): string[] => {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

/**
 * Returns a map of date to write count per day based on the provided filter
 */
const getWriteCountPerDay = async (
  filterFn: FilterFn,
  days = 30,
): Promise<Map<string, number>> => {
  const writes = await getAllNotes();
  const dates = getLastNDates(days);
  const counts = new Map<string, number>();

  for (const date of dates) {
    const count = writes.filter(
      (write) => write.createdAt.split("T")[0] === date && filterFn(write),
    ).length;
    counts.set(date, count);
  }

  return counts;
};

// Total number of writes
export const getTotalWriteCount = async (): Promise<number> =>
  (await getAllNotes()).length;

// Total number of synced writes
export const getSyncedWriteCount = async (): Promise<number> =>
  (await getAllNotes()).filter((w) => w.synced === 1).length;

// Total number of unsynced writes
export const getUnsyncedWriteCount = async (): Promise<number> =>
  (await getAllNotes()).filter((w) => w.synced === 0).length;

// Daily write count (last 30 days)
export const getWriteCountByDay = (): Promise<Map<string, number>> =>
  getWriteCountPerDay(() => true);

// Daily synced write count (last 30 days)
export const getSyncedWriteCountByDay = (): Promise<Map<string, number>> =>
  getWriteCountPerDay((w) => w.synced === 1);

// Daily unsynced write count (last 30 days)
export const getUnsyncedWriteCountByDay = (): Promise<Map<string, number>> =>
  getWriteCountPerDay((w) => w.synced === 0);

// Most frequently used tags
export const getMostFrequentTags = async (): Promise<Map<string, number>> => {
  const writes = await getAllNotes();
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
