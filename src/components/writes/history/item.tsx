"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  type Write,
  deleteWrite,
  getAllWrites,
  saveWrite,
} from "@/services/db/writes";
import { useAppStore } from "@/store/app-store";
import { MoreVertical, SaveIcon } from "lucide-react";
import { useState } from "react";

type HistoryItemProps = {
  write: Write;
  className?: string;
};

export function HistoryItem({ write, className }: HistoryItemProps) {
  const { currentWrite, setCurrentWrite, writes, setWrites, refreshWrites } =
    useAppStore();

  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(write.title || "");

  const handleDeleteWrite = async () => {
    await deleteWrite(write.id);
    const updated = writes.filter((item) => item.id !== write.id);
    setWrites(updated);
    refreshWrites();
  };

  const handleRenameWrite = async () => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    if (newTitle && newTitle !== write.title) {
      const updatedNote = { ...write, title: newTitle, updatedAt: new Date() };
      await saveWrite(updatedNote);
      const allWrites = await getAllWrites();
      setWrites(allWrites);
      setIsRenaming(false);
      refreshWrites();
    }
  };

  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-lg border p-3 pr-9 transition hover:bg-muted/50",
        currentWrite?.id === write.id && "bg-muted",
        className,
      )}
      onClick={() => setCurrentWrite(write)}
    >
      {isRenaming ? (
        <div className="flex items-center gap-2">
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded border px-2 py-1 text-sm"
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            className="size-8 flex-shrink-0 rounded-full text-foreground transition-colors hover:bg-foreground/5"
            onClick={(e) => {
              e.stopPropagation();
              handleRenameWrite();
            }}
          >
            <SaveIcon />
          </Button>
        </div>
      ) : (
        <>
          <h3 className="font-medium text-base">{write.title || "Untitled"}</h3>
          <p className="text-muted-foreground text-xs">
            Last updated: {new Date(write.updatedAt).toLocaleString()}
          </p>
        </>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 size-8 rounded-md text-foreground transition-colors hover:bg-foreground/5"
          >
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={() => setIsRenaming(true)}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDeleteWrite()}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
