"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDialogStore } from "@/store/dialog-store";
import { useFoldersStore } from "@/store/folders-store";
import type { Folders } from "@/types";
import { EllipsisVerticalIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { forwardRef } from "react";

interface FolderTabProps {
  folder: Folders;
  currentFolderId: string | null;
  writeCount: number;
  onSelect: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const FolderTab = forwardRef<HTMLDivElement, FolderTabProps>(
  (
    {
      folder,
      currentFolderId,
      writeCount,
      onSelect,
      isExpanded,
      onToggleExpand,
    },
    ref,
  ) => {
    const { setCurrentEditFolder } = useFoldersStore();
    const { setIsFolderEditingDialogOpen } = useDialogStore();
    const isActive = currentFolderId === folder.id;

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex min-w-[120px] max-w-[200px] select-none items-center justify-center border-border border-r px-2 text-muted-foreground hover:bg-secondary hover:text-muted-foreground",
          isActive ? "bg-secondary hover:text-foreground" : "bg-card",
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "size-fit text-muted-foreground hover:bg-transparent hover:text-muted-foreground focus-visible:ring-0",
            isActive && "text-foreground hover:text-foreground",
          )}
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand();
          }}
        >
          {isExpanded ? <FolderOpenIcon /> : <FolderIcon />}
        </Button>

        <span
          className={cn(
            "flex max-w-28 flex-grow cursor-pointer items-center truncate px-4 py-3 text-left font-medium text-xs hover:text-muted-foreground",
            isActive && "text-foreground hover:text-foreground",
          )}
          onClick={onSelect}
        >
          {folder.title}
          <span className="ml-1 text-muted-foreground text-xs">
            ({writeCount})
          </span>
        </span>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "size-fit text-muted-foreground hover:bg-transparent hover:text-muted-foreground focus-visible:ring-0",
            isActive && "text-foreground hover:text-foreground",
          )}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentEditFolder(folder);
            setIsFolderEditingDialogOpen(true);
          }}
        >
          <EllipsisVerticalIcon />
        </Button>
      </div>
    );
  },
);

FolderTab.displayName = "FolderTab";

export default FolderTab;
