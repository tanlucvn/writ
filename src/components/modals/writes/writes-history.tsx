"use client";

import {
  MultiSelectTag,
  WriteItem,
  WritesSortDropdown,
} from "@/components/modals/writes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDialogStore } from "@/store/dialog-store";
import { useWritesStore } from "@/store/writes-store";
import { Loader2, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { AnimatedNumberBadge } from "../../animated-number-badge";
import DashedContainer from "../../ui/dashed-container";
import { Separator } from "../../ui/separator";

const WritesHistory = () => {
  const { writes, tags, refreshWrites } = useWritesStore();
  const { isWritesHistoryOpen, setWritesHistoryOpen } = useDialogStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [isRefreshing, setIsRefreshing] = useState(true);

  const filteredWrites = writes.filter((write) => {
    const matchesSearch = (write.title || "Untitled")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.size === 0 ||
      write.tagIds?.some((id) => selectedTags.has(id));

    return matchesSearch && matchesTags;
  });

  useEffect(() => {
    setIsRefreshing(true);
    refreshWrites().finally(() => setIsRefreshing(false));
  }, [refreshWrites]);

  const clearTags = () => setSelectedTags(new Set());

  return (
    <Drawer.Root
      direction="right"
      open={isWritesHistoryOpen}
      onOpenChange={setWritesHistoryOpen}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-20 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 z-40 h-full w-full overflow-hidden rounded-none border bg-background p-1 shadow-xl outline-none sm:w-[450px] sm:max-w-md sm:rounded-tl-xl sm:rounded-bl-xl md:max-w-lg">
          <DashedContainer className="flex flex-col gap-2 rounded-tl-xl rounded-bl-xl">
            {/* Header */}
            <div className="relative flex flex-col gap-2 px-4 pt-4">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-muted-foreground text-xs">
                  View all the previous writes and drafts.
                </p>
                <Drawer.Title className="font-medium text-base text-foreground">
                  Write History
                </Drawer.Title>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 size-8"
                  onClick={() => setWritesHistoryOpen(false)}
                >
                  <XIcon />
                </Button>
              </div>

              <Input
                placeholder="Search writes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-sm"
                data-vaul-no-drag
              />

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

            {/* Scrollable Content */}
            <ScrollArea id="block-scrollarea" className="flex-1">
              <div className="px-4 py-2">
                {isRefreshing ? (
                  <div className="flex h-48 items-center justify-center text-muted-foreground">
                    <Loader2 className="size-5 animate-spin" />
                  </div>
                ) : filteredWrites.length === 0 ? (
                  <div className="py-12 text-center text-sm">
                    <p>No writes found.</p>
                    <p className="mt-1 text-muted-foreground text-xs">
                      Start writing something awesome!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredWrites.map((write) => (
                      <WriteItem key={write.id} write={write} />
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t px-4 py-1.5 text-xs" data-vaul-no-drag>
              <div className="flex items-center justify-between text-foreground">
                <div className="flex select-none items-center gap-2">
                  <p className="text-xs">Writes</p>
                  <AnimatedNumberBadge value={filteredWrites.length} />
                </div>
                <WritesSortDropdown />
              </div>
            </div>
          </DashedContainer>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default WritesHistory;
