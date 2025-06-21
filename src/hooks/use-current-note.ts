import { useNoteStore } from "@/store/use-note-store";
import { useParams } from "next/navigation";

export function useCurrentNote() {
  const params = useParams();
  const notes = useNoteStore((state) => state.notes);
  const id = params?.id;

  if (!id || typeof id !== "string") return null;
  return notes.find((note) => note.id === id) ?? null;
}
