"use client";

import { Button } from "@/components/ui/button";
import { Input, InputPrefix, InputWrapper } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";

import { IconRenderer } from "@/components/icon-renderer";
import { NumberFlowBadge } from "@/components/number-flow-badge";
import { MultiSelect } from "@/components/ui/multi-select";
import TrashItem from "@/components/writes/trash-item";
import { useDialogStore } from "@/store/use-dialog-store";
import { useNoteStore } from "@/store/use-note-store";
import { useTagStore } from "@/store/use-tags-store";
import type { Note } from "@/types";

const filterNotes = (
  notes: Note[],
  query: string,
  selectedTags: string[],
): Note[] => {
  const q = query.trim().toLowerCase();

  return notes.filter((note) => {
    const title = note.title?.toLowerCase() || "untitled";
    const matchesSearch = q ? title.includes(q) : true;
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tagId) => note.tagIds?.includes(tagId));
    return matchesSearch && matchesTags;
  });
};

export default function TrashModal() {
  const { isTrashOpen, setIsTrashOpen } = useDialogStore();
  const { trash } = useNoteStore();
  const { tags } = useTagStore();

  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredNotes = filterNotes(trash, query, selectedTags);
  const total = filteredNotes.length;

  const tagOptions = tags.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }));

  useEffect(() => {
    if (isTrashOpen) {
      setQuery("");
      setSelectedTags([]);
    }
  }, [isTrashOpen]);

  return (
    <Drawer.Root
      open={isTrashOpen}
      onOpenChange={setIsTrashOpen}
      direction="right"
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Drawer.Content className="fixed top-0 right-0 bottom-0 z-50 flex h-full w-full flex-col overflow-hidden rounded-xl border bg-background shadow-xl sm:top-2 sm:right-2 sm:bottom-2 sm:h-[98%] sm:max-w-md">
          {/* Header */}
          <div className="shrink-0 border-b p-4 pb-2">
            <Drawer.Title className="font-medium text-base text-foreground">
              Trash
            </Drawer.Title>
            <Drawer.Description className="text-muted-foreground text-xs">
              Review and restore or permanently delete notes.
            </Drawer.Description>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsTrashOpen(false)}
            >
              <IconRenderer name="X" />
            </Button>
            <div className="mt-3 space-y-2">
              <InputWrapper>
                <InputPrefix>
                  <IconRenderer
                    name="Search"
                    className="text-muted-foreground"
                  />
                </InputPrefix>
                <Input
                  placeholder="Search notes in trash..."
                  className="pl-8"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </InputWrapper>

              {tags.length > 0 && (
                <MultiSelect
                  options={tagOptions}
                  defaultValue={selectedTags}
                  onValueChange={setSelectedTags}
                  placeholder="Filter by tags"
                />
              )}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea id="block-scrollarea" className="h-full px-4 py-2">
              {total === 0 ? (
                <div className="flex h-full flex-col justify-center text-center text-sm">
                  <p>No trashed notes.</p>
                  <p className="mt-1 text-muted-foreground text-xs">
                    Deleted notes will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 p-2 px-1 lg:grid-cols-3">
                  {filteredNotes.map((note) => (
                    <TrashItem key={note.id} note={note} selectable={false} />
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Footer */}
          <div className="flex shrink-0 items-center justify-between border-t px-4 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-medium">Trash Notes</span>
              <NumberFlowBadge value={total} />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
