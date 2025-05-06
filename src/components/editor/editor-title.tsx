import { dexie } from "@/services";
import { useAppStore } from "@/store/app-store";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export default function EditorTitle() {
  const { currentContent, setCurrentContent, refreshWrites } = useAppStore();
  const [title, setTitle] = useState(currentContent?.title || "");

  useEffect(() => {
    setTitle(currentContent?.title || "");
  }, [currentContent?.title]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!currentContent) return;
      if (title === currentContent.title) return;

      const updated = {
        ...currentContent,
        title: title,
        updatedAt: DateTime.utc().toISO(),
      };
      await dexie.saveWrite(updated);

      setCurrentContent(updated);
      refreshWrites();
    }, 500);

    return () => clearTimeout(timeout);
  }, [title, currentContent, refreshWrites, setCurrentContent]);
  return (
    <Input
      className="border-none p-0 font-semibold text-2xl shadow-none outline-none focus-visible:ring-0 md:text-xl"
      placeholder="Untitled"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
