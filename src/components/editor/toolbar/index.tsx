"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ToolbarFormat } from "./toolbar-format";
import { ToolbarUndoRedo } from "./toolbar-undo-redo";

interface ToolbarProps {
  editor: any;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className="bg-background">
      <ScrollArea className="size-full">
        <div className="flex w-full min-w-max items-center gap-1 py-1.5">
          <ToolbarUndoRedo editor={editor} />

          <Separator orientation="vertical" className="h-4" />
          <ToolbarFormat editor={editor} />
        </div>
        <ScrollBar orientation="horizontal" className="h-1" />
      </ScrollArea>
    </div>
  );
};
