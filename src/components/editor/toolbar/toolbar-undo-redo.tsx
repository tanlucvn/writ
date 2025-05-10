"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { RedoIcon, UndoIcon } from "lucide-react";

export const ToolbarUndoRedo = () => {
  const { editor } = useAppStore();

  if (!editor) return null;

  const handleUndo = () => editor.commands.undo();
  const handleRedo = () => editor.commands.redo();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={handleUndo}
        disabled={!editor.can().undo()}
        aria-label="Undo"
        className="size-8"
      >
        <UndoIcon className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleRedo}
        disabled={!editor.can().redo()}
        aria-label="Redo"
        className="size-8"
      >
        <RedoIcon className="size-4" />
      </Button>
    </>
  );
};
