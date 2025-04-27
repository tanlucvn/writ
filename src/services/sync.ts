import { db } from "./db";
import { supabase } from "./supabase";

export const syncDexieToSupabase = async () => {
  const { data: user, error } = await supabase.auth.getUser();
  if (error || !user) {
    console.error("User not authenticated.");
    return;
  }

  try {
    const unsyncedWrites = await db.writes.where("synced").equals(0).toArray();

    await Promise.all(
      unsyncedWrites.map(async (write) => {
        const { error } = await supabase.from("writes").upsert([
          {
            id: write.id,
            title: write.title,
            content: write.content,
            font_family: write.fontFamily,
            font_size: write.fontSize,
            tag_ids: write.tagIds ?? [],
          },
        ]);

        if (error) {
          console.error("Failed to sync write to Supabase:", error.message);
          return;
        }

        const updateError = await db.writes.update(write.id, { synced: 1 });
        if (!updateError) {
          console.error(
            `Failed to update synced status for write with id: ${write.id}`,
          );
        }
      }),
    );
  } catch (error) {
    console.error("Error syncing Dexie to Supabase:", error);
  }
};

export const syncSupabaseToDexie = async () => {
  try {
    const { data, error } = await supabase.from("writes").select("*");

    if (error) {
      console.error("Failed to fetch writes from Supabase:", error.message);
      return;
    }

    await Promise.all(
      data.map(async (write) => {
        const existingWrite = await db.writes.get(write.id);

        if (!existingWrite) {
          const newWrite = {
            id: write.id,
            title: write.title,
            content: write.content,
            createdAt: new Date(write.created_at),
            updatedAt: new Date(write.updated_at),
            fontFamily: write.font_family ?? undefined,
            fontSize: write.font_size ?? undefined,
            tagIds: write.tag_ids ?? [],
            synced: 1,
          };

          await db.writes.add(newWrite);
        }
      }),
    );
  } catch (error) {
    console.error("Error syncing Supabase to Dexie:", error);
  }
};
