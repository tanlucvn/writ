"use client";

import { useEditorStore } from "@/store/editor-store";

export default function ToolbarWordCount() {
  const content = useEditorStore((state) => state.content);
  const wordCount = content.length;

  return (
    <div className="font-medium text-xs">
      {wordCount} <span className="font-normal">words</span>
    </div>
  );
}
