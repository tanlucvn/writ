"use client";

import ExtensionList from "@/components/editor/extensions";
import { cn } from "@/lib/utils";
import { dexie } from "@/services";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { useWritesStore } from "@/store/writes-store";
import { EditorContent, useEditor } from "@tiptap/react";
import { DateTime } from "luxon";
import { useEffect } from "react";
import Loading from "../loading";
import EditorTitle from "./editor-title";

const Editor = () => {
  const { setEditor } = useAppStore();
  const { currentWrite, setCurrentWrite, refreshWrites } = useWritesStore();
  const { fontFamily, fontSize } = useAppSettingsStore();

  const editor = useEditor({
    extensions: [...ExtensionList],
    content: currentWrite?.content ?? "",
    onUpdate: ({ editor }) => {
      if (!currentWrite) return;

      const content = editor.getHTML();

      const updated = {
        ...currentWrite,
        content,
        updatedAt: DateTime.utc().toISO(),
      };

      setCurrentWrite(updated);
      dexie.saveWrite(updated);
      refreshWrites();
    },
    onCreate: ({ editor }) => {
      editor.commands.focus();
    },
    editorProps: {
      attributes: {
        class: cn(
          "!outline-none !focus-visible:!outline-none focus-visible:border-none",
          fontFamily && `font-${fontFamily}`,
        ),
        style: `font-size: ${fontSize}px;`,
      },
      handleDOMEvents: {
        keydown: (_view, event) => {
          if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
            // prevent default event listeners from firing when slash command is active
            const slashCommand = document.querySelector("#slash-command");
            if (slashCommand) return true;
          }
        },
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

  if (!editor) {
    return <Loading />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-start space-y-4 p-4">
      <EditorTitle />
      <EditorContent editor={editor} className="w-full" />
    </div>
  );
};

export default Editor;
