"use client";

import { Textarea } from "@/components/ui/textarea";
import { useEditorStore } from "@/store/editor-store";
import { useToolbarStore } from "@/store/toolbar-store";

export default function TextEditor() {
  const { content, setContent } = useEditorStore();
  const { fontSize } = useToolbarStore();

  return (
    <div className="mx-auto w-full px-0 py-16">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="scrollbar-hidden h-full w-full resize-none overflow-auto border-none bg-transparent px-2 leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Start writing..."
        style={{ fontSize }}
      />
    </div>
  );
}
