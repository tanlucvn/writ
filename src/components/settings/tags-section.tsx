"use client";

import TagChip from "@/components/tag-chip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTag, deleteTag, getAllTags, saveTag } from "@/services/db/tags";
import { useAppStore } from "@/store/app-store";
import { DotIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function TagsSection() {
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const { tags, setTags } = useAppStore();

  const handleAddTag = async () => {
    if (!newTag.trim()) return;

    setLoading(true);

    const newTagObj = createTag(newTag.trim());
    await saveTag(newTagObj);

    setNewTag("");

    const updatedTags = await getAllTags();
    setTags(updatedTags);

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await deleteTag(id);

    const updatedTags = await getAllTags();
    setTags(updatedTags);
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="New tag name"
          className="h-8 rounded-md border text-sm"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleAddTag}
          disabled={loading}
          className="h-8"
        >
          {loading ? (
            <DotIcon className="h-4 w-4 animate-ping fill-foreground" />
          ) : (
            <PlusIcon className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 px-1">
        {tags.length === 0 ? (
          <span className="text-muted-foreground text-xs">No tags yet.</span>
        ) : (
          tags.map((tag) => (
            <TagChip
              key={tag.id}
              tag={tag}
              onClick={() => handleDelete(tag.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}
