"use client";

import ExtensionList from "@/components/editor/extensions";
import { cn } from "@/lib/utils";
import { dexie } from "@/services";
import { useAppSettingsStore } from "@/store/app-settings-store";
import { useAppStore } from "@/store/app-store";
import { EditorContent, useEditor } from "@tiptap/react";
import { DateTime } from "luxon";
import { useEffect } from "react";
import Loading from "../loading";
import EditorTitle from "./editor-title";

const Editor = () => {
  const { currentWrite, setCurrentWrite, refreshWrites, setEditor } =
    useAppStore();
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
    editorProps: {
      attributes: {
        class: cn(
          "focus:outline-none",
          "prose prose-sm md:prose-base dark:prose-invert",
          "prose-code:before:hidden prose-code:after:hidden",
          "prose-h1:font-semibold prose-h2:font-medium prose-h3:font-medium prose-h4:font-medium prose-h5:font-regular prose-h6:font-regular",
          // Dynamic Metrics - https://d.rsms.me/inter-website/v3/dynmetrics/
          "prose-h1:tracking-[-0.0021em] prose-h2:tracking-[-0.0018em] prose-h3:tracking-[-0.0015em] prose-h4:tracking-[-0.0012em] prose-p:tracking-[-0.0011em]",
          "prose-h2:mb-[0.666em] prose-h3:mb-[0.666em]",
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
