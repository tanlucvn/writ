"use client";

import Writer from "@/components/editor/writer";
import Loading from "@/components/loading";
import { cn } from "@/lib/utils";
import { saveWrite } from "@/services/db/writes";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { BubbleMenu } from "@tiptap/extension-bubble-menu";
import CharacterCount from "@tiptap/extension-character-count";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function Editor() {
  const { currentWrite, setCurrentWrite, refreshWrites, setEditor } =
    useAppStore();
  const { fontSize, fontFamily } = useAppSettingsStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextStyle,
      Underline,
      Placeholder.configure({ placeholder: "Write something..." }),
      CharacterCount,
      BubbleMenu.configure({
        tippyOptions: {
          arrow: true,
        },
      }),
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
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      setEditor(editor);
    }
  }, [editor, setEditor]);

  useEffect(() => {
    if (editor && currentWrite) {
      if (editor.getHTML() !== (currentWrite.content || "")) {
        editor.commands.setContent(currentWrite.content || "", false);
      }
    }
  }, [currentWrite, editor]);

  if (!currentWrite) {
    return <Loading />;
  }

  return (
    <>
      <Writer />
    </>
  );
}
