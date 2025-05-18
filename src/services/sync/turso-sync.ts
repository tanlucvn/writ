import { dexie, turso } from "@/services";
import { writes as writesTable } from "@/services/turso/schema";
import type { Write, WriteColor } from "@/types";
import { and, eq, gt, lt } from "drizzle-orm";

// Push local changes to Turso
export const pushDexieToTurso = async (syncKey: string) => {
  const lastSyncedAt = await dexie.getLastSyncedAt();

  const unsyncedWrites = await dexie.db.writes
    .filter((w) => w.updatedAt > lastSyncedAt)
    .toArray();

  for (const write of unsyncedWrites) {
    await turso.clientDb
      .insert(writesTable)
      .values({
        id: write.id,
        title: write.title,
        content: write.content,
        pinned: write.pinned ? 1 : 0,
        archived: write.archived ? 1 : 0,
        color: write.color ?? "default",
        tagIds: JSON.stringify(write.tagIds ?? []),
        createdAt: write.createdAt,
        updatedAt: write.updatedAt,
        removedAt: write.removedAt ?? null,
        syncKey,
      })
      .onConflictDoUpdate({
        target: writesTable.id,
        set: {
          title: write.title,
          content: write.content,
          pinned: write.pinned ? 1 : 0,
          archived: write.archived ? 1 : 0,
          color: write.color ?? "default",
          tagIds: JSON.stringify(write.tagIds ?? []),
          updatedAt: write.updatedAt,
          removedAt: write.removedAt ?? null,
          syncKey,
        },
        where: lt(writesTable.updatedAt, write.updatedAt), // last write wins
      });

    await dexie.db.writes.update(write.id, {
      syncedAt: new Date().toISOString(),
      synced: 1,
    });
  }

  await dexie.setLastSyncedAt(new Date().toISOString());
};

// Pull remote changes to Dexie
export const pullTursoToDexie = async (syncKey: string) => {
  const lastPulledAt = await dexie.getLastPulledAt();

  const rows = await turso.clientDb
    .select()
    .from(writesTable)
    .where(
      and(
        eq(writesTable.syncKey, syncKey),
        gt(writesTable.updatedAt, lastPulledAt ?? "1970-01-01T00:00:00.000Z"),
      ),
    );

  for (const row of rows) {
    const local = await dexie.db.writes.get(row.id);

    // OPTION: Delete write in local when remove

    /* if (row.removedAt) {
      await dexie.db.writes.delete(row.id);
      continue;
    } */

    const remoteWrite: Write = {
      id: row.id,
      title: row.title,
      content: row.content,
      pinned: row.pinned === 1,
      archived: row.archived === 1,
      color: isWriteColor(row.color) ? row.color : "default",
      tagIds: JSON.parse(row.tagIds ?? "[]"),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      removedAt: row.removedAt ?? null,
      syncedAt: new Date().toISOString(),
      synced: 1,
    };

    if (!local) {
      await dexie.db.writes.add(remoteWrite);
    } else if (new Date(row.updatedAt) > new Date(local.updatedAt)) {
      await dexie.db.writes.put({ ...local, ...remoteWrite });
    }
  }

  await dexie.setLastPulledAt(new Date().toISOString());
};

// Full sync
export const syncWithTurso = async (syncKey: string) => {
  await pushDexieToTurso(syncKey);
  await pullTursoToDexie(syncKey);
};

const isWriteColor = (
  color: string | null | undefined,
): color is WriteColor => {
  return [
    "default",
    "blue",
    "cambridge",
    "melon",
    "mikado",
    "mindaro",
    "slate",
    "sunset",
    "tickle",
    "tiffany",
    "wisteria",
  ].includes(color ?? "");
};
