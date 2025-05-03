"use client";

import { useAppStore } from "@/store/app-store";
import { BubbleMenu } from "@tiptap/react";
import EditorToolbar from "./editor-toolbar";

const BubbleToolbar = () => {
  const { editor } = useAppStore();

  if (!editor) return null;

  return (
    <div>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <EditorToolbar />
      </BubbleMenu>
    </div>
  );
};

export default BubbleToolbar;
