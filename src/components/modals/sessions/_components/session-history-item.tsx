"use client";

import { IconRenderer } from "@/components/icon-renderer";
import { Badge } from "@/components/ui/badge";
import { getRelativeTime } from "@/lib/utils";
import type { Session } from "@/types";

export function SessionHistoryItem({ session }: { session: Session }) {
  const words = (session.endingWordCount ?? 0) - session.startingWordCount;

  const progress =
    session.goalType === "wordCount" && session.goalValue
      ? Math.min((words / session.goalValue) * 100, 100)
      : null;

  const goalCompleted =
    session.goalType === "wordCount" &&
    session.goalValue &&
    words >= session.goalValue;

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card p-3 shadow-xs transition-colors hover:bg-muted/40">
      <div className="flex h-12 w-1 items-end overflow-hidden rounded-full bg-primary/20">
        {progress !== null && (
          <div
            className="w-full bg-primary transition-all duration-500"
            style={{ height: `${progress}%` }}
          />
        )}
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h4 className="flex items-center gap-2 truncate font-semibold text-foreground text-sm">
            {session.label || "Untitled Session"}
            {goalCompleted && (
              <Badge variant="outline" className="rounded-full text-[10px]">
                <IconRenderer name="Check" className="size-3" />
                Completed
              </Badge>
            )}
          </h4>
          <span className="text-muted-foreground text-xs">
            {getRelativeTime(session.createdAt)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-xs">
          <div className="flex items-center gap-1">
            <IconRenderer name="Timer" className="h-3 w-3" />
            <span>{session.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <IconRenderer name="Target" className="h-3 w-3" />
            <span>{words} words</span>
          </div>
          {session.goalType === "wordCount" && session.goalValue && (
            <div className="flex items-center gap-1">
              <IconRenderer name="Flag" className="h-3 w-3" />
              <span>{session.goalValue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
