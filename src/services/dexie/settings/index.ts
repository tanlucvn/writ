import { db } from "@/services/dexie/";

const LAST_SYNC_KEY = "lastSyncedAt";
const LAST_PULL_KEY = "lastPulledAt";
const ACTIVE_SESSION_KEY = "activeSessionId";

const getSetting = async (key: string): Promise<string | null> => {
  const setting = await db.settings.get(key);
  return setting?.value ?? null;
};

const setSetting = async (key: string, value: string) => {
  await db.settings.put({ key, value });
};

export const getLastPulledAt = async (): Promise<string> => {
  return (await getSetting(LAST_PULL_KEY)) ?? "1970-01-01T00:00:00.000Z";
};

export const setLastPulledAt = async (value: string) => {
  await setSetting(LAST_PULL_KEY, value);
};

export const getLastSyncedAt = async (): Promise<string> => {
  return (await getSetting(LAST_SYNC_KEY)) ?? "1970-01-01T00:00:00.000Z";
};

export const setLastSyncedAt = async (value: string) => {
  await setSetting(LAST_SYNC_KEY, value);
};

export const getActiveSessionId = async (): Promise<string | null> => {
  return (await db.settings.get(ACTIVE_SESSION_KEY))?.value ?? null;
};

export const setActiveSessionId = async (sessionId: string) => {
  await db.settings.put({ key: ACTIVE_SESSION_KEY, value: sessionId });
};

export const clearActiveSessionId = async () => {
  await db.settings.delete(ACTIVE_SESSION_KEY);
};
