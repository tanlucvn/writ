import { IconRenderer } from "@/components/icon-renderer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNoteActions } from "@/hooks/use-note-actions";
import type { Note } from "@/types";
import type { ReactNode } from "react";

interface NoteTrashControlsDropdownProps {
  note: Note;
  children: ReactNode;
}

export function NoteTrashControlsDropdown({
  note,
  children,
}: NoteTrashControlsDropdownProps) {
  const { onRestoreNote, onDeletePermanently } = useNoteActions(note.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" forceMount>
        <DropdownMenuItem
          className="gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onRestoreNote(note.id);
          }}
        >
          <IconRenderer name="RotateCcw" className="!text-primary size-4" />
          <span>Restore</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="!text-destructive gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onDeletePermanently(note.id);
          }}
        >
          <IconRenderer name="Trash2" className="!text-destructive size-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
