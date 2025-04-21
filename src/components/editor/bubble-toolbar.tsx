import { useAppStore } from "@/store/app-store";
import { BubbleMenu } from "@tiptap/react";
import EditorToolbar from "./editor-toolbar";

export default function BubbleToolbar() {
  const { editor } = useAppStore();

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      shouldShow={({ editor }) => {
        return editor.isActive("paragraph") || editor.isActive("text");
      }}
    >
      <EditorToolbar />
    </BubbleMenu>
  );
}
