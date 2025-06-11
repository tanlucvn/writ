"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WriteContentPreview } from "@/components/writes/write-content-preview";
import WritePreviewTooltip from "@/components/writes/write-preview-tooltip";
import { useNoteActions } from "@/hooks/use-note-actions";
import { cn, getRelativeTime } from "@/lib/utils";
import type { Note } from "@/types";
import { PinIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { IconRenderer } from "../icon-renderer";
import { NoteControlsDropdown } from "../notes/note-controls-dropdown";

type WriteItemProps = {
  note: Note;
  className?: string;
};

export default function WriteItem({ note, className }: WriteItemProps) {
  const pathname = usePathname();
  const { onSelect } = useNoteActions();
  const isSelected = pathname === `/${note.id}`;

  return (
    <WritePreviewTooltip content={<WriteContentPreview write={note} />}>
      <Card
        onClick={() => onSelect(note)}
        className={cn("h-36", isSelected && "", className)}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 overflow-hidden">
              <CardTitle className="truncate font-medium text-sm">
                {note.title || "Untitled"}
              </CardTitle>
              <CardDescription className="text-xs">
                {getRelativeTime(note.updatedAt)}
              </CardDescription>
            </div>
            {note.isPinned && <PinIcon className="mt-0.5 size-4 shrink-0" />}
          </div>
        </CardHeader>

        <CardFooter className="justify-end pt-0">
          <NoteControlsDropdown note={note}>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <IconRenderer name="Ellipsis" className="size-4" />
            </Button>
          </NoteControlsDropdown>
        </CardFooter>
      </Card>
    </WritePreviewTooltip>
  );
}
