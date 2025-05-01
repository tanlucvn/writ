"use client";

import { saveWrite } from "@/services/db/writes";
import { useAppStore } from "@/store/app-store";
import { EditorContent } from "@tiptap/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

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
        updatedAt: DateTime.utc().toISO(),
      };
      await saveWrite(updated);

      setCurrentWrite(updated);
      refreshWrites();
    }, 500);

    return () => clearTimeout(timeout);
  }, [title, currentWrite, refreshWrites, setCurrentWrite]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start space-y-6 p-6">
      <Input
        className="border-none p-0 font-semibold text-2xl shadow-none outline-none focus-visible:ring-0 md:text-xl"
        placeholder="Untitled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <EditorContent editor={editor} className="w-full" />
    </div>
  );
}
