"use client";
import { saveWrite } from "@/services/db/writes";
import { useAppStore } from "@/store/app-store";
import { EditorContent } from "@tiptap/react";
import { Input } from "../ui/input";

import { useEffect, useState } from "react";

export default function Writer() {
  const { editor, currentWrite, setCurrentWrite, refreshWrites } =
    useAppStore();
  const [title, setTitle] = useState(currentWrite?.title || "");

  useEffect(() => {
    setTitle(currentWrite?.title || "");
  }, [currentWrite?.title]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!currentWrite) return;
      if (title === currentWrite.title) return;

      const updated = {
        ...currentWrite,
        title: title,
        updatedAt: new Date(),
      };
      await saveWrite(updated);
      setCurrentWrite(updated);
      refreshWrites();
    }, 500);

    return () => clearTimeout(timeout);
  }, [title, currentWrite, refreshWrites, setCurrentWrite]);

  return (
    <section className="flex h-full w-full flex-grow flex-col items-center justify-start">
      <div className="flex h-full w-full flex-col items-center justify-start gap-6 p-6">
        <div className="w-full max-w-2xl">
          <Input
            className="border-none p-0 font-semibold text-2xl shadow-none outline-none focus-visible:ring-0 md:text-xl"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="prose dark:prose-invert flex h-auto min-h-max w-full max-w-2xl items-start justify-center pb-12">
          <EditorContent editor={editor} className="w-full max-w-2xl" />
        </div>
      </div>
    </section>
  );
}
