"use client";

import { useToolbarStore } from "@/store/toolbar-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ToolbarFontSize() {
  const { fontSize, increaseFontSize, decreaseFontSize } = useToolbarStore();

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full text-foreground transition-colors hover:bg-foreground/5"
        onClick={decreaseFontSize}
      >
        <MinusIcon />
      </Button>
      <span className="w-8 text-center text-xs">{fontSize}px</span>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full text-foreground transition-colors hover:bg-foreground/5"
        onClick={increaseFontSize}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
