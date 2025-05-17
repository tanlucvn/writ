"use client";

import TagChip from "@/components/tag-chip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WRITE_COLORS } from "@/lib/constants";
import { dexie } from "@/services";
import { useWritesStore } from "@/store/writes-store";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import TagColorPicker from "./components/tag-color-picker";

const TagsSection = () => {
  const [newTag, setNewTag] = useState("");
  const [color, setColor] = useState(WRITE_COLORS[0].name);
  const [loading, setLoading] = useState(false);
  const { tags, setTags } = useWritesStore();

  const handleAddTag = async () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    setLoading(true);

    const newTagObj = dexie.createTag(trimmed, color);
    await dexie.saveTag(newTagObj);
    setNewTag("");

    const updated = await dexie.getAllTags();
    setTags(updated);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await dexie.deleteTag(id);
    const updated = await dexie.getAllTags();
    setTags(updated);
  };

  console.log("color", tags);
  return (
    <section className="flex flex-col gap-4 p-1">
      <div className="flex items-center gap-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="New tag"
          className="h-8 flex-1 text-sm"
        />
        <TagColorPicker color={color} onChange={setColor} />
        <Button
          size="icon"
          variant="outline"
          onClick={handleAddTag}
          disabled={loading}
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
              color={tag.color}
              onClick={() => handleDelete(tag.id)}
              deletable
            />
          ))
        )}
      </div>

      <hr />

      <div className="text-muted-foreground text-xs italic">
        Click tag to <span className="font-medium text-foreground">delete</span>
        .
      </div>
    </section>
  );
};

export default TagsSection;
