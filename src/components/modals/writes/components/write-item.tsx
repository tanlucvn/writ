"use client";

import { Button } from "@/components/ui/button";
import DashedContainer from "@/components/ui/dashed-container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getWriteColorClasses } from "@/lib/utils";
import { dexie } from "@/services";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useDialogStore } from "@/store/dialog-store";
import { useWritesStore } from "@/store/writes-store";
import type { Write } from "@/types";
import {
  ArchiveIcon,
  ArchiveXIcon,
  EllipsisIcon,
  PenIcon,
  PinIcon,
  TrashIcon,
} from "lucide-react";
import { DateTime } from "luxon";

type WriteItemProps = {
  write: Write;
};

export default function WriteItem({ write }: WriteItemProps) {
  const {
    currentWrite,
    setCurrentWrite,
    setWrites,
    writes,
    refreshWrites,
    setCurrentEditWrite,
  } = useWritesStore();
  const { setLastOpenedWriteId } = useAppSettingsStore();
  const { setIsWritesEditingDialogOpen } = useDialogStore();

  const isSelected = currentWrite?.id === write.id;

  const handleSelect = () => {
    setCurrentWrite(write);
    setLastOpenedWriteId(write.id);
  };

  const updateWrite = async (changes: Partial<Write>) => {
    const updated: Write = {
      ...write,
      ...changes,
      updatedAt: DateTime.utc().toISO(),
    };
    await dexie.saveWrite(updated);
    refreshWrites();
  };

  const handleRemove = async () => {
    await dexie.removeWrite(write.id);
    setWrites(writes.filter((w) => w.id !== write.id));
    refreshWrites();
  };

  return (
    <div
      onClick={handleSelect}
      className={cn(
        "group relative flex h-36 w-full flex-col justify-between rounded-lg border px-4 py-3",
        isSelected && "outline-double outline-2 outline-offset-2",
        write.color
          ? getWriteColorClasses(write.color)
          : getWriteColorClasses("default"),
      )}
    >
      {/* Title & Status */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex w-full flex-col gap-1 overflow-hidden">
          <h3 className="overflow-hidden truncate text-ellipsis whitespace-nowrap font-semibold text-sm">
            {write.title || "Untitled"}
          </h3>
          <p className="text-xs opacity-90">
            {DateTime.fromISO(write.updatedAt).toRelative()}
          </p>
        </div>
        <div className="absolute bottom-2 left-2 flex flex-col items-end gap-1">
          {write.pinned && <PinIcon className="size-4" />}
          {write.archived && <ArchiveIcon className="size-4" />}
        </div>
      </div>

      {/* Actions */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "absolute right-2 bottom-2 size-6 hover:bg-transparent hover:text-current focus-visible:ring-0",
            )}
          >
            <EllipsisIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <DashedContainer className="p-1">
            <DropdownMenuItem
              className="text-xs"
              onClick={() => {
                setCurrentEditWrite(write);
                setIsWritesEditingDialogOpen(true);
              }}
            >
              <PenIcon className="!size-3.5" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs"
              onClick={() => updateWrite({ pinned: !write.pinned })}
            >
              <PinIcon className="!size-3.5" />
              {write.pinned ? "Unpin" : "Pin"}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs"
              onClick={() => updateWrite({ archived: !write.archived })}
            >
              {write.archived ? (
                <>
                  <ArchiveXIcon className="!size-3.5" />
                  Unarchive
                </>
              ) : (
                <>
                  <ArchiveIcon className="!size-3.5" />
                  Archive
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive text-xs"
              onClick={handleRemove}
            >
              <TrashIcon className="!size-3.5" />
              Remove to trash
            </DropdownMenuItem>
          </DashedContainer>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
