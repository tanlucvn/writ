"use client";

import TagColorPicker from "@/components/settings/tags/color-picker";
import TagChip from "@/components/tag-chip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTagColors } from "@/lib/colors";
import { dexie } from "@/services";
import { useWritesStore } from "@/store/writes-store";
import { DotIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

const TagsSection = () => {
  const tagColors = getTagColors();
  const [newTag, setNewTag] = useState("");
  const [color, setColor] = useState(tagColors[0]);
  const [loading, setLoading] = useState(false);
  const { tags, setTags } = useWritesStore();

  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    setLoading(true);

    const newTagObj = dexie.createTag(newTag.trim(), color);
    await dexie.saveTag(newTagObj);

    setNewTag("");
    const updatedTags = await dexie.getAllTags();
    setTags(updatedTags);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await dexie.deleteTag(id);
    const updatedTags = await dexie.getAllTags();
    setTags(updatedTags);
  };

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
              deletable
              onClick={() => handleDelete(tag.id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default TagsSection;
