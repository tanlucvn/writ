"use client";

import { useNoteStore } from "@/store/use-note-store";
import { useEffect } from "react";

export const NoteDataInitializer = () => {
  const { loadNotes, loadTrash } = useNoteStore();

  useEffect(() => {
    loadNotes();
    loadTrash();
  }, [loadNotes, loadTrash]);

  return null;
};
