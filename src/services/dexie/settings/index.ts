import { db } from "../client";

const getSetting = async (key: string): Promise<string | null> => {
  const setting = await db.settings.get(key);
  return setting?.value ?? null;
};

const setSetting = async (key: string, value: string) => {
  await db.settings.put({ key, value });
};

export const getLastPulledAt = async (): Promise<string> => {
  return (await getSetting("lastPulledAt")) ?? "1970-01-01T00:00:00.000Z";
};

export const setLastPulledAt = async (value: string) => {
  await setSetting("lastPulledAt", value);
};

export const getLastSyncedAt = async (): Promise<string> => {
  return (await getSetting("lastSyncedAt")) ?? "1970-01-01T00:00:00.000Z";
};

export const setLastSyncedAt = async (value: string) => {
  await setSetting("lastSyncedAt", value);
};
