import { parseImportedNotes } from "@/lib/import-utils";
import { useNoteStore } from "@/store/use-note-store";
import type { Note } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export const useNoteActions = (
  parentId?: string,
  expanded?: boolean,
  onExpand?: () => void,
) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    notes,
    addNote,
    renameNote,
    togglePinNote,
    moveNoteToTrash,
    restoreNoteFromTrash,
    deleteNotePermanently,
    clearTrash,
    updateNote,
    importNotes,
  } = useNoteStore();

  const onSelect = (note: Note) => {
    if (pathname !== `/${note.id}`) {
      router.push(`/${note.id}`);
    }
  };

  const onCreate = async (note?: Partial<Note>) => {
    const promise = addNote({ ...note, parentId: parentId }).then((noteId) => {
      if (!expanded) onExpand?.();
      router.push(`/${noteId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  const onUpdateNote = async (note: Note) => {
    const promise = updateNote(note);

    await promise;
  };

  const onRenameNote = async (id: string, newTitle: string) => {
    if (!id || !newTitle.trim()) return;

    const promise = renameNote(id, newTitle.trim());
    toast.promise(promise, {
      loading: "Renaming...",
      success: "Renamed successfully!",
      error: "Failed to rename.",
    });
  };

  const onTogglePinNote = async (id: string) => {
    const note = useNoteStore.getState().notes.find((n) => n.id === id);
    if (!note) return;

    const actionPromise = togglePinNote(id);

    toast.promise(actionPromise, {
      loading: note.isPinned ? "Unpinning..." : "Pinning...",
      success: note.isPinned ? "Note unpinned." : "Note pinned.",
      error: note.isPinned ? "Failed to unpin note." : "Failed to pin note.",
    });

    await actionPromise;
  };

  const onRemoveNote = async (id: string) => {
    const promise = moveNoteToTrash(id);

    toast.promise(promise, {
      loading: "Removing note...",
      success: "Note moved to trash.",
      error: "Failed to remove note.",
    });

    await promise;

    // Only redirect if currently viewing the deleted note
    if (pathname === `/${id}`) {
      router.push("/");
    }
  };

  const onRestoreNote = async (id: string) => {
    const promise = restoreNoteFromTrash(id);

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored.",
      error: "Failed to restore note.",
    });

    await promise;
  };

  const onDeletePermanently = async (id: string) => {
    const promise = deleteNotePermanently(id);

    toast.promise(promise, {
      loading: "Deleting permanently...",
      success: "Note deleted permanently.",
      error: "Failed to delete note.",
    });

    await promise;
  };

  const onClearTrash = async () => {
    const promise = clearTrash();

    toast.promise(promise, {
      loading: "Clearing trash...",
      success: "Trash cleared.",
      error: "Failed to clear trash.",
    });

    await promise;
  };

  const onExportNotes = async () => {
    if (!notes.length) {
      toast.error("No notes to export.");
      return;
    }

    const promise = new Promise<void>((resolve, reject) => {
      try {
        const json = JSON.stringify(notes, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `notes-export-${new Date().toISOString()}.json`;
        link.click();

        URL.revokeObjectURL(url);
        resolve();
      } catch (err) {
        console.error("Export error:", err);
        reject(err);
      }
    });

    toast.promise(promise, {
      loading: "Exporting notes...",
      success: "Notes exported successfully!",
      error: "Failed to export notes.",
    });

    await promise;
  };

  const onImportNotes = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const parsed = parseImportedNotes(text);

        if (!parsed.length) {
          toast.error("No valid notes to import.");
          return;
        }

        const promise = importNotes(parsed);

        toast.promise(promise, {
          loading: "Importing notes...",
          success: (count) => `${count ?? 0} notes imported successfully!`,
          error: "Failed to import notes.",
        });

        await promise;
      } catch (err) {
        toast.error("Failed to import notes.");
        console.error("Import error:", err);
      }
    };

    input.click();
  };

  return {
    onSelect,
    onCreate,
    onUpdateNote,
    onRenameNote,
    onTogglePinNote,
    onRemoveNote,
    onRestoreNote,
    onDeletePermanently,
    onClearTrash,
    onExportNotes,
    onImportNotes,
  };
};
