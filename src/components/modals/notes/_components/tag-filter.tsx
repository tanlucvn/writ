"use client";

import { IconRenderer } from "@/components/icon-renderer";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTagStore } from "@/store/use-tags-store";
import { useState } from "react";

interface TagFilterProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const TagFilter = ({ selected, onChange }: TagFilterProps) => {
  const { tags } = useTagStore();
  const [open, setOpen] = useState(false);

  const toggle = (tagId: string) => {
    onChange(
      selected.includes(tagId)
        ? selected.filter((id) => id !== tagId)
        : [...selected, tagId],
    );
  };

  const clearAll = () => onChange([]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="!px-2 w-full justify-start font-normal text-muted-foreground"
        >
          <IconRenderer name="Tags" />
          {selected.length > 0
            ? `${selected.length} tag${selected.length > 1 ? "s" : ""} selected`
            : "Filter by tags"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search tags..." className="h-9" />
          <CommandEmpty>No tags found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="max-h-52">
              {tags.map((tag) => {
                const isSelected = selected.includes(tag.id);
                return (
                  <CommandItem
                    key={tag.id}
                    onSelect={() => toggle(tag.id)}
                    className="flex items-center justify-between"
                  >
                    <span>{tag.name}</span>
                    {isSelected && (
                      <IconRenderer name="Check" className="text-foreground" />
                    )}
                  </CommandItem>
                );
              })}
            </ScrollArea>
          </CommandGroup>

          <div className="flex items-center gap-1 px-3 py-2">
            {selected.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={clearAll}
              >
                Clear
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              className={
                selected.length > 0 ? "flex-1 text-xs" : "w-full text-xs"
              }
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
