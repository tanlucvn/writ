"use client";

import { Toggle } from "@/components/ui/toggle";
import { useAppStore } from "@/store/app-store";
import { BoldIcon, CodeIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

export const ToolbarFormat = () => {
  const { editor } = useAppStore();

  if (!editor) return null;

  return (
    <div className="flex items-center justify-center gap-1 md:gap-0">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        aria-label="Bold"
        onPressedChange={() => editor.commands.toggleBold()}
        className="text-muted-foreground hover:text-foreground md:rounded-none md:rounded-tl-lg md:rounded-bl-lg"
      >
        <BoldIcon />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        aria-label="Italic"
        onPressedChange={() => editor.commands.toggleItalic()}
        className="text-muted-foreground hover:text-foreground md:rounded-none"
      >
        <ItalicIcon />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("underline")}
        aria-label="Underline"
        onPressedChange={() => editor.commands.toggleUnderline()}
        className="text-muted-foreground hover:text-foreground md:rounded-none"
      >
        <UnderlineIcon />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("code")}
        aria-label="Inline code"
        onPressedChange={() => editor.commands.toggleCode()}
        className="text-muted-foreground hover:text-foreground md:rounded-none"
      >
        <CodeIcon />
      </Toggle>
    </div>
  );
};
