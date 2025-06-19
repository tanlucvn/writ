import { dexie, turso } from "@/services";
import { notesTable } from "@/services/turso/schema";
import type { Note } from "@/types";
import { and, eq, gt, lt } from "drizzle-orm";

// Push Local Notes to Turso
export const pushDexieNotesToTurso = async (syncKey: string) => {
  const lastSyncedAt = await dexie.getLastSyncedAt();

  const localNotes = await dexie.db.notes
    .filter((n) => n.updatedAt > lastSyncedAt)
    .toArray();

  for (const note of localNotes) {
    await turso.clientDb
      .insert(notesTable)
      .values({
        ...note,
        isPinned: note.isPinned ? 1 : 0,
        inTrash: note.inTrash ? 1 : 0,
        parentId: note.parentId ?? null,
        tagIds: JSON.stringify(note.tagIds ?? []),
        syncKey,
      })
      .onConflictDoUpdate({
        target: notesTable.id,
        set: {
          title: note.title,
          content: note.content,
          isPinned: note.isPinned ? 1 : 0,
          inTrash: note.inTrash ? 1 : 0,
          parentId: note.parentId ?? null,
          tagIds: JSON.stringify(note.tagIds ?? []),
          updatedAt: note.updatedAt,
          syncKey,
        },
        where: lt(notesTable.updatedAt, note.updatedAt), // last write wins
      });
  }
};

// Pull remote notes from Turso to Dexie
export const pullTursoNotesToDexie = async (syncKey: string) => {
  const lastPulledAt = await dexie.getLastPulledAt();

  const rows = await turso.clientDb
    .select()
    .from(notesTable)
    .where(
      and(
        eq(notesTable.syncKey, syncKey),
        gt(notesTable.updatedAt, lastPulledAt ?? "1970-01-01T00:00:00.000Z"),
      ),
    );

  for (const row of rows) {
    const local = await dexie.db.notes.get(row.id);

    const remoteNote: Note = {
      id: row.id,
      title: row.title,
      content: row.content,
      isPinned: !!row.isPinned,
      inTrash: !!row.inTrash,
      parentId: row.parentId ?? "root",
      tagIds: JSON.parse(row.tagIds ?? "[]"),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };

    if (!local) {
      await dexie.db.notes.add(remoteNote);
    } else if (new Date(row.updatedAt) > new Date(local.updatedAt)) {
      await dexie.db.notes.put({ ...local, ...remoteNote });
    }
  }
};
