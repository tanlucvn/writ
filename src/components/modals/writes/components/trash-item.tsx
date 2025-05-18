"use client";

import { Button } from "@/components/ui/button";
import DashedContainer from "@/components/ui/dashed-container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getWriteColorClasses } from "@/lib/utils";
import type { Write } from "@/types";
import {
  ArchiveIcon,
  EllipsisIcon,
  PinIcon,
  RotateCcwIcon,
  XIcon,
} from "lucide-react";
import { DateTime } from "luxon";

type TrashItemProps = {
  write: Write;
  onRestore: () => Promise<void>;
  onDelete: () => Promise<void>;
};

const TrashItem = ({ write, onRestore, onDelete }: TrashItemProps) => {
  return (
    <div
      className={cn(
        "group relative flex h-36 w-full flex-col justify-between rounded-lg border px-4 py-3",
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
            <DropdownMenuItem className="text-xs" onClick={onRestore}>
              <RotateCcwIcon className="!size-3.5" />
              Restore
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive text-xs hover:text-destructive"
              onClick={onDelete}
            >
              <XIcon className="!size-3.5" />
              Delete
            </DropdownMenuItem>
          </DashedContainer>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TrashItem;
