"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createWrite, saveWrite } from "@/services/indexedDB";
import { useAppStore } from "@/store/app-store";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

export default function CreateWriteButton() {
  const { refreshWrites } = useAppStore();

  const handleCreate = async () => {
    const newWrite = createWrite();
    await saveWrite(newWrite);

    toast.success("New write created successfully!");
    refreshWrites();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full text-foreground transition-colors hover:bg-foreground/5"
          onClick={handleCreate}
        >
          <PlusIcon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="flex items-center justify-center gap-2">
        <p>New write</p>
        <span className="rounded-sm bg-muted px-1 py-[2px] text-muted-foreground">
          Ctrl + N
        </span>
      </TooltipContent>
    </Tooltip>
  );
}
