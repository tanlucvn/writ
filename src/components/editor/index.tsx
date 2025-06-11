"use client";

import ExtensionList from "@/components/editor/extensions";
import { useNoteActions } from "@/hooks/use-note-actions";
import { cn } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/use-app-settings-store";
import { useAppStore } from "@/store/use-app-store";
import type { Note } from "@/types";
import { EditorContent, useEditor } from "@tiptap/react";
import { DateTime } from "luxon";
import { useEffect } from "react";
import Loading from "../loading";
import { Toolbar } from "./toolbar";

interface EditorProps {
  note?: Note;
}

const Editor = ({ note }: EditorProps) => {
  const { setEditor } = useAppStore();
  const { fontFamily, fontSize } = useAppSettingsStore();
  const { onUpdateNote } = useNoteActions();

  const editor = useEditor(
    {
      extensions: [...ExtensionList],
      content: note?.content ?? "",
      onUpdate: ({ editor }) => {
        if (!note) return;

        const content = editor.getHTML();

        const updated = {
          ...note,
          content,
          updatedAt: DateTime.utc().toISO(),
        };

        onUpdateNote(updated);
      },
      onCreate: ({ editor }) => {
        editor.commands.focus();
      },
      editorProps: {
        attributes: {
          class: cn(
            "!outline-none !focus-visible:!outline-none",
            "!h-[calc(100svh-2rem-36px-58px)] w-full overflow-y-auto rounded-md border-2 border-dashed p-4",
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
    },
    [note?.id],
  );

  useEffect(() => {
    if (editor) {
      setEditor(editor);
    }
  }, [editor, setEditor]);

  if (!editor) {
    return <Loading />;
  }

  return (
    <div className="relative mx-auto flex w-full max-w-prose flex-col justify-start space-y-2.5">
      <Toolbar />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
