"use client";

import { Button } from "@/components/ui/button";
import { useNoteActions } from "@/hooks/use-note-actions";
import { IconRenderer } from "../icon-renderer";

export function NotesTransferButton() {
  const { onExportNotes, onImportNotes } = useNoteActions();

  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      <Button variant="outline" onClick={onExportNotes}>
        <IconRenderer name="Download" />
        Export Notes
      </Button>

      <Button variant="outline" onClick={onImportNotes}>
        <IconRenderer name="Upload" />
        Import Notes
      </Button>
    </div>
  );
}
