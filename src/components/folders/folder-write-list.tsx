"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Write } from "@/types";
import { WriteItem } from "../modals/writes";

const FolderWriteList = ({ writes }: { writes: Write[] }) => (
  <ScrollArea className="h-auto w-full">
    <div className="flex size-full items-center gap-1">
      {writes.length === 0 ? (
        <div className="flex h-24 w-full select-none flex-col items-center justify-center gap-2 p-4 text-foreground text-sm">
          <p>No writes found.</p>
          <p className="text-muted-foreground text-xs">
            Start writing something awesome!
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-2">
          {writes.map((write) => (
            <WriteItem
              key={write.id}
              write={write}
              className="h-32 w-28 flex-shrink-0"
            />
          ))}
        </div>
      )}
    </div>
    <ScrollBar orientation="horizontal" className="h-1" />
  </ScrollArea>
);

export default FolderWriteList;
