"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ToolbarFormat } from "./toolbar-format";
import { ToolbarUndoRedo } from "./toolbar-undo-redo";

export const Toolbar = () => {
  return (
    <div className="bg-background">
      <ScrollArea className="size-full">
        <div className="flex w-full min-w-max items-center gap-1 py-1.5">
          <ToolbarUndoRedo />

          <Separator orientation="vertical" className="h-4" />
          <ToolbarFormat />
        </div>
        <ScrollBar orientation="horizontal" className="h-1" />
      </ScrollArea>
    </div>
  );
};
