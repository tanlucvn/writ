"use client";

import { CheckIcon, PaletteIcon } from "lucide-react";
import { useEffect, useState } from "react";

import DashedContainer from "@/components/ui/dashed-container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Toggle } from "@/components/ui/toggle";
import { EDITOR_COLOR_CLASSES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";

export const ToolbarColor = () => {
  const { editor } = useAppStore();
  const [currentClass, setCurrentClass] = useState("default");

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      const classAttr = editor.getAttributes("colorClass")?.class;
      setCurrentClass(classAttr || "default");
    };

    update();
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  const handleSetClass = (className: string) => {
    if (!editor) return;

    if (className === "default") {
      editor.chain().focus().unsetColorClass().run();
    } else {
      editor.chain().focus().setColorClass(className).run();
    }
  };

  const renderColorItems = (type: "text" | "background") =>
    EDITOR_COLOR_CLASSES.map((c) => {
      const className =
        type === "text"
          ? c.editorText
          : `${c.background} ${c.text} rounded-md box-decoration-clone px-1 py-0.5`;
      const isSelected = currentClass === className;

      return (
        <DropdownMenuItem
          key={`${type}-${c.name}`}
          onClick={() => handleSetClass(className)}
          className="flex items-center gap-2 px-2 py-1.5"
        >
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded text-xs",
              className,
            )}
          >
            A
          </span>
          <span className="text-xs capitalize">{c.name}</span>
          {isSelected && (
            <CheckIcon className="ml-auto h-4 w-4 text-muted-foreground" />
          )}
        </DropdownMenuItem>
      );
    });

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Toggle size="sm" aria-label="Text Color" className="size-8 border">
              <PaletteIcon className="h-4 w-4" />
            </Toggle>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={4}>
          Text & Background
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="start" className="w-36">
        <DashedContainer className="p-1">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-xs">
              Text
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-36">
              <DashedContainer className="h-40 overflow-y-auto p-1">
                {renderColorItems("text")}
              </DashedContainer>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-xs">
              Background
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-36">
              <DashedContainer className="h-40 overflow-y-auto p-1">
                {renderColorItems("background")}
              </DashedContainer>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DashedContainer>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
