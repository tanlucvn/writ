import { create } from "zustand";

interface EditorStore {
  content: string;
  setContent: (value: string) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  content: "",
  setContent: (value) => set({ content: value }),
}));
