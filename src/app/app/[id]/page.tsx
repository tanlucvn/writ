"use client";

import Editor from "@/components/editor";
import { IconRenderer } from "@/components/icon-renderer";
import { NoteControlsDropdown } from "@/components/notes/note-controls-dropdown";
import { NoteSkeleton } from "@/components/notes/note-skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNoteActions } from "@/hooks/use-note-actions";
import { useNoteStore } from "@/store/use-note-store";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const { notes } = useNoteStore();
  const { onUpdateNote } = useNoteActions();

  const note = notes.find((n) => n.id === params.id);

  if (!note) return <NoteSkeleton />;

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-6 px-4">
        <div className="mx-auto flex w-full max-w-prose items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <span className="truncate text-sm">{note.title}</span>
          <NoteControlsDropdown note={note}>
            <Button variant="ghost" size="icon" className="ml-auto">
              <IconRenderer name="Ellipsis" />
            </Button>
          </NoteControlsDropdown>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 py-0">
        <Editor
          defaultValue={note.content}
          onChange={(html) => {
            onUpdateNote({
              ...note,
              content: html,
            });
          }}
        />
      </div>
    </>
  );
}
