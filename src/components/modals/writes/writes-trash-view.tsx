"use client";

import { AnimatedNumberBadge } from "@/components/animated-number-badge";
import { MultiSelectTag, WritesSortSelector } from "@/components/modals/writes";
import { Button } from "@/components/ui/button";
import DashedContainer from "@/components/ui/dashed-container";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { dexie } from "@/services";
import { useDialogStore } from "@/store/dialog-store";
import { useWritesStore } from "@/store/writes-store";
import type { Write } from "@/types";
import { RotateCcwIcon, TrashIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Drawer } from "vaul";
import TrashItem from "./components/trash-item";

// Filter writes by search and selected tags
const filterWrites = (
  writes: Write[],
  query: string,
  selectedTags: Set<string>,
): Write[] => {
  const q = query.trim().toLowerCase();
  if (!q && selectedTags.size === 0) return writes;

  return writes.filter((write) => {
    const title = write.title || "Untitled";
    const matchesSearch = title.toLowerCase().includes(q);
    const matchesTags =
      selectedTags.size === 0 ||
      write.tagIds?.some((id) => selectedTags.has(id));
    return matchesSearch && matchesTags;
  });
};

const WritesTrashView = () => {
  const { tags, refreshWrites } = useWritesStore();
  const { isWritesTrashViewOpen, setIsWritesTrashViewOpen } = useDialogStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [deletedWrites, setDeletedWrites] = useState<Write[]>([]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isWritesTrashViewOpen) {
      dexie.getAllRemovedWrites().then(setDeletedWrites);
    }
  }, [isWritesTrashViewOpen]);

  const filteredWrite = filterWrites(deletedWrites, searchQuery, selectedTags);

  const handleRestore = async (id: string) => {
    await dexie.restoreWrite(id);
    setDeletedWrites((prev) => prev.filter((w) => w.id !== id));
    await refreshWrites();
    toast.success("Write restored");
  };

  const handleDelete = async (id: string) => {
    await dexie.deleteWrite(id);
    setDeletedWrites((prev) => prev.filter((w) => w.id !== id));
    await refreshWrites();
    toast.success("Write deleted");
  };

  // Restore all filtered writes
  const handleRestoreAll = async () => {
    await Promise.all(
      filteredWrite.map((write) => dexie.restoreWrite(write.id)),
    );
    setDeletedWrites((prev) =>
      prev.filter((w) => !filteredWrite.some((fw) => fw.id === w.id)),
    );
    await refreshWrites();
    toast.success("All writes restored");
  };

  // Delete all filtered writes permanently
  const handleDeleteAll = async () => {
    if (
      !confirm("Are you sure you want to permanently delete all these writes?")
    )
      return;

    await Promise.all(
      filteredWrite.map((write) => dexie.deleteWrite(write.id)),
    );
    setDeletedWrites((prev) =>
      prev.filter((w) => !filteredWrite.some((fw) => fw.id === w.id)),
    );
    await refreshWrites();
    toast.success("All writes permanently deleted");
  };

  const clearTags = () => setSelectedTags(new Set());

  return (
    <Drawer.Root
      direction="right"
      open={isWritesTrashViewOpen}
      onOpenChange={setIsWritesTrashViewOpen}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-20 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 z-40 h-full w-full overflow-hidden rounded-none border bg-background p-1 shadow-xl outline-none sm:w-[450px] sm:max-w-md sm:rounded-tl-xl sm:rounded-bl-xl md:max-w-lg">
          <DashedContainer className="flex flex-col gap-2 rounded-tl-xl rounded-bl-xl">
            {/* Header */}
            <div className="relative flex flex-col gap-2 px-4 pt-4">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-muted-foreground text-xs">
                  These writes were deleted. You can restore them.
                </p>
                <Drawer.Title className="font-medium text-base text-foreground">
                  Trash
                </Drawer.Title>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 size-8"
                  onClick={() => setIsWritesTrashViewOpen(false)}
                >
                  <XIcon />
                </Button>
              </div>

              {/* Search input for filtering by title */}
              <Input
                placeholder="Search writes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 text-sm placeholder:text-sm"
                data-vaul-no-drag
              />

              {/* Tag multi-select dropdown and clear button */}
              {tags.length > 0 && (
                <div className="flex items-center justify-between gap-2">
                  <MultiSelectTag
                    availableTags={tags}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                  />
                  {selectedTags.size > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-xs"
                      onClick={clearTags}
                    >
                      <XIcon className="size-4" />
                      Clear
                    </Button>
                  )}
                </div>
              )}

              <Separator />
            </div>

            {/* Scrollable list of writes */}
            <ScrollArea id="block-scrollarea" className="flex-1">
              <div className="px-4 py-2">
                {filteredWrite.length === 0 ? (
                  <div className="py-12 text-center text-sm">
                    <p>No writes found.</p>
                    <p className="mt-1 text-muted-foreground text-xs">
                      Start writing something awesome!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                    {filteredWrite.map((write) => (
                      <TrashItem
                        key={write.id}
                        write={write}
                        onRestore={() => handleRestore(write.id)}
                        onDelete={() => handleDelete(write.id)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {filteredWrite.length > 0 && (
                <div className="flex w-full items-center justify-end gap-3 px-4 py-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRestoreAll}
                    disabled={filteredWrite.length === 0}
                    className="text-xs"
                  >
                    <RotateCcwIcon />
                    Restore All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeleteAll}
                    disabled={filteredWrite.length === 0}
                    className="text-destructive text-xs hover:text-destructive"
                  >
                    <TrashIcon />
                    Delete All
                  </Button>
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            <div className="border-t px-4 py-1.5 text-xs" data-vaul-no-drag>
              <div className="flex items-center justify-between text-foreground">
                <div className="flex select-none items-center gap-2">
                  <p className="text-xs">Writes</p>
                  <AnimatedNumberBadge value={filteredWrite.length} />
                </div>
                <WritesSortSelector />
              </div>
            </div>
          </DashedContainer>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default WritesTrashView;
