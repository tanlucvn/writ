"use client";

import TiptapEditor from "@/components/editor";
import { SaveNoteModal } from "@/components/modals/notes/save-note";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

export default function Page() {
  const [content, setContent] = useState("");

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-6 px-4">
        <div className="mx-auto flex w-full max-w-prose items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <span className="truncate text-sm">Untitled</span>
          <SaveNoteModal value={content}>
            <Button variant="outline" size="sm" className="ml-auto">
              Save
            </Button>
          </SaveNoteModal>
        </div>
      </header>

      <div className="flex h-full flex-1 flex-col gap-4 p-4 py-0">
        <TiptapEditor
          defaultValue={content}
          onChange={(updated) => {
            setContent(updated);
          }}
        />
      </div>
    </>
  );
}
