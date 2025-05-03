"use client";

import TagChip from "@/components/tag-chip";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { dexie } from "@/services";
import { useAppStore } from "@/store/app-store";
import type { Write } from "@/types";
import { CheckIcon, MoreVertical, PlusIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";

type WriteItemProps = {
  write: Write;
  className?: string;
};

const WriteItem = ({ write, className }: WriteItemProps) => {
  const {
    currentContent,
    setCurrentContent,
    writes,
    setWrites,
    refreshWrites,
    tags: allTags,
  } = useAppStore();

  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(write.title || "");
  const [tagsId, setTagsId] = useState(write.tagIds || []);

  const selectedTags = useMemo(() => {
    return allTags.filter((tag) => tagsId.includes(tag.id));
  }, [allTags, tagsId]);

  const handleDeleteWrite = async () => {
    await dexie.deleteWrite(write.id);
    const updated = writes.filter((item) => item.id !== write.id);
    setWrites(updated);
    refreshWrites();
  };

  const handleRenameWrite = async () => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    if (trimmed !== write.title) {
      const updatedNote: Write = {
        ...write,
        title: trimmed,
        updatedAt: DateTime.utc().toISO(),
      };
      await dexie.saveWrite(updatedNote);
      const allWrites = await dexie.getAllWrites();
      setWrites(allWrites);
      setIsRenaming(false);
      refreshWrites();
    }
  };

  const toggleTag = async (tagId: string) => {
    const updatedTagsId = tagsId.includes(tagId)
      ? tagsId.filter((id) => id !== tagId)
      : [...tagsId, tagId];

    setTagsId(updatedTagsId);

    const updatedWrite: Write = {
      ...write,
      tagIds: updatedTagsId,
      updatedAt: DateTime.utc().toISO(),
    };
    await dexie.saveWrite(updatedWrite);
    refreshWrites();
  };

  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-lg border bg-card p-3 pr-9 outline-double outline-2 outline-border outline-offset-2 transition hover:bg-muted/50 hover:outline-dashed",
        currentContent?.id === write.id && "bg-muted/50",
        className,
      )}
      onClick={() => setCurrentContent(write)}
    >
      <div className="flex flex-col gap-2">
        {/* Title */}
        {isRenaming ? (
          <div className="flex items-center gap-0">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="h-8 flex-1 rounded-tr-none rounded-br-none border-r-0 text-sm focus-visible:ring-0"
              autoFocus
            />
            <Button
              size="icon"
              variant="outline"
              className="size-8 rounded-tl-none rounded-bl-none border-l-0 bg-muted"
              onClick={(e) => {
                e.stopPropagation();
                handleRenameWrite();
              }}
            >
              <CheckIcon className="size-4" />
            </Button>
          </div>
        ) : (
          <>
            <h3 className="font-medium text-base">
              {write.title || "Untitled"}
            </h3>
            <p className="text-muted-foreground text-xs">
              Last updated: {new Date(write.updatedAt).toLocaleString()}
            </p>
          </>
        )}

        <div className="flex items-center gap-2">
          {/* Tag selector popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => e.stopPropagation()}
                className="h-6 w-fit gap-1 px-0 py-0.5 text-muted-foreground text-xs hover:bg-transparent hover:text-foreground"
              >
                <PlusIcon className="size-3" />
                Tags
              </Button>
            </PopoverTrigger>
            <PopoverContent
              onClick={(e) => e.stopPropagation()}
              className="w-48 p-1"
            >
              <div className="h-full w-full rounded-md border-2 border-border border-dashed p-1">
                <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
                  Select tags
                </p>

                {allTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/30"
                    onClick={() => toggleTag(tag.id)}
                  >
                    <Checkbox checked={tagsId.includes(tag.id)} />
                    <span className="text-sm">{tag.name}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Tags */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {selectedTags.map((tag) => (
                <TagChip key={tag.id} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* More actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 size-8 rounded-md text-foreground hover:bg-foreground/5"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={() => setIsRenaming(true)}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteWrite}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default WriteItem;
