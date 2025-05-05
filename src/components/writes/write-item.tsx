"use client";

import TagChip from "@/components/tag-chip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import {
  CheckIcon,
  MoreVertical,
  PenIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import DashedContainer from "../ui/dashed-container";

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

  useEffect(() => {
    if (isRenaming && currentContent?.id !== write.id) {
      setIsRenaming(false);
    }
  }, [currentContent?.id, write.id, isRenaming]);

  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-lg border bg-card p-3 pr-12 outline-double outline-2 outline-transparent outline-offset-2 transition-all duration-300 hover:bg-secondary",
        currentContent?.id === write.id && "bg-secondary outline-border",
        className,
      )}
      onClick={() => setCurrentContent(write)}
    >
      <div className="flex flex-col gap-2">
        {/* Title / Rename */}
        {isRenaming ? (
          <div className="relative flex items-center">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="h-8 flex-1 rounded-r-none border-r-0 pr-10 text-sm"
              autoFocus
            />
            <Button
              size="icon"
              variant="outline"
              className="absolute right-0 size-8 rounded-l-none border-l-0 bg-muted"
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
            <span className="truncate font-medium text-base">
              {write.title || "Untitled"}
            </span>
            <p className="text-muted-foreground text-xs">
              Last updated: {new Date(write.updatedAt).toLocaleString()}
            </p>
          </>
        )}

        {/* Tags + Popover */}
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => e.stopPropagation()}
                className="h-6 gap-1 px-1 py-0.5 text-muted-foreground text-xs hover:bg-transparent hover:text-foreground"
              >
                <PlusIcon className="mr-1 size-3" />
                Tags
              </Button>
            </PopoverTrigger>
            <PopoverContent
              onClick={(e) => e.stopPropagation()}
              className="w-48 rounded-2xl p-1"
            >
              <DashedContainer className="p-1">
                <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
                  Add tags
                </p>

                {allTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center rounded-md px-2 py-1 hover:bg-accent"
                    onClick={() => toggleTag(tag.id)}
                  >
                    <TagChip
                      tag={tag}
                      className="cursor-default select-none gap-2 border-none"
                    />
                    {tagsId.includes(tag.id) && (
                      <CheckIcon className="ml-auto size-4" />
                    )}
                  </div>
                ))}
              </DashedContainer>
            </PopoverContent>
          </Popover>

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
        <DropdownMenuContent
          className="!mr-4 p-1"
          onClick={(e) => e.stopPropagation()}
        >
          <DashedContainer className="p-1">
            <DropdownMenuItem
              className="text-xs"
              onClick={() => setIsRenaming(true)}
            >
              <PenIcon className="!size-3.5" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:!text-destructive text-destructive text-xs"
              onClick={handleDeleteWrite}
            >
              <TrashIcon className="!size-3.5" />
              Delete
            </DropdownMenuItem>
          </DashedContainer>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default WriteItem;
