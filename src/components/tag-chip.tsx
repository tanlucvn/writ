"use client";

import { cn } from "@/lib/utils";
import type { Tag } from "@/services/db/tags";
import { CircleIcon, XIcon } from "lucide-react";

type TagChipProps = {
  tag: Tag;
  className?: string;
  deletable?: boolean;
  onClick?: (tag: Tag) => void;
};

export default function TagChip({
  tag,
  className,
  deletable = false,
  onClick,
}: TagChipProps) {
  return (
    <div
      onClick={() => onClick?.(tag)}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-1 rounded-full border border-border px-2 py-0.5 text-foreground text-xs outline-double outline-2 outline-border outline-offset-2",
        deletable && "group hover:border-destructive",
        className,
      )}
    >
      <CircleIcon
        fill={tag.color ? tag.color : "#ffffff"}
        className="size-3 group-hover:hidden"
      />

      {deletable && (
        <XIcon className="hidden size-3 text-destructive group-hover:block" />
      )}

      {tag.name}
    </div>
  );
}
