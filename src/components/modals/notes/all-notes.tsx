"use client";

import { Button } from "@/components/ui/button";
import { Input, InputPrefix, InputWrapper } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";

import { IconRenderer } from "@/components/icon-renderer";
import { NotesSortSelector } from "@/components/modals";
import { NotesTransferButton } from "@/components/notes/notes-transfer-button";
import { NumberFlowBadge } from "@/components/number-flow-badge";
import { MultiSelect } from "@/components/ui/multi-select";
import { useGroupNotes } from "@/hooks/use-group-notes";
import { useDialogStore } from "@/store/use-dialog-store";
import { useNoteStore } from "@/store/use-note-store";
import { useTagStore } from "@/store/use-tags-store";
import type { Note } from "@/types";
import NoteSection from "./_components/note-section";

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

export default function AllNotesModal() {
  const { isAllNotesOpen, setIsAllNotesOpen } = useDialogStore();
  const { notes } = useNoteStore();
  const { tags } = useTagStore();

  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { pinned, recent } = useGroupNotes(notes);
  const filteredPinned = filterNotes(pinned, query, selectedTags);
  const filteredRecent = filterNotes(recent, query, selectedTags);
  const total = filteredPinned.length + filteredRecent.length;

  const tagOptions = tags.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }));

  useEffect(() => {
    if (isAllNotesOpen) {
      setQuery("");
      setSelectedTags([]);
    }
  }, [isAllNotesOpen]);

  return (
    <Drawer.Root
      open={isAllNotesOpen}
      onOpenChange={setIsAllNotesOpen}
      direction="right"
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Drawer.Content className="fixed top-0 right-0 bottom-0 z-50 flex h-full w-full flex-col overflow-hidden rounded-xl border bg-background shadow-xl sm:top-2 sm:right-2 sm:bottom-2 sm:h-[98%] sm:max-w-md">
          {/* Header */}
          <div className="shrink-0 border-b p-4 pb-2">
            <Drawer.Title className="font-medium text-base text-foreground">
              All Notes
            </Drawer.Title>
            <Drawer.Description className="text-muted-foreground text-xs">
              Quickly access and manage all your notes and pins.
            </Drawer.Description>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsAllNotesOpen(false)}
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
                  placeholder="Search notes..."
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
            <ScrollArea id="block-scrollarea" className="h-full px-4">
              {total === 0 ? (
                <div className="flex h-full flex-col justify-center text-center text-sm">
                  <p>No notes found.</p>
                  <p className="mt-1 text-muted-foreground text-xs">
                    Start writing something awesome!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 py-2">
                  <NoteSection
                    icon={<IconRenderer name="Pin" />}
                    title="Pinned"
                    notes={filteredPinned}
                  />
                  <NoteSection
                    icon={<IconRenderer name="History" />}
                    title="Recent"
                    notes={filteredRecent}
                    defaultOpen
                  />

                  <NotesTransferButton />
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Footer */}
          <div className="flex shrink-0 items-center justify-between border-t px-4 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-medium">Notes</span>
              <NumberFlowBadge value={total} />
            </div>
            <NotesSortSelector />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
