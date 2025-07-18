"use client";

import { Button } from "@/components/ui/button";
import { Input, InputPrefix, InputWrapper } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";

import { IconRenderer } from "@/components/icon-renderer";
import { NotesSortSelector } from "@/components/modals";
import { NotesTransferButton } from "@/components/notes/notes-transfer-button";
import { useGroupNotes } from "@/hooks/use-group-notes";
import { useDialogStore } from "@/store/use-dialog-store";
import { useNoteStore } from "@/store/use-note-store";
import { useTagStore } from "@/store/use-tags-store";
import type { Note } from "@/types";
import NumberFlow from "@number-flow/react";
import NoteSection from "./_components/note-section";
import { TagFilter } from "./_components/tag-filter";

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
        <Drawer.Content className="fixed top-2 right-2 bottom-2 left-2 z-50 flex h-[98%] flex-col overflow-hidden rounded-xl border bg-background shadow-xl sm:left-auto sm:w-full sm:max-w-md">
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
                <TagFilter selected={selectedTags} onChange={setSelectedTags} />
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
          <div
            className="flex shrink-0 items-center justify-between border-t px-4 py-2 text-xs"
            data-vault-no-drag
          >
            <div className="flex items-center gap-1 font-medium text-xs">
              <IconRenderer name="LibraryBig" />
              <NumberFlow value={total} />
              <span className="mt-[1px]">{total === 1 ? "Note" : "Notes"}</span>
            </div>
            <NotesSortSelector />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
