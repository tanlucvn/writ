"use client";

import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useFoldersStore } from "@/store/folders-store";
import { useWritesStore } from "@/store/writes-store";
import FolderTab from "./folder-tab";
import FolderWriteList from "./folder-write-list";

const FoldersNavigation = () => {
  const { folders, currentFolder, setCurrentFolder, createNewFolder } =
    useFoldersStore();
  const { writes, refreshWrites } = useWritesStore();

  const [activeWriteListFolder, setActiveWriteListFolder] = useState<
    string | null
  >(null);
  const folderRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    refreshWrites();
  }, [refreshWrites]);

  useEffect(() => {
    if (currentFolder?.id && folderRefs.current[currentFolder.id]) {
      folderRefs.current[currentFolder.id]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentFolder]);

  const handleAddFolder = async () => {
    const folderNumber = folders.length + 1;
    await createNewFolder(`Folder ${folderNumber}`);
  };

  const filteredWrites = activeWriteListFolder
    ? writes.filter((w) => w.folderId === activeWriteListFolder)
    : [];

  return (
    <div className="sticky top-0 z-[1] flex flex-col border-b bg-background">
      <ScrollArea
        className={cn("h-fit w-full", activeWriteListFolder && "border-b")}
      >
        <div className="flex w-full min-w-max items-center gap-1">
          <div className="flex w-full items-center">
            {folders.map((folder) => (
              <FolderTab
                key={folder.id}
                folder={folder}
                currentFolderId={currentFolder?.id ?? null}
                writeCount={
                  writes.filter((w) => w.folderId === folder.id).length
                }
                onSelect={() => setCurrentFolder(folder)}
                isExpanded={activeWriteListFolder === folder.id}
                onToggleExpand={() =>
                  setActiveWriteListFolder((prev) =>
                    prev === folder.id ? null : folder.id,
                  )
                }
                ref={(el) => {
                  folderRefs.current[folder.id] = el;
                }}
              />
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddFolder}
              className="h-8 text-muted-foreground text-xs hover:bg-transparent"
            >
              <Plus />
              New Folder
            </Button>
          </div>
        </div>
        <ScrollBar orientation="horizontal" className="h-1" />
      </ScrollArea>

      {activeWriteListFolder && <FolderWriteList writes={filteredWrites} />}
    </div>
  );
};

export default FoldersNavigation;
