"use client";

import ExtensionList from "@/components/editor/extensions";
import { cn } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/use-app-settings-store";
import { EditorContent, useEditor } from "@tiptap/react";
import { useDebouncedCallback } from "use-debounce";
import { Toolbar } from "./toolbar";

interface EditorProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const TiptapEditor = ({ defaultValue, onChange }: EditorProps) => {
  const { fontFamily, fontSize } = useAppSettingsStore();

  const debouncedOnChange = useDebouncedCallback((value: string) => {
    onChange?.(value);
  }, 500);

  const editor = useEditor({
    extensions: [...ExtensionList],
    content: defaultValue,
    onUpdate: ({ editor }) => {
      debouncedOnChange(editor.getHTML());
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
  });

  return (
    <div className="relative mx-auto flex w-full max-w-prose flex-col justify-start space-y-2.5">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
