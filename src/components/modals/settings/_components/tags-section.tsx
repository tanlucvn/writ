"use client";

import TagChip from "@/components/tag-chip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTagActions } from "@/hooks/use-tag-actions";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";

const TagsSection = () => {
  const { tags, onAddTag, onDeleteTag } = useTagActions();
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTag = async () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;

    setLoading(true);
    const newId = await onAddTag(trimmed);
    if (newId) setNewTag("");
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await onDeleteTag(id);
    setLoading(false);
  };

  return (
    <section className="flex flex-col gap-6 p-1">
      <div className="flex items-center gap-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="New tag"
          className="h-8 flex-1 text-sm"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTag();
          }}
        />

        <Button
          size="icon"
          variant="outline"
          onClick={handleAddTag}
          disabled={loading || !newTag.trim()}
          className="size-8"
        >
          {loading ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
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
              label={tag.name}
              onClick={() => handleDelete(tag.id)}
              deletable
            />
          ))
        )}
      </div>

      <hr />

      <div className="rounded-md border px-3 py-2 text-muted-foreground text-xs">
        Tips: Click tag to{" "}
        <span className="font-medium text-foreground">delete</span>.
      </div>
    </section>
  );
};

export default TagsSection;
