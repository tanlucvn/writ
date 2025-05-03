"use client";

import Loading from "@/components/loading";
import { cn } from "@/lib/utils";
import { dexie } from "@/services";
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
import { DateTime } from "luxon";
import { useEffect } from "react";
import Writer from "./writer";

const Editor = () => {
  const { currentContent, setCurrentContent, refreshWrites, setEditor } =
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
    content: currentContent?.content || "",
    onUpdate: ({ editor }) => {
      if (!currentContent) return;

      const content = editor.getHTML();

      const updated = {
        ...currentContent,
        content,
        updatedAt: DateTime.utc().toISO(),
      };

      setCurrentContent(updated);
      dexie.saveWrite(updated);
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
    if (editor && currentContent) {
      if (editor.getHTML() !== (currentContent.content || "")) {
        editor.commands.setContent(currentContent.content || "", false);
      }
    }
  }, [currentContent, editor]);

  if (!currentContent) {
    return <Loading />;
  }

  return (
    <>
      <Writer />
    </>
  );
};

export default Editor;
