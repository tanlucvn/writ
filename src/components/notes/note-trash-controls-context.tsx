import { IconRenderer } from "@/components/icon-renderer";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useNoteActions } from "@/hooks/use-note-actions";
import type { Note } from "@/types";
import type { ReactNode } from "react";

interface NoteTrashControlsContextProps {
  note: Note;
  children: ReactNode;
}

export function NoteTrashControlsContext({
  note,
  children,
}: NoteTrashControlsContextProps) {
  const { onRestoreNote, onDeletePermanently } = useNoteActions(note.id);

  return (
    <ContextMenu>
      <ContextMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent forceMount>
        <ContextMenuItem
          className="gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onRestoreNote(note.id);
          }}
        >
          <IconRenderer name="RotateCcw" className="!text-primary size-4" />
          <span>Restore</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="!text-destructive gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onDeletePermanently(note.id);
          }}
        >
          <IconRenderer name="Trash2" className="!text-destructive size-4" />
          <span>Delete</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
