"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { EditorHeadings, EditorMarks, EditorNodes } from "@/lib/constants";
import { useAppStore } from "@/store/app-store";
import {
  BoldIcon,
  CodeIcon,
  HighlighterIcon,
  ItalicIcon,
  QuoteIcon,
  UnderlineIcon,
} from "lucide-react";

const EditorToolbar = () => {
  const { editor } = useAppStore();

  const EDITOR_HEADINGS = [
    { label: "Normal", value: EditorHeadings.NORMAL },
    { label: "Heading 2", value: EditorHeadings.H2 },
    { label: "Heading 3", value: EditorHeadings.H3 },
    { label: "Heading 4", value: EditorHeadings.H4 },
  ];

  const [activeHeadingMark, setActiveHeadingMark] = useState<string>(
    EditorHeadings.NORMAL,
  );
  const [activeMarks, setActiveMarks] = useState<string[]>([]);
  const [activeNodes, setActiveNodes] = useState<string[]>([]);

  const handleEditorMarksChange = (values: string[]) => {
    setActiveMarks(values);

    const changedToggle =
      values.find((value) => !activeMarks.includes(value)) ||
      activeMarks.find((value) => !values.includes(value));

    if (changedToggle) {
      switch (changedToggle) {
        case EditorMarks.BOLD:
          // @ts-ignore
          editor?.chain().focus().toggleBold().run();
          break;
        case EditorMarks.ITALIC:
          // @ts-ignore
          editor?.chain().focus().toggleItalic().run();
          break;
        case EditorMarks.UNDERLINE:
          editor?.chain().focus().toggleUnderline().run();
          break;
        case EditorMarks.HIGHLIGHT:
          editor?.chain().focus().toggleHighlight().run();
          break;
      }
    }
  };

  const handleEditorHeadingMarkChange = (value: string) => {
    setActiveHeadingMark(value);

    switch (value) {
      case EditorHeadings.NORMAL:
        // @ts-ignore
        editor?.chain().focus().setParagraph().run();
        break;
      case EditorHeadings.H2:
        editor?.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case EditorHeadings.H3:
        editor?.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case EditorHeadings.H4:
        editor?.chain().focus().toggleHeading({ level: 4 }).run();
        break;
    }
  };

  const handleEditorNodesChange = (values: string[]) => {
    setActiveNodes(values);

    const changedToggle =
      values.find((value) => !activeNodes.includes(value)) ||
      activeNodes.find((value) => !values.includes(value));

    if (changedToggle) {
      switch (changedToggle) {
        case EditorNodes.CODE:
          editor?.chain().focus().toggleCodeBlock().run();
          break;
        case EditorNodes.QUOTE:
          // @ts-ignore
          editor?.chain().focus().toggleBlockquote().run();
          break;
      }
    }
  };

  useEffect(() => {
    if (editor) {
      editor.on("selectionUpdate", ({ editor }) => {
        if (editor.isActive("heading", { level: 2 })) {
          setActiveHeadingMark(EditorHeadings.H2);
        } else if (editor.isActive("heading", { level: 3 })) {
          setActiveHeadingMark(EditorHeadings.H3);
        } else if (editor.isActive("heading", { level: 4 })) {
          setActiveHeadingMark(EditorHeadings.H4);
        } else {
          setActiveHeadingMark(EditorHeadings.NORMAL);
        }
      });
    }
  }, [editor]);

  return (
    <div className="flex w-max items-center justify-center gap-0 rounded-lg border bg-accent/20 outline-double outline-2 outline-border outline-offset-2">
      {/* Marks group */}
      <ToggleGroup
        className="h-full gap-0"
        onValueChange={handleEditorMarksChange}
        type="multiple"
        value={activeMarks}
      >
        <ToggleGroupItem
          value={EditorMarks.BOLD}
          aria-label="Bold"
          className="rounded-none rounded-tl-lg rounded-bl-lg"
        >
          <BoldIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value={EditorMarks.ITALIC}
          aria-label="Italic"
          className="rounded-none"
        >
          <ItalicIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value={EditorMarks.UNDERLINE}
          aria-label="Underline"
          className="rounded-none"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Headings select */}
      <Select
        onValueChange={handleEditorHeadingMarkChange}
        value={activeHeadingMark}
      >
        <SelectTrigger className="h-9 w-[180px] rounded-none border-none text-xs ring-0 hover:bg-muted focus:bg-muted focus:ring-0">
          <SelectValue placeholder="Headings" />
        </SelectTrigger>
        <SelectContent>
          {EDITOR_HEADINGS.map((heading) => (
            <SelectItem key={heading.value} value={heading.value}>
              {heading.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* More marks */}
      <ToggleGroup
        className="h-full gap-0"
        onValueChange={handleEditorMarksChange}
        type="multiple"
        value={activeMarks}
      >
        <ToggleGroupItem
          value={EditorMarks.HIGHLIGHT}
          aria-label="Highlight"
          className="rounded-none"
        >
          <HighlighterIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Nodes */}
      <ToggleGroup
        className="h-full gap-0"
        onValueChange={handleEditorNodesChange}
        type="multiple"
        value={activeNodes}
      >
        <ToggleGroupItem
          value={EditorNodes.CODE}
          aria-label="Code Block"
          className="rounded-none"
        >
          <CodeIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value={EditorNodes.QUOTE}
          aria-label="Quote"
          className="rounded-none rounded-tr-lg rounded-br-lg"
        >
          <QuoteIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default EditorToolbar;
