"use client";

import Writer from "@/components/editor/writer";
import Loading from "@/components/loading";
import { cn } from "@/lib/utils";
import { saveWrite } from "@/services/indexedDB";
import { useAppStore } from "@/store/app-store";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function Editor() {
  const {
    fontSize,
    fontFamily,
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

  if (!currentWrite) {
    return <Loading />;
  }

  return (
    <>
      <Writer />
    </>
  );
}
