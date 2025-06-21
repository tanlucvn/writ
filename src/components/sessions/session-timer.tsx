"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useActiveSessionStore } from "@/store/use-active-session-store";
import { useNoteStore } from "@/store/use-note-store";
import { useSessionStore } from "@/store/use-session-store";
import { StickyNote, Target, Timer } from "lucide-react";
import { useEffect, useState } from "react";

export function SessionTimer() {
  const { sessionId, end: endSession } = useActiveSessionStore();
  const { sessions, updateSession } = useSessionStore();
  const { notes } = useNoteStore();

  const session = sessions.find((s) => s.id === sessionId);
  const note = notes.find((n) => n.id === session?.noteId);

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!session) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const secondsPassed = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(secondsPassed);

      if (secondsPassed >= session.duration) {
        handleEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  if (!session || !note) return null;

  const remaining = Math.max(session.duration - elapsed, 0);
  const isOver = remaining <= 0;

  const currentWordCount = note.content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const wordsWritten = Math.max(
    currentWordCount - session.startingWordCount,
    0,
  );

  const wordProgress =
    session.goalType === "wordCount" && session.goalValue
      ? Math.min(Math.round((wordsWritten / session.goalValue) * 100), 100)
      : null;

  const handleEnd = async () => {
    await updateSession({
      ...session,
      endingWordCount: currentWordCount,
    });
    endSession();
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const timeLabel = isOver ? "Time's up!" : formatTime(remaining);

  return (
    <div className="fixed right-4 bottom-4 z-50 w-[280px] space-y-4 rounded-2xl border bg-background p-4 shadow-lg">
      {/* Time */}
      <div className="flex items-center gap-2 font-medium text-sm">
        <Timer className="h-4 w-4 text-muted-foreground" />
        {timeLabel}
      </div>

      {/* Goal */}
      {session.goalType && (
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <Target className="h-4 w-4" />
          {session.goalType === "wordCount"
            ? `${session.goalValue} words`
            : "Free Write"}
        </div>
      )}

      {/* Label */}
      {session.label && (
        <div className="flex items-center gap-2 text-muted-foreground text-xs italic">
          <StickyNote className="h-4 w-4" />
          {session.label}
        </div>
      )}

      {/* Word progress */}
      {wordProgress !== null && (
        <div className="space-y-1">
          <Progress value={wordProgress} className="h-2 rounded-full" />
          <div className="text-muted-foreground text-xs">
            {wordsWritten} / {session.goalValue} words ({wordProgress}%)
          </div>
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        className={cn(
          "w-full",
          isOver &&
            "border-destructive text-destructive hover:bg-destructive/10",
        )}
        onClick={handleEnd}
      >
        End Session
      </Button>
    </div>
  );
}
