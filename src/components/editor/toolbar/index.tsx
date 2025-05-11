"use client";

import { ToolbarColor } from "@/components/editor/toolbar/toolbar-color";
import { Separator } from "@/components/ui/separator";
import { ToolbarFormat } from "./toolbar-format";
import { ToolbarUndoRedo } from "./toolbar-undo-redo";

export const Toolbar = () => {
  return (
    <div className="sticky top-0 z-[1] flex w-full items-center gap-1 border-b bg-background px-2 py-1.5">
      <ToolbarUndoRedo />

      <Separator orientation="vertical" className="h-4" />
      <ToolbarFormat />

      <Separator orientation="vertical" className="h-4" />
      <ToolbarColor />
    </div>
  );
};
