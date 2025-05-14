import { dexie } from "@/services";
import { useWritesStore } from "@/store/writes-store";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export default function EditorTitle() {
  const { currentWrite, setCurrentWrite, refreshWrites } = useWritesStore();
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
      await dexie.saveWrite(updated);

      setCurrentWrite(updated);
      refreshWrites();
    }, 500);

    return () => clearTimeout(timeout);
  }, [title, currentWrite, refreshWrites, setCurrentWrite]);
  return (
    <Input
      className="border-none p-0 font-semibold text-2xl shadow-none outline-none focus-visible:ring-0 md:text-xl"
      placeholder="Untitled"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
