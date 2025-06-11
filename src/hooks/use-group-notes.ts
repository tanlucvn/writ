import type { Note } from "@/types";

type GroupNotesProps = {
  pinned: Note[];
  recent: Note[];
};

export function useGroupNotes(notes: Note[]): GroupNotesProps {
  const pinned: Note[] = [];
  const recent: Note[] = [];

  for (const note of notes) {
    if (note.inTrash) continue;

    if (note.isPinned) {
      pinned.push(note);
    } else {
      recent.push(note);
    }
  }

  return {
    pinned,
    recent,
  };
}
