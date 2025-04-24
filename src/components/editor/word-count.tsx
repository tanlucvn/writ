"use client";

import { useAppStore } from "@/store/app-store";

export default function WordCount() {
  const { editor } = useAppStore();

  if (!editor) return null;

  return (
    <section className="fixed bottom-0 left-0 z-10 w-screen">
      <div className="flex items-center justify-end gap-4 p-4 transition-opacity duration-100 hover:opacity-100">
        <span className="text-muted-foreground text-sm">{`${editor.storage.characterCount.characters()} words`}</span>
      </div>
    </section>
  );
}
