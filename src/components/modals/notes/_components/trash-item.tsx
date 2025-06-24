"use client";

import { IconRenderer } from "@/components/icon-renderer";
import { NoteTrashControlsContext } from "@/components/notes/note-trash-controls-context";
import { NoteTrashControlsDropdown } from "@/components/notes/note-trash-controls-dropdown";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNoteActions } from "@/hooks/use-note-actions";
import { cn, getRelativeTime } from "@/lib/utils";
import type { Note } from "@/types";
import { usePathname } from "next/navigation";
import { NoteContentPreview } from "./note-preview";
import NotePreviewTooltip from "./note-preview-tooltip";

type TrashItemProps = {
  note: Note;
  className?: string;
  selectable?: boolean;
};

export default function TrashItem({
  note,
  className,
  selectable = true,
}: TrashItemProps) {
  const pathname = usePathname();
  const { onSelect } = useNoteActions();
  const isSelected = pathname === `/${note.id}`;

  const handleSelectNote = () => {
    if (selectable) {
      onSelect(note);
    }
  };

  return (
    <NoteTrashControlsContext note={note}>
      <Card
        onClick={handleSelectNote}
        className={cn(
          "h-36 cursor-pointer p-4 shadow-xs transition-colors hover:bg-muted",
          isSelected && "bg-muted ring",
          className,
        )}
      >
        <NotePreviewTooltip content={<NoteContentPreview note={note} />}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 px-0">
            <div className="min-w-0 space-y-1">
              <CardTitle className="truncate font-medium text-base">
                {note.title || "Untitled"}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs">
                {getRelativeTime(note.updatedAt)}
              </CardDescription>
            </div>
          </CardHeader>
        </NotePreviewTooltip>

        <CardContent className="line-clamp-2 px-0 text-muted-foreground text-sm">
          Content
        </CardContent>

        <CardFooter className="px-0">
          <NoteTrashControlsDropdown note={note}>
            <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
              <IconRenderer name="Ellipsis" className="size-4" />
            </Button>
          </NoteTrashControlsDropdown>
        </CardFooter>
      </Card>
    </NoteTrashControlsContext>
  );
}
