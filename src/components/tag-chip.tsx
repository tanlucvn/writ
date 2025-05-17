"use client";

import { cn } from "@/lib/utils";
import { TagIcon, XIcon } from "lucide-react";

type TagChipProps = {
  label: string;
  color?: string;
  className?: string;
  deletable?: boolean;
  onClick?: () => void;
};

export default function TagChip({
  label,
  color,
  className,
  deletable = false,
  onClick,
}: TagChipProps) {
  return (
    <div
      onClick={() => onClick?.()}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-1 rounded-full border border-border px-2 py-0.5 text-foreground text-xs",
        deletable && "group hover:border-destructive",
        className,
      )}
    >
      <TagIcon
        strokeWidth={3}
        className={cn(
          "size-3 fill-transparent group-hover:hidden",
          color ? `stroke-${color}` : "stroke-current",
        )}
      />

      {deletable && (
        <XIcon className="hidden size-3 text-destructive group-hover:block" />
      )}

      {label}
    </div>
  );
}
