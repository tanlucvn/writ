"use client";

import { cn } from "@/lib/utils";
import type { Tag } from "@/types";
import { TagIcon, XIcon } from "lucide-react";

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
        "relative flex cursor-pointer select-none items-center gap-1 rounded-full border border-border px-2 py-0.5 text-foreground text-xs",
        deletable && "group hover:border-destructive",
        className,
      )}
    >
      <TagIcon
        fill={tag.color ? tag.color : "#ffffff"}
        className="size-3 stroke-foreground group-hover:hidden"
      />

      {deletable && (
        <XIcon className="hidden size-3 text-destructive group-hover:block" />
      )}

      {tag.name}
    </div>
  );
}
