"use client";

import { PlusIcon } from "lucide-react";
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
  const { writes, currentWrite, refreshWrites } = useWritesStore();

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

  // When currentWrite changes, update the currentFolder accordingly
  useEffect(() => {
    const write = writes.find((w) => w.id === currentWrite?.id);
    if (!write) return;

    // Clear current folder if write is not in any folder
    if (!write.folderId) {
      if (currentFolder !== null) {
        setCurrentFolder(null);
      }
      return;
    }

    const folder = folders.find((f) => f.id === write.folderId);
    if (!folder) return;

    // Set current folder if it's different from the current one
    if (currentFolder?.id !== folder.id) {
      setCurrentFolder(folder);
    }
  }, [currentWrite?.id, writes, folders, currentFolder, setCurrentFolder]);

  return (
    <div className="flex flex-col border-b bg-background">
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
                /* Option: Click to select folder */
                // onSelect={() => setCurrentFolder(folder)}
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
              <PlusIcon />
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
