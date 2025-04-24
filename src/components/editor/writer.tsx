"use client";

import { Textarea } from "@/components/ui/textarea";
import { saveWrite } from "@/services/db/writes";
import { useAppStore } from "@/store/app-store";
import { EditorContent } from "@tiptap/react";

export default function Writer() {
  const { editor, currentWrite, setCurrentWrite, refreshWrites } =
    useAppStore();

  const handleTitleChange = async (value: string) => {
    if (!currentWrite) return;

    const updated = {
      ...currentWrite,
      title: value,
      updatedAt: new Date(),
    };
    await saveWrite(updated);
    setCurrentWrite(updated);
    refreshWrites();
  };

  return (
    <section className="z-[2] flex h-full w-full flex-grow flex-col items-center justify-start">
      <div className="flex h-full w-full flex-col items-center justify-start gap-6 px-4 pt-32 pb-24 md:pb-16 lg:px-0">
        <div className="w-full max-w-2xl">
          <Textarea
            className="flex min-h-[48px] w-full resize-none items-center overflow-y-hidden border-0 bg-transparent p-0 font-semibold text-foreground text-xl leading-snug focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-3xl lg:leading-snug"
            placeholder="Untitled"
            rows={1}
            value={currentWrite?.title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
        </div>
        <div className="prose dark:prose-invert flex h-auto min-h-max w-full max-w-2xl items-start justify-center pb-12">
          <EditorContent editor={editor} className="w-full max-w-2xl" />
        </div>
      </div>
    </section>
  );
}
