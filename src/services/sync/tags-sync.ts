import { dexie, turso } from "@/services";
import { tagsTable } from "@/services/turso/schema";
import type { Tag } from "@/types";
import { and, eq, gt, lt } from "drizzle-orm";

// Push local tags to Turso
export const pushDexieTagsToTurso = async (syncKey: string) => {
  const lastSyncedAt = await dexie.getLastSyncedAt();

  console.log(lastSyncedAt);

  const localTags = await dexie.db.tags
    .filter((t) => t.updatedAt > lastSyncedAt)
    .toArray();

  console.log("Tags to sync:", localTags);

  for (const tag of localTags) {
    await turso.clientDb
      .insert(tagsTable)
      .values({
        ...tag,
        syncKey,
      })
      .onConflictDoUpdate({
        target: tagsTable.id,
        set: {
          name: tag.name,
          updatedAt: tag.updatedAt,
          syncKey,
        },
        where: lt(tagsTable.updatedAt, tag.updatedAt),
      });
  }
};

// Pull remote tags from Turso to Dexie
export const pullTursoTagsToDexie = async (syncKey: string) => {
  const lastPulledAt = await dexie.getLastPulledAt();

  const rows = await turso.clientDb
    .select()
    .from(tagsTable)
    .where(
      and(
        eq(tagsTable.syncKey, syncKey),
        gt(tagsTable.updatedAt, lastPulledAt ?? "1970-01-01T00:00:00.000Z"),
      ),
    );

  for (const row of rows) {
    const local = await dexie.db.tags.get(row.id);

    const remoteTag: Tag = {
      id: row.id,
      name: row.name,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };

    if (!local) {
      await dexie.db.tags.add(remoteTag);
    } else if (new Date(row.updatedAt) > new Date(local.updatedAt)) {
      await dexie.db.tags.put({ ...local, ...remoteTag });
    }
  }
};

// Full sync
export const syncTagsWithTurso = async (syncKey: string) => {
  await pushDexieTagsToTurso(syncKey);
  await pullTursoTagsToDexie(syncKey);
};
