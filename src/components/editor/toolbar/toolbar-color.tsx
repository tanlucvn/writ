"use client";

import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

import DashedContainer from "@/components/ui/dashed-container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const renderOptions = (type: "text" | "background") => {
    return EDITOR_COLOR_CLASSES.map((c) => {
      const className = type === "text" ? c.color : c.background;
      const isSelected = currentClass === className;

      return (
        <DropdownMenuItem
          key={`${type}-${c.name}`}
          onClick={() => handleSetClass(className)}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded text-xs",
                  className,
                )}
              >
                A
              </div>
              <small className="capitalize">{c.name}</small>
            </div>
            {isSelected && <CheckIcon className="h-4 w-4 opacity-70" />}
          </div>
        </DropdownMenuItem>
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toggle size="sm" aria-label="Text Color" className="size-8 border">
          <span
            className={cn(
              "flex items-center justify-center rounded-sm px-2 py-0.5 text-sm",
              currentClass,
              { "text-white": currentClass?.startsWith("bg-") },
            )}
          >
            A
          </span>
        </Toggle>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="h-full w-40 p-1">
        <DashedContainer className="max-h-[240px] overflow-y-auto p-2">
          <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
            Text
          </p>
          {renderOptions("text")}

          <DropdownMenuSeparator />

          <p className="px-1.5 py-1 font-mono text-muted-foreground text-xs">
            Background
          </p>
          {renderOptions("background")}
        </DashedContainer>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
