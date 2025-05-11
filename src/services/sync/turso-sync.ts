import { dexie, turso } from "@/services";
import { writes as writesTable } from "@/services/turso/schema";
import { eq } from "drizzle-orm";

export const pushDexieToTurso = async (syncKey: string) => {
  const unsynced = await dexie.db.writes.where("synced").equals(0).toArray();

  for (const write of unsynced) {
    await turso.clientDb
      .insert(writesTable)
      .values({
        id: write.id,
        title: write.title,
        content: write.content,
        createdAt: write.createdAt,
        updatedAt: write.updatedAt,
        tagIds: JSON.stringify(write.tagIds ?? []),
        syncKey,
      })
      .onConflictDoUpdate({
        target: writesTable.id,
        set: {
          title: write.title,
          content: write.content,
          tagIds: JSON.stringify(write.tagIds ?? []),
          createdAt: write.createdAt,
          updatedAt: write.updatedAt,
          syncKey,
        },
      });

    await dexie.db.writes.update(write.id, { synced: 1 });
  }
};

export const pullTursoToDexie = async (syncKey: string) => {
  const rows = await turso.clientDb
    .select()
    .from(writesTable)
    .where(eq(writesTable.syncKey, syncKey));

  for (const row of rows) {
    const local = await dexie.db.writes.get(row.id);
    if (!local) {
      await dexie.db.writes.add({
        id: row.id,
        title: row.title,
        content: row.content,
        tagIds: JSON.parse(row.tagIds ?? "[]"),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        synced: 1,
      });
    }
  }
};

export const syncWithTurso = async (syncKey: string) => {
  await pushDexieToTurso(syncKey);
  await pullTursoToDexie(syncKey);
};
