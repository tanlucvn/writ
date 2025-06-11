"use client";

import ExtensionList from "@/components/editor/extensions";
import { cn } from "@/lib/utils";
import { useAppSettingsStore } from "@/store/use-app-settings-store";
import { EditorContent, useEditor } from "@tiptap/react";

interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
  editable?: boolean;
}

const EditorPreview = ({ content }: EditorProps) => {
  const { fontFamily, fontSize } = useAppSettingsStore();

  const editor = useEditor({
    extensions: [...ExtensionList],
    content: content,
    editorProps: {
      attributes: {
        class: cn(
          "!outline-none !focus-visible:!outline-none focus-visible:border-none",
          fontFamily && `font-${fontFamily}`,
        ),
        style: `font-size: ${fontSize}px;`,
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-start space-y-4 p-4">
      <EditorContent editor={editor} className="w-full" />
    </div>
  );
};

export default EditorPreview;
