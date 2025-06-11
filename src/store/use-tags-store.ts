import { safeCall } from "@/lib/utils";
import * as dexie from "@/services/dexie";
import type { Tag } from "@/types";
import { create } from "zustand";

interface TagState {
  tags: Tag[];
  loading: boolean;

  loadTags: () => Promise<void>;
  setTags: (tags: Tag[]) => void;

  addTag: (partial: Partial<Tag>) => Promise<string | undefined>;
  updateTag: (tag: Tag) => Promise<void>;

  renameTag: (id: string, newName: string) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  clearAllTags: () => Promise<void>;
}

export const useTagStore = create<TagState>((set) => ({
  tags: [],
  loading: false,

  loadTags: () =>
    safeCall(async () => {
      set({ loading: true });
      const tags = await dexie.getAllTags();
      set({ tags, loading: false });
    }),

  setTags: (tags) => set({ tags }),

  addTag: (partial) =>
    safeCall(async () => {
      const newTag = dexie.createTag(partial);
      await dexie.saveTag(newTag);
      set((state) => ({
        tags: [...state.tags, newTag],
      }));
      return newTag.id;
    }),

  updateTag: (tag) =>
    safeCall(async () => {
      await dexie.saveTag(tag);
      set((state) => ({
        tags: state.tags.map((t) => (t.id === tag.id ? tag : t)),
      }));
    }),

  renameTag: (id, newName) =>
    safeCall(async () => {
      const tag = await dexie.getTagById(id);
      if (!tag) return;

      const updated = { ...tag, name: newName };
      await dexie.saveTag(updated);

      set((state) => ({
        tags: state.tags.map((t) => (t.id === id ? updated : t)),
      }));
    }),

  deleteTag: (id) =>
    safeCall(async () => {
      await dexie.deleteTag(id);
      set((state) => ({
        tags: state.tags.filter((t) => t.id !== id),
      }));
    }),

  clearAllTags: () =>
    safeCall(async () => {
      await dexie.clearAllTags();
      set({ tags: [] });
    }),
}));
