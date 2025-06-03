"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  HighlighterIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  TextIcon,
  UnderlineIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import LinkPopover from "./link-popover";

export const ToolbarFormat = () => {
  const { editor } = useAppStore();
  const [, forceUpdate] = useState(0);

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

  // 1. Text block types (paragraph, heading)
  const textBlockTypes = [
    {
      label: "Paragraph",
      icon: <TextIcon className="!size-3.5" />,
      action: () => editor.chain().focus().setParagraph().run(),
      active: editor.isActive("paragraph"),
    },
    {
      label: "Heading 1",
      icon: <Heading1Icon className="!size-3.5" />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
    },
    {
      label: "Heading 2",
      icon: <Heading2Icon className="!size-3.5" />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
    },
    {
      label: "Heading 3",
      icon: <Heading3Icon className="!size-3.5" />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive("heading", { level: 3 }),
    },
    {
      label: "Heading 4",
      icon: <Heading4Icon className="!size-3.5" />,
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      active: editor.isActive("heading", { level: 4 }),
    },
  ];

  // 2. Layout block types (blockquote, lists)
  const layoutBlockTypes = [
    {
      label: "Blockquote",
      icon: <QuoteIcon className="!size-3.5" />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
    },
    {
      label: "Bullet list",
      icon: <ListIcon className="!size-3.5" />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      label: "Ordered list",
      icon: <ListOrderedIcon className="!size-3.5" />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
  ];

  const inlineButtons = [
    {
      label: "Bold",
      icon: <BoldIcon className="!size-3.5" />,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      label: "Italic",
      icon: <ItalicIcon className="!size-3.5" />,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      label: "Underline",
      icon: <UnderlineIcon className="!size-3.5" />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
    },
    {
      label: "Highlight",
      icon: <HighlighterIcon className="!size-3.5" />,
      action: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
    },
  ];

  const currentTextBlock = textBlockTypes.find((b) => b.active);

  return (
    <>
      {/* Block format dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-32 justify-start border text-xs"
          >
            <div className="flex items-center gap-2 truncate">
              {currentTextBlock?.icon}
              {currentTextBlock?.label || "Block Type"}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-32 space-y-1">
          {textBlockTypes.map((block) => (
            <DropdownMenuItem
              key={block.label}
              onClick={block.action}
              className={cn(
                "flex items-center gap-2 text-xs",
                block.active && "!bg-primary !text-primary-foreground",
              )}
            >
              {block.icon}
              {block.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="h-4" />

      {/* Inline formatting */}
      {inlineButtons.map((btn) => (
        <Tooltip key={btn.label}>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={btn.active ? "default" : "outline"}
              onClick={btn.action}
              aria-label={btn.label}
              className="size-8 p-0"
            >
              {btn.icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={4}>
            {btn.label}
          </TooltipContent>
        </Tooltip>
      ))}

      <Separator orientation="vertical" className="h-4" />

      <LinkPopover />

      {/* Layout formatting */}
      {layoutBlockTypes.map((btn) => (
        <Tooltip key={btn.label}>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={btn.active ? "default" : "outline"}
              onClick={btn.action}
              aria-label={btn.label}
              className="size-8 p-0"
            >
              {btn.icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={4}>
            {btn.label}
          </TooltipContent>
        </Tooltip>
      ))}
    </>
  );
};
