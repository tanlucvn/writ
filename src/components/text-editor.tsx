"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { saveWrite } from "@/services/indexedDB";
import { useAppStore } from "@/store/app-store";

export default function TextEditor() {
  const {
    fontSize,
    fontFamily,
    isZenMode,
    currentWrite,
    setCurrentWrite,
    refreshWrites,
  } = useAppStore();

  const handleWriteChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (!currentWrite) return;

    const updatedWrite = {
      ...currentWrite,
      content: e.target.value,
      updatedAt: new Date(),
    };

    setCurrentWrite(updatedWrite);
    await saveWrite(updatedWrite);
    refreshWrites();
  };
  return (
    <div
      className={cn(
        "mx-auto w-full px-0 py-16 transition-all duration-300",
        isZenMode && "pb-2",
      )}
    >
      <Textarea
        value={currentWrite?.content || ""}
        onChange={handleWriteChange}
        className={cn(
          "scrollbar-hidden h-full w-full resize-none overflow-auto border-none bg-transparent px-2 leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0",
          `font-${fontFamily}`,
        )}
        placeholder="Start writing..."
        style={{ fontSize }}
      />
    </div>
  );
}
