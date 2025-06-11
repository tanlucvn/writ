import { IconRenderer } from "@/components/icon-renderer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNoteActions } from "@/hooks/use-note-actions";
import { useAppStore } from "@/store/use-app-store";
import { useDialogStore } from "@/store/use-dialog-store";
import type { Note } from "@/types";
import type { ReactNode } from "react";

interface NoteControlsDropdownProps {
  note: Note;
  children: ReactNode;
}

export function NoteControlsDropdown({
  note,
  children,
}: NoteControlsDropdownProps) {
  const { onRemoveNote, onTogglePinNote } = useNoteActions(note.id);
  const { setIsEditTitleModalOpen, setIsWriteSummaryOpen } = useDialogStore();
  const { setCurrentEditNote } = useAppStore();

  const handleEditNote = () => {
    setCurrentEditNote(note);
    setIsEditTitleModalOpen(true);
  };

  const handleViewSummary = () => {
    setCurrentEditNote(note);
    setIsWriteSummaryOpen(true);
  };

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
            handleEditNote();
          }}
        >
          <IconRenderer name="Edit3" className="!text-primary size-4" />
          <span>Edit Title</span>
        </DropdownMenuItem>
        <DropdownMenuItem
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
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={(e) => {
            e.stopPropagation();
            handleViewSummary();
          }}
        >
          <IconRenderer name="FileText" className="!text-primary size-4" />
          <span>View Summary</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="!text-destructive gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveNote(note.id);
          }}
        >
          <IconRenderer name="Trash2" className="!text-destructive size-4" />
          <span>Remove</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
