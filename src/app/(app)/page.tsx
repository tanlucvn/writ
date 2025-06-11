"use client";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppStore } from "@/store/use-app-store";
import { useDialogStore } from "@/store/use-dialog-store";

export default function Page() {
  const { editor } = useAppStore();
  const { setIsSaveNoteModalOpen } = useDialogStore();

  return (
    <>
      {editor && (
        <header className="flex h-16 shrink-0 items-center justify-between gap-6 px-4">
          <div className="mx-auto flex w-full max-w-prose items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <span className="truncate text-sm">Untitled</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSaveNoteModalOpen(true)}
              className="ml-auto"
            >
              Save
            </Button>
          </div>
        </header>
      )}

      <div className="flex h-full flex-1 flex-col gap-4 p-4 py-0">
        <Editor note={undefined} />
      </div>
    </>
  );
}
