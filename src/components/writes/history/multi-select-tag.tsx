import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Tag } from "@/services/db/tags";
import { TagIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export function MultiSelectTag({
  availableTags,
  selectedTags,
  setSelectedTags,
}: {
  availableTags: Tag[];
  selectedTags: Set<string>;
  setSelectedTags: Dispatch<SetStateAction<Set<string>>>;
}) {
  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tagId)) {
        newSet.delete(tagId);
      } else {
        newSet.add(tagId);
      }
      return newSet;
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-xs"
        >
          <TagIcon className="size-4" />
          Filter Tags
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-48 p-1">
        <div className="h-full w-full rounded-md border-2 border-border border-dashed p-1">
          <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
            Select tags to filter
          </p>

          <div className="space-y-1">
            {availableTags.map((tag) => (
              <div
                key={tag.id}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/30"
                onClick={() => toggleTag(tag.id)}
              >
                <Checkbox
                  checked={selectedTags.has(tag.id)}
                  onCheckedChange={() => toggleTag(tag.id)}
                />
                <span className="text-sm">{tag.name}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
