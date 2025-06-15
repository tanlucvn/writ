"use client";

import { IconRenderer } from "@/components/icon-renderer";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useNoteActions } from "@/hooks/use-note-actions";
import { useAppStore } from "@/store/use-app-store";
import { useDialogStore } from "@/store/use-dialog-store";
import type { Note } from "@/types";
import type { ReactNode } from "react";

interface NoteControlsContextProps {
  note: Note;
  children: ReactNode;
}

export function NoteControlsContext({
  note,
  children,
}: NoteControlsContextProps) {
  const { onRemoveNote, onTogglePinNote } = useNoteActions(note.id);
  const { setIsEditNoteTitleOpen, setIsNoteSummaryOpen } = useDialogStore();
  const { setCurrentEditNote } = useAppStore();

  const handleEditNote = () => {
    setCurrentEditNote(note);
    setIsEditNoteTitleOpen(true);
  };

  const handleViewSummary = () => {
    setCurrentEditNote(note);
    setIsNoteSummaryOpen(true);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="rounded-lg" forceMount>
        <ContextMenuItem
          className="gap-2"
          onClick={(e) => {
            e.stopPropagation();
            handleEditNote();
          }}
        >
          <IconRenderer name="Edit3" className="!text-primary size-4" />
          <span>Edit Title</span>
        </ContextMenuItem>

        <ContextMenuItem
          className="gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePinNote(note.id);
          }}
        >
          {note.isPinned ? (
            <>
              <IconRenderer name="PinOff" className="!text-primary size-4" />
              <span>Unpin Note</span>
            </>
          ) : (
            <>
              <IconRenderer name="Pin" className="!text-primary size-4" />
              <span>Pin Note</span>
            </>
          )}
        </ContextMenuItem>

        <ContextMenuItem
          className="gap-2"
          onClick={(e) => {
            e.stopPropagation();
            handleViewSummary();
          }}
        >
          <IconRenderer name="FileText" className="!text-primary size-4" />
          <span>View Summary</span>
        </ContextMenuItem>

        <ContextMenuItem
          className="!text-destructive gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveNote(note.id);
          }}
        >
          <IconRenderer name="Trash2" className="!text-destructive size-4" />
          <span>Remove</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
