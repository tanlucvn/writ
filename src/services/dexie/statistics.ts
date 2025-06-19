import type { Note } from "@/types";
import { getAllNotes, getTotalNotes, getTrashedNotes } from "./notes";

const getLastNDates = (days: number): string[] => {
  const today = new Date();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return d.toISOString().split("T")[0];
  });
};

const getNoteCountPerDay = async (
  filterFn: (note: Note) => boolean,
  days = 30,
): Promise<Map<string, number>> => {
  const notes = await getAllNotes();
  const dates = getLastNDates(days);
  const counts = new Map<string, number>();

  for (const date of dates) {
    const count = notes.filter(
      (n) => n.createdAt.split("T")[0] === date && filterFn(n),
    ).length;
    counts.set(date, count);
  }

  return counts;
};

export const getTotalNoteCount = async () => (await getTotalNotes()).length;

export const getTrashedNoteCount = async () => (await getTrashedNotes()).length;

export const getActiveNoteCount = async () => (await getAllNotes()).length;

export const getNoteCountByDay = () => getNoteCountPerDay(() => true);

export const getTrashedNoteCountByDay = () =>
  getNoteCountPerDay((n) => n.inTrash);

export const getActiveNoteCountByDay = () =>
  getNoteCountPerDay((n) => !n.inTrash);
