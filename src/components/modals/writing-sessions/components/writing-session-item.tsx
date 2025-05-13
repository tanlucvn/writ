"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { WritingSessions } from "@/types";
import { MoreVertical, TrashIcon } from "lucide-react";

type WritingSessionItemProps = {
  session: WritingSessions;
  className?: string;
  title: string;
};

const WritingSessionItem = ({
  session,
  className,
  title,
}: WritingSessionItemProps) => {
  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-lg border bg-card p-3 pr-12 outline-double outline-2 outline-transparent outline-offset-2 transition-all duration-300 hover:bg-secondary",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <span className="truncate font-medium text-base">{title}</span>

        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <p>Duration: {session.duration} minutes</p>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-foreground">
              {session.duration > 30 ? "Long" : "Short"} Session
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <p>Start: {session.startingWordCount} words</p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <p>End: {session.endingWordCount} words</p>
          </div>
        </div>

        {/* More actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 size-8 rounded-md text-foreground hover:bg-foreground/5"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="!mr-4 p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem className="hover:!text-destructive text-destructive text-xs">
              <TrashIcon className="!size-3.5" />
              Delete Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default WritingSessionItem;
