import { dexie } from "@/services";

import { pullTursoNotesToDexie, pushDexieNotesToTurso } from "./notes-sync";
import { pullTursoTagsToDexie, pushDexieTagsToTurso } from "./tags-sync";

export const syncWithTursor = async (syncKey: string) => {
  await pushDexieNotesToTurso(syncKey);
  await pushDexieTagsToTurso(syncKey);

  await pullTursoNotesToDexie(syncKey);
  await pullTursoTagsToDexie(syncKey);

  await dexie.setLastSyncedAt(new Date().toISOString());
  await dexie.setLastPulledAt(new Date().toISOString());
};
