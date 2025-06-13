import { IconRenderer } from "@/components/icon-renderer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function HeroContent() {
  return (
    <div className="flex size-full flex-col gap-2.5 px-4">
      <div className="flex h-10 shrink-0 items-center justify-between gap-6">
        <div className="mx-auto flex w-full max-w-prose items-center gap-2">
          <Button variant="ghost" size="icon" className="-ml-1">
            <IconRenderer name="PanelLeft" />
          </Button>

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <span className="truncate text-sm">Untitled</span>

          <Button variant="outline" size="sm" className="ml-auto h-7 text-xs">
            Save
          </Button>
        </div>
      </div>

      <div className="flex w-full min-w-0 items-center gap-1 overflow-x-auto py-1.5">
        <Button variant="outline" className="size-7">
          <IconRenderer name="Undo" className="size-3.5" />
        </Button>
        <Button variant="outline" className="size-7">
          <IconRenderer name="Redo" className="size-3.5" />
        </Button>
        <Button variant="outline" className="h-7 text-xs">
          <IconRenderer name="Text" className="size-3.5" />
          Paragraph
        </Button>
        <Button variant="outline" className="size-7">
          <IconRenderer name="Bold" className="size-3.5" />
        </Button>
        <Button variant="outline" className="size-7">
          <IconRenderer name="Italic" className="size-3.5" />
        </Button>
        <Button variant="outline" className="size-7">
          <IconRenderer name="Underline" className="size-3.5" />
        </Button>
        <Button variant="outline" className="size-7">
          <IconRenderer name="Highlighter" className="size-3.5" />
        </Button>
        <Button variant="outline" className="size-7">
          <IconRenderer name="Link" className="size-3.5" />
        </Button>
        <Button variant="outline" className="size-7">
          <IconRenderer name="Quote" className="size-3.5" />
        </Button>
        <Button variant="outline" className="size-7">
          <IconRenderer name="List" className="size-3.5" />
        </Button>
        <Button variant="outline" className="size-7">
          <IconRenderer name="ListOrdered" className="size-3.5" />
        </Button>
      </div>

      <div className="tiptap h-full w-full select-none space-y-4 overflow-auto rounded-md border-2 border-dashed p-4 text-left">
        <h1 className="!text-3xl">Welcome to Miniwrit</h1>

        <p className="text-sm">
          This is your space to think, reflect, and write without distractions.
          Miniwrit is designed to help you focus deeply and capture your
          thoughts effortlessly.
        </p>

        <h2 className="!text-2xl">Getting Started</h2>
        <ul className="text-sm">
          <li>
            <strong>Start typing</strong> anything — there's no setup required.
          </li>
          <li>
            Use <code>/</code> commands or the{" "}
            <span className="text-foreground">toolbar</span> above to format
            your text.
          </li>
          <li>
            Click <strong>"Save"</strong> to store your session locally —
            syncing is automatic.
          </li>
        </ul>

        <h2 className="!text-2xl">Tips</h2>
        <ul className="text-sm">
          <li>
            Use <strong>Sessions</strong> to write in focused blocks of time.
          </li>
          <li>
            <strong>Organize</strong> notes using tags — easily searchable.
          </li>
          <li>
            <strong>Everything works offline</strong>. Your words are safe,
            always.
          </li>
        </ul>

        <blockquote>
          “Write with clarity. Think with intention.” — Miniwrit
        </blockquote>
      </div>
    </div>
  );
}
