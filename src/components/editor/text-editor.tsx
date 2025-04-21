"use client";

import { cn } from "@/lib/utils";
import { saveWrite } from "@/services/indexedDB";
import { useAppStore } from "@/store/app-store";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function TextEditor() {
  const {
    fontSize,
    fontFamily,
    isZenMode,
    currentWrite,
    setCurrentWrite,
    refreshWrites,
    setEditor,
  } = useAppStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextStyle,
      Underline,
      Placeholder.configure({ placeholder: "Write something..." }),
    ],
    content: currentWrite?.content || "",
    onUpdate: ({ editor }) => {
      if (!currentWrite) return;

      const content = editor.getHTML();

      const updated = {
        ...currentWrite,
        content,
        updatedAt: new Date(),
      };

      setCurrentWrite(updated);
      saveWrite(updated);
      refreshWrites();
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose dark:prose-invert w-full outline-none focus:outline-none",
          `font-${fontFamily}`,
        ),
        style: `font-size: ${fontSize}px;`,
      },
    },
  });

  useEffect(() => {
    if (editor) {
      setEditor(editor);
    }
  }, [editor, setEditor]);

  useEffect(() => {
    if (editor && currentWrite) {
      const currentContent = editor.getHTML();
      const newContent = currentWrite.content || "";

      // Only update if content is different
      if (currentContent !== newContent) {
        editor.commands.setContent(newContent);
      }
    }
  }, [currentWrite, editor]);

  // console.log("currentWrite", currentWrite);
  return (
    <div
      className={cn(
        "mx-auto w-full px-0 py-16 transition-all duration-300",
        isZenMode && "pb-2",
      )}
    >
      <EditorContent editor={editor} className="px-2" />
    </div>
  );
}
