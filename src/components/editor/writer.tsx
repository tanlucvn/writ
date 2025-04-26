"use client";
import { saveWrite } from "@/services/db/writes";
import { useAppStore } from "@/store/app-store";
import { EditorContent } from "@tiptap/react";
import { Input } from "../ui/input";

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
    <section className="flex h-full w-full flex-grow flex-col items-center justify-start px-6">
      <div className="flex h-full w-full flex-col items-center justify-start gap-6 p-6 md:pb-16 lg:px-0">
        <div className="w-full max-w-2xl">
          <Input
            className="border-none p-0 font-semibold text-2xl shadow-none outline-none focus-visible:ring-0 md:text-xl"
            placeholder="Untitled"
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
