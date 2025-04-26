"use client";

import { useAppStore } from "@/store/app-store";

export default function WordCount() {
  const { editor } = useAppStore();

  if (!editor) return null;

  return (
    <span className="text-muted-foreground text-xs">{`${editor.storage.characterCount.characters()} words`}</span>
  );
}
