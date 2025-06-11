import { useTagStore } from "@/store/use-tags-store";
import type { Tag } from "@/types";
import { toast } from "sonner";

export const useTagActions = () => {
  const { addTag, updateTag, renameTag, deleteTag, clearAllTags, tags } =
    useTagStore();

  const onAddTag = async (name: string) => {
    const newName = name.trim();
    if (!newName) return;

    const promise = addTag({ name: newName });
    toast.promise(promise, {
      loading: "Creating tag...",
      success: "Tag created!",
      error: "Failed to create tag.",
    });
    return promise;
  };

  const onRenameTag = async (id: string, newName: string) => {
    const name = newName.trim();
    if (!name) return;

    const promise = renameTag(id, name);
    toast.promise(promise, {
      loading: "Renaming tag...",
      success: "Tag renamed!",
      error: "Failed to rename tag.",
    });
  };

  const onDeleteTag = async (id: string) => {
    const promise = deleteTag(id);
    toast.promise(promise, {
      loading: "Deleting tag...",
      success: "Tag deleted.",
      error: "Failed to delete tag.",
    });
  };

  const onUpdateTag = async (tag: Tag) => {
    const promise = updateTag(tag);
    toast.promise(promise, {
      loading: "Updating tag...",
      success: "Tag updated.",
      error: "Failed to update tag.",
    });
  };

  const onClearAllTags = async () => {
    const promise = clearAllTags();
    toast.promise(promise, {
      loading: "Clearing all tags...",
      success: "All tags cleared.",
      error: "Failed to clear tags.",
    });
  };

  return {
    tags,
    onAddTag,
    onRenameTag,
    onDeleteTag,
    onUpdateTag,
    onClearAllTags,
  };
};
