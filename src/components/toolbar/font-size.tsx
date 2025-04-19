"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { MinusIcon, PlusIcon } from "lucide-react";

export default function ToolbarFontSize() {
  const { fontSize, setFontSize } = useAppStore();

  const handleDecrease = () => setFontSize(Math.max(fontSize - 1, 12));
  const handleIncrease = () => setFontSize(Math.min(fontSize + 1, 32));

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full text-foreground transition-colors hover:bg-foreground/5"
        onClick={handleDecrease}
      >
        <MinusIcon />
      </Button>
      <span className="w-8 text-center text-xs">{fontSize}px</span>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full text-foreground transition-colors hover:bg-foreground/5"
        onClick={handleIncrease}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
