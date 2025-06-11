import EditorPreview from "@/components/editor/editor-preview";
import type { WriteTemplate } from "@/lib/templates";
import { cn } from "@/lib/utils";
import type { Note } from "@/types";
import type React from "react";

interface WritePreviewProps {
  write: WriteTemplate;
  onClick: () => void;
}

interface WriteContentPreviewProps {
  write: Note;
  className?: string;
}

export const WriteContentPreview: React.FC<WriteContentPreviewProps> = ({
  write,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative my-2 h-32 w-72 overflow-hidden [mask-image:linear-gradient(to_top,transparent,black_50%)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 w-[220%] origin-top-left scale-50">
        <EditorPreview content={write.content || ""} />
      </div>
    </div>
  );
};

export const WritePreview: React.FC<WritePreviewProps> = ({
  write,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="relative w-full max-w-xs cursor-pointer rounded-md border bg-card shadow-sm outline-double outline-1 outline-border outline-offset-2 hover:bg-secondary hover:outline-2"
    >
      <div className="w-full px-2">
        <WriteContentPreview write={write} />
      </div>

      <div className="flex items-center justify-between border-t p-2">
        <div className="flex flex-col overflow-hidden">
          <span className="truncate font-semibold text-foreground text-xs">
            {write.title || "Untitled"}
          </span>
          <span className="truncate text-muted-foreground text-xs">
            {write.desc || "No description"}
          </span>
        </div>
      </div>
    </div>
  );
};
