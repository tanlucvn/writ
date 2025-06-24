import EditorPreview from "@/components/editor/editor-preview";
import type { NoteTemplate } from "@/lib/templates";
import { cn } from "@/lib/utils";
import type { Note } from "@/types";

interface NotePreviewProps {
  note: NoteTemplate;
  onClick: () => void;
}

interface NoteContentPreviewProps {
  note: Note;
  className?: string;
}

export const NoteContentPreview = ({
  note,
  className,
}: NoteContentPreviewProps) => {
  return (
    <div
      className={cn(
        "relative my-2 h-32 w-72 overflow-hidden [mask-image:linear-gradient(to_top,transparent,black_50%)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 w-[220%] origin-top-left scale-50">
        <EditorPreview content={note.content || ""} />
      </div>
    </div>
  );
};

export const NotePreview = ({ note, onClick }: NotePreviewProps) => {
  return (
    <div
      onClick={onClick}
      className="relative w-full max-w-xs cursor-pointer rounded-md border bg-card shadow-sm outline-double outline-1 outline-border outline-offset-2 hover:bg-secondary hover:outline-2"
    >
      <div className="w-full px-2">
        <NoteContentPreview note={note} />
      </div>

      <div className="flex items-center justify-between border-t p-2">
        <div className="flex flex-col overflow-hidden">
          <span className="truncate font-semibold text-foreground text-xs">
            {note.title || "Untitled"}
          </span>
          <span className="truncate text-muted-foreground text-xs">
            {note.desc || "No description"}
          </span>
        </div>
      </div>
    </div>
  );
};
