"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RedoIcon, UndoIcon } from "lucide-react";

interface ToolbarUndoRedoProps {
  editor: any;
}

export const ToolbarUndoRedo = ({ editor }: ToolbarUndoRedoProps) => {
  if (!editor) return null;

  const handleUndo = () => editor.chain().focus().undo().run();
  const handleRedo = () => editor.chain().focus().redo().run();

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleUndo}
            disabled={!editor.can().undo()}
            aria-label="Undo"
            className="size-8"
          >
            <UndoIcon className="!size-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={4}>
          Undo
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRedo}
            disabled={!editor.can().redo()}
            aria-label="Redo"
            className="size-8"
          >
            <RedoIcon className="!size-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={4}>
          Redo
        </TooltipContent>
      </Tooltip>
    </>
  );
};
