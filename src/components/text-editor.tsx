"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/editor-store";
import { useToolbarStore } from "@/store/toolbar-store";

export default function TextEditor() {
  const { content, setContent } = useEditorStore();
  const { fontSize, fontFamily } = useToolbarStore();

  return (
    <div className="mx-auto w-full px-0 py-16">
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
