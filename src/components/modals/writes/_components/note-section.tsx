import { IconRenderer } from "@/components/icon-renderer";
import { NumberFlowBadge } from "@/components/number-flow-badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import NoteItem from "@/components/writes/note-item";
import type { Note } from "@/types";
import { useState } from "react";

type SectionProps = {
  icon: React.ReactNode;
  title: string;
  notes: Note[];
  defaultOpen?: boolean;
};

export default function NoteSection({
  icon,
  title,
  notes,
  defaultOpen = false,
}: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  if (notes.length === 0) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <CollapsibleTrigger asChild>
        <div className="group flex items-center justify-between rounded-lg p-2 hover:bg-muted">
          <div className="flex items-center gap-2">
            <Button variant={isOpen ? "default" : "outline"} size="icon">
              {icon}
            </Button>
            <h4 className="font-medium text-sm leading-none">{title}</h4>
            <NumberFlowBadge value={notes.length} />
          </div>

          <IconRenderer
            name={isOpen ? "ChevronDown" : "ChevronRight"}
            className="size-4"
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="grid grid-cols-2 gap-2 px-1 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
