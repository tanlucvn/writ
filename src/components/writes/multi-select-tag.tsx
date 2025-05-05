import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Tag } from "@/types";
import { CheckIcon, TagIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import TagChip from "../tag-chip";
import DashedContainer from "../ui/dashed-container";

const MultiSelectTag = ({
  availableTags,
  selectedTags,
  setSelectedTags,
}: {
  availableTags: Tag[];
  selectedTags: Set<string>;
  setSelectedTags: Dispatch<SetStateAction<Set<string>>>;
}) => {
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
        <DashedContainer className="p-1">
          <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
            Select tags to filter
          </p>

          <div className="space-y-1">
            {availableTags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center rounded-md px-2 py-1 hover:bg-accent"
                onClick={() => toggleTag(tag.id)}
              >
                <TagChip
                  tag={tag}
                  className="cursor-default select-none gap-2 border-none"
                />
                {selectedTags.has(tag.id) && (
                  <CheckIcon className="ml-auto size-4" />
                )}
              </div>
            ))}
          </div>
        </DashedContainer>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectTag;
