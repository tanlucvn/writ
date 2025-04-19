"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { useEditorStore } from "@/store/editor-store";

export default function TextEditor() {
  const { content, setContent } = useEditorStore();
  const { fontSize, fontFamily, isZenMode } = useAppStore();

  return (
    <div
      className={cn(
        "mx-auto w-full px-0 py-16 transition-all duration-300",
        isZenMode && "pb-2",
      )}
    >
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
