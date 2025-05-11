"use client";

import { Button } from "@/components/ui/button";
import DashedContainer from "@/components/ui/dashed-container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  TextIcon,
  UnderlineIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export const ToolbarFormat = () => {
  const { editor } = useAppStore();
  const [, forceUpdate] = useState(0);

  // Re-render the component when the editor selection or transaction changes
  useEffect(() => {
    if (!editor) return;

    const update = () => forceUpdate((n) => n + 1);
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  if (!editor) return null;

  // Block-level formatting options (headings, lists, etc.)
  const blockTypes = [
    {
      label: "Paragraph",
      icon: <TextIcon className="size-4" />,
      action: () => editor.commands.setParagraph(),
      active: editor.isActive("paragraph"),
    },
    {
      label: "Heading 1",
      icon: <Heading1Icon className="size-4" />,
      action: () => editor.commands.toggleHeading({ level: 1 }),
      active: editor.isActive("heading", { level: 1 }),
    },
    {
      label: "Heading 2",
      icon: <Heading2Icon className="size-4" />,
      action: () => editor.commands.toggleHeading({ level: 2 }),
      active: editor.isActive("heading", { level: 2 }),
    },
    {
      label: "Heading 3",
      icon: <Heading3Icon className="size-4" />,
      action: () => editor.commands.toggleHeading({ level: 3 }),
      active: editor.isActive("heading", { level: 3 }),
    },
    {
      label: "Blockquote",
      icon: <QuoteIcon className="size-4" />,
      action: () => editor.commands.toggleBlockquote(),
      active: editor.isActive("blockquote"),
    },
    {
      label: "Bullet list",
      icon: <ListIcon className="size-4" />,
      action: () => editor.commands.toggleBulletList(),
      active: editor.isActive("bulletList"),
    },
    {
      label: "Ordered list",
      icon: <ListOrderedIcon className="size-4" />,
      action: () => editor.commands.toggleOrderedList(),
      active: editor.isActive("orderedList"),
    },
  ];

  // Inline formatting buttons (bold, italic, etc.)
  const inlineButtons = [
    {
      label: "Bold",
      icon: <BoldIcon className="size-4" />,
      action: () => editor.commands.toggleBold(),
      active: editor.isActive("bold"),
    },
    {
      label: "Italic",
      icon: <ItalicIcon className="size-4" />,
      action: () => editor.commands.toggleItalic(),
      active: editor.isActive("italic"),
    },
    {
      label: "Underline",
      icon: <UnderlineIcon className="size-4" />,
      action: () => editor.commands.toggleUnderline(),
      active: editor.isActive("underline"),
    },
    {
      label: "Inline code",
      icon: <CodeIcon className="size-4" />,
      action: () => editor.commands.toggleCode(),
      active: editor.isActive("code"),
    },
  ];

  const currentBlock = blockTypes.find((b) => b.active);

  return (
    <>
      {/* Block format dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-28 border text-xs">
            <div className="flex items-center gap-2 truncate">
              {currentBlock?.icon}
              {currentBlock?.label || "Block Type"}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DashedContainer className="p-1">
            {blockTypes.map((block) => (
              <DropdownMenuItem
                key={block.label}
                onClick={block.action}
                className={cn(
                  "flex items-center gap-2 text-xs",
                  block.active && "bg-accent text-accent-foreground",
                )}
              >
                {block.icon}
                {block.label}
              </DropdownMenuItem>
            ))}
          </DashedContainer>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="h-4" />

      {/* Inline format toggle buttons */}
      {inlineButtons.map((btn) => (
        <Toggle
          key={btn.label}
          size="sm"
          pressed={btn.active}
          onPressedChange={btn.action}
          aria-label={btn.label}
          className={cn(
            "border",
            btn.active && "bg-background text-foreground shadow-inner",
          )}
        >
          {btn.icon}
        </Toggle>
      ))}
    </>
  );
};
